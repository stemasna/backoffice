<template>
  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    bordered
    style="background-color: #fff"
  >
    <!-- inizio  -->
    <q-img class="absolute-top">
      <div class="absolute-bottom bg-transparent">
        <q-item-section>
          <q-img src="../../assets/title.png" />
        </q-item-section>
        <div class="row" style="color: black">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="../../assets/account.png" />
          </q-avatar>
          <div class="column" style="align-self: start">
            <div>username</div>
            <div>ruolo</div>
          </div>
        </div>
      </div>
    </q-img>
    <q-separator background-color="orange" inset></q-separator>
    <!-- fine
    <q-item-section>
      <q-img src="../../assets/title.png" />
    </q-item-section>-->
    <q-scroll-area
      style="
        height: calc(100% - 150px);
        margin-top: 150px;
        border-right: 1px solid #ddd;
      "
    >
      <q-item :to="{ name: 'Platform' }">
        <q-item-section avatar>
          <q-avatar>
            <img src="../../assets/utenti_piattaforma.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          {{ $t("common.user") }} {{ $t("common.platform") }}
        </q-item-section>
      </q-item>

      <q-item
        :to="{ name: 'Managed' }"
        :class="{ 'text-weight-bold': ['b'].includes(route.name) }"
      >
        <q-item-section avatar>
          <q-avatar>
            <img src="../../assets/gestione_utenti.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          {{ $t("common.management") }} {{ $t("common.user") }}
          {{ $t("common.app") }}
        </q-item-section>
      </q-item>
      <q-item
        :to="{ name: 'ArtWork' }"
        :class="{ 'text-weight-bold': ['c'].includes(route.name) }"
      >
        <q-item-section avatar>
          <q-avatar>
            <img src="../../assets/gestione_opere.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          {{ $t("common.management") }} {{ $t("common.artwork") }}
          {{ $t("common.register") }}
        </q-item-section>
      </q-item>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LeftDrawer",
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRouter();

    return {
      router,
      route,
      leftDrawerOpen: computed(() => store.getters.leftDrawerOpen),
    };
  },
});
</script>

<style scoped lang="scss"></style>
