import React from "react";

export default function EmptyState({ title = "No data", description }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}
