<template>
  <div>
    <select class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @change='onChangeEnvironment'>
      <option :value='0' :selected='activeEnvironmentId === 0'>{{$t('None')}}</option>
      <option v-for='env in environments' :key='`select-env-${env.id}`' :selected='env.id === activeEnvironmentId' :value='env.id'>{{env.name}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'EnvironmentSelect',
  props: {
    projectId: {
      type: Number,
      required: true
    }
  },
  computed: {
    environments(){
      return this.$store.state.environments.environments[this.projectId] || [];
    },
    activeEnvironmentId() {
      return this.$store.state.environments.activeEnvironmentIds[this.projectId] || 0;
    }
  },
  methods: {
    onChangeEnvironment(event){
      this.$store.commit('environments/setActiveEnvironmentId', {projectId: this.projectId, environmentId: event.target.value});
    }
  }
}
</script>
