<template>
  <div
    class="user-page bg-sky-700 h-screen w-screen p-4 justify-center items-center flex flex-col"
  >
    <h1 class="text-3xl font-bold mb-4">Edit user:</h1>

    <nuxt-link
      class="user-page__back-to-button hover:font-medium py-2 px-4 rounded bg-white border border-gray-50 mb-6 cursor-pointer"
      to="/overview"
    >
      ← Back to overview
    </nuxt-link>

    <user-card :edit-mode="true" :user="user" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { UserConfig } from "@/types/UserConfig";
import UserCard from "@/components/UserCard.vue";

export default Vue.extend({
  components: {
    UserCard,
  },
  data() {
    return {
      user: {} as UserConfig,
    };
  },
  async mounted() {
    await this.$nuxt.$store.dispatch("setUserList");

    this.user = this.$store.getters.getUserList.find(
      (user: UserConfig) => String(user.id) === this.$route.params.id
    );
  },
});
</script>

<style scoped lang="scss">
.user-page {
}
</style>
