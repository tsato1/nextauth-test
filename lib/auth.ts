import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
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
        const user = { id: "12", name: "asdf", password: "asdf" }

        if (credentials?.username === user.name && credentials?.password === user.password) {
          return user
        } else {
          return null
        }
      }
    })
  ],
}

export default NextAuth(authOptions);