"use client"

import { useRouter } from "next/navigation"

export const NavComponent = () => {

  const router = useRouter()

  return (
    <div className="flex flex-col justify-center items-center">
      <button onClick={() => router.push("/clientPage")}>Go to Client Page</button>
      <button onClick={() => router.push("/serverPage")}>Go to Server Page</button>
      <button onClick={() => router.push("/middlewareProtected")}>Go to Middleware-Protected Page</button>
      <button onClick={() => router.push("/api/auth/signout?callbackUrl=/")}>Sign Out</button>
    </div>
  )
}
