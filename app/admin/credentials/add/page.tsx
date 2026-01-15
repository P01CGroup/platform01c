"use client";
import AdminNavbarClient from "@/app/admin/AdminNavbarClient";
import HeroAdmin from "@/components/admin/HeroAdmin";
import CredentialForm from "@/components/admin/CredentialForm";
import { useRouter } from "next/navigation";
import React from "react";

export default function AddCredentialPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-surface">
      <AdminNavbarClient />
      <HeroAdmin
        title="Add Credential"
        description="Create a new credential for Platform01."
      />
      <div className="container py-8">
        <CredentialForm
          onSuccess={() => router.push("/admin/credentials?updated=1")}
          onClose={() => router.push("/admin/credentials")}
        />
      </div>
    </div>
  );
}
