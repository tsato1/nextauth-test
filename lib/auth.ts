import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      profile(profile: GithubProfile) {
        console.log(`Profile received from github = ${profile}`)
        return {
          ...profile,
          role: profile.role ?? "user",
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
        const user = { id: "12", name: "asdf", password: "asdf", role: "admin" }

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