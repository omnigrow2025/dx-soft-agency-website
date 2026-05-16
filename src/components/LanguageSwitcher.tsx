import { Globe } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSwitcher = () => {
  const { locale, setLocale, languages } = useI18n();
  const current = languages.find((l) => l.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm text-foreground/80 hover:text-accent transition-colors">
        <Globe className="h-4 w-4" />
        <span className="uppercase text-xs font-medium">{current?.code ?? locale}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {languages.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLocale(l.code)}
            className={l.code === locale ? "font-semibold" : ""}
          >
            <span className="uppercase text-xs mr-2 text-muted-foreground">{l.code}</span>
            {l.native_name ?? l.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
