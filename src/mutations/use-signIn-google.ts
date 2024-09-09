import { auth, providerGoogle } from "@/utils/firebase";
import { useMutation } from "@tanstack/react-query";
import { signInWithPopup } from "firebase/auth";

interface ActionsSignIn {
    onSuccess: () => void
    onError: (error: Error) => void
}

export function useSignInGoogleMutation({onSuccess, onError}: ActionsSignIn) {
    return useMutation({
        mutationFn: () => signInWithPopup(auth, providerGoogle),
        onSuccess,
        onError
    })
}