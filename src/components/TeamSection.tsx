import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiFetch, resolveImage, unwrap, type Teacher } from "@/lib/api";
import { ArrowUpRight } from "lucide-react";

const TeamSection = () => {
  const { data: team, isLoading } = useQuery({
    queryKey: ["public-teachers"],
    queryFn: async () => unwrap<Teacher[]>(await apiFetch("/api/teachers", { auth: false })),
  });

  return (
    <section id="specialists" className="py-16 md:py-28 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-3">
            <p className="eyebrow">Մեր թիմը</p>
            <h2 className="font-serif-display text-4xl md:text-5xl text-foreground">
              Փորձառու <em className="text-accent not-italic">մասնագետներ</em>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Դասախոսներ, ովքեր գիտեն՝ ինչպես փոխանցել գիտելիքը և ձևավորել մասնագետի մտածողություն։
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[3/4] rounded-md bg-muted animate-pulse" />
                <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {team?.slice(0, 8).map((member) => (
              <Link
                to={`/teachers/${member.id}`}
                key={member.id}
                className="group block"
              >
                <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-muted mb-3">
                  <img
                    src={resolveImage(member.imageUrl)}
                    alt={`${member.name} ${member.lastName ?? ""}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                  <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="h-4 w-4 text-foreground" />
                  </span>
                </div>
                <h3 className="font-serif-display text-base md:text-lg text-foreground group-hover:text-accent transition-colors leading-tight">
                  {member.name} {member.lastName ?? ""}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{member.bio}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
