import { s } from "@shared/schemas";
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { PageLayout } from "./components/PageLayout";
import { AnalyticsPage } from "./pages/Analytics/AnalyticsPage";
import { ClientsPage } from "./pages/Clients/ClientsPage";
import { DomainsPage } from "./pages/Domains/DomainsPage";

const rootRoute = createRootRoute({
  component: PageLayout,
});

const domainsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DomainsPage,
});

const clientsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/clients",
  component: ClientsPage,
});

export const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics/$domain",
  params: s.object({
    domain: s.string(),
  }),
  component: AnalyticsPage,
});

const routeTree = rootRoute.addChildren([
  domainsRoute,
  clientsRoute,
  analyticsRoute,
]);

export const router = createRouter({
  routeTree,
});
