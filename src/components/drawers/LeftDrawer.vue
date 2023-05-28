<template>
  <q-drawer
    v-model="open"
    show-if-above
    bordered
    :breakpoint="600"
    :width="280"
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
            {{ details.name }} {{ details.surname }}
            <div>{{ details.role }}</div>
          </div>
        </div>
      </div>
    </q-img>

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
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "LeftDrawer",
  setup() {
    const store = useStore();
    const toggleLeftDrawer = (v) => store.commit("setLeftDrawer", v);
    const open = ref();
    return {
      router: useRouter(),
      route: useRoute(),
      leftDrawerOpen: computed(() => store.getters.leftDrawerOpen),
      open,
      toggleLeftDrawer,
    };
  },

  computed: {
    ...mapGetters(["details"]),
  },
  watch: {
    leftDrawerOpen: {
      deep: true,
      handler(newValue) {
        this.open = newValue;
        console.log(newValue, this.open);
      },
    },
    open: {
      deep: true,
      handler(newValue) {
        this.toggleLeftDrawer(newValue);
      },
    },
  },
});
</script>

<style scoped lang="scss"></style>
