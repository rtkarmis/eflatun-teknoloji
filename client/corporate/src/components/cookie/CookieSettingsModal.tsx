"use client";

import { loadConsent, saveConsent } from "@/lib/consent-utils";
import { CookieConsentState } from "@/types/cookie-consent";
import { useState } from "react";
import { COLORS } from "@/lib/constants";
import Link from "next/link";

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[10000] p-1 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[98vh] sm:max-h-[90vh] overflow-hidden border border-gray-200">
        {/* Header */}
        <div
          className="px-4 sm:px-8 py-4 border-b flex justify-between items-center"
          style={{ borderColor: COLORS.primary }}
        >
          <h2
            className="text-xl font-semibold"
            style={{ color: COLORS.primary }}
          >
            Çerez Ayarlarını Değiştir
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            aria-label="Kapat"
          >
            ×
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-8 space-y-10">
          <section>
            <h3 className="font-semibold text-gray-900 text-lg">
              Çerez Ayarları
            </h3>
            <p className="text-sm mt-4 text-gray-600">
              İnternet sitemizin sorunsuz çalışması için gerekli çerezlerin ve
              performans çerezlerinin kapatılması mümkün değildir. Dilerseniz
              analitik, işlevsellik ve pazarlama çerezlerini tercihinize göre
              düzenleyebilirsiniz.
            </p>
          </section>

          {/* Zorunlu Çerezler */}
          <CookieSection
            title="Gerekli Çerezler"
            description="İnternet sitemizin doğru ve kesintisiz şekilde çalışmasını sağlar. 
            Örneğin, oturum bilgilerinizi sayfalar arasında korur."
            checked
            disabled
          />

          {/* Analitik Çerezler */}
          <CookieSection
            title="Analitik Çerezler"
            description="Sitemizin performansını ve kullanıcı etkileşimlerini anonim olarak analiz eder. 
            Bu sayede içerik kalitesini artırabiliriz."
            checked={consent.analytics}
            onChange={(checked) =>
              setConsent({ ...consent, analytics: checked })
            }
          />

          {/* Pazarlama Çerezleri */}
          <CookieSection
            title="Pazarlama Çerezleri"
            description="İlgi alanlarınıza uygun reklamlar sunar, kampanya performansını ölçer. 
            Bu çerezler Google Ads, Meta Pixel gibi platformlar tarafından kullanılabilir."
            checked={consent.ads}
            onChange={(checked) => setConsent({ ...consent, ads: checked })}
          />

          {/* Ek Bilgi */}
          <section>
            <h3 className="font-semibold text-gray-900 text-lg">
              Daha Fazlası
            </h3>
            <p className="text-sm mt-4 text-gray-600">
              Çerezler hakkında detaylı bilgi almak için{" "}
              <Link
                href="/cerez-politikasi"
                target="_blank"
                className="text-[color:var(--color-primary)] hover:underline font-medium"
              >
                Çerez Politikası
              </Link>{" "}
              sayfamızı ziyaret edebilirsiniz.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-8 py-4 bg-gray-50 border-t flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
          <button
            onClick={handleSave}
            style={{ backgroundColor: COLORS.primary, color: "#fff" }}
            className="px-4 py-2 rounded-md text-sm font-medium hover:brightness-90 transition"
          >
            Onayla ve Kapat
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔘 Tekil Çerez Bölümü */
function CookieSection({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <div className="border-b pb-6">
      <div className="flex flex-row justify-between items-center gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600 mt-2 max-w-md">{description}</p>
        </div>
        <div className="flex-shrink-0 ml-2">
          <ToggleButton
            checked={checked}
            disabled={disabled}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

/* 🎚️ Modern Toggle Button */
function ToggleButton({
  checked,
  disabled,
  onChange,
}: {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange?.(!checked)}
      disabled={disabled}
      aria-label="toggle"
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-200 ${
        checked ? "bg-[color:var(--color-primary)]" : "bg-gray-300"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      style={{ minWidth: 48, minHeight: 32 }}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-all duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.10)" }}
      />
    </button>
  );
}
