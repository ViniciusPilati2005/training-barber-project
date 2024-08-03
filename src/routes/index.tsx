import { LoginPage } from "@/components/login-page";
import { auth } from "@/utils/firebase";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async () => {
    await auth.authStateReady();

    if (auth.currentUser) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});

function Index() {
  return <LoginPage />;
}
