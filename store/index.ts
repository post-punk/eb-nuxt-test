import {
  getterTree,
  mutationTree,
  actionTree,
  getAccessorType,
} from "typed-vuex";
import { userList } from "@/mock-data/user-list";
import { UserConfig } from "@/types/UserConfig";

export const state = () => ({
  userList: [] as UserConfig[],
});

export type RootState = ReturnType<typeof state>;

export const getters = getterTree(state, {
  getUserList: (state) => state.userList,
});

enum mutationKeys {
  SET_USER_LIST = "SET_USER_LIST",
}

export const mutations = mutationTree(state, {
  [mutationKeys.SET_USER_LIST](state, payload: UserConfig[]) {
    state.userList = payload;
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    async setUserList({ state, commit }): Promise<void> {
      // to avoid needless "requests",
      // populate the user list only if it's empty
      if (!state.userList.length) {
        commit(mutationKeys.SET_USER_LIST, userList);
      }
    },
    setUser({ state, commit }, payload: UserConfig): void {
      const userListCopy = [...state.userList];

      const existingUser = userListCopy.find((user) => user.id === payload.id);

      if (existingUser) {
        userListCopy.splice(userListCopy.indexOf(existingUser), 1, payload);
      } else {
        // if new user:
        const maxIndex =
          Math.max(...userListCopy.map((user) => Number(user.id))) + 1;
        userListCopy.push({ ...payload, id: maxIndex });
      }

      commit(mutationKeys.SET_USER_LIST, userListCopy);
    },
    deleteUser({ state, commit }, payload: UserConfig): void {
      const userListCopy = [...state.userList];

      const userToBeDeleted = userListCopy.find(
        (user) => user.id === payload.id
      );

      if (userToBeDeleted) {
        userListCopy.splice(userListCopy.indexOf(userToBeDeleted), 1);
      }

      commit(mutationKeys.SET_USER_LIST, userListCopy);
    },
  }
);

export const storeHelper = {
  state,
  getters,
  mutations,
  actions,
  modules: {},
};

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType(storeHelper);
