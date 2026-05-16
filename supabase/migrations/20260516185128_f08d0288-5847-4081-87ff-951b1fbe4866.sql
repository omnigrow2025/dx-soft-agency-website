
-- Languages
CREATE TABLE public.languages (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  native_name TEXT,
  is_default BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Languages viewable by everyone" ON public.languages FOR SELECT USING (true);
CREATE POLICY "Admins manage languages" ON public.languages FOR ALL USING (has_role(auth.uid(),'admin'));

-- UI translations
CREATE TABLE public.ui_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL,
  locale TEXT NOT NULL REFERENCES public.languages(code) ON DELETE CASCADE,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(key, locale)
);
CREATE INDEX ui_translations_locale_idx ON public.ui_translations(locale);
ALTER TABLE public.ui_translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "UI translations viewable by everyone" ON public.ui_translations FOR SELECT USING (true);
CREATE POLICY "Admins manage ui translations" ON public.ui_translations FOR ALL USING (has_role(auth.uid(),'admin'));
CREATE TRIGGER ui_translations_updated_at BEFORE UPDATE ON public.ui_translations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Content translations
CREATE TABLE public.content_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  field TEXT NOT NULL,
  locale TEXT NOT NULL REFERENCES public.languages(code) ON DELETE CASCADE,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(entity_type, entity_id, field, locale)
);
CREATE INDEX content_translations_lookup_idx ON public.content_translations(entity_type, entity_id, locale);
ALTER TABLE public.content_translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Content translations viewable by everyone" ON public.content_translations FOR SELECT USING (true);
CREATE POLICY "Admins manage content translations" ON public.content_translations FOR ALL USING (has_role(auth.uid(),'admin'));
CREATE TRIGGER content_translations_updated_at BEFORE UPDATE ON public.content_translations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed languages
INSERT INTO public.languages (code, name, native_name, is_default, sort_order) VALUES
  ('hy','Armenian','Հայերեն', true, 1),
  ('ru','Russian','Русский', false, 2),
  ('en','English','English', false, 3),
  ('de','German','Deutsch', false, 4),
  ('fr','French','Français', false, 5);
