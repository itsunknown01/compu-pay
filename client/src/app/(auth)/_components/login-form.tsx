"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginForm } from "@/components/auth/use-login-form";

export default function LoginForm() {
  const { form, onSubmit, isLoading, showPassword, togglePasswordVisibility } =
    useLoginForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        {}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email Address</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  className="transition-colors duration-200 focus:border-primary"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium flex items-center space-x-2">
                <Lock className="h-4 w-4" />
                <span>Password</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="pr-12 transition-colors duration-200 focus:border-primary"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={isLoading}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {}
        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </Button>

        <Separator className="my-6" />

        {}
        <div className="text-center space-y-4">
          <Button
            type="button"
            variant="link"
            className="text-sm text-muted-foreground hover:text-primary"
            disabled={isLoading}
          >
            Forgot your password?
          </Button>

          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-primary hover:text-primary/80"
              disabled={isLoading}
            >
              Request Access
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
