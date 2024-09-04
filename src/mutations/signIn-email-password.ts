import { auth } from "@/utils/firebase";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";

interface User {
    email: string,
    password: string
}

interface Result {
    onSuccess: () => void,
    onError: (error: Error) => void
}

export function useSignInEmailPasswordMutation({onSuccess, onError}: Result) {
    return useMutation({
        mutationFn: ({ email, password }: User) => {
          return signInWithEmailAndPassword(auth, email, password);
        },
        onSuccess,
        onError
    })
}
