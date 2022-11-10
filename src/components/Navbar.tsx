import { useRouter } from "next/router";
import Link from "next/link";
import Button from "./Button";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="flex w-full flex-wrap items-center justify-between bg-gray-800 p-6">
      <div className="mr-6 flex flex-shrink-0 items-center text-white">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Lets Moss
        </Link>
      </div>
      <div className="block flex-grow lg:flex lg:w-auto lg:items-center">
        <div className="float-right ml-auto">
          <Button label="Create Event" onClick={() => router.push("/events")} />
        </div>
      </div>
    </nav>
  );
}
