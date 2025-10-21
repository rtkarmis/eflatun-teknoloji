"use client";

import { loadConsent, saveConsent } from "@/lib/consent-utils";
import { CookieConsentState } from "@/types/cookie-consent";
import { useState } from "react";

export default function CookieSettingsModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [consent, setConsent] = useState<CookieConsentState>(loadConsent());

  function handleSave() {
    saveConsent(consent);
    onClose();
    location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[10000] p-4">
      <div className="bg-white rounded-lg max-w-md w-full shadow-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Çerez Tercihleri</h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Zorunlu Çerezler</span>
            <input type="checkbox" checked disabled />
          </div>
          <div className="flex justify-between items-center">
            <span>Analitik Çerezler (Google Analytics)</span>
            <input
              type="checkbox"
              checked={consent.analytics}
              onChange={(e) =>
                setConsent({ ...consent, analytics: e.target.checked })
              }
            />
          </div>
          <div className="flex justify-between items-center">
            <span>Reklam Çerezleri (Google Ads / Facebook Pixel)</span>
            <input
              type="checkbox"
              checked={consent.ads}
              onChange={(e) =>
                setConsent({ ...consent, ads: e.target.checked })
              }
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm"
          >
            Vazgeç
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
          >
            Kaydet ve Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
