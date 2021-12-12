<template>
  <form @submit.prevent='updateAccount'>
    <div class='shadow sm:rounded-md sm:overflow-hidden'>
      <div class='px-4 py-5 bg-white space-y-6 sm:p-6'>
        <div class='grid grid-cols-3 gap-6'>
          <div class='col-span-3 sm:col-span-2'>
            <label for='full-name' class='block text-sm font-medium text-gray-700'>{{ $t('Full Name') }}</label>
            <input id='full-name' v-model='fullName' :class='{"border-red-300": validationErrors.fullName}'
                   name='full-name' type='text' required=''
                   class='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
          </div>
        </div>
      </div>
      <div class='px-4 py-3 bg-gray-50 text-right sm:px-6'>
        <button type='submit'
                class='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          {{ $t('Save') }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'UpdateAccount',
  data() {
    return {
      fullName: this.$auth.user.data.full_name,
      validationErrors: {},
    }
  },
  methods: {
    updateAccount() {
      this.$axios
        .put('account', { full_name: this.fullName })
        .then(res => {
          this.$auth.user.data.full_name = res.data.data.full_name;
          this.$toast.success(this.$t('Updated!').toString());
        }).catch(() => {
          this.$toast.error(this.$t('default_error').toString())
      })
    }
  }
}
</script>

<style scoped>

</style>
