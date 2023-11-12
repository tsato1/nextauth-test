"use client"

import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

import { ProtectedComponent } from "@/components/protectedComponent"

const ClientPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/clientPage")
    }
  })

  if (!session?.user) {
    return <></>
  }

  return (
    <section>
      <ProtectedComponent user={session?.user} pageName="Client Page" />
    </section>
  )
}

export default ClientPage