import { toast } from "@/hooks/use-toast";
import { auth } from "@/utils/firebase";
import { useMutation } from "@tanstack/react-query";
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
export interface UserData {
    email: string,
    password: string,
    rememberMe: boolean
}
interface Result {
    onSuccess: () => void,
    onError: (error: Error) => void
}

export function useSignInEmailPasswordMutation({onSuccess, onError}: Result) {
    return useMutation({
        mutationFn: async({ email, password, rememberMe }: UserData) => {
            if(rememberMe) {
                await setPersistence(auth, browserLocalPersistence)
                    toast({
                        variant: "default",
                        title: "Sucesso",
                        description: "Lembrar de mim aplicado com sucesso!",
                      });
                      return signInWithEmailAndPassword(auth, email, password);
                    } else {
                toast({
                    variant: "destructive",
                    title: "Erro!",
                    description: "Falha ao lembrar senha",
                  });
                  return signInWithEmailAndPassword(auth, email, password);
            }
        },
        onSuccess,
        onError,
    })
}
