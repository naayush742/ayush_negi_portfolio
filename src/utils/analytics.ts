/**
 * Google Analytics 4 (GA4) Telemetry Engine
 * Provides dynamic gtag.js injection, SPA page/section view tracking, and custom event dispatching.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-RC9XCB22MZ').trim();

/**
 * Dynamically loads and initializes Google Analytics 4 (gtag.js) if not already in index.html.
 */
export const initGA = (measurementId: string = GA_MEASUREMENT_ID): void => {
  if (typeof window === 'undefined') return;

  // Detect if gtag script is already present in document or window
  const alreadyPresent =
    Boolean(document.getElementById('ga-gtag-script')) ||
    Boolean(document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) ||
    typeof window.gtag === 'function';

  if (alreadyPresent) {
    if (import.meta.env.DEV) {
      console.info(`[Analytics] Google Analytics detected from page head (ID: ${measurementId})`);
    }
    return;
  }

  if (!measurementId) {
    if (import.meta.env.DEV) {
      console.info(
        '[Analytics] No VITE_GA_MEASUREMENT_ID configured in .env. Google Analytics is dormant.'
      );
    }
    return;
  }

  const scriptId = 'ga-gtag-script';

  // Initialize dataLayer and window.gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', measurementId, {
    send_page_view: true,
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.hash,
  });

  // Dynamically inject the gtag.js script
  const script = document.createElement('script');
  script.id = scriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  if (import.meta.env.DEV) {
    console.info(`[Analytics] Google Analytics 4 activated with ID: ${measurementId}`);
  }
};

/**
 * Tracks a page view or virtual navigation path in Google Analytics.
 */
export const trackPageView = (path: string, title?: string): void => {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  }
};

/**
 * Custom event tracking helper with type-safe parameter object.
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean | undefined | null>
): void => {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

/**
 * Tracks resume download actions.
 */
export const trackResumeDownload = (fileName = 'Ayush Negi Resume.pdf'): void => {
  trackEvent('file_download', {
    file_name: fileName,
    file_extension: 'pdf',
    link_text: 'DOWNLOAD RESUME',
  });
};

/**
 * Tracks resume viewing (in-modal or new tab).
 */
export const trackResumeView = (mode: 'modal' | 'new_tab' = 'modal'): void => {
  trackEvent('resume_view', {
    view_mode: mode,
  });
};

/**
 * Tracks successful contact form submissions (conversions).
 */
export const trackContactSubmit = (service?: string): void => {
  trackEvent('generate_lead', {
    event_category: 'Contact',
    service: service || 'General Inquiry',
    status: 'success',
  });
};

/**
 * Tracks project interactions.
 */
export const trackProjectInteraction = (
  projectName: string,
  action: 'view_modal' | 'launch_live' | 'github_repo',
  destinationUrl?: string
): void => {
  trackEvent('project_interaction', {
    project_name: projectName,
    interaction_type: action,
    destination: destinationUrl,
  });
};

/**
 * Tracks portfolio section navigation.
 */
export const trackSectionView = (sectionKey: string): void => {
  trackEvent('section_view', {
    section_name: sectionKey,
  });
};
