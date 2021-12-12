import axios from 'axios'
import sjson from 'secure-json-parse'

class Runner {

  environmentVariables = null
  previousStepsData = {}

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
    return new Promise((resolve, reject) => {
      let bodyData
      let headersData
      try {
        if(step.body_type && step.body_type !== 'none' && step.body){
          if(step.body_type === 'json') {
            bodyData = sjson.parse(step.body)
          }else{
            bodyData = step.body
          }
        }
      }catch(err){
        reject(err)
        return
      }
      try {
        if(step.headers){
          headersData = sjson.parse(step.headers)
        }
      }catch(err){
        reject(err)
        return
      }
      axios({
        method: step.method,
        url: step.url,
        data: bodyData,
        headers: {
          'Content-Type': (step.body_type && step.body_type) ? this.getAcceptTypes(step.content_type) : undefined,
          ...headersData
        }
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  prepareStepData(step){
    const variablePattern = /{{([a-zA-Z0-9.-_]+)}}/gm
    if(step.body){
      const variablesInBody = [...String(step.body).matchAll(variablePattern)].map(match => ({key: match[1], withBrackets: match[0]}))
      if(variablesInBody.length > 0){
        for (const variable of variablesInBody) {
          const value = this.getVariableFromString(variable.key)
          step.body = step.body.replaceAll(variable.withBrackets, value)
        }
      }
    }
    if(step.headers){
      const variablesInBody = [...String(step.headers).matchAll(variablePattern)].map(match => ({key: match[1], withBrackets: match[0]}))
      for (const variable of variablesInBody) {
        const value = this.getVariableFromString(variable.key)
        step.headers = step.headers.replaceAll(variable.withBrackets, value)
      }
    }
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
      if(!parts[2] || (parts[2] !== 'data' && parts[2] !== 'headers')){
        return ''
      }
      parts = parts.slice(1)
      if(parts.length === 0){
        return ''
      }
      let mainObject = this.previousStepsData[parts[0]]
      parts = parts.slice(1)
      for (const property of parts) {
        // eslint-disable-next-line no-prototype-builtins
        if(mainObject.hasOwnProperty(property)){
          mainObject = mainObject[property]
        }else{
          return ''
        }
      }
      if(typeof mainObject === 'string' || typeof mainObject === 'number' || typeof mainObject === 'boolean'){
        return mainObject
      }
      return ''
    }
  }

  run(stepRef){
    let step = {...stepRef}
    return new Promise((resolve, reject) => {
      step = this.prepareStepData(step)
      this.sendRequest(step).then(res => {
        this.previousStepsData = {
          ...this.previousStepsData,
          [step.key]: {
            data: res.data,
            headers: res.headers
          }
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

}

export default Runner
