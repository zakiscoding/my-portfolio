"use client";
import { SignIn } from "@clerk/nextjs";
export function AnalyticsSignIn() {
  return <SignIn routing="hash" forceRedirectUrl="/analytics" />;
}
