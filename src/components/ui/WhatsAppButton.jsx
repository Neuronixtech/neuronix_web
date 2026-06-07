import { CONTACT_INFO } from "@/constants";
import { onImgError } from "@/lib/utils";

export function WhatsAppButton() {
  const url = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
    "Hi, I'm interested in your services",
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-24 z-50 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-all duration-300"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
        alt="WhatsApp"
        onError={onImgError}
        className="w-6 h-6"
      />
    </a>
  );
}
