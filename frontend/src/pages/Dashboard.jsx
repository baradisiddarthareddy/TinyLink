import React, { useEffect, useState } from "react";
import { api } from "../api/apiClient";
import LinkForm from "../components/LinkForm";
import LinkTable from "../components/LinkTable";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLinks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAllLinks();
      setLinks(data);
    } catch (err) {
      setError(err.payload?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleCreate = (res) => {
    fetchLinks();
    // Replace alert with a toast for cleaner UI
    const evt = new CustomEvent("show-toast", {
      detail: { message: `Short link created: ${res.shortUrl}` },
    });
    window.dispatchEvent(evt);
  };

  const handleDelete = (code) => {
    setLinks((prev) => prev.filter((p) => p.code !== code));
  };

  return (
    <div className="page dashboard">
      <div className="card">
        <h2 className="card-title">Create a Short Link</h2>
        <p className="muted" style={{ marginBottom: "12px" }}>
          Shorten long URLs into easy-to-share links.
        </p>
        <LinkForm onCreate={handleCreate} />
      </div>

      <div className="card">
        <h2 className="card-title">Your Links</h2>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="error">{error}</div>
        ) : links.length === 0 ? (
          <EmptyState
            title="No links yet"
            description="Shorten your first URL using the form above."
          />
        ) : (
          <LinkTable
            links={links}
            onDelete={handleDelete}
            onRefresh={fetchLinks}
          />
        )}
      </div>
    </div>
  );
}
