
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { HeartBanner } from '@/components/heart/HeartBanner';
import { FundraisingCampaigns } from '@/components/heart/FundraisingCampaigns';
import { SubscriptionPlans } from '@/components/heart/SubscriptionPlans';
import { QuickAccessCards } from '@/components/heart/QuickAccessCards';
import { RegenerativeProjects } from '@/components/heart/RegenerativeProjects';
import { FeaturedCauses } from '@/components/heart/FeaturedCauses';

export default function Heart() {
  const [billingType, setBillingType] = useState("monthly");
  const [customAmount, setCustomAmount] = useState("");
  
  const form = useForm({
    defaultValues: {
      plan: "colaborador"
    }
  });

  const handleSubscribe = (plan: string) => {
    console.log("Subscribing to plan:", plan, "Billing type:", billingType);
  };

  const handleContribute = (campaignId: string, amount?: number) => {
    console.log("Contributing to campaign:", campaignId, "Amount:", amount || "Not specified");
  };

  return (
    <section className="space-y-6 min-h-[calc(100vh-64px)] w-full">
      {/* Banner Section */}
      <HeartBanner />

      {/* Main Fundraising Campaigns */}
      <FundraisingCampaigns handleContribute={handleContribute} />

      {/* Subscription Section */}
      <SubscriptionPlans 
        billingType={billingType}
        setBillingType={setBillingType}
        customAmount={customAmount}
        setCustomAmount={setCustomAmount}
        handleSubscribe={handleSubscribe}
      />

      {/* Quick Access Cards */}
      <QuickAccessCards />

      {/* Projects Tabs */}
      <div className="px-4 md:px-6 py-6">
        <RegenerativeProjects />
        
        {/* Featured Causes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
          <FeaturedCauses />
        </div>
      </div>
    </section>
  );
}
