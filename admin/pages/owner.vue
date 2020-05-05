<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 offset-md-3" >
          <h1 class="text-center mt-2">
            Add a New Owner Form
          </h1>
          <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
          <b-form>
            <!-- Owner name -->
            <b-form-group label="Name:" label-for="ownerName"
              description="Please enter owner name here">
              <b-form-input id="ownerName" v-model="name" type="text" required placeholder="Enter owner name">
              </b-form-input>
            </b-form-group>

            <!-- About Owner -->
            <b-form-group label="About: " label-for="aboutOwner">
              <b-form-textarea id="aboutOwner" v-model="about" placeholder="Enter details about owner" rows="3" max-rows="6">
              </b-form-textarea>
            </b-form-group>

            <!-- Owner photo -->
            <b-form-group label="Photo:" label-for="ownerPhoto">
              <b-form-file @change="onFileSelected($event)" :file-name-formatter="formatNames" ref="ownerPhotoInput" id="ownerPhoto"></b-form-file>
              <!-- <b-form-file @change="onFileSelected($event)" :file-name-formatter="formatNames" id="productPhoto"></b-form-file> -->
            </b-form-group>

            <b-button type="button" @click.prevent="onAddOwner" variant="primary">Add Category</b-button>
            <b-button  ref="formReset" variant="danger">Reset</b-button>
          </b-form>
          <b-card class="mt-3" header="Available Onwers">
            <b-list-group>
              <b-list-group-item class="text-capitalize" v-for="owner in owners" :key="owner._id">{{ owner.name }}</b-list-group-item>
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
      title: 'Add a new owner'
    },
    async asyncData({ $axios }) {
      try {
        let res = await $axios.$get('http://localhost:4004/api/owners')
        // let owners = $axios.$get('http://localhost:4004/api/owners')

        return {
          owners: res.owners,
        }
      }
      catch(err) {
        console.log(err)
      }
    },
    data() {
      return {
        name: '',
        about: '',
        selectedFile: '',
      }
    },
    comoputed:{

    },
    methods: {
      onFileSelected(fileList) {
        // debugger
        this.selectedFile = event.target.files[0]
      },
      formatNames(files=[]) {
        // this.selectedFile = files[0]
        if(files.length == 0) {
          return "No file chosen"
        }
        if (files.length === 1) {
          return files[0].name
        } else {
          return `${files.length} files selected`
        }
      },
      resetOwnerForm() {
        this.name = ''
        this.about = ''
        this.selectedFile = null
      },
      async onAddOwner() {
        let data = new FormData()

        data.append('name', this.name)
        data.append('about', this.about)
        data.append('photo', this.selectedFile)

        let result = await this.$axios.$post('http://localhost:4004/api/owners', data)
        console.log(`The new owner ${this.name} is added successfully...`)


        var dataObject = {};
        data.forEach((value, key) => {dataObject[key] = value});
        // dataObject = JSON.stringify(dataObject);

        if(result.status) {
          this.owners.push(dataObject)
          this.$refs.ownerPhotoInput.reset()
          this.makeToast()
          this.resetOwnerForm()
        }
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
            'The new owner ',
            h('strong', `${this.name}`),
            ' is added successfully... ',
            h('b-spinner', { props: { type: 'grow', small: true } })
          ],
        )
        this.$bvToast.toast(vNodesMsg, {
          title: 'Add Owner Status',
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
