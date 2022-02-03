<template>
  <div class="overview-page flex flex-col p-4 bg-sky-600 min-h-screen">
    <h1 class="text-4xl font-bold mb-4">User list:</h1>
    <nuxt-link
      to="/add-new-user"
      class="w-36 hover:font-medium py-2 px-4 rounded bg-white border border-gray-50 mb-2 cursor-pointer font-medium"
    >
      Add new user
    </nuxt-link>
    <p class="font-medium mb-2">Click on a user card to edit it.</p>

    <!-- grid -->
    <div
      class="overview-page__user-card-wrapper grid grid-cols-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8"
    >
      <div v-for="user in myUserList" :key="user.id">
        <nuxt-link :to="`user/${user.id}`">
          <user-card :user="user" />
        </nuxt-link>
      </div>
    </div>
    <!-- /grid -->
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
    await this.$store.dispatch("setUserList");
    this.myUserList = this.$store.getters.getUserList;
  },
});
</script>
