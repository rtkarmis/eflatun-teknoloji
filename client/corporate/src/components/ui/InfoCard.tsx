import { COLORS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

interface InfoCardProps {
  imageUrl: string;
  imageAlt?: string;
  title: string;
  titleColor?: string;
  description: string;
  ctaUrl: string;
  ctaColor?: string;
  ctaText?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  imageUrl,
  ctaUrl,
  titleColor,
  ctaColor,
  imageAlt,
  ctaText,
}) => {
  return (
    <Link href={ctaUrl}>
      <>
        <Image
          src={imageUrl}
          alt={imageAlt || `${title} - Eflatun Teknoloji`}
          width={400}
          height={192}
          className="w-full object-cover rounded-xl mb-4"
          loading="lazy"
        />
        <h2
          className="text-xl font-semibold mb-2 text-center"
          style={{ color: titleColor || COLORS.secondary }}
        >
          {title}
        </h2>
        <p
          className="text-gray-600 text-sm mb-4"
          dangerouslySetInnerHTML={{
            __html: description || "Su arıtma satışı, montaj ve servis",
          }}
        />
        <div
          className="text-sm font-medium hover:underline block text-center mx-auto"
          style={{ color: ctaColor || COLORS.primary }}
        >
          {ctaText || "Detaylı Bilgi →"}
        </div>
      </>
    </Link>
  );
};

export default InfoCard;
