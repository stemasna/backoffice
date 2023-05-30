<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card flat bordered style="border-radius: 0.5rem" class="q-pa-md">
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
            :type="isPwd ? 'password' : 'text'"
            class="col-12 col-md-12"
            ref="passwordRef"
            :rules="[notEmpty]"
            @keyup.enter="onClickSave"
            v-model="user.password"
            :label="$t('common.password')"
            outlined
            dense
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
      </q-card>
      <q-card-actions align="right">
        <q-btn
          color="primary"
          label="OK"
          @click="onClickSave"
          :loading="loading"
        />
        <q-btn
          color="primary"
          :label="$t('common.cancel')"
          @click="onCancelClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent, useQuasar } from "quasar";
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { t } from "boot/i18n";
import { useStore } from "vuex";

export default defineComponent({
  name: "LoginModal",
  emits: [...useDialogPluginComponent.emits],
  setup() {
    return {
      dialogRef: useDialogPluginComponent(),
      onDialogHide: useDialogPluginComponent(),
      //onDialogOK: useDialogPluginComponent(),
      onDialogCancel: useDialogPluginComponent(),
      $q: useQuasar(),
      router: useRouter(),
      store: useStore(),
      route: useRoute(),
    };
  },
  data() {
    return {
      loading: false,
      emailRegex: /^\S+@\S+\.\S+$/,
      user: {
        email: undefined,
        password: undefined,
      },
      emailRef: undefined,
      passwordRef: undefined,
      isPwd: true,
    };
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialogRef.hide();
    },
    async notEmpty(val) {
      return !!val || (await t("common.requiredField"));
    },
    async validEmail(val) {
      return this.emailRegex.test(val) || (await t("common.invalidEmail"));
    },
    isValid() {
      const fieldsIsValid = [];

      fieldsIsValid.push(this.emailRef.value.validate());
      fieldsIsValid.push(this.passwordRef.value.validate());

      return fieldsIsValid.every((f) => f === true);
    },
    async onClickSave() {
      try {
        this.loading = true;
        await this.store.dispatch("login", this.user);
        this.$q.notify({
          message: this.$t("common.welcome"),
        });
        this.onDialogOK();
        this.loading = false;
      } catch (e) {
        console.error({ e });
        this.loading = false;
      }
    },
    onDialogOK() {
      this.router.back();
    },
    async onCancelClick() {
      this.router.back();
    },
  },
});
</script>

<style scoped lang="scss"></style>
