<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <img class="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
            <img class="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg" alt="Workflow">
          </div>
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
            {{$t('Hello, ')}} {{$auth.user.full_name}}
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
  mounted() {
  }
}
</script>

<style lang='scss' scoped>
.nuxt-link-active {
  @apply border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
}
</style>
