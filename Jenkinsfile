pipeline {
  agent any
  stages {
    stage('chkoutcode') {
      steps {
        git(url: 'https://github.com/Blue-78/Newsletter', branch: 'master')
      }
    }

    stage('/shell-script') {
      steps {
        sh 'ls'
      }
    }

  }
}