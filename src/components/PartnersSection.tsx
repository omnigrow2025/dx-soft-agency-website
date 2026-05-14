import { useQuery } from "@tanstack/react-query";
import { apiFetch, resolveImage, unwrap, type Partner } from "@/lib/api";

const PartnersSection = () => {
  const { data: partners } = useQuery({
    queryKey: ["public-partners"],
    queryFn: async () => unwrap<Partner[]>(await apiFetch("/api/partners", { auth: false })),
  });

  return (
    <section className="py-10 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Համագործակցում ենք առաջատար ընկերությունների հետ
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {partners?.map((p) => {
            const node = p.logoUrl ? (
              <img
                src={resolveImage(p.logoUrl)}
                alt={p.name}
                className="h-8 md:h-10 object-contain opacity-60 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.outerHTML = `<span class="text-xl md:text-2xl font-bold text-muted-foreground/50">${p.name}</span>`;
                }}
              />
            ) : (
              <span className="text-xl md:text-2xl font-bold text-muted-foreground/50">{p.name}</span>
            );
            return p.url ? (
              <a key={p.id} href={p.url} target="_blank" rel="noreferrer">{node}</a>
            ) : (
              <div key={p.id}>{node}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
