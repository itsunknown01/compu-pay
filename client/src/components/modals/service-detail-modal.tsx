"use client";

import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { ArrowRight, CheckCircle, Star, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "../ui/progress";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  progress: number;
  price: string;
  rating: number;
}

export default function ServiceDetailModal() {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "service_detail";
  const service = data?.service as Service | undefined;

  if (!service) return null;

  const Icon = service.icon;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        {/* Header Section */}
        <div className="relative w-full bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-lg bg-primary/20">
              {Icon && <Icon className="h-8 w-8 text-primary" />}
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">
                {service.title}
              </DialogTitle>
              <div className="flex items-center mt-1 space-x-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Star
                    className="h-4 w-4 text-yellow-500 fill-current"
                    aria-hidden="true"
                  />
                </motion.div>
                <span className="text-sm font-medium">{service.rating}</span>
                <Badge variant="secondary" className="ml-2">
                  {service.price}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <DialogDescription className="text-base mb-6">
            {service.description}
          </DialogDescription>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Client Satisfaction
              </span>
              <span className="text-sm font-medium">{service.progress}%</span>
            </div>
            <Progress value={service.progress} className="h-2 bg-primary/20" />
          </div>

          <h3 className="text-lg font-semibold mb-4">Key Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
              >
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold">
              Why Choose Our {service.title}?
            </h3>
            <p className="text-muted-foreground">
              Our {service.title.toLowerCase()} solution is designed to
              streamline your payroll operations, reduce errors, and save
              valuable time. With advanced AI algorithms and intuitive
              interfaces, you&apos;ll experience a new level of efficiency in
              your HR processes.
            </p>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg mb-6">
            <h4 className="font-medium mb-2">What&apos;s Included:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>24/7 technical support</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Regular software updates</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Comprehensive documentation</span>
              </li>
            </ul>
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
                  // Close the current modal and open the demo modal
                  onClose();
                  // Small timeout to ensure smooth transition between modals
                  setTimeout(() => {
                    useModal.getState().onOpen("schedule_demo");
                  }, 100);
                }}
              >
                <span className="relative z-10">Schedule a Demo</span>
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
