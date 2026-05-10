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
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (data: FormData) => {
    sendMessage(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="border border-border p-8 md:p-10 lg:p-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm text-muted-foreground mb-2">Name</label>
          <Input
            {...register("name")}
            placeholder="Your name"
            className="h-12 border-border bg-transparent focus:border-foreground transition-colors rounded-none"
            data-testid="input-name"
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-2">{errors.name.message}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <label className="block text-sm text-muted-foreground mb-2">Email</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            className="h-12 border-border bg-transparent focus:border-foreground transition-colors rounded-none"
            data-testid="input-email"
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-2">{errors.email.message}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm text-muted-foreground mb-2">Message</label>
          <Textarea
            {...register("message")}
            placeholder="Tell us about your project..."
            className="min-h-[160px] border-border bg-transparent focus:border-foreground resize-none transition-colors rounded-none"
            data-testid="input-message"
          />
          {errors.message && (
            <p className="text-sm text-destructive mt-2">{errors.message.message}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
        >
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 text-base bg-foreground text-background hover:bg-foreground/90 rounded-none"
              data-testid="button-submit"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </div>
  );
}
