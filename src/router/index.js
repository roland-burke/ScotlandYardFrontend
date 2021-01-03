import Vue from "vue";
import VueRouter from "vue-router";
import MainMenu from "../views/MainMenu";
import Lobby from "../views/Lobby";
import Game from "../views/Game";
import Test from "../views/Test";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MainMenu",
    component: MainMenu
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/lobby",
    name: "Lobby",
    component: Lobby
  },
  {
    path: "/test",
    name: "Test",
    component: Test
  },
  {
    path: "/game",
    name: "Game",
    component: Game
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
