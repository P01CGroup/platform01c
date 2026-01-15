"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/ui/header";
import CredentialCard from "@/components/ui/credential-card";
import { Credential } from "@/lib/types/cms";

interface CredentialsBrowserProps {
  credentials: Credential[];
}

export default function CredentialsBrowser({
  credentials,
}: CredentialsBrowserProps) {
  const [currentCredentials, setCurrentCredentials] = useState(credentials);

  // Update credentials when props change (for real-time updates)
  useEffect(() => {
    setCurrentCredentials(credentials);
  }, [credentials]);

  // Tabs for filter mode
  const topTabs = [
    { label: "Industry", value: "industry" },
    { label: "Service", value: "service" },
  ];

  // Extract unique tags
  const allIndustryTags = Array.from(
    new Set(currentCredentials.flatMap((c) => c.industry_tags))
  ).sort();
  const allServiceTags = Array.from(
    new Set(currentCredentials.flatMap((c) => c.service_tags))
  ).sort();

  const [activeTopTab, setActiveTopTab] = useState<"industry" | "service">(
    "industry"
  );
  const [activeSubTab, setActiveSubTab] = useState("Show All");

  // Sub-tabs based on selected mode
  const subTabs =
    activeTopTab === "industry"
      ? ["Show All", ...allIndustryTags]
      : ["Show All", ...allServiceTags];

  // Filtering logic
  const filteredCredentials = currentCredentials.filter((cred) => {
    if (activeTopTab === "industry") {
      if (activeSubTab === "Show All") return true;
      return cred.industry_tags.includes(activeSubTab);
    } else {
      if (activeSubTab === "Show All") return true;
      return cred.service_tags.includes(activeSubTab);
    }
  });

  // Lazy loading state
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        visibleCount < filteredCredentials.length &&
        !loading
      ) {
        setLoading(true);
        setTimeout(() => {
          setVisibleCount((c) => Math.min(c + 12, filteredCredentials.length));
          setLoading(false);
        }, 700); // Simulate loading delay
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredCredentials.length, visibleCount, loading]);

  // Reset visible count on filter change
  useEffect(() => {
    setVisibleCount(12);
  }, [activeTopTab, activeSubTab]);

  // Animation variants for cards (no exit)
  const cardVariants = {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: {}, // No exit animation for instant removal
  };

  const SKELETON_COUNT = 8;
  const SkeletonCard = () => (
    <motion.div
      className="pt-4 text-left bg-transparent rounded-none h-full animate-pulse"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="h-4 w-24 bg-dark/10 mb-2 rounded" />
      <div className="h-6 w-3/4 bg-dark/10 rounded" />
    </motion.div>
  );

  return (
    <div className="container pb-16">
      <Header text="Filter Credentials By" className="mt-4 pb-20" />
      <div className="mb-8">
        <div className="flex gap-8 border-b border-dark/10 pb-2">
          {topTabs.map((tab) => (
            <button
              key={tab.value}
              className={`heading-2 transition-colors ${activeTopTab === tab.value ? "border-primary text-dark" : "border-transparent text-dark/50 hover:text-dark"}`}
              onClick={() => {
                setActiveTopTab(tab.value as "industry" | "service");
                setActiveSubTab("Show All");
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex gap-4 mt-4 flex-wrap">
          {subTabs.map((sub: string) => (
            <button
              key={sub}
              className={`text-sm px-3 py-1 transition-colors ${activeSubTab === sub ? "bg-secondary text-white" : "bg-surface text-dark/70 hover:bg-primary/10"}`}
              onClick={() => setActiveSubTab(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[500px]"
        layout
        layoutRoot
        transition={{ layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
      >
        <AnimatePresence initial={false}>
          {filteredCredentials.slice(0, visibleCount).map((cred, idx) => (
            <motion.div
              key={cred.title + idx}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, delay: idx * 0.03 }}
              layout
            >
              <CredentialCard
                category={
                  activeTopTab === "industry"
                    ? cred.industry_tags.join(", ")
                    : cred.service_tags.join(", ")
                }
                title={cred.title}
              />
            </motion.div>
          ))}
          {loading &&
            Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
              <SkeletonCard key={"skeleton-" + idx} />
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
