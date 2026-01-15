"use client";

import { useEffect } from "react";

export default function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log("LCP:", entry.startTime);
          // Send to analytics
          if (window.dataLayer) {
            window.dataLayer.push({
              event: "web_vitals",
              metric_name: "LCP",
              metric_value: Math.round(entry.startTime),
              metric_delta: Math.round(entry.startTime),
            });
          }
        }
      }).observe({ entryTypes: ["largest-contentful-paint"] });

      // First Input Delay
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const fidEntry = entry as any;
          const fid = fidEntry.processingStart - fidEntry.startTime;
          console.log("FID:", fid);
          if (window.dataLayer) {
            window.dataLayer.push({
              event: "web_vitals",
              metric_name: "FID",
              metric_value: Math.round(fid),
              metric_delta: Math.round(fid),
            });
          }
        }
      }).observe({ entryTypes: ["first-input"] });

      // Cumulative Layout Shift
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            console.log("CLS:", clsValue);
            if (window.dataLayer) {
              window.dataLayer.push({
                event: "web_vitals",
                metric_name: "CLS",
                metric_value: Math.round(clsValue * 1000) / 1000,
                metric_delta: Math.round((entry as any).value * 1000) / 1000,
              });
            }
          }
        }
      }).observe({ entryTypes: ["layout-shift"] });
    }
  }, []);

  return null;
}
