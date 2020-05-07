<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 offset-md-3" >
          <h1 class="text-center mt-2">
             Profile {{ $auth.$state.user.name | capitalize }}
          </h1>
          <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
          <b-form>
            <!-- User name -->
            <b-form-group label="Name:" label-for="userName"
              description="Please enter new name here">
              <b-form-input id="userName" v-model="$auth.$state.user.name" type="text" placeholder="Enter your new Name">
              </b-form-input>
            </b-form-group>
            <!-- Email -->
            <b-form-group label="Email:" label-for="email"
              description="Please enter new email here">
              <b-form-input id="email" v-model="$auth.$state.user.email" type="email" placeholder="Enter email">
              </b-form-input>
            </b-form-group>
            <!-- Password -->
            <b-form-group label="Password:" label-for="password"
              description="">
              <b-form-input id="password" v-model="password" type="password" required placeholder="Enter password">
              </b-form-input>
            </b-form-group>

            <b-row>
              <b-col class="mt-4">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="onUpdateProfile">Update Profile</span>
                  </span>
                </span>
              </b-col>
            </b-row>
            <!-- <b-button type="button" @click.prevent="onAddCategory" variant="primary">Update Profile</b-button>
            <b-button  ref="formReset" variant="danger">Reset</b-button> -->
          </b-form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    head: {
      title: 'Update Profile'
    },
    data() {
      return {
        name: '',
        email: '',
        password: '',
      }
    },
    comoputed:{

    },
  };

</script>

<style lang="scss" scoped>
</style>
