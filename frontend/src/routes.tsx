import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { PageLayout } from './components/PageLayout';
import { ClientsPage } from './pages/Clients/ClientsPage';
import { DomainsPage } from './pages/Domains/DomainsPage';

const rootRoute = createRootRoute({
  component: PageLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DomainsPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/clients',
  component: ClientsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
]);

export const router = createRouter({
  routeTree,
});