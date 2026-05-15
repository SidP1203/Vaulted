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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-[13px] font-medium text-[#111] mb-1.5">Name</label>
        <Input
          {...register("name")}
          placeholder="Your name"
          className="h-11 border-[#ddd] bg-white rounded-lg text-[#111] placeholder:text-[#bbb] focus-visible:ring-1 focus-visible:ring-[#111] focus-visible:border-[#111] transition-colors"
          data-testid="input-name"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1.5">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-[13px] font-medium text-[#111] mb-1.5">Email</label>
        <Input
          {...register("email")}
          type="email"
          placeholder="your@email.com"
          className="h-11 border-[#ddd] bg-white rounded-lg text-[#111] placeholder:text-[#bbb] focus-visible:ring-1 focus-visible:ring-[#111] focus-visible:border-[#111] transition-colors"
          data-testid="input-email"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1.5">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-[13px] font-medium text-[#111] mb-1.5">Message</label>
        <Textarea
          {...register("message")}
          placeholder="Tell us about your project..."
          className="border-[#ddd] bg-white rounded-lg text-[#111] placeholder:text-[#bbb] focus-visible:ring-1 focus-visible:ring-[#111] focus-visible:border-[#111] resize-none transition-colors min-h-[140px]"
          data-testid="input-message"
        />
        {errors.message && (
          <p className="text-sm text-red-500 mt-1.5">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="sqsp-btn-primary w-full justify-center !py-3"
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
