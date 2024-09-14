import { toast } from "@/hooks/use-toast";
import { useSendEmailResetPasswordMutation } from "@/mutations/send-email-reset-password";
import { useNavigate } from "@tanstack/react-router";

export function useSendEmailResetPasswordController() {
    const navigate = useNavigate()
    const { mutate: resetPassword } = useSendEmailResetPasswordMutation({
        onSuccess: () => {
            toast({
                variant: "default",
                title: "Sucesso",
                description: "Email enviado com sucesso!",
              });
              navigate({to: '/'})
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Erro ao enviar email de redefinição!",
              });
        }
    })
    return {
        resetPassword
    }
}