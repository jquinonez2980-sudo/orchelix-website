// Marketing site — composable React components.
// All components live on `window` so other <script type="text/babel"> tags can use them.

const { useState } = React;

function Nav() {
  return (
    <header className="site-nav">
      <div className="container row">
        <a className="brand" href="#">
          <img className="lockup-h" src="../../assets/orchelix-lockup-horizontal.png" alt="Orchelix AI Consulting" />
        </a>
        <nav className="links">
          <a href="#agents">Agents</a>
          <a href="#platform">Platform</a>
          <a href="#industries">Industries</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
        </nav>
        <div className="right">
          <a className="btn btn-ghost" href="#">Sign in</a>
          <a className="btn btn-primary" href="#">Book a call</a>
        </div>
      </div>
    </header>
  );
}

function HeroFigure() {
  return (
    <div className="hero-fig" aria-hidden="true">
      <div className="head">
        <span className="led on"></span>
        <span className="led on"></span>
        <span className="led"></span>
        <span className="tag">● live · 3 agents</span>
      </div>
      <div className="panels">
        <div className="panel">
          <div className="lbl">Calls handled · today</div>
          <div className="val">128</div>
          <div className="sub">▲ 22% vs. avg.</div>
        </div>
        <div className="panel">
          <div className="lbl">AR collected · 30d</div>
          <div className="val">$184k</div>
          <div className="sub">14 invoices auto-cleared</div>
        </div>
      </div>
      <div className="panel">
        <div className="lbl">Recent agent activity</div>
        <div className="events">
          <div className="ev"><span className="dot"></span>Receptionist booked appt · Maria S.<span className="t">9:41a</span></div>
          <div className="ev"><span className="dot"></span>Sales-Ops qualified lead · Acme HVAC<span className="t">9:38a</span></div>
          <div className="ev"><span className="dot"></span>Finance closed PO #2041<span className="t">9:30a</span></div>
          <div className="ev"><span className="dot idle"></span>Daily-close · queued for 5:00p<span className="t">queued</span></div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">AI&nbsp;&nbsp;Consulting · Toronto, ON</div>
          <h1>
            Agents that run your <span className="accent">revenue operations.</span>
          </h1>
          <p className="lead">
            Orchelix builds multi-agent systems that answer calls, qualify pipeline,
            close the books, and keep your operators in the loop — quietly, bilingually,
            and around the clock.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary btn-lg btn-arrow" href="#">Book a consultation</a>
            <a className="btn btn-ghost btn-lg" href="#">See how it works</a>
          </div>
          <div className="proof">
            <span><span className="dot"></span>&nbsp;&nbsp;EN · ES bilingual</span>
            <span>SOC 2 · in-progress</span>
            <span>PIPEDA-aligned</span>
          </div>
        </div>
        <HeroFigure />
      </div>
    </section>
  );
}

function LogoStrip() {
  return (
    <section className="logos">
      <div className="container row">
        <span className="lbl">Trusted by Canadian operators</span>
        <span className="logo">NORTHSTAR &nbsp;Accounting</span>
        <span className="logo">Riverstone Clinic</span>
        <span className="logo">Bloom &amp; Co.</span>
        <span className="logo">Maplewood HVAC</span>
        <span className="logo">Iglesia Pueblo</span>
      </div>
    </section>
  );
}

function Agent({ initial, tone, title, desc, badge }) {
  return (
    <a className="agent" href="#">
      <div className={`ic ${tone === 'teal' ? 'teal' : ''}`}>{initial}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="foot">
        <span className="badge">{badge}</span>
        <span style={{ marginLeft: 'auto' }}>Learn more →</span>
      </div>
    </a>
  );
}

function AgentGrid() {
  const items = [
    { initial: 'V', tone: 'navy', title: 'Virtual Receptionist', desc: 'Answers, qualifies, and books — bilingually, 24/7. Routes the urgent calls to a human.', badge: 'LIVE' },
    { initial: 'S', tone: 'teal', title: 'Sales & Marketing', desc: 'Drafts outbound, nurtures inbound, and keeps your CRM hygiene quietly perfect.', badge: 'LIVE' },
    { initial: 'F', tone: 'navy', title: 'Accounting OS', desc: 'Categorizes transactions, reconciles, and runs the month-end close with you in the loop.', badge: 'LIVE' },
    { initial: 'R', tone: 'teal', title: 'Revenue Insights', desc: 'A daily standup of what changed, what to act on, and where money is leaking.', badge: 'BETA' },
    { initial: 'O', tone: 'navy', title: 'Operations Copilot', desc: 'Triages tickets, drafts SOPs, and pages the right person — across email, SMS, and Slack.', badge: 'BETA' },
    { initial: 'E', tone: 'teal', title: 'Embodied · Coming', desc: 'A path to humanoid integration for in-person hospitality, reception, and field work.', badge: 'EXPLORING' },
  ];
  return (
    <section className="section" id="agents">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow eyebrow-navy">The agent stack</span>
          <h2>One system for the work that keeps a business running.</h2>
          <p>Each Orchelix agent is built for a specific revenue function, and they all share the same operator console, audit trail, and human-in-the-loop controls.</p>
        </div>
        <div className="agents">
          {items.map((a, i) => <Agent key={i} {...a} />)}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section" style={{ background: 'var(--surface)' }} id="platform">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How Orchelix works</span>
          <h2>Designed for owners, not just engineers.</h2>
          <p>We start with a focused two-week pilot, instrument one workflow end-to-end, and only expand once you can see it earning its keep.</p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="n">1</div>
            <h4>Map a workflow</h4>
            <p>We sit with your team for a week to find the single most-paid, least-loved process — phones, AR follow-ups, lead routing.</p>
          </div>
          <div className="step">
            <div className="n">2</div>
            <h4>Deploy an agent</h4>
            <p>A single-purpose agent goes live with full audit trail, escalation rules, and a human-in-the-loop console.</p>
          </div>
          <div className="step">
            <div className="n">3</div>
            <h4>Scale the system</h4>
            <p>Once one workflow is paying for itself, we add adjacent agents that share context — and eventually, embodied operators.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="section-tight">
      <div className="container">
        <div className="stats">
          <div className="stat"><div className="num">14<span className="u">s</span></div><div className="lbl">Average pickup time across deployed receptionists.</div></div>
          <div className="stat"><div className="num">2<span className="u">×</span></div><div className="lbl">Bilingual coverage — every agent speaks English and Spanish.</div></div>
          <div className="stat"><div className="num">87<span className="u">%</span></div><div className="lbl">Of calls resolved without escalating to a human operator.</div></div>
          <div className="stat"><div className="num">10<span className="u">d</span></div><div className="lbl">From first kickoff call to a working pilot in production.</div></div>
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <div className="container quote">
        <div>
          <span className="eyebrow eyebrow-navy">Customer story</span>
          <blockquote>
            The receptionist agent picked up 412 calls in its first month —
            bilingually, on weekends, and without missing a single appointment.
            It paid for itself before the pilot ended.
          </blockquote>
          <div className="who">
            <div className="av">AM</div>
            <div>
              <div className="nm">Ana Morales, CPA</div>
              <div className="role">Managing partner · Northstar Accounting · Mississauga, ON</div>
            </div>
          </div>
        </div>
        <div className="pic"></div>
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section className="section-tight">
      <div className="container">
        <div className="cta-band">
          <div>
            <h3>Start with one agent. Pay for itself in 30 days.</h3>
            <p>A two-week pilot, a clear scorecard, and a senior consultant on the line for every deployment.</p>
          </div>
          <div className="actions">
            <a className="btn btn-light btn-lg btn-arrow" href="#">Book a consultation</a>
            <a className="btn btn-secondary btn-lg" href="#">Download brief (PDF)</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-foot">
      <div className="container">
        <div className="grid">
          <div>
            <div className="brand">
              <img className="lockup-h" src="../../assets/orchelix-lockup-horizontal.png" alt="Orchelix AI Consulting" />
            </div>
            <p className="desc">AI agents for Canadian SMEs, professional firms, and the operators who keep them running. Toronto · Mississauga · remote across Ontario.</p>
          </div>
          <div className="col">
            <h5>Agents</h5>
            <a href="#">Virtual Receptionist</a>
            <a href="#">Sales &amp; Marketing</a>
            <a href="#">Accounting OS</a>
            <a href="#">Revenue Insights</a>
          </div>
          <div className="col">
            <h5>Company</h5>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
            <a href="#">Press kit</a>
          </div>
          <div className="col">
            <h5>Trust</h5>
            <a href="#">Security</a>
            <a href="#">PIPEDA</a>
            <a href="#">Privacy</a>
            <a href="#">Status</a>
          </div>
        </div>
        <div className="legal">
          <span>© 2026 Orchelix AI Consulting Inc. · Made in Ontario.</span>
          <span>EN · ES · FR</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Nav, Hero, HeroFigure, LogoStrip, Agent, AgentGrid,
  HowItWorks, Stats, Testimonial, CTABand, Footer
});
