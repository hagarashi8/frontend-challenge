<script setup lang="ts">
import Grid from "./components/Grid.vue";
import { useCats, useFavorites } from "./cat_api";
import { onWatcherCleanup, ref, watch } from "vue";

const localFavs = ref([]);

const { getCat } = useCats();
const { favs } = useFavorites();
const k = watch(
  favs,
  () => {
    const abort = new AbortController();
    favs.value.forEach((c) => {
      getCat(c, abort.signal).then((val) => {
        localFavs.value = localFavs.value.concat([val]);
      });
    });
    onWatcherCleanup(() => {
      abort.abort();
    });
  },
  { immediate: true },
);
</script>

<template>
  <div>
    <Grid :records="localFavs" />
  </div>
</template>

<style scoped></style>
