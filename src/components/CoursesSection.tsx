import { ArrowUpRight, Clock, BarChart, Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { apiFetch, resolveImage, unwrap, type Course } from "@/lib/api";

const CoursesSection = () => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["public-courses"],
    queryFn: async () => unwrap<Course[]>(await apiFetch("/api/courses", { auth: false })),
  });

  return (
    <section id="courses" className="py-16 md:py-28 border-t border-border bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <p className="eyebrow">Ծրագիր</p>
            <h2 className="font-serif-display text-4xl md:text-6xl text-foreground">
              Հասանելի <em className="text-accent">դասընթացներ</em>
            </h2>
          </motion.div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Ընտրեք ուղղություն և սկսեք ձեր մասնագիտական ուղին փորձառու դասախոսների հետ։
          </p>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-96 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : !courses?.length ? (
          <p className="text-center text-muted-foreground py-12">Դասընթացներ չկան</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course, i) => (
              <motion.article
                key={course.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="group bento-card flex flex-col"
              >
                <Link to={`/courses/${course.id}`} className="block">
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                    <img
                      src={resolveImage(course.imageUrl)}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                    />
                    {course.salePrice != null && (
                      <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full">
                        Sale
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {course.duration != null && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary"><Clock className="h-3 w-3" />{course.duration} ամիս</span>
                    )}
                    {course.level && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary"><BarChart className="h-3 w-3" />{course.level}</span>
                    )}
                    {course.type && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary"><Tag className="h-3 w-3" />{course.type}</span>
                    )}
                  </div>
                  <h3 className="font-serif-display text-2xl text-foreground leading-tight group-hover:text-accent transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-end justify-between pt-3 mt-auto border-t border-border">
                    {course.price != null ? (
                      <span className="font-serif-display text-2xl text-foreground">
                        {course.price.toLocaleString()} <span className="text-xs text-muted-foreground">{course.currency ?? ""}</span>
                      </span>
                    ) : <span />}
                    <Link to={`/courses/${course.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:gap-2 transition-all">
                      Իմանալ ավելին <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <Button asChild size="sm" className="w-full rounded-full">
                    <Link to="/#contact">Գրանցվել</Link>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
