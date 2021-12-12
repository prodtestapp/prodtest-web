<template>
  <t-modal
    ref="environmentsModal"
    v-model='isVisibleModel'
    :header="$t('Environment Variables')"
    :classes="{
      overlay: 'z-40 bg-black bg-opacity-50',
      wrapper: 'z-50 w-4/5 lg:w-3/5 xl:w-2/5 px-3 py-12',
      modal: 'bg-white shadow rounded',
      body: 'p-3',
      header: 'border-b border-gray-100 p-3 rounded-t',
      footer: 'bg-gray-100 p-3 rounded-b',
      close: 'bg-gray-100 text-gray-600 rounded-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100 ease-in-out hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
      closeIcon: 'fill-current h-4 w-4',
      overlayEnterClass: 'opacity-0',
      overlayEnterActiveClass: 'transition ease-out duration-100',
      overlayEnterToClass: 'opacity-100',
      overlayLeaveClass: 'opacity-100',
      overlayLeaveActiveClass: 'transition ease-in duration-75',
      overlayLeaveToClass: 'opacity-0',
      enterClass: '',
      enterActiveClass: '',
      enterToClass: '',
      leaveClass: '',
      leaveActiveClass: '',
      leaveToClass: '',
    }"
    @before-close='$emit("close")'
  >
    <form class='px-2 py-2' >
      <div class='flex'>
        <div style='flex: 2'>
          <form class='mb-3 flex' @submit.prevent='addNewEnvironment'>
            <input id="add-new-environment" v-model="newEnvironmentName" :placeholder='$t("Add New Environment")' :class='{"border-red-300": addValidationErrors.name}' name="add-new-environment" type="text" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <button type="submit" class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              <span>{{$t('Add')}}</span>
            </button>
            <p v-if='addValidationErrors.email' class="mt-2 text-sm text-red-600">{{addValidationErrors.name[0]}}</p>
          </form>
          <nav class="space-y-1" aria-label="environments" >
            <a v-for='env in environments' :key='`env-${env.id}`' class="cursor-pointer group flex items-center px-3 py-2 text-sm font-medium rounded-md" :class='{"bg-gray-100 text-gray-900": env.id === selectedEnvironmentId, "text-gray-600 hover:bg-gray-50 hover:text-gray-900": env.id === selectedEnvironmentId}' aria-current="page" @click='changeSelectedEnv(env.id)'>
            <span class="truncate">
              {{ env.name }}
            </span>
            </a>
          </nav>
        </div>
        <div class='pl-8' style='flex: 5'>
          <div v-for='(dataItem, dataItemIndex) in activeData' :key='`env-${selectedEnvironmentId}-${dataItemIndex}`' class='flex mb-3'>
            <input v-model="dataItem.key" style='flex: 2' :placeholder='$t("Key")' :class='{"border-red-300": addValidationErrors.name}' type="text" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 border-r-0 rounded-l-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <input v-model="dataItem.value" style='flex: 3' :placeholder='$t("Value")' :class='{"border-red-300": addValidationErrors.name}' type="text" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <button type='button' class="items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full text-center" @click='addNewVariableToActiveData'>
            <span>{{$t('Add New Variable')}}</span>
          </button>
        </div>
      </div>
    </form>
    <template #footer>
      <div class="flex justify-between">
        <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" @click='$emit("close")'>
          {{$t('Cancel')}}
        </button>
        <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" @click='save'>
          {{$t('Save')}}
        </button>
      </div>
    </template>
  </t-modal>
</template>

<script>
export default {
  name: 'EnvironmentsModal',
  props: {
    projectId: {
      type: Number,
      required: true
    },
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      loading: false,
      environments: [],
      isVisibleModel: this.isVisible,
      selectedEnvironmentId: null,
      activeData: [],
      newEnvironmentName: '',
      addValidationErrors: {}
    }
  },
  watch: {
    isVisible(value){
      this.isVisibleModel = value
    }
  },
  mounted() {
    this.loadEnvironments()
  },
  methods: {
    loadEnvironments(selectLast = false){
      this.loading = true;
      this.$axios.get(`projects/${this.projectId}/environments`).then(res => {
        this.environments = res.data.data
        this.$store.commit('environments/setEnvironmentsData', {projectId: this.projectId, environments: res.data.data})
        if(res.data.data.length > 0){
          if(selectLast) {
            this.selectedEnvironmentId = res.data.data[res.data.data.length - 1].id
          }else {
            this.selectedEnvironmentId = res.data.data[0].id
          }
          this.importDataFromSelected()
        }
      }).finally(() => {
        this.loading = false
      })
    },
    save(){
      const filteredData = this.activeData.filter(item => item.key)
      this.$axios.put(`environments/${this.selectedEnvironmentId}`, {data: JSON.stringify(filteredData)}).then(res => {
        this.environments = this.environments.map(env => env.id === this.selectedEnvironmentId ? {...env, data: res.data.data} : env)
        this.importDataFromSelected()
      }).catch(() => {
        this.$toast.error(this.$t('default_error').toString())
      })
    },
    importDataFromSelected(){
      let data = JSON.parse(this.environments.find(env => env.id === this.selectedEnvironmentId).data)
      if(!data){
        data = []
      }
      data = data.filter(item => item.key)
      this.activeData = data
    },
    changeSelectedEnv(id){
      this.selectedEnvironmentId = id
      this.importDataFromSelected()
    },
    addNewEnvironment(){
      this.$axios.post(`projects/${this.projectId}/environments`, {
        name: this.newEnvironmentName,
        data: JSON.stringify([])
      }).then(() => {
        this.loadEnvironments(true)
      }).catch(err => {
        if(err.response.status === 422){
          this.addValidationErrors = err.response.data.errors
        }else{
          this.$toast.error(this.$t('default_error').toString())
        }
      })
    },
    addNewVariableToActiveData(){
      this.activeData.push({
        key: '',
        value: ''
      })
    }
  }
}
</script>
