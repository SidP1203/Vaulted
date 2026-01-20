import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects } from "@/hooks/use-projects";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Code2, 
  Shield, 
  Clock, 
  Zap,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Code2,
    title: "Hand-Written Code",
    description: "Every line of code is crafted by hand. No templates, no shortcuts—just clean, semantic, and maintainable code built specifically for your needs."
  },
  {
    icon: Shield,
    title: "100% Secure",
    description: "Security isn't an afterthought. We implement industry-standard security practices from day one, protecting your business and your customers."
  },
  {
    icon: Zap,
    title: "Performance First",
    description: "Lightning-fast load times and optimized performance. Your site will score high on Core Web Vitals and provide an exceptional user experience."
  },
  {
    icon: Clock,
    title: "Ongoing Support",
    description: "We don't disappear after launch. Continuous maintenance, updates, and support ensure your website stays modern and secure."
  }
];

const pricingFeatures = [
  "Custom hand-written code",
  "Responsive design for all devices",
  "SEO optimization included",
  "Security best practices",
  "Performance optimization",
  "Post-launch support"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Home() {
  const { data: projects, isLoading } = useProjects();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden" style={{ position: 'relative' }}>
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-8"
          >
            Web Development Studio
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-normal leading-[1.05] mb-8 tracking-[-0.02em]"
          >
            Websites that work
            <br />
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="italic"
            >
              as hard as you do
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Hand-crafted, secure, and built to perform. We create websites that 
            elevate your brand and drive real business results.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-14 px-10 text-base rounded-none relative overflow-hidden group"
                data-testid="button-start-project"
              >
                <span className="relative z-10">Start Your Project</span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-14 px-10 text-base rounded-none border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300"
                data-testid="button-view-work"
              >
                View Our Work
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated background elements */}
        <motion.div 
          className="absolute top-1/4 left-10 w-72 h-72 bg-muted/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-muted/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* Trust Indicators */}
      <section className="py-20 border-y border-border relative overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto px-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Hand-Written", value: "100%" },
              { label: "Secure Code", value: "100%" },
              { label: "Client Satisfaction", value: "100%" },
              { label: "On-Time Delivery", value: "100%" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="group cursor-default"
              >
                <motion.p 
                  className="font-display text-4xl md:text-5xl lg:text-6xl mb-2 group-hover:scale-110 transition-transform duration-300"
                >
                  {stat.value}
                </motion.p>
                <p className="text-sm text-muted-foreground tracking-wider uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-28 md:py-40">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-2xl mb-20"
          >
            <motion.p variants={itemVariants} className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">What We Do</motion.p>
            <motion.h2 variants={itemVariants} className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">Crafted with care, built to last</motion.h2>
            <motion.p variants={itemVariants} className="text-muted-foreground text-lg leading-relaxed">
              We believe in doing things right. Every project is approached with meticulous 
              attention to detail and a commitment to excellence.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-x-12 gap-y-16"
          >
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="group cursor-default"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex gap-6">
                  <motion.div 
                    className="w-14 h-14 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:border-foreground group-hover:bg-foreground transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <service.icon className="w-5 h-5 group-hover:text-background transition-colors" />
                  </motion.div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl mb-3 group-hover:underline underline-offset-4">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-28 md:py-40 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <motion.div variants={itemVariants} className="max-w-2xl">
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Selected Work</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">Projects we're proud of</h2>
            </motion.div>
            <motion.a 
              variants={itemVariants}
              href="#" 
              className="group inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
            >
              View All <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
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

      {/* Pricing Section */}
      <section id="pricing" className="py-28 md:py-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.p variants={itemVariants} className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Pricing</motion.p>
              <motion.h2 variants={itemVariants} className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">Transparent, honest pricing</motion.h2>
              <motion.p variants={itemVariants} className="text-muted-foreground text-lg leading-relaxed mb-10">
                No hidden fees, no surprises. We charge based on the scope and complexity 
                of your project, ensuring you get exactly what you need.
              </motion.p>
              
              <motion.div variants={itemVariants} className="border border-border p-8 md:p-10 mb-10 group hover:border-foreground transition-colors duration-300">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display text-5xl md:text-6xl lg:text-7xl">$35–50</span>
                  <span className="text-muted-foreground text-lg">/hour</span>
                </div>
                <p className="text-muted-foreground mb-8">
                  Depending on project scope, timeline, and complexity
                </p>
                <ul className="space-y-4">
                  {pricingFeatures.map((feature, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <CheckCircle className="w-4 h-4 text-foreground" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="lg"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="h-14 px-10 text-base rounded-none group relative overflow-hidden"
                  data-testid="button-get-quote"
                >
                  <span className="relative z-10 flex items-center">
                    Get a Free Quote <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-32"
            >
              <div className="bg-muted/50 border border-border p-8 md:p-12">
                <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-8">Why Hand-Written Code?</p>
                <ul className="space-y-8">
                  {[
                    { title: "No Bloat", desc: "Clean code means faster load times and better performance" },
                    { title: "Full Control", desc: "Every feature is built to your exact specifications" },
                    { title: "Easy Maintenance", desc: "Well-structured code is easier to update and scale" },
                    { title: "Maximum Security", desc: "No vulnerable plugins or outdated dependencies" }
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15, duration: 0.5 }}
                      className="group"
                    >
                      <h4 className="font-display text-xl mb-2 group-hover:translate-x-2 transition-transform">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Project Callout */}
      <section className="py-28 md:py-40 bg-foreground text-background overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm tracking-[0.3em] uppercase opacity-60 mb-4">Featured Project</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">CSEL Cincinnati</h2>
              <p className="opacity-80 text-lg leading-relaxed mb-10">
                We built cselcincy.org for the Center for Social-Emotional Learning—a nonprofit 
                serving schools throughout Greater Cincinnati. The site features resource management, 
                event calendars, and a streamlined donation system.
              </p>
              <motion.a 
                href="https://cselcincy.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-background/30 px-8 py-4 hover:bg-background hover:text-foreground transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="link-featured-project"
              >
                Visit Website <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <div className="overflow-hidden">
                <motion.img 
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
                  alt="CSEL Cincinnati Project"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 md:py-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.p variants={itemVariants} className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Get In Touch</motion.p>
              <motion.h2 variants={itemVariants} className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
                Let's build something
                <br />
                <span className="italic">together</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-muted-foreground text-lg leading-relaxed mb-14">
                Ready to start your project? Send us a message and we'll get back to you 
                within 24 hours with a free consultation.
              </motion.p>

              <motion.div variants={containerVariants} className="space-y-10">
                {[
                  { label: "Our Work", value: "cselcincy.org", link: "https://cselcincy.org" },
                  { label: "Availability", value: "Currently accepting projects" },
                  { label: "Pricing", value: "$35–50/hour" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="group"
                  >
                    <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                    {item.link ? (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-display text-xl hover:underline underline-offset-4 inline-flex items-center gap-2"
                      >
                        {item.value} <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <p className="font-display text-xl">{item.value}</p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <motion.div 
              className="font-display text-2xl"
              whileHover={{ scale: 1.02 }}
            >
              Vaunt
            </motion.div>
            
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Vaunt Web Solutions. All rights reserved.
            </p>

            <div className="flex gap-8">
              {['Twitter', 'LinkedIn', 'GitHub'].map(social => (
                <motion.a 
                  key={social} 
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm relative group"
                  whileHover={{ y: -2 }}
                  data-testid={`link-social-${social.toLowerCase()}`}
                >
                  {social}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
