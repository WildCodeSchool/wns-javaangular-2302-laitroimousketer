# Étape de build du backend
FROM maven:3.8.5-openjdk-17 AS backend-build

RUN mkdir /app
WORKDIR /app

COPY pom.xml .
RUN mvn clean install

COPY src ./src
RUN mvn package

# Étape de production du backend
FROM openjdk:17-jdk-alpine AS backend

WORKDIR /app

COPY --from=backend-build /app/target/spring-boot-restFull-ticketing-0.0.1-SNAPSHOT.jar /app/backend.jar

CMD ["java", "-jar", "backend.jar"]