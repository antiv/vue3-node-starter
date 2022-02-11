<template>
  <v-server-table
    :url="url"
    :columns="columns"
    :options="options"
    ref="table"
    :name="name ?? 'dataTable'"
  >
    <template v-slot:edit="props">
      <div>
        <ActionButtons
          :data="props.row"
          :actions="actions"
          @yes="$emit('yes')"
        />
      </div>
    </template>
  </v-server-table>
</template>

<script>
import http from "../../utils/http-common";
import dateUtils from "../../utils/date-common";
import ActionButtons from "./ActionButtons.vue";

export default {
  components: {
    ActionButtons,
  },
  props: ["url", "columns", "headings", "templates", "actions", "name"],
  methods: {
    onRefresh() {
      console.log("REFRESH!!!!");
      this.$refs.table.refresh();
    },
  },
  computed: {
    showModal() {
      return this.$store.state.app.status.showModal;
    },
  },
  watch: {
    showModal(newVal, oldVal) {
      if (oldVal && !newVal) {
        console.log(`${oldVal}  ${newVal} !!!!!!!`);
        this.$refs.table.refresh();
      }
    },
  },
  data() {
    return {
      options: {
        perPage: 10,
        alwaysShowPerPageSelect: true,
        perPageValues: [5, 10, 15, 25, 50, 100],
        addSortedClassToCells: true,
        saveState: true,
        sortIcon: {
          base: "bi",
          up: "bi-arrow-up",
          down: "bi-arrow-down",
          is: "bi-arrow-down-up",
        },
        sortable: this.columns.filter((c) => c != "edit"),
        headings: this.headings,
        pagination: {
          show: true,
          dropdown: false,
          chunk: 10,
          edge: false,
          align: "center",
          nav: "scroll",
        },
        texts: {
          count: "Prikaz {from} do {to} od {count} redova||",
          first: "Prva",
          last: "Poslednja",
          filter: "Pretraga:",
          filterPlaceholder: "",
          limit: "Prkaži po:",
          page: "Strana:",
          noResults: "Nema podataka",
          noRequest: "Please select at least one filter to fetch results",
          filterBy: "Pronađi po {column}",
          loading: "Učitavanje...",
          defaultOption: "Izaberi {column}",
          columns: "Kolone",
        },
        // requestAdapter(data) {
        //   // {
        //   //     "query": "abs",
        //   //     "limit": 1,
        //   //     "ascending": 1,
        //   //     "orderBy": ,
        //   //     "page": 1,
        //   //     "byColumn": 0
        //   // }
        //   return {
        //     sort: data.orderBy ? data.orderBy : "username",
        //     direction: data.ascending ? "asc" : "desc",
        //     filter: data.query ? data.query : "",
        //   };
        // },
        responseAdapter({ data }) {
          return {
            data: data.rows,
            count: data.count,
          };
        },
        requestFunction(data) {
          return http.get(this.url, { params: data }).catch(function (e) {
            this.dispatch("error", e);
          });
        },
        filterable: true,
        // filterByColumn: false,
        templates: {
          createdAt(h, row) {
            return dateUtils.formatDate(row.createdAt);
          },
          updatedAt(h, row) {
            return dateUtils.formatDate(row.updatedAt);
          },
          ...this.templates,
        },
      },
    };
  },
};
</script>