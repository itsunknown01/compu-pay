"use client";

import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetailModal() {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "product_detail";
  const product = data?.product;

  if (!product) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        {}
        <div className="relative w-full h-48 sm:h-64">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {}
          <div className="absolute top-4 left-4">
            <Badge
              variant="secondary"
              className="bg-white/90 text-gray-800 backdrop-blur-sm"
            >
              {product.category}
            </Badge>
          </div>

          {}
          <div className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
            {product.icon && <product.icon className="h-6 w-6 text-gray-800" />}
          </div>
        </div>

        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-2xl font-bold">
            {product.title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {product.description}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold mb-3">Key Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Why Choose {product.title}?
            </h3>
            <p className="text-sm text-muted-foreground">
              Our {product.title.toLowerCase()} solution is designed to
              streamline your payroll operations, reduce errors, and save
              valuable time. With advanced AI algorithms and intuitive
              interfaces, you&apos;ll experience a new level of efficiency in
              your HR processes.
            </p>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 bg-muted/30">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button variant="outline" onClick={onClose} className="sm:flex-1">
              Close
            </Button>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="sm:flex-1"
            >
              <Button
                className="w-full group relative overflow-hidden"
                onClick={() => {
                  
                  onClose();
                  
                  setTimeout(() => {
                    useModal.getState().onOpen("request_info", { product });
                  }, 100);
                }}
              >
                <span className="relative z-10">Request More Info</span>
                <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Button>
            </motion.div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
