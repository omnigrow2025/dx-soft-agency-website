import { createContext, useContext, useEffect, useMemo, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Language {
  code: string;
  name: string;
  native_name: string | null;
  is_default: boolean;
  is_active: boolean;
  sort_order: number;
}

interface I18nContextValue {
  locale: string;
  setLocale: (code: string) => void;
  languages: Language[];
  t: (key: string, fallback?: string) => string;
  tc: (entityType: string, entityId: string | number, field: string, fallback?: string | null) => string;
  reload: () => Promise<void>;
  loading: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "app_locale";

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<string>(() => localStorage.getItem(STORAGE_KEY) || "hy");
  const [languages, setLanguages] = useState<Language[]>([]);
  const [uiMap, setUiMap] = useState<Record<string, string>>({});
  const [contentMap, setContentMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const setLocale = (code: string) => {
    setLocaleState(code);
    localStorage.setItem(STORAGE_KEY, code);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: langs }, { data: ui }, { data: content }] = await Promise.all([
      supabase.from("languages").select("*").eq("is_active", true).order("sort_order"),
      supabase.from("ui_translations").select("key,value").eq("locale", locale),
      supabase.from("content_translations").select("entity_type,entity_id,field,value").eq("locale", locale),
    ]);
    setLanguages((langs ?? []) as Language[]);
    const ui_: Record<string, string> = {};
    (ui ?? []).forEach((r: { key: string; value: string }) => { ui_[r.key] = r.value; });
    setUiMap(ui_);
    const c_: Record<string, string> = {};
    (content ?? []).forEach((r: { entity_type: string; entity_id: string; field: string; value: string }) => {
      c_[`${r.entity_type}:${r.entity_id}:${r.field}`] = r.value;
    });
    setContentMap(c_);
    setLoading(false);
  }, [locale]);

  useEffect(() => { load(); }, [load]);

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale,
    languages,
    loading,
    reload: load,
    t: (key, fallback) => uiMap[key] ?? fallback ?? key,
    tc: (entityType, entityId, field, fallback) =>
      contentMap[`${entityType}:${entityId}:${field}`] ?? (fallback ?? "") as string,
  }), [locale, languages, uiMap, contentMap, loading, load]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
};
