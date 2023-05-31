<template>
  <q-page padding>
    <div class="q-pa-md full-width" v-if="token">
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

      <div class="q-py-md row justify-between">
        <div class="col-4">
          <q-input outlined dense v-model="filter" :label="$t('common.search')">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div>
          <q-btn icon="filter_list" round color="primary"></q-btn>
          {{ $t("common.filter") }}
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
              color="primary"
              round
              flat
            />
            <q-btn
              icon="delete"
              @click="() => deleteArtWorkRegistered(props.key)"
              color="red"
              round
              flat
            />
          </q-td>
        </template>
      </q-table>
    </div>
    <div v-else>
      <div class="text-h6">
        {{ $t("common.loginRequired") }}
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import { mapGetters } from "vuex";
import _ from "lodash";
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
          name: "name_artwork",
          label: this.$t("common.name_artwork"),
          align: "left",
          field: (row) => row?.Titolo || " - ",
        },
        {
          name: "name_artist",
          label: this.$t("common.name_artist"),
          align: "left",
          field: (row) => row?.NomeArtista || " - ",
        },
        {
          name: "nationality_artist",
          label: this.$t("common.nationality_artist"),
          align: "left",
          field: (row) => row?.NazionalitaArtista || " - ",
        },
        {
          name: "date",
          label: this.$t("common.date"),
          align: "left",
          field: (row) => {
            return (
              new Date(row?.DataRegistrazione).toLocaleString("it-IT", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }) || " - "
            );
          },
        },
        // {
        //   name: "hours",
        //   label: this.$t("common.hours"),
        //   align: "left",
        //   field: (row) => {
        //     return (
        //       new Date(row?.DataRegistrazione).toLocaleString("it-IT", {
        //         hour: "numeric",
        //         minute: "numeric",
        //         second: "numeric",
        //       }) || " - "
        //     );
        //   },
        // },
        {
          name: "user_registrator",
          label: this.$t("common.user_registrator"),
          align: "left",
          field: (row) => {
            if (row?.paintings_secureKit_utentes.length === 0) {
              return " - ";
            } else {
              return row?.paintings_secureKit_utentes[0].email;
            }
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["token"]),

    filteredData() {
      if (!this.filter || !this.rows) return this.rows;
      return this.rows.filter((d) => {
        return (
          (d.Titolo && d.Titolo.includes(this.filter)) ||
          (d.NomeArtista && d.NomeArtista.includes(this.filter)) ||
          (d.NazionalitaArtista &&
            d.NazionalitaArtista.includes(this.filter)) ||
          (d.DataRegistrazione && d.DataRegistrazione.includes(this.filter)) ||
          (d.hours && d.hours.includes(this.filter)) ||
          (d.user_registrator && d.user_registrator.includes(this.filter))
        );
      });
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
        const { data } = await api.get("paintings", {});
        console.log(data);
        this.rows = data;
      } catch (e) {
        console.error({ e });
      }
    },
    async deleteArtWorkRegistered(id) {
      console.log(id);
      await this.$api
        .delete("paintings/" + id)
        .then(() => _.remove(this.rows, (r) => r.id === id));
    },
  },
  async created() {
    await this.getArtWorkRegistered();
  },
});
</script>
