import { auth } from "@/utils/firebase";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: LayoutComponent,

  beforeLoad: async () => {
    await auth.authStateReady();

    if (auth.currentUser == null) {
      throw redirect({ to: "/" });
    }
  },
});

function LayoutComponent() {
  return <Outlet />;
}
