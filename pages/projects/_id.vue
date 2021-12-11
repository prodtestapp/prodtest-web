<template>
  <div v-if='!loading && project'>
    <PageTitle
      :title="project.name"
      :left-button-text='$t("Add New Case")'
      :right-button-text='$t("Environment Variables")'
      @left-button-click='showCreateModal'
      @right-button-click='showEnvironmentsModal'
    />
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
                  {{testCase.steps_count}} {{$t('Steps')}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span v-if='!testCase.latest_log' class="px-2 py-1 text-gray-800 text-xs font-medium bg-gray-100 rounded-full">{{$t('Never run yet')}}</span>
                  <span v-else-if='testCase.latest_log.status === false' class="px-2 py-1 text-red-800 text-xs font-medium bg-red-100 rounded-full">{{$dayjs(testCase.latest_log.createdAt).format('lll')}}</span>
                  <span v-else-if='testCase.latest_log.status === true' class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{$dayjs(testCase.latest_log.createdAt).format('lll')}}</span>
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
                    <button type="button" class="-ml-px relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" @click.prevent='showEditCaseModal(testCase)'>
                      <span class="sr-only">{{$t('Edit')}}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button type="button" class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" @click.prevent='deleteCase(testCase)'>
                      <span class="sr-only">{{$t('Delete')}}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </span>
                </td>
              </tr>
              <tr v-if='project.cases.length === 0'>
                <td class='text-sm text-gray-800 text-center py-5' colspan='4'>{{$t('This table is empty yet')}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <t-modal
      ref="createCaseModal"
      :header="$t('Add New Case')"
    >
      <form class='px-2 py-2' @submit.prevent="addCase">
        <div>
          <label for="create-case-name" class="block text-sm font-medium text-gray-700">{{ $t('Case Name') }}</label>
          <div class="mt-1">
            <input id="create-case-name" v-model='createCase.name' name="project-name" type="text" required="" :class='{"border-red-300": editValidationErrors.name}' class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <p v-if='createValidationErrors.name' class="mt-2 text-sm text-red-600">{{createValidationErrors.name[0]}}</p>
        </div>
      </form>
      <template #footer>
        <div class="flex justify-between">
          <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" @click='closeCreateModal'>
            {{$t('Cancel')}}
          </button>
          <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" @click='addCase'>
            {{$t('Add Case')}}
          </button>
        </div>
      </template>
    </t-modal>
    <t-modal
      ref="editCaseModal"
      :header="$t('Edit Case')"
    >
      <form class='px-2 py-2' @submit.prevent="updateCase">
        <div>
          <label for="edit-project-name" class="block text-sm font-medium text-gray-700">{{ $t('Case Name') }}</label>
          <div class="mt-1">
            <input id="edit-project-name" v-model='editCase.name' name="project-name" type="text" required="" :class='{"border-red-300": editValidationErrors.name}' class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <p v-if='editValidationErrors.name' class="mt-2 text-sm text-red-600">{{editValidationErrors.name[0]}}</p>
        </div>
      </form>
      <template #footer>
        <div class="flex justify-between">
          <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" @click='closeEditModal'>
            {{$t('Cancel')}}
          </button>
          <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" @click='updateCase'>
            {{$t('Update')}}
          </button>
        </div>
      </template>
    </t-modal>
    <EnvironmentsModal :project-id="project.id" :is-visible='isVisibleEnvironmentsModal' @close='hideEnvironmentsModal'  />
  </div>
</template>

<script>
import EnvironmentsModal from '~/components/EnvironmentsModal'
export default {
  name: 'Project',
  components: { EnvironmentsModal },
  layout: 'Dashboard',
  middleware: 'auth',
  data(){
    return {
      loading: true,
      project: true,
      editCase: {},
      createCase: {},
      editValidationErrors: {},
      createValidationErrors: {},
      isVisibleEnvironmentsModal: false
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
    showCreateModal(){
      this.createProject = {}
      this.$refs.createCaseModal.show()
    },
    showEditCaseModal(testCase) {
      this.editCase = { ...testCase }
      this.$refs.editCaseModal.show()
    },
    closeEditModal(){
      this.$refs.editCaseModal.hide()
      this.editCase = {}
    },
    closeCreateModal(){
      this.$refs.createCaseModal.hide()
      this.createCase = {}
    },
    addCase(){
      this.$axios.post(`projects/${this.project.id}/cases`, {name: this.createCase.name}).then(res => {
        this.project = {...this.project, cases: [...this.project.cases, res.data.data]}
        this.$refs.createCaseModal.hide()
      }).catch(err => {
        if(err.response.status === 422){
          this.createValidationErrors = err.response.data.errors
        }else{
          this.$toast.error(this.$t('default_error').toString())
        }
      })
    },
    updateCase(){
      this.$axios.put(`cases/${this.editCase.id}`, {name: this.editCase.name}).then(res => {
        this.project = {
          ...this.project,
          cases: this.project.cases.map(tc => tc.id === res.data.data.id ? res.data.data : tc)
        }
        this.$refs.editCaseModal.hide()
      }).catch(err => {
        if(err.response.status === 422){
          this.editValidationErrors = err.response.data.errors
        }else{
          this.$toast.error(this.$t('default_error').toString())
        }
      })
    },
    deleteCase(testCase){
      const isConfirmed = confirm(this.$t('Want you delete this case?').toString())
      if(isConfirmed){
        this.$axios.delete(`cases/${testCase.id}`).then(() => {
          this.project = {
            ...this.project,
            cases: this.project.cases.filter(tc => tc.id !== testCase.id)
          }
        }).catch(() => {
          this.$toast.error(this.$t('default_error').toString())
        })
      }
    },
    showEnvironmentsModal(){
      this.isVisibleEnvironmentsModal = true
    },
    hideEnvironmentsModal(){
      this.isVisibleEnvironmentsModal = false
    }
  }
}
</script>
