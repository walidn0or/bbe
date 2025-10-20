'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DonationForm } from '@/components/donation-form';
import { DonationAmountSelector } from '@/components/donation-amount-selector';
import { DonationTypeSelector } from '@/components/donation-type-selector';

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  // Parse and sanitize the amount safely
  const amount: number = useMemo(() => {
    // allow digits and a single dot
    const parsed = parseFloat(customAmount.replace(/[^\d.]/g, ''));
    const raw = selectedAmount ?? (Number.isFinite(parsed) ? parsed : NaN);
    if (!Number.isFinite(raw) || raw <= 0) return 0;
    return Math.round(raw * 100) / 100; // 2 decimals
  }, [selectedAmount, customAmount]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          type="button"
          onClick={handleBack}
          className="mb-6 flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors group"
          aria-label="Go back"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Back</span>
        </button>

        {/* Beta Notice Banner */}
        <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong className="font-semibold">Beta Version:</strong> Payment integration is currently in development.
                For donations, please contact us directly through our contact page or email.
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Make a Difference Today</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your donation helps us empower communities and create lasting change. Every contribution, no matter the size,
            makes a meaningful impact.
          </p>
        </div>

        {/* Donation Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Amount & Type Selection */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Choose Your Impact</h2>

              {/* Donation Type Selector */}
              <DonationTypeSelector selectedType={donationType} onTypeChange={setDonationType} />

              {/* Amount Selector */}
              <DonationAmountSelector
                selectedAmount={selectedAmount}
                customAmount={customAmount}
                onAmountSelect={setSelectedAmount}
                onCustomAmountChange={setCustomAmount}
                donationType={donationType}
              />

              {/* Impact Information */}
              <div className="mt-8 p-4 bg-white/10 rounded-lg">
                <h3 className="font-semibold mb-2">Your Impact:</h3>
                <div className="text-sm space-y-1">
                  {amount > 0 && (
                    <>
                      {amount >= 100 && <p>• Provides educational materials for 5 students</p>}
                      {amount >= 50 && <p>• Supports a family with basic necessities for a week</p>}
                      {amount >= 25 && <p>• Funds a nutritious meal for 10 children</p>}
                      <p>• Every dollar helps us reach more communities</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Donation Form */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Donation</h2>

              <DonationForm amount={amount} donationType={donationType} />
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="flex justify-center items-center space-x-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745.723 3.066 3.066 0 012.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">Tax Deductible</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                {/* Valid check-circle icon */}
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">100% Transparent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
