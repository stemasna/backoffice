import { api } from "boot/axios";

export async function login({ commit }, payload) {
  const { email, password } = payload;
  const { data } = await api.post(
    "auth/login",
    { username: email, password },
    {}
  );

  commit("setToken", data.access_token);

  return data.user;
}

export async function logout({ commit }) {
  commit("setToken", null);
  commit("setDetails", {});
}
