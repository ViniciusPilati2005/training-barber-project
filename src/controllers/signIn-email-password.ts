import { useToast } from "@/hooks/use-toast";
import { useSignInAppleMutation } from "@/mutations/use-signIn-apple";
import { useSignInEmailPasswordMutation } from "@/mutations/use-signIn-email-password";
import { useSignInGoogleMutation } from "@/mutations/use-signIn-google";
import { useNavigate } from "@tanstack/react-router";
import { FirebaseError } from "firebase/app";
import { useSendEmailResetPasswordMutation } from "@/mutations/send-email-reset-password";

export function useSignInEmailPasswordController() {
    const navigate = useNavigate({ from: "/" });
    const { toast } = useToast();

    const { mutate: signInWithEmailPassword } = useSignInEmailPasswordMutation({
        onSuccess: () => {
            navigate({ to: "/dashboard" });
          },
          onError: (error) => {
            if (error instanceof FirebaseError) {
              switch (error.code) {
                case "auth/invalid-email":
                  toast({
                    variant: "destructive",
                    title: "Erro!",
                    description: "Este email não é valido.",
                  });
                  break;
                case "auth/user-disabled":
                  toast({
                    variant: "destructive",
                    title: "Erro!",
                    description: "Este usuário foi desativado.",
                  });
                  break;
                case "auth/user-not-found":
                  toast({
                    variant: "destructive",
                    title: "Erro!",
                    description: "Este usuário não foi encontrado.",
                  });
                  break;
                case "auth/wrong-password":
                  toast({
                    variant: "destructive",
                    title: "Erro!",
                    description: "Senha inválida ou indefinida.",
                  });
                  break;
      
                default:
                  toast({
                    variant: "destructive",
                    title: "Erro!",
                    description: "Não foi possivel realizar a operação.",
                  });
                  break;
              }
              return;
            }
            toast({
              variant: "destructive",
              title: "Erro!",
              description: "Não foi possivel realizar a operação.",
            });
          },
    });

    const { mutate: signInGoogle } = useSignInGoogleMutation({
      onSuccess: () => {
        navigate({to: '/dashboard'})
      },
      onError: (error) => {
        if(error instanceof FirebaseError) {
          switch(error.code) {
            case 'auth/account-exists-with-different-credential':
            toast({
              variant: "destructive",
              title: "Erro!",
              description: "Já existe uma conta com essa credencial",
            });
            break;
            case 'auth/auth-domain-config-required':
              toast({
                variant: "destructive",
                title: "Erro!",
                description: "A configuração do dominio não existe",
              });
              break;
              case 'auth/cancelled-popup-request':
                toast({
                  variant: "destructive",
                  title: "Erro!",
                  description: "A requisição foi cancelada",
                });
              break;
              case 'auth/operation-not-allowed':
                toast({
                  variant: "destructive",
                  title: "Erro!",
                  description: "Não foi possivel realizar a operação",
                });
              break;
              case 'auth/operation-not-supported-in-this-environment':
                toast({
                  variant: "destructive",
                  title: "Erro!",
                  description: "Operação não suportada neste ambiente",
                });
              break;
              case 'auth/popup-blocked':
                toast({
                  variant: "destructive",
                  title: "Erro!",
                  description: "O popup foi bloqueado",
                });
              break;
              case 'auth/popup-closed-by-user':
                toast({
                  variant: "destructive",
                  title: "Erro!",
                  description: "O popup foi fechado pelo usuário",
                });
              break;
              case 'auth/unauthorized-domain':
                toast({
                  variant: "destructive",
                  title: "Erro!",
                  description: "Dominio não autorizado",
                });
              break;
          }
          return
        }
        toast({
          variant: "destructive",
          title: "Erro!",
          description: "Não foi possivel fazer login com google.",
        });
      }
    });

    const { mutate: signInApple } = useSignInAppleMutation({
      onSuccess: () => navigate({to: '/dashboard'}),
      onError: (error) => {
        if(error instanceof FirebaseError) {
          switch(error.code) {
            case 'auth/account-exists-with-different-credential':
            toast({
              variant: "destructive",
              title: "Erro!",
              description: "Já existe uma conta com essa credencial",
            });
            break;
            case 'auth/auth-domain-config-required':
              toast({
                variant: "destructive",
                title: "Erro!",
                description: "A configuração do dominio não existe",
              });
              break;
              case 'auth/cancelled-popup-request':
                toast({
                  variant: "destructive",
                  title: "Erro!",
                  description: "A requisição foi cancelada",
                });
              break;
              case 'auth/operation-not-allowed':
                toast({
                  variant: "destructive",
                  title: "Erro!",
                  description: "Não foi possivel realizar a operação",
                });
              break;
              case 'auth/operation-not-supported-in-this-environment':
                toast({
                  variant: "destructive",
                  title: "Erro!",
                  description: "Operação não suportada neste ambiente",
                });
              break;
              case 'auth/popup-blocked':
                toast({
                  variant: "destructive",
                  title: "Erro!",
                  description: "O popup foi bloqueado",
                });
              break;
              case 'auth/popup-closed-by-user':
                toast({
                  variant: "destructive",
                  title: "Erro!",
                  description: "O popup foi fechado pelo usuário",
                });
              break;
              case 'auth/unauthorized-domain':
                toast({
                  variant: "destructive",
                  title: "Erro!",
                  description: "Dominio não autorizado",
                });
              break;
          }
          return
        }
        toast({
          variant: "destructive",
          title: "Erro!",
          description: "Não foi possivel fazer login com Apple.",
        });
      },
    });

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
    });


      return {signInWithEmailPassword, signInGoogle, signInApple, resetPassword};
  }


