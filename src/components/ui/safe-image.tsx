import { useState, useEffect, type ComponentPropsWithoutRef } from "react";

export type SafeImageProps = ComponentPropsWithoutRef<"img"> & {
  fallbackSrc: string;
};

export function SafeImage({ src, fallbackSrc, alt, ...props }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
