<template>
  <div
    class="user-page bg-sky-600 h-screen w-screen p-4 justify-start items-start flex flex-col"
  >
    <h1 class="text-4xl font-bold mb-4">Edit user:</h1>
    <nuxt-link
      class="user-page__back-to-button py-2 px-4 rounded bg-white border border-gray-50 mb-2 cursor-pointer font-medium"
      to="/overview"
    >
      &#8592; Back to overview
    </nuxt-link>
    <p class="font-medium mb-2">Click Cancel to revert changes.</p>

    <user-card
      v-if="user && Object.keys(user).length"
      :edit-mode="true"
      :user="user"
      @applyChanges="onApplyChanges"
      @deleteUser="onDeleteUser"
    />
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
  computed: {},
  methods: {
    onApplyChanges(value: UserConfig) {
      this.$store.dispatch("setUser", value);
      this.$router.push("/overview");
    },
    onDeleteUser(value: UserConfig) {
      const promptConfirmed = window.confirm(
        `Are you sure that you want to delete ${value.firstName} ${value.lastName} ?`
      );
      if (promptConfirmed) {
        this.$store.dispatch("deleteUser", value);
      }
      this.$router.push("/overview");
    },
  },
  async mounted() {
    await this.$store.dispatch("setUserList");
    // if the user object isn't already passed in as a prop
    // as is the case on /overview page, find it by route ID
    if (this.$store.getters.getUserList.length) {
      this.user = this.$store.getters.getUserList?.find(
        (user: UserConfig) => String(user.id) === this.$route.params.id
      );
    }
  },
});
</script>

<style scoped lang="scss">
.user-page {
}
</style>
