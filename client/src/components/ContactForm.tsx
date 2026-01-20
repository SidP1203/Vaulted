import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSendMessage } from "@/hooks/use-messages";
import { insertMessageSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowRight } from "lucide-react";
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
    <div className="border border-border p-8 md:p-10 lg:p-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <label className="text-sm text-muted-foreground">Name</label>
          <Input
            {...register("name")}
            placeholder="Your name"
            className="h-14 rounded-none border-border bg-transparent focus:border-foreground transition-colors"
            data-testid="input-name"
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </motion.div>

        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <label className="text-sm text-muted-foreground">Email</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            className="h-14 rounded-none border-border bg-transparent focus:border-foreground transition-colors"
            data-testid="input-email"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </motion.div>

        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <label className="text-sm text-muted-foreground">Message</label>
          <Textarea
            {...register("message")}
            placeholder="Tell us about your project..."
            className="min-h-[180px] rounded-none border-border bg-transparent focus:border-foreground resize-none transition-colors"
            data-testid="input-message"
          />
          {errors.message && (
            <p className="text-sm text-destructive">{errors.message.message}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-14 rounded-none text-base group relative overflow-hidden"
            data-testid="button-submit"
          >
            <span className="relative z-10 flex items-center justify-center">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Button>
        </motion.div>
      </form>
    </div>
  );
}
