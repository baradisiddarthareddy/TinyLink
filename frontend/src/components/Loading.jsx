import React from "react";

export default function Loading({ size = 32 }) {
  return (
    <div className="loading" style={{ height: size }}>
      <div className="spinner" />
    </div>
  );
}
