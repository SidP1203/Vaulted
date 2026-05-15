import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSendMessage } from "@/hooks/use-messages";
import { insertMessageSchema } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowRight } from "lucide-react";

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
    sendMessage(data, { onSuccess: () => reset() });
  };

  return (
    <div
      className="p-8 md:p-10 lg:p-12"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#888" }}>Name</label>
          <Input
            {...register("name")}
            placeholder="Your name"
            className="h-12 bg-transparent border-0 border-b rounded-none text-white placeholder:text-white/20 focus-visible:ring-0 focus-visible:border-b focus-visible:border-[#c9a96e] transition-colors px-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
            data-testid="input-name"
          />
          {errors.name && (
            <p className="text-sm mt-2" style={{ color: "#ef4444" }}>{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#888" }}>Email</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            className="h-12 bg-transparent border-0 border-b rounded-none text-white placeholder:text-white/20 focus-visible:ring-0 focus-visible:border-b focus-visible:border-[#c9a96e] transition-colors px-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
            data-testid="input-email"
          />
          {errors.email && (
            <p className="text-sm mt-2" style={{ color: "#ef4444" }}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#888" }}>Message</label>
          <Textarea
            {...register("message")}
            placeholder="Tell us about your project..."
            className="bg-transparent border-0 border-b rounded-none text-white placeholder:text-white/20 focus-visible:ring-0 focus-visible:border-b focus-visible:border-[#c9a96e] resize-none transition-colors px-0 min-h-[140px]"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
            data-testid="input-message"
          />
          {errors.message && (
            <p className="text-sm mt-2" style={{ color: "#ef4444" }}>{errors.message.message}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full justify-center"
            data-testid="button-submit"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send message
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
