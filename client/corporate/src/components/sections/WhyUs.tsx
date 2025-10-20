"use client";
import { COLORS } from "@/lib/constants";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function WhyUs() {
  const reasons = [
    "Yerel servis: Bolu ve ilçelerinde aynı gün hizmet",
    "Orijinal filtre garantisi",
    "Deneyimli teknik ekip",
    "Hızlı çözüm ve satış sonrası destek",
  ];

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        id="neden-biz"
        className="py-12 md:py-16 bg-white w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-6xl mx-auto text-center px-4 md:px-6">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 text-balance"
            style={{ color: COLORS.primary }}
          >
            Neden Eflatun Teknoloji?
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
            {reasons.map((r, i) => (
              <m.li
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-[#F9FAFB] border border-gray-100 shadow-sm hover:shadow-md transition-transform duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <FaCheckCircle
                  className="mt-1 shrink-0 text-[color:var(--color-primary)]"
                  size={20}
                  color={COLORS.primary}
                  aria-hidden="true"
                />
                <span className="text-gray-800 text-base leading-relaxed text-left">
                  {r}
                </span>
              </m.li>
            ))}
          </ul>
        </div>
      </m.section>
    </LazyMotion>
  );
}
