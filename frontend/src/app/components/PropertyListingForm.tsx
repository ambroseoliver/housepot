"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ImagePlus,
  LoaderCircle,
  LogOut,
  Upload,
} from "lucide-react";
import { clearAuth, getAccessToken } from "@/lib/auth";
import { getApiBaseUrl, readApiError } from "@/lib/api";

const inputClass =
  "mt-2 h-12 w-full rounded-xl border border-[#dce4dc] bg-white px-4 text-sm text-[#202a24] outline-none transition placeholder:text-[#89938c] focus:border-[#78a987] focus:ring-4 focus:ring-[#78a987]/15 dark:border-[#35473a] dark:bg-[#18231c] dark:text-white dark:placeholder:text-gray-400";
const labelClass = "block text-sm font-medium text-[#354239] dark:text-gray-200";
const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

export default function PropertyListingForm() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [rent, setRent] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      router.replace("/account?next=list-property");
      return;
    }
    setToken(accessToken);
    setCheckingAuth(false);
  }, [router]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    setError("");
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setImage(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setImage(null);
      event.target.value = "";
      setError("Choose an image file such as JPG, PNG, or WebP.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setImage(null);
      event.target.value = "";
      setError("Your image must be 8 MB or smaller.");
      return;
    }
    setImage(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) {
      router.replace("/account?next=list-property");
      return;
    }
    setError("");
    setIsSubmitting(true);

    const listing = new FormData();
    listing.set("title", title.trim());
    listing.set("location", location.trim());
    listing.set("property_type", type);
    listing.set("monthly_rent", rent);
    listing.set("bedrooms", bedrooms);
    listing.set("bathrooms", bathrooms);
    listing.set("description", description.trim());
    if (image) listing.set("image", image);

    try {
      const response = await fetch(`${getApiBaseUrl()}/api/listings/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: listing,
      });

      if (response.status === 401) {
        clearAuth();
        setToken(null);
        router.replace("/account?next=list-property");
        return;
      }
      if (response.status === 403) {
        setError(
          "This account cannot publish property listings. Sign in with a landlord account or contact Housepot support.",
        );
        return;
      }
      if (!response.ok) throw new Error(await readApiError(response));

      setSubmitted(true);
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "We couldn’t submit your property. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (checkingAuth) {
    return (
      <div
        className="min-h-screen animate-pulse bg-[#f8f8f5] pt-32 dark:bg-[#111a15]"
        aria-label="Checking your account"
      />
    );
  }

  if (submitted) {
    return (
      <section className="min-h-screen bg-[#f8f8f5] px-5 pb-20 pt-32 dark:bg-[#111a15] sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#e4e9e4] bg-white p-8 text-center dark:border-[#2b3a30] dark:bg-[#18231c] sm:p-12">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edf4ed] text-[#285c45] dark:bg-[#26382b] dark:text-[#b6d8bd]">
            <CheckCircle2 size={28} />
          </span>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#52765b] dark:text-[#b6d8bd]">
            Property submitted
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#202a24] dark:text-white">
            Thanks for sharing your home.
          </h1>
          <p className="mx-auto mt-4 max-w-lg leading-7 text-[#66736b] dark:text-[#aab5ad]">
            Your property details were sent to Housepot. Our team will review
            the submission and follow up with you about the next steps.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/listings"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#285c45] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1d4635] dark:bg-[#9ac5a5] dark:text-[#17231b]"
            >
              Explore homes <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setTitle("");
                setLocation("");
                setType("");
                setRent("");
                setBedrooms("");
                setBathrooms("");
                setDescription("");
                setImage(null);
              }}
              className="rounded-full border border-[#dce4dc] px-5 py-3 text-sm font-semibold text-[#354239] hover:bg-[#f8faf7] dark:border-[#35473a] dark:text-gray-100 dark:hover:bg-white/5"
            >
              List another property
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f8f8f5] px-5 pb-20 pt-32 dark:bg-[#111a15] sm:px-8 sm:pt-36">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#66736b] hover:text-[#285c45] dark:text-[#aab5ad] dark:hover:text-[#b6d8bd]"
        >
          <ArrowLeft size={16} /> Back to Housepot
        </Link>
        <div className="mt-7 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#52765b] dark:text-[#b6d8bd]">
              Landlord portal
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-[#202a24] dark:text-white sm:text-5xl">
              List your property
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-[#66736b] dark:text-[#aab5ad]">
              Share the key details so home seekers can discover your rental.
              Housepot will follow up about review and publication.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              clearAuth();
              router.push("/account");
            }}
            className="inline-flex items-center gap-2 rounded-full border border-[#dce4dc] px-4 py-2.5 text-sm font-semibold text-[#66736b] hover:bg-white dark:border-[#35473a] dark:text-[#aab5ad] dark:hover:bg-[#18231c]"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-9 rounded-2xl border border-[#e4e9e4] bg-white p-5 dark:border-[#2b3a30] dark:bg-[#18231c] sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className={`${labelClass} sm:col-span-2`}>
              Listing title
              <input
                className={inputClass}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Bright 2-bedroom apartment in Kilimani"
                required
                maxLength={150}
              />
            </label>

            <label className={labelClass}>
              Neighbourhood or location
              <input
                className={inputClass}
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="e.g. Kilimani, Nairobi"
                required
                maxLength={150}
              />
            </label>
            <label className={labelClass}>
              Property type
              <select
                className={inputClass}
                value={type}
                onChange={(event) => setType(event.target.value)}
                required
              >
                <option value="" disabled>
                  Choose a type
                </option>
                <option value="bedsitter">Bedsitter</option>
                <option value="studio">Studio</option>
                <option value="apartment">Apartment</option>
                <option value="townhouse">Townhouse</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
              </select>
            </label>

            <label className={labelClass}>
              Monthly rent (KSh)
              <input
                className={inputClass}
                type="number"
                min="1"
                step="1"
                value={rent}
                onChange={(event) => setRent(event.target.value)}
                placeholder="e.g. 45000"
                required
              />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className={labelClass}>
                Bedrooms
                <select
                  className={inputClass}
                  value={bedrooms}
                  onChange={(event) => setBedrooms(event.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="0">Bedsitter / studio</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </label>
              <label className={labelClass}>
                Bathrooms
                <select
                  className={inputClass}
                  value={bathrooms}
                  onChange={(event) => setBathrooms(event.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </label>
            </div>

            <label className={`${labelClass} sm:col-span-2`}>
              About this home
              <textarea
                className="mt-2 min-h-32 w-full rounded-xl border border-[#dce4dc] bg-white px-4 py-3 text-sm leading-6 text-[#202a24] outline-none transition placeholder:text-[#89938c] focus:border-[#78a987] focus:ring-4 focus:ring-[#78a987]/15 dark:border-[#35473a] dark:bg-[#18231c] dark:text-white dark:placeholder:text-gray-400"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the home, its features, and what makes the location special."
                required
                minLength={20}
                maxLength={3000}
              />
              <span className="mt-1 block text-xs font-normal text-[#7b877e] dark:text-[#94a198]">
                {description.length}/3000 characters
              </span>
            </label>

            <label className={`${labelClass} sm:col-span-2`}>
              Cover photo
              <span className="mt-2 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#bdcbbf] bg-[#f8faf7] px-4 py-5 text-center transition hover:border-[#78a987] dark:border-[#405344] dark:bg-[#142018]">
                {image ? (
                  <>
                    <ImagePlus size={21} className="text-[#52765b] dark:text-[#b6d8bd]" />
                    <span className="mt-2 text-sm font-semibold text-[#354239] dark:text-gray-100">
                      {image.name}
                    </span>
                    <span className="mt-1 text-xs text-[#7b877e] dark:text-[#94a198]">
                      {(image.size / 1024 / 1024).toFixed(1)} MB · Click to change
                    </span>
                  </>
                ) : (
                  <>
                    <Upload size={21} className="text-[#52765b] dark:text-[#b6d8bd]" />
                    <span className="mt-2 text-sm font-semibold text-[#354239] dark:text-gray-100">
                      Choose a property photo
                    </span>
                    <span className="mt-1 text-xs text-[#7b877e] dark:text-[#94a198]">
                      JPG, PNG, or WebP · up to 8 MB
                    </span>
                  </>
                )}
                <input
                  className="sr-only"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  required={!image}
                />
              </span>
            </label>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200"
            >
              {error}
            </p>
          )}

          <div className="mt-7 flex flex-col gap-4 border-t border-[#e4e9e4] pt-6 dark:border-[#2b3a30] sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-xs leading-5 text-[#7b877e] dark:text-[#94a198]">
              Your listing is submitted for Housepot review. Publication and
              landlord permissions are controlled by the backend.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#285c45] px-6 text-sm font-semibold text-white transition hover:bg-[#1d4635] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#9ac5a5] dark:text-[#17231b] dark:hover:bg-[#b6d8bd]"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit property <ArrowRight size={17} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
