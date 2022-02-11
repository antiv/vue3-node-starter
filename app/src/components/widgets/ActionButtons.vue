<template>
  <div v-if="actions" class="btn-group me-2" role="group" aria-label="actions">
    <button
      v-if="actions && actions.edit"
      type="button"
      class="btn btn-primary bi bi-pencil"
      @click="editData"
    ></button>
    <button
      v-if="actions && actions.delete"
      type="button"
      class="btn btn-danger bi bi-trash"
      @click="deleteData"
    ></button>
    <button
      v-if="actions && actions.print"
      type="button"
      class="btn btn-success bi bi-printer"
    ></button>
  </div>
</template>



<script>
import ConfirmDialog from "./ConfirmDialog.vue";

export default {
  name: "action-buttons",
  props: ["data", "actions"],
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    confirmYes() {
      this.actions.delete.deleteData(this.data.id);
    },
    confirmNo() {
      this.$store.commit("app/hideModal");
    },
    editData() {
      this.$store.commit("app/showModal", {
        modal: this.actions.edit.commp,
        params: { data: this.data, title: "Edit " + this.data.title },
      });
    },
    deleteData() {
      this.$store.commit("app/showModal", {
        modal: ConfirmDialog,
        params: {
          message: "Da li ste sigurni?",
          title: "Delete " + this.data.title,
          onYes: this.confirmYes,
          onNo: this.confirmNo,
          // foother: { isComponent: true, commponent: test },
        },
      });
    },
  },
};
</script>