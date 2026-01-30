"use client";

import { CountUpAnimation } from "@/components/animations/countup-animations";
import ParallaxSection from "@/components/animations/parallax-section";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { TypewriterEffect } from "@/components/animations/typewriter-effect";
import { Brain, Calculator, CheckCircle, Shield, Users } from "lucide-react";
import GetStartedButton from "../buttons/get-started-button";
import ScheduleDemoButton from "../buttons/schedule-demo-button";
import { AreaChart, Area, ResponsiveContainer, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { LucideIcon } from "lucide-react";

interface HeroData {
  heading: {
    prefix: string;
    words: string[];
  };
  subheading: string;
  benefits: string[];
  stats: {
    icon: string;
    value: number;
    suffix?: string;
    label: string;
    decimals?: number;
  }[];
  analytics: { name: string; efficiency: number; accuracy: number }[];
}

interface HeroSectionProps {
  data: HeroData;
}

const iconMap: Record<string, LucideIcon> = {
  Users,
  Calculator,
  Shield,
  Brain,
};

export default function HeroSection({ data }: HeroSectionProps) {
  const {
    heading,
    subheading,
    benefits,
    stats,
    analytics: analyticsData,
  } = data;

  const chartConfig = {
    efficiency: {
      label: "Efficiency",
      color: "hsl(var(--primary))",
    },
    accuracy: {
      label: "Accuracy",
      color: "#10b981",
    },
  };

  return (
    <ParallaxSection speed={0.3}>
      <section
        id="home"
        className="relative pt-20 lg:pt-32 pb-16 lg:pb-24 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary/10),transparent)]" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div className="text-center lg:text-left space-y-8">
                <ScrollReveal direction="up" delay={200}>
                  <h1
                    id="hero-heading"
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
                  >
                    <span className="block text-foreground">
                      {heading.prefix}
                    </span>
                    <span className="block text-primary">
                      <TypewriterEffect
                        words={heading.words}
                        className="text-primary"
                      />
                    </span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={400}>
                  <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    {subheading}
                  </p>
                </ScrollReveal>

                {/* Benefits */}
                <ScrollReveal direction="up" delay={600}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {benefits.map((benefit, index) => (
                      <ScrollReveal
                        key={index}
                        direction="left"
                        delay={800 + index * 100}
                      >
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground group hover:text-foreground transition-colors duration-300">
                          <CheckCircle
                            className="h-4 w-4 text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                            aria-hidden="true"
                          />
                          <span>{benefit}</span>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </ScrollReveal>

                {/* CTA Buttons */}
                <ScrollReveal direction="up" delay={1000}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <GetStartedButton />
                    <ScheduleDemoButton />
                  </div>
                </ScrollReveal>

                {/* Stats */}
                <ScrollReveal direction="up" delay={1200}>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                      const Icon = iconMap[stat.icon] || Shield;
                      return (
                        <ScrollReveal
                          key={index}
                          direction="up"
                          delay={1400 + index * 100}
                        >
                          <div className="text-center group hover:scale-105 transition-transform duration-300">
                            <div className="flex justify-center mb-2">
                              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                                <Icon
                                  className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-foreground">
                              <CountUpAnimation
                                end={stat.value}
                                suffix={stat.suffix}
                                decimals={stat.decimals || 0}
                              />
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {stat.label}
                            </div>
                          </div>
                        </ScrollReveal>
                      );
                    })}
                  </div>
                </ScrollReveal>
              </div>

              {/* Visual Element */}
              <ScrollReveal direction="right" delay={800}>
                <div className="relative group">
                  <div className="relative z-10 bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">
                          PayrollAI Dashboard
                        </h3>
                        <div className="flex space-x-2">
                          <div
                            className="w-3 h-3 bg-red-500 rounded-full"
                            aria-hidden="true"
                          />
                          <div
                            className="w-3 h-3 bg-yellow-500 rounded-full"
                            aria-hidden="true"
                          />
                          <div
                            className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      {/* Mock Dashboard Content */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors duration-300">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                              <Brain className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">
                                AI Processing
                              </div>
                              <div className="text-xs text-muted-foreground">
                                1,247 employees
                              </div>
                            </div>
                          </div>
                          <div className="text-green-500 text-sm font-medium animate-pulse">
                            Complete
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-300">
                            <div className="text-xs text-muted-foreground mb-1">
                              This Month
                            </div>
                            <div className="text-lg font-bold text-foreground">
                              $2.4M
                            </div>
                          </div>
                          <div className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-300">
                            <div className="text-xs text-muted-foreground mb-1">
                              Accuracy
                            </div>
                            <div className="text-lg font-bold text-green-500">
                              99.9%
                            </div>
                          </div>
                        </div>

                        {/* AI Analytics Chart */}
                        <div className="h-32 rounded border border-muted overflow-hidden hover:border-primary/30 transition-colors duration-300">
                          <div className="p-2 bg-muted/20 border-b border-muted">
                            <div className="text-xs font-medium">
                              AI Analytics Chart
                            </div>
                          </div>
                          <div className="p-2 h-24">
                            <ChartContainer config={chartConfig}>
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                  data={analyticsData}
                                  margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                  }}
                                >
                                  <defs>
                                    <linearGradient
                                      id="colorEfficiency"
                                      x1="0"
                                      y1="0"
                                      x2="0"
                                      y2="1"
                                    >
                                      <stop
                                        offset="5%"
                                        stopColor="hsl(var(--primary))"
                                        stopOpacity={0.8}
                                      />
                                      <stop
                                        offset="95%"
                                        stopColor="hsl(var(--primary))"
                                        stopOpacity={0.1}
                                      />
                                    </linearGradient>
                                    <linearGradient
                                      id="colorAccuracy"
                                      x1="0"
                                      y1="0"
                                      x2="0"
                                      y2="1"
                                    >
                                      <stop
                                        offset="5%"
                                        stopColor="#10b981"
                                        stopOpacity={0.8}
                                      />
                                      <stop
                                        offset="95%"
                                        stopColor="#10b981"
                                        stopOpacity={0.1}
                                      />
                                    </linearGradient>
                                  </defs>
                                  <XAxis dataKey="name" hide />
                                  <ChartTooltip
                                    content={<ChartTooltipContent />}
                                    cursor={{ fill: "transparent" }}
                                  />
                                  <Area
                                    type="monotone"
                                    dataKey="efficiency"
                                    stroke="hsl(var(--primary))"
                                    fillOpacity={1}
                                    fill="url(#colorEfficiency)"
                                    strokeWidth={2}
                                    name="efficiency"
                                  />
                                  <Area
                                    type="monotone"
                                    dataKey="accuracy"
                                    stroke="#10b981"
                                    fillOpacity={1}
                                    fill="url(#colorAccuracy)"
                                    strokeWidth={2}
                                    name="accuracy"
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </ChartContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div
                    className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-pulse"
                    aria-hidden="true"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </ParallaxSection>
  );
}
