<script setup lang="ts">
import { computed } from "vue";
import unlikedUrl from "../assets/unliked.svg";
import likedUrl from "../assets/liked.svg";
import hoverUrl from "../assets/hoverHeart.svg";
import { useFavorites, type CatRecord } from "../cat_api";

const hover = `url("${hoverUrl}")`;

defineEmits<{ like: [id: string] }>();

const { record, liked } = defineProps<{ record: CatRecord; liked?: boolean }>();
const likeButton = computed(() => {
  if (!liked) {
    return `url("${unlikedUrl}")`;
  } else {
    return `url("${likedUrl}")`;
  }
});
</script>
<template>
  <div class="img">
    <img class="cat" :src="record.url" />
    <button @click="$emit('like', record.id)" class="likeButton"></button>
  </div>
</template>
<style scoped>
.likeButton {
  width: 48px;
  aspect-ratio: 1;
  background: v-bind(likeButton);
  outline: none;
  border: none;
}

.likeButton:hover {
  background: v-bind(hover);
}

.img > .cat {
  object-fit: cover;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
}

.img {
  padding: 16px;
}

.img:hover {
  padding: 0;
}

.img:hover > .cat {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
