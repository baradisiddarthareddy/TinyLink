import React, { useState } from "react";
import { api } from "../api/apiClient";

// --- Frontend URL validator ---
function isValidUrl(url) {
  try {
    const normalized =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : "https://" + url;

    const parsed = new URL(normalized);

    if (!parsed.hostname.includes(".")) return false;
    return true;
  } catch {
    return false;
  }
}

// --- Custom code validator ---
function isValidCustomCode(code) {
  return /^[A-Za-z0-9]{6,8}$/.test(code);
}

export default function LinkForm({ onCreate }) {
  const [longUrl, setLongUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const showToast = (message) => {
    const evt = new CustomEvent("show-toast", { detail: { message } });
    window.dispatchEvent(evt);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const urlTrimmed = longUrl.trim();
    const codeTrimmed = customCode.trim();

    // Validate URL
    if (!urlTrimmed) {
      setError("Please enter a URL.");
      return;
    }
    if (!isValidUrl(urlTrimmed)) {
      setError("Invalid URL. Use google.com or https://example.com");
      return;
    }

    // Validate custom code
    if (codeTrimmed && !isValidCustomCode(codeTrimmed)) {
      setError("Custom code must be 6–8 characters, letters/numbers only.");
      return;
    }

    setLoading(true);

    try {
      const payload = { longUrl: urlTrimmed };
      if (codeTrimmed) payload.customCode = codeTrimmed;

      const res = await api.createLink(payload);

      // Reset form
      setLongUrl("");
      setCustomCode("");

      showToast(`Short link created! (${res.code})`);
      onCreate && onCreate(res);
    } catch (err) {
      setError(err.payload?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="link-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="label">Enter Long URL</label>
        <input
          className="input"
          placeholder="https://example.com/page"
          disabled={loading}
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label className="label">Custom Code (Optional)</label>
        <input
          className="input"
          placeholder="6–8 characters (letters/numbers)"
          disabled={loading}
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
        />
      </div>

      {error && <div className="error">{error}</div>}

      <div className="form-actions">
        <button className="btn" disabled={loading}>
          {loading ? "Creating..." : "Create Short Link"}
        </button>
      </div>
    </form>
  );
}
