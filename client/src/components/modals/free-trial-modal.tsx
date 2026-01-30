"use client";

import { useModal } from "@/hooks/use-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const freeTrialFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  company: z.string().min(1, "Company is required"),
  phone: z.string().optional(),
  employees: z.string().min(1, "Number of employees is required"),
  message: z.string().optional(),
});

export default function FreeTrialModal() {
  const form = useForm<z.infer<typeof freeTrialFormSchema>>({
    resolver: zodResolver(freeTrialFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      employees: "",
      message: "",
    },
  });
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "free_trial";
  const service = data?.service;

  const handleFreeTrialSubmit = (value: z.infer<typeof freeTrialFormSchema>) => {
    // Here you would typically send this data to your backend
    console.log({
      ...value,
      serviceTitle: service?.title,
    });
    toast.success("Free trial request submitted! We'll contact you shortly.");
    onClose();
    // Reset the form after submission
    form.reset();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start Your Free Trial</DialogTitle>
          <DialogDescription>
            Fill out the form below to start your 14-day free trial of our
            {service ? ` ${service.title}` : " payroll"} solution. No credit card required.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFreeTrialSubmit)}
            className="space-y-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@company.com" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="company"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Company" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="employees"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Employees</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 10-50" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="message"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your specific payroll needs or any questions you have."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full">
                Start Free Trial
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}