<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card flat bordered style="border-radius: 0.5rem" class="q-pa-md">
        <div class="row justify-center">
          <div class="row text-weight-bold text-h6">
            <q-btn
              unelevated
              icon="chevron_left"
              @click="() => router.back()"
              :loading="loading"
            />

            <div class="row">{{ $t("common.assoicate_title") }}</div>
          </div>
        </div>
        <div class="row q-col-gutter-md q-mt-md">
          <q-input
            class="col-12 col-md-12"
            ref="nameRef"
            :rules="[notEmpty]"
            v-model="code.artQr"
            :label="$t('common.cod_id_tag')"
            outlined
            dense
          />
          <q-input
            class="col-12 col-md-12"
            ref="certRef"
            :rules="[notEmpty]"
            v-model="code.certQr"
            :label="$t('common.cod_cert')"
            outlined
            dense
          />
          <q-input
            class="col-12 col-md-12"
            ref="serieRef"
            :rules="[notEmpty]"
            v-model="code.Serie"
            :label="$t('common.number_serie')"
            outlined
            dense
          />
        </div>
      </q-card>
      <q-card-actions>
        <q-btn
          color="primary"
          :label="$t('common.save_prosegui')"
          @click="onClickSave"
          :loading="loading"
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
import { api } from "boot/axios";

export default defineComponent({
  name: "AssociatetagModal",
  props: ["id"],
  emits: [...useDialogPluginComponent.emits],
  setup() {
    return {
      dialogRef: useDialogPluginComponent(),
      onDialogHide: useDialogPluginComponent(),
      onDialogOK: useDialogPluginComponent(),
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
      code: {
        artQr: undefined,
        certQr: undefined,
        Serie: undefined,
      },
      nameRef: undefined,
      certRef: undefined,
      seriesRef: undefined,
    };
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },
    async notEmpty(val) {
      return !!val || (await t("common.requiredField"));
    },
    isValid() {
      const fieldsIsValid = [];
      fieldsIsValid.push(nameRef.value.validate());
      this.isAdd.value;

      return fieldsIsValid.every((f) => f === true);
    },
    async createCodTag() {
      const id = this.id;
      console.log(this.id);
      const { data } = await api.post(`securekits/${id}`, this.code);
      return data;
    },
    async onClickSave() {
      try {
        this.loading = true;
        await this.createCodTag().then((elem) => {
          console.log({ elem });
          this.router.back();
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

<style scoped lang="scss"></style>
