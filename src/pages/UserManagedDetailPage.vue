<template>
  <q-page padding>
    <div class="row">
      <div class="text-weight-bold text-h4">
        <q-toggle v-model="active">
          <div v-if="active">
            <div class="text-h6">{{ $t("common.active") }}</div>
          </div>
          <div v-else>
            <div class="text-h6">
              {{ $t("common.idle") }}
            </div>
          </div>
        </q-toggle>
        <!-- bottoni annulla e salva -->

        <q-btn
          :label="$t('common.cancel')"
          color="red"
          icon="cancel"
          @click="() => router.back()"
          :loading="loading"
        >
        </q-btn>
        <q-btn
          :label="$t('common.save')"
          color="green"
          icon="check"
          @click="onClickSave"
          :loading="loading"
        />
        <!-- fine bottoni annulla e salva -->
        <div v-if="active">
          <!-- se è attivo fai questo -->
          <!-- bottone di scelta -->

          <!-- parte di admin o registratore -->
          <!-- da far vedere -->
          <!-- admin -->
          <div class="row q-col-gutter-md q-mt-md text-h6">
            <q-input
              class="col-12 col-md-4"
              ref="nameRef"
              :rules="[notEmpty]"
              v-model="UserManaged.name"
              :label="$t('common.name')"
              outlined
              dense
            />
            <q-input
              class="col-12 col-md-4"
              ref="surnameRef"
              :rules="[notEmpty]"
              v-model="UserManaged.surname"
              :label="$t('common.surname')"
              outlined
              dense
            />
            <q-input
              class="col-12 col-md-4"
              ref="emailRef"
              :rules="[notEmpty, validEmail]"
              v-model="UserManaged.email"
              :label="$t('common.email')"
              outlined
              dense
            />
            <q-input
              class="col-12 col-md-4"
              ref="passwordRef"
              :rules="[notEmpty]"
              v-model="UserManaged.password"
              :label="$t('common.password')"
              outlined
              dense
            />
            <q-input
              class="col-12 col-md-4"
              ref="phoneRef"
              :rules="[notEmpty]"
              v-model="UserManaged.phone"
              :label="$t('common.phone')"
              outlined
              dense
            />
            <q-select
              class="col-12 col-md-4"
              v-model="UserManaged.role"
              ref="roleRef"
              :options="options"
              :label="$t('common.choose_role')"
              outlined
              disable
              readonly
              dense
            />
          </div>
          <!-- <q-btn
            outline
            style="color: blue"
            :label="$t('common.reset_password')"
          />
          <q-btn
            outline
            style="color: blue"
            :label="$t('common.delete_account')"
          /> -->
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "UsersDetailPage",
  setup() {
    return {
      router: useRouter(),
      route: useRoute(),
    };
  },
  data() {
    return {
      emailRegex: /^\S+@\S+\.\S+$/,
      active: false,
      admin: false,
      register: false,
      loading: false,
      UserManaged: {
        name: undefined,
        surname: undefined,
        email: undefined,
        phone: undefined,
        password: undefined,
        role: "user",
      },

      nameRef: undefined,
      surnameRef: undefined,
      emailRef: undefined,
      passwordRef: undefined,
      phoneRef: undefined,
      roleRef: undefined,
    };
  },
  methods: {
    async notEmpty(val) {
      return !!val || (await t("common.requiredField"));
    },
    async validEmail(val) {
      return emailRegex.test(val) || (await t("common.invalidEmail"));
    },

    isValid() {
      const fieldsIsValid = [];
      fieldsIsValid.push(this.nameRef.value.validate());
      fieldsIsValid.push(this.surnameRef.value.validate());
      fieldsIsValid.push(this.emailRef.value.validate());
      fieldsIsValid.push(this.passwordRef.value.validate());
      fieldsIsValid.push(this.phoneRef.value.validate());
      this.isAdd.value;

      return fieldsIsValid.every((f) => f === true);
    },

    async createUserManaged() {
      const { data } = await api.post("user/create", this.UserManaged);
      return data;
    },

    async onClickSave() {
      if (this.$route.params.id === "new") {
        try {
          this.loading = true;
          await this.createUserManaged().then((elem) => {
            this.isAdd = elem;
            console.log({ elem });
            this.router.back();
          });
          this.loading = false;
        } catch (e) {
          console.error({ e });
          this.loading = false;
        }
      } else {
        const userId = this.$route.params.id;

        const { data } = await api.put(`user/${userId}`, this.UserManaged);
        console.log({ data });
      }
    },
    async getUserManaged() {
      try {
        const { data } = await api.get(`user/${route.params.id}`);
        return data;
      } catch (e) {
        console.error({ e });
      }
    },
  },
  computed: {
    isAdd() {
      return this.$route.params.id === "new";
    },
  },

  async mounted() {
    //console.log(this.$route.params.id);
    if (this.$route.params.id === "new") {
    } else {
      const userId = this.$route.params.id;
      this.active = true;
      const { data: user } = await api.get(`user/${userId}`);
      //const user = await api.get(`user/read`, userId);
      //console.log({ user });
      this.UserManaged = user;
      //console.log(this.UserManaged);
    }
  },
});
</script>
