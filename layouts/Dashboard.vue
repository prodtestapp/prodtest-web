<template>
  <div class="min-h-full">
    <Navbar />
    <div class="py-10">
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Nuxt />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/partials/Navbar'
export default {
  name: 'Dashboard',
  components: { Navbar },
  head: {
    htmlAttrs: {
      class: 'h-full bg-gray-50'
    },
    bodyAttrs: {
      class: 'h-full'
    },
  },
}
</script>

