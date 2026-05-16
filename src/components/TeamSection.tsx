import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { apiFetch, resolveImage, unwrap, type Teacher } from "@/lib/api";

const TeamSection = () => {
  const { data: team, isLoading } = useQuery({
    queryKey: ["public-teachers"],
    queryFn: async () => unwrap<Teacher[]>(await apiFetch("/api/teachers", { auth: false })),
  });

  return (
    <section id="specialists" className="py-16 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <p className="eyebrow">Մեր թիմը</p>
            <h2 className="font-serif-display text-4xl md:text-6xl text-foreground">
              Փորձառու <em className="text-accent">մասնագետներ</em>
            </h2>
          </motion.div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Դասախոսներ, ովքեր գիտեն՝ ինչպես փոխանցել գիտելիքը և ձևավորել մասնագետի մտածողություն։
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {team?.slice(0, 8).map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
              >
                <Link to={`/teachers/${member.id}`} className="group block bento-card relative aspect-[3/4] overflow-hidden">
                  <img
                    src={resolveImage(member.imageUrl)}
                    alt={`${member.name} ${member.lastName ?? ""}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                  <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="h-4 w-4 text-foreground" />
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
                    <h3 className="font-serif-display text-lg md:text-xl leading-tight">
                      {member.name} {member.lastName ?? ""}
                    </h3>
                    {member.bio && (
                      <p className="text-[11px] opacity-80 line-clamp-2 mt-1">{member.bio}</p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
