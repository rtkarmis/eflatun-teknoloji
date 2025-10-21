import React from "react";

export default function LoadingScreen() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#f7fafd"
    }}>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-6" />
      <span className="text-lg font-semibold text-gray-700">Yükleniyor...</span>
    </div>
  );
}
