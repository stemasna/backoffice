<template>
  <q-page padding>
    <div class="row">
      <div class="text-weight-bold text-h4">
        qui ci andra id e nome
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
              ref="idRef"
              :rules="[notEmpty]"
              v-model="UserManaged.id"
              :label="$t('common.id')"
              outlined
              dense
            />
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
              :rules="[notEmpty]"
              v-model="UserManaged.email"
              :label="$t('common.email')"
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
          </div>
          <q-btn
            outline
            style="color: blue"
            :label="$t('common.reset_password')"
          />
          <q-btn
            outline
            style="color: blue"
            :label="$t('common.delete_account')"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { api } from "boot/axios";
import { useRouter, useRoute } from "vue-router";
import { t } from "boot/i18n";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "UserManagedDetailPage",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const loading = ref(false);
    const idRef = ref(null);
    const nameRef = ref(null);
    const priceRef = ref(null);

    const isAdd = computed(() => route.params.id === "new");

    const UserManaged = ref({
      id: undefined,
      name: undefined,
      price: undefined,
    });

    const notEmpty = (val) => !!val || t("common.requiredField");

    const isValid = () => {
      const fieldsIsValid = [];
      fieldsIsValid.push(idRef.value.validate());
      fieldsIsValid.push(nameRef.value.validate());
      fieldsIsValid.push(priceRef.value.validate());
      isAdd.value;

      return fieldsIsValid.every((f) => f === true);
    };

    const createUserManaged = async () => {
      const { data } = await api.post("Managed", UserManaged.value);
      return data;
    };

    const updateUserManaged = async () => {
      const { id } = route.params;
      const { data } = await api.put(`Managed/${id}`, UserManaged.value);
      return data;
    };

    const onClickSave = async () => {
      if (!isValid()) return;
      try {
        loading.value = true;
        isAdd.value ? await createUserManaged() : await updateUserManaged();
        loading.value = false;
        router.back();
      } catch (e) {
        console.error({ e });
        loading.value = false;
      }
    };

    const getUserManaged = async () => {
      try {
        if (isAdd.value) {
          return;
        }
        const { data } = await api.get(`Managed/${route.params.id}`);
        UserManaged.value = { ...data };
      } catch (e) {
        console.error({ e });
      }
    };

    getUserManaged();

    return {
      router,
      route,
      UserManaged,
      loading,
      notEmpty,
      onClickSave,
      nameRef,
      priceRef,
      isAdd,
      admin: ref(false),
      register: ref(false),
      active: ref(false),
    };
  },
});
</script>
