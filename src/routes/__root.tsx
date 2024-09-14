import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/toaster";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { auth } from "@/utils/firebase";
import {
  ROUTE_LOGIN,
  ROUTE_LOGIN_REGEX,
  ROUTE_MAIN,
  ROUTE_MAIN_REGEX,
  ROUTE_RESET_PASSWORD_REGEX,
} from "@/constants/routes";

export const Route = createRootRoute({
  component: () => (
    <>
      <Toaster />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  beforeLoad: async ({ location }) => {
    await auth.authStateReady();

    const user = auth.currentUser;
    const isLogged = !!user;
    const route = location.pathname;

    if (!isLogged && ROUTE_MAIN_REGEX.test(route)) {
      throw redirect({ to: ROUTE_LOGIN });
    }

    if (!isLogged) return;

    if (isLogged && ROUTE_RESET_PASSWORD_REGEX.test(route)) {
      throw redirect({ to: ROUTE_LOGIN });
    }

    if (ROUTE_LOGIN_REGEX.test(route) && isLogged) {
      throw redirect({ to: ROUTE_MAIN });
    }
  },
});
