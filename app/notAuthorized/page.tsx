import Link from "next/link"

const NotAuthorizedPage = () => {
  return (
    <section>
      <h1>Access denied because of not enough permission.</h1>
      <p>Status: Logged in</p>
      <Link href="/">Go back to Home Page</Link>
    </section>
  )
}

export default NotAuthorizedPage