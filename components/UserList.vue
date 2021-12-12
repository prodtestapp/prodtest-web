<template>
  <div class='shadow sm:rounded-md sm:overflow-hidden'>
    <div class='max-w-lg mx-auto'>
      <div>
        <div class='text-center'>
          <svg class='mx-auto h-12 w-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 48 48'
               aria-hidden='true'>
            <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
                  d='M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z' />
          </svg>
          <h2 class='mt-2 text-lg font-medium text-gray-900'>{{ $t('Add New User') }}</h2>
        </div>
        <form class='mt-6 flex flex-col' @submit.prevent='addNewUser'>
          <div class='col-span-12 sm:col-span-6'>
            <label for='full-name' class='block text-sm font-medium text-gray-700'>Full name</label>
            <input id='full-name' v-model='userObject.full_name' :class='{"border-red-300": validationErrors.full_name}'
                   name='full-name' type='text' required=''
                   class='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />

            <label for='email' class='block text-sm font-medium text-gray-700'>Email address</label>
            <input id='email' v-model='userObject.email' :class='{"border-red-300": validationErrors.email}'
                   name='email' type='email' autocomplete='email' required=''
                   class='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />

            <label for='password' class='block text-sm font-medium text-gray-700'>Password</label>
            <input id='password' v-model='userObject.password' :class='{"border-red-300": validationErrors.password}'
                   name='password' type='password' required=''
                   class='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
          </div>

          <div class='col-span-12 flex justify-end mt-5'>
            <button type='submit'
                    class='ml-4 flex-shrink-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
              {{ $t('Add New User') }}
            </button>
          </div>
        </form>
      </div>
      <div class='mt-10'>
        <h3 class='text-xs font-semibold text-gray-500 uppercase tracking-wide'>{{ $t('Users') }}</h3>
        <ul role='list' class='mt-4 border-t border-b border-gray-200 divide-y divide-gray-200'>
          <li v-for='(user, index) in users' :key='`user-${index}`'
              class='py-4 flex items-center justify-between space-x-3'>
            <div class='min-w-0 flex-1 flex items-center space-x-3'>
              <div class='flex-shrink-0'>
                <img class='h-10 w-10 rounded-full'
                     :src='`https://ui-avatars.com/api/?name=${encodeURI(user.full_name)}&background=random`'
                     :alt='user.full_name'>
              </div>
              <div class='min-w-0 flex-1'>
                <p class='text-sm font-medium text-gray-900 truncate'>{{ user.full_name }}</p>
                <p class='text-sm font-medium text-gray-500 truncate'>{{ user.email }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      users: [],
      userObject: {
        full_name: '',
        email: '',
        password: ''
      },
      validationErrors: {},
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      this.$axios.get('users').then(response => {
        this.users = response.data.data
      })
    },
    addNewUser() {
      this.$axios.post('users', this.userObject).then(response => {
        this.users.push(response.data.data)
        this.userObject.email = ''
        this.userObject.password = ''
        this.userObject.full_name = ''
      }).catch(err => {
        if (err.response.status === 422) {
          this.validationErrors = err.response.data.errors
        } else {
          this.$toast.error(this.$t('default_error').toString())
        }
      })
    }
  }
}
</script>
