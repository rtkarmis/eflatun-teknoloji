"use client";

import React, { useState } from "react";
import ActionButton from "@/components/ui/ActionButton";
import { COLORS } from "@/lib/constants";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <label className="block">
        <span className="text-sm font-medium">İsim</span>
        <input name="name" value={form.name} onChange={onChange} className="mt-1 block w-full border rounded px-3 py-2" required />
      </label>
      <label className="block">
        <span className="text-sm font-medium">E-posta</span>
        <input name="email" type="email" value={form.email} onChange={onChange} className="mt-1 block w-full border rounded px-3 py-2" required />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Telefon</span>
        <input name="phone" value={form.phone} onChange={onChange} className="mt-1 block w-full border rounded px-3 py-2" />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Mesaj</span>
        <textarea name="message" value={form.message} onChange={onChange} rows={5} className="mt-1 block w-full border rounded px-3 py-2" required />
      </label>

      <div className="flex items-center gap-3">
        <ActionButton href="#" title={status === "sending" ? "Gönderiliyor..." : "Gönder"} color="#fff" bgColor={COLORS.primary} className="px-4 py-2" />
        {status === "success" && <span className="text-green-600">Mesajınız gönderildi. Teşekkürler!</span>}
        {status === "error" && <span className="text-red-600">Gönderme hatası. Lütfen tekrar deneyin.</span>}
      </div>
    </form>
  );
}
