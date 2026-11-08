"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";
import { getApiBaseUrl, readApiError } from "@/lib/api";

const inputClass =
  "mt-2 h-12 w-full rounded-xl border border-[#dce4dc] bg-white px-4 text-sm text-[#202a24] outline-none transition placeholder:text-[#89938c] focus:border-[#78a987] focus:ring-4 focus:ring-[#78a987]/15 dark:border-[#35473a] dark:bg-[#18231c] dark:text-white dark:placeholder:text-gray-400";

type PasswordResetFormProps = {
  uid?: string;
  token?: string;
};

export default function PasswordResetForm({ uid, token }: PasswordResetFormProps) {
  const isConfirming = Boolean(uid && token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (isConfirming && password !== confirmation) {
      setError("The passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${getApiBaseUrl()}/api/users/${isConfirming ? "password-reset/confirm/" : "password-reset/"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(
            isConfirming
              ? { uid, token, new_password: password }
              : { email: email.trim() },
          ),
        },
      );
      if (!response.ok) throw new Error(await readApiError(response));
      const result: unknown = await response.json();
      const detail =
        typeof result === "object" && result !== null && "detail" in result
          ? result.detail
          : "Your request has been completed.";
      setMessage(typeof detail === "string" ? detail : "Your request has been completed.");
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "We could not complete the request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#f8f8f5] px-5 pb-20 pt-32 dark:bg-[#111a15] sm:px-8 sm:pt-36">
      <div className="mx-auto max-w-lg rounded-3xl border border-[#e4e9e4] bg-white p-6 shadow-sm dark:border-[#2b3a30] dark:bg-[#18231c] sm:p-10">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-sm text-[#66736b] hover:text-[#285c45] dark:text-[#aab5ad] dark:hover:text-[#b6d8bd]"
        >
          <ArrowLeft size={16} /> Back to sign in
        </Link>
        <h1 className="mt-7 text-3xl font-semibold tracking-tight text-[#202a24] dark:text-white">
          {isConfirming ? "Choose a new password" : "Reset your password"}
        </h1>
        <p className="mt-3 leading-7 text-[#66736b] dark:text-[#aab5ad]">
          {isConfirming
            ? "Choose a strong password you have not used before."
            : "Enter your account email and we’ll send password reset instructions if it matches an account."}
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          {isConfirming ? (
            <>
              <label className="block text-sm font-medium text-[#354239] dark:text-gray-200">
                New password
                <input
                  className={inputClass}
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={10}
                  maxLength={128}
                  required
                />
              </label>
              <label className="block text-sm font-medium text-[#354239] dark:text-gray-200">
                Confirm new password
                <input
                  className={inputClass}
                  type="password"
                  autoComplete="new-password"
                  value={confirmation}
                  onChange={(event) => setConfirmation(event.target.value)}
                  minLength={10}
                  maxLength={128}
                  required
                />
              </label>
            </>
          ) : (
            <label className="block text-sm font-medium text-[#354239] dark:text-gray-200">
              Email address
              <input
                className={inputClass}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                maxLength={254}
                required
              />
            </label>
          )}

          {error && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">
              {error}
            </p>
          )}
          {message && (
            <p role="status" className="rounded-xl border border-[#cbdccf] bg-[#f1f7f1] px-4 py-3 text-sm leading-6 text-[#285c45] dark:border-[#405947] dark:bg-[#223127] dark:text-[#b6d8bd]">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#285c45] px-5 text-sm font-semibold text-white transition hover:bg-[#1d4635] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#9ac5a5] dark:text-[#17231b]"
          >
            {isSubmitting ? <LoaderCircle size={17} className="animate-spin" /> : <ArrowRight size={17} />}
            {isSubmitting ? "Please wait..." : isConfirming ? "Update password" : "Send reset instructions"}
          </button>
        </form>
      </div>
    </section>
  );
}
