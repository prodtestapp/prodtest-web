<template>
  <form @submit.prevent='changePassword'>
    <div class='shadow sm:rounded-md sm:overflow-hidden'>
      <div class='px-4 py-5 bg-white space-y-6 sm:p-6'>
        <div class='grid grid-cols-3 gap-6'>
          <div class='col-span-3 sm:col-span-2'>
            <label for='password' class='block text-sm font-medium text-gray-700'>{{ $t('Password') }}</label>
            <input id='password' v-model='password' :class='{"border-red-300": validationErrors.password}' name='email'
                   type='password' required=''
                   class='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />

            <label for='password-confirmation' class='block text-sm font-medium text-gray-700 mt-2'>
              {{ $t('Password Again') }}
            </label>
            <input id='password-confirmation' v-model='password_confirmation' :class='{"border-red-300": validationErrors.password_confirmation}' name='email'
                   type='password' required=''
                   class='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
          </div>
        </div>
      </div>
      <div class='px-4 py-3 bg-gray-50 text-right sm:px-6'>
        <button type='submit'
                class='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          {{ $t('Change Password') }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
      password: '',
      password_confirmation: '',
      validationErrors: {},
    }
  },
  methods: {
    changePassword() {
      this.$axios
        .post('auth/change-password', { password: this.password, password_confirmation: this.password_confirmation })
        .then(() => {
          this.password = ''
          this.password_confirmation = ''
        })
        .catch(error => {
          this.$toast.error(error.response.data.message)
        })
    }
  }
}
</script>
