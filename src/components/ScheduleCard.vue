<script setup>
import { RouterLink } from "vue-router";

defineProps({
  showId: Number,
  show: String,
  name: String,
  summary: String,
  number: Number,
  season: Number,
  airtime: String,
});
</script>

<template>
  <RouterLink class="card" :to="`/shows/${showId}`">
    <aside>
      <h4 class="time" v-if="airtime">{{ airtime }}</h4>
      <h4 class="season" v-if="season">Season {{ season }}.</h4>
      <h4 class="episode" v-if="number">Episode {{ number }}.</h4>
    </aside>
    <div>
      <h1>{{ show }}</h1>
      <h2>{{ name }}</h2>
      <p v-html="summary"></p>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  align-items: start;
  display: grid;
  gap: 1rem;
  grid-template-columns: 8rem 1fr;
  transition: .3s ease-in-out;
}

.card:hover {
    transform: scale(1.01);
}

h1 {
  color: var(--color-neutral-100);
  font-size: 1.75rem;
}

h2 {
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: .5rem;
}

aside {
  align-items: center;
  background-color: var(--color-neutral-300-transparent);
  border-radius: 0.25rem;
  color: var(--color-neutral-200);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.time {
  background-color: var(--color-primary);
  color: var(--color-neutral-600);
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  padding: 0.5rem;
  width: 100%;
  opacity: .9;
}

.season {
    padding-top: 0.5rem;
    font-weight: 400;
}

.episode {
    padding: 0.5rem;
    font-weight: 400;
}

p >>> p {
    font-weight: 300
}

@media (max-width: 600px) {
    h1 {
        font-size: 1.25rem;
    }

    h2 {
        font-size: .9rem;
    }

    p >>> p {
    font-size: .9rem;
}
}

</style>
