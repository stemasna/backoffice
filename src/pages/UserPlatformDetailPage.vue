<template>
  <q-page padding>
    <div class="row">
      <div class="text-weight-bold text-h4">
        {{ $t("common.create") }} {{ $t("common.user") }}

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
          <div class="q-pa-md text-h4">
            {{ $t("common.level") }}
            <div class="q-gutter-sm">
              <q-radio
                v-model="admin"
                val="admin"
                :label="$t('common.admin')"
              />
              <q-radio
                v-model="register"
                val="register"
                :label="$t('common.recorder')"
              />
            </div>
          </div>

          <!-- parte di admin o registratore -->
          <!-- da far vedere -->
          <div v-if="admin">
            <!-- admin -->
            <div class="row q-col-gutter-md q-mt-md text-h6">
              <q-input
                class="col-12 col-md-4"
                ref="nameRef"
                :rules="[notEmpty]"
                v-model="UserPlatform.name"
                :label="$t('common.name')"
                outlined
                dense
              />
              <q-input
                class="col-12 col-md-4"
                ref="surnameRef"
                :rules="[notEmpty]"
                v-model="UserPlatform.surname"
                :label="$t('common.surname')"
                outlined
                dense
              />
              <q-input
                class="col-12 col-md-4"
                ref="emailRef"
                :rules="[notEmpty]"
                v-model="UserPlatform.email"
                :label="$t('common.email')"
                outlined
                dense
              />
            </div>
          </div>
          <div v-if="register">
            <div class="text-h6">
              <!-- registratore -->
              <div class="row q-col-gutter-md q-mt-md">
                <q-input
                  class="col-12 col-md-4"
                  ref="nameRef"
                  :rules="[notEmpty]"
                  v-model="UserPlatform.name"
                  :label="$t('common.name')"
                  outlined
                  dense
                />
                <q-input
                  class="col-12 col-md-4"
                  ref="surnameRef"
                  :rules="[notEmpty]"
                  v-model="UserPlatform.surname"
                  :label="$t('common.surname')"
                  outlined
                  dense
                />
                <q-input
                  class="col-12 col-md-4"
                  ref="emailRef"
                  :rules="[notEmpty]"
                  v-model="UserPlatform.email"
                  :label="$t('common.email')"
                  outlined
                  dense
                />
                <q-input
                  class="col-12 col-md-4"
                  ref="phoneRef"
                  :rules="[notEmpty]"
                  v-model="UserPlatform.phone"
                  :label="$t('common.phone')"
                  outlined
                  dense
                />
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="text-h6">
            <!-- se non è attivo  -->
            Attivare account
          </div>
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
  name: "UserPlatformDetailPage",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const loading = ref(false);
    const idRef = ref(null);
    const nameRef = ref(null);
    const priceRef = ref(null);

    const isAdd = computed(() => route.params.id === "new");

    const UserPlatform = ref({
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

    const createUserPlatform = async () => {
      const { data } = await api.post("Platform", UserPlatform.value);
      return data;
    };

    const updateUserPlatform = async () => {
      const { id } = route.params;
      const { data } = await api.put(`Platform/${id}`, UserPlatform.value);
      return data;
    };

    const onClickSave = async () => {
      if (!isValid()) return;
      try {
        loading.value = true;
        isAdd.value ? await createUserPlatform() : await updateUserPlatform();
        loading.value = false;
        router.back();
      } catch (e) {
        console.error({ e });
        loading.value = false;
      }
    };

    const getUserPlatform = async () => {
      try {
        if (isAdd.value) {
          return;
        }
        const { data } = await api.get(`Platform/${route.params.id}`);
        UserPlatform.value = { ...data };
      } catch (e) {
        console.error({ e });
      }
    };

    getUserPlatform();

    return {
      router,
      route,
      UserPlatform,
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
