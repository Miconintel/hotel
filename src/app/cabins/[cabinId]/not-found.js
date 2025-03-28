import Link from "next/link";

function NotFound() {
  <main className="text-center space-y-6 mt-4">
    <h1 className="text-3xl font-semibold">This cabin does not exist.</h1>
    <Link
      href="/cabins"
      className="inline-block bg-accnet-500 text-primary-800  px-6 py-3 text-lg"
    >
      Go back
    </Link>
  </main>;
}

export default NotFound;
