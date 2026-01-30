"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building,
  Users,
  Calculator,
  FileText,
  ArrowRight,
  Star,
  CheckCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { useModal } from "@/hooks/use-modal";
import ScheduleDemoButton from "../buttons/schedule-demo-button";

import { LucideIcon } from "lucide-react";

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  progress: number;
  price: string;
  rating: number;
}

interface ServiceSectionProps {
  data: Service[];
}

const iconMap: Record<string, LucideIcon> = {
  Building,
  Users,
  Calculator,
  FileText,
};

export default function ServiceSection({ data }: ServiceSectionProps) {
  const [selectedService, setSelectedService] = useState(0);
  const { onOpen } = useModal();

  const services = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="services"
      className="py-16 lg:py-24 relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-l from-secondary/10 to-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center mb-12 lg:mb-16">
              <motion.h2
                id="services-heading"
                className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Payroll Services
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Comprehensive payroll solutions tailored to your business needs,
                from small startups to large enterprises with complex
                requirements.
              </motion.p>
            </div>
          </ScrollReveal>

          {/* Services Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Building;
              const isSelected = selectedService === index;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    transition: {
                      type: "spring" as const,
                      stiffness: 300,
                      damping: 20,
                    },
                  }}
                >
                  <Card
                    className={`group transition-all duration-500 border-border/50 ${
                      isSelected
                        ? "ring-2 ring-primary border-primary/50 shadow-xl bg-primary/5 scale-105"
                        : "hover:border-primary/30 hover:bg-card/80 hover:shadow-lg"
                    }`}
                    onClick={() => setSelectedService(index)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    aria-labelledby={`service-${index}-title`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedService(index);
                      }
                    }}
                  >
                    {/* Animated Background Gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isSelected ? 1 : 0 }}
                      whileHover={{ opacity: isSelected ? 1 : 0.5 }}
                      transition={{ duration: 0.5 }}
                    />

                    <CardHeader className="pb-4 relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className={`p-3 rounded-lg transition-all duration-300 ${
                              isSelected
                                ? "bg-primary/20 scale-110"
                                : "bg-primary/10 group-hover:bg-primary/15"
                            }`}
                            whileHover={{
                              scale: isSelected ? 1.1 : 1.05,
                              rotate: 5,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon
                              className={`h-6 w-6 transition-all duration-300 ${
                                isSelected
                                  ? "text-primary scale-110"
                                  : "text-muted-foreground group-hover:text-primary"
                              }`}
                              aria-hidden="true"
                            />
                          </motion.div>
                          <div className="flex items-center space-x-2">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <Star
                                className="h-4 w-4 text-yellow-500 fill-current"
                                aria-hidden="true"
                              />
                            </motion.div>
                            <span className="text-sm font-medium">
                              {service.rating}
                            </span>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge
                            variant={isSelected ? "default" : "secondary"}
                            className={`text-xs transition-all duration-300 ${
                              isSelected
                                ? "animate-pulse"
                                : "group-hover:bg-primary/10"
                            }`}
                          >
                            {service.price}
                          </Badge>
                        </motion.div>
                      </div>
                      <CardTitle
                        id={`service-${index}-title`}
                        className={`text-xl font-semibold transition-colors duration-300 ${
                          isSelected
                            ? "text-primary"
                            : "group-hover:text-primary"
                        }`}
                      >
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardDescription className="text-sm leading-relaxed mb-4 group-hover:text-foreground/80 transition-colors duration-300">
                        {service.description}
                      </CardDescription>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-muted-foreground">
                            Client Satisfaction
                          </span>
                          <span className="text-xs font-medium">
                            {service.progress}%
                          </span>
                        </div>
                        <Progress
                          value={service.progress}
                          className={`h-2 transition-all duration-500 ${
                            isSelected ? "bg-primary/20" : ""
                          }`}
                        />
                      </div>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {service.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="flex items-center space-x-2 text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: index * 0.1 + featureIndex * 0.05,
                            }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CheckCircle
                                className="h-3 w-3 text-green-500 flex-shrink-0"
                                aria-hidden="true"
                              />
                            </motion.div>
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* CTA */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          size="sm"
                          variant={isSelected ? "default" : "outline"}
                          className={`w-full group/btn transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? "shadow-lg hover:shadow-xl"
                              : "hover:bg-primary/5 hover:border-primary/50"
                          }`}
                          aria-label={`Learn more about ${service.title}`}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the card click
                            onOpen("service_detail", {
                              service: { ...service, icon: Icon },
                            });
                          }}
                        >
                          Learn More
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </motion.div>
                        </Button>
                      </motion.div>
                    </CardContent>

                    {/* Selection Indicator */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{
                            scale: [0, 1.2, 1],
                            opacity: 1,
                          }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Selected Service Details */}
          <ScrollReveal direction="up" delay={800}>
            <motion.div
              className="bg-gradient-to-r from-muted/30 to-muted/50 rounded-2xl p-6 lg:p-8 border border-border/50 backdrop-blur-sm relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated Background Elements */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />

              <div className="text-center relative z-10">
                <motion.h3
                  className="text-2xl font-bold text-foreground mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Ready to streamline your payroll with{" "}
                  {services[selectedService].title}?
                </motion.h3>
                <motion.p
                  className="text-muted-foreground mb-6 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Let&apos;s discuss your payroll requirements and create a
                  customized solution. We provide free consultations to
                  understand your specific needs.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="group relative overflow-hidden"
                      onClick={() => {
                        const SelectedIcon =
                          iconMap[services[selectedService].icon] || Building;
                        onOpen("free_trial", {
                          service: {
                            ...services[selectedService],
                            icon: SelectedIcon,
                          },
                        });
                      }}
                    >
                      <span className="relative z-10">Start Free Trial</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ originX: 0 }}
                      />
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ScheduleDemoButton />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
