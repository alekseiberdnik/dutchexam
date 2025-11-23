const GA_MEASUREMENT_ID = 'G-Y4884MKS1T';

export function loadGA() {
  if (!GA_MEASUREMENT_ID) return;
  if (window.gtagLoaded) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);

  window.gtagLoaded = true;
}
