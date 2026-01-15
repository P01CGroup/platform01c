"use client";

import { useState } from "react";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { OfflineFallback } from "@/components/ui/offline-fallback";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      console.log("Server-side login result:", result);

      if (!response.ok) {
        setError(result.error || "Login failed");
      } else if (result.success) {
        console.log("Server-side login successful, redirecting to /admin");
        window.location.href = "/admin";
      } else {
        setError("Login failed - unexpected response");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OfflineFallback>
      <ErrorBoundary>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 appearance-none rounded-none relative block w-full px-4 border border-dark/10 bg-surface placeholder-gray-500 text-dark focus:outline-none focus:ring-dark focus:border-dark focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 appearance-none rounded-none relative block w-full px-4 border border-dark/10 bg-surface placeholder-gray-500 text-dark focus:outline-none focus:ring-dark focus:border-dark focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <div className="w-full">
            <Button
              type="submit"
              disabled={isLoading}
              className="!w-full"
              variant="secondary"
              size="icon"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
              <ChevronRight className="stroke-white" height={16} width={16} />
            </Button>
          </div>
        </form>
      </ErrorBoundary>
    </OfflineFallback>
  );
}
