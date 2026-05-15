import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { apiFetch, resolveImage, unwrap, type Teacher } from "@/lib/api";

const TeacherDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: teacher, isLoading, isError } = useQuery({
    queryKey: ["public-teacher", id],
    queryFn: async () => {
      try {
        return unwrap<Teacher>(await apiFetch(`/api/teachers/${id}`, { auth: false }));
      } catch {
        const all = unwrap<Teacher[]>(await apiFetch("/api/teachers", { auth: false }));
        const found = all.find((t) => String(t.id) === String(id));
        if (!found) throw new Error("not found");
        return found;
      }
    },
    enabled: !!id,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/#specialists" className="inline-flex items-center text-sm text-muted-foreground hover:text-accent-lime mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Վերադառնալ
          </Link>

          {isLoading ? (
            <div className="grid md:grid-cols-[280px_1fr] gap-8">
              <div className="aspect-square rounded-2xl bg-muted animate-pulse" />
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded animate-pulse w-2/3" />
                <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
                <div className="h-24 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ) : isError || !teacher ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-6">Մասնագետը չի գտնվել։</p>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/#specialists">Վերադառնալ</Link>
              </Button>
            </div>
          ) : (
            <article className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={resolveImage(teacher.imageUrl)}
                  alt={`${teacher.name} ${teacher.lastName ?? ""}`}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                />
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                  {teacher.name} <span className="text-accent-lime">{teacher.lastName ?? ""}</span>
                </h1>
                {teacher.bio && (
                  <p className="text-sm text-accent-lime font-medium">{teacher.bio}</p>
                )}
                {teacher.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {teacher.description}
                  </p>
                )}
                <div className="space-y-2 pt-4">
                  {teacher.email && (
                    <a href={`mailto:${teacher.email}`} className="flex items-center gap-2 text-sm hover:text-accent-lime">
                      <Mail className="h-4 w-4" /> {teacher.email}
                    </a>
                  )}
                  {teacher.phoneNumber && (
                    <a href={`tel:${teacher.phoneNumber}`} className="flex items-center gap-2 text-sm hover:text-accent-lime">
                      <Phone className="h-4 w-4" /> {teacher.phoneNumber}
                    </a>
                  )}
                </div>
              </div>
            </article>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default TeacherDetail;
