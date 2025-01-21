<script setup lang="ts">
import { onWatcherCleanup, ref, watch, watchEffect } from "vue";
import { useFavorites, type CatRecord } from "../cat_api";
import Image from "./Image.vue";

const cont = ref<HTMLElement | null>(null);

const { records } = defineProps<{ records: CatRecord[] }>();
const emit = defineEmits(["endReached"]);
const reacted = ref(false);

const onScroll = () => {
  if (!cont.value || reacted.value) return;
  if (window.scrollY + window.outerHeight >= cont.value.offsetHeight) {
    emit("endReached");
    reacted.value = true;
  }
};

watch(
  () => records,
  () => {
    reacted.value = false;
    const abort = new AbortController();
    window.addEventListener("scroll", onScroll, { signal: abort.signal });
    onWatcherCleanup(abort.abort.bind(abort));
  },
);

const { toggleFav, isFav } = useFavorites();
</script>
<template>
  <div v-on:scroll="onScroll" ref="cont" class="container">
    <div v-for="record in records" :key="record.id" class="img">
      <Image
        :liked="isFav(record.id).value"
        v-on:like="toggleFav"
        :record="record"
      />
    </div>
  </div>
</template>
<style>
.container {
  place-items: center;
  box-sizing: border-box;
  gap: 16px;
  padding: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  max-width: 100%;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}
</style>
