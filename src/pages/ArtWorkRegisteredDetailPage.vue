<template>
  <q-page padding>
    <div class="row">
      <div class="text-weight-bold text-h4">
        <div class="header">
          {{ $t("common.create") }} {{ $t("common.artwork") }}

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
        </div>

        <div class="title">
          <q-input
            class="col-12 col-md-4"
            ref="name_artworkRef"
            :rules="[notEmpty]"
            v-model="ArtWorkRegistered.name_artwork"
            :label="$t('common.name_artwork')"
            outlined
            dense
          >
            <template v-slot:append>
              <q-avatar>
                <q-icon name="edit" />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <!-- inizia immagine -->

        <div class="form-group text-h6">
          <input
            type="file"
            accept="image/*"
            @change="previewImage"
            class="form-control-file"
            id="my-file"
          />
          <template v-if="preview">
            <img :src="preview" class="img-fluid" />
          </template>
        </div>

        <!-- fine immagine -->
        <div class="row q-col-gutter-md q-mt-md text-h6">
          <q-input
            class="col-12 col-md-4"
            ref="name_artworkRef"
            :rules="[notEmpty]"
            v-model="ArtWorkRegistered.name_artwork"
            :label="$t('common.name_artwork')"
            outlined
            dense
          />
          <q-input
            class="col-12 col-md-4"
            ref="name_artistRef"
            :rules="[notEmpty]"
            v-model="ArtWorkRegistered.name_artist"
            :label="$t('common.name_artist')"
            outlined
            dense
          />
          <q-input
            class="col-12 col-md-4"
            ref="nationality_artistRef"
            :rules="[notEmpty]"
            v-model="ArtWorkRegistered.nationality_artist"
            :label="$t('common.nationality_artist')"
            outlined
            dense
          />

          <q-input v-model="date" filled type="date" />
          <!-- inizio nuova data -->

          <!-- fine nuova data -->

          <q-input
            class="col-12 col-md-4"
            ref="date"
            :rules="[notEmpty]"
            v-model="ArtWorkRegistered.date"
            :label="$t('common.date')"
            outlined
            dense
          />
          <q-input
            class="col-12 col-md-4"
            ref="series"
            :rules="[notEmpty]"
            v-model="ArtWorkRegistered.series"
            :label="$t('common.series')"
            outlined
            dense
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
  name: "ArtWorkRegisteredDetailPage",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const loading = ref(false);
    const idRef = ref(null);
    const nameRef = ref(null);
    const priceRef = ref(null);

    const isAdd = computed(() => route.params.id === "new");

    const ArtWorkRegistered = ref({
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

    const createArtWorkRegistered = async () => {
      const { data } = await api.post("ArtWork", ArtWorkRegistered.value);
      return data;
    };

    const updateArtWorkRegistered = async () => {
      const { id } = route.params;
      const { data } = await api.put(`ArtWork/${id}`, ArtWorkRegistered.value);
      return data;
    };

    const onClickSave = async () => {
      if (!isValid()) return;
      try {
        loading.value = true;
        isAdd.value
          ? await createArtWorkRegistered()
          : await updateArtWorkRegistered();
        loading.value = false;
        router.back();
      } catch (e) {
        console.error({ e });
        loading.value = false;
      }
    };

    const getArtWorkRegistered = async () => {
      try {
        if (isAdd.value) {
          return;
        }
        const { data } = await api.get(`ArtWork/${route.params.id}`);
        ArtWorkRegistered.value = { ...data };
      } catch (e) {
        console.error({ e });
      }
    };

    getArtWorkRegistered();

    return {
      router,
      route,
      ArtWorkRegistered,
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
  data: function () {
    return {
      preview: null,
      image: null,
    };
  },
  methods: {
    previewImage: function (event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    reset: function () {
      this.image = null;
      this.preview = null;
    },
  },
});
</script>
