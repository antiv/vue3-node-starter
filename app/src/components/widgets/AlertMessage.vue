<template>
  <div
    :class="[
      alert && alert.type ? `alert-${alert.type}` : 'alert-info',
      'alert-dismissible',
      'alert',
      'fade',
      'show',
    ]"
    role="alert"
  >
    {{ alert && alert.message ? alert.message : "Test" }}
    <button
      type="button"
      class="btn-close"
      aria-label="Close"
      @click="hide"
    ></button>
  </div>
</template>

<script>
export default {
  name: "alert-message",
  methods: {
    hide() {
      this.$store.commit("app/hideAlert");
    },
  },
  computed: {
    alert() {
      return this.$store.state.app.alert;
    },
  },
  mounted() {
    console.log("Mounted");
    setTimeout(this.hide, 5000);
  },
};
</script>

<style scoped>
.alert {
  position: fixed;
  top: 45px;
  right: 20px;
  min-width: 50%;
  z-index: 20000;
}
</style>