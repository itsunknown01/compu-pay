"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import {
  Brain,
  Shield,
  Calculator,
  Clock,
  FileText,
  Users,
  TrendingUp,
  Globe,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

interface Feature {
  icon: string;
  title: string;
  description: string;
  badge: string;
  color: string;
}

interface FeatureSectionProps {
  data: Feature[];
}

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Shield,
  Calculator,
  Clock,
  FileText,
  Users,
  TrendingUp,
  Globe,
};

export default function FeatureSection({ data }: FeatureSectionProps) {
  const features = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      id="features"
      className="py-16 lg:py-24 bg-muted/30 relative overflow-hidden"
      aria-labelledby="features-heading"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center mb-12 lg:mb-16">
              <motion.h2
                id="features-heading"
                className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Intelligent Payroll Features
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Experience the power of AI-driven payroll management with
                features designed to streamline operations, ensure accuracy, and
                maintain compliance effortlessly.
              </motion.p>
            </div>
          </ScrollReveal>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Shield;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    y: -10,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                >
                  <Card
                    className="group relative overflow-hidden transition-all duration-500 border-border/50 hover:border-primary/30 hover:bg-card/80 backdrop-blur-sm h-full"
                    role="article"
                    aria-labelledby={`feature-${index}-title`}
                  >
                    {/* Hover Gradient Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />

                    <CardHeader className="pb-4 relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <motion.div
                          className={`p-2 rounded-lg ${feature.color}/10`}
                          whileHover={{
                            backgroundColor: `${feature.color}/20`,
                            scale: 1.1,
                            rotate: 5,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon
                            className={`h-6 w-6 text-${feature.color.split("-")[1]}-500`}
                            aria-hidden="true"
                          />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge
                            variant="secondary"
                            className="text-xs group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300"
                          >
                            {feature.badge}
                          </Badge>
                        </motion.div>
                      </div>
                      <CardTitle
                        id={`feature-${index}-title`}
                        className="text-lg font-semibold group-hover:text-primary transition-colors duration-300"
                      >
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardDescription className="text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                        {feature.description}
                      </CardDescription>
                    </CardContent>

                    {/* Animated Border */}
                    <motion.div
                      className="absolute inset-0 rounded-lg border-2 border-transparent"
                      whileHover={{ borderColor: "hsl(var(--primary) / 0.2)" }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Floating Particles Effect */}
                    <motion.div
                      className="absolute top-4 right-4 w-2 h-2 bg-primary/30 rounded-full"
                      initial={{ opacity: 0 }}
                      whileHover={{
                        opacity: 1,
                        scale: [1, 1.5, 1],
                        transition: { duration: 0.6, repeat: Infinity },
                      }}
                    />
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
