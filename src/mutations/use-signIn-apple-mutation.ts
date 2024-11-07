import { toast } from "@/hooks/use-toast";
import { auth, providerApple } from "@/services/firebase";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { signInWithPopup } from "firebase/auth";

interface TypesFn {
    onSuccess: () => void,
    onError: (error: Error) => void
}

export function useSignInAppleMutation({onSuccess, onError}: TypesFn) {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async() => {
            return signInWithPopup(auth, providerApple).then(() => {
                navigate({to: '/'})
            }).catch(() => {
                toast({
                    title: "Erro!",
                    description: "Não foi possivel fazer login com Apple.",
                    variant: "destructive",
                });
            })
        },
        onSuccess,
        onError
    })
}