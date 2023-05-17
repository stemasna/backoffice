const routes = [
  {
    path: "/onboarding",
    component: () => import("layouts/OnBoardingLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "Managed",
        children: [
          {
            path: "",
            name: "Managed",
            component: () => import("pages/UserManagedPage.vue"),
          },
          {
            path: ":id",
            name: "ManagedDetail",
            component: () => import("pages/UserManagedDetailPage.vue"),
          },
        ],
      },
      {
        path: "Platform",
        children: [
          {
            path: "",
            name: "Platform",
            component: () => import("pages/UserPlatformPage.vue"),
          },
          {
            path: ":id",
            name: "PlatformDetail",
            component: () => import("pages/UserPlatformDetailPage.vue"),
          },
        ],
      },
      {
        path: "ArtWork",
        children: [
          {
            path: "",
            name: "ArtWork",
            component: () => import("pages/ArtWorkRegisteredPage.vue"),
          },
          {
            path: ":id",
            name: "ArtWorkDetail",
            component: () => import("pages/ArtWorkRegisteredDetailPage.vue"),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
