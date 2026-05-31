import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "cookie-consent";

export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-50 glass-card rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <Cookie size={20} className="text-primary mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-foreground font-medium mb-1">Cookie Notice</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We use cookies to enhance your experience. By continuing to visit this site you
                agree to our use of cookies.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Button
                  size="sm"
                  onClick={accept}
                  className="bg-primary text-primary-foreground text-xs h-8 px-4"
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShow(false)}
                  className="text-xs h-8 px-3 text-muted-foreground"
                >
                  Dismiss
                </Button>
              </div>
            </div>
            <button
              onClick={() => setShow(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close cookie notice"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
