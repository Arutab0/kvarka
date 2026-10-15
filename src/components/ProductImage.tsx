"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ProductImageProps = {
  src: string;
  alt: string;
  /** Размеры и форма блока, например "aspect-[4/3]" */
  className?: string;
  sizes?: string;
};

/**
 * Показывает картинку из /public. Если файла ещё нет,
 * вместо битой картинки выводится спокойная заглушка.
 */
export function ProductImage({
  src,
  alt,
  className = "aspect-[4/3]",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Ошибка могла произойти до гидрации — проверяем вручную
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) {
      setFailed(true);
    }
  }, []);

  return (
    <div className={`relative overflow-hidden bg-coffee/10 ${className}`}>
      {failed ? (
        <div
          className="absolute inset-0 grid place-items-center text-coffee/30"
          role="img"
          aria-label={alt}
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
            <ellipse
              cx="28"
              cy="28"
              rx="14"
              ry="20"
              transform="rotate(35 28 28)"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path
              d="M19 14c6 6 4 12 10 16s4 10 8 12"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ) : (
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
