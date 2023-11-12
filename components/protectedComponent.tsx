import Image from "next/image"

type User = {
  name?: string | null | undefined
  email?: string | null | undefined
  imageUrl?: string | null | undefined
}

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
      {user.imageUrl && <Image
        src={user.imageUrl}
        alt="Profile Image"
        width={100}
        height={100} />}
    </div>
  )
}
