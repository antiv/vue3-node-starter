<template>
  <form>
    <div
      class="mb-3"
      v-for="(value, propertyName) in formFields"
      :key="propertyName"
    >
      <span v-if="formFields && formFields[propertyName]">
        <label
          v-if="
            formFields &&
            formFields[propertyName] &&
            formFields[propertyName].type != 'hidden'
          "
          :for="propertyName"
          class="form-label"
          >{{ propertyName }}</label
        >
        <span v-if="formFields[propertyName].type == 'textarray'">
          <textarea
            class="form-control"
            :id="propertyName"
            rows="3"
            v-model="formData[propertyName]"
          ></textarea>
        </span>
        <span v-else>
          <input
            :type="formFields[propertyName].type"
            class="form-control"
            :id="propertyName"
            v-model="formData[propertyName]"
          />
        </span>
      </span>
    </div>
    <div class="actions">
      <button
        class="btn btn-success"
        type="button"
        @click="$emit('save', formData)"
      >
        Snimi
      </button>
      <button class="btn btn-danger" type="button" @click="$emit('cancel')">
        Odustani
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "data-form",
  props: ["data", "formFields"],
  data() {
    return { formData: { ...this.data } };
  },
  methods: {
    // update(prop, event) {
    //   console.log({ prop, event });
    //   this.data[prop] = event.target.value;
    // },
  },
};
</script>

<style scoped>
.actions > .btn,
.actions > .btn-group {
  margin: 0.25rem 0.125rem;
}
</style>