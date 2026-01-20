import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group block"
      data-testid={`card-project-${project.id}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-4">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
        {project.isFeatured && (
          <div className="absolute top-4 left-4 bg-background text-foreground text-xs tracking-wider uppercase px-3 py-1">
            Featured
          </div>
        )}
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl mb-1 group-hover:underline underline-offset-4">{project.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{project.description}</p>
        </div>
        <ExternalLink className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors mt-1" />
      </div>
    </motion.a>
  );
}
