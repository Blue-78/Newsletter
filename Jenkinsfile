pipeline {
  agent any
  stages {
    stage('git') {
      steps {
        git(url: 'https://github.com/Blue-78/Newsletter', branch: 'master')
      }
    }

    stage('shell') {
      steps {
        sh 'ls -la'
      }
    }

  }
}