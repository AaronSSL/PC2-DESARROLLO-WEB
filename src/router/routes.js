const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "loginold",
        component: () => import("src/components/auth/ListaPelicula.vue"),
      },
    ],
  },
  {
    path: "/peliculas",
    component: () => import("src/components/auth/ListaPelicula.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
