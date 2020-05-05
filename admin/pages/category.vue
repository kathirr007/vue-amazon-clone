<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 offset-md-3" >
          <h1 class="text-center mt-2">
            Add a New Category Form
          </h1>
          <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
          <b-form>
            <!-- Category Type -->
            <b-form-group label="Type:" label-for="categoryType"
              description="Please enter Category type here">
              <b-form-input id="categoryType" @keydown.enter.prevent="onAddCategory" v-model="categoryType" type="text" required placeholder="Enter category type">
              </b-form-input>
            </b-form-group>

            <b-button type="button" @click.prevent="onAddCategory" variant="primary">Add Category</b-button>
            <b-button  ref="formReset" variant="danger">Reset</b-button>
          </b-form>
          <b-card class="mt-3" header="Available Categories">
            <b-list-group>
              <b-list-group-item class="text-capitalize" v-for="category in categories" :key="category._id">{{ category.type }}</b-list-group-item>
            </b-list-group>
          </b-card>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    head: {
      title: 'Add a new category'
    },
    async asyncData({ $axios }) {
      try {
        let res = await $axios.$get('http://localhost:4004/api/categories')
        // let owners = $axios.$get('http://localhost:4004/api/owners')

        return {
          categories: res.categories,
        }
      }
      catch(err) {
        console.log(err)
      }
    },
    data() {
      return {
        categoryType: '',
      }
    },
    comoputed:{

    },
    methods: {
      resetCategoryForm() {
        this.categoryType = ''
      },
      async onAddCategory() {
        let data = { type: this.categoryType }

        let result = await this.$axios.$post('http://localhost:4004/api/categories', data)
        console.log(`The new category ${this.categoryType} is added successfully...`)

        if(result.status) {
          this.categories.push(data)
        }
        this.makeToast()
        this.resetCategoryForm()
        // this.$router.push('/')
      },
      makeToast(append = false) {
        // Use a shorter name for this.$createElement
        const h = this.$createElement
        // Increment the toast count
        // Create the message
        const vNodesMsg = h(
          'p',
          { class: ['text-center', 'mb-2'] },
          [
            h('b-spinner', { props: { type: 'grow', small: true } }),
            'The new category ',
            h('strong', `${this.categoryType}`),
            ' is added successfully... ',
            h('b-spinner', { props: { type: 'grow', small: true } })
          ],
        )
        this.$bvToast.toast(vNodesMsg, {
          title: 'Add Category Status',
          autoHideDelay: 5000,
          appendToast: append,
          variant: 'info'
        })
      }
    }
  };

</script>

<style lang="scss" scoped>
</style>
