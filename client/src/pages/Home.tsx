import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects } from "@/hooks/use-projects";
import { motion } from "framer-motion";
import { 
  Code2, 
  Shield, 
  Clock, 
  Zap,
  ArrowRight,
  CheckCircle,
  ExternalLink
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

export default function Home() {
  const { data: projects, isLoading } = useProjects();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-8">
              Web Development Studio
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.1] mb-8 tracking-tight">
              Websites that work
              <br />
              <span className="italic">as hard as you do</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Hand-crafted, secure, and built to perform. We create websites that 
              elevate your brand and drive real business results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-14 px-10 text-base rounded-none"
                data-testid="button-start-project"
              >
                Start Your Project
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-14 px-10 text-base rounded-none border-foreground/20 hover:bg-foreground/5"
                data-testid="button-view-work"
              >
                View Our Work
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Hand-Written", value: "100%" },
              { label: "Secure Code", value: "100%" },
              { label: "Client Satisfaction", value: "100%" },
              { label: "On-Time Delivery", value: "100%" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <p className="font-display text-4xl md:text-5xl mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground tracking-wide uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">What We Do</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6">Crafted with care, built to last</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We believe in doing things right. Every project is approached with meticulous 
              attention to detail and a commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:border-foreground/30 transition-colors">
                    <service.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-24 md:py-32 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">Selected Work</p>
              <h2 className="font-display text-4xl md:text-5xl">Projects we're proud of</h2>
            </div>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/3] bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">Pricing</p>
              <h2 className="font-display text-4xl md:text-5xl mb-6">Transparent, honest pricing</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                No hidden fees, no surprises. We charge based on the scope and complexity 
                of your project, ensuring you get exactly what you need.
              </p>
              
              <div className="border border-border p-8 mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display text-5xl md:text-6xl">$35–50</span>
                  <span className="text-muted-foreground">/hour</span>
                </div>
                <p className="text-muted-foreground mb-6">
                  Depending on project scope, timeline, and complexity
                </p>
                <ul className="space-y-3">
                  {pricingFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-foreground" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-14 px-10 text-base rounded-none"
                data-testid="button-get-quote"
              >
                Get a Free Quote <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square bg-card border border-border p-8 md:p-12 flex flex-col justify-center">
                <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-6">Why Hand-Written Code?</p>
                <ul className="space-y-6">
                  {[
                    { title: "No Bloat", desc: "Clean code means faster load times and better performance" },
                    { title: "Full Control", desc: "Every feature is built to your exact specifications" },
                    { title: "Easy Maintenance", desc: "Well-structured code is easier to update and scale" },
                    { title: "Maximum Security", desc: "No vulnerable plugins or outdated dependencies" }
                  ].map((item, idx) => (
                    <li key={idx}>
                      <h4 className="font-display text-lg mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project Callout */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm tracking-[0.2em] uppercase opacity-60 mb-4">Featured Project</p>
              <h2 className="font-display text-4xl md:text-5xl mb-6">CSEL Cincinnati</h2>
              <p className="opacity-80 text-lg leading-relaxed mb-8">
                We built cselcincy.org for the Center for Social-Emotional Learning—a nonprofit 
                serving schools throughout Greater Cincinnati. The site features resource management, 
                event calendars, and a streamlined donation system.
              </p>
              <a 
                href="https://cselcincy.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-background/30 px-6 py-3 hover:bg-background/10 transition-colors"
                data-testid="link-featured-project"
              >
                Visit Website <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
                alt="CSEL Cincinnati Project"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">Get In Touch</p>
              <h2 className="font-display text-4xl md:text-5xl mb-6">
                Let's build something
                <br />
                <span className="italic">together</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-12">
                Ready to start your project? Send us a message and we'll get back to you 
                within 24 hours with a free consultation.
              </p>

              <div className="space-y-8">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Our Work</p>
                  <a 
                    href="https://cselcincy.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-display text-xl hover:underline underline-offset-4"
                  >
                    cselcincy.org
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Availability</p>
                  <p className="font-display text-xl">Currently accepting projects</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pricing</p>
                  <p className="font-display text-xl">$35–50/hour</p>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="font-display text-xl">
              Vaunt Web Solutions
            </div>
            
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Vaunt Web Solutions. All rights reserved.
            </p>

            <div className="flex gap-6">
              {['Twitter', 'LinkedIn', 'GitHub'].map(social => (
                <a 
                  key={social} 
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  data-testid={`link-social-${social.toLowerCase()}`}
                >
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
