<template>
  <div class="container">
    <div class="row">
      <div class="col">
        {{ message }}
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="actions d-flex flex-row-reverse">
          <button
            type="button"
            class="btn btn-success bi bi-check"
            @click="$emit('yes')"
          >
            DA
          </button>
          <button
            type="button"
            class="btn btn-danger bi bi-x"
            @click="$emit('no')"
          >
            NE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "confirm-dialog",
  props: ["message"],
  methods: {},
};
</script>

<style scoped>
</style>