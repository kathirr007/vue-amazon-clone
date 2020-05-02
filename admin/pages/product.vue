<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <h1 class="text-center mt-2">
            Add a New Product Form
          </h1>
          <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
          <b-form>
            <!-- Category Selection dropdown -->
            <b-form-group label="Category:" label-for="productCategory">
              <b-form-select id="productCategory" class="text-capitalize" v-model="categoryID" required>
                <option value="null">Select Category of the product</option>
                <option v-for="category in categories" class="text-capitalize" :key="category._id" :value="category._id">
                  {{ category.type }}
                </option>
              </b-form-select>
            </b-form-group>

            <!-- Owner Selection dropdown -->
            <b-form-group label="Owner:" class="text-capitalize" label-for="productOwner">
              <b-form-select id="productOwner" v-model="ownerID" required>
                <option value="null">Select Owner of the product</option>
                <option v-for="owner in owners" :key="owner._id" :value="owner._id">
                  {{ owner.name }}
                </option>
              </b-form-select>
            </b-form-group>

            <b-form-group label="Title:" label-for="productTitle"
              description="Please enter Product title here">
              <b-form-input id="productTitle" v-model="title" type="text" required placeholder="Enter product title">
              </b-form-input>
            </b-form-group>

            <b-form-group label="Description: " label-for="productDescription">
              <b-form-textarea id="productDescription" v-model="description" placeholder="Enter product description..." rows="3" max-rows="6">
              </b-form-textarea>
            </b-form-group>

            <b-form-group label="Photo:" :file-name-formatter="formatNames" label-for="productPhoto">
              <b-form-file @change="onFileSelected($event)" id="productPhoto"></b-form-file>
            </b-form-group>

            <b-form-group label="Price:" label-for="productPrice"
              description="Please enter Product price here">
              <b-form-input id="productPrice" v-model="price" type="number" required placeholder="Enter product price">
              </b-form-input>
            </b-form-group>

            <b-form-group label="Stock Quantity:" label-for="stockQuantity"
              description="Please enter Product price here">
              <b-form-input id="stockQuantity" v-model="stockQuantity" type="number" required placeholder="Enter product price">
              </b-form-input>
            </b-form-group>

            <b-button type="button" @click.prevent="onAddProduct" variant="primary">Add Product</b-button>
            <!-- <span class="a-button-register">
              <span class="a-button-inner">
                <span class="a-button-text">
                  Add Product
                </span>
              </span>
            </span> -->
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
          <b-card class="mt-3" header="Form Data Result">
            <!-- <pre class="m-0">{{ product }}</pre> -->
            <!-- <pre class="m-0">{{ categories }}</pre>
            <pre class="m-0">{{ owners }}</pre> -->
            <pre class="m-0">category: {{ categoryID }}</pre>
            <pre class="m-0">owner: {{ ownerID }}</pre>
            <pre class="m-0">title: {{ title }}</pre>
          </b-card>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    head: {
      title: 'Amazon Clone | Add a new product'
    },
    async asyncData({ $axios }) {
      try {
        let categories = $axios.$get('http://localhost:4004/api/categories')
        let owners = $axios.$get('http://localhost:4004/api/owners')

        const [catResponse, ownerResponse] = await Promise.all([
          categories, owners
        ])

        // console.log(catResponse.categories, ownerResponse.owners)

        return {
          categories: catResponse.categories,
          owners: ownerResponse.owners,
        }
      }
      catch(err) {
        console.log(err)
      }
    },
    data() {
      return {
        categoryID: null,
        ownerID: null,
        title: '',
        description: '',
        price: 0,
        stockQuantity: null,
        selectedFile: null,
      }
    },
    methods: {
      onFileSelected(event) {
        // debugger
        this.selectedFile = event.target.files[0]
      },
      formatNames(files) {
        this.selectedFile = files[0]
        if (files.length === 1) {
          return files[0].name
        } else {
          return `${files.length} files selected`
        }
      },
      async onAddProduct() {
        let data = new FormData()
        data.append('title', this.title)
        data.append('price', this.price)
        data.append('description', this.description)
        data.append('stockQuantity', this.stockQuantity)
        data.append('owner', this.ownerID)
        data.append('category', this.categoryID)
        data.append('photo', this.selectedFile, this.selectedFile.name)
        // debugger

        let result = await this.$axios.$post('http://localhost:4004/api/products', data)
        console.log(`The new product ${this.title} is added successfully...`)
        this.$router.push('/')
      },
    }
  };

</script>

<style lang="scss" scoped>
</style>
