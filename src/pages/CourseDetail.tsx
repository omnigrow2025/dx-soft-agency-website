import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, BarChart, Tag, Award, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { apiFetch, resolveImage, unwrap, type Course } from "@/lib/api";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: course, isLoading, isError } = useQuery({
    queryKey: ["public-course", id],
    queryFn: async () => {
      try {
        return unwrap<Course>(await apiFetch(`/api/courses/${id}`, { auth: false }));
      } catch {
        const all = unwrap<Course[]>(await apiFetch("/api/courses", { auth: false }));
        const found = all.find((c) => String(c.id) === String(id));
        if (!found) throw new Error("not found");
        return found;
      }
    },
    enabled: !!id,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/#courses"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Վերադառնալ
          </Link>

          {isLoading ? (
            <div className="grid md:grid-cols-[1fr_360px] gap-10">
              <div className="space-y-4">
                <div className="aspect-[16/9] rounded-md bg-muted animate-pulse" />
                <div className="h-10 bg-muted rounded animate-pulse w-2/3" />
                <div className="h-24 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-72 rounded-md bg-muted animate-pulse" />
            </div>
          ) : isError || !course ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-6">Դասընթացը չի գտնվել։</p>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/#courses">Վերադառնալ</Link>
              </Button>
            </div>
          ) : (
            <article className="grid md:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-start">
              <div className="space-y-8">
                <div className="aspect-[16/9] rounded-md overflow-hidden bg-muted">
                  <img
                    src={resolveImage(course.imageUrl)}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                </div>

                <div className="space-y-4">
                  <p className="eyebrow">Դասընթաց</p>
                  <h1 className="font-serif-display text-4xl md:text-5xl text-foreground leading-tight">
                    {course.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground pt-2">
                    {course.duration != null && (
                      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{course.duration} ամիս</span>
                    )}
                    {course.level && (
                      <span className="flex items-center gap-1.5"><BarChart className="h-4 w-4" />{course.level}</span>
                    )}
                    {course.type && (
                      <span className="flex items-center gap-1.5"><Tag className="h-4 w-4" />{course.type}</span>
                    )}
                    {course.certificate && (
                      <span className="flex items-center gap-1.5"><Award className="h-4 w-4" />{course.certificate}</span>
                    )}
                  </div>
                </div>

                {course.description && (
                  <div className="space-y-3">
                    <h2 className="font-serif-display text-2xl text-foreground">Նկարագրություն</h2>
                    <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                      {course.description}
                    </p>
                  </div>
                )}

                {course.features?.length ? (
                  <div className="space-y-4">
                    <h2 className="font-serif-display text-2xl text-foreground">Ինչ կսովորեք</h2>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {course.features.map((f, i) => (
                        <li key={i} className="flex gap-2 text-sm text-foreground/90">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                          {f.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {course.studyPlan?.length ? (
                  <div className="space-y-4">
                    <h2 className="font-serif-display text-2xl text-foreground">Ուսումնական ծրագիր</h2>
                    <ul className="divide-y divide-border border-t border-b border-border">
                      {course.studyPlan.map((s, i) => (
                        <li key={i} className="py-4 grid grid-cols-[2.5rem_1fr] gap-4">
                          <span className="font-serif-display text-accent text-lg">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h3 className="font-medium text-foreground">{s.title}</h3>
                            {s.description && (
                              <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <aside className="md:sticky md:top-28 bg-card border border-border rounded-md p-6 space-y-5">
                <div>
                  {course.salePrice != null ? (
                    <div className="space-y-1">
                      <p className="font-serif-display text-4xl text-foreground">
                        {course.salePrice.toLocaleString()} <span className="text-base text-muted-foreground">{course.currency ?? ""}</span>
                      </p>
                      {course.price != null && (
                        <p className="text-sm text-muted-foreground line-through">
                          {course.price.toLocaleString()} {course.currency ?? ""}
                        </p>
                      )}
                    </div>
                  ) : course.price != null ? (
                    <p className="font-serif-display text-4xl text-foreground">
                      {course.price.toLocaleString()} <span className="text-base text-muted-foreground">{course.currency ?? ""}</span>
                    </p>
                  ) : (
                    <p className="font-serif-display text-2xl text-foreground">Կապ մեզ հետ</p>
                  )}
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link to="/#contact">Գրանցվել</Link>
                </Button>

                <div className="pt-4 border-t border-border space-y-2 text-sm text-muted-foreground">
                  {course.duration != null && (
                    <p className="flex justify-between"><span>Տևողություն</span><span className="text-foreground">{course.duration} ամիս</span></p>
                  )}
                  {course.level && (
                    <p className="flex justify-between"><span>Մակարդակ</span><span className="text-foreground">{course.level}</span></p>
                  )}
                  {course.type && (
                    <p className="flex justify-between"><span>Ձևաչափ</span><span className="text-foreground">{course.type}</span></p>
                  )}
                  {course.certificate && (
                    <p className="flex justify-between"><span>Վկայական</span><span className="text-foreground">{course.certificate}</span></p>
                  )}
                </div>
              </aside>
            </article>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default CourseDetail;
