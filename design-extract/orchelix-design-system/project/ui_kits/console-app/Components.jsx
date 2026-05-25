// Orchelix Operator Console — components.
// All components exported to window for inter-script use.

const { useState } = React;

function Icon({ name, size = 16 }) {
  // Inline SVG icons (Lucide-style, 1.6px stroke)
  const stroke = "currentColor";
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke, strokeWidth: 1.7,
    strokeLinecap: "round", strokeLinejoin: "round"
  };
  switch (name) {
    case "home":     return <svg {...props}><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/></svg>;
    case "agents":   return <svg {...props}><circle cx="12" cy="8" r="3.2"/><path d="M5 20c1.2-3.6 4-5.4 7-5.4s5.8 1.8 7 5.4"/><circle cx="18.5" cy="6.5" r="1.5"/><circle cx="5.5" cy="6.5" r="1.5"/></svg>;
    case "inbox":    return <svg {...props}><path d="M3 12l3-7h12l3 7"/><path d="M3 12v7h18v-7"/><path d="M3 12h5l1.5 2h5L16 12h5"/></svg>;
    case "calls":    return <svg {...props}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>;
    case "spark":    return <svg {...props}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3"/></svg>;
    case "book":     return <svg {...props}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h13"/></svg>;
    case "settings": return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
    case "bell":     return <svg {...props}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>;
    case "search":   return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case "plus":     return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case "phone-down": return <svg {...props}><path d="M3 11c5-5 13-5 18 0"/><path d="m8 14-2 2-3-3 2-2"/></svg>;
    case "play":     return <svg {...props}><polygon points="6 4 20 12 6 20 6 4"/></svg>;
    case "transfer": return <svg {...props}><path d="M3 7h14m-3-3 3 3-3 3"/><path d="M21 17H7m3 3-3-3 3-3"/></svg>;
    case "calendar": return <svg {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
    case "globe":    return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    default: return null;
  }
}

function Sidebar() {
  const items = [
    { group: 'Workspace' },
    { ic: 'home', label: 'Overview', active: true },
    { ic: 'agents', label: 'Agents', count: '6' },
    { ic: 'inbox', label: 'Inbox', count: '12' },
    { ic: 'calls', label: 'Calls', count: '24' },
    { group: 'Insights' },
    { ic: 'spark', label: 'Performance' },
    { ic: 'book', label: 'Knowledge' },
    { ic: 'calendar', label: 'Schedule' },
    { group: 'Setup' },
    { ic: 'globe', label: 'Integrations' },
    { ic: 'settings', label: 'Settings' },
  ];
  return (
    <aside className="side">
      <div className="brand">
        <img src="../../assets/orchelix-mark-light.png" alt="" />
        <span className="nm">Orchelix</span>
      </div>
      <div className="org">
        <div className="av">NA</div>
        <div>
          <div className="nm">Northstar Acc.</div>
          <div className="sub">Mississauga, ON</div>
        </div>
        <span className="chev">⌄</span>
      </div>
      {items.map((it, i) => it.group
        ? <div key={i} className="group">{it.group}</div>
        : (
          <div key={i} className={`item ${it.active ? 'active' : ''}`}>
            <span className="ic"><Icon name={it.ic} /></span>
            {it.label}
            {it.count && <span className="count">{it.count}</span>}
          </div>
        )
      )}
      <div className="foot">
        <div className="av">AM</div>
        <div>
          <div className="nm">Ana Morales</div>
          <div className="role">Owner · admin</div>
        </div>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <div className="topbar">
      <div className="crumbs">
        <span>Workspace</span><span className="sep">/</span>
        <span>Agents</span><span className="sep">/</span>
        <span className="here">Esmi</span>
      </div>
      <div className="search">
        <Icon name="search" size={14} />
        <span>Search runs, callers, integrations</span>
        <span className="kbd" style={{ marginLeft: 'auto' }}>⌘K</span>
      </div>
      <div className="actions">
        <button className="icon-btn"><Icon name="bell" /><span className="badge-dot"></span></button>
        <button className="btn-deploy"><Icon name="plus" size={14} /> Deploy agent</button>
      </div>
    </div>
  );
}

function Spark() {
  // Tiny inline SVG spark — same height across KPIs
  return (
    <svg className="spark" width="72" height="32" viewBox="0 0 72 32" fill="none">
      <path d="M2 24 L10 20 L18 22 L26 14 L34 18 L42 10 L50 12 L58 6 L66 8 L70 4"
            stroke="#14B8A6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M2 24 L10 20 L18 22 L26 14 L34 18 L42 10 L50 12 L58 6 L66 8 L70 4 L70 30 L2 30 Z"
            fill="rgba(20,184,166,0.08)" stroke="none"/>
    </svg>
  );
}

function KPIs() {
  const data = [
    { lbl: 'Calls handled · today', val: '128', delta: '▲ 22% vs. 7d avg', up: true },
    { lbl: 'Pickup time · p50', val: '14s', delta: '▼ 3s vs. 7d avg', up: true },
    { lbl: 'Resolution rate', val: '87%', delta: '▲ 4 pts', up: true },
    { lbl: 'Escalations', val: '4', delta: '▲ 1 vs. yesterday', up: false },
  ];
  return (
    <div className="kpis">
      {data.map((d, i) => (
        <div className="kpi" key={i}>
          <div className="lbl">{d.lbl}</div>
          <div className="val">{d.val}</div>
          <div className={`delta ${d.up ? 'up' : 'down'}`}>{d.delta}</div>
          <Spark />
        </div>
      ))}
    </div>
  );
}

function LivePanel() {
  return (
    <div className="live">
      <div className="live-head">
        <div className="ic esmi"><img src="../../assets/esmi-logo.png" alt="" /></div>
        <div>
          <div className="title">Esmi · live call</div>
          <div className="sub">run-2026-05-21-0941-c4 · started 9:41:02</div>
        </div>
        <div className="status"><span className="pulse"></span>LIVE · 1:48</div>
      </div>
      <div className="live-body">
        <div>
          <div className="lbl">Caller</div>
          <div className="caller-name">Maria Sandoval</div>
          <div className="caller-meta">+1 (905) 555-0173 · returning · 3rd call</div>
        </div>
        <div>
          <div className="lbl">Detected intent</div>
          <div className="caller-name">Book service appointment</div>
          <div className="caller-meta" style={{ marginBottom: 8 }}>HVAC tune-up · confidence 0.94</div>
          <div className="lang">
            <span className="pill on">ES · primary</span>
            <span className="pill">EN · ready</span>
          </div>
        </div>
      </div>
      <div className="timeline">
        <div className="row done">
          <div className="dot">✓</div>
          <div>
            <div className="label">Call answered · greeting played</div>
            <div className="note">"Buenos días, gracias por llamar a Northstar — soy Aria, ¿en qué puedo ayudarle?"</div>
          </div>
          <div className="meta">9:41:02</div>
        </div>
        <div className="row done">
          <div className="dot">✓</div>
          <div>
            <div className="label">Identified caller & detected language (ES)</div>
            <div className="note">Matched to existing customer record · CRM #4082</div>
          </div>
          <div className="meta">9:41:14</div>
        </div>
        <div className="row done">
          <div className="dot">✓</div>
          <div>
            <div className="label">Captured intent: HVAC service appointment</div>
          </div>
          <div className="meta">9:41:36</div>
        </div>
        <div className="row active">
          <div className="dot">4</div>
          <div>
            <div className="label">Checking technician availability for next 5 days</div>
            <div className="note">Querying ServiceTitan · Maplewood region · running 1.8s</div>
            <div className="ctrl">
              <button className="primary"><Icon name="play" size={12} /> &nbsp;Listen in</button>
              <button><Icon name="transfer" size={12} /> &nbsp;Transfer to human</button>
              <button><Icon name="phone-down" size={12} /> &nbsp;End call</button>
            </div>
          </div>
          <div className="meta">running</div>
        </div>
        <div className="row idle">
          <div className="dot">5</div>
          <div><div className="label">Confirm slot & send bilingual SMS</div></div>
          <div className="meta">queued</div>
        </div>
        <div className="row idle">
          <div className="dot">6</div>
          <div><div className="label">Update CRM record &amp; close run</div></div>
          <div className="meta">queued</div>
        </div>
      </div>
    </div>
  );
}

function AgentList() {
  const agents = [
    { ic: 'esmi', tone: 'navy', nm: 'Esmi · Receptionist', sub: '24 runs today · 1 active', pill: 'LIVE', cls: '' },
    { ic: 'S', tone: 'teal', nm: 'Sales-Ops', sub: '18 leads qualified · idle 3m', pill: 'LIVE', cls: '' },
    { ic: 'F', tone: 'navy', nm: 'Accounting OS', sub: 'Daily-close · queued 5:00p', pill: 'IDLE', cls: 'idle' },
    { ic: 'R', tone: 'teal', nm: 'Revenue Insights', sub: 'Standup ready · review', pill: 'REVIEW', cls: 'warn' },
    { ic: 'O', tone: 'navy', nm: 'Operations Copilot', sub: 'Paused by Ana · 2h ago', pill: 'IDLE', cls: 'idle' },
  ];
  return (
    <div className="card">
      <h4>Agents</h4>
      <div className="agents">
        {agents.map((a, i) => (
          <div className="a" key={i}>
            <div className={`ic ${a.tone === 'teal' ? 'teal' : ''} ${a.ic === 'esmi' ? 'esmi' : ''}`}>
              {a.ic === 'esmi' ? <img src="../../assets/esmi-logo.png" alt="" /> : a.ic}
            </div>
            <div>
              <div className="nm">{a.nm}</div>
              <div className="sub">{a.sub}</div>
            </div>
            <div className={`pill ${a.cls}`}>{a.pill}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Transcript() {
  const turns = [
    { who: 'Caller', lang: 'ES', msg: 'Hola, necesito agendar una cita para revisar el aire acondicionado.' },
    { who: 'Agent', lang: 'ES', msg: 'Claro, con gusto. ¿Es la dirección en Maplewood Drive que tenemos en archivo?' },
    { who: 'Caller', lang: 'ES', msg: 'Sí, esa misma. ¿Pueden venir esta semana?' },
    { who: 'Agent', lang: 'ES', msg: 'Déjame revisar la agenda del técnico — un momento por favor.' },
  ];
  return (
    <div className="card transcript">
      <h4>Live transcript</h4>
      {turns.map((t, i) => (
        <div className="turn" key={i}>
          <div className={`who ${t.who === 'Agent' ? 'agent' : ''}`}>
            {t.who} <span className="lang-tag">{t.lang}</span>
          </div>
          <div className="msg">{t.msg}</div>
        </div>
      ))}
      <div className="composer">
        <input placeholder="Send a note to the agent…" />
        <button>Send</button>
      </div>
    </div>
  );
}

function PageHead() {
  const [tab, setTab] = useState('Today');
  return (
    <div className="page-head">
      <div className="title">
        <h1>Esmi <span style={{color:'var(--ink-3)',fontWeight:500,fontSize:'0.6em',letterSpacing:0}}>· Virtual Receptionist</span></h1>
        <div className="sub">Bilingual phone agent · deployed to (905) 555-0100 · last config update 2 days ago</div>
      </div>
      <div className="filters">
        <div className="seg">
          {['Today', '7 days', '30 days', 'Custom'].map(t =>
            <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>
          )}
        </div>
        <button className="btn-pri"><Icon name="settings" size={12} /> &nbsp;Configure</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Topbar />
      <main className="main">
        <PageHead />
        <KPIs />
        <div className="layout">
          <LivePanel />
          <div className="rail">
            <AgentList />
            <Transcript />
          </div>
        </div>
      </main>
    </div>
  );
}

Object.assign(window, { Icon, Sidebar, Topbar, KPIs, LivePanel, AgentList, Transcript, PageHead, App });
