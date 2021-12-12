<template>
  <div>
    <header>
      <div class="max-w-7xl mx-auto mb-8 flex">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
          {{ title }}
        </h1>
        <button v-if='leftButtonText' type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-4" @click='$emit("left-button-click")'>
          {{leftButtonText}}
        </button>
        <div class='flex ml-auto'>
          <slot name="rightComponent"></slot>
          <button v-if='rightButtonText' type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click='$emit("right-button-click")'>
            {{rightButtonText}}
          </button>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    leftButtonText: {
      type: String,
      default: null,
      required: false
    },
    rightButtonText: {
      type: String,
      default: null,
      required: false
    },
  }
}
</script>
