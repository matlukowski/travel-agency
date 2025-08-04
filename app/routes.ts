import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),
  layout("routes/admin/AdminLayout.tsx", [
    route("dashboard", "routes/admin/dashboard.tsx"),
    route("all-users", "routes/admin/AllUsers.tsx"),
  ]),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
