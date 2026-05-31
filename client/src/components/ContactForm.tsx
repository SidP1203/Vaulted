import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSendMessage } from "@/hooks/use-messages";
import { insertMessageSchema } from "@shared/schema";
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

  const inputClass =
    "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/35 text-[15px] outline-none focus:border-white/60 focus:bg-white/15 transition-all";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-[12px] font-medium text-white/50 mb-1.5 uppercase tracking-widest">Name</label>
        <input
          {...register("name")}
          placeholder="Your name"
          className={inputClass}
          data-testid="input-name"
        />
        {errors.name && <p className="text-red-400 text-sm mt-1.5">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-[12px] font-medium text-white/50 mb-1.5 uppercase tracking-widest">Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="your@email.com"
          className={inputClass}
          data-testid="input-email"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1.5">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-[12px] font-medium text-white/50 mb-1.5 uppercase tracking-widest">Message</label>
        <textarea
          {...register("message")}
          placeholder="Tell us about your project..."
          className={`${inputClass} resize-none min-h-[130px]`}
          data-testid="input-message"
        />
        {errors.message && <p className="text-red-400 text-sm mt-1.5">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-[14px] font-medium bg-white text-black hover:bg-white/90 transition-all"
        data-testid="button-submit"
      >
        {isPending ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
        ) : (
          <>Send message <ArrowRight className="h-4 w-4" /></>
        )}
      </button>
    </form>
  );
}
