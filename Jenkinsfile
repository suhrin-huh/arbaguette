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
sed -i 's/\${AWS_ACCESS_KEY}/${AWS_ACCESS_KEY}/' ./src/main/resources/application.properties 
sed -i 's/\${AWS_SECRET_KEY}/${AWS_SECRET_KEY}/' ./src/main/resources/application.properties 
sed -i 's/\${DB_NAME}/${DB_NAME}/' ./src/main/resources/application.properties
sed -i 's/\${DB_PASSWORD}/${DB_PASSWORD}/' ./src/main/resources/application.properties 
sed -i 's/\${SSAFY_BANK_KEY}/${SSAFY_BANK_KEY}/' ./src/main/resources/application.properties
"""



                        // Check if any container is named "backend"
def containerNamedBackend = sh(script: "docker ps -a --filter 'name=backend' --format '{{.ID}}'", returnStdout: true).trim()

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
-e GOOGLE_APPLICATION_CREDENTIALS=${GOOGLE_APPLICATION_CREDENTIALS} \
-e AWS_ACCESS_KEY=${AWS_ACCESS_KEY} \
-e AWS_SECRET_KEY=${AWS_SECRET_KEY} \
-e DB_NAME=${DB_NAME} \
-e DB_PASSWORD=${DB_PASSWORD} \
-e SSAFY_BANK_KEY=${SSAFY_BANK_KEY} \
-e TZ=Asiz/Seoul \
backend
                        """
                    }

                    dir('backend/bonus') {
                        sh 'chmod +x ./gradlew'
                        
                        sh './gradlew clean build -x test'

                        sh """
sed -i 's/\${DB_NAME}/${MARIA_NAME}/' ./src/main/resources/application.properties
sed -i 's/\${DB_PASSWORD}/${MARIA_PASSWORD}/' ./src/main/resources/application.properties 
sed -i 's/\${SSAFY_BANK_KEY}/${SSAFY_BANK_KEY}/' ./src/main/resources/application.properties
"""



                        // Check if any container is named "backend"
def containerNamedBackend = sh(script: "docker ps -a --filter 'name=bonus' --format '{{.ID}}'", returnStdout: true).trim()

if (containerNamedBackend) {
    // Stop and remove the container named "bonus"
    sh "docker stop ${containerNamedBackend}"
    sh "docker rm ${containerNamedBackend}"
}


                        // Build and run the new backend container
                        sh """
docker build \
  --build-arg DB_NAME=${MARIA_NAME} \
  --build-arg DB_PASSWORD=${MARIA_PASSWORD} \
  --build-arg SSAFY_BANK_KEY=${SSAFY_BANK_KEY} \
  -t bonus .
"""
                        sh """
                            docker run --name bonus -d -p 8088:8088 \
-e DB_NAME=${MARIA_NAME} \
-e DB_PASSWORD=${MARIA_PASSWORD} \
-e SSAFY_BANK_KEY=${SSAFY_BANK_KEY} \
-e TZ=Asiz/Seoul \
bonus
                        """
                    }
                }
            }
        }
    }

    post {
        success {
        	script {
                // 빌드를 실행한 사용자 정보 가져오기
                def user = sh(script: 'git log -1 --pretty=format:"%an"', returnStdout: true).trim()

                mattermostSend (color: 'good', 
                message: "배포 성공. ${user}",
                )
            }
        }
        failure {
        	script {
                // 빌드를 실행한 사용자 정보 가져오기
                // Git 정보를 통해 푸시한 사용자 확인
                def user = sh(script: 'git log -1 --pretty=format:"%an"', returnStdout: true).trim()

                mattermostSend (color: 'danger', 
                message: "배포 실패. 범인 : ${user}",
                )
            }
        }
    }
}
