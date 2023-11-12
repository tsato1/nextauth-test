import Image from "next/image"

import type { User } from "next-auth"

interface ProtectedComponentProps {
  user?: User,
  pageName: string
}

export const ProtectedComponent = ({
  user,
  pageName
}: ProtectedComponentProps) => {

  if (!user) {
    return (
      <div>User is null</div>
    )
  }

  return (
    <div>
      <h2>This is {pageName}</h2>
      <br />
      <p>Hi, {user.name || "Name Undefined"}</p>
      {user.image && <Image
        src={user.image}
        alt="Profile Image"
        width={100}
        height={100} />}
      <p>Role: {user.role}</p>
    </div>
  )
}
