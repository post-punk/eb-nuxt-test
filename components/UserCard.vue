<template>
  <div
    class="user-card max-w-xs rounded overflow-hidden shadow-lg my-2 bg-white flex flex-col items-center pt-2"
  >
    <img
      class="w-40 rounded"
      :src="userCopy.imageSrc || '/placeholder-image.jpg'"
      alt="User image"
    />

    <div class="px-6 py-4">
      <div class="text-xl mb-2">
        <div>
          <div class="flex flex-col">
            <p class="text-sm">First name:</p>
            <input
              class="pl-2 w-full border rounded bg-white"
              :disabled="!editMode"
              :class="[
                !editMode ? 'border-transparent' : 'border-gray-400',
                { 'border-red-500': !$v.userCopy.firstName.required },
              ]"
              v-model="userCopy.firstName"
            />
            <p
              :class="{
                invisible: $v.userCopy.firstName.required,
              }"
              class="text-red-400 h-6 text-sm"
            >
              First name is required
            </p>
          </div>
        </div>

        <div>
          <div class="flex flex-col">
            <p class="text-sm">Last name:</p>
            <input
              class="pl-2 w-full border rounded bg-white"
              :disabled="!editMode"
              :class="[
                !editMode ? 'border-transparent' : 'border-gray-400',
                { 'border-red-500': !$v.userCopy.lastName.required },
              ]"
              v-model="userCopy.lastName"
            />
            <p
              :class="{ invisible: $v.userCopy.lastName.required }"
              class="text-red-400 h-6 text-sm"
            >
              Last name is required
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="editMode" class="w-full px-6 py-4">
      <button
        class="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-transparent rounded"
        :class="{
          'pointer-events-none opacity-60':
            !$v.userCopy.firstName.required || !$v.userCopy.lastName.required,
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
        v-if="userCopy.id"
        class="text-sm text-red-500 font-medium mb-4 border border-red-500 py-2 px-4 rounded hover:bg-red-500 hover:text-white"
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
      // make a copy of user object,
      // so we don't mutate the store directly:
      userCopy: Object.assign({}, this.user) as UserConfig,
    };
  },
  validations: {
    userCopy: {
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
        this.$emit("applyChanges", this.userCopy);
      }
    },
    deleteUser(selectedUser: UserConfig) {
      if (selectedUser && this.editMode) {
        this.$emit("deleteUser", selectedUser);
      }
    },
    cancelChanges() {
      if (this.editMode) {
        this.userCopy = Object.assign({}, this.user);
      }
    },
  },
});
</script>

<style lang="scss">
.user-card {
}
</style>
