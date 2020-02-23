
pipeline {
    agent { docker { image 'node:12.16' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
