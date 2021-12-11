<template>
  <div v-if='!loading && project'>
    <PageTitle :title="project.name" :button-text='$t("Add new Case")' @button-click='showAddCaseModal' />
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{$t('Case Name')}}
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{$t('Step Count')}}
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{$t('Last Check Status')}}
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">{{ $t("Actions") }}</span>
                </th>
              </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for='testCase in project.cases' :key='`case-${testCase.id}`'>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ testCase.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{testCase.steps_count}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span v-if='!testCase.last_check_date' class="px-2 py-1 text-gray-800 text-xs font-medium bg-gray-100 rounded-full">{{$t('Never run yet')}}</span>
                  <span v-else-if='testCase.last_check_status === false' class="px-2 py-1 text-red-800 text-xs font-medium bg-red-100 rounded-full">{{$dayjs(testCase.last_check_date).format('lll')}}</span>
                  <span v-else-if='testCase.last_check_status === true' class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{$dayjs(testCase.last_check_date).format('lll')}}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <span class="relative z-0 inline-flex shadow-sm rounded-md">
                    <button type="button" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                      <span class="sr-only">{{$t('Run')}}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <button type="button" class="-ml-px relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                      <span class="sr-only">{{$t('Edit')}}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button type="button" class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                      <span class="sr-only">{{$t('Delete')}}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Project',
  layout: 'Dashboard',
  middleware: 'auth',
  data(){
    return {
      loading: true,
      project: true
    }
  },
  mounted() {
    this.loadProject()
  },
  methods: {
    loadProject(){
      this.loading = true
      this.$axios.get(`projects/${this.$route.params.id}`).then((res) => {
        this.project = res.data.data
      }).finally(() => {
        this.loading = false
      })
    },
    showAddCaseModal(){
      alert('show')
    }
  }
}
</script>
