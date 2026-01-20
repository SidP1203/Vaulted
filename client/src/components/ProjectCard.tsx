import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
      className="group block"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      data-testid={`card-project-${project.id}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-5">
        <motion.img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
        
        {project.isFeatured && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 bg-background text-foreground text-xs tracking-[0.15em] uppercase px-3 py-1.5 font-medium"
          >
            Featured
          </motion.div>
        )}

        <motion.div 
          className="absolute bottom-4 right-4 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <ArrowUpRight className="w-5 h-5" />
        </motion.div>
      </div>
      
      <div>
        <h3 className="font-display text-xl md:text-2xl mb-2 group-hover:underline underline-offset-4 decoration-1">{project.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{project.description}</p>
      </div>
    </motion.a>
  );
}
