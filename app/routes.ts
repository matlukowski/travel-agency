import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/admin/AdminLayout.tsx", [
    route("/", "routes/admin/dashboard.tsx"),
    route("dashboard", "routes/admin/dashboard.tsx"),
    route("all-users", "routes/admin/AllUsers.tsx"),
  ]),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
