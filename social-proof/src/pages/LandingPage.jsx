import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur border-b border-white/5">
      <span className="text-white font-black text-lg tracking-tight">Social Proof</span>
      <div className="flex items-center gap-3">
        <Link
          to="/menu"
          className="text-zinc-400 hover:text-white text-sm transition-colors"
        >
          See the menu
        </Link>
        <a
          href="#contact"
          className="bg-white text-black text-sm font-bold px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors"
        >
          Request a demo
        </a>
      </div>
    </nav>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">{children}</p>
  );
}

function StatPill({ value, label }) {
  return (
    <div className="border border-zinc-800 rounded-2xl px-6 py-5 text-center">
      <p className="text-4xl font-black text-white">{value}</p>
      <p className="text-zinc-500 text-sm mt-1">{label}</p>
    </div>
  );
}

function PillarCard({ number, title, description, detail }) {
  return (
    <div className="border border-zinc-800 rounded-2xl p-8 flex flex-col gap-4 hover:border-zinc-600 transition-colors">
      <span className="text-5xl font-black text-zinc-800">{number}</span>
      <div>
        <h3 className="text-white font-black text-2xl leading-tight">{title}</h3>
        <p className="text-zinc-400 mt-3 leading-relaxed">{description}</p>
      </div>
      <ul className="flex flex-col gap-2 mt-2">
        {detail.map((d, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
            <span className="text-white mt-0.5">→</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepCard({ step, title, description }) {
  return (
    <div className="flex gap-5">
      <div className="w-8 h-8 rounded-full bg-white text-black text-sm font-black flex items-center justify-center shrink-0 mt-0.5">
        {step}
      </div>
      <div>
        <h4 className="text-white font-bold">{title}</h4>
        <p className="text-zinc-500 text-sm mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function SaasFeature({ icon, title, description }) {
  return (
    <div className="flex gap-4">
      <span className="text-2xl shrink-0">{icon}</span>
      <div>
        <h4 className="text-white font-semibold">{title}</h4>
        <p className="text-zinc-500 text-sm mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-zinc-800 rounded-full px-4 py-1.5 text-xs text-zinc-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Now serving · Table 12 — 412 dishes sold this week
          </div>
          <h1 className="text-6xl sm:text-8xl font-black leading-none tracking-tight mb-8">
            The menu<br />
            <span className="text-zinc-600">built by</span><br />
            the internet.
          </h1>
          <p className="text-zinc-400 text-xl max-w-xl mx-auto leading-relaxed mb-12">
            Social Proof is a restaurant concept where every dish starts as a viral video — and every dish is rated publicly by the people who eat it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="bg-white text-black font-bold px-8 py-4 rounded-full text-base hover:bg-zinc-200 transition-colors"
            >
              See the live menu →
            </Link>
            <a
              href="#contact"
              className="border border-zinc-700 text-white font-bold px-8 py-4 rounded-full text-base hover:border-zinc-500 transition-colors"
            >
              Partner with us
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-700 text-xs">
          <span>scroll</span>
          <span className="animate-bounce">↓</span>
        </div>
      </section>

      {/* Problem */}
      <section className="py-24 px-6 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>The problem</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-8">
            Restaurant menus haven't changed in decades.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              {
                heading: "Static menus",
                body: "Most restaurants update their menu once a year — if that. There's no feedback loop between what guests love and what stays on the menu.",
              },
              {
                heading: "Opaque reviews",
                body: "Yelp and Google rate the restaurant. Nobody rates the dish. A 3-star entrée can hide behind a 4.5-star restaurant for years.",
              },
              {
                heading: "Missed culture",
                body: "Food trends move at the speed of TikTok. Restaurants watch viral recipes explode online and have no structured way to respond.",
              },
            ].map(({ heading, body }) => (
              <div key={heading} className="border border-zinc-900 rounded-xl p-6 bg-zinc-950">
                <h3 className="text-white font-bold mb-2">{heading}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two pillars */}
      <section className="py-24 px-6 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>The concept</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-4">
            Two pillars.<br />One restaurant.
          </h2>
          <p className="text-zinc-500 mb-12 text-lg">
            Social Proof is built on a simple idea: let the internet curate the menu, then let guests hold us accountable for every dish.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <PillarCard
              number="01"
              title="Viral recipes, made real."
              description="Every dish on our menu starts as a viral video — TikTok, Instagram, YouTube. We source the recipes the internet already loves, then we execute them at restaurant quality."
              detail={[
                "QR codes on the menu link to the original viral video",
                "Guests see exactly where the dish came from",
                "New viral recipes cycle in as the internet evolves",
              ]}
            />
            <PillarCard
              number="02"
              title="Radical menu transparency."
              description="We publish every dish's rating publicly — and we display live sales data on the menu. If a dish underperforms, we retire it and replace it. In public."
              detail={[
                'Live sold-this-week counts on every dish',
                "Per-dish star ratings from every guest",
                "Lowest-rated dishes get retired, not hidden",
              ]}
            />
          </div>
        </div>
      </section>

      {/* How it works for diners */}
      <section className="py-24 px-6 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Guest experience</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-12">
            How it works<br />at the table.
          </h2>
          <div className="flex flex-col gap-8">
            <StepCard
              step="1"
              title="Browse the menu"
              description="Every dish shows its rating, how many were sold this week, and a badge — Best Seller, Trending, Fan Favorite. The data is live."
            />
            <StepCard
              step="2"
              title="Scan the QR code"
              description="Each dish has a QR code linking to the viral video it was inspired by. Watch the original recipe that made millions of people stop scrolling."
            />
            <StepCard
              step="3"
              title="Rate your dish after the meal"
              description="At the end of your meal, you're invited to rate each dish you ordered. Your review goes public immediately. No curation, no delay — that's the point."
            />
            <StepCard
              step="4"
              title="Watch the menu evolve"
              description="Come back in a month and the menu may have changed. Dishes that didn't earn their place are gone. New viral recipes have taken their spot. The menu is always improving."
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel>By the numbers</SectionLabel>
          <h2 className="text-4xl font-black mb-12">
            The proof is in the data.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatPill value="4.7" label="avg dish rating" />
            <StatPill value="2,100+" label="dishes sold this week" />
            <StatPill value="1,215" label="public reviews" />
            <StatPill value="91.3M" label="views on our top dish's viral origin" />
          </div>
          <p className="text-zinc-700 text-xs mt-6">Based on prototype data. Live metrics shown on the customer menu.</p>
        </div>
      </section>

      {/* SaaS angle */}
      <section className="py-24 px-6 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Platform vision</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-4">
            We're building more<br />than one restaurant.
          </h2>
          <p className="text-zinc-500 text-lg mb-12 leading-relaxed">
            The technology powering Social Proof — dish-level ratings, viral video menus, live sales metrics, menu lifecycle tools — is a platform. We're proving it works here first. Then we're selling it to every restaurant that wants to compete in a TikTok-native world.
          </p>
          <div className="flex flex-col gap-8">
            <SaasFeature
              icon="📱"
              title="Viral menu builder"
              description="Add any dish with a link to its viral source video. Auto-generate QR codes. Your menu becomes a portal to the internet's best food content."
            />
            <SaasFeature
              icon="⭐"
              title="Public dish ratings"
              description="Per-dish ratings published in real time. Not restaurant-level vibes — dish-level signal that tells you exactly what's working."
            />
            <SaasFeature
              icon="📊"
              title="POS-connected analytics"
              description="Connect to Toast, Square, or Clover. Live sales data feeds your menu display and your performance dashboard automatically."
            />
            <SaasFeature
              icon="♻️"
              title="Menu lifecycle tools"
              description="Performance-ranked dish table. Flag dishes for retirement. Replace them with new viral candidates. The menu is always getting better."
            />
          </div>
          <div className="mt-12 border border-dashed border-zinc-700 rounded-2xl p-8 text-center">
            <p className="text-zinc-400 text-sm mb-2">Restaurant SaaS · Coming 2025</p>
            <p className="text-white font-bold text-xl">From $99/month per location.</p>
            <p className="text-zinc-500 text-sm mt-2">Plug in to your existing POS. No hardware required.</p>
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="py-24 px-6 border-t border-zinc-900">
        <div className="max-w-xl mx-auto text-center">
          <SectionLabel>Get in touch</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-4">
            Interested in<br />Social Proof?
          </h2>
          <p className="text-zinc-500 mb-10 leading-relaxed">
            Whether you're an investor, a restaurant operator, or a potential partner — we'd love to talk. Fill out the form and we'll get back to you within 24 hours.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4 text-left"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-400 text-xs font-semibold mb-1.5 block">First name</label>
                <input
                  type="text"
                  className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className="text-zinc-400 text-xs font-semibold mb-1.5 block">Last name</label>
                <input
                  type="text"
                  className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600"
                  placeholder="Smith"
                />
              </div>
            </div>
            <div>
              <label className="text-zinc-400 text-xs font-semibold mb-1.5 block">Email</label>
              <input
                type="email"
                className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600"
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label className="text-zinc-400 text-xs font-semibold mb-1.5 block">I am a...</label>
              <select className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-500">
                <option value="">Select one</option>
                <option>Investor</option>
                <option>Restaurant operator</option>
                <option>Potential partner</option>
                <option>Press / media</option>
                <option>Just curious</option>
              </select>
            </div>
            <div>
              <label className="text-zinc-400 text-xs font-semibold mb-1.5 block">Message</label>
              <textarea
                className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600 resize-none h-28"
                placeholder="Tell us about yourself and what you're interested in..."
              />
            </div>
            <button
              type="submit"
              className="bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors text-base"
            >
              Send message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-white font-black">Social Proof</span>
          <p className="text-zinc-700 text-xs">Menu built by the internet. Rated by you.</p>
          <div className="flex gap-6 text-xs text-zinc-600">
            <Link to="/menu" className="hover:text-zinc-400 transition-colors">Customer menu</Link>
            <Link to="/admin" className="hover:text-zinc-400 transition-colors">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
