import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import { ProtectedComponent } from '@/components/protectedComponent'

const ServerPage = async () => {
  /**
   * This page won't ask any specific role to view the content
   */
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/serverPage")
  }

  return (
    <section>
      <ProtectedComponent user={session.user} pageName="Server Page" />
    </section>
  )
}

export default ServerPage