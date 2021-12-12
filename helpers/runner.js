import axios from 'axios'

class Runner {

  environmentVariables = null
  previousStepsData = []

  constructor(environmentVariables) {
    this.environmentVariables = environmentVariables
  }

  getAcceptTypes(contentType){
    if(contentType === 'json'){
      return 'application/json'
    }else if(contentType === 'xml'){
      return 'application/xml'
    }else if(contentType === 'html') {
      return 'text/html'
    }else if(contentType === 'raw'){
      return 'text/plain'
    }
  }

  sendRequest(step){
    return axios({
      method: step.method,
      url: step.url,
      data: (step.body_type && step.body_type) !== "none" ? step.body : undefined,
      headers: {
        'Content-Type': (step.body_type && step.body_type) ? this.getAcceptTypes(step.content_type) : undefined
      }
    })
  }

  prepareStepData(step){
    return step
  }

  getVariableFromString(string){
    let parts = String(string).split('.')
    if(parts.length === 0){
      return ''
    }
    if(parts[0] === "ENV"){
      if(!parts[1]) {
        return ''
      }
      return this.environmentVariables[parts[1]] || ''
    }
    if(parts[0] === "PREV"){
      if(!parts[1]) {
        return ''
      }
      if(!this.previousStepsData[parts[1]]){
        return ''
      }
      if(!parts[2] || parts[2] !== 'data' ||parts[2] !== 'headers'){
        return ''
      }
      parts = parts.slice(3)
      if(parts.length === 0){
        return ''
      }
      let mainObject = this.previousStepsData[parts[1][parts[2]]]
      for (const property of parts) {
        // eslint-disable-next-line no-prototype-builtins
        if(mainObject.hasOwnProperty(property)){
          mainObject = mainObject[property]
        }else{
          return ''
        }
      }
      if(typeof mainObject === 'string' || typeof mainObject === 'number'){
        return mainObject
      }
      return ''
    }
  }

  run(step){
    return new Promise((resolve, reject) => {
      step = this.prepareStepData(step)
      this.sendRequest(step).then(res => {
        this.previousStepsData.push({
          data: res.data,
          headers: res.headers
        })
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

}

export default Runner
