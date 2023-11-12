import { DefaultSession, Session } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"

import type { User } from "@prisma/client"
import { UserRole } from "@prisma/client"

/** Example on how to extend the built-in session types */
// declare module "next-auth" {
//   interface Session {
//     user: User & {
//       id: UserId
//       role: UserRole
//     }
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     id: string
//     role: UserRole
//   }
// }

declare module 'next-auth' {
  interface Session {
    user: {
      id: string,
      role: UserRole
    } & DefaultSession
  }

  interface User {
    role: UserRole
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: UserRole,
  }
}