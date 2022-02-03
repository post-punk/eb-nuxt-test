<template>
  <div
    class="user-page bg-sky-700 h-screen w-screen p-4 justify-center items-center flex flex-col"
  >
    <h1 class="text-3xl font-bold mb-4">Create new user:</h1>

    <nuxt-link
      class="user-page__back-to-button hover:font-medium py-2 px-4 rounded bg-white border border-gray-50 mb-6 cursor-pointer"
      to="/overview"
    >
      ← Back to overview
    </nuxt-link>

    <user-card :edit-mode="true" @applyChanges="onApplyChanges" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UserCard from "@/components/UserCard.vue";
import { UserConfig } from "@/types/UserConfig";

export default Vue.extend({
  components: {
    UserCard,
  },
  methods: {
    onApplyChanges(value: UserConfig) {
      console.log(value);
      this.$store.dispatch("setUser", Object.assign({}, value));
      this.$router.push("/overview");
    },
  },
});
</script>

<style scoped lang="scss">
.user-page {
}
</style>
