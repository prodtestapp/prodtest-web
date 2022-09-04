<template>
  <div>
    <PageTitle :title="$t('Projects')" />
    <ul role='list' class='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <ProjectCard
        v-for='project in projects'
        :key='`project-${project.id}`'
        :project='project'
        @edit='showEditProjectModal'
        @delete='deleteProject'
      />
      <div
        class='outline-0 relative flex flex-col justify-center align-center cursor-pointer w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2'
        @click='showCreateModal'>
        <svg class='mx-auto h-12 w-12 text-gray-400' xmlns='http://www.w3.org/2000/svg' stroke='currentColor'
             fill='none' viewBox='0 0 48 48' aria-hidden='true'>
          <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
                d='M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6' />
        </svg>
        <span class='mt-4 block text-sm font-medium text-gray-900'>
          {{ $t('Create New Project') }}
        </span>
      </div>
    </ul>
    <t-modal
      ref='createProjectModal'
      :header="$t('Create New Project')"
    >
      <form class='px-2 py-2 space-y-4' @submit.prevent='addProject'>
        <div>
          <label for='create-project-name' class='block text-sm font-medium text-gray-700'>{{ $t('Project Name')
            }} <span class='text-red-500'>*</span></label>
          <div class='mt-1'>
            <input id='create-project-name' v-model='createProject.name' name='project-name' type='text' required=''
                   :class='{"border-red-300": editValidationErrors.name}'
                   class='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
          </div>
          <p v-if='createValidationErrors.name' class='mt-2 text-sm text-red-600'>
            {{ createValidationErrors.name[0] }}</p>
        </div>
        <div>
          <label for='create-project-domain' class='block text-sm font-medium text-gray-700'>{{ $t('Domain') }} <span
            class='text-gray-500 font-normal'>({{ $t('optional') }})</span></label>
          <div class='mt-1'>
            <input id='create-project-domain' v-model='createProject.domain' name='project-domain' type='text'
                   placeholder='example.com'
                   :class='{"border-red-300": editValidationErrors.domain}'
                   class='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
          </div>
          <p v-if='createValidationErrors.domain' class='mt-2 text-sm text-red-600'>
            {{ createValidationErrors.domain[0] }}</p>
        </div>
      </form>
      <template #footer>
        <div class='flex justify-between'>
          <button type='button'
                  class='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                  @click='closeCreateModal'>
            {{ $t('Cancel') }}
          </button>
          <button type='button'
                  class='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                  @click='addProject'>
            {{ $t('Create Project') }}
          </button>
        </div>
      </template>
    </t-modal>
    <t-modal
      ref='editProjectModal'
      :header="$t('Edit Project')"
    >
      <form class='px-2 py-2' @submit.prevent='updateProject'>
        <div>
          <label for='edit-project-name' class='block text-sm font-medium text-gray-700'>{{ $t('Project Name')
            }} <span class='text-red-500'>*</span></label>
          <div class='mt-1'>
            <input id='edit-project-name' v-model='editProject.name' name='project-name' type='text' required=''
                   :class='{"border-red-300": editValidationErrors.name}'
                   class='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
          </div>
          <p v-if='editValidationErrors.name' class='mt-2 text-sm text-red-600'>{{ editValidationErrors.name[0] }}</p>
        </div>
      </form>
      <template #footer>
        <div class='flex justify-between'>
          <button type='button'
                  class='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                  @click='closeEditModal'>
            {{ $t('Cancel') }}
          </button>
          <button type='button'
                  class='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                  @click='updateProject'>
            {{ $t('Update') }}
          </button>
        </div>
      </template>
    </t-modal>
  </div>
</template>

<script>
import PageTitle from '~/components/PageTitle'
import ProjectCard from '~/components/ProjectCard'

export default {
  name: 'Projects',
  components: { ProjectCard, PageTitle },
  layout: 'Dashboard',
  middleware: 'auth',
  data() {
    return {
      loading: false,
      projects: [],
      editProject: {},
      createProject: {},
      editValidationErrors: {},
      createValidationErrors: {}
    }
  },
  mounted() {
    this.loadProjects()
  },
  methods: {
    loadProjects() {
      this.loading = true
      this.$axios.get('projects').then(res => {
        this.projects = res.data.data
      }).finally(() => {
        this.loading = false
      })
    },
    showEditProjectModal(project) {
      this.editProject = { ...project }
      this.$refs.editProjectModal.show()
    },
    updateProject() {
      this.$axios.put(`projects/${this.editProject.id}`, { ...this.editProject }).then(res => {
        this.projects = this.projects.map(project => project.id === res.data.data.id ? res.data.data : project)
        this.$refs.editProjectModal.hide()
      }).catch(err => {
        if (err.response.status === 422) {
          this.editValidationErrors = err.response.data.errors
        } else {
          this.$toast.error(this.$t('default_error').toString())
        }
      })
    },
    closeEditModal() {
      this.$refs.editProjectModal.hide()
      this.editProject = {}
    },
    closeCreateModal() {
      this.$refs.createProjectModal.hide()
      this.createProject = {}
    },
    showCreateModal() {
      this.createProject = {}
      this.$refs.createProjectModal.show()
    },
    addProject() {
      this.$axios.post('projects', { ...this.createProject }).then(res => {
        this.projects = [...this.projects, res.data.data]
        this.$refs.createProjectModal.hide()
      }).catch(err => {
        if (err.response.status === 422) {
          this.createValidationErrors = err.response.data.errors
        } else {
          this.$toast.error(this.$t('default_error').toString())
        }
      })
    },
    deleteProject(project) {
      const isConfirmed = confirm(this.$t('Want you delete this project?').toString())
      if (isConfirmed) {
        this.$axios.delete(`projects/${project.id}`).then(() => {
          this.projects = this.projects.filter(p => p.id !== project.id)
        }).catch(() => {
          this.$toast.error(this.$t('default_error').toString())
        })
      }
    }
  }
}
</script>
