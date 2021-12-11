<template>
  <li class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
    <NuxtLink :to='`/projects/${project.id}`' class="flex-1 flex flex-col p-8">
      <div class='avatar-wrapper'>
        <div class='avatar' :class='{[project.background_color]: true}'>
          {{project.name ? project.name.charAt(0) : '?'}}
        </div>
      </div>
      <h3 class="mt-6 text-gray-900 text-sm font-medium">{{project.name}}</h3>
      <dl class="mt-1 flex-grow flex flex-col justify-between">
        <dt class="sr-only">Title</dt>
        <dd class="text-gray-500 text-sm"> {{ getCaseCount() }}</dd>
        <dt class="sr-only">Role</dt>
        <dd class="mt-3">
          <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{$dayjs().format('lll')}}</span>
        </dd>
      </dl>
    </NuxtLink>
    <div>
      <div class="-mt-px flex divide-x divide-gray-200">
        <div class="w-0 flex-1 flex">
          <button class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500" @click='$emit("edit", project)'>
            <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="ml-3">{{ $t('Edit') }}</span>
          </button>
        </div>
        <div class="-ml-px w-0 flex-1 flex">
          <button class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500" @click='$emit("delete", project)'>
            <!-- Heroicon name: solid/phone -->
            <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span class="ml-3">{{$t('Delete')}}</span>
          </button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  methods: {
    getCaseCount(){
      if(this.project.cases_count === 0){
        return this.$t('No Test Case')
      }
      if(this.project.cases_count === 1){
        return `1 ${this.$t('Test Case')}`
      }
      return `${this.project.cases_count} ${this.$t('Test Cases')}`
    }
  }
}
</script>

<style lang='scss' scoped>
.avatar-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  .avatar {
    width: 128px;
    height: 128px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 46px;
    font-weight: bold;
    color: #fff;
  }
}
</style>
