import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, RotateCw, AlertTriangle, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DESIGN_SYNC_SECTIONS } from "@/config/design-sync";

const IFRAME_LOAD_TIMEOUT_MS = 4500;

const AdminDesignSync = () => {
  const sections = DESIGN_SYNC_SECTIONS;
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const loadedRef = useRef(false);

  const active = useMemo(
    () => sections.find((s) => s.id === activeId) ?? sections[0],
    [activeId, sections]
  );

  useEffect(() => {
    loadedRef.current = false;
    setIframeBlocked(false);
    const t = window.setTimeout(() => {
      if (!loadedRef.current) setIframeBlocked(true);
    }, IFRAME_LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, [active?.id, iframeKey]);

  if (!active) {
    return (
      <div className="p-8 text-sm text-muted-foreground">
        No sections configured. Edit <code>src/config/design-sync.ts</code>.
      </div>
    );
  }

  const Component = active.Component;
  const reload = () => setIframeKey((k) => k + 1);

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur px-4 md:px-6 py-3 flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-base font-semibold leading-tight">Design Sync</h1>
          <p className="text-xs text-muted-foreground">Reference vs your section, side by side</p>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Select value={active.id} onValueChange={setActiveId}>
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sections.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={reload}>
            <RotateCw className="h-4 w-4 mr-1.5" /> Reload
          </Button>

          <Button variant="outline" size="sm" asChild>
            <a href={active.refUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4 mr-1.5" /> Open live
            </a>
          </Button>
        </div>
      </div>

      {active.notes && (
        <div className="px-4 md:px-6 py-2 text-xs text-muted-foreground border-b border-border bg-muted/30">
          <span className="font-medium text-foreground">Notes:</span> {active.notes}
        </div>
      )}

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-0">
        {/* LEFT — reference */}
        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-border min-h-0">
          <div className="px-4 py-2 border-b border-border bg-muted/40 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Reference — omnidx.academy
            </span>
            {iframeBlocked && (
              <span className="text-[10px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> iframe blocked — showing fallback
              </span>
            )}
          </div>
          <div className="flex-1 overflow-auto bg-muted/20">
            {!iframeBlocked ? (
              <iframe
                key={`${active.id}-${iframeKey}`}
                src={active.refUrl}
                title={`Reference: ${active.label}`}
                className="w-full h-full min-h-[600px] border-0 bg-white"
                onLoad={() => {
                  loadedRef.current = true;
                }}
                onError={() => setIframeBlocked(true)}
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            ) : active.fallbackImage ? (
              <img
                src={active.fallbackImage}
                alt={`${active.label} reference`}
                className="w-full h-auto"
                onError={(e) => {
                  (e.currentTarget.parentElement as HTMLElement).innerHTML =
                    '<div class="p-8 text-center text-sm text-muted-foreground">Fallback screenshot missing. Drop one at <code>public' +
                    active.fallbackImage +
                    '</code></div>';
                }}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-sm text-muted-foreground gap-2 p-8 text-center">
                <ImageIcon className="h-8 w-8" />
                <p>
                  No fallback image configured. Add one to{" "}
                  <code>src/config/design-sync.ts</code>.
                </p>
                <Button size="sm" variant="outline" asChild>
                  <a href={active.refUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" /> Open reference
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — your section */}
        <div className="flex flex-col min-h-0">
          <div className="px-4 py-2 border-b border-border bg-muted/40">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Yours — &lt;{Component.displayName || Component.name || active.id}/&gt;
            </span>
          </div>
          <div className="flex-1 overflow-auto bg-background">
            <Component />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDesignSync;
