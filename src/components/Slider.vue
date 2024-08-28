<script setup>
import SliderCard from './SliderCard.vue';

defineProps({
  data: Array,
});
</script>

<template>
  <div class="slider">
    <SliderCard v-for="person in data" :id="person.person.id" :name="person.person.name" :image="person.person.image ? person.person.image.original : 'https://placehold.co/800x1200?text=No+Image&font=poppins'" :role="person.character ? person.character.name : person.type" />
  </div>
</template>

<style scoped>
.slider {
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  scrollbar-color: var(--color-neutral-200) var(--color-neutral-600);
  scrollbar-width: thin;
  overflow-x: auto;
}

.slider::-webkit-scrollbar {
  width: 0.5rem;
}

.slider::-webkit-scrollbar-track {
  background: var(--color-neutral-200);
}

.slider::-webkit-scrollbar-thumb {
  background-color: var(--color-neutral-600);
}
</style>
