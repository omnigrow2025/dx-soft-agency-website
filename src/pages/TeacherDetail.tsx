import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowUpRight, Mail, Phone, Clock, BarChart, Tag } from "lucide-react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { apiFetch, resolveImage, unwrap, type Teacher, type Course } from "@/lib/api";

type TeacherWithCourses = Teacher & { courses?: Course[] };

const formatPrice = (price?: number | null, currency?: string | null) => {
  if (price == null) return "";
  return `${price.toLocaleString()} ${currency ?? "AMD"}`;
};

const TeacherDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: teacher, isLoading, isError } = useQuery({
    queryKey: ["public-teacher", id],
    queryFn: async () => {
      try {
        return unwrap<TeacherWithCourses>(await apiFetch(`/api/teachers/${id}`, { auth: false }));
      } catch {
        const all = unwrap<TeacherWithCourses[]>(await apiFetch("/api/teachers", { auth: false }));
        const found = all.find((t) => String(t.id) === String(id));
        if (!found) throw new Error("not found");
        return found;
      }
    },
    enabled: !!id,
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {isLoading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-[1fr_1.2fr] gap-10">
              <div className="aspect-[3/4] rounded-md bg-muted animate-pulse" />
              <div className="space-y-4">
                <div className="h-10 bg-muted rounded animate-pulse w-2/3" />
                <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
                <div className="h-32 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        ) : isError || !teacher ? (
          <div className="max-w-3xl mx-auto px-4 py-24 text-center">
            <p className="text-muted-foreground mb-6">Մասնագետը չի գտնվել։</p>
            <Button asChild variant="outline">
              <Link to="/#specialists">Վերադառնալ</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Hero */}
            <section className="border-b border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                <Link
                  to="/#specialists"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-8"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Մասնագետներ
                </Link>

                <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-8 md:gap-12 items-start">
                  <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-muted">
                    <img
                      src={resolveImage(teacher.imageUrl)}
                      alt={`${teacher.name} ${teacher.lastName ?? ""}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>

                  <div className="space-y-6 md:pt-4">
                    <p className="eyebrow">Մասնագետ</p>
                    <h1 className="font-serif-display text-4xl md:text-6xl leading-[1.05] text-foreground">
                      {teacher.name}{" "}
                      <em className="text-accent not-italic">{teacher.lastName ?? ""}</em>
                    </h1>
                    {teacher.bio && (
                      <p className="text-base md:text-lg text-accent font-medium">{teacher.bio}</p>
                    )}

                    <div className="flex flex-wrap gap-3 pt-2">
                      {teacher.email && (
                        <a
                          href={`mailto:${teacher.email}`}
                          className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
                        >
                          <Mail className="h-4 w-4" /> {teacher.email}
                        </a>
                      )}
                      {teacher.phoneNumber && (
                        <a
                          href={`tel:${teacher.phoneNumber}`}
                          className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
                        >
                          <Phone className="h-4 w-4" /> {teacher.phoneNumber}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* About */}
            {teacher.description && (
              <section className="border-b border-border bg-secondary/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
                  <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
                    <div>
                      <p className="eyebrow mb-3">Կենսագրություն</p>
                      <h2 className="font-serif-display text-3xl md:text-4xl text-foreground">
                        Մասնագետի <em className="text-accent not-italic">մասին</em>
                      </h2>
                    </div>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                      {teacher.description}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Courses */}
            {teacher.courses && teacher.courses.length > 0 && (
              <section className="border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div className="space-y-3">
                      <p className="eyebrow">Դասընթացներ</p>
                      <h2 className="font-serif-display text-3xl md:text-4xl text-foreground">
                        Դասավանդվող <em className="text-accent not-italic">դասընթացներ</em>
                      </h2>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Մասնագետի կողմից վարվող ակտիվ դասընթացների ցանկը։
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {teacher.courses.map((course) => (
                      <article
                        key={course.id}
                        className="group flex flex-col rounded-md border border-border bg-card overflow-hidden hover:border-accent/60 transition-colors"
                      >
                        <Link to={`/courses/${course.id}`} className="block">
                          <div className="aspect-[16/10] overflow-hidden bg-muted">
                            <img
                              src={resolveImage(course.imageUrl)}
                              alt={course.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.svg";
                              }}
                            />
                          </div>
                        </Link>

                        <div className="flex flex-col flex-1 p-5 md:p-6 space-y-4">
                          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                            {course.duration != null && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary">
                                <Clock className="h-3 w-3" /> {course.duration} ամիս
                              </span>
                            )}
                            {course.level && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary">
                                <BarChart className="h-3 w-3" /> {course.level}
                              </span>
                            )}
                            {course.type && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary">
                                <Tag className="h-3 w-3" /> {course.type}
                              </span>
                            )}
                          </div>

                          <h3 className="font-serif-display text-2xl text-foreground group-hover:text-accent transition-colors">
                            {course.title}
                          </h3>

                          {course.description && (
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {course.description}
                            </p>
                          )}

                          <div className="flex items-end justify-between pt-2 mt-auto">
                            <div>
                              {course.salePrice != null && course.salePrice !== course.price ? (
                                <div className="flex items-baseline gap-2">
                                  <span className="font-serif-display text-xl text-foreground">
                                    {formatPrice(course.salePrice, course.currency)}
                                  </span>
                                  <span className="text-xs text-muted-foreground line-through">
                                    {formatPrice(course.price, course.currency)}
                                  </span>
                                </div>
                              ) : (
                                <span className="font-serif-display text-xl text-foreground">
                                  {formatPrice(course.price, course.currency)}
                                </span>
                              )}
                            </div>

                            <Link
                              to={`/courses/${course.id}`}
                              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:gap-2 transition-all"
                            >
                              Իմանալ ավելին <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          </div>

                          <Button asChild className="w-full">
                            <Link to="/#contact">Գրանցվել</Link>
                          </Button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <FooterSection />
    </div>
  );
};

export default TeacherDetail;
