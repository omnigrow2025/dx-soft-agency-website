import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { apiFetch, unwrap, type Course, type Teacher, type FaqItem } from "@/lib/api";

type EntityType = "course" | "teacher" | "faq";

const ENTITY_FIELDS: Record<EntityType, string[]> = {
  course: ["title", "description"],
  teacher: ["name", "bio", "description"],
  faq: ["question", "answer"],
};

const AdminContentTranslations = () => {
  const qc = useQueryClient();
  const [entityType, setEntityType] = useState<EntityType>("course");
  const [entityId, setEntityId] = useState<string>("");
  const [values, setValues] = useState<Record<string, Record<string, string>>>({}); // values[field][locale]

  const { data: languages = [] } = useQuery({
    queryKey: ["langs-active"],
    queryFn: async () => {
      const { data, error } = await supabase.from("languages").select("code,name,native_name").eq("is_active", true).order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const { data: courses } = useQuery({
    queryKey: ["pub-courses"],
    queryFn: async () => unwrap<Course[]>(await apiFetch("/api/courses", { auth: false })),
  });
  const { data: teachers } = useQuery({
    queryKey: ["pub-teachers"],
    queryFn: async () => unwrap<Teacher[]>(await apiFetch("/api/teachers", { auth: false })),
  });
  const { data: faqs } = useQuery({
    queryKey: ["pub-faqs"],
    queryFn: async () => unwrap<FaqItem[]>(await apiFetch("/api/faq", { auth: false })),
  });

  const entities = useMemo(() => {
    if (entityType === "course") return (courses ?? []).map((c) => ({ id: String(c.id), label: c.title }));
    if (entityType === "teacher") return (teachers ?? []).map((t) => ({ id: String(t.id), label: `${t.name} ${t.lastName ?? ""}` }));
    return (faqs ?? []).map((f) => ({ id: String(f.id), label: f.question }));
  }, [entityType, courses, teachers, faqs]);

  const fields = ENTITY_FIELDS[entityType];

  const { data: existing } = useQuery({
    queryKey: ["content-translations", entityType, entityId],
    enabled: !!entityId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_translations")
        .select("field,locale,value")
        .eq("entity_type", entityType)
        .eq("entity_id", entityId);
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    const v: Record<string, Record<string, string>> = {};
    fields.forEach((f) => { v[f] = {}; });
    (existing ?? []).forEach((r) => {
      if (!v[r.field]) v[r.field] = {};
      v[r.field][r.locale] = r.value;
    });
    setValues(v);
  }, [existing, entityType, entityId]); // eslint-disable-line

  const save = useMutation({
    mutationFn: async () => {
      const rows: { entity_type: string; entity_id: string; field: string; locale: string; value: string }[] = [];
      Object.entries(values).forEach(([field, byLocale]) => {
        Object.entries(byLocale).forEach(([locale, value]) => {
          rows.push({ entity_type: entityType, entity_id: entityId, field, locale, value: value ?? "" });
        });
      });
      if (!rows.length) return;
      const { error } = await supabase.from("content_translations").upsert(rows, { onConflict: "entity_type,entity_id,field,locale" });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["content-translations"] }); toast.success("Saved"); },
    onError: (e: Error) => toast.error(e.message),
  });

  const setCell = (field: string, locale: string, value: string) => {
    setValues((p) => ({ ...p, [field]: { ...(p[field] || {}), [locale]: value } }));
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Content Translations</h1>

      <Card>
        <CardContent className="p-6 grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Entity type</Label>
            <Select value={entityType} onValueChange={(v) => { setEntityType(v as EntityType); setEntityId(""); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="course">Course</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="faq">FAQ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Item</Label>
            <Select value={entityId} onValueChange={setEntityId}>
              <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
              <SelectContent>
                {entities.map((e) => (
                  <SelectItem key={e.id} value={e.id}>{e.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {entityId && (
        <Card>
          <CardContent className="p-6 space-y-6">
            <Tabs defaultValue={fields[0]}>
              <TabsList>
                {fields.map((f) => <TabsTrigger key={f} value={f}>{f}</TabsTrigger>)}
              </TabsList>
              {fields.map((f) => (
                <TabsContent key={f} value={f} className="space-y-4 mt-4">
                  {languages.map((l) => (
                    <div key={l.code} className="space-y-1.5">
                      <Label className="uppercase text-xs text-muted-foreground">{l.code} — {l.native_name ?? l.name}</Label>
                      {f === "description" || f === "bio" || f === "answer" ? (
                        <Textarea rows={4} value={values[f]?.[l.code] ?? ""} onChange={(e) => setCell(f, l.code, e.target.value)} />
                      ) : (
                        <Input value={values[f]?.[l.code] ?? ""} onChange={(e) => setCell(f, l.code, e.target.value)} />
                      )}
                    </div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
            <Button onClick={() => save.mutate()} disabled={save.isPending}>{save.isPending ? "Saving…" : "Save translations"}</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminContentTranslations;
