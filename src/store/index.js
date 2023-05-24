import { createStore, createLogger } from "vuex";
import createPersistedState from "vuex-persistedstate";
import user from "./user";
import app from "./app";
import auth from "./auth";

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const store = createStore({
  modules: {
    user,
    app,
    auth,
  },
  plugins: [
    createLogger(),
    createPersistedState({
      key: "backoffice",
      paths: ["user"],
    }),
  ],
  strict: process.env.DEBUGGING,
});

export default store;
