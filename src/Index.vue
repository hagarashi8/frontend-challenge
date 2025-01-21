<script setup lang="ts">
import Grid from "./components/Grid.vue";
import { useCats } from "./cat_api";

const { cats, loadCats } = useCats();
loadCats();
</script>

<template>
  <div>
    <Grid @end-reached="loadCats()" :records="cats" />
  </div>
</template>

<style scoped></style>
