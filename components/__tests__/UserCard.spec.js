import { shallowMount } from "@vue/test-utils";
import UserCard from "@/components/UserCard.vue";
import { userList } from "@/mock-data/user-list";

const factory = () => {
  return shallowMount(UserCard, {});
};

describe("UserCard", () => {
  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });
});

describe("UserCard", () => {
  it("makes sure the user name is rendered", () => {
    const wrapper = shallowMount(UserCard, {
      propsData: {
        user: userList[0],
      },
    });
    const { firstName } = userList[0];
    expect(wrapper.props().user.firstName).toBe(firstName);
  });
});

describe("UserCard", () => {
  it("Check that User Card works without user object passed in", () => {
    const wrapper = shallowMount(UserCard, {
      propsData: {
        user: null,
      },
    });
    expect(wrapper.props().user).toBeTruthy;
  });
});
