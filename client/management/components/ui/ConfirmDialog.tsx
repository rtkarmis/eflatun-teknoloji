import React from "react";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, title = "Onay", description = "Bu işlemi yapmak istediğinize emin misiniz?", onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.25)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.12)", padding: 32, minWidth: 320, maxWidth: "90vw", textAlign: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>{title}</div>
        <div style={{ fontSize: 16, marginBottom: 24 }}>{description}</div>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <Button variant="destructive" onClick={onConfirm}>Evet, Sil</Button>
          <Button variant="outline" onClick={onCancel}>Vazgeç</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
