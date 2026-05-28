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
    "w-full bg-transparent border-0 border-b border-[hsl(var(--ink-1)/0.20)] px-0 py-3 text-[16px] t-primary placeholder:t-quaternary outline-none focus:border-[hsl(var(--ink-1))] transition-colors";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      <div>
        <label htmlFor="cf-name" className="block text-[11px] font-medium t-tertiary mb-1 uppercase tracking-[0.12em]">Name</label>
        <input
          id="cf-name"
          {...register("name")}
          placeholder="Your name"
          className={inputClass}
          data-testid="input-name"
        />
        {errors.name && <p className="text-[hsl(var(--danger))] text-[13px] mt-1.5">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="cf-email" className="block text-[11px] font-medium t-tertiary mb-1 uppercase tracking-[0.12em]">Email</label>
        <input
          id="cf-email"
          {...register("email")}
          type="email"
          placeholder="you@company.com"
          className={inputClass}
          data-testid="input-email"
        />
        {errors.email && <p className="text-[hsl(var(--danger))] text-[13px] mt-1.5">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="cf-msg" className="block text-[11px] font-medium t-tertiary mb-1 uppercase tracking-[0.12em]">Project</label>
        <textarea
          id="cf-msg"
          {...register("message")}
          placeholder="Tell us a little about what you're working on…"
          rows={4}
          className={`${inputClass} resize-none`}
          data-testid="input-message"
        />
        {errors.message && <p className="text-[hsl(var(--danger))] text-[13px] mt-1.5">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn mt-4"
        data-testid="button-submit"
      >
        {isPending ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
        ) : (
          <>Send message <ArrowRight className="h-4 w-4" /></>
        )}
      </button>
    </form>
  );
}
