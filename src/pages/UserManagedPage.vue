<template>
  <q-page padding>
    <div class="q-pa-md full-width" v-if="token">
      <div class="q-py-md row justify-between">
        <h2>{{ $t("common.user") }}</h2>
        <div>
          <q-btn
            color="primary"
            icon="add"
            :label="$t('common.createUser')"
            @click="createUserManaged"
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
              @click="() => router.push(`Managed/${props.key}`)"
              color="primary"
              round
              flat
            />
            <q-btn
              icon="delete"
              @click="() => deleteUserManaged(props.key)"
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
import axios from "axios";
import _ from "lodash";
//import ConfirmModal from "components/modals/ConfirmModal";

export default defineComponent({
  name: "UserManagedPage",
  setup() {
    return {
      router: useRouter(),
    };
  },
  data() {
    return {
      rows: [],
      filter: undefined,
      columns: [
        {
          name: "actions",
          align: "left",
        },

        {
          name: "name",
          label: this.$t("common.name"),
          align: "left",
          field: (row) => row?.name || " - ",
        },
        {
          name: "surname",
          label: this.$t("common.surname"),
          align: "left",
          field: (row) => row?.surname || " - ",
        },
        {
          name: "email",
          label: this.$t("common.email"),
          align: "left",
          field: (row) => row?.email || " - ",
        },

        {
          name: "phone",
          label: this.$t("common.phone"),
          align: "left",
          field: (row) => row?.phone || " - ",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["token"]),
    /*
    filteredData() {
      if (!this.filter) return this.rows;
      return this?.rows.filter(
        (d) =>
          d.id.includes(this.filter) ||
          d.name.includes(this.filter) ||
          d.surname.includes(this.filter) ||
          d.email.includes(this.filter) ||
          d.phone.includes(this.filter)
      );
    },*/
    filteredData() {
      if (!this.filter || !this.rows) return this.rows;
      return this.rows.filter((d) => {
        return (
          (d.name && d.name.includes(this.filter)) ||
          (d.surname && d.surname.includes(this.filter)) ||
          (d.email && d.email.includes(this.filter))
          // ||(d.phone && d.phone.includes(this.filter))
        );
      });
    },
  },
  watch: {
    token(newValue) {
      newValue && this.getUserManaged();
    },
  },
  methods: {
    createUserManaged() {
      this.router.push({
        name: "ManagedDetail",
        params: {
          id: "new",
        },
      });
    },

    async getUserManaged() {
      try {
        const { data } = await api.get("user/userlist", {
          params: {
            limit: 40,
          },
        });
        console.log({ data });
        this.rows = data;
      } catch (e) {
        console.error({ e });
      }
    },
    //funzione per eliminare l'utente, funziona
    async deleteUserManaged(id) {
      console.log(id);
      await this.$api
        .delete("user/remove/" + id)
        .then(() => _.remove(this.rows, (r) => r.id === id));
    },
  },
  async created() {
    await this.getUserManaged();
  },
});
</script>
