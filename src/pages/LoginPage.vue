<template>
  <q-page padding class="full-height row flex items-center justify-center">
    <q-card
      flat
      class="col-12 col-md-4 q-pa-md q-py-lg"
      bordered
      style="border-radius: 0.5rem"
    >
      <div class="row justify-center">
        <div class="text-weight-bold text-h4">
          {{ $t("common.login") }}
        </div>
      </div>
      <div class="row q-col-gutter-md q-mt-md">
        <q-input
          class="col-12 col-md-12"
          ref="emailRef"
          :rules="[notEmpty, validEmail]"
          v-model="user.email"
          :label="$t('common.email')"
          outlined
          dense
        />
        <q-input
          class="col-12 col-md-12"
          ref="passwordRef"
          :rules="[notEmpty]"
          v-model="user.password"
          :label="$t('common.password')"
          outlined
          dense
        />
      </div>
      <div class="row q-mt-md justify-center">
        <q-btn
          :label="$t('common.login')"
          color="primary"
          @click="onClickSave"
          :loading="loading"
        />
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { t } from "boot/i18n";
import { useStore } from "vuex";

export default defineComponent({
  name: "LoginPage",
  setup() {
    return {
      emailRegex: /^\S+@\S+\.\S+$/,
      router: useRouter(),
      store: useStore(),
      route: useRoute(),
    };
  },
  data() {
    return {
      loading: false,
      user: {
        email: undefined,
        password: undefined,
      },
      emailRef: undefined,
      passwordRef: undefined,
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

      fieldsIsValid.push(this.emailRef.value.validate());
      fieldsIsValid.push(this.passwordRef.value.validate());

      return fieldsIsValid.every((f) => f === true);
    },
    async createLogin() {
      const { data } = await api.post("login", this.user);
      return data;
    },
    async onClickSave() {
      try {
        this.loading = true;
        await this.createLogin().then((elem) => {
          router.push({ name: "UserPlatformPage" });
        });
        this.loading = false;
      } catch (e) {
        console.error({ e });
        this.loading = false;
      }
    },
  },
});
</script>
