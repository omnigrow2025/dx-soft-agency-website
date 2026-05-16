import { ArrowRight, Clock, BarChart, Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { apiFetch, resolveImage, unwrap, type Course } from "@/lib/api";

const CoursesSection = () => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["public-courses"],
    queryFn: async () => unwrap<Course[]>(await apiFetch("/api/courses", { auth: false })),
  });

  return (
    <section id="courses" className="py-16 md:py-28 bg-secondary/40 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <p className="eyebrow">Ծրագիր</p>
            <h2 className="font-serif-display text-4xl md:text-5xl text-foreground">
              Հասանելի <em className="text-accent not-italic">դասընթացներ</em>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Ընտրեք ուղղություն և սկսեք ձեր մասնագիտական ուղին փորձառու դասախոսների հետ։
          </p>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-80 rounded-md bg-muted animate-pulse" />
            ))}
          </div>
        ) : !courses?.length ? (
          <p className="text-center text-muted-foreground py-12">Դասընթացներ չկան</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <article
                key={course.id}
                className="group bg-card border border-border rounded-md overflow-hidden hover:border-accent/40 transition-colors flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                  <img
                    src={resolveImage(course.imageUrl)}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                  {course.salePrice != null && (
                    <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-sm">
                      {course.salePrice.toLocaleString()} {course.currency ?? ""}
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <h3 className="font-serif-display text-xl text-foreground leading-snug line-clamp-2 min-h-[3.5rem]">
                    {course.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    {course.duration != null && (
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{course.duration} ամիս</span>
                    )}
                    {course.level && (
                      <span className="flex items-center gap-1.5"><BarChart className="h-3.5 w-3.5" />{course.level}</span>
                    )}
                    {course.type && (
                      <span className="flex items-center gap-1.5"><Tag className="h-3.5 w-3.5" />{course.type}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-4 mt-auto border-t border-border">
                    {course.price != null ? (
                      <span className="font-serif-display text-lg text-foreground">
                        {course.price.toLocaleString()} <span className="text-xs text-muted-foreground">{course.currency ?? ""}</span>
                      </span>
                    ) : <span />}
                    <Button size="sm" variant="ghost" className="text-accent hover:text-accent hover:bg-accent/10 -mr-2">
                      Իմանալ ավելին <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
