"use client";

import { useEffect, useState } from "react";
import DemoModal from "../modals/demo-modal";
import FreeTrialModal from "../modals/free-trial-modal";
import ProductDetailModal from "../modals/product-detail-modal";
import ProductInfoModal from "../modals/product-info-modal";
import ServiceDetailModal from "../modals/service-detail-modal";
import AIInsightsModal from "../modals/ai-insights-modal";

export default function ModalProvider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
      <DemoModal />
      <FreeTrialModal />
      <ProductDetailModal />
      <ProductInfoModal />
      <ServiceDetailModal />
      <AIInsightsModal />
    </>
  );
}
