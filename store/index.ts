import {
  getterTree,
  mutationTree,
  actionTree,
  getAccessorType,
} from "typed-vuex";
import { userList as mockUserList } from "@/mock-data/user-list";
import { UserConfig } from "@/types/UserConfig";

export const state = () => ({
  userList: [] as UserConfig[],
});

export type RootState = ReturnType<typeof state>;

export const getters = getterTree(state, {
  getUserList: (state) => state.userList,
  getUserById: (state) => (routeId: string) => {
    return state.userList.find(
      (user) => String(user.id).toLowerCase() === routeId
    );
  },
});

enum mutationKeys {
  SET_USER_LIST = "SET_USER_LIST",
  SET_USER = "SET_USER",
  DELETE_USER = "DELETE_USER",
}

export const mutations = mutationTree(state, {
  [mutationKeys.SET_USER_LIST](state, payload: UserConfig[]) {
    state.userList = payload;
  },
  [mutationKeys.SET_USER](state, payload: UserConfig) {
    const existingUser = state.userList.find((user) => user.id === payload.id);
    if (existingUser) {
      state.userList.splice(state.userList.indexOf(existingUser), 1, payload);
    } else {
      // if new user:
      const maxId =
        Math.max(...state.userList.map((user) => Number(user.id))) + 1;
      state.userList.push({ ...payload, id: maxId });
    }
  },
  [mutationKeys.DELETE_USER](state, payload: UserConfig) {
    const userToBeDeleted = state.userList.find(
      (user) => user.id === payload.id
    );

    if (userToBeDeleted) {
      state.userList.splice(state.userList.indexOf(userToBeDeleted), 1);
    }
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    async fetchUserList({ state, commit }): Promise<void> {
      // to avoid unnecessary "requests",
      // populate the user list only if it's empty
      if (!state.userList.length) {
        commit(mutationKeys.SET_USER_LIST, mockUserList);
      }
    },
    setUser({ commit }, payload: UserConfig): void {
      commit(mutationKeys.SET_USER, payload);
    },
    deleteUser({ commit }, payload: UserConfig): void {
      commit(mutationKeys.DELETE_USER, payload);
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
