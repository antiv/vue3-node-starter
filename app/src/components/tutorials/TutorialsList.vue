<template>
  <div class="list row">
    <h2>Tutorials</h2>
    <div class="actions d-flex flex-row-reverse">
      <button
        type="button"
        class="btn btn-primary bi bi-arrow-clockwise"
        @click="refreshData"
      />
      <button
        type="button"
        class="btn btn-success bi bi-plus"
        @click="addData"
      />
    </div>
    <data-table
      url="http://localhost:8080/api/tutorials"
      :columns="columns"
      :templates="templates"
      :headings="headers"
      :actions="actions"
      ref="datatable"
      @yes="deleteData"
      name="Tutorials"
    >
    </data-table>
  </div>
</template>

<script>
import TutorialDataService from "../../services/tutorial.service";
import DataTable from "../widgets/DataTable.vue";
import TutorialForm from "./TutorialForm.vue";

export default {
  name: "tutorials-list",
  components: {
    DataTable,
  },
  data() {
    return {
      columns: [
        "title",
        "description",
        "createdAt",
        "updatedAt",
        "published",
        "edit",
      ],
      headers: {
        title: "Naslov",
        description: "Tekst",
        createdAt: "Kreirano",
        updatedAt: "Izmenjeno",
        published: "Status",
        edit: "",
      },
      tutorials: [],
      templates: {
        published(h, row) {
          return row.published ? (
            <span class="badge bg-success">Published</span>
          ) : (
            <span class="badge bg-warning text-dark">Not Published</span>
          );
        },
      },
      actions: {
        edit: { commp: TutorialForm },
        delete: { deleteData: this.deleteData },
        print: null,
      },
      currentTutorial: null,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    refreshData() {
      this.$refs.datatable.onRefresh();
    },
    addData() {
      this.$store.commit("app/showModal", {
        modal: TutorialForm,
        params: { data: {}, title: "Add New Tutorial" },
      });
    },
    deleteData(id) {
      TutorialDataService.delete(id)
        .then((response) => {
          this.$store.commit("app/showAlert", {
            type: "success",
            message: response.data.message,
          });
          this.$store.commit("app/hideModal");
        })
        .catch((e) => {
          console.log(e);
          this.$store.commit("app/showAlert", {
            type: "danger",
            message: e,
          });
        });
    },
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then((response) => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  // mounted() {
  //   this.retrieveTutorials();
  // },
};
</script>

<style scoped>
.list {
  text-align: left;
  /* max-width: 750px; */
  margin: auto;
}
</style>
