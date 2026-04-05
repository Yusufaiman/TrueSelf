"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { useSubscription } from "@/lib/subscription-context";

export function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkSubscription, isSubscribed } = useSubscription();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateSubscription = async () => {
      try {
        // Wait a moment for webhook to process
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Re-check subscription status
        await checkSubscription();

        setIsValidating(false);
      } catch (err) {
        console.error("Error validating subscription:", err);
        setIsValidating(false);
      }
    };

    validateSubscription();
  }, [checkSubscription]);

  if (isValidating) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Processing Your Payment
          </h1>
          <p className="text-slate-600">
            Please wait while we activate your subscription...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 space-y-6 border border-green-200">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome to TrueSelf!
            </h1>
            <p className="text-slate-600">
              Your subscription is now active and ready to use.
            </p>
          </div>

          {/* Info */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-200 space-y-2">
            <p className="text-sm text-green-800">
              <span className="font-semibold">✓ Payment received</span>
            </p>
            <p className="text-sm text-green-800">
              <span className="font-semibold">✓ Subscription activated</span>
            </p>
            <p className="text-sm text-green-800">
              <span className="font-semibold">✓ Full access granted</span>
            </p>
          </div>

          {/* Next Steps */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900">What's next?</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>✨ Access all 50+ psychological tests</li>
              <li>📊 View detailed insights and analytics</li>
              <li>📈 Track your progress over time</li>
              <li>💡 Get personalized recommendations</li>
            </ul>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Go to Dashboard
          </button>

          {/* Secondary Button */}
          <button
            onClick={() => router.push("/tests")}
            className="w-full py-3 px-6 rounded-lg text-slate-700 font-semibold border border-slate-200 hover:bg-slate-50 transition-all duration-200"
          >
            Explore Tests
          </button>

          {/* Help Text */}
          <p className="text-xs text-slate-500 text-center">
            Check your email for a receipt and subscription details
          </p>
        </div>
      </div>
    </div>
  );
}
