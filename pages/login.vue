<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 class="mt-10 text-center text-4xl font-extrabold text-indigo-700">
        ProdTest
      </h1>
      <h2 class="mt-4 text-center text-3xl font-semibold text-gray-800">
        {{$t('Sign in to your account')}}
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent='submitLogin'>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              {{$t('Email address')}}
            </label>
            <div class="mt-1">
              <input id="email" v-model="email" :class='{"border-red-300": validationErrors.email}' name="email" type="email" autocomplete="email" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <p v-if='validationErrors.email' id="email-error" class="mt-2 text-sm text-red-600">{{validationErrors.email[0]}}</p>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              {{$t('Password')}}
            </label>
            <div class="mt-1">
              <input id="password" v-model="password" :class='{"border-red-300": validationErrors.password}' name="password" type="password" autocomplete="current-password"  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <p v-if='validationErrors.password' id="password-error" class="mt-2 text-sm text-red-600">{{validationErrors.password[0]}}</p>
          </div>
          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {{$t('Sign in')}}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      email: '',
      password: '',
      validationErrors: {}
    }
  },
  head: {
    htmlAttrs: {
      class: 'h-full bg-gray-50'
    },
    bodyAttrs: {
      class: 'h-full'
    },
  },
  methods: {
    submitLogin(){
      this.validationErrors = {}
      this.$auth.loginWith('laravelJWT', {
        data: {
          email: this.email,
          password: this.password
        }
      }).then((res) => {
        this.$auth.setUser(res.data.user)
        this.$auth.setUserToken(res.data.token).then(() => {
          this.$router.push({name: 'projects'})
        })
      }).catch((err) => {
        if(err.response.status === 422){
          this.validationErrors = err.response.data.errors
        }else{
          this.$toast.error(this.$t('Email or password isn\'t correct').toString())
        }
      })
    }
  }
}
</script>
