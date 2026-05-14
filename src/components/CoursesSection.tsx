import { ArrowRight, Clock, BarChart, Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiFetch, resolveImage, unwrap, type Course } from "@/lib/api";

const CoursesSection = () => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["public-courses"],
    queryFn: async () => unwrap<Course[]>(await apiFetch("/api/courses", { auth: false })),
  });

  return (
    <section id="courses" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Դասընթացներ</h2>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-72 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : !courses?.length ? (
          <p className="text-center text-muted-foreground py-12">No courses available</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden border-border hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-muted">
                  <img
                    src={resolveImage(course.imageUrl)}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                  {course.salePrice != null && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      {course.salePrice.toLocaleString()} {course.currency ?? ""}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">{course.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    {course.duration != null && (
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration} ամիս</span>
                    )}
                    {course.level && (
                      <span className="flex items-center gap-1"><BarChart className="h-3 w-3" />{course.level}</span>
                    )}
                    {course.type && (
                      <span className="flex items-center gap-1"><Tag className="h-3 w-3" />{course.type}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Button size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Իմանալ ավելին <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                    {course.price != null && (
                      <span className="text-xs text-muted-foreground">
                        {course.price.toLocaleString()} {course.currency ?? ""}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
