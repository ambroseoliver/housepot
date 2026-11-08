import type { Metadata } from "next";
import PasswordResetForm from "@/app/components/PasswordResetForm";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset your Housepot account password.",
};

type PasswordResetPageProps = {
  searchParams: Promise<{ uid?: string; token?: string }>;
};

export default async function PasswordResetPage({ searchParams }: PasswordResetPageProps) {
  const params = await searchParams;
  return <PasswordResetForm uid={params.uid} token={params.token} />;
}
