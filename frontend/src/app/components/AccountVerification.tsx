"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, LoaderCircle, XCircle } from "lucide-react";
import { getApiBaseUrl, readApiError } from "@/lib/api";

export default function AccountVerification({ token }: { token: string }) {
  const [message, setMessage] = useState("Verifying your email address...");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function verify() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/verify-email/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ token }),
        });
        if (!response.ok) throw new Error(await readApiError(response));
        const result: unknown = await response.json();
        const detail =
          typeof result === "object" && result !== null && "detail" in result
            ? result.detail
            : "Your email address is verified.";
        if (active) setMessage(typeof detail === "string" ? detail : "Your email address is verified.");
      } catch (reason) {
        if (active) {
          setError(
            reason instanceof Error
              ? reason.message
              : "We could not verify your email address. Request a new verification email.",
          );
        }
      }
    }

    void verify();
    return () => {
      active = false;
    };
  }, [token]);

  return (
    <section className="min-h-screen bg-[#f8f8f5] px-5 pb-20 pt-32 dark:bg-[#111a15] sm:px-8 sm:pt-36">
      <div className="mx-auto max-w-xl rounded-3xl border border-[#e4e9e4] bg-white p-8 text-center dark:border-[#2b3a30] dark:bg-[#18231c] sm:p-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edf4ed] text-[#285c45] dark:bg-[#26382b] dark:text-[#b6d8bd]">
          {error ? <XCircle size={28} /> : message.startsWith("Verifying") ? <LoaderCircle size={28} className="animate-spin" /> : <CheckCircle2 size={28} />}
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-[#202a24] dark:text-white">
          {error ? "Verification link unavailable" : "Email verification"}
        </h1>
        <p className="mt-3 leading-7 text-[#66736b] dark:text-[#aab5ad]">
          {error || message}
        </p>
        <Link
          href="/account"
          className="mt-7 inline-flex rounded-full bg-[#285c45] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1d4635] dark:bg-[#9ac5a5] dark:text-[#17231b]"
        >
          Continue to Housepot
        </Link>
      </div>
    </section>
  );
}
