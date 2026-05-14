import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { apiFetch, resolveImage, unwrap, type Teacher } from "@/lib/api";

const TeamSection = () => {
  const { data: team, isLoading } = useQuery({
    queryKey: ["public-teachers"],
    queryFn: async () => unwrap<Teacher[]>(await apiFetch("/api/teachers", { auth: false })),
  });

  return (
    <section id="specialists" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Մեր <span className="text-primary">թիմը</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Փորձառու դասախոսներ, որոնք գիտեն թե ինչպես փոխանցել գիտելիքները։
            </p>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-full">
                Տեսնել մասնագետներին <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-2xl bg-muted animate-pulse" />
                  <div className="h-3 bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {team?.slice(0, 6).map((member) => (
                <div key={member.id} className="text-center space-y-3">
                  <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-2xl overflow-hidden bg-muted">
                    <img
                      src={resolveImage(member.imageUrl)}
                      alt={`${member.name} ${member.lastName ?? ""}`}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">
                      {member.name} {member.lastName ?? ""}
                    </p>
                    <p className="text-[10px] text-muted-foreground line-clamp-2">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
