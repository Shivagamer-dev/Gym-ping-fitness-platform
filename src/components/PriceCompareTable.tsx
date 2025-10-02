import pricingData from "../assets/data/pricing.json";
export default function PriceCompareTable() {
  return (
    <section className="mt-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Detailed Plan Comparison
        </h2>

        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700/50">
            <table className="w-full text-left text-gray-300 border-collapse">
                <thead className="bg-gray-700/60 text-gray-200 text-sm sticky top-0 z-10">
                    <tr>
                        <th scope="col" className="px-6 py-4 text-left font-semibold rounded-tl-xl">
                            Feature
                        </th>
                        {pricingData.plans.map((plan) => (
                            <th
                                key={plan.id}
                                scope="col"
                                className={`px-6 py-4 text-center font-semibold ${plan.popular
                                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300"
                                        : ""
                                    }`}
                            >
                                {plan.name}
                                {plan.popular && (
                                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-500/30 text-blue-200 font-bold">
                                        Most Popular
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from(
                        new Set(
                            pricingData.plans.flatMap((plan) =>
                                plan.features.map((f) => f.name.trim().toLowerCase())
                            )
                        )
                    ).map((featureKey, index) => {
                        // Display name (keep original casing)
                        const displayName =
                            pricingData.plans
                                .flatMap((plan) => plan.features.map((f) => f.name.trim()))
                                .find((name) => name.toLowerCase() === featureKey) || featureKey;

                        return (
                            <tr
                                key={index}
                                className={`transition-colors duration-200 ${index % 2 === 0 ? "bg-gray-800/40" : "bg-gray-800/20"
                                    } hover:bg-gray-700/40`}
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-3 font-medium text-white whitespace-nowrap text-sm sm:text-base"
                                >
                                    {displayName}
                                </th>
                                {pricingData.plans.map((plan) => {
                                    const feature = plan.features.find(
                                        (f) => f.name.trim().toLowerCase() === featureKey
                                    );
                                    return (
                                        <td
                                            key={plan.id}
                                            className="px-6 py-3 text-center"
                                        >
                                            {feature && feature.included ? (
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400">
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={3}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-400">
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </section>
)
}
