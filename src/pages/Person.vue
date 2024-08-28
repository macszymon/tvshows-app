<script setup>
import MoonLoader from "vue-spinner/src/MoonLoader.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const route = useRoute();
const personId = route.params.id;

const person = ref({});
const castcredits = ref({});
const crewcredits = ref({});
const loading = ref(true);

async function fetchData(id) {
  loading.value = true;
  try {
    let res = await fetch(`https://api.tvmaze.com/people/${id}?embed[]=castcredits&embed[]=crewcredits`);
    let data = await res.json();
    person.value = data;

    res = await fetch(`https://api.tvmaze.com/people/${id}/crewcredits?embed=show`);
    data = await res.json();
    crewcredits.value = data;

    res = await fetch(`https://api.tvmaze.com/people/${id}/castcredits?embed=show`);
    data = await res.json();
    castcredits.value = data;
  } catch (err) {
    console.error("Error while trying to fetch person", err);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  fetchData(personId);
});
</script>

<template>
  <section v-if="loading" class="spinner">
    <MoonLoader :color="`#fff`" />
  </section>
  <main class="main container" v-else>
    <img class="image-bg" :src="person.image ? person.image.original : 'https://placehold.co/800x1200?text=No+Image&font=poppins'" alt="" />
    <section class="content">
      <aside>
        <img class="image" :src="person.image ? person.image.original : 'https://placehold.co/800x1200?text=No+Image&font=poppins'" alt="" />
      </aside>
      <div>
        <header class="header">
          <div>
            <h1 class="title">
              {{ person.name }}
            </h1>
          </div>
        </header>
        <div class="details">
          <li v-if="person.birthday" class="details__title">Birthday</li>
          <li v-if="person.birthday">{{ person.birthday }}</li>
          <li v-if="person.gender" class="details__title">Gender</li>
          <li v-if="person.gender">{{ person.gender }}</li>
          <li v-if="person.country" class="details__title">Nationality</li>
          <li v-if="person.country">{{ person.country.name }}</li>
        </div>
      </div>
    </section>
    <section v-if="castcredits.length" class="section">
      <h3 class="section__title"><span>&#8901;</span> Starred In</h3>
      <ul class="section__list">
        <li class="section__item" v-for="character in castcredits">
          <RouterLink :to="`/shows/${character._embedded.show.id}`">
            {{ character._embedded.show.name }}
            <span>
              {{ character._links.character.name }}
            </span>
          </RouterLink>
        </li>
      </ul>
    </section>
    <section v-if="crewcredits.length" class="section">
      <h3 class="section__title"><span>&#8901;</span> Worked On</h3>
      <ul class="section__list">
        <li class="section__item" v-for="character in crewcredits">
          <RouterLink :to="`/shows/${character._embedded.show.id}`">
            {{ character._embedded.show.name }}
            <span>
              {{ character.type }}
            </span>
          </RouterLink>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.main {
  margin-block: 2rem 4rem;
  position: relative;
  padding-block: 2rem;
}

.image-bg {
  filter: blur(2rem) brightness(0.3);
  top: 0;
  height: 65vh;
  left: 0;
  object-fit: cover;
  object-position: center;
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.image {
  aspect-ratio: 0.7 / 1;
  object-fit: cover;
  width: 20rem;
}

.content {
  display: grid;
  gap: 2.5rem;
  grid-template-columns: auto 1fr;
  margin-bottom: 2.25rem;
}

.details {
  display: grid;
  gap: 1rem 2rem;
  grid-template-columns: auto 1fr;
  margin-bottom: 1rem;
  list-style: none;
}

.details__title {
  color: var(--color-neutral-300);
  font-weight: 400;
}

.section:not(:last-child) {
  margin-bottom: 2.25rem;
}

.section__title {
  font-size: 1.75rem;
  font-weight: 400;
  margin-bottom: 1rem;
}

.section__title span {
  color: var(--color-primary);
}

.section__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section__item a {
  background-color: var(--color-neutral-300-transparent);
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
}

.section__item:hover {
  filter: brightness(.75);
}

.section__item span {
  color: var(--color-neutral-300);
  font-weight: 400;
}

@media (max-width: 800px) {
  .title {
    font-size: 1.25rem;
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
</style>
