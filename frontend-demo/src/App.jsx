import { useEffect, useMemo, useState } from 'react';
import apiCatalog from './data/endpoints.json';

const DEMO_BASE = 'https://api.example.invalid';
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Playground', path: '/playground' },
  { label: 'Monitor', path: '/monitor' },
  { label: 'Terms', path: '/terms' },
  { label: 'Privacy', path: '/privacy' },
];


function Icon({ name, size = 18, strokeWidth = 1.7 }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    arrow: <><path d="M4.5 12h15"/><path d="m13 5.5 6.5 6.5-6.5 6.5"/></>,
    chevron: <path d="m7 9 5 5 5-5"/>,
    plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4 4"/></>,
    moon: <path d="M20.2 15.3A8.6 8.6 0 0 1 8.7 3.8 8.8 8.8 0 1 0 20.2 15.3Z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    external: <><path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/></>,
    zap: <path d="m13 2-3 8h7l-6 12 1-9H5l8-11Z"/>,
    shield: <><path d="M12 3 20 6v5c0 5.2-3.4 8.6-8 10-4.6-1.4-8-4.8-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-4.8"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3.5 9h17M3.5 15h17M12 3c2.2 2.4 3.3 5.4 3.3 9s-1.1 6.6-3.3 9c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z"/></>,
    chart: <><path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 6-7"/></>,
    code: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/></>,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></>,
    play: <path d="m8 5 11 7-11 7V5Z"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    terminal: <><path d="m4 6 5 5-5 5"/><path d="M12 17h8"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    server: <><rect x="4" y="4" width="16" height="6" rx="1.5"/><rect x="4" y="14" width="16" height="6" rx="1.5"/><path d="M8 7h.01M8 17h.01M12 7h4M12 17h4"/></>,
    github: <><path d="M9 19c-4.5 1.5-4.5-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19 5.2 4.8 4.8 0 0 0 18.9 2S17.7 1.7 15 3.5a13.5 13.5 0 0 0-7 0C5.3 1.7 4.1 2 4.1 2A4.8 4.8 0 0 0 4 5.2a5.2 5.2 0 0 0-1.3 3.6c0 5.2 3.2 6.4 6.2 6.7A3.4 3.4 0 0 0 8 18.1V22"/></>,
    spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></>,
    wifi: <><path d="M5 12.5a10.5 10.5 0 0 1 14 0M8.5 16a5.3 5.3 0 0 1 7 0M12 20h.01"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...common}>{paths[name] || paths.spark}</svg>;
}

function Logo({ onClick }) {
  return <a className="brand" href="/" onClick={(event) => { event.preventDefault(); onClick('/'); }} aria-label="API ZYHUKA — Home">
    <span className="brand-mark"><span/><span/><span/><span/></span>
    <span className="brand-name">ZYHUKA<small>FRONTEND DEMO</small></span>
  </a>;
}

function InternalLink({ to, navigate, children, className = '', ...props }) {
  return <a href={to} className={className} onClick={(event) => { event.preventDefault(); navigate(to); }} {...props}>{children}</a>;
}

function Header({ path, navigate, theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => setMenuOpen(false), [path]);
  return <header className="site-header">
    <div className="nav-shell">
      <Logo onClick={navigate}/>
      <nav className={`primary-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navigasi utama">
        {navItems.map((item) => <InternalLink key={item.path} to={item.path} navigate={navigate} className={`nav-link ${path === item.path ? 'active' : ''}`}>{item.label}</InternalLink>)}
      </nav>
      <div className="nav-actions">
        <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Ganti ke tema ${theme === 'dark' ? 'terang' : 'gelap'}`} title="Ganti tema"><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17}/></button>
        <InternalLink to="/playground" navigate={navigate} className="community-button">Open Playground <Icon name="arrow" size={15}/></InternalLink>
        <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}><Icon name={menuOpen ? 'close' : 'menu'} size={20}/></button>
      </div>
    </div>
  </header>;
}

function Footer({ navigate }) {
  return <footer className="site-footer">
    <div className="footer-top">
      <div className="footer-brand-block">
        <Logo onClick={navigate}/>
        <p>Frontend demo untuk mengeksplorasi pola UI API console. Semua interaksi berjalan lokal.</p>
        <div className="social-links"><InternalLink to="/playground" navigate={navigate} aria-label="Playground">P</InternalLink><InternalLink to="/monitor" navigate={navigate} aria-label="Monitor">M</InternalLink></div>
      </div>
      <div className="footer-column"><span className="footer-label">Explore</span>
        {navItems.slice(0, 3).map((item) => <InternalLink key={item.path} to={item.path} navigate={navigate}>{item.label}</InternalLink>)}
      </div>
      <div className="footer-column"><span className="footer-label">Project notes</span>
        <InternalLink to="/terms" navigate={navigate}>Terms · draft</InternalLink>
        <InternalLink to="/privacy" navigate={navigate}>Privacy · draft</InternalLink>
      </div>
      <div className="footer-powered"><span className="footer-label">Project mode</span><div className="powered-card"><span className="powered-dot"/><span><b>Offline UI preview</b><small>No API calls · sample data</small></span><Icon name="code" size={14}/></div></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Zyhuka · Frontend demo only</span><div><InternalLink to="/privacy" navigate={navigate}>Privacy draft</InternalLink><span className="footer-divider">/</span><InternalLink to="/terms" navigate={navigate}>Terms draft</InternalLink></div><span className="footer-region"><i/> Local sample mode</span></div>
  </footer>;
}
const faqItems = [
  { q: 'Apakah ini API live?', tag: 'Demo only', a: 'Bukan. Zyhuka adalah frontend preview; tidak ada backend atau request jaringan yang dijalankan.' },
  { q: 'Apa isi katalog Playground?', tag: 'Sample data', a: 'Katalog berisi contoh 197 path dengan operasi GET/POST untuk memperagakan pencarian, filter, form, dan detail endpoint.' },
  { q: 'Apa yang dilakukan tombol simulasi?', tag: 'Local mock', a: 'Tombol menampilkan respons contoh di browser. Tidak menghubungi API atau server mana pun.' },
  { q: 'Apakah angka Monitor live?', tag: 'Illustrative', a: 'Tidak. Seluruh angka, grafik, dan event Monitor adalah data sample statis yang ditandai sebagai demo.' },
  { q: 'Apakah Terms dan Privacy final?', tag: 'Draft', a: 'Tidak. Keduanya placeholder copy untuk preview UI, bukan kebijakan yang berlaku atau nasihat hukum.' },
];

function HomePage({ navigate }) {
  const [openFaq, setOpenFaq] = useState(0);
  const features = [
    { icon: 'zap', title: 'Local simulation', text: 'Interaksi form dan respons contoh diproses di browser tanpa request jaringan.' },
    { icon: 'shield', title: 'Sample catalog', text: 'Jelajahi 197 path contoh dengan operasi GET/POST untuk mengecek struktur UI.' },
    { icon: 'globe', title: 'No backend', text: 'Project ini tidak terhubung ke layanan API. Semua endpoint dan respons hanya contoh.' },
    { icon: 'chart', title: 'Sample monitor', text: 'Grafik dan metrik statis diberi label sample; tidak ada status layanan live.' },
  ];
  return <>
    <section className="hero-section">
      <div className="hero-grid" aria-hidden="true"/>
      <div className="hero-orb" aria-hidden="true"/>
      <div className="hero-shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot"/> FRONTEND UI PREVIEW · SAMPLE MODE <span className="eyebrow-line"/></div>
          <h1>NO BACKEND.<br/><span>NO LIVE DATA.</span><br/>JUST PURE <em>UI.</em></h1>
          <p className="hero-lede">Zyhuka adalah replika frontend untuk mengeksplorasi layout API console. Form, katalog, dan respons di sini hanya contoh lokal; tidak ada request jaringan.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => navigate('/playground')}>Browse endpoints <Icon name="arrow" size={16}/></button>
            <InternalLink to="/playground" navigate={navigate} className="button button-quiet"><Icon name="code" size={17}/> View API directory</InternalLink>
          </div>
          <div className="hero-footnote"><span><Icon name="shield" size={14}/> LOCAL SAMPLE DATA</span><i/><span>FRONTEND PREVIEW</span></div>
        </div>
        <div className="hero-art" aria-label="Ilustrasi jendela terminal API">
          <div className="art-halo"/>
          <div className="code-card card-back"><span className="mini-pulse"/> LOCAL UI <span className="green-text">SAMPLE ONLY</span></div>
          <div className="terminal-window">
            <div className="terminal-titlebar"><div className="window-dots"><i/><i/><i/></div><span>request.preview</span><span className="terminal-live"><i/> OFFLINE DEMO</span></div>
            <div className="terminal-body"><div className="terminal-label">// SAMPLE REQUEST · NOT SENT</div><div><span className="code-method">GET</span> <span className="code-muted">https://api.example.invalid</span></div><div className="code-route">/api/ai/duckai</div><div className="terminal-separator"/><div className="json-line"><span className="json-punc">{ '{' }</span></div><div className="json-line indent"><span className="json-key">"status"</span><span className="json-punc">:</span> <span className="json-value">"sample"</span><span className="json-punc">,</span></div><div className="json-line indent"><span className="json-key">"data"</span><span className="json-punc">:</span> <span className="json-value">"Demo payload"</span></div><div className="json-line"><span className="json-punc">{ '}' }</span></div><div className="terminal-meta"><span>SAMPLE</span><span>·</span><span>LOCAL MOCK</span></div></div>
          </div>
          <div className="floating-tag tag-top"><span className="tag-icon"><Icon name="zap" size={15}/></span><span><b>Local simulation</b><small>No network request</small></span></div>
          <div className="floating-tag tag-bottom"><span className="tag-icon tag-icon-blue"><Icon name="code" size={16}/></span><span><b>394 demo operations</b><small>GET + POST sample forms</small></span><span className="tag-arrow"><Icon name="arrow" size={14}/></span></div>
          <div className="art-coordinate">API / OPEN / 01</div>
        </div>
      </div>
      <div className="hero-bottomline"><span>01 / A MORE OPEN DEVELOPER ECOSYSTEM</span><span>SCROLL TO EXPLORE <b>↓</b></span></div>
    </section>

    <section className="trust-strip"><div className="trust-intro"><span className="eyebrow-small">MADE FOR BUILDERS</span><p>One clean UI.<br/><b>Clear upstream boundaries.</b></p></div><div className="trust-item"><b>197</b><span>API PATHS IN CATALOG</span></div><div className="trust-item"><b>0</b><span>UI ACCOUNTS</span></div><div className="trust-item"><b>5</b><span>FRONTEND ROUTES</span></div><div className="trust-item trust-uptime"><b><i/> <span>PREVIEW</span></b><span>FRONTEND ONLY</span></div></section>

    <section className="section-shell feature-section">
      <div className="section-heading"><div><span className="eyebrow-small">WHY ZYHUKA UI</span><h2>More building.<br/><span>Less friction.</span></h2></div><p>UI demo ini memperlihatkan pola katalog, form, dan monitor tanpa menjalankan backend atau layanan API.</p></div>
      <div className="feature-grid">{features.map((feature, index) => <article className="feature-card" key={feature.title}><div className="feature-top"><span className="feature-icon"><Icon name={feature.icon} size={19}/></span><span className="feature-index">0{index + 1}</span></div><h3>{feature.title}</h3><p>{feature.text}</p><span className="feature-arrow"><Icon name="arrow" size={15}/></span></article>)}</div>
    </section>

    <section className="section-shell console-section"><div className="console-card"><div className="console-copy"><span className="eyebrow-small">FROM IDEA TO REQUEST</span><h2>Meet your new<br/><span>API console.</span></h2><p>Cari endpoint, isi parameter, dan kirim request dari satu tempat. Coba tanpa harus meninggalkan browser.</p><button className="button button-primary" onClick={() => navigate('/playground')}>Open playground <Icon name="arrow" size={16}/></button></div><div className="console-preview"><div className="preview-bar"><span><i/><i/><i/></span><small>api.example.invalid / sample</small><span className="preview-badge">PLAYGROUND</span></div><div className="preview-content"><div className="preview-sidebar"><span>SEARCH ENDPOINTS</span><b>AI</b><i>Anime</i><i>Downloader</i><i>Tools</i></div><div className="preview-request"><div className="preview-request-title"><span className="method-pill">GET</span><code>/api/ai/duckai</code></div><div className="preview-input">prompt <span>Tell me something useful…</span></div><div className="preview-run"><Icon name="play" size={12}/> Send request</div><div className="preview-response"><span>SAMPLE RESPONSE · LOCAL</span><code>{ '{ "status": "success" }' }</code></div></div></div></div></div></section>

    <section className="section-shell faq-section"><div className="section-heading faq-heading"><div><span className="eyebrow-small">GOOD TO KNOW</span><h2>Questions,<br/><span>answered.</span></h2></div><p>Semua interaksi dalam preview ini tetap lokal; tidak ada komunitas atau layanan live yang terhubung.</p></div><div className="faq-list">{faqItems.map((item, index) => <article className={`faq-item ${openFaq === index ? 'is-open' : ''}`} key={item.q}><button className="faq-question" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span className="faq-number">0{index + 1}</span><span className="faq-title">{item.q}</span><span className="faq-tag">{item.tag}</span><span className="faq-toggle"><Icon name="plus" size={16}/></span></button>{openFaq === index && <div className="faq-answer"><p>{item.a}</p>{index === 4 && <button onClick={() => navigate('/privacy')}>Read privacy policy <Icon name="arrow" size={14}/></button>}</div>}</article>)}</div></section>

    <section className="powered-section"><div className="section-shell powered-inner"><div><span className="eyebrow-small">SAMPLE MODE</span><h2>One frontend.<br/><span>No backend.</span></h2></div><p>Catalog, responses, charts, and monitor values are illustrative local data. This project does not contact an API or provide a live service.</p><div className="partner-lockup"><div className="powered-card"><span className="powered-dot"/><span><b>Offline preview</b><small>394 demo operations</small></span><Icon name="code" size={14}/></div></div></div></section>
  </>;
}

function EndpointBrowser({ endpoints, categories, selected, onSelect }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All demo operations');
  const [showAll, setShowAll] = useState(false);
  const filtered = useMemo(() => endpoints.filter((item) => {
    const matchesCategory = activeCategory === 'All demo operations' || item.category.toLowerCase() === activeCategory.toLowerCase();
    const text = `${item.path} ${item.summary} ${item.description} ${item.category}`.toLowerCase();
    return matchesCategory && text.includes(search.toLowerCase().trim());
  }), [endpoints, activeCategory, search]);
  useEffect(() => setShowAll(false), [activeCategory, search]);
  const shown = showAll ? filtered : filtered.slice(0, 16);
  return <div className="endpoint-browser">
    <div className="endpoint-search"><Icon name="search" size={17}/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari endpoint, kategori, atau kata kunci…" aria-label="Cari endpoint"/>{search && <button onClick={() => setSearch('')} aria-label="Hapus pencarian"><Icon name="close" size={15}/></button>}<kbd>⌘ K</kbd></div>
    <div className="browser-categories"><button className={activeCategory === 'All demo operations' ? 'selected' : ''} onClick={() => setActiveCategory('All demo operations')}>All demo operations <span>{endpoints.length}</span></button>{categories.map(([category, count]) => <button key={category} className={activeCategory === category ? 'selected' : ''} onClick={() => setActiveCategory(category)}>{category}<span>{count}</span></button>)}</div>
    <div className="endpoint-results-heading"><span>{activeCategory === 'All demo operations' ? 'BROWSE SAMPLE OPERATIONS' : activeCategory.toUpperCase()}</span><span>{filtered.length} RESULTS</span></div>
    <div className="endpoint-results">{shown.map((endpoint) => <button className={`endpoint-row ${selected?.path === endpoint.path && selected?.method === endpoint.method ? 'active' : ''}`} key={`${endpoint.method}-${endpoint.path}`} onClick={() => onSelect(endpoint)}><span className={`method-pill method-${endpoint.method.toLowerCase()}`}>{endpoint.method.toUpperCase()}</span><span className="endpoint-row-info"><code>{endpoint.path}</code><small>{endpoint.summary || 'No description provided'}</small></span><span className="endpoint-category">{endpoint.category}</span><Icon name="chevron" size={15}/></button>)}{filtered.length === 0 && <div className="empty-search"><span><Icon name="search" size={20}/></span><b>No endpoints found</b><p>Coba kata kunci lain atau pilih kategori yang berbeda.</p></div>}</div>
    {filtered.length > shown.length && <button className="load-more" onClick={() => setShowAll(true)}>Show all {filtered.length} endpoints <Icon name="arrow" size={14}/></button>}
    {filtered.length > 16 && showAll && <button className="load-more" onClick={() => setShowAll(false)}>Show fewer endpoints <Icon name="chevron" size={14}/></button>}
  </div>;
}

function RequestPanel({ endpoint }) {
  const [values, setValues] = useState({});
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const parameters = endpoint?.parameters || [];
  const requestUrl = useMemo(() => {
    if (!endpoint) return '';
    let path = endpoint.path;
    for (const param of parameters.filter((item) => item.in === 'path')) path = path.replace(`{${param.name}}`, encodeURIComponent(values[param.name] || `{${param.name}}`));
    const query = new URLSearchParams();
    for (const param of parameters.filter((item) => item.in === 'query')) if (values[param.name]) query.set(param.name, values[param.name]);
    return `${DEMO_BASE}${path}${query.toString() ? `?${query.toString()}` : ''}`;
  }, [endpoint, parameters, values]);
  useEffect(() => { setValues({}); setBody(''); setResult(null); setCopied(false); }, [endpoint?.path, endpoint?.method]);
  const command = endpoint ? `curl -X ${endpoint.method.toUpperCase()} '${requestUrl}'${endpoint.method.toLowerCase() === 'post' ? " \\\n  -H 'Content-Type: application/json' \\\n  -d '{}'" : ''}` : '';
  const setValue = (name, value) => setValues((current) => ({ ...current, [name]: value }));
  async function simulateRequest() {
    if (!endpoint) return;
    setLoading(true); setResult(null);
    await new Promise((resolve) => window.setTimeout(resolve, 320));
    const payload = {
      demo: true,
      message: 'Sample response only. No network request was sent.',
      method: endpoint.method.toUpperCase(),
      path: endpoint.path,
      parameters: values,
      body: body.trim() || null,
    };
    setResult({ ok: true, status: '200 · SAMPLE', elapsed: 32, headers: { 'content-type': 'application/json', 'x-demo-mode': 'local-only' }, payload });
    setLoading(false);
  }
  async function copyCommand() {
    try { await navigator.clipboard.writeText(command); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); }
  }
  if (!endpoint) return <aside className="request-panel request-empty"><div className="request-empty-icon"><Icon name="terminal" size={22}/></div><span>SELECT A SAMPLE OPERATION</span><p>Pilih operasi dari katalog demo untuk melihat parameter dan simulasi respons lokal.</p></aside>;
  const schema = endpoint.requestBody?.content?.['application/json']?.schema;
  const showBody = endpoint.method.toLowerCase() !== 'get' && endpoint.method.toLowerCase() !== 'head';
  const fields = parameters.filter((item) => item.in === 'query' || item.in === 'path');
  return <aside className="request-panel">
    <div className="request-panel-top"><div><span className="eyebrow-small">LOCAL SAMPLE CONFIG</span><h2>Try it out</h2></div><span className="no-auth-pill"><i/> DEMO MODE</span></div>
    <div className="selected-endpoint"><span className={`method-pill method-${endpoint.method.toLowerCase()}`}>{endpoint.method.toUpperCase()}</span><code>{endpoint.path}</code></div>
    <p className="endpoint-description">{endpoint.description || endpoint.summary || 'Sample API operation.'}</p>
    {fields.length > 0 ? <div className="request-fields">{fields.map((field) => <label className="request-field" key={`${field.in}-${field.name}`}><span>{field.name}<i>{field.required ? 'SAMPLE REQUIRED' : field.in.toUpperCase()}</i></span><input value={values[field.name] || ''} onChange={(event) => setValue(field.name, event.target.value)} placeholder={field.description || `Sample value for ${field.name}`} required={field.required}/>{field.description && <small>{field.description}</small>}</label>)}</div> : <div className="no-params"><Icon name="check" size={15}/> This demo operation has no input fields.</div>}
    {showBody && <label className="request-field body-field"><span>SAMPLE REQUEST BODY <i>JSON</i></span><textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder={JSON.stringify(schema?.example || {}, null, 2)} rows={5}/><small>Local sample only; payload stays in this browser page.</small></label>}
    <button className="button button-primary execute-button" disabled={loading} onClick={simulateRequest}><Icon name={loading ? 'clock' : 'play'} size={15}/>{loading ? 'Simulating…' : 'Simulate request'}<span>↵</span></button>
    <div className="request-note"><Icon name="shield" size={14}/> Local simulation only. No network request is sent.</div>
    {result && <div className="response-block"><div className="response-heading"><span>DEMO RESPONSE</span><div className="response-ok"><i/>{result.status}</div><small>{result.elapsed} ms · sample</small></div><div className="response-headers"><span>HEADERS · SAMPLE</span><pre>{JSON.stringify(result.headers, null, 2)}</pre></div><pre className="response-output">{JSON.stringify(result.payload, null, 2)}</pre></div>}
    <div className="curl-block"><div className="curl-heading"><span><Icon name="terminal" size={14}/> cURL · EXAMPLE ONLY</span><button onClick={copyCommand}><Icon name={copied ? 'check' : 'copy'} size={13}/>{copied ? 'Copied' : 'Copy'}</button></div><pre>{command}{'\n\n# Example only — .invalid is reserved; this is not executed.'}</pre></div>
    <div className="request-footer"><span>RESERVED DEMO HOST</span><code>{DEMO_BASE}</code></div>
  </aside>;
}
function PlaygroundPage() {
  const endpoints = apiCatalog.endpoints || [];
  const categoryCounts = useMemo(() => {
    const counts = new Map();
    for (const endpoint of endpoints) counts.set(endpoint.category, (counts.get(endpoint.category) || 0) + 1);
    return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [endpoints]);
  const [selected, setSelected] = useState(endpoints[0] || null);
  return <div className="page-shell playground-page">
    <div className="page-intro playground-intro"><div><span className="eyebrow-small">OFFLINE WORKSPACE <i/> SAMPLE DATA</span><h1>API <span>Console.</span></h1><p>Jelajahi 197 path contoh / 394 operasi GET dan POST. Form dan respons disimulasikan lokal, tanpa koneksi API.</p></div><div className="catalog-stat"><span className="stat-status-dot"/><b>{endpoints.length}</b><span>DEMO OPS<br/>LOCAL SAMPLE</span></div></div>
    <div className="playground-grid"><EndpointBrowser endpoints={endpoints} categories={categoryCounts} selected={selected} onSelect={setSelected}/><RequestPanel endpoint={selected}/></div>
    <div className="playground-bottom-note"><Icon name="shield" size={14}/><span>Data katalog hanya contoh; tidak ada request jaringan. Baca <a href="/terms" onClick={(event) => {event.preventDefault(); window.history.pushState({}, '', '/terms'); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0,0);}}>ketentuan layanan</a>.</span><span>394 OPERATIONS · DEMO ONLY</span></div>
  </div>;
}

const demoBars = [26, 42, 33, 57, 38, 68, 44, 73, 54, 80, 49, 64, 40, 75, 57, 90, 61, 78, 50, 69, 44, 84, 60, 72, 48, 94, 62, 79, 52, 68, 39, 75, 57, 87, 64, 80];
function MiniBarChart() { return <div className="monitor-chart"><div className="chart-lines"><i/><i/><i/><i/></div><div className="chart-bars">{demoBars.map((height, index) => <i key={index} style={{ '--height': `${height}%` }}/>)}</div><div className="chart-axis"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>NOW</span></div></div>; }
function MonitorPage() {
  const stats = [
    { label: 'TOTAL REQUESTS · SAMPLE', value: '1,284', sub: 'Illustrative demo value', icon: 'chart' },
    { label: 'SUCCESS RATE · SAMPLE', value: '98.6%', sub: 'Illustrative demo value', icon: 'check' },
    { label: 'AVG. LATENCY · SAMPLE', value: '142 ms', sub: 'Illustrative demo value', icon: 'clock' },
    { label: 'NODES · SAMPLE', value: '03', sub: 'Illustrative demo value', icon: 'globe' },
  ];
  return <div className="page-shell monitor-page">
    <div className="page-intro monitor-intro"><div><span className="eyebrow-small">SAMPLE SYSTEM OVERVIEW <i/></span><h1>Network <span>monitor.</span></h1><p>UI preview dengan metrik dan grafik contoh. Tidak ada backend atau telemetry live.</p></div><span className="demo-indicator"><i/> SAMPLE DATA · NOT LIVE</span></div>
    <div className="monitor-notice"><span className="notice-icon"><Icon name="wifi" size={18}/></span><div><b>Seluruh angka di halaman ini adalah data demo.</b><p>Nilai, status, grafik, dan event bersifat ilustratif dan tidak menggambarkan layanan operasional apa pun.</p></div><span className="sample-pill">NO NETWORK</span></div>
    <div className="monitor-stat-grid">{stats.map((item) => <article className="monitor-stat-card" key={item.label}><div className="monitor-stat-top"><span>{item.label}</span><Icon name={item.icon} size={15}/></div><b>{item.value}</b><small>{item.sub}</small></article>)}</div>
    <div className="monitor-dashboard-grid"><article className="monitor-panel traffic-panel"><div className="monitor-panel-heading"><div><span className="eyebrow-small">SAMPLE TRAFFIC</span><h2>Request history</h2></div><span className="sample-pill">ILLUSTRATIVE DATA</span></div><MiniBarChart/><p className="chart-caption">Grafik statis untuk demonstrasi layout — bukan telemetry live.</p></article><article className="monitor-panel health-panel"><div className="monitor-panel-heading"><div><span className="eyebrow-small">SAMPLE STATUS</span><h2>Component status</h2></div><span className="sample-pill">DEMO</span></div><div className="component-row"><span className="component-icon"><Icon name="server" size={16}/></span><span><b>Demo API surface</b><small>Sample state only · no backend</small></span><i className="status-neutral">DEMO</i></div><div className="component-row"><span className="component-icon"><Icon name="globe" size={16}/></span><span><b>Network activity</b><small>No network connection</small></span><i className="status-neutral">OFF</i></div><div className="component-row"><span className="component-icon"><Icon name="code" size={16}/></span><span><b>Sample catalog</b><small>Static local JSON</small></span><i className="status-connected">LOCAL</i></div></article></div>
    <div className="monitor-bottom-grid"><article className="monitor-panel"><div className="monitor-panel-heading"><div><span className="eyebrow-small">SAMPLE ACTIVITY</span><h2>Example events</h2></div><span className="sample-pill">NOT REAL REQUESTS</span></div><div className="demo-events"><div className="demo-event-row"><span className="method-pill">GET</span><code>/demo/weather</code><b>200</b><small>42 ms · sample</small></div><div className="demo-event-row"><span className="method-pill method-post">POST</span><code>/demo/translate</code><b>200</b><small>87 ms · sample</small></div><div className="demo-event-row"><span className="method-pill">GET</span><code>/demo/search</code><b>200</b><small>31 ms · sample</small></div></div></article><article className="monitor-panel uptime-panel"><span className="eyebrow-small">DEMO NODE COUNT · NOT UPTIME</span><div className="uptime-gauge"><div className="gauge-ring"><span>03<small>DEMO</small></span></div><div><b>Illustrative<br/>sample state</b><p>This ring is decorative demo data and makes no availability claim.</p><span className="sample-pill">NOT LIVE</span></div></div></article></div>
  </div>;
}
function LegalPage({ type }) {
  const isPrivacy = type === 'privacy';
  const sections = isPrivacy ? ['Browser preview', 'Sample content', 'Before publication'] : ['Draft notice', 'Demo interactions', 'Before publication'];
  return <div className="page-shell legal-page"><div className="legal-heading"><span className="eyebrow-small">ZYHUKA · DRAFT UI COPY</span><h1>{isPrivacy ? 'Privacy' : 'Terms'} <span>{isPrivacy ? 'draft.' : 'draft.'}</span></h1><p>Placeholder copy to demonstrate the policy-page layout in this frontend preview.</p><span className="last-updated">DRAFT · NOT LEGALLY EFFECTIVE</span></div>
    <div className="legal-draft-banner"><Icon name="spark" size={16}/><span><b>Draft only.</b> This text is not a legally effective policy, contract, or legal advice. Review and replace it before any public release.</span></div>
    <div className="legal-layout"><aside className="legal-index"><span>ON THIS PAGE</span>{sections.map((item, index) => <a key={item} href={`#section-${index + 1}`}>{String(index + 1).padStart(2, '0')} <i/>{item}</a>)}<div className="legal-index-note"><Icon name="code" size={16}/><span>UI preview.<br/><b>No live service.</b></span></div></aside>
      {isPrivacy ? <article className="legal-content">
        <section id="section-1"><span className="legal-number">01 / PREVIEW STATE</span><h2>Browser preview</h2><p>Placeholder: describe the information this product collects and why. In this demo, the theme preference is kept in browser local storage; search and form values are held in page memory.</p><p>Playground actions create sample responses locally. This preview does not send those values over the network.</p></section>
        <section id="section-2"><span className="legal-number">02 / SAMPLE CONTENT</span><h2>Sample content</h2><p>The endpoint catalog, monitor metrics, and example events are static demo data. They do not represent a live API, a real request, or an operational service.</p></section>
        <section id="section-3"><span className="legal-number">03 / REVIEW BEFORE RELEASE</span><h2>Before publication</h2><p>Replace this placeholder with a reviewed privacy notice that matches the final hosting, analytics, backend, and data-retention setup. Until then, this draft is not legally effective and should not be treated as a privacy guarantee.</p></section>
      </article> : <article className="legal-content">
        <section id="section-1"><span className="legal-number">01 / DRAFT NOTICE</span><h2>Draft notice</h2><p>This page is placeholder UI copy for a frontend demo. It does not create a contract, describe a live service, or set legally effective terms.</p></section>
        <section id="section-2"><span className="legal-number">02 / DEMO INTERACTIONS</span><h2>Demo interactions</h2><p>The Playground filters a local sample catalog and generates a mock response in the browser. No API request is made. Monitor charts and values are illustrative sample data only.</p><ul><li>Do not treat the catalog as live API documentation.</li><li>Do not treat sample metrics, status, or durations as operational measurements.</li><li>Do not rely on this preview for production decisions.</li></ul></section>
        <section id="section-3"><span className="legal-number">03 / REVIEW BEFORE RELEASE</span><h2>Before publication</h2><p>Replace this placeholder with terms reviewed for the final product, integrations, and jurisdiction. Until reviewed and adopted, this draft is not legally effective and is not legal advice.</p></section>
      </article>}
    </div>
  </div>;
}
export default function App() {
  const [path, setPath] = useState(window.location.pathname.replace(/\/$/, '') || '/');
  const [theme, setTheme] = useState(() => localStorage.getItem('zyhuka-theme') || 'dark');
  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname.replace(/\/$/, '') || '/');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('zyhuka-theme', theme);
  }, [theme]);
  useEffect(() => {
    const titles = { '/': 'Zyhuka — UI Demo', '/playground': 'Playground Demo — Zyhuka', '/monitor': 'Monitor Sample — Zyhuka', '/terms': 'Terms Draft — Zyhuka', '/privacy': 'Privacy Draft — Zyhuka' };
    document.title = titles[path] || titles['/'];
  }, [path]);
  const navigate = (to) => {
    if (to === path) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };
  let page;
  if (path === '/playground') page = <PlaygroundPage/>;
  else if (path === '/monitor') page = <MonitorPage/>;
  else if (path === '/terms') page = <LegalPage type="terms"/>;
  else if (path === '/privacy') page = <LegalPage type="privacy"/>;
  else page = <HomePage navigate={navigate}/>;
  return <><Header path={path} navigate={navigate} theme={theme} setTheme={setTheme}/><main key={path}>{page}</main><Footer navigate={navigate}/></>;
}
