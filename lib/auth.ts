import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { UserRole } from "@prisma/client"

import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      profile(profile: GithubProfile) {
        console.log(`Profile received from github = ${profile}`)
        return {
          ...profile,
          role: profile.role ?? UserRole.USER,
          id: profile.id.toString(),
          image: profile.avatar_url,
        }
      },
      clientId: process.env.OAUTH_GITHUB_ID as string,
      clientSecret: process.env.OAUTH_GITHUB_SECRET as string
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Your Username"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your Password"
        }
      },
      async authorize(credentials) {
        // https://next-auth.js.org/configuration/providers/credentials
        const user = await db.user.findFirst({
          where: {
            name: credentials?.username
          }
        })

        if (!user) {
          return null
        }

        if (credentials?.username === user.name) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role

      return token


      // const dbUser = await db.user.findFirst({
      //   where: {
      //     email: token.email
      //   }
      // })

      // if (!dbUser) {
      //   token.id = user!.id
      //   return token
      // }

      // return {
      //   id: dbUser.id,
      //   name: dbUser.name,
      //   role: dbUser.role,
      //   email: dbUser.email,
      //   image: dbUser.imageUrl
      // }
    },
    /** If we want to use the role in client components */
    async session({ token, session }) {
      if (session?.user) {
        session.user.role = token.role
      }
      return session
      
      // if (token) {
      //   session.user.id = token.id
      //   session.user.name = token.name
      //   session.user.email = token.email
      //   session.user.role = token.role
      //   session.user.imageUrl = token.image
      // }

      // return session
    },
  },
}

export default NextAuth(authOptions);