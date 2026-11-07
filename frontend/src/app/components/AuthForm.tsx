"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, House, LoaderCircle, Search } from "lucide-react";
import { registerAccount, signIn } from "@/lib/auth";

type Mode = "register" | "login";

const inputClass =
  "mt-2 h-12 w-full rounded-xl border border-[#dce4dc] bg-white px-4 text-sm text-[#202a24] outline-none transition placeholder:text-[#89938c] focus:border-[#78a987] focus:ring-4 focus:ring-[#78a987]/15 dark:border-[#35473a] dark:bg-[#18231c] dark:text-white dark:placeholder:text-gray-400";

type AuthFormProps = {
  role: "landlord" | "tenant";
  next?: "list-property";
};

export default function AuthForm({ role, next }: AuthFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (mode === "register") {
        await registerAccount(
          { name: name.trim(), email: email.trim(), phone: phone.trim(), password },
          role,
        );
      } else {
        await signIn(email.trim(), password);
      }
      router.push(role === "landlord" ? "/list-property" : "/listings");
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "We couldn’t complete that request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const isRegistering = mode === "register";

  return (
    <section className="min-h-screen bg-[#f8f8f5] px-5 pb-20 pt-32 dark:bg-[#111a15] sm:px-8 sm:pt-36">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-[#e4e9e4] bg-white shadow-sm dark:border-[#2b3a30] dark:bg-[#18231c] lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden min-h-[620px] flex-col justify-between overflow-hidden bg-[#1d4635] p-10 text-white lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,223,191,0.28),transparent_55%)]" />
          <Link href="/" className="relative inline-flex items-center gap-2 text-sm text-white/75 hover:text-white">
            <ArrowLeft size={16} /> Back to Housepot
          </Link>
          <div className="relative">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#c5dfbf]">
              {role === "landlord" ? <House size={24} /> : <Search size={24} />}
            </span>
            <h1 className="mt-7 max-w-sm text-4xl font-semibold leading-tight tracking-tight">
              {role === "landlord"
                ? "A better way to share your property."
                : "A better way to find your next home."}
            </h1>
            <p className="mt-4 max-w-sm leading-7 text-white/70">
              {role === "landlord"
                ? "Create a landlord account to share your property with people looking for their next place."
                : "Create a tenant account to find and keep track of homes that feel right for you."}
            </p>
          </div>
          <p className="relative text-xs text-white/50">Housepot · Made for Kenya</p>
        </aside>

        <div className="p-6 sm:p-10 lg:p-12">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-[#66736b] hover:text-[#285c45] dark:text-[#aab5ad] dark:hover:text-[#b6d8bd] lg:hidden">
            <ArrowLeft size={16} /> Housepot
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#52765b] dark:text-[#b6d8bd]">
            {role === "landlord" ? "Landlord portal" : "Tenant portal"}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#202a24] dark:text-white">
            {isRegistering ? "Create your account" : "Welcome back"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#66736b] dark:text-[#aab5ad]">
            {isRegistering
              ? `Set up your ${role} profile to get started.`
              : role === "landlord"
                ? "Sign in to continue to your property listings."
                : "Sign in to continue your home search."}
          </p>

          <div className="mt-7 grid grid-cols-2 rounded-xl bg-[#f1f5f0] p-1 dark:bg-[#223127]">
            {(["register", "login"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setMode(tab);
                  setError("");
                }}
                aria-pressed={mode === tab}
                className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                  mode === tab
                    ? "bg-white text-[#285c45] shadow-sm dark:bg-[#18231c] dark:text-[#b6d8bd]"
                    : "text-[#66736b] hover:text-[#202a24] dark:text-[#aab5ad] dark:hover:text-white"
                }`}
              >
                {tab === "register" ? "Create account" : "Sign in"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {isRegistering && (
              <>
                <label className="block text-sm font-medium text-[#354239] dark:text-gray-200">
                  Full name
                  <input
                    className={inputClass}
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    maxLength={120}
                  />
                </label>
                <label className="block text-sm font-medium text-[#354239] dark:text-gray-200">
                  Phone number
                  <input
                    className={inputClass}
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                    maxLength={30}
                    placeholder="+254..."
                  />
                </label>
              </>
            )}
            <label className="block text-sm font-medium text-[#354239] dark:text-gray-200">
              Email address
              <input
                className={inputClass}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                maxLength={254}
              />
            </label>
            <label className="block text-sm font-medium text-[#354239] dark:text-gray-200">
              Password
              <input
                className={inputClass}
                type="password"
                autoComplete={isRegistering ? "new-password" : "current-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
                maxLength={128}
              />
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#285c45] px-5 text-sm font-semibold text-white transition hover:bg-[#1d4635] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#9ac5a5] dark:text-[#17231b] dark:hover:bg-[#b6d8bd]"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  {isRegistering ? "Creating account..." : "Signing in..."}
                </>
              ) : (
                <>
                  {isRegistering ? `Create ${role} account` : "Sign in"}
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <Link
            href={`/account${next ? `?next=${next}` : ""}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#52765b] hover:text-[#285c45] dark:text-[#b6d8bd] dark:hover:text-white"
          >
            <ArrowLeft size={15} />
            Choose a different account type
          </Link>

          <p className="mt-5 text-xs leading-5 text-[#7b877e] dark:text-[#94a198]">
            By continuing, you agree to use Housepot responsibly. Your account
            and listing permissions are verified by Housepot.
          </p>
        </div>
      </div>
    </section>
  );
}
