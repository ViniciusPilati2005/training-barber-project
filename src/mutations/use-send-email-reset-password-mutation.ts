import { auth } from "@/services/firebase";
import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetEmail } from "firebase/auth";

interface sendResetEmailPayload {
    onSuccess: () => void,
    onError: () => void,
}

export function useSendEmailResetPasswordMutation({onSuccess, onError}: sendResetEmailPayload) {
    return useMutation({
        mutationFn: ({email}: {email: string}) => 
            sendPasswordResetEmail(auth, email),
        onSuccess,
        onError
    })
}