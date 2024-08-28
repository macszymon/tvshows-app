<script setup>
import logo from "@/assets/images/logo.png";
import { RouterLink } from "vue-router";
</script>

<template>
  <RouterLink class="logo" to="/">
    <img class="logo__img" :src="logo" alt="Best Shows Logo" />
  </RouterLink>
</template>