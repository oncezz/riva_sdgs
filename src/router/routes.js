const routes = [
  {
    path: "/not-support",
    component: () => import("pages/notSupport.vue"),
    name: "not-support",
  },
  {
    path: "/download2",
    component: () => import("pages/download2.vue"),
    name: "download2",
  },
  {
    path: "/dataentry",
    component: () => import("pages/login.vue"),
    name: "login",
  },
  {
    path: "/riintragroup",
    component: () => import("pages/ri_intragroup.vue"),
    name: "riintragroup",
  },
  {
    path: "/rieconomypartner",
    component: () => import("pages/ri_economypartner.vue"),
    name: "rieconomypartner",
  },
  // {
  //   path: "/ribuildyourown2",
  //   component: () => import("pages/ri_buildyourown.vue"),
  //   name: "ribuildyourown2",
  // },
  {
    path: "/ribuildyourown",
    component: () => import("pages/ri_buildyourown2.vue"),
    name: "ribuildyourown",
  },
  {
    path: "/ridataavailablity",
    component: () => import("pages/ri_dataavailablity.vue"),
    name: "ridataavailablity",
  },
  {
    path: "/year",
    component: () => import("layouts/MainLayout2.vue"),
    children: [
      {
        path: "/year",
        component: () => import("pages/year.vue"),
        name: "year",
      },
      {
        path: "/data",
        component: () => import("pages/data.vue"),
        name: "data",
      },
      {
        path: "/logout",
        component: () => import("pages/logout.vue"),
        name: "logout",
      },
      {
        path: "/profile",
        component: () => import("pages/profile.vue"),
        name: "profile",
      },
      {
        path: "/profile/edit",
        component: () => import("pages/profileinput.vue"),
        name: "profileEdit",
      },
      {
        path: "/user",
        component: () => import("pages/user.vue"),
        name: "user",
      },
      {
        path: "/userfromweb",
        component: () => import("pages/userfromweb.vue"),
        name: "userfromweb",
      },
      {
        path: "/countrybrief",
        component: () => import("pages/countrybrief.vue"),
        name: "countrybrief",
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/global-value-chains",
        component: () => import("pages/globalValueChains"),
        name: "globalValueChains",
      },
      {
        path: "/regional-integration",
        component: () => import("pages/regionalIntegration"),
        name: "regionalIntegration",
      },
      {
        path: "",
        component: () => import("pages/welcome.vue"),
        name: "landing-page",
      },
      {
        path: "/test",
        component: () => import("pages/welcomex.vue"),
        name: "test",
      },
      {
        path: "/home",
        component: () => import("pages/home.vue"),
        name: "home",
      },
      {
        path: "/involvement/",
        component: () => import("pages/involvement.vue"),
        name: "involvement",
      },
      {
        path: "/about",
        component: () => import("pages/about.vue"),
        name: "about",
      },
      {
        path: "/termOfUse",
        component: () => import("pages/termofuse.vue"),
        name: "termofuse",
      },
      {
        path: "/exports",
        component: () => import("pages/exports.vue"),
        name: "exports",
      },
      {
        path: "/download",
        component: () => import("pages/download2.vue"),
        name: "downloaddata",
      },
      {
        path: "/countrybriefs",
        component: () => import("pages/countrybriefs.vue"),
        name: "countrybriefs",
      },
      {
        path: "/countrybriefs/data/:exp_country?/:year?",
        component: () => import("pages/countrybriefsData.vue"),
        name: "countrybriefsData",
      },
      {
        path: "/gvc-links/:expe?/:year?",
        component: () => import("pages/gvcLinks.vue"),
        name: "gvcLinks",
      },
      {
        path: "/structure-of-value-added/:expe?/:year?/:impe?/:sector?",
        component: () => import("pages/structureOfValueAdded.vue"),
        name: "structureOfValueAdded",
      },
      {
        path: "/participation-in-gvcs/:expe?/:year?/:impe?/:sector?",
        component: () => import("pages/participationInGvcs.vue"),
        name: "participationInGvcs",
      },
      {
        path: "/backward-linkages-by-region",
        component: () => import("pages/backwardLinkagesByRegion.vue"),
        name: "backwardLinkagesRegion",
      },
      {
        path: "/backward-linkages-by-sector",
        component: () => import("pages/backwardLinkagesBySector.vue"),
        name: "backwardLinkagesSector",
      },
      {
        path: "/forward-linkages-by-region",
        component: () => import("pages/forwardLinkagesByRegion.vue"),
        name: "forwardLinkagesRegion",
      },
      {
        path: "/forward-linkages-by-sector",
        component: () => import("pages/forwardLinkagesBySector.vue"),
        name: "forwardLinkagesSector",
      },

      // NEW DESIGN STRUCTURE

      {
        path: "/backward-linkages/:expe?/:year?/:impe?/:sectorOrSource?/:menu?",
        component: () => import("pages/backwardLinkages.vue"),
        name: "backwardLinkages",
      },

      {
        path: "/validation/:id",
        component: () => import("pages/validation.vue"),
        name: "validation",
      },

      //       expe
      // impe
      // year
      // esec
      {
        path: "/forward-linkages/:expe?/:year?/:sectorOrImpe?/:menu?",
        component: () => import("pages/forwardLinkages.vue"),
        name: "forwardLinkages",
      },

      // NOTE : Page test
      // {
      //   path: "/test",
      //   component: () => import("pages/test.vue"),
      //   name: "test"
      // },
      {
        path: "/test1",
        component: () => import("pages/testGraph1.vue"),
        name: "testGraph1",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
