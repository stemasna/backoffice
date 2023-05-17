<template>
  <q-page padding>
    <div class="q-py-md row justify-between">
      <h2>{{ $t("common.user") }} {{ $t("common.platform") }}</h2>

      <div>
        <q-btn
          color="primary"
          icon="add"
          :label="$t('common.createUser')"
          @click="createUserPlatform"
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
            @click="() => router.push(`Platform/${props.key}`)"
            color="black"
            round
            flat
          />
          <!-- <q-btn
              icon="delete"
              @click="() => deleteUserPlatform(props.key)"
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
  name: "UserPlatformPage",
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
          name: "username",
          label: this.$t("common.username"),
          align: "left",
          field: (row) => row?.username || " - ",
        },
        {
          name: "level",
          label: this.$t("common.level"),
          align: "left",
          field: (row) => row?.level || " - ",
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
          d.surname.includes(this.filter) ||
          d.email.includes(this.filter) ||
          d.username.includes(this.filter) ||
          d.level.includes(this.filter)
      );
    },
  },
  watch: {
    token(newValue) {
      newValue && this.getUserPlatform();
    },
  },
  methods: {
    createUserPlatform() {
      this.router.push({
        name: "PlatformDetail",
        params: {
          id: "new",
        },
      });
    },

    async getUserPlatform() {
      try {
        const { data } = await api.get("Platform", {
          params: {
            limit: 20,
          },
        });
        this.rows = data;
      } catch (e) {
        console.error({ e });
      }
    },
    /*async deleteUserPlatform(id) {
      console.log(id);
      await this.$api
        .delete("/Platform/" + id)
        .then(() => _.remove(this.rows, (r) => r.id === id));
    },*/
  },
  async created() {
    await this.getUserPlatform();
  },
});
</script>
