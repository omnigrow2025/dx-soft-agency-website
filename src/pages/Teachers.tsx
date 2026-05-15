import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { apiFetch, resolveImage, unwrap, type Teacher } from "@/lib/api";

const Teachers = () => {
  const { data: team, isLoading } = useQuery({
    queryKey: ["public-teachers-all"],
    queryFn: async () => unwrap<Teacher[]>(await apiFetch("/api/teachers", { auth: false })),
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-accent-lime mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Վերադառնալ
          </Link>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Մեր <span className="text-accent-lime">մասնագետները</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mb-12">
            Փորձառու դասախոսներ, որոնք գիտեն թե ինչպես փոխանցել գիտելիքները։
          </p>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-square rounded-2xl bg-muted animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
                </div>
              ))}
            </div>
          ) : !team?.length ? (
            <p className="text-muted-foreground">Մասնագետներ չեն գտնվել։</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <article key={member.id} className="space-y-3">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                    <img
                      src={resolveImage(member.imageUrl)}
                      alt={`${member.name} ${member.lastName ?? ""}`}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">
                      {member.name} {member.lastName ?? ""}
                    </h3>
                    {member.bio && (
                      <p className="text-xs text-accent-lime mt-1">{member.bio}</p>
                    )}
                    {member.description && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-3">{member.description}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/#contact">Կապ մեզ հետ</Link>
            </Button>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Teachers;
