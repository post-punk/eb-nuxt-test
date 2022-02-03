<template>
  <div
    class="user-card max-w-xs rounded overflow-hidden shadow-lg my-2 bg-white flex flex-col items-center"
    :class="{ 'h-64': !editMode }"
  >
    <img
      class="w-40"
      :src="user.imageSrc || '/placeholder-image.jpg'"
      alt="User image"
    />

    <div class="px-6 py-4">
      <div class="text-xl mb-2">
        <div>
          <div v-if="editMode" class="flex flex-col">
            <input
              :class="{ hidden: $v.userData.firstName.$error }"
              class="w-full border border-gray-400"
              v-model="userData.firstName"
            />
            <p
              :class="{ invisible: $v.userData.firstName.required }"
              class="text-red-400 h-6 text-sm"
            >
              First name is necessary
            </p>
          </div>

          <span v-else>
            First name:
            <span class="font-medium">{{ user.firstName }}</span>
          </span>
        </div>

        <div>
          <div v-if="editMode" class="flex flex-col">
            <input
              v-if="editMode"
              class="w-full border border-gray-400"
              v-model="userData.lastName"
            />
            <p
              :class="{ invisible: $v.userData.lastName.required }"
              class="text-red-400 h-6 text-sm"
            >
              Last name is necessary
            </p>
          </div>

          <span v-else>
            Last name:
            <span class="font-medium">{{ user.lastName }}</span>
          </span>
        </div>
      </div>
    </div>

    <div v-if="editMode" class="px-6 py-4">
      <button
        class="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-transparent rounded"
        :class="{
          'pointer-events-none opacity-60':
            !$v.userData.firstName.required || !$v.userData.lastName.required,
        }"
        @click="applyChanges"
      >
        Save
      </button>

      <button
        class="text-sm bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        @click="cancelChanges"
      >
        Cancel
      </button>

      <button
        v-if="user.id"
        class="text-sm text-red-500 font-medium mb-4 border border-red-500 py-2 px-4 rounded hover:bg-red-500 hover:text-white"
        :class="{
          'pointer-events-none opacity-60':
            !$v.userData.firstName.required || !$v.userData.lastName.required,
        }"
        @click="deleteUser(user)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { UserConfig } from "@/types/UserConfig";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default Vue.extend({
  mixins: [validationMixin],
  props: {
    user: {
      type: Object,
      default: () => ({} as UserConfig),
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userData: {} as UserConfig,
    };
  },
  validations: {
    userData: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
    },
  },
  methods: {
    applyChanges() {
      if (this.editMode) {
        this.$store.dispatch("setUser", Object.assign({}, this.userData));
        this.$router.push("/overview");
      }
    },
    cancelChanges() {
      if (this.editMode) {
        this.userData = Object.assign({}, this.user);
      }
    },
    deleteUser(user: UserConfig) {
      if (user) {
        const promptConfirmed = window.confirm(
          `Are you sure that you want to delete ${user.firstName} ${user.lastName} ?`
        );

        if (promptConfirmed) {
          this.$store.dispatch("deleteUser", user);
        }
      }
      this.$router.push("/overview");
    },
  },
  async mounted() {
    await this.$nuxt.$store.dispatch("setUserList");

    // make a copy of user object, so we don't mutate the store directly:
    this.userData = Object.assign({}, this.user);

    // if the user object isn't already passed in as a prop
    // (as is the case on /overview list page), set the user data
    // based on route id, so each user ID page works on refresh:
    if (!this.user?.id) {
      this.userData = Object.assign(
        {},
        this.$store.getters.getUserList.find(
          (user: UserConfig) => String(user.id) === this.$route.params.id
        )
      );
    }
  },
});
</script>

<style lang="scss">
.user-card {
}
</style>
