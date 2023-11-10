# Build stage
FROM maven:3.8.5-openjdk-17 AS build
# Set the working directory
WORKDIR /usr/src/app
# Copy the pom.xml file and src folder
COPY pom.xml .
COPY src ./src
# Install dependencies
RUN mvn clean install
# Copy the JAR from the build stage
RUN cp target/spring-boot-restFull-ticketing-0.0.1-SNAPSHOT.jar /backend.jar
# Production stage
FROM openjdk:17-jdk-alpine
# Set the working directory
WORKDIR /app
# Copy the JAR from the build stage to the production image
COPY --from=build /backend.jar /app/backend.jar
# Command to run the Spring Boot app
CMD ["java", "-jar", "backend.jar"]
