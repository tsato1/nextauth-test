import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

import type { User } from "@prisma/client"
import { UserRole } from "@prisma/client"

type UserId = string

/** Example on how to extend the built-in session types */
declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
      role: UserRole
    }
  }
}

/** Example on how to extend the built-in types for JWT */
declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
      role: UserRole
    }
  }
}