# Use the official Maven image as the base image
FROM maven:3.8.4-openjdk-11-slim AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy the project files to the container
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean install -DskipTests

# Use the official OpenJDK image as the base image
FROM openjdk:11-jre-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy the built JAR file from the previous stage
COPY --from=build /usr/src/app/target/backend.jar .

# Expose the port on which your Spring Boot app runs
EXPOSE 8080

# Command to run the Spring Boot app
CMD ["java", "-jar", "backend.jar"]
