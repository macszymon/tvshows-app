<script setup>
import MoonLoader from "vue-spinner/src/MoonLoader.vue";
import { onMounted, ref, watch } from "vue";
import Card from "@/components/Card.vue";

const page = ref(1);
const shows = ref([]);
const loading = ref(true);

async function fetchData() {
  try {
    const res = await fetch(`https://api.tvmaze.com/shows?page=${page.value}`);
    const data = await res.json();

    if (page.value === 1) {
      shows.value = data;
    } else {
      shows.value = [...shows.value, ...data];
    }

  } catch (err) {
    console.error("Error while trying to fetch show", err);
  } finally {
    loading.value = false;
  }
}

function nextPage() {
  page.value += 1;
}

watch(page, () => {
  fetchData();
});

onMounted(async () => {
  loading.value = true;
  fetchData();
});
</script>

<template>
  <section v-if="loading" class="spinner">
    <MoonLoader :color="`#fff`" />
  </section>
  <section class="container main" v-else>
    <h2>
      All Shows <span>{{ shows.length }} results</span>
    </h2>
    <div class="shows">
      <Card v-for="show in shows" :id="show.id" :name="show.name" :network="show.network ? show.network.name : show.webChannel ? show.webChannel.name : ''" :image="show.image ? show.image.original : 'https://placehold.co/800x1200?text=No+Image&font=poppins'" type="shows" />
    </div>
    <button @click="nextPage" class="btn btn--primary">See More</button>
  </section>
</template>

<style scoped>
.main {
  min-height: 80vh;
  padding-block: 2rem;
}

h2 {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

h2 span {
  color: var(--color-neutral-300);
  font-size: 1rem;
  font-weight: 400;
}

.shows {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 2rem;
}

button {
  width: 100%;
  margin-inline: auto;
}

@media (max-width: 1000px) {
  .shows {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 800px) {
  .shows {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 600px) {
  .shows {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 450px) {
  .shows {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 300px) {
  .shows {
    grid-template-columns: repeat(1, 1fr);
  }
}


</style>
