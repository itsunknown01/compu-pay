"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Headphones, Mail, MapPin, Phone, Send } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

import { LucideIcon } from "lucide-react";

interface ContactItem {
  icon: string;
  title: string;
  content: string;
  description: string;
}

interface ContactSectionProps {
  data: ContactItem[];
}

const iconMap: Record<string, LucideIcon> = {
  Mail,
  Phone,
  MapPin,
  Headphones,
};

export default function ContactSection({ data }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const contactInfo = data;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Message sent successfully!", {
        description:
          "Our payroll experts will get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Error sending message", {
        description: "Please try again later or contact us directly.",
      });
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name && formData.email && formData.subject && formData.message;

  return (
    <section
      id="contact"
      className="py-16 lg:py-24 bg-muted/30 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-56 h-56 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center mb-12 lg:mb-16">
              <h2
                id="contact-heading"
                className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
              >
                Get Payroll Support
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Ready to transform your payroll operations? Our experts are here
                to help you implement the perfect payroll solution for your
                business needs.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = iconMap[info.icon] || Mail;
                return (
                  <ScrollReveal
                    key={index}
                    direction="left"
                    delay={400 + index * 150}
                  >
                    <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                            <Icon
                              className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                              {info.title}
                            </h3>
                            <p className="text-foreground font-medium mb-1">
                              {info.content}
                            </p>
                            <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                              {info.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>

                      {/* Hover Effect Border */}
                      <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary/20 transition-all duration-300" />
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Contact Form */}
            <ScrollReveal direction="right" delay={600}>
              <div className="lg:col-span-2">
                <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl group relative overflow-hidden">
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardHeader>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300 relative z-10">
                      Request a Demo
                    </CardTitle>
                    <CardDescription>
                      Tell us about your payroll needs and we&apos;ll show you
                      how PayrollAI can help.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      noValidate
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/25 hover:border-primary/50"
                            disabled={isSubmitting}
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/25 hover:border-primary/50"
                            disabled={isSubmitting}
                            placeholder="your.email@company.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="company"
                          className="text-sm font-medium"
                        >
                          Company Name
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/25 hover:border-primary/50"
                          disabled={isSubmitting}
                          placeholder="Your company name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/25 hover:border-primary/50"
                          disabled={isSubmitting}
                          placeholder="What can we help you with?"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/25 hover:border-primary/50 resize-none"
                          disabled={isSubmitting}
                          placeholder="Tell us about your payroll requirements, number of employees, current challenges..."
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto group/btn relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
                        disabled={!isFormValid || isSubmitting}
                        aria-label={
                          isSubmitting ? "Sending message..." : "Send message"
                        }
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 relative z-10" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4 relative z-10 group-hover/btn:scale-110 transition-transform duration-300" />
                            <span className="relative z-10">Request Demo</span>
                          </>
                        )}
                        {!isSubmitting && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
