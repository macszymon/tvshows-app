<script setup>
import MoonLoader from "vue-spinner/src/MoonLoader.vue";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Card from "@/components/Card.vue";

const route = useRoute();
const type = ref(route.params.type);
const query = ref(route.params.query);

const results = ref({});
const loading = ref(true);

async function fetchData() {
  loading.value = true;
  try {
    const res = await fetch(`https://api.tvmaze.com/search/${type.value}/?q=${query.value}`);
    const data = await res.json();
    results.value = data;
  } catch (err) {
    console.error("Error while trying to fetch results", err);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  fetchData();
});

watch(
  () => route.params,
  (newParams) => {
    type.value = newParams.type;
    query.value = newParams.query;

    fetchData();
  }
);
</script>

<template>
  <section v-if="loading" class="spinner">
    <MoonLoader :color="`#fff`" />
  </section>
  <section class="container main" v-else>
    <h2>
      Results for "{{ query }}" <span>{{ results.length }} results</span>
    </h2>
    <div class="noResults" v-if="results.length === 0">No Results Found</div>
    <div v-else-if="type === 'shows'" class="results">
      <Card v-for="result in results" :id="result.show.id" :name="result.show.name" :network="result.show.network ? result.show.network.name : result.show.webChannel ? result.show.webChannel.name : ''" :image="result.show.image ? result.show.image.original : 'https://placehold.co/800x1200?text=No+Image&font=poppins'" :type="type" />
    </div>
    <div v-else-if="type === 'people'" class="results">
      <Card v-for="result in results" :id="result.person.id" :name="result.person.name" :image="result.person.image ? result.person.image.original : 'https://placehold.co/800x1200?text=No+Image&font=poppins'" :type="type" />
    </div>
  </section>
</template>

<style scoped>
.main {
  min-height: 80dvh;
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

.results {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 2rem;
}

.noResults {
    font-size: 3rem;
    margin-top: 5rem;
    text-align: center;
}

@media (max-width: 1000px) {
  .results {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 800px) {
  .results {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 600px) {
  .results {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 450px) {
  .results {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 300px) {
  .results {
    grid-template-columns: repeat(1, 1fr);
  }
}


</style>
