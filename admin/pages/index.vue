<template>
  <main>
    <div class="container-fluid browsing-history mb-3">
      <div class="row">
        <div class="col-sm-8 col-8">
          <h1 class="mb-3">All products</h1>
          <!-- Buttons -->
          <a href="" class="a-button-buy-again">Add a new product</a>
          <a href="" class="a-button-history mr-2">Add a new category</a>
          <a href="" class="a-button-history">Add a new owner</a>
        </div>
      </div>
    </div>
    <div class="container-fluid browsing-history">
      <div class="row">
        <div v-for="(product) in products" :key="product._id" class="col-lg-3 col-sm-6 col-12">
          <b-card
            :title="product.title"
            :img-src="product.photo != ''? product.photo : ''"
            :img-alt="product.title"
            img-top
            tag="article"
            class="mb-2 history-box img-fluid p-2"
          >
            <b-card-text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text>
            <!-- Product Rating -->
            <b-card-text>
              <a href=""></a>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <span class="a-letter-space"></span>
              <span class="a-color-tertiary a-size-small asin-reviews">(1774)</span>
            </b-card-text>
          <!-- Product price -->
            <b-card-text>
              Price: <span class="text-danger">{{product.price}}</span>
            </b-card-text>

            <div class="float-right">
              <b-button href="#" variant="primary">Update</b-button>
              <b-button href="#" variant="primary">Delete</b-button>
            </div>
          </b-card>
        </div>
      </div>
      <!-- <div class="row">
        <div>
          <b-card-group columns col-lg-3 col-sm-6 col-12>
            <b-card
              v-for="(product) in products" :key="product._id"
              :title="product.title"
              :img-src="product.photo"
              :img-alt="product.title"
              img-to img-fluid
              tag="article"
              class="mb-2 history-box"
            >
              <b-card-text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </b-card-text>
              <b-card-text>
                <a href=""></a>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <span class="a-letter-space"></span>
                <span class="a-color-tertiary a-size-small asin-reviews">(1774)</span>
              </b-card-text>
              <b-card-text>
                Price: <span class="text-danger">{{product.price}}</span>
              </b-card-text>

              <b-button href="#" variant="primary">Update</b-button>
              <b-button href="#" variant="primary">Delete</b-button>
            </b-card>

          </b-card-group>
        </div>
      </div> -->
    </div>
  </main>
</template>

<script>

export default {
  // asyncData is fetching data before nuxt page finished loading on the browser
  // It is good for SEO because the data will be loaded first
  async asyncData({ $axios}) {
    // debugger
    try {
      let response = await $axios.$get('http://localhost:4004/api/products')
      console.log(response.products)
      return {
        products: response.products
      }
    } catch(err) {

    }
  },
  components: {

  }
}
</script>

<style>
 .card-img-top {
   height: 200px;
   object-fit: contain;
 }
</style>
