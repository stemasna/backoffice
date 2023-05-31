<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileChange" />
    <img :src="imageUrl" v-if="imageUrl" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: null,
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      this.previewImage(file);
    },
    previewImage(file) {
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        this.imageUrl = event.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
