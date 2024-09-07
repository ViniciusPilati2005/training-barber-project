import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/toaster";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { auth } from "@/utils/firebase";

export const Route = createRootRoute({
  component: () => (
    <>
      <Toaster />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  beforeLoad: async () => {
    await auth.authStateReady();

    const user = auth.currentUser;
    const isLogged = !!user;

    if (!isLogged) return;

    if (!user) throw redirect({ to: "/" });
  },
});
