<script setup>
import Logo from "@/components/Logo.vue";
import router from "@/router";
import { ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

const searchType = ref("shows");
const query = ref("");
const active = ref(false);

const route = useRoute();

const handleActive = () => {
  active.value = !active.value;
};

const handleSubmit = () => {
  router.push({ name: "search", params: { type: searchType.value, query: query.value } });
  query.value = "";
};

watch(route, () => {
  active.value = false;
});

</script>

<template>
  <header>
    <div class="wrapper container">
      <button class="hamburger" @click="handleActive">
        <i :class="'pi ' + (active ? 'pi-times' : 'pi-bars')"></i>
      </button>
      <Logo />
      <nav :class="active ? 'active' : ''">
        <ul>
          <li>
            <RouterLink class="link" to="/shows"> TV Shows </RouterLink>
          </li>
          <li>
            <RouterLink class="link" to="/schedule"> Schedule </RouterLink>
          </li>
        </ul>
      </nav>
      <form @submit.prevent="handleSubmit">
        <select id="cars" v-model="searchType">
          <option value="shows">TV Shows</option>
          <option value="people">People</option>
        </select>
        <input type="text" v-model="query" />
        <i class="pi pi-search"></i>
      </form>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: var(--color-neutral-600);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.wrapper {
  align-items: center;
  display: grid;
  gap: 2rem;
  grid-template-columns: auto auto 1fr;
  padding-block: 1rem;
}

ul {
  align-items: center;
  box-shadow: none;
  display: flex;
  gap: 1.25rem;
  width: 100%;
  padding: 0;
  text-align: center;
  transition: none;
}

form {
  align-items: center;
  background-color: var(--color-neutral-400);
  border-radius: 0.25rem;
  box-shadow: var(--color-neutral-600) 0px 2px 8px 0px;
  color: var(--color-neutral-200);
  display: grid;
  gap: 0.35rem;
  grid-template-columns: auto 1fr auto;
  padding: 0rem 1rem;
  transition: 0.3s ease-in-out;
}

form:hover {
  background-color: var(--color-neutral-200);
  color: var(--color-neutral-600);
}

form:focus-within {
  background-color: var(--color-neutral-200);
  color: var(--color-neutral-600);
}

form i {
  color: inherit;
  font-size: 0.9rem;
}

input {
  background-color: transparent;
  border: none;
  color: inherit;
  width: 100%;
  padding-block: .5rem;
}

select {
  background-color: transparent;
  border: none;
  color: var(--color-neutral-200);
  cursor: pointer;
  outline: none;
}

form:hover select,
form:focus-within select {
  color: var(--color-neutral-600);
}

.hamburger {
  display: none;
}

@media (max-width: 600px) {
  .active {
    right: 0;
  }

  .wrapper {
    gap: 1rem;
  }

  nav {
    background-color: var(--color-neutral-600);
    position: absolute;
    right: 100%;
    top: 100%;
    transition: .3s ease-in-out;
    width: 100%;
    z-index: 10;
  }

  ul {
    align-items: stretch;
    border-bottom: 1px solid var(--color-neutral-300);
    padding: 1rem;
    flex-direction: column;
  }

  li {
    text-align: left;
  }

  .hamburger {
    align-items: center;
    background-color: transparent;
    border: none;
    color: var(--color-neutral-200);
    display: flex;
    font-size: 1.5rem;
    height: 1.5rem;
    justify-content: center;
    width: 1.5rem;
  }
}
</style>
