"use client";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Clock,
  Globe,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useModal } from "@/hooks/use-modal";

import { LucideIcon } from "lucide-react";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
  category: string;
  features: string[];
  color: string;
}

interface ProductGridProps {
  data: Product[];
}

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Users,
  Shield,
  TrendingUp,
  Clock,
  Globe,
};

export function ProductGrid({ data }: ProductGridProps) {
  const { onOpen } = useModal();
  const products = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      className="py-16 lg:py-24 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden"
      id="products"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Complete Payroll Ecosystem
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover our comprehensive suite of AI-powered tools designed to
                streamline every aspect of your payroll and HR operations.
              </p>
            </div>
          </ScrollReveal>

          {/* Products Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product, index) => {
              const Icon = iconMap[product.icon] || Brain;
              return (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{
                    y: -10,
                    transition: {
                      type: "spring" as const,
                      stiffness: 300,
                      damping: 20,
                    },
                  }}
                  className="group"
                >
                  <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden relative">
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    {/* Image Section */}
                    <div className="relative overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative h-48 w-full"
                      >
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover transition-all duration-500 group-hover:brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        {/* Floating Icon */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: index * 0.1 + 0.5,
                            type: "spring" as const,
                            stiffness: 200,
                          }}
                          className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg group-hover:bg-white transition-colors duration-300"
                        >
                          <Icon className="h-6 w-6 text-gray-800 group-hover:scale-110 transition-transform duration-300" />
                        </motion.div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <Badge
                            variant="secondary"
                            className="bg-white/90 text-gray-800 backdrop-blur-sm"
                          >
                            {product.category}
                          </Badge>
                        </div>
                      </motion.div>
                    </div>

                    <CardContent className="p-6 relative z-10">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                            {product.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-2">
                          {product.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: index * 0.1 + featureIndex * 0.1,
                              }}
                              className="flex items-center space-x-2 text-xs text-muted-foreground"
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                              <span>{feature}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="outline"
                            className="w-full group/btn transition-all duration-300 hover:bg-primary/5 hover:border-primary/50"
                            onClick={() =>
                              onOpen("product_detail", {
                                product: { ...product, icon: Icon },
                              })
                            }
                          >
                            <span>Learn More</span>
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary/20 transition-all duration-500" />

                    {/* Animated Corner Accent */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom CTA */}
          <ScrollReveal direction="up" delay={800}>
            <div className="text-center mt-12 lg:mt-16">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="group relative overflow-hidden">
                  <span className="relative z-10">Explore All Products</span>
                  <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Button>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
