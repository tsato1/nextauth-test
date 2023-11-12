import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { ProtectedComponent } from "@/components/protectedComponent"

const Home = async () => {
  const session = await getServerSession(authOptions)

  return (
    <>
      {session ? (
        <ProtectedComponent user={session.user} pageName="Home Page" />
      ) : (
        <p className="text-3xl">This is outside of the protected area.</p>
      )}
    </>
  )
}

export default Home