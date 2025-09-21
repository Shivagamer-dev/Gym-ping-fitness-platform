import { useState } from "react";
import pricingData from "../assets/data/pricing.json";
import { Helmet } from "react-helmet-async";

// Type definitions
interface PricingFeature {
  name: string;
  included: boolean;
  description?: string;
}

interface FamilyPricing {
  monthly: {
    pricePerMember: number;
    minTotal: number;
    maxTotal: number;
  };
  yearly: {
    pricePerMember: number;
    minTotal: number;
    maxTotal: number;
    yearlyMinTotal: number;
    yearlyMaxTotal: number;
  };
}

interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price?: {
    monthly: number;
    yearly: number;
  };
  pricing?: FamilyPricing;
  minMembers?: number;
  maxMembers?: number;
  period: string;
  popular: boolean;
  gradient: string;
  buttonText: string;
  buttonStyle: string;
  features: PricingFeature[];
  originalPrice?: number;
}

function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [familyMembers, setFamilyMembers] = useState(3);

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'plus':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'pro':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'family':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const calculateSavings = (monthlyPrice: number, yearlyPrice: number) => {
    const monthlyTotal = monthlyPrice * 12;
    const savings = monthlyTotal - yearlyPrice;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return { amount: savings, percentage };
  };

  const getPlanPricing = (plan: PricingPlan) => {
    if (plan.id === 'family' && plan.pricing) {
      const monthlyPrice = plan.pricing.monthly.pricePerMember * familyMembers;
      const yearlyTotalPrice = plan.pricing.yearly.pricePerMember * familyMembers * 12;
      const yearlyMonthlyEquivalent = plan.pricing.yearly.pricePerMember * familyMembers;

      return {
        monthly: monthlyPrice,
        yearly: yearlyTotalPrice,
        yearlyMonthlyEquivalent: yearlyMonthlyEquivalent,
        pricePerMember: isYearly ? plan.pricing.yearly.pricePerMember : plan.pricing.monthly.pricePerMember
      };
    } else if (plan.price) {
      return {
        monthly: plan.price.monthly,
        yearly: plan.price.yearly,
        yearlyMonthlyEquivalent: Math.round(plan.price.yearly / 12),
        pricePerMember: 0
      };
    }
    return { monthly: 0, yearly: 0, yearlyMonthlyEquivalent: 0, pricePerMember: 0 };
  };

  const getDisplayPrice = (plan: PricingPlan) => {
    const pricing = getPlanPricing(plan);
    if (isYearly) {
      return pricing.yearlyMonthlyEquivalent;
    }
    return pricing.monthly;
  };

  const getSavingsInfo = (plan: PricingPlan) => {
    const pricing = getPlanPricing(plan);
    return calculateSavings(pricing.monthly, pricing.yearly);
  };

  const getSavingsPercentage = (plan: PricingPlan) => {
    if (plan.id === 'family') return 26.6;
    return 25; // Both Plus and Pro have 25% savings
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">

      <Helmet>
        <title>Back&Bone Pricing - Flexible Fitness Plans for Everyone</title>
        <meta name="description" content="Explore Back&Bone's flexible pricing plans including individual, pro, plus, and family packages. Choose the best fitness plan tailored to your needs and save with yearly billing options." />
        <meta name="keywords" content="Back&Bone pricing, fitness plans, gym membership pricing, family fitness plans, AI fitness coaching pricing, monthly and yearly plans" />
        <meta property="og:title" content="Back&Bone Pricing - Flexible Fitness Plans for Everyone" />
        <meta property="og:description" content="Discover affordable and flexible fitness plans at Back&Bone. From individual to family packages, find the perfect plan to support your fitness journey." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://backandbone.com/pricing" />
        <meta property="og:image" content="https://backandbone.com/og-pricing-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Back&Bone Pricing - Flexible Fitness Plans for Everyone" />
        <meta name="twitter:description" content="Choose from a variety of fitness plans at Back&Bone designed to fit your lifestyle and goals. Save more with annual billing options." />
        <meta name="twitter:image" content="https://backandbone.com/twitter-pricing-image.jpg" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Choose Your Fitness Journey
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Unlock your potential with Back&Bone's comprehensive fitness ecosystem.
              From individual plans to family packages, we have the perfect plan for you.
            </p>

            {/* Billing Toggle */}
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="flex items-center justify-center">
                <span className={`text-lg font-semibold transition-colors duration-300 ${!isYearly ? 'text-white' : 'text-gray-400'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className={`relative mx-3 w-16 h-8 rounded-full transition-colors duration-300 ${isYearly ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-600'}`}
                >
                  <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${isYearly ? 'transform translate-x-8' : ''}`}></div>
                </button>
                <span className={`text-lg font-semibold transition-colors duration-300 ${isYearly ? 'text-white' : 'text-gray-400'}`}>
                  Yearly
                </span>
              </div>

              {/* Centered banner */}
              <div className="mt-4 flex items-center justify-center">
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse text-center">
                  Save more when billed annually!
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
          {pricingData.plans.map((plan: PricingPlan) => {
            const displayPrice = getDisplayPrice(plan);
            const savings = getSavingsInfo(plan);
            const savingsPercentage = getSavingsPercentage(plan);
            const pricing = getPlanPricing(plan);
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl transition-all duration-300 hover:scale-105 ${isPopular
                  ? 'bg-gradient-to-b from-blue-600/20 to-purple-600/20 border-2 border-blue-500/50 shadow-2xl shadow-blue-500/20'
                  : 'bg-gray-800/50 border border-gray-700/50'
                  } backdrop-blur-sm`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      🚀 Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8 flex flex-col h-full">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center`}>
                      {getPlanIcon(plan.name)}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-400 mb-6">{plan.tagline}</p>

                    {/* Family Members Selector */}
                    {plan.id === 'family' && (
                      <div className="mb-6 p-4 bg-gray-700/30 rounded-xl">
                        <label className="block text-sm font-medium mb-3 text-gray-300">
                          Number of Family Members
                        </label>
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => setFamilyMembers(Math.max(plan.minMembers || 3, familyMembers - 1))}
                            disabled={familyMembers <= (plan.minMembers || 3)}
                            className="w-8 h-8 bg-gray-600 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white font-bold"
                          >
                            -
                          </button>
                          <span className="text-xl font-bold w-8 text-center">{familyMembers}</span>
                          <button
                            onClick={() => setFamilyMembers(Math.min(plan.maxMembers || 8, familyMembers + 1))}
                            disabled={familyMembers >= (plan.maxMembers || 8)}
                            className="w-8 h-8 bg-gray-600 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white font-bold"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          ₹{pricing.pricePerMember} per member/month
                        </p>
                      </div>
                    )}

                    {/* Price Display */}
                    <div className="mb-6">
                      <div className="text-5xl font-bold mb-2">
                        ₹{displayPrice}
                        <span className="text-lg font-normal text-gray-400">/month</span>
                      </div>

                      {/* Yearly Savings Display */}
                      {isYearly && (
                        <div className="text-sm text-gray-400 mb-2">
                          <span className="line-through">₹{pricing.monthly * 12}/year</span>
                          <span className="text-green-400 font-semibold ml-2">
                            Save ₹{savings.amount} ({savingsPercentage}% off)
                          </span>
                        </div>
                      )}

                      {/* Total Yearly Cost Display */}
                      {isYearly && (
                        <div className="text-xs text-gray-500">
                          ₹{pricing.yearly}/year total
                        </div>
                      )}

                      {plan.id === 'family' && (
                        <div className="text-xs text-gray-500 mt-1">
                          Total for {familyMembers} members
                        </div>
                      )}

                      {/* Monthly equivalent for yearly plans */}
                      {!isYearly && plan.id !== 'family' && (
                        <div className="text-xs text-gray-500">
                          ₹{pricing.yearly}/year if paid yearly
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4 text-center">Features</h4>
                    <div className="space-y-3 max-h-auto overflow-y-auto">
                      {plan.features.map((feature: PricingFeature, featureIndex: number) => (
                        <div key={featureIndex} className={`flex items-start gap-3 ${feature.included ? 'text-white' : 'text-gray-500'
                          }`}>
                          {feature.included ? (
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          )}
                          <div>
                            <span className="text-sm font-medium">{feature.name}</span>
                            {feature.description && feature.included && (
                              <p className="text-xs text-gray-400 mt-1">{feature.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <button
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${isPopular
                        ? `bg-gradient-to-r ${plan.gradient} hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105`
                        : `bg-gradient-to-r ${plan.gradient} hover:opacity-90 hover:scale-105`
                        } transform`}
                    >
                      {plan.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">Everything you need to know about our pricing</p>
        </div>

        <div className="space-y-6">
          {pricingData.faqs.map((faq: { question: string; answer: string }, faqIndex: number) => (
            <div key={faqIndex} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 text-white">{faq.question}</h3>
              <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-t border-gray-700/50">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Try Risk-Free</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            All plans come with a 30-day money-back guarantee.
            Cancel anytime, no questions asked.
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              30-Day Money Back Guarantee
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Cancel Anytime
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              No Setup Fees
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
