'use client';

import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    // Log Core Web Vitals to console (for development)
    if (typeof window !== 'undefined' && 'performance' in window) {
      // First Contentful Paint (FCP)
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
      if (fcpEntry) {
        console.log('✅ FCP:', Math.round(fcpEntry.startTime), 'ms');
      }

      // Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('✅ LCP:', Math.round(lastEntry.startTime), 'ms');
      });

      try {
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        // LCP not supported
      }

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        console.log('✅ CLS:', clsValue.toFixed(3));
      });

      try {
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        // CLS not supported
      }

      return () => {
        observer.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  return null;
}
