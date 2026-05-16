import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export function NotFoundPage() {
  useDocumentMeta("Page Not Found");
  const location = useLocation();
  const pageName = location.pathname.substring(1) || "this page";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-8xl font-bold font-heading text-primary text-glow">404</h1>
          <div className="h-px w-16 bg-primary/30 mx-auto" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold font-heading text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            The page{" "}
            <span className="font-medium text-foreground">"{pageName}"</span> could not be
            found. It may have been moved or deleted.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl glow-red-sm hover:scale-105 transition-transform duration-200 text-sm"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
