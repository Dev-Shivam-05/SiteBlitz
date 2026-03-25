import { useEffect, useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("cookieConsent")) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-gray-800 text-white px-4 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm">
        <p>We use cookies to improve your experience.</p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              localStorage.setItem("cookieConsent", "accepted");
              setVisible(false);
            }}
            className="px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold"
          >
            Accept
          </button>
          <button
            onClick={() => {
              localStorage.setItem("cookieConsent", "declined");
              setVisible(false);
            }}
            className="px-4 py-2 border border-white/50 rounded-lg"
          >
            Decline
          </button>
          <a href="/privacy" className="px-4 py-2 border border-white/50 rounded-lg">Learn More</a>
        </div>
      </div>
    </div>
  );
}
