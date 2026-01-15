"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./button";
import ArrowRight from "../icons/ArrowRight";
import { CheckCircle } from "lucide-react";

type Variant = "inline" | "modal";

interface Props {
  heading?: string;
  variant?: Variant;
  context?: string;
  className?: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
}

const ContactForm: React.FC<Props> = ({ heading = "Submit an Inquiry", variant = "inline", context = "contact_form", className = "" }) => {
  const [formData, setFormData] = useState<FormData>({ fullName: "", email: "", phone: "", company: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({ fullName: false, email: false, phone: false, company: false, message: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const normalizeTel = (n: string) => {
    const cleaned = n.replace(/[^\d+]/g, "");
    const noDupPlus = cleaned.replace(/\+/g, "");
    return cleaned.startsWith("+") ? "+" + noDupPlus : noDupPlus;
  };

  const validateField = (field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2) return "Full name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
        break;
      case "phone":
        if (!value.trim()) return "Phone number is required";
        const digits = value.replace(/[^\d]/g, "");
        if (digits.length < 6) return "Please enter a valid phone number";
        break;
      case "company":
        if (!value.trim()) return "Company name is required";
        if (value.trim().length < 2) return "Company name must be at least 2 characters";
        break;
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message must be at least 10 characters";
        break;
    }
    return undefined;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    let v = value;
    setFormData((p) => ({ ...p, [field]: v }));
    if (touched[field] || errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, v) }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, formData[field]) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, email: true, phone: true, company: true, message: true });
    const allErrors: FormErrors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      company: validateField("company", formData.company),
      message: validateField("message", formData.message),
    };
    setErrors(allErrors);
    if (Object.values(allErrors).some(Boolean)) return;

    setIsSubmitting(true);
    const payload = { ...formData, phone: normalizeTel(formData.phone), pageUrl: typeof window !== "undefined" ? window.location.href : undefined };
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (response.ok) {
        if (typeof window !== "undefined" && (window as any).dataLayer) {
          (window as any).dataLayer.push({ event: "form_submission_success", form_type: "contact_inquiry", form_location: context, form_data: { has_name: !!formData.fullName, has_email: !!formData.email, has_phone: !!formData.phone, has_company: !!formData.company, has_message: !!formData.message, message_length: formData.message.length }, timestamp: new Date().toISOString() });
        }
        setShowThankYou(true);
        setFormData({ fullName: "", email: "", phone: "", company: "", message: "" });
        setTimeout(() => setShowThankYou(false), 5000);
      } else {
        if (typeof window !== "undefined" && (window as any).dataLayer) {
          (window as any).dataLayer.push({ event: "form_submission_error", form_type: "contact_inquiry", form_location: context, error_type: "api_error", error_message: result.error || "Unknown API error", timestamp: new Date().toISOString() });
        }
      }
    } catch (error: any) {
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({ event: "form_submission_error", form_type: "contact_inquiry", form_location: context, error_type: "network_error", error_message: error?.message || "Unknown error", timestamp: new Date().toISOString() });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = !formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.company.trim() || !formData.message.trim() || isSubmitting;

  return (
    <div className={className}>
      <AnimatePresence>
        {showThankYou ? (
          <motion.div key="ty" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }} className="text-center py-8">
            <div className="text-4xl mb-4"><CheckCircle className="text-dark mx-auto" /></div>
            <h3 className="heading-4 mb-2">Thank You!</h3>
            <p className="text-dark/70">Your inquiry has been submitted successfully. We'll get back to you soon!</p>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            {variant === "inline" && <h2 className="heading-4">{heading}</h2>}
            {variant === "inline" && <hr className="border-dark/10 my-4" />}
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="sr-only" htmlFor="fullName">Full Name</label>
                  <input id="fullName" type="text" placeholder="Full Name" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} onBlur={() => handleBlur("fullName")} aria-invalid={!!errors.fullName} aria-describedby="fullName-error" className={`w-full bg-transparent border-b focus:outline-none py-2 px-0 placeholder:text-dark/50 ${errors.fullName ? "border-red-500" : "border-dark/10"}`} />
                  {errors.fullName && <p id="fullName-error" role="alert" className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="sr-only" htmlFor="email">Email</label>
                  <input id="email" type="email" placeholder="Email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} onBlur={() => handleBlur("email")} aria-invalid={!!errors.email} aria-describedby="email-error" className={`w-full bg-transparent border-b focus:outline-none py-2 px-0 placeholder:text-dark/50 ${errors.email ? "border-red-500" : "border-dark/10"}`} />
                  {errors.email && <p id="email-error" role="alert" className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="sr-only" htmlFor="phone">Phone</label>
                  <input id="phone" type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} onBlur={() => handleBlur("phone")} aria-invalid={!!errors.phone} aria-describedby="phone-error" className={`w-full bg-transparent border-b focus:outline-none py-2 px-0 placeholder:text-dark/50 ${errors.phone ? "border-red-500" : "border-dark/10"}`} />
                  {errors.phone && <p id="phone-error" role="alert" className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="sr-only" htmlFor="company">Company</label>
                  <input id="company" type="text" placeholder="Company" value={formData.company} onChange={(e) => handleInputChange("company", e.target.value)} onBlur={() => handleBlur("company")} aria-invalid={!!errors.company} aria-describedby="company-error" className={`w-full bg-transparent border-b focus:outline-none py-2 px-0 placeholder:text-dark/50 ${errors.company ? "border-red-500" : "border-dark/10"}`} />
                  {errors.company && <p id="company-error" role="alert" className="text-red-500 text-sm mt-1">{errors.company}</p>}
                </div>
                <div>
                  <label className="sr-only" htmlFor="message">Message</label>
                  <textarea id="message" placeholder="Message" rows={4} value={formData.message} onChange={(e) => handleInputChange("message", e.target.value)} onBlur={() => handleBlur("message")} aria-invalid={!!errors.message} aria-describedby="message-error" className={`w-full bg-transparent border-b focus:outline-none py-2 px-0 placeholder:text-dark/50 resize-none ${errors.message ? "border-red-500" : "border-dark/10"}`} />
                  {errors.message && <p id="message-error" role="alert" className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                <Button variant="primary" size="icon" type="submit" disabled={isDisabled} className="disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                  ) : (
                    <>
                      Submit an inquiry <ArrowRight />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
