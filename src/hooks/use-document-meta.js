import { useEffect } from "react";
import { SITE_META } from "@/constants";

export function useDocumentMeta(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_META.name}` : SITE_META.name;
  }, [title]);
}
