<script setup>
import MoonLoader from "vue-spinner/src/MoonLoader.vue";
import { onMounted, ref, watch } from "vue";
import Card from "@/components/Card.vue";
import ScheduleCard from "@/components/ScheduleCard.vue";

const schedule = ref([]);
const date = ref(new Date());
const loading = ref(true);

async function fetchData() {
  loading.value = true;
  try {
    const res = await fetch(`https://api.tvmaze.com/schedule?date=${date.value.toISOString().slice(0,10)}`);
    const data = await res.json();

    schedule.value = data;
  } catch (err) {
    console.error("Error while trying to fetch schedule", err);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  fetchData();
});
</script>

<template>
  <section v-if="loading" class="spinner">
    <MoonLoader :color="`#fff`" />
  </section>
  <main class="container main" v-else>
    <h2>
      Schedule for {{ date.toLocaleDateString()}}
    </h2>
    <div class="schedule">
      <ScheduleCard v-for="episode in schedule" :showId="episode.show.id" :summary="episode.summary" :season="episode.season" :number="episode.number" :name="episode.name" :airtime="episode.airtime"  :show="episode.show.name" />
    </div>
  </main>
</template>

<style scoped>
.main {
  min-height: 80vh;
  padding-block: 2rem;
}

h2 {
  margin-bottom: 1rem;
}

.schedule {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  margin-bottom: 2rem;
}

button {
  width: 100%;
  margin-inline: auto;
}
</style>
