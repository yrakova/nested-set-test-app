<template>
	<div class="list row">
		<div class="col-md-8">
			<div class="input-group mb-3">
				<input type="text" class="form-control" placeholder="Search by name"
					v-model="name"/>
				<div class="input-group-append">
					<button class="btn btn-outline-secondary" type="button"
						@click="searchName"
					>
						Search
					</button>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<h4>Categories List</h4>
			<ul class="list-group">
				<li class="list-group-item"
					:class="{ active: index == currentIndex }"
					v-for="(category, index) in categories"
					:key="index"
					@click="setActiveCategory(category, index)"
				>
					{{ category.name }}
				</li>
			</ul>

			<button class="m-3 btn btn-sm btn-danger" @click="removeAllCategories">
				Remove All
			</button>
		</div>
		<div class="col-md-6">
			<div v-if="currentCategory">
				<h4>Category</h4>
				<div>
					<label><strong>Name:</strong></label> {{ currentCategory.name }}
				</div>
				<div>
					<label><strong>Description:</strong></label> {{ currentCategory.description }}
				</div>

				<a class="badge badge-warning"
					:href="'/categories/' + currentCategory.id"
				>
					Edit
				</a>
			</div>
			<div v-else>
				<br />
				<p>Please click on a Category...</p>
			</div>
		</div>
	</div>
</template>

<script>
import CategoryDataService from "../services/CategoryDataService";

export default {
	name: "categories-list",
	data() {
		return {
			categories: [],
			currentCategory: null,
			currentIndex: -1,
			name: ""
		};
	},
	methods: {
		retrieveCategories() {
			CategoryDataService.getAll()
				.then(response => {
					this.categories = response.data;
					console.log(response.data);
				})
				.catch(e => {
					console.log(e);
				});
		},

		refreshList() {
			this.retrieveCategories();
			this.currentCategory = null;
			this.currentIndex = -1;
		},

		setActiveCategory(category, index) {
			this.currentCategory = category;
			this.currentIndex = index;
		},

		removeAllCategories() {
			CategoryDataService.deleteAll()
				.then(response => {
					console.log(response.data);
					this.refreshList();
				})
				.catch(e => {
					console.log(e);
				});
		},

		searchName() {
			CategoryDataService.findByName(this.name)
				.then(response => {
					this.categories = response.data;
					console.log(response.data);
				})
				.catch(e => {
					console.log(e);
				});
		}
	},
	mounted() {
		this.retrieveCategories();
	}
};
</script>

<style>
.list {
	text-align: left;
	max-width: 750px;
	margin: auto;
}
</style>