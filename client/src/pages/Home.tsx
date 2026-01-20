import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";
import { useProjects } from "@/hooks/use-projects";
import { motion } from "framer-motion";
import { 
  Monitor, 
  Smartphone, 
  Search, 
  BarChart, 
  Code, 
  Palette,
  ArrowRight,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Static content
const services = [
  {
    icon: Monitor,
    title: "Web Design",
    description: "Stunning, high-converting websites crafted to tell your brand's unique story and engage your audience."
  },
  {
    icon: Smartphone,
    title: "Responsive Dev",
    description: "Flawless experiences across all devices. Mobile-first development ensures you reach customers everywhere."
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Rank higher on Google. We build with technical SEO best practices to drive organic traffic to your site."
  },
  {
    icon: Palette,
    title: "Branding",
    description: "Complete visual identity systems including logos, typography, and color palettes that stand out."
  }
];

export default function Home() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />

        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-primary font-semibold text-sm tracking-wide uppercase">Vaunt Web Solutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-8">
              We Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Digital Experiences</span>
              <br /> That <span className="text-primary">Matter.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Transform your business with a website that converts. We blend aesthetic excellence with technical precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
              >
                Start Your Project
              </Button>
              <Button 
                variant="outline"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-14 px-8 rounded-full border-white/10 hover:bg-white/5 text-white text-lg font-semibold"
              >
                View Portfolio
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Abstract Hero Graphic */}
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-12">
                {/* Hero scenic workspace */}
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                  alt="Development Workspace"
                  className="rounded-2xl shadow-2xl border border-white/10 w-full h-64 object-cover"
                />
                {/* Hero abstract geometric */}
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
                  alt="Technology"
                  className="rounded-2xl shadow-2xl border border-white/10 w-full h-48 object-cover"
                />
              </div>
              <div className="space-y-4">
                {/* Hero coding screen */}
                <img 
                  src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80"
                  alt="Code"
                  className="rounded-2xl shadow-2xl border border-white/10 w-full h-48 object-cover"
                />
                {/* Hero design meeting */}
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
                  alt="Team"
                  className="rounded-2xl shadow-2xl border border-white/10 w-full h-64 object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-card/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Our Expertise</h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive digital solutions tailored to help your business grow and succeed in the modern web landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <ServiceCard key={idx} index={idx} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Selected Works</h2>
              <p className="text-muted-foreground text-lg">
                Explore our portfolio of successful projects. From non-profits to enterprise solutions.
              </p>
            </div>
            <a href="#" className="text-primary hover:text-primary/80 font-semibold flex items-center gap-2 transition-colors">
              View All Projects <ArrowRight size={20} />
            </a>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-2xl h-[400px] animate-pulse border border-white/5" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
              
              {/* Fallback hardcoded item if DB is empty to show the style */}
              {(!projects || projects.length === 0) && (
                <>
                  <ProjectCard 
                    index={0}
                    project={{
                      id: 999,
                      title: "CSEL Cincinnati",
                      description: "A comprehensive platform for the Center for Social-Emotional Learning, featuring resource libraries and event management.",
                      imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
                      link: "https://cselcincy.org",
                      isFeatured: true
                    }} 
                  />
                  <ProjectCard 
                    index={1}
                    project={{
                      id: 998,
                      title: "TechFlow Dashboard",
                      description: "Modern analytics dashboard for a SaaS platform with real-time data visualization.",
                      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
                      link: "#",
                      isFeatured: false
                    }} 
                  />
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">How We Work</h2>
              <div className="space-y-8">
                {[
                  { title: "Discovery & Strategy", desc: "We start by understanding your goals, audience, and market position." },
                  { title: "Design & Prototyping", desc: "Creating visual concepts and interactive prototypes for your approval." },
                  { title: "Development", desc: "Writing clean, efficient code to bring the designs to life." },
                  { title: "Launch & Support", desc: "Deploying your site and providing ongoing maintenance and updates." }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <span className="font-display font-bold text-primary text-xl">{idx + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl blur-2xl" />
              {/* Process section coding team */}
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="Team Collaboration" 
                className="relative rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Let's Build Something<br /><span className="text-primary">Great Together</span></h2>
              <p className="text-muted-foreground text-lg mb-12 max-w-lg">
                Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <ExternalLink className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Visit our main project</p>
                    <a href="https://cselcincy.org" target="_blank" className="font-semibold hover:text-primary transition-colors">cselcincy.org</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <CheckCircle2 className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Availability</p>
                    <p className="font-semibold">Accepting new projects</p>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-display font-bold text-white text-xl">V</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Vaunt<span className="text-primary">.</span>
              </span>
            </div>
            
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Vaunt Web Solutions. All rights reserved.
            </p>

            <div className="flex gap-6">
              {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                <a key={social} href="#" className="text-muted-foreground hover:text-white transition-colors text-sm">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
