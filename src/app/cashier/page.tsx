"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { RestaurantToolbar } from "../components/Toolbar";

type DiscountStatus = "available" | "requested" | "awarded" | "used" | "expired";

interface Requirement {
  platform?: string;
  views?: number;
  likes?: number;
  comments?: number;
  reposts?: number;
}

interface AwaitingRequest {
  id: number;
  code: string;
  discountPercent: number;
  items: string[];
  expiryDate: string;
  influencerName: string;
  influencerEmail?: string;
  requirements: Requirement[];
}

const HARD_CODED_METRICS = {
  views: 4567,
  likes: 300,
  comments: 10,
  reposts: 5,
};

const normalizeRequirement = (req: any): Requirement => ({
  platform: typeof req?.platform === "string" ? req.platform : undefined,
  views:
    req?.views !== undefined && !Number.isNaN(Number(req.views))
      ? Number(req.views)
      : undefined,
  likes:
    req?.likes !== undefined && !Number.isNaN(Number(req.likes))
      ? Number(req.likes)
      : undefined,
  comments:
    req?.comments !== undefined && !Number.isNaN(Number(req.comments))
      ? Number(req.comments)
      : undefined,
  reposts:
    req?.reposts !== undefined && !Number.isNaN(Number(req.reposts))
      ? Number(req.reposts)
      : undefined,
});

const extractRequirements = (requirementsData: any): Requirement[] => {
  if (Array.isArray(requirementsData)) {
    return requirementsData.map(normalizeRequirement);
  }
  if (typeof requirementsData === "string") {
    try {
      const parsed = JSON.parse(requirementsData);
      return extractRequirements(parsed);
    } catch {
      return [];
    }
  }
  if (requirementsData && typeof requirementsData === "object") {
    return extractRequirements(Object.values(requirementsData));
  }
  return [];
};

export default function CashierDiscountScanner() {
  const [tab, setTab] = useState(1);
  const [awaitingRequests, setAwaitingRequests] = useState<AwaitingRequest[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [decision, setDecision] = useState<"approve" | "reject">("approve");
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [decisionError, setDecisionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadDiscounts = useCallback(async () => {
    try {
      setLoadingError(null);
      const res = await fetch("/api/discounts", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch discount codes.");
      }

      const discounts = await res.json();

      const requests: AwaitingRequest[] = discounts
        .filter((d: any) => (d.status as DiscountStatus) === "requested")
        .map((d: any) => {
          const requester = Array.isArray(d.redemptions)
            ? d.redemptions.find((r: any) => r.status === "requested")
            : null;
          const items = Array.isArray(d.applicableItems)
            ? d.applicableItems
                .map((item: any) => item?.item?.name ?? item?.name)
                .filter((name: string | undefined): name is string => Boolean(name))
            : [];

          return {
            id: d.id,
            code: d.code,
            discountPercent: d.discountPercent,
            items,
            expiryDate: d.expirationTime,
            influencerName: requester?.influencer?.name ?? "Unknown influencer",
            influencerEmail: requester?.influencer?.email ?? undefined,
            requirements: extractRequirements(d.requirements),
          };
        });

      setAwaitingRequests(requests);
    } catch (e) {
      console.error("Failed fetching items", e);
      setLoadingError("We couldn't load the latest requests. Please try again.");
    }
  }, []);

  useEffect(() => {
    loadDiscounts().catch((err) => {
      console.error("Failed to load discounts", err);
      setLoadingError("We couldn't load the latest requests. Please try again.");
    });
  }, [loadDiscounts]);

  useEffect(() => {
    if (awaitingRequests.length === 0) {
      setSelectedRequestId(null);
      return;
    }

    setSelectedRequestId((prev) => {
      if (prev && awaitingRequests.some((request) => request.id === prev)) {
        return prev;
      }
      return awaitingRequests[0].id;
    });
  }, [awaitingRequests]);

  const selectedRequest = useMemo(
    () => awaitingRequests.find((request) => request.id === selectedRequestId) ?? null,
    [awaitingRequests, selectedRequestId]
  );

  const meetsRequirements = useMemo(() => {
    if (!selectedRequest) {
      return false;
    }
    if (!selectedRequest.requirements.length) {
      return true;
    }

    const passesRequirement = (req: Requirement) => {
      const viewPass =
        typeof req.views !== "number" || HARD_CODED_METRICS.views >= req.views;
      const likePass =
        typeof req.likes !== "number" || HARD_CODED_METRICS.likes >= req.likes;
      const commentPass =
        typeof req.comments !== "number" || HARD_CODED_METRICS.comments >= req.comments;
      const repostPass =
        typeof req.reposts !== "number" || HARD_CODED_METRICS.reposts >= req.reposts;

      return viewPass && likePass && commentPass && repostPass;
    };

    return selectedRequest.requirements.some(passesRequirement);
  }, [selectedRequest]);

  useEffect(() => {
    if (selectedRequest) {
      setDecision(meetsRequirements ? "approve" : "reject");
    } else {
      setDecision("approve");
    }
  }, [selectedRequest, meetsRequirements]);

  const handleConfirm = useCallback(async () => {
    if (!selectedRequest) {
      return;
    }

    setDecisionError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/discounts/decision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ codeId: selectedRequest.id, decision }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "" }));
        throw new Error(data?.error || "Failed to update request.");
      }

      await loadDiscounts();
    } catch (err) {
      console.error("Failed to update discount request", err);
      setDecisionError("Something went wrong while updating the request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [decision, loadDiscounts, selectedRequest]);

  return (
    <div className="min-h-screen bg-[#e0f2f1] px-4 py-6 font-sans">
      <div className="max-w-md mx-auto">
        <RestaurantToolbar tab={tab} setTab={setTab} />

        <h1 className="text-xl font-bold text-center text-[#117a65] mb-6">
          Review Discount Requests
        </h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#117a65] mb-3 text-center">
            Awaiting Requests
          </h2>
          {loadingError && (
            <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-center text-sm text-red-700">
              {loadingError}
            </div>
          )}
          {awaitingRequests.length > 0 ? (
            <ul className="space-y-3">
              {awaitingRequests.map((request) => {
                const isSelected = request.id === selectedRequestId;
                return (
                  <li key={request.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedRequestId(request.id)}
                      className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                        isSelected
                          ? "border-[#117a65] bg-white shadow"
                          : "border-[#b2dfdb] bg-white/80 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-bold text-[#117a65]">{request.code}</p>
                          <p className="text-sm text-gray-600">
                            Requested by {" "}
                            <span className="font-semibold text-[#0b4a3e]">
                              {request.influencerName}
                            </span>
                          </p>
                          {request.influencerEmail && (
                            <p className="text-xs text-gray-500">{request.influencerEmail}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-2">
                            Discount: {request.discountPercent}% • Items: {request.items.join(", ") || "N/A"}
                          </p>
                          <p className="text-xs text-gray-500">
                            Expires: {new Date(request.expiryDate).toISOString().split("T")[0]}
                          </p>
                        </div>
                        <span className="rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                          Requested
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-[#117a65] bg-white/80 p-4 text-center text-sm text-gray-600">
              No pending discount requests.
            </div>
          )}
        </div>

        {selectedRequest && (
          <div className="space-y-4 rounded-2xl border border-[#117a65] bg-white p-5 shadow">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-bold text-[#117a65]">
                  {selectedRequest.code} • {selectedRequest.discountPercent}% off
                </p>
                <p className="text-sm text-gray-600">
                  Items: {selectedRequest.items.join(", ") || "N/A"}
                </p>
                <p className="text-xs text-gray-500">
                  Expires: {new Date(selectedRequest.expiryDate).toISOString().split("T")[0]}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                meetsRequirements ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              }`}>
                {meetsRequirements ? "Meets requirements" : "Needs review"}
              </span>
            </div>

            <button
              type="button"
              className="w-full rounded-xl border border-[#117a65] bg-white py-3 text-center text-lg font-semibold text-[#117a65] transition-colors hover:bg-[#d9f5f1]"
            >
              View Post
            </button>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-[#b2dfdb] bg-[#f1f8f6] p-3 text-center">
                <p className="text-xs uppercase tracking-wide text-gray-500">Views</p>
                <p className="text-lg font-bold text-[#117a65]">
                  {HARD_CODED_METRICS.views.toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl border border-[#b2dfdb] bg-[#f1f8f6] p-3 text-center">
                <p className="text-xs uppercase tracking-wide text-gray-500">Likes</p>
                <p className="text-lg font-bold text-[#117a65]">
                  {HARD_CODED_METRICS.likes.toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl border border-[#b2dfdb] bg-[#f1f8f6] p-3 text-center">
                <p className="text-xs uppercase tracking-wide text-gray-500">Comments</p>
                <p className="text-lg font-bold text-[#117a65]">
                  {HARD_CODED_METRICS.comments.toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl border border-[#b2dfdb] bg-[#f1f8f6] p-3 text-center">
                <p className="text-xs uppercase tracking-wide text-gray-500">Reposts</p>
                <p className="text-lg font-bold text-[#117a65]">
                  {HARD_CODED_METRICS.reposts.toLocaleString()}
                </p>
              </div>
            </div>

            {selectedRequest.requirements.length > 0 && (
              <div className="rounded-xl border border-[#b2dfdb] bg-[#f6fffd] p-4 text-sm text-gray-700">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#117a65]">
                  Discount Requirements
                </p>
                <ul className="space-y-2">
                  {selectedRequest.requirements.map((req, idx) => (
                    <li key={idx} className="rounded-lg bg-white/70 px-3 py-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#0b4a3e]">
                        {req.platform ?? "Any Platform"}
                      </p>
                      <p>
                        Views: <strong>{req.views ?? "N/A"}</strong> • Likes: <strong>{req.likes ?? "N/A"}</strong>
                      </p>
                      <p>
                        Comments: <strong>{req.comments ?? "N/A"}</strong> • Reposts: <strong>{req.reposts ?? "N/A"}</strong>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#117a65]" htmlFor="decision-select">
                Decision
              </label>
              <select
                id="decision-select"
                value={decision}
                onChange={(event) => setDecision(event.target.value as "approve" | "reject")}
                className="w-full rounded-xl border border-[#117a65] bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#117a65]"
              >
                <option value="approve">Approve Post</option>
                <option value="reject">Disapprove Post</option>
              </select>
              {decisionError && (
                <p className="text-xs text-red-600">{decisionError}</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#117a65] py-3 text-lg font-semibold text-white transition-colors hover:bg-[#0b4a3e] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Updating..." : "Confirm"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
