import React from "react";

const SkeletonRow: React.FC = () => (
  <div style={{
    background: "#f3f4f6",
    borderRadius: 10,
    height: 56,
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    gap: 16,
    animation: "pulse 1.5s infinite"
  }}>
    <div style={{ width: 120, height: 16, background: "#e5e7eb", borderRadius: 4 }} />
    <div style={{ width: 180, height: 16, background: "#e5e7eb", borderRadius: 4 }} />
    <div style={{ width: 80, height: 16, background: "#e5e7eb", borderRadius: 4 }} />
    <div style={{ flex: 1 }} />
  </div>
);

export default SkeletonRow;
