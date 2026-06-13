import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-cream p-6 text-center">
      <div className="max-w-md rounded-lg bg-ivory p-6 shadow-soft">
        <img src="/logo.png" alt="" className="mx-auto h-16 w-16 rounded-full border border-pool/50 object-cover" />
        <h1 className="mt-4 font-serif text-3xl font-bold">Admin page not found</h1>
        <p className="mt-3 text-sm leading-6 text-mist">The admin app is deployed, but this route does not exist.</p>
        <Link href="/" className="btn btn-primary mt-5">Go to admin</Link>
      </div>
    </main>
  );
}
