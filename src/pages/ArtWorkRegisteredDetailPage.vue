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
            v-model="ArtWorkRegistered.Titolo"
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
        <!--
        non si aspetta l'immagine
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
      -->
        <!-- fine immagine -->
        <!--
        <div class="row q-col-gutter-md q-mt-md text-h6">
          <q-input
            class="col-12 col-md-4"
            ref="name_artworkRef"
            :rules="[notEmpty]"
            v-model="ArtWorkRegistered.name_artwork"
            :label="$t('common.name_artwork')"
            outlined
            dense
          /> -->
        <q-input
          class="col-12 col-md-4"
          ref="name_artistRef"
          :rules="[notEmpty]"
          v-model="ArtWorkRegistered.NomeArtista"
          :label="$t('common.name_artist')"
          outlined
          dense
        />
        <q-input
          class="col-12 col-md-4"
          ref="nationality_artistRef"
          :rules="[notEmpty]"
          v-model="ArtWorkRegistered.NazionalitaArtista"
          :label="$t('common.nationality_artist')"
          outlined
          dense
        />

        <q-input
          v-model="ArtWorkRegistered.DataRegistrazione"
          ref="dateRef"
          filled
          type="date"
        />
        <!-- inizio nuova data -->

        <!-- fine nuova data -->
        <!--
          <q-input
            class="col-12 col-md-4"
            ref="date"
            :rules="[notEmpty]"
            v-model="ArtWorkRegistered.date"
            :label="$t('common.date')"
            outlined
            dense
          /> -->
        <!--
            dire a fabio che la chiamata si
            aspetta anche questo, quindi inserirlo
          <q-input
            class="col-12 col-md-4"
            ref="series"
            :rules="[notEmpty]"
            v-model="ArtWorkRegistered.series"
            :label="$t('common.series')"
            outlined
            dense
          />-->

        <q-btn
          v-if="!ArtWorkRegistered._id"
          :label="$t('common.ass_tag')"
          color="primary"
          :loading="loading"
          disable
        />
        <q-btn
          v-if="!!ArtWorkRegistered._id"
          :label="$t('common.ass_tag')"
          color="primary"
          @click="onClickAssociatedTag"
          :loading="loading"
        />
        <!-- <q-btn
          v-if="!!token"
          :label="$t('common.logout')"
          flat
          @click="logout"
        /> -->
      </div>
    </div>
    <!-- </div> -->
  </q-page>
</template>
<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useRouter, useRoute } from "vue-router";
import AssociateTagModal from "components/modals/AssociateTagModal.vue";
import { t } from "boot/i18n";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "ArtWorkRegisteredDetailPage",
  setup() {
    return {
      router: useRouter(),
      route: useRoute(),
      $q: useQuasar(),
    };
  },
  data() {
    return {
      loading: false,
      ArtWorkRegistered: {
        Titolo: undefined,
        NomeArtista: undefined,
        NazionalitaArtista: undefined,
        DataRegistrazione: undefined,
      },

      name_artworkRef: undefined,
      name_artistRef: undefined,

      nationality_artistRef: undefined,
      dateRef: undefined,
    };
  },
  methods: {
    async notEmpty(val) {
      return !!val || (await t("common.requiredField"));
    },

    isValid() {
      const fieldsIsValid = [];
      fieldsIsValid.push(this.name_artworkRef.value.validate());
      fieldsIsValid.push(this.name_artistRef.value.validate());
      fieldsIsValid.push(this.nationality_artistRef.value.validate());
      fieldsIsValid.push(this.dateRef.value.validate());

      this.isAdd.value;

      return fieldsIsValid.every((f) => f === true);
    },

    async createArtWorkRegistered() {
      const { data } = await api.post("paintings/", this.ArtWorkRegistered);
      return data;
    },

    async onClickSave() {
      if (this.$route.params.id === "new") {
        try {
          this.loading = true;
          await this.createArtWorkRegistered().then((elem) => {
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

        const { data } = await api.put(
          `paintings/${userId}`,
          this.ArtWorkRegistered
        );
        console.log({ data });
      }
    },
    async getArtWorkRegistered() {
      try {
        const { data } = await api.get(`paintings/${route.params.id}`);
        return data;
      } catch (e) {
        console.error({ e });
      }
    },
    async onClickAssociatedTag() {
      return this.$q.dialog({
        component: AssociateTagModal,
        componentProps: { id: this.ArtWorkRegistered.id },
      });
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
      const { data: user } = await api.get(`paintings/${userId}`);
      //const user = await api.get(`user/read`, userId);
      //console.log({ user });
      this.ArtWorkRegistered = user;
      //console.log(this.UserManaged);
    }
  },
});
</script>
