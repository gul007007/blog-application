import Link from "next/link";

const splashNav = () => {
  return (
    <div>
      <ul>
        <li>
            <Link href="/auth/signin">Signin</Link>
        </li>
      </ul>
    </div>
  )
}

export default splashNav
