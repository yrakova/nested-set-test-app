<template>
	<div class="col" data-app>
		<v-dialog v-model="insertDialog" maxWidth="600px">
			<v-card>
				<v-card-title>
						<span class="headline">Insert a child category</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-col cols="12">
							<v-text-field ref="insertCategoryName" label="Name" v-model="newCategoryName" required></v-text-field>
						</v-col>
					</v-container>
				</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="onInsertDialogClose">Close</v-btn>
						<v-btn color="blue darken-1" text @click="insertChildCategory">Save</v-btn>
					</v-card-actions>
			</v-card>
		</v-dialog>
		<div class="list row">
			<!--<div class="input-group mb-3">
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
		</div> -->
		<!-- <div class="col-md-6">
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
			</ul> -->

			<div class="col-md-6">
				<button class="row m-2 btn btn-sm btn-danger" @click="removeAllCategories">
					Remove All Categories
				</button>
				<button class="row m-2 btn btn-sm btn-success" @click="createExampleCategories">
					Create Example Categories
				</button>
			</div>
		</div>

		<div class="list row">
			<div class="col-md-6">
				<v-treeview
					ref="treeView"
					:items="categories"
					activatable
					:active="activeNodesList"
					item-key="name"
					@update:active="activeNodesUpdated"
					return-object
					>
						<template slot="label" slot-scope="{ item }">
							<div @click="clickTreeView(item)">{{ item.name }}</div>
						</template>
				</v-treeview>
			</div>

			<div class="col-md-6" v-if="categories.length">
				<div v-if="currentCategory" class="col">

						<h4>Category</h4>
						<div>
							<label><strong>Name:</strong></label> {{ currentCategory.name }}
						</div>

						<!-- <a class="badge badge-warning"
							:href="'/categories/' + currentCategory.id"
						>
							Edit
						</a> -->

						<button class="btn btn-sm btn-warning row mt-1"
							@click="editCategoryName">
								Edit name
						</button>
						<button class="btn btn-sm btn-danger row mt-1"
							@click="deleteCategory">
								Delete
						</button>
						<button class="btn btn-sm btn-success row mt-1"
							@click="insertDialog = true">
								Insert a child
						</button>
						<button class="btn btn-sm btn-warning row mt-1"
							@click="moveCategory">
								Move
						</button>

				</div>
				<div v-else>
					<br />
					<p>Please click on a Category...</p>
				</div>
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
			name: "",
			activeNodesList: [],
			insertDialog: false,
			newCategoryName: null
		};
	},
	methods: {
		retrieveCategories() {
			CategoryDataService.getAll()
				.then(response => {
					console.log(response.data);
					this.categories = this.convertCategories(response.data);
					this.$nextTick(() => {
						this.$refs["treeView"].updateAll(true);
					});
				})
				.catch(e => {
					console.log(e);
				});
		},

		convertCategories(categories) {
			let resultCategories = [];
			if (categories.length === 0) return resultCategories;

			let stack = [categories.shift()];
			for (let category of categories)
			{
					while (stack[stack.length-1].rgt < category.lft)
							stack.pop();

					let stackPeak = stack[stack.length - 1];
					if (!stackPeak.children) {
						stackPeak.children = [];
					}
					stackPeak.children.push(category);
					stack.push(category);
			}

			return [stack[0]];
		},

		clickTreeView(item) {
			console.log(item);
		},

		activeNodesUpdated(activeCategories) {
			let activeCategory = activeCategories.length > 0 ? activeCategories[0] : null;
			let currentIndex = activeCategory ? activeCategory.id : null;
			this.setActiveCategory(activeCategory, currentIndex);
		},

		refreshList(resetCurrentCategory = true) {
			this.retrieveCategories();
			if (resetCurrentCategory)
			{
				this.currentCategory = null;
				this.currentIndex = -1;
			}
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

		createExampleCategories() {
			CategoryDataService.createExample()
				.then(response => {
					console.log(response.data);
					this.refreshList();
				})
				.catch (e => {
					console.log(e);
				})
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
		},

		editCategoryName() {
			alert("Not implemented yet");
		},

		deleteCategory() {
			alert("Not implemented yet");
		},

		moveCategory() {
			alert("Not implemented yet");
		},

		insertChildCategory() {
			//TODO add validation
			console.log(this.newCategoryName);
			if (this.newCategoryName && this.newCategoryName.length > 0) {
				CategoryDataService.create({name: this.newCategoryName, parentId: this.currentCategory.id})
					.then(response => {
						const insertedId = response.data[0];
						console.log("inserted new node with id " + insertedId);
						this.refreshList(false);
					});
				this.insertDialog = false;
				this.newCategoryName = null;
			}
		},

		onInsertDialogClose() {
			this.insertDialog = false;
			this.newCategoryName = null;
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