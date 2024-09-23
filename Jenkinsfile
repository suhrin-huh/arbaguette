pipeline {
    agent any

    stages {
        stage('Build Backend') {
            steps {
                script {
                    dir('backend/Arbaguette') {
                        sh 'chmod +x ./gradlew'
                        
                        sh './gradlew clean build -x test'

                        sh """
sed -i 's|\\${AWS_ACCESS_KEY}|${AWS_ACCESS_KEY}|g' ./src/main/resources/application.properties
sed -i 's|\\${AWS_SECRET_KEY}|${AWS_SECRET_KEY}|g' ./src/main/resources/application.properties
sed -i 's|\\${DB_NAME}|${DB_NAME}|g' ./src/main/resources/application.properties
sed -i 's|\\${DB_PASSWORD}|${DB_PASSWORD}|g' ./src/main/resources/application.properties
sed -i 's|\\${SSAFY_BANK_KEY}|${SSAFY_BANK_KEY}|g' ./src/main/resources/application.properties
"""



                        // Check if any container is named "backend"
def containerNamedBackend = sh(script: "docker ps --filter 'name=backend' --format '{{.ID}}'", returnStdout: true).trim()

if (containerNamedBackend) {
    // Stop and remove the container named "backend"
    sh "docker stop ${containerNamedBackend}"
    sh "docker rm ${containerNamedBackend}"
}


                        // Build and run the new backend container
                        sh """
docker build \
  --build-arg AWS_ACCESS_KEY=${AWS_ACCESS_KEY} \
  --build-arg AWS_SECRET_KEY=${AWS_SECRET_KEY} \
  --build-arg DB_NAME=${DB_NAME} \
  --build-arg DB_PASSWORD=${DB_PASSWORD} \
  --build-arg SSAFY_BANK_KEY=${SSAFY_BANK_KEY} \
  -t backend .
"""
                        sh """
                            docker run --name backend -d -p 8080:8080 \
                            -v /home/ubuntu/api_key/cloudvision-434807-1bea29b95286.json:/app/config/cloudvision.json \
                            -e GOOGLE_APPLICATION_CREDENTIALS=/app/config/cloudvision.json \
                            backend
                        """
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
