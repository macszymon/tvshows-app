<script setup>
import Logo from "@/components/Logo.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <footer>
    <div class="wrapper container">
      <Logo />
      <ul>
        <li>
          <RouterLink class="link" to="/shows"> TV Shows </RouterLink>
        </li>
        <li>
          <RouterLink class="link" to="/schedule"> Schedule </RouterLink>
        </li>
      </ul>
      <div class="attribution">
        <p>Data provided by <a target="_blank" href="https://www.tvmaze.com/api">TVMaze</a>.</p>
        <p>Created by <a target="_blank" href="https://github.com/macszymon">Szymon Mackiewicz</a>.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: var(--color-neutral-600);
}

.wrapper {
  align-items: start;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-block: 1rem;
}

ul {
  display: flex;
  gap: 2rem;
}

.attribution p {
  color: var(--color-neutral-300);
  font-weight: 300;
}

p a:hover {
  text-decoration: underline;
}
</style>
