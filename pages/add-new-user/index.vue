<template>
  <div
    class="user-page bg-sky-700 h-screen w-screen p-4 justify-center items-center flex flex-col"
  >
    <nuxt-link
      class="user-page__back-to-button hover:font-medium py-2 px-4 rounded bg-white border border-gray-50 mb-6 cursor-pointer"
      to="/overview"
    >
      ← Back to overview
    </nuxt-link>

    <user-card :edit-mode="true" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UserCard from "@/components/UserCard.vue";

export default Vue.extend({
  components: {
    UserCard,
  },
});
</script>

<style scoped lang="scss">
.user-page {
}
</style>
