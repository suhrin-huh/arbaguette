pipeline {
    agent any


    stages {
        stage('Build Backend') {
            steps {
                script {
                    dir('backend/Arbaguette') {
                        sh 'chmod +x ./gradlew'
                        sh './gradlew clean build -x test'

                        // Check if a container named 'backend' is running
                        def backendExists = sh(script: "docker ps --filter 'name=backend' --format '{{.Names}}'", returnStdout: true).trim()

                        if (backendExists == "backend") {
                            // Stop the existing backend container
                            sh 'docker stop backend'
                        }
                        
                        sh "docker build -t backend ."
                        sh "docker run -d -p 8080:8080 backend --name backend"
                    }
                }
            }
        }
    }
    
}
