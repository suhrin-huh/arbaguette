pipeline {
    agent any

    stages {
        stage('Build Backend') {
            steps {
                script {
                    dir('backend/Arbaguette') {
                        sh 'chmod +x ./gradlew'
                        sh './gradlew clean build -x test'

                        // Check if any container is using port 8080
                        def containerUsingPort = sh(script: "docker ps --filter 'publish=8080' --format '{{.ID}}'", returnStdout: true).trim()

                        if (containerUsingPort) {
                            // Stop and remove the container using port 8080
                            sh "docker stop ${containerUsingPort}"
                            sh "docker rm ${containerUsingPort}"
                        }

                        // Build and run the new backend container
                        sh "docker build -t backend ."
                        sh "docker run --name backend -d -p 8080:8080 backend"
                    }
                }
            }
        }
    }

    post {
        success {
        	script {
                mattermostSend (color: 'good', 
                message: "배포 성공",
                )
            }
        }
        failure {
        	script {
                mattermostSend (color: 'danger', 
                message: "배포 실패"
                )
            }
        }
    }
}
