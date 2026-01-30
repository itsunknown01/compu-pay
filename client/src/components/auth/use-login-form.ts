import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { useAuthStore } from "@/lib/auth-store";
import { LoginResponse } from "@/lib/types";
import { LoginFormValues, loginSchema } from "./login-schema";

export function useLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const response = await api.post<LoginResponse>("/auth/login", values);
      if (response.error) {
        throw new Error(response.error.error || "Login failed");
      }
      return response.data!;
    },
    onSuccess: (data) => {
      login(data.token, data.memberships);
      toast.success("Login successful");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred. Please try again.");
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = (values: LoginFormValues) => {
    mutation.mutate(values);
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
    showPassword,
    togglePasswordVisibility,
  };
}
