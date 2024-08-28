<script setup>
import MoonLoader from "vue-spinner/src/MoonLoader.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import Slider from "@/components/Slider.vue";
import Episodes from "@/components/Episodes.vue";
import Season from "@/components/Season.vue";

const route = useRoute();
const showId = route.params.id;

const show = ref({});
const active = ref(0);
const loading = ref(true);

async function fetchData(id) {
  loading.value = true;
  try {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}?embed[]=episodes&embed[]=cast&embed[]=crew&embed[]=seasons`);
    const data = await res.json();
    show.value = data;
  } catch (err) {
    console.error("Error while trying to fetch show", err);
  } finally {
    loading.value = false;
  }
}

function handleActive(value) {
  active.value = value;
}

onMounted(async () => {
  fetchData(showId);
});
</script>

<template>
  <section v-if="loading" class="spinner">
    <MoonLoader :color="`#fff`" />
  </section>
  <main v-else class="main">
    <img class="image-bg" :src="show.image ? show.image.original : 'https://placehold.co/800x1200?text=No+Image&font=poppins'" alt="" />
    <div class="container">
      <section class="content">
        <aside>
          <img class="image" :src="show.image ? show.image.original : 'https://placehold.co/800x1200?text=No+Image&font=poppins'" alt="" />
        </aside>
        <div>
          <header class="header">
            <div>
              <h1 class="title">
                {{ show.name }}
              </h1>
              <h2 class="subtitle">{{ (show.network ? show.network.name + " &#8901; " : show.webChannel ? show.webChannel.name + " &#8901; " : "") + show.premiered.slice(0, 4) + "-" + (show.ended ? show.ended.slice(0, 4) : "") + " &#8901; " + show.averageRuntime + "m" }}</h2>
            </div>
            <div class="score">
              <i class="star pi pi-star-fill"></i>
              <span>{{ show.rating.average ? show.rating.average : "-" }}</span
              >/10
            </div>
          </header>
          <ul class="details">
            <li v-if="show.premiered" class="details__title">Release Date</li>
            <li v-if="show.premiered">{{ show.premiered }}</li>
            <li v-if="show.genres.length" class="details__title">Genre</li>
            <li v-if="show.genres.length">
              <ul class="genres">
                <li class="genre" v-for="genre in show.genres">{{ genre }}</li>
              </ul>
            </li>
            <li v-if="show.summary" class="details__title">Summary</li>
            <li v-if="show.summary" v-html="show.summary"></li>
            <li v-if="show.language" class="details__title">Language</li>
            <li v-if="show.language">{{ show.language }}</li>
            <li v-if="show._embedded.seasons.length" class="details__title">Number of Seasons</li>
            <li v-if="show._embedded.seasons.length">{{ show._embedded.seasons.filter((season) => season.premiereDate).length }}</li>
            <li v-if="show.type" class="details__title">Type</li>
            <li v-if="show.type">{{ show.type }}</li>
            <li v-if="show.network || show.webChannel.country" class="details__title">Country of Origin</li>
            <li v-if="show.network || show.webChannel.country">{{ show.network ? show.network.country.name : show.webChannel.country }}</li>
          </ul>
        </div>
      </section>
      <section v-if="show._embedded.cast.length" class="section">
        <h3 class="sectionTitle"><span>&#8901;</span> Cast</h3>
        <Slider :data="show._embedded.cast" />
      </section>
      <section v-if="show._embedded.crew.length" class="section">
        <h3 class="sectionTitle"><span>&#8901;</span> Crew</h3>
        <Slider :data="show._embedded.crew" />
      </section>
      <section v-if="show._embedded.seasons.length" class="section">
        <h3 class="sectionTitle"><span>&#8901;</span> Seasons</h3>
        <div class="seasons">
          <ul>
            <li v-for="(season, index) in show._embedded.seasons.filter((season) => season.premiereDate)">
              <button @click="handleActive(index)" :class="active === index ? 'active' : ''">Season {{ season.number }}</button>
            </li>
          </ul>
          <Season :data="show._embedded.seasons[active]" />
          <Episodes v-if="show._embedded.episodes.filter((episode) => episode.season === active + 1).length":data="show._embedded.episodes.filter((episode) => episode.season === active + 1)" />
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.main {
  margin-block: 2rem 4rem;
  position: relative;
}

.image-bg {
  filter: blur(2rem) brightness(0.3);
  top: 0;
  height: 65vh;
  left: 0;
  object-fit: cover;
  object-position: top;
  overflow: hidden;
  position: absolute;
  width: 100%;
  z-index: -1;
}

.header {
  align-items: center;
  display: flex;
  gap: 0.25rem;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.title {
  font-size: 2.25rem;
  line-height: 1;
  max-width: 50vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.subtitle {
  color: var(--color-neutral-300);
  font-size: 1rem;
  font-weight: 400;
}

.score {
  background-color: var(--color-neutral-300-transparent);
  border-radius: 0.25rem;
  color: var(--color-neutral-300);
  font-size: 1.15rem;
  font-weight: 400;
  padding: 0.25rem 1rem;
  text-wrap: nowrap;
}

.score span {
  color: var(--color-neutral-200);
  font-weight: 600;
}

.star {
  color: var(--color-primary);
  margin-right: 0.5rem;
}

.image {
  aspect-ratio: 0.7 / 1;
  object-fit: cover;
  max-width: 20rem;
  width: 100%;
}

.content {
  display: grid;
  gap: 2.5rem;
  grid-template-columns: auto 1fr;
  margin-bottom: 2.25rem;
}

.details {
  display: grid;
  gap: 1rem;
  grid-template-columns: auto auto;
  margin-bottom: 1rem;
  list-style: none;
}

.details__title {
  color: var(--color-neutral-300);
  font-weight: 400;
}

.genres {
  align-items: start;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.genre {
  background-color: var(--color-neutral-300-transparent);
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: 400;
  padding: 0.25rem 0.75rem;
}

.section {
  margin-bottom: 2.25rem;
}

.sectionTitle {
  font-size: 1.75rem;
  font-weight: 400;
  margin-bottom: 1rem;
}

.sectionTitle span {
  color: var(--color-primary);
}

.seasons ul {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  max-width: 90vw;
  scrollbar-color: var(--color-neutral-200) var(--color-neutral-600);
  scrollbar-width: thin;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.seasons ul::-webkit-scrollbar {
  width: 0.5rem;
}

.seasons ul::-webkit-scrollbar-track {
  background: var(--color-neutral-200);
}

.seasons ul::-webkit-scrollbar-thumb {
  background-color: var(--color-neutral-600);
}

.seasons li {
  font-size: 0.9rem;
  font-weight: 400;
  text-wrap: nowrap;
}

.seasons li.active {
  border-bottom: 2px solid var(--color-primary);
}

.seasons button {
  background: transparent;
  border: none;
  color: var(--color-neutral-300);
  padding-bottom: 0.25rem;
}

.seasons button:hover {
  color: var(--color-neutral-200);
}

.seasons button.active {
  border-bottom: 2px solid var(--color-primary);
  color: var(--color-neutral-200);
}

@media (max-width: 1100px) {
  .title {
    max-width: 40vw;
  }
}

@media (max-width: 900px) {
  .title {
    max-width: 30vw;
  }
}

@media (max-width: 800px) {
  .title {
    font-size: 1.25rem;
    max-width: 70vw;
  }

  .content {
    grid-template-columns: 1fr;
  }

  aside {
    align-items: center;
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .title {
    max-width: 55vw;
  }
}

@media (max-width: 500px) {
  .header {
    align-items: flex-start;
    flex-direction: column;
  }

  .details {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }

  .details li:not(:nth-child(odd)) {
    margin-bottom: 0.75rem;
  }
}
</style>
