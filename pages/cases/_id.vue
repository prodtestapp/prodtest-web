<template>
  <div v-if='!loading && testCase'>
    <PageTitle
      :title="testCase.name"
      :left-button-text='$t("Add New Step")'
      :right-button-text='$t("Environment Variables")'
      @left-button-click='showCreateModal'
      @right-button-click='showEnvironmentsModal'
    >
      <template #rightComponent>
        <EnvironmentSelect class='mr-3' :project-id='testCase.project.id' />
      </template>
    </PageTitle>
    <div v-if='steps !== null' class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{$t('Name')}}
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{$t('Key')}}
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{$t('Method')}}
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{$t('URL')}}
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{$t('Status')}}
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">{{ $t("Actions") }}</span>
                </th>
              </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for='step in steps' :key='`step-${step.id}`'>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ step.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <kbd>{{step.key}}</kbd>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{step.method}}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{step.url}}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span v-if='!runLog[step.id]' class="px-2 py-1 text-gray-800 text-xs font-medium bg-gray-100 rounded-full">{{$t('Waiting')}}</span>
                    <span v-else-if='activeRunStepId === step.id' class="px-2 py-1 text-white text-xs font-medium bg-gray-600 rounded-full">{{$t('Processing')}}</span>
                    <span v-else-if='runLog[step.id].status === false' class="px-2 py-1 text-red-800 text-xs font-medium bg-red-100 rounded-full">{{$t('Failed')}}</span>
                    <span v-else-if='runLog[step.id].status === true' class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{$t('Success')}}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <span class="relative z-0 inline-flex shadow-sm rounded-md">
                      <button type="button" class="-ml-px relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" @click.prevent='toggleStep(step)'>
                        <span class="sr-only">{{$t('Toggle')}}</span>
                        <svg v-if='toggleStepId === step.id' class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                        <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button type="button" class="-ml-px relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" @click.prevent='showEditStepModal(step)'>
                        <span class="sr-only">{{$t('Edit')}}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button type="button" class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" @click.prevent='deleteStep(step)'>
                        <span class="sr-only">{{$t('Delete')}}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </span>
                  </td>
                </tr>
                <tr v-if='steps.length === 0'>
                  <td class='text-sm text-gray-800 text-center py-10' colspan='7'>{{$t('This table is empty yet')}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <t-modal
      ref="createStepModal"
      :header="$t('Add New Step')"
      :classes='{...modalClasses, wrapper: "z-50 max-w-xl px-3 py-12", }'
    >
      <form class='px-2 py-2' @submit.prevent="addStep">
        <div>
          <label for="create-step-name" class="block text-sm font-medium text-gray-700">{{ $t('Step Name') }}</label>
          <div class="mt-1">
            <input id="create-step-name" v-model='createStep.name' type="text" required="" :class='{"border-red-300": createValidationErrors.name}' class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <p v-if='createValidationErrors.name' class="mt-2 text-sm text-red-600">{{createValidationErrors.name[0]}}</p>
        </div>
        <div class='mt-3'>
          <label for="create-step-url" class="block text-sm font-medium text-gray-700">{{ $t('URL') }}</label>
          <div class="mt-1">
            <input id="create-step-url" v-model='createStep.url' type="text" required="" :class='{"border-red-300": createValidationErrors.url}' class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <p v-if='createValidationErrors.url' class="mt-2 text-sm text-red-600">{{createValidationErrors.url[0]}}</p>
        </div>
        <div class='mt-3'>
          <label class="block text-sm font-medium text-gray-700">{{ $t('Method') }}</label>
          <select v-model='createStep.method' class="w-full inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <option v-for='method in allowedMethods' :key='`create-method-${method}`' :value='method'>{{method}}</option>
          </select>
        </div>
        <div class='mt-3 headers-code-block'>
          <label class="block text-sm font-medium text-gray-700">{{ $t('Headers') }}<span class='text-gray-400 ml-1 font-normal text-sx'>(json)</span></label>
          <codemirror v-model="createStep.headers" :options="headersCmOptions"></codemirror>
        </div>
        <div class='mt-4'>
          <label class="block text-sm font-medium text-gray-700">{{ $t('Content Type') }}</label>
          <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-5 mt-2">
            <div v-for='contentType in allowedContentTypes' :key='`create-content-type-${contentType}`' class='flex items-center'>
              <input :id="`create-content-type-item-${contentType}`" v-model='createStep.contentType' name='"create-content-type' type="radio" checked class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" :value='contentType'>
              <label :for="`create-content-type-item-${contentType}`" class="pl-2 block text-sm font-medium text-gray-700">
                {{contentType}}
              </label>
            </div>
          </div>
          <p v-if='createValidationErrors.body_type' class="mt-2 text-sm text-red-600">{{createValidationErrors.body_type[0]}}</p>
        </div>
        <div v-show='createStep.contentType !== "none"' class='mt-3'>
          <label class="block text-sm font-medium text-gray-700">{{ $t('Body') }}</label>
          <codemirror v-model="createStep.body" :options="bodyCmOptions"></codemirror>
        </div>
        <div class='mt-4'>
          <label for="create-step-expected-status" class="block text-sm font-medium text-gray-700">{{ $t('Expected Status Code') }}</label>
          <div class="mt-1">
            <input id="create-step-expected-status" v-model='createStep.expectedStatus' type="number" required="" :class='{"border-red-300": createValidationErrors.expectedStatus}' class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <p v-if='createValidationErrors.expected_status' class="mt-2 text-sm text-red-600">{{createValidationErrors.expected_status[0]}}</p>
        </div>
        <div v-show='createStep.contentType === "json"' class='mt-4'>
          <label class="block text-sm font-medium text-gray-700">{{ $t('Use Validator') }}</label>
          <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-5 mt-2">
            <div v-for='(useValidatorOption, index) in useValidatorOptions' :key='`create-use-validator-${index}`' class='flex items-center'>
              <input :id="`create-use-validator-item-${index}`" v-model='createStep.useValidator' name='create-use-validator' type="radio" checked class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" :value='useValidatorOption.value'>
              <label :for="`create-use-validator-item-${index}`" class="pl-2 block text-sm font-medium text-gray-700">
                {{useValidatorOption.label}}
              </label>
            </div>
          </div>
          <p v-if='createValidationErrors.use_validator' class="mt-2 text-sm text-red-600">{{createValidationErrors.use_validator[0]}}</p>
        </div>
        <div v-show='createStep.contentType === "json" && createStep.useValidator' class='mt-4'>
          <label class="block text-sm font-medium text-gray-700">{{ $t('Validation Schema') }}</label>
          <codemirror v-model="createStep.validationSchema" :options="validationCmOptions"></codemirror>
          <p v-if='createValidationErrors.validator_schema' class="mt-2 text-sm text-red-600">{{createValidationErrors.validator_schema[0]}}</p>
          <p  class="mt-2 text-sm text-blue-400" v-html='$t("ajv_validation_information")'></p>
        </div>
      </form>
      <template #footer>
        <div class="flex justify-between">
          <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" @click='closeCreateModal'>
            {{$t('Cancel')}}
          </button>
          <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" @click='addStep'>
            {{$t('Add Step')}}
          </button>
        </div>
      </template>
    </t-modal>
    <EnvironmentsModal :project-id="testCase.project.id" :is-visible='isVisibleEnvironmentsModal' @close='hideEnvironmentsModal'  />
  </div>
</template>

<script>
import EnvironmentsModal from '~/components/EnvironmentsModal'
import EnvironmentSelect from '~/components/EnvironmentSelect'
import { getDefaultModalClasses } from '~/helpers/defaultModalClasses'
const Ajv = require("ajv")
export default {
  name: 'Project',
  components: { EnvironmentSelect, EnvironmentsModal },
  layout: 'Dashboard',
  middleware: 'auth',
  data(){
    return {
      loading: true,
      testCase: null,
      editStep: {},
      createStep: {},
      createValidationErrors: {},
      editValidationErrors: {},
      isVisibleEnvironmentsModal: false,
      steps: null,
      runLog: {},
      activeRunStepId: null,
      toggleStepId: null,
      modalClasses: getDefaultModalClasses(),
      allowedMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
      defaultCreateData: {
        method: "GET",
        contentType: "none",
        expectedStatus: 200,
        headers: "{}",
        useValidator: false,
        body: '',
        validationSchema: '{}',
      },
      allowedContentTypes: ["none", "raw", "json", "xml", "html"],
      bodyCmOptions: {
        tabSize: 2,
        mode: 'javascript',
        line: true,
        linerWrapping: true,
        lint: true,
        lineNumbers: true,
        autoCloseBrackets: true,
      },
      headersCmOptions: {
        tabSize: 2,
        mode: 'javascript',
        line: true,
        linerWrapping: true,
        lint: true,
        lineNumbers: true,
        autoCloseBrackets: true,
      },
      validationCmOptions: {
        tabSize: 2,
        mode: 'javascript',
        line: true,
        linerWrapping: true,
        lint: true,
        lineNumbers: true,
        autoCloseBrackets: true,
      },
      useValidatorOptions: [
        {value: false, label: this.$t("Don't use validator")},
        {value: true, label: this.$t('Use validator')},
      ],
      ajv: new Ajv()
    }
  },
  watch: {
    "createStep.contentType"(contentType){
      let mode = ""
      if(contentType === "json"){
        mode = 'javascript'
      }else if(contentType === 'xml' || contentType === 'html'){
        mode = "text/html"
      }else {
        mode = "text/plain"
      }
      this.bodyCmOptions = {
        ...this.bodyCmOptions,
        mode
      }
      if(contentType !== "json"){
        this.createStep.useValidator = false
      }
    }
  },
  async mounted() {
    await this.loadCase()
    this.loadSteps()
  },
  methods: {
    async loadCase(){
      this.loading = true
      try {
        const res = await this.$axios.get(`cases/${this.$route.params.id}`)
        this.testCase = res.data.data
      } catch(e) {
        this.$toast.error(this.$t('default_error').toString())
      } finally {
        this.loading = false
      }
    },
    loadSteps(){
      this.$axios.get(`cases/${this.$route.params.id}/steps`).then((res) => {
        this.steps = res.data.data
      })
    },
    showCreateModal(){
      this.createStep = {...this.defaultCreateData}
      this.$refs.createStepModal.show()
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
      this.$refs.createStepModal.hide()
      this.createStep = {}
    },
    addStep(){
      if(this.createStep.headers){
        try {
          JSON.parse(this.createStep.headers)
        }catch(err){
          this.$toast.error(this.$t('headers_not_valid').toString())
          return
        }
      }

      if(this.createStep.useValidator && this.createStep.useValidator){
        try {
          const schemaObject = JSON.parse(this.createStep.validationSchema)
          this.ajv.compile(schemaObject)
        }catch (err) {
          this.$toast.error(this.$t('validation_schema_error').toString())
          return
        }
      }

      const data = {
        name: this.createStep.name,
        url: this.createStep.url,
        method: this.createStep.method,
        headers: this.createStep.headers,
        body_type: this.createStep.contentType !== "none" ? this.createStep.contentType : undefined,
        body: this.createStep.body || undefined,
        expected_status: String(this.createStep.expectedStatus),
        use_validator: this.createStep.useValidator,
        validator_schema:  this.createStep.useValidator ? this.validator_schema : undefined
      }

      this.$axios.post(`cases/${this.$route.params.id}/steps`, data).then(res => {
        this.steps = [...this.steps, res.data.data]
        this.$refs.createStepModal.hide()
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
    },
    toggleStep(step){
      if(this.toggleStepId === step.id){
        this.toggleStepId = null
        return
      }
      this.toggleStepId = step.id
    },
  }
}
</script>


<style>
.cm-s-default {
  height: 180px;
}

.headers-code-block .cm-s-default {
  height: 100px;
}
</style>
