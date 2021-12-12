export const state = () => ({
  environments: {},
  activeEnvironmentIds: {}
})

export const mutations = {
  setEnvironmentsData(state, { projectId, environments }) {
    state.environments = {
      ...state.environments,
      [projectId]: environments
    }
  },
  setActiveEnvironmentId(state, { projectId, environmentId }) {
    state.activeEnvironmentIds = {
      ...state.activeEnvironmentIds,
      [projectId]: Number(environmentId)
    }
  }
}
