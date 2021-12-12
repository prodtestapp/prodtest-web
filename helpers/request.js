class Request {

  stepData = null
  environmentVariables = null
  previousStepsData = []

  constructor(stepData, environmentVariables) {
    this.stepData = stepData
    this.environmentVariables = environmentVariables
  }

  sendRequest(){
    return new Promise((resolve, reject) => {
      resolve(this.stepData)
    })
  }

  prepareData(){
    return this.stepData
  }

}

export default Request
