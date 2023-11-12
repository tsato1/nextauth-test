import { DefaultSession, Session } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"

import type { User } from "@prisma/client"
import { UserRole } from "@prisma/client"

type UserId = string

/** Example on how to extend the built-in session types */
// declare module "next-auth" {
//   interface Session {
//     user: User & {
//       id: UserId
//       role: UserRole
//     }
//   }
// }

declare module 'next-auth' {
  interface Session {
    user: {
      id: string,
      role: string
    } & DefaultSession
  }

  interface User extends DefaultUser {
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: string,
  }
}