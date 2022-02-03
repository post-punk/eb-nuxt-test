<template>
  <div class="flex flex-col p-4">
    <h1 class="font-bold text-lg">
      Welcome! (this should be invisible because of the middleware redirect)
    </h1>
    <span>
      Go to
      <nuxt-link to="/overview" class="underline">overview.</nuxt-link>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  middleware({ redirect }) {
    return redirect("/overview");
  },
});
</script>
