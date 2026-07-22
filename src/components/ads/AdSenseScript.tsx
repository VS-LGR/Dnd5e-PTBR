import Script from "next/script";
import { ADSENSE_CLIENT, adsEnabled } from "@/config/ads";

/** Carrega o script AdSense uma vez por página. */
export function AdSenseScript() {
  if (!adsEnabled()) return null;

  return (
    <Script
      id="adsense-loader"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
