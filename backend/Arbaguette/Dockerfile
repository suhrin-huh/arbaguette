FROM openjdk:17
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENV GOOGLE_APPLICATION_CREDENTIALS=/home/ubuntu/api_key/cloudvision-434807-1bea29b95286.json
ENTRYPOINT ["java", "-jar", "/app.jar"]
