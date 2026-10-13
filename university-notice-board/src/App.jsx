import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:3001/notices";
const categories = ["All", "Examinations", "Events", "Campus", "Scholarships", "Sports"];

function formatDate(dateString) {
  if (!dateString) return "Date not set";
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  });
}

export default function App() {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchNotices() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("The notice server returned an error.");
      const data = await response.json();
      setNotices(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch {
      setError("Could not connect to JSON Server. Please check that the backend is running on port 3001.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchNotices(); }, []);

  const filteredNotices = useMemo(() => {
    const term = search.trim().toLowerCase();
    return notices.filter((notice) => {
      const matchesCategory = category === "All" || notice.category === category;
      const matchesSearch = !term || [notice.title, notice.description, notice.department, notice.category]
        .some((value) => String(value || "").toLowerCase().includes(term));
      return matchesCategory && matchesSearch;
    });
  }, [notices, search, category]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true">U</div>
        <div className="brand-copy">
          <span className="eyebrow">CAMPUS CONNECT</span>
          <strong>University Notice Board</strong>
        </div>
        <span className="live-pill"><span /> Live notices</span>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="hero-label">STAY INFORMED</p>
            <h1>One campus.<br /><span>Every update.</span></h1>
            <p className="hero-description">The latest announcements, academic updates, events, and opportunities from your university.</p>
            <div className="hero-stats">
              <div><strong>{notices.length}</strong><span>Published notices</span></div>
              <div className="stat-divider" />
              <div><strong>{categories.length - 1}</strong><span>Notice categories</span></div>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-circle circle-one" />
            <div className="art-circle circle-two" />
            <div className="notice-sheet">
              <div className="sheet-top"><span /><span /><span /></div>
              <div className="sheet-badge">NOTICE</div>
              <div className="sheet-line wide" /><div className="sheet-line" />
              <div className="sheet-block" /><div className="sheet-line wide" />
              <div className="sheet-line short" />
              <div className="sheet-stamp">U</div>
            </div>
            <div className="floating-dot dot-one" /><div className="floating-dot dot-two" />
          </div>
        </section>

        <section className="notice-section">
          <div className="section-heading">
            <div>
              <p className="section-kicker">THE LATEST</p>
              <h2>Campus announcements</h2>
              <p className="section-subtitle">Browse notices published by university departments.</p>
            </div>
            <button className="refresh-button" onClick={fetchNotices} disabled={loading}>
              <span className={loading ? "refresh-icon spinning" : "refresh-icon"}>↻</span> Refresh
            </button>
          </div>

          <div className="filters">
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notices, departments..." />
              {search && <button className="clear-search" onClick={() => setSearch("")} aria-label="Clear search">×</button>}
            </label>
            <div className="category-list" aria-label="Filter by category">
              {categories.map((item) => (
                <button key={item} className={`category-chip ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          {error && <div className="error-panel"><strong>Connection problem</strong><p>{error}</p><button onClick={fetchNotices}>Try again</button></div>}
          {loading && <div className="state-panel"><div className="loader" /><p>Loading notices from the server...</p></div>}
          {!loading && !error && filteredNotices.length === 0 && (
            <div className="state-panel empty-state"><span>⌕</span><h3>No notices found</h3><p>Try another search term or category.</p><button onClick={() => { setSearch(""); setCategory("All"); }}>Clear filters</button></div>
          )}
          {!loading && !error && filteredNotices.length > 0 && (
            <div className="notice-grid">
              {filteredNotices.map((notice) => (
                <article className="notice-card" key={notice.id}>
                  <div className="card-topline">
                    <span className={`category-label ${notice.category.toLowerCase()}`}>{notice.category}</span>
                    {notice.priority === "Important" && <span className="priority-label">Important</span>}
                  </div>
                  <h3>{notice.title}</h3>
                  <p className="notice-description">{notice.description}</p>
                  <div className="card-footer">
                    <div className="department-icon">{(notice.department || "U").slice(0, 1)}</div>
                    <div className="department-details"><strong>{notice.department || "University Office"}</strong><span>{formatDate(notice.date)}</span></div>
                    <span className="card-arrow" aria-hidden="true">↗</span>
                  </div>
                </article>
              ))}
            </div>
          )}
          <p className="results-note">Showing {filteredNotices.length} of {notices.length} notices</p>
        </section>
      </main>

      <footer><div className="footer-brand">U <strong>University Notice Board</strong></div><span>Made for a more connected campus.</span></footer>
    </div>
  );
}