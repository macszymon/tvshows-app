<script setup>
import { ref } from 'vue';

defineProps({
  data: Array,
});

const shown = ref(false)

const handleClick = () => {
  shown.value = !shown.value
}

</script>

<template>
  <div v-if="data">
    <button @click="handleClick">Episodes 
      <i v-if="shown" class="pi pi-chevron-up"></i>
      <i v-else class="pi pi-chevron-down"></i>
    </button>
    <ul v-if="shown">
      <li v-for="episode in data">
        <span> {{ episode.number }}. </span>
        <span class="name">
          {{ episode.name }}
        </span>
        <div class="description" v-html="episode.summary"></div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
button {
  align-items: center;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--color-primary);
  color: var(--color-neutral-200);
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.25rem;
  width: 100%;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

li {
  background-color: var(--color-neutral-300-transparent);
  border-radius: 0.25rem;
  display: grid;
  gap: .5rem;
  grid-template-columns: 2rem 1fr;
  padding: 0.75rem;
}

.description {
  color: var(--color-neutral-300);
  grid-column: 2;
  font-weight: 400;
}

.description >>> p {
  font-weight: 400;
}

</style>
