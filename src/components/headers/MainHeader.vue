<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        class="text-weight-bold"
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />
      <q-space />
      <div class="row">
        <q-btn v-if="!token" :label="$t('common.login')" flat @click="login" />
        <q-btn
          v-if="!!token"
          :label="$t('common.logout')"
          flat
          @click="logout"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import LoginModal from "components/modals/LoginModal";
import { t } from "boot/i18n";

export default defineComponent({
  name: "MainHeader",
  data() {
    const store = useStore();
    const $q = useQuasar();

    const token = computed(() => store.getters.token);

    const toggleLeftDrawer = () => store.commit("toggleLeftDrawer");

    const logout = async () => {
      await store.dispatch("logout");
      $q.notify({
        message: t("common.disconnected"),
        color: "warning",
      });
    };

    const login = () => {
      $q.dialog({ component: LoginModal });
    };

    return {
      toggleLeftDrawer,
      logout,
      login,
      token,
    };
  },
  methods: {},
  computed: {},
  created() {},
});
</script>

<style scoped lang="scss"></style>
