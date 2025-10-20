"use client";

import { defaultConsent, saveConsent } from "@/lib/consent-utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import CookieSettingsModal from "./CookieSettingsModal";

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
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex flex-col md:flex-row items-center justify-between z-[9999]">
          <p className="text-sm mb-3 md:mb-0 md:mr-4 text-center md:text-left">
            Web sitemizde size en iyi deneyimi sunmak için çerezler
            kullanıyoruz.{" "}
            <Link
              href="/cerez-politikasi"
              className="text-blue-400 underline hover:text-blue-300 ml-1"
              target="_blank"
            >
              Çerez Politikası
            </Link>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setShowSettings(true)}
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm"
            >
              Çerezleri Yönet
            </button>
            <button
              onClick={handleAcceptAll}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
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
