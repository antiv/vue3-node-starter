import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/pages/Home.vue";
import Login from "./components/pages/Login.vue";
import Register from "./components/pages/Register.vue";
// lazy-loaded
const Profile = () => import("./components/pages/Profile.vue")
const BoardAdmin = () => import("./components/pages/BoardAdmin.vue")
const BoardModerator = () => import("./components/pages/BoardModerator.vue")
const BoardUser = () => import("./components/pages/BoardUser.vue")
//Tutorials
const Tutorials = () => import("./components/tutorials/TutorialsList.vue")
const Tutorial = () => import("./components/tutorials/Tutorial.vue")
const AddTutorial = () => import("./components/tutorials/AddTutorial")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
  {
    path: "/",
    alias: "/tutorials",
    name: "tutorials",
    component: Tutorials,
  },
  {
    path: "/tutorials/:id",
    name: "tutorial-details",
    component: Tutorial,
  },
  {
    path: "/tutorials/add",
    name: "add-tutorials",
    component: AddTutorial
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;