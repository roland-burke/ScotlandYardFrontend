import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainMenu from "../views/MainMenu.vue";
import Lobby from "../views/Lobby.vue";
import Game from "../views/Game.vue";

const routes: Array<RouteRecordRaw> = [
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
    path: '/lobby',
    name: 'Lobby',
    component: Lobby
},
{
    path: '/game',
    name: 'Game',
    component: Game
}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
