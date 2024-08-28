<script setup>
import { RouterLink } from "vue-router";

defineProps({
  id: Number,
  type: String,
  name: String,
  image: String,
  network: String,
});
</script>

<template>
  <RouterLink :to="`/${type}/${id}`">
    <img :src="image" alt="" />
    <h1>{{ name }}</h1>
    <h2>{{ network }}</h2>
  </RouterLink>
</template>

<style scoped>
h1,
h2 {
  max-width: 13vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

h1 {
  font-size: 1rem;
}

h2 {
  color: var(--color-neutral-300);
  font-size: 0.9rem;
}

img {
  aspect-ratio: 0.7 / 1;
  object-fit: cover;
  width: 100%;
}

@media (max-width: 1000px) {
  h1,
  h2 {
    max-width: 15vw;
  }
}

@media (max-width: 800px) {
  h1,
  h2 {
    max-width: 18vw;
  }
}

@media (max-width: 600px) {
  h1,
  h2 {
    max-width: 24vw;
  }
}

@media (max-width: 450px) {
  h1,
  h2 {
    max-width: 35vw;
  }
}

@media (max-width: 250px) {
  h1,
  h2 {
    max-width: 50vw;
  }
}
</style>
