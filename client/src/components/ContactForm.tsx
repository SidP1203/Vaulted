import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSendMessage } from "@/hooks/use-messages";
import { insertMessageSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = insertMessageSchema;
type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const { mutate: sendMessage, isPending } = useSendMessage();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    sendMessage(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-card p-8 rounded-3xl border border-white/5 shadow-xl"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-display font-bold text-white mb-2">Send us a message</h3>
        <p className="text-muted-foreground">Ready to start your next project? Fill out the form below.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white ml-1">Name</label>
          <Input
            {...register("name")}
            placeholder="John Doe"
            className="bg-background/50 border-white/10 focus:border-primary h-12 rounded-xl"
          />
          {errors.name && (
            <p className="text-sm text-red-500 ml-1">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white ml-1">Email</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="john@example.com"
            className="bg-background/50 border-white/10 focus:border-primary h-12 rounded-xl"
          />
          {errors.email && (
            <p className="text-sm text-red-500 ml-1">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white ml-1">Message</label>
          <Textarea
            {...register("message")}
            placeholder="Tell us about your project..."
            className="bg-background/50 border-white/10 focus:border-primary min-h-[150px] rounded-xl resize-none"
          />
          {errors.message && (
            <p className="text-sm text-red-500 ml-1">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
