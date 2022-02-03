<template>
  <div
    class="user-page bg-sky-600 h-screen w-screen p-4 justify-start items-start flex flex-col"
  >
    <h1 class="text-4xl font-bold mb-4">Create new user:</h1>
    <nuxt-link
      class="user-page__back-to-button py-2 px-4 rounded bg-white border border-gray-50 cursor-pointer font-medium mb-10"
      to="/overview"
    >
      &#8592; Back to overview
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
