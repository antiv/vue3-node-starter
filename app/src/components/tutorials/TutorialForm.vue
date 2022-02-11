<template>
  <!-- <div
    v-if="message"
    class="alert alert-danger d-flex alert-dismissible fade show"
    role="alert"
  >
    <i class="bi bi-exclamation-triangle mx-3"></i>
    <div>{{ message }}</div>
    <button
      type="button"
      class="btn-close"
      aria-label="Close"
      @click="message = ''"
    ></button>
  </div> -->
  <data-form
    :data="data"
    :formFields="formFields"
    @save="saveData"
    @cancel="cancel"
  />
</template>

<script>
import DataForm from "../widgets/DataForm.vue";
import TutorialDataService from "../../services/tutorial.service";

export default {
  name: "tutorial-form",
  props: ["data"],
  components: {
    DataForm,
  },
  data() {
    return { message: "" };
  },
  computed: {
    formFields() {
      return {
        id: { type: "hidden" },
        title: { label: "Naslov", type: "text" },
        description: { label: "Tekst", type: "textarray" },
      };
    },
  },
  methods: {
    saveData(newData) {
      console.log({ newData });
      if (newData && newData.id) {
        this.updateTutorial(newData);
      } else {
        this.createTutorial(newData);
      }
    },
    cancel() {
      this.$store.commit("app/hideModal");
    },
    updateTutorial(newData) {
      TutorialDataService.update(newData.id, newData)
        .then(() => {
          this.$store.commit("app/showAlert", {
            type: "success",
            message: "Tutorial updated!",
          });
          this.$store.commit("app/hideModal");
        })
        .catch((e) => {
          this.$store.commit("app/showAlert", {
            type: "danger",
            message: e,
          });
        });
    },
    createTutorial(newData) {
      TutorialDataService.create(newData)
        .then(() => {
          this.$store.commit("app/showAlert", {
            type: "success",
            message: "Turorial created!",
          });
          this.$store.commit("app/hideModal");
        })
        .catch((e) => {
          this.$store.commit("app/showAlert", {
            type: "danger",
            message: e,
          });
        });
    },
  },
};
</script>