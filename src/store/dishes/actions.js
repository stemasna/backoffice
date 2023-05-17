import { api } from "boot/axios";

export async function listDishes({ commit }, payload) {
  const { id, name, price } = payload;
  const { data } = await api.post("dishes", { id, name, price }, {});
  // The btoa() method creates a Base64-encoded ASCII string from a binary string
  // (i.e., a string in which each character in the string is treated as a byte of binary data).
  commit("setDishes", data.Dishes);

  return data.Dishes;
}
