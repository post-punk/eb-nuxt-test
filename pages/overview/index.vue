<template>
  <div class="overview-page flex flex-col p-4 bg-sky-600 min-h-screen">
    <h1 class="text-4xl font-bold mb-4">User list:</h1>

    <p class="font-medium mb-4">Click on a user card to edit it.</p>
    <nuxt-link
      to="/add-new-user"
      class="w-36 py-2 px-4 mr-2 mb-2 font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
    >
      Add new user
    </nuxt-link>

    <div
      class="overview-page__user-card-wrapper grid grid-cols-auto sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8"
    >
      <div v-for="user in myUserList" :key="user.id">
        <nuxt-link :to="`/user/${user.id}`">
          <user-card v-bind="{ user }" />
        </nuxt-link>
      </div>
    </div>
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
      myUserList: [] as UserConfig[],
    };
  },
  async mounted() {
    await this.$nuxt.$store.dispatch("setUserList");
    this.myUserList = this.$nuxt.$store.getters.getUserList;
  },
});
</script>

<style lang="scss">
.overview-page {
  &__user-card-wrapper {
    // if needed
  }
}
</style>
