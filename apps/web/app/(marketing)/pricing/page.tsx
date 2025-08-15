export default function PricingPage() {
	return (
		<main className="mx-auto max-w-4xl px-6 py-16">
			<h1 className="text-3xl font-semibold">Pricing</h1>
			<ul className="mt-6 grid gap-6 sm:grid-cols-2">
				<li className="rounded-lg border p-6"><h2 className="text-xl font-medium">Starter</h2><p className="mt-2">$0/month</p></li>
				<li className="rounded-lg border p-6"><h2 className="text-xl font-medium">Pro</h2><p className="mt-2">$29/month</p></li>
			</ul>
		</main>
	);
}