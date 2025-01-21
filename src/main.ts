import { createApp, type Component } from 'vue'
import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import './style.css'
import App from "./App.vue"
import Index from "./Index.vue"
import Favorites from "./Favorites.vue"

const routes: RouteRecordRaw[]= [
  {path: "/", component: Index},
  {path: "/favorites", component: Favorites}
];

const router = createRouter({routes, history: createMemoryHistory()});

createApp(App).use(router).mount('#app')
