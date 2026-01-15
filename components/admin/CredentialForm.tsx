"use client";

import { useState, useEffect } from "react";
import { Credential } from "@/lib/types/cms";
import { Button } from "@/components/ui/button";
import { m } from "framer-motion";

interface CredentialFormProps {
  credential?: Credential | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CredentialForm({
  credential,
  onClose,
  onSuccess,
}: CredentialFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    industry_tags: [] as string[],
    service_tags: [] as string[],
    is_active: true,
    sort_order: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Predefined tags
  const industryTags = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Energy",
    "Entertainment",
    "Food",
    "Industrial",
    "Infrastructure",
    "Logistics",
    "Real Estate",
    "Food & Agriculture",
    "Consumer",
  ];

  const serviceTags = [
    "Business Strategy",
    "Business Valuation",
    "M&A Consulting",
    "Transaction Support",
    "Commercial Due Diligence",
    "Portfolio Valuation",
    "Value Creation",
    "Turnaround Advisory",
    "Restructuring Consulting",
    "Brand Strategy",
    "Business Plan",
    "Feasibility Study",
    "Growth Strategy",
    "Market Research",
    "Real Estate Strategy",
    "Transaction Advisory",
    "Investor Documents",
    "Restructuring",
    "Financial Due Diligence",
    "Strategic Options Analysis",
    "Pro Bono",
  ];

  useEffect(() => {
    if (credential) {
      setFormData({
        title: credential.title || "",
        industry_tags: credential.industry_tags || [],
        service_tags: credential.service_tags || [],
        is_active: credential.is_active ?? true,
        sort_order: credential.sort_order || 0,
      });
    }
  }, [credential]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const url = credential ? "/api/credentials" : "/api/credentials";
      const method = credential ? "PUT" : "POST";
      const body = credential ? { id: credential.id, ...formData } : formData;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save credential");
      }

      onSuccess();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagToggle = (tag: string, tagType: "industry" | "service") => {
    const field = tagType === "industry" ? "industry_tags" : "service_tags";
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(tag)
        ? prev[field].filter((t) => t !== tag)
        : [...prev[field], tag],
    }));
  };

  return (
    <div className="mx-auto bg-white p-10">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-dark mb-2"
            >
              Title *
            </label>
            <textarea
              id="title"
              required
              rows={2}
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="mt-1 block w-full border-b border-dark/10 focus:!ring-0 sm:text-md resize-none p-3 !outline-0"
              placeholder="Enter credential title"
            />
          </div>
          <div className="md:col-span-4 flex justify-end items-end">
            <div className="w-full">
              <label
                htmlFor="sort_order"
                className="block text-sm font-medium text-dark mb-2"
              >
                Sort Order
              </label>
              <input
                type="number"
                id="sort_order"
                value={formData.sort_order}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    sort_order: parseInt(e.target.value) || 0,
                  }))
                }
                className="mt-1 block w-full border-dark/10 !outline-0 focus:border-dark sm:text-md p-3"
                placeholder="Sort Order"
              />
            </div>
            <div className="mt-6 w-full py-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      is_active: e.target.checked,
                    }))
                  }
                  className="border-dark/10 focus:ring-dark"
                />
                <span className="ml-2 text-sm text-dark">Active</span>
              </label>
            </div>
          </div>
        </div>

        {/* Industry Tags */}
        <div>
          <label className="block text-sm font-medium text-dark mb-2">
            Industry Tags *
          </label>
          <div className="flex flex-wrap gap-2">
            {industryTags.map((tag) => (
              <Button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag, "industry")}
                variant={
                  formData.industry_tags.includes(tag) ? "secondary" : "ghost"
                }
                size="default"
                className={`px-3 py-1 text-xs border ${formData.industry_tags.includes(tag) ? "bg-dark text-white border-dark" : "bg-surface text-dark/60 border-dark/10 hover:bg-dark/10"} rounded-none`}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Service Tags */}
        <div>
          <label className="block text-sm font-medium text-dark mb-2">
            Service Tags *
          </label>
          <div className="flex flex-wrap gap-2">
            {serviceTags.map((tag) => (
              <Button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag, "service")}
                variant={
                  formData.service_tags.includes(tag) ? "secondary" : "ghost"
                }
                size="default"
                className={`px-3 py-1 text-xs border ${formData.service_tags.includes(tag) ? "bg-dark text-white border-dark" : "bg-surface text-dark/60 border-dark/10 hover:bg-dark/10"} rounded-none`}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {error && (
          <div className=" bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-6">
          <Button
            type="button"
            onClick={onClose}
            variant="ghost"
            size="default"
            className="border border-dark/10 rounded-none"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              isLoading ||
              !formData.title ||
              formData.industry_tags.length === 0 ||
              formData.service_tags.length === 0
            }
            variant="secondary"
            size="default"
            className="bg-dark text-white rounded-none"
          >
            {isLoading ? "Saving..." : credential ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
