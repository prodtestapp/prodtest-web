<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <RouterLink style='border-width: 0' to='/projects' class="flex-shrink-0 flex items-center">
            <img class="block h-8 w-auto" src="/images/logo.png" alt="ProdTest">
          </RouterLink>
          <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            <NuxtLink to='/projects' class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" aria-current="page">
              Projects
            </NuxtLink>
            <NuxtLink to='/users' class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" aria-current="page">
              Users
            </NuxtLink>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <p class="text-gray-400 inline-flex items-center px-1 pt-1 mr-4 text-sm font-medium" aria-current="page">
            {{$t('Hello, ')}} {{$auth.user.data.full_name}}
          </p>
          <NuxtLink to='/account' class="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 mr-3 text-sm font-medium" aria-current="page">
            Settings
          </NuxtLink>
          <NuxtLink to='/logout' class="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium" aria-current="page">
            Logout
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style lang='scss' scoped>
.nuxt-link-active {
  @apply border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
}
</style>
