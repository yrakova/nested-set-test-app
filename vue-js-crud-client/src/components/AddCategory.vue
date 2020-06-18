<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="category.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="category.description"
          name="description"
        />
      </div>

      <button @click="saveCategory" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newCategory">Add</button>
    </div>
  </div>
</template>

<script>
import CategoryDataService from "../services/CategoryDataService";

export default {
  name: "add-category",
  data() {
    return {
      category: {
        id: null,
        name: "",
        description: "",
        lft: 0,
        rgt: 0
      },
      submitted: false
    };
  },
  methods: {
    saveCategory() {
      var data = {
        name: this.category.name,
        description: this.category.description
      };

      CategoryDataService.create(data)
        .then(response => {
          this.category.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newCategory() {
      this.submitted = false;
      this.category = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>