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
        mutationFn: ({ email, password, rememberMe }: UserData) => {
            if(rememberMe){
                console.log("Marcado") }
                // setPersistence(auth, browserLocalPersistence)}
          return signInWithEmailAndPassword(auth, email, password);
        },
        onSuccess,
        onError,
    })
}
