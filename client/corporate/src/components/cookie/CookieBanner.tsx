"use client";

import { defaultConsent, saveConsent } from "@/lib/consent-utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import CookieSettingsModal from "./CookieSettingsModal";
import { COLORS } from "@/lib/constants";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function handleAcceptAll() {
    saveConsent({ ...defaultConsent, analytics: true, ads: true });
    setVisible(false);
    location.reload();
  }

  return (
    <>
      {visible && (
        <div
          className="fixed bottom-0 left-0 right-0 p-4 flex flex-col md:flex-row items-center justify-between z-[9999] shadow-lg"
          style={{
            background: "rgba(46,50,59,0.9)",
            color: "#fff",
            borderTop: `3px solid ${COLORS.primary}`,
          }}
        >
          <p className="text-sm mb-3 md:mb-0 md:mr-4 text-center md:text-left">
            Web sitemizde size en iyi deneyimi sunmak için çerezler
            kullanıyoruz.{" "}
            <Link
              href="/cerez-politikasi"
              className="text-[color:var(--color-secondary)] underline hover:text-white ml-1"
              target="_blank"
            >
              Çerez Politikası
            </Link>
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setShowSettings(true)}
              style={{
                backgroundColor: "#fff",
                color: COLORS.primary,
                border: `1px solid ${COLORS.primary}`,
              }}
              className="hover:brightness-95 px-4 py-2 rounded-md text-sm transition font-medium"
            >
              Çerezleri Yönet
            </button>
            <button
              onClick={handleAcceptAll}
              style={{ backgroundColor: COLORS.primary, color: "#fff" }}
              className="hover:brightness-90 px-4 py-2 rounded-md text-sm transition font-medium"
            >
              Tümünü Kabul Et
            </button>
          </div>
        </div>
      )}

      {showSettings && (
        <CookieSettingsModal onClose={() => setShowSettings(false)} />
      )}
    </>
  );
}
