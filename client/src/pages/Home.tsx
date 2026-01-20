import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects } from "@/hooks/use-projects";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Code2, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Code2,
    title: "Hand-crafted code",
    description: "Every line written by humans. No templates, no bloat—just clean, maintainable code."
  },
  {
    icon: Shield,
    title: "Security first",
    description: "Enterprise-grade security practices built in from day one."
  },
  {
    icon: Zap,
    title: "Lightning fast",
    description: "Optimized for Core Web Vitals. Your site loads instantly."
  },
  {
    icon: Sparkles,
    title: "Modern stack",
    description: "Built with the latest technologies for long-term maintainability."
  }
];

const pricingFeatures = [
  "Custom development",
  "Responsive design",
  "SEO optimization",
  "Security hardening",
  "Performance tuning",
  "Ongoing support"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Home() {
  const { data: projects, isLoading } = useProjects();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section - Squarespace Style */}
      <section ref={heroRef} className="min-h-[100vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-20 relative" style={{ position: 'relative' }}>
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-[1400px] mx-auto w-full"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="w-8 h-[1px] bg-muted-foreground" />
              Web Development Studio
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(3rem,10vw,8rem)] font-medium leading-[0.95] tracking-[-0.03em] mb-10 max-w-[1200px]"
          >
            Build websites
            <br />
            that perform
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12 leading-relaxed"
          >
            Custom web development with hand-written code. 
            No templates. No compromises. Just results.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-14 px-8 text-base bg-foreground text-background hover:bg-foreground/90"
                data-testid="button-start-project"
              >
                Get started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="ghost"
                size="lg"
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-14 px-8 text-base hover:bg-muted"
                data-testid="button-view-work"
              >
                See our work
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-6 md:left-12 lg:left-20"
        >
          <p className="text-sm text-muted-foreground">Scroll to explore</p>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 md:py-24 border-y border-border">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "100%", label: "Hand-written code" },
              { value: "100%", label: "Secure & tested" },
              { value: "$35-50", label: "Per hour" },
              { value: "24hr", label: "Response time" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="group"
              >
                <p className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-2">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Services - Full Width Cards */}
      <section id="services" className="py-24 md:py-32 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-16 md:mb-24"
          >
            <motion.h2 
              variants={itemVariants} 
              className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6"
            >
              What we do
            </motion.h2>
            <motion.p 
              variants={itemVariants} 
              className="text-muted-foreground text-lg md:text-xl max-w-2xl"
            >
              We build fast, secure, and maintainable websites using modern technologies and best practices.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-6"
          >
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group p-8 md:p-10 lg:p-12 border border-border hover:border-foreground/20 hover:bg-muted/30 transition-all duration-300"
              >
                <service.icon className="w-8 h-8 mb-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                <h3 className="font-display text-2xl md:text-3xl font-medium mb-4">{service.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio - Masonry Style */}
      <section id="work" className="py-24 md:py-32 lg:py-40 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-8"
          >
            <motion.div variants={itemVariants}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">Selected work</h2>
              <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
                Projects we've built for clients who value quality and performance.
              </p>
            </motion.div>
            <motion.a 
              variants={itemVariants}
              href="#contact" 
              className="group inline-flex items-center gap-2 font-medium hover:gap-3 transition-all text-lg"
            >
              Start a project <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/3] bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {projects?.map((project, idx) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard project={project} index={idx} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Pricing - Split Layout */}
      <section id="pricing" className="py-24 md:py-32 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2 
                variants={itemVariants}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6"
              >
                Simple pricing
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-muted-foreground text-lg md:text-xl mb-12"
              >
                No hidden fees. No retainers. Just honest pricing based on the work.
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="border border-border p-8 md:p-10 lg:p-12 hover:border-foreground/20 transition-colors duration-300"
              >
                <div className="mb-8">
                  <span className="font-display text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight">$35-50</span>
                  <span className="text-muted-foreground text-xl ml-2">/hr</span>
                </div>
                <p className="text-muted-foreground text-lg mb-10">
                  Based on project scope and complexity
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {pricingFeatures.map((feature, idx) => (
                    <motion.div 
                      key={idx} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <CheckCircle className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-10">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    size="lg"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="h-14 px-8 text-base bg-foreground text-background hover:bg-foreground/90"
                    data-testid="button-get-quote"
                  >
                    Get a quote
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:mt-20"
            >
              <div className="bg-foreground text-background p-8 md:p-10 lg:p-12">
                <h3 className="font-display text-2xl md:text-3xl font-medium mb-8">Why hand-written code?</h3>
                <ul className="space-y-8">
                  {[
                    { title: "No bloat", desc: "Clean code means faster load times" },
                    { title: "Full control", desc: "Built to your exact specifications" },
                    { title: "Future-proof", desc: "Easy to update and scale" },
                    { title: "Maximum security", desc: "No vulnerable third-party plugins" }
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <h4 className="font-display text-xl font-medium mb-1">{item.title}</h4>
                      <p className="text-background/70">{item.desc}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Project - Full Bleed */}
      <section className="py-24 md:py-32 lg:py-40 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <motion.div variants={itemVariants} className="order-2 lg:order-1">
              <span className="text-sm font-medium text-muted-foreground mb-4 block">Featured project</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
                CSEL Cincinnati
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10">
                A complete website for the Center for Social-Emotional Learning, 
                serving schools across Greater Cincinnati with resources, events, and donation capabilities.
              </p>
              <motion.a 
                href="https://cselcincy.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-foreground px-8 py-4 font-medium hover:bg-foreground hover:text-background transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="link-featured-project"
              >
                View project <ExternalLink className="w-4 h-4" />
              </motion.a>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="order-1 lg:order-2"
            >
              <motion.div 
                className="relative overflow-hidden aspect-[4/3]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80"
                  alt="CSEL Cincinnati Project"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact - Clean Form */}
      <section id="contact" className="py-24 md:py-32 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2 
                variants={itemVariants}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6"
              >
                Let's work together
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-muted-foreground text-lg md:text-xl mb-16"
              >
                Ready to start your project? Send us a message and we'll respond within 24 hours.
              </motion.p>

              <motion.div variants={containerVariants} className="space-y-10">
                {[
                  { label: "See our work", value: "cselcincy.org", link: "https://cselcincy.org" },
                  { label: "Availability", value: "Accepting new projects" },
                  { label: "Rate", value: "$35-50 per hour" }
                ].map((item, idx) => (
                  <motion.div key={idx} variants={itemVariants}>
                    <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                    {item.link ? (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-display text-xl md:text-2xl font-medium hover:underline underline-offset-4 inline-flex items-center gap-2 group"
                      >
                        {item.value} 
                        <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <p className="font-display text-xl md:text-2xl font-medium">{item.value}</p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="font-display text-2xl font-medium mb-2">Vaunt Web Solutions</p>
              <p className="text-sm text-muted-foreground">Custom web development</p>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Vaunt Web Solutions
            </p>

            <div className="flex gap-6">
              {['Twitter', 'LinkedIn', 'GitHub'].map(social => (
                <motion.a 
                  key={social} 
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ y: -2 }}
                  data-testid={`link-social-${social.toLowerCase()}`}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
