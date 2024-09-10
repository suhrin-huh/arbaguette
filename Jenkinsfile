pipeline {
    agent any

    environment {
        
    }

    stages {
        stage('Build Backend') {
            steps {
                script {
                    dir('backend/Arbaguette') {
                        sh 'chmod +x ./gradlew'
                        sh './gradlew clean build -x test'
                        sh "docker build -t /backend/Arbaguette ."
                    }
                }
            }
        }
        
        
    }
}