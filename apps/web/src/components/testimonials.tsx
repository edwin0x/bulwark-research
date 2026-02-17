const quotes = [
	'"Like having a McKinsey team on call for every new idea" — Sarah K., YC W24',
	'"Killed two bad ideas in a day. Saved us 6 months and $200K." — Marcus T., Serial Founder',
	'"We used to fly blind. Now we decide with data." — Priya R., Seed Stage',
	'"The research quality rivals what we got from Deloitte at 1/1000th the cost" — Jake M., Studio Lead',
	'"Taste is knowing what to build. Bulwark gives you the conviction." — Lisa C., Solo Founder',
]

export function Testimonials() {
	return (
		<section className="py-12 overflow-hidden border-y border-border">
			<div className="flex animate-marquee whitespace-nowrap">
				{['set-a', 'set-b'].map((setId) => (
					<span key={setId} className="contents">
						{quotes.map((quote) => (
							<span
								key={`${setId}-${quote}`}
								className="mx-12 font-mono text-xs text-secondary tracking-wider"
							>
								{quote}
							</span>
						))}
					</span>
				))}
			</div>
		</section>
	)
}
