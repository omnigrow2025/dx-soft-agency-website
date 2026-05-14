import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, RotateCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DESIGN_SYNC_SECTIONS } from "@/config/design-sync";

const IFRAME_LOAD_TIMEOUT_MS = 4000;

const AdminDesignSync = () => {
  const [activeId, setActiveId] = useState(DESIGN_SYNC_SECTIONS[0]?.id);
  const [iframeBlocked, setIframe