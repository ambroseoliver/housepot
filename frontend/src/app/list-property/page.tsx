import type { Metadata } from "next";
import PropertyListingForm from "../components/PropertyListingForm";

export const metadata: Metadata = {
  title: "List your property",
  description:
    "Create a landlord account and share your rental property with home seekers on Housepot.",
};

export default function ListPropertyPage() {
  return <PropertyListingForm />;
}
