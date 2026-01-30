"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, Loader2, Save } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useCreateComplianceRule } from "@/hooks";
import { useRouter } from "next/navigation";

const ruleSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  effectiveDate: z.date(),
  changes: z.string().refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, "Must be valid JSON"),
});

type RuleFormValues = z.infer<typeof ruleSchema>;

interface RuleBuilderProps {
  initialData?: Partial<RuleFormValues>;
}

/**
 * RuleBuilder - Form for creating/editing compliance rules
 *
 * Features:
 * - Basic metadata (Name, Description, Effective Date)
 * - JSON editor for rule definition (simulated with validated textarea)
 */
export function RuleBuilder({ initialData }: RuleBuilderProps) {
  const router = useRouter();
  const createRule = useCreateComplianceRule();

  const form = useForm<RuleFormValues>({
    resolver: zodResolver(ruleSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      effectiveDate: initialData?.effectiveDate || new Date(),
      changes: initialData?.changes || '{\n  "taxRate": 0.0\n}',
    },
  });

  const onSubmit = async (data: RuleFormValues) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        effectiveDate: data.effectiveDate.toISOString(),
        changes: JSON.parse(data.changes),
      };

      await createRule.mutateAsync(payload);
      toast.success("Compliance rule created successfully");
      router.push("/dashboard/dashboard/compliance");
    } catch {
      toast.error("Failed to create compliance rule");
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left Column: Metadata */}
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rule Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 2026 Tax Update" {...field} />
                    </FormControl>
                    <FormDescription>
                      A descriptive name for this compliance rule.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Explain what this rule changes..."
                        className="resize-none h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="effectiveDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Effective Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) =>
                            date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      When this rule should start applying.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Right Column: JSON Editor */}
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="changes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rule Definition (JSON)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="{}"
                        className="font-mono text-xs h-[300px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Define the variable overrides or new logic parameters in
                      JSON format.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={createRule.isPending}>
              {createRule.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <Save className="mr-2 h-4 w-4" />
              Create Rule
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
