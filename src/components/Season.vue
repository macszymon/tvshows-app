<script setup>
defineProps({
  data: Object,
});
</script>

<template>
  <div class="season">
    <img v-if="data.image" :src="data.image.original" alt="" />
    <ul class="details">
      <li v-if="data.premiereDate" class="title">Premiere Date</li>
      <li v-if="data.premiereDate">{{ data.premiereDate }}</li>
      <li v-if="data.endDate" class="title">End Date</li>
      <li v-if="data.endDate">{{ data.endDate }}</li>
      <li v-if="data.episodeOrder" class="title">Number of Episodes</li>
      <li v-if="data.episodeOrder">{{ data.episodeOrder }}</li>
      <li v-if="data.summary" class="title">Summary</li>
      <li v-if="data.summary" v-html="data.summary"></li>
    </ul>
  </div>
</template>

<style scoped>
.season {
  align-items: start;
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

img {
  aspect-ratio: 0.7 / 1;
  object-fit: cover;
  width: 10rem;
}

.details {
  display: grid;
  font-size: 0.9rem;
  gap: 1rem;
  grid-template-columns: auto auto;
  list-style: none;
}

.title {
  color: var(--color-neutral-300);
  font-weight: 400;
}

@media (max-width: 600px) {
  .season {
    flex-direction: column;
  }

  img {
    display: none;
  }

  .details {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }

  .details > li:not(:nth-child(odd)) {
    margin-bottom: 0.75rem;
  }
}
</style>
