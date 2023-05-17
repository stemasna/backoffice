<template>
  <q-page padding>
    <div class="q-py-md row justify-between">
      <h2>
        {{ $t("common.management") }} {{ $t("common.artwork") }}
        {{ $t("common.register") }}
      </h2>
      <div>
        <q-btn
          color="primary"
          icon="add"
          :label="$t('common.createArtWork')"
          @click="createArtWorkRegistered"
        />
      </div>
    </div>
    <!-- <div class="q-pa-md row full-width" v-if="token"> -->
    <div class="q-py-md row justify-between">
      <div class="col-4">
        <q-input outlined dense v-model="filter" :label="$t('common.search')">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <q-table
      class="col-12"
      flat
      :rows="filteredData"
      :columns="columns"
      row-key="_id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="edit"
            @click="() => router.push(`ArtWork/${props.key}`)"
            color="black"
            round
            flat
          />
          <!-- <q-btn
              icon="delete"
              @click="() => deleteArtWorkRegistered(props.key)"
              color="primary"
              round
              flat
            /> -->
        </q-td>
      </template>
    </q-table>
    <!-- </div>
    <div v-else>
      <div class="text-h6">
        {{ $t("common.loginRequired") }}
      </div>
    </div> -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import { mapGetters } from "vuex";
//import ConfirmModal from "components/modals/ConfirmModal";

export default defineComponent({
  name: "ArtWorkRegisteredPage",
  setup() {
    return {
      router: useRouter(),
    };
  },
  data() {
    return {
      rows: [],
      filter: "",
      columns: [
        {
          name: "actions",
          align: "left",
        },
        {
          name: "id",
          label: this.$t("common.id"),
          align: "left",
          field: (row) => row?.id || " - ",
        },
        {
          name: "name_artwork",
          label: this.$t("common.name_artwork"),
          align: "left",
          field: (row) => row?.name_artwork || " - ",
        },
        {
          name: "name_artist",
          label: this.$t("common.name_artist"),
          align: "left",
          field: (row) => row?.name_artist || " - ",
        },
        {
          name: "nationality_artist",
          label: this.$t("common.nationality_artist"),
          align: "left",
          field: (row) => row?.nationality_artist || " - ",
        },
        {
          name: "date",
          label: this.$t("common.date"),
          align: "left",
          field: (row) => row?.date || " - ",
        },
        {
          name: "hours",
          label: this.$t("common.hours"),
          align: "left",
          field: (row) => row?.hours || " - ",
        },
        {
          name: "user_registrator",
          label: this.$t("common.user_registrator"),
          align: "left",
          field: (row) => row?.user_registrator || " - ",
        },
        {
          name: "tag",
          label: this.$t("common.tag"),
          align: "left",
          field: (row) => row?.tag || " - ",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["token"]),
    filteredData() {
      if (!this.filter) return this.rows;
      return this?.rows.filter(
        (d) =>
          d.id.includes(this.filter) ||
          d.name.includes(this.filter) ||
          d.price.includes(this.filter)
      );
    },
  },
  watch: {
    token(newValue) {
      newValue && this.getArtWorkRegistered();
    },
  },
  methods: {
    createArtWorkRegistered() {
      this.router.push({
        name: "ArtWorkDetail",
        params: {
          id: "new",
        },
      });
    },

    async getArtWorkRegistered() {
      try {
        const { data } = await api.get("ArtWork", {
          params: {
            limit: 20,
          },
        });
        this.rows = data;
      } catch (e) {
        console.error({ e });
      }
    },
    /*async deleteArtWorkRegistered(id) {
      console.log(id);
      await this.$api
        .delete("/ArtWork/" + id)
        .then(() => _.remove(this.rows, (r) => r.id === id));
    },*/
  },
  async created() {
    await this.getArtWorkRegistered();
  },
});
</script>
