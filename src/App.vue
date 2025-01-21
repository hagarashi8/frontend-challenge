<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
const router = useRoute();
</script>

<template>
  <nav>
    <RouterLink :class="router.path === '/' ? 'active' : 'nonactive'" to="/"
      >Все котики</RouterLink
    >
    <RouterLink
      :class="router.path === '/favorites' ? 'active' : 'nonactive'"
      to="/favorites"
      >Любимые котики</RouterLink
    >
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
nav {
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  box-shadow: rgba(0, 0, 0, 0.15) 0 1.95px 2.6px;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 60px;
  background-color: #2196f3;
}

nav a {
  height: full;
  padding: 20px;
  color: white;
  font-size: 14px;
  text-decoration: none;
}

main {
  margin-top: 80px;
}

.active {
  background: #1e88e5;
}

.nonactive {
  opacity: 0.7;
}
</style>
