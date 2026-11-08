import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, House, Search } from "lucide-react";
import AuthForm from "../components/AuthForm";
import AccountVerification from "../components/AccountVerification";

export const metadata: Metadata = {
  title: "Sign in or sign up",
  description: "Choose a landlord or tenant account to sign in or sign up to Housepot.",
};

type AccountPageProps = {
  searchParams: Promise<{ role?: string; next?: string; verification_token?: string }>;
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const params = await searchParams;
  if (params.verification_token) {
    return <AccountVerification token={params.verification_token} />;
  }
  const role =
    params.role === "landlord" || params.role === "tenant" ? params.role : null;
  const next = params.next === "list-property" ? "list-property" : undefined;

  if (role) return <AuthForm role={role} next={next} />;

  return (
    <section className="min-h-screen bg-[#f8f8f5] px-5 pb-20 pt-32 dark:bg-[#111a15] sm:px-8 sm:pt-36">
      <div className="mx-auto max-w-4xl">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#52765b] dark:text-[#b6d8bd]">
          Welcome to Housepot
        </p>
        <h1 className="mt-3 text-center text-3xl font-semibold tracking-tight text-[#202a24] dark:text-white sm:text-4xl">
          How would you like to continue?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-center leading-7 text-[#66736b] dark:text-[#aab5ad]">
          Choose your account type to sign in or create an account.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Link
            href={`/account?role=landlord${next ? `&next=${next}` : ""}`}
            className="group rounded-3xl border border-[#e4e9e4] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#b6d8bd] hover:shadow-md dark:border-[#2b3a30] dark:bg-[#18231c] dark:hover:border-[#52765b] sm:p-9"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf4eb] text-[#285c45] dark:bg-[#223127] dark:text-[#b6d8bd]">
              <House size={23} />
            </span>
            <h2 className="mt-6 text-xl font-semibold text-[#202a24] dark:text-white">
              I’m a landlord
            </h2>
            <p className="mt-2 leading-6 text-[#66736b] dark:text-[#aab5ad]">
              Manage your rentals and share a property with home seekers.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#285c45] dark:text-[#b6d8bd]">
              Landlord sign in or sign up
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/account?role=tenant"
            className="group rounded-3xl border border-[#e4e9e4] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#b6d8bd] hover:shadow-md dark:border-[#2b3a30] dark:bg-[#18231c] dark:hover:border-[#52765b] sm:p-9"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf4eb] text-[#285c45] dark:bg-[#223127] dark:text-[#b6d8bd]">
              <Search size={23} />
            </span>
            <h2 className="mt-6 text-xl font-semibold text-[#202a24] dark:text-white">
              I’m looking for a home
            </h2>
            <p className="mt-2 leading-6 text-[#66736b] dark:text-[#aab5ad]">
              Sign in or create an account to find your next place.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#285c45] dark:text-[#b6d8bd]">
              Tenant sign in or sign up
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
