"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/ui/header";
import InsightCard from "@/components/ui/insight-card";
import { Insight } from "@/lib/types/cms";
import Link from "next/link";
import { getDatePart, areDatesDifferent } from "@/lib/utils/date-format";
import { Button } from "../ui/button";

interface InsightsBrowserProps {
  insights: Insight[];
}

// Map database insight to card format
function mapToCard(insight: Insight) {
  const publishedDate =
    getDatePart(insight.published_date) || getDatePart(new Date()) || "";
  const updatedDate = getDatePart(insight.updated_at);

  return {
    image:
      insight.image_url ||
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    date: publishedDate,
    updatedDate:
      updatedDate && areDatesDifferent(updatedDate, publishedDate)
        ? updatedDate
        : undefined,
    title: insight.title,
    excerpt: insight.excerpt,
    author: insight.author,
    coAuthor: insight.co_author || "",
    slug: insight.slug,
  };
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function InsightsBrowser({ insights }: InsightsBrowserProps) {
  const [currentInsights, setCurrentInsights] = useState(insights);

  // Update insights when props change (for real-time updates)
  // useEffect(() => {
  //   setCurrentInsights(insights);
  // }, [insights]);
  useEffect(() => {
    // Shuffle insights every time they change (or on reload)
    const shuffledInsights = shuffleArray(insights);
    setCurrentInsights(shuffledInsights);
  }, []);

  // Extract unique tags from all insights
  const allTags = Array.from(
    new Set(currentInsights.flatMap((insight) => insight.tags || []))
  ).sort();

  const [activeTag, setActiveTag] = useState("Show All");

  // Filtering logic
  const filteredInsights = currentInsights.filter((insight) => {
    if (activeTag === "Show All") return true;
    return insight.tags?.includes(activeTag) || false;
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
        visibleCount < filteredInsights.length &&
        !loading
      ) {
        setLoading(true);
        setTimeout(() => {
          setVisibleCount((c) => Math.min(c + 12, filteredInsights.length));
          setLoading(false);
        }, 700); // Simulate loading delay
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredInsights.length, visibleCount, loading]);

  // Reset visible count on filter change
  useEffect(() => {
    setVisibleCount(12);
  }, [activeTag]);

  // Animation variants for cards
  const cardVariants = {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: {},
  };

  const SKELETON_COUNT = 6;
  const SkeletonCard = () => (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-dark/10 p-6 h-full animate-pulse"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="h-48 bg-dark/10 rounded-lg mb-4" />
      <div className="h-4 w-24 bg-dark/10 mb-2 rounded" />
      <div className="h-6 w-3/4 bg-dark/10 rounded mb-2" />
      <div className="h-4 w-full bg-dark/10 rounded" />
    </motion.div>
  );

  return (
    <div className="container pb-16">
      {/* Category Filter Tabs */}
      <div className="mb-8">
        <div className="flex gap-4 flex-wrap">
          {["Show All", ...allTags].map((tag) => (
            <Button
              key={tag}
              className={`${
                activeTag === tag
                  ? "bg-dark text-white"
                  : "bg-surface text-dark/70 hover:bg-primary/10"
              }`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-dark/50">
          {filteredInsights.length} insight
          {filteredInsights.length !== 1 ? "s" : ""} found
          {activeTag !== "Show All" && ` in "${activeTag}" category`}
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]"
        layout
        layoutRoot
        transition={{ layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
      >
        <AnimatePresence initial={false}>
          {filteredInsights.slice(0, visibleCount).map((insight, idx) => (
            <motion.div
              key={insight.id + idx}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, delay: idx * 0.03 }}
              layout
            >
              <InsightCard insight={mapToCard(insight)} key={insight.id} />
            </motion.div>
          ))}
          {loading &&
            Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
              <SkeletonCard key={"skeleton-" + idx} />
            ))}
        </AnimatePresence>
      </motion.div>

      {/* No results message */}
      {!loading && filteredInsights.length === 0 && (
        <div className="text-center py-16">
          <p className="text-dark/50 text-lg">
            {activeTag === "Show All"
              ? "No insights available at the moment. Please check back later."
              : `No insights found in the "${activeTag}" category.`}
          </p>
        </div>
      )}
    </div>
  );
}
