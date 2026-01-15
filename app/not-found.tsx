import Button from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import CalendlyModalWrapper from "@/components/ui/CalendlyModalWrapper";

export default function NotFound() {
  return (
    <div className="py-35 mt-20 flex flex-col items-center justify-center bg-white px-4">
      <h1 className="heading-2 text-dark mb-4">404 — Page Not Found</h1>
      <h2 className="heading-3 text-dark mb-4">
        This page is currently unavailable.
      </h2>
      <p className="text-base text-dark/50 mb-8 max-w-xl text-center">
        The link you followed may be broken or the page may have been moved.
        <br />
        Please use the navigation menu to continue browsing or return to the
        homepage.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <CalendlyModalWrapper>
          <Button size="default" variant="ghost">
            Talk to an expert{" "}
            <ChevronRight className="stroke-dark/50" height={16} width={16} />
          </Button>
        </CalendlyModalWrapper>
        <Link href="/">
          <Button size="default" variant="secondary">
            Return to Homepage{" "}
            <ChevronRight className="stroke-white" height={16} width={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
