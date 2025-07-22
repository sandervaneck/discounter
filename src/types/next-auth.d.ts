import NextAuth from "next-auth";
import { UserType } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    userType: UserType;
  }

  interface Session {
    user: {
      id: number;
      email: string;
      userType: UserType;
    };
  }
}
