import { UserType } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    userType: UserType;
    name: string;
  }

  interface Session {
    user: {
      id: number;
      email: string;
      userType: UserType;
      name: string;
    };
  }
}
