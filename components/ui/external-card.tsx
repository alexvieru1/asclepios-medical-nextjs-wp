import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ExternalCardProps = {
  title: string;
  href: string;
  imgSrc: string;
  alt: string;
  fit?: "contain" | "cover"; // <-- new prop
};

export function ExternalCard({
  title,
  href,
  imgSrc,
  alt,
  fit = "contain",
}: ExternalCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl border border-emerald-100 bg-white/90 shadow-md shadow-emerald-100/30 transition hover:shadow-lg hover:shadow-emerald-100/50"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-white">
        <Image
          src={imgSrc}
          alt={alt}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className={cn(
            "transition duration-300",
            fit === "cover"
              ? "object-cover group-hover:scale-[1.02]"
              : "object-contain p-4" // padding so logos aren’t flush
          )}
        />
      </div>
      <div className="flex items-center justify-between p-4">
        <div>
          <h3 className="text-emerald-900 font-semibold">{title}</h3>
          <p className="text-sm text-emerald-900/60">
            Se deschide într-o filă nouă
          </p>
        </div>
        <ExternalLink className="h-5 w-5 text-emerald-700" />
      </div>
    </a>
  );
}
