import { agents } from '~/data/agents'

export function BentoGrid() {
  return (
    <section id="what-you-get" className="relative py-24 px-6">
      <div className="divider max-w-6xl mx-auto mb-24"></div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="overline-divider max-w-sm mx-auto mb-4 reveal">Your Intelligence Brief</div>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl reveal delay-1">
            Every dimension<br />
            <span className="italic font-accent text-gradient-warm">McKinsey would analyze</span>
          </h2>
          <p className="text-muted mt-4 max-w-lg mx-auto reveal delay-2">
            Enterprise-grade due diligence was gatekept by big companies with big budgets. Our agent swarm crawls the internet at scale to give every founder that same rigor.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent, i) => (
            <div key={agent.name} className={`card-glass rounded-2xl p-6 reveal delay-${(i % 4) + 2} ${i < 2 ? 'sm:col-span-1 lg:col-span-2' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl" style={{ color: agent.hex }}>{agent.icon}</span>
                <span className="font-mono text-[10px] text-dim tracking-widest uppercase">Swarm Layer {String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">{agent.name}</h3>
              <p className="text-sm text-muted leading-relaxed">{agent.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
