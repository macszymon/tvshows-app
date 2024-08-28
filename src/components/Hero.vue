<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <main class="container">
    <img src="https://static.tvmaze.com/uploads/images/original_untouched/514/1285813.jpg" alt="" />
    <h2 >
      Explore <br />
      TV Shows
    </h2>
    <p >Browse though all of the tv shows and find something new to watch.</p>
    <RouterLink to="/shows" className="btn">Start now</RouterLink>
  </main>
</template>

<style scoped>
main {
  align-items: start;
  background: radial-gradient(circle, rgba(0, 0, 0, 0) 0%, var(--color-neutral-500) 70%);
  display: flex;
  height: calc(100dvh - 4.5rem);
  flex-direction: column;
  justify-content: end;
  padding-block: 2rem;
  position: relative;
}

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  object-position: center;
}

h2 {
  color: var(--color-neutral-100);
  font-size: 7.25rem;
  font-weight: 700;
  line-height: 0.8;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

p {
  color: var(--color-neutral-200);
  font-size: 1rem;
  font-weight: 300;
  margin-bottom: 1rem;
}

@media (max-width: 700px) {
  h2 {
    font-size: 5rem
  }
}

@media (max-width: 500px) {
  h2 {
    font-size: 4rem
  }

  p {
    font-size: .9rem
  }
}
</style>
