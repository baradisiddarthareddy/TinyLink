import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/apiClient";
import Loading from "../components/Loading";

export default function Stats() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const base = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await api.getLink(code);
        setLink(data);
      } catch (err) {
        setError(err.payload?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [code]);

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="card">
        <h2>Error Loading Stats</h2>
        <div className="error">{error}</div>
        <Link to="/" className="btn">
          Go Back
        </Link>
      </div>
    );

  return (
    <div className="card stats-card">
      <h2 style={{ marginBottom: "6px" }}>
        Analytics for <span className="mono">{link.code}</span>
      </h2>
      <p className="muted" style={{ marginTop: 0 }}>
        Detailed link performance and engagement metrics.
      </p>

      <div className="stats-grid">
        <div className="stat">
          <div className="label">Short URL</div>
          <div className="value">
            <a href={`${base}/${link.code}`} target="_blank" rel="noreferrer">
              {`${base}/${link.code}`}
            </a>
          </div>
        </div>

        <div className="stat">
          <div className="label">Destination</div>
          <div className="value">
            <a href={link.long_url} target="_blank" rel="noreferrer">
              {link.long_url}
            </a>
          </div>
        </div>

        <div className="stat">
          <div className="label">Total Clicks</div>
          <div className="value">{link.clicks}</div>
        </div>

        <div className="stat">
          <div className="label">Last Clicked</div>
          <div className="value">
            {link.last_clicked
              ? new Date(link.last_clicked).toLocaleString()
              : "Never"}
          </div>
        </div>

        <div className="stat">
          <div className="label">Created On</div>
          <div className="value">
            {new Date(link.created_at).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="actions-row" style={{ marginTop: "18px" }}>
        <Link to="/" className="btn">
          Back
        </Link>
        <a
          className="btn ghost"
          href={`${base}/${link.code}`}
          target="_blank"
          rel="noreferrer"
        >
          Open Short Link
        </a>
      </div>
    </div>
  );
}
