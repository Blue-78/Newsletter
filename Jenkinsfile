pipeline {
  agent any
  stages {
    stage('git') {
      steps {
        git(url: 'https://github.com/Blue-78/Newsletter', branch: 'master')
      }
    }

    stage('shell') {
      parallel {
        stage('shell') {
          steps {
            sh 'ls -la'
          }
        }

        stage('chnagedir') {
          steps {
            sh 'cd node_modules'
          }
        }

      }
    }

  }
}