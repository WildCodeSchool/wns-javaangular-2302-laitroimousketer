# # Use a Maven image that supports Java 21
# FROM maven:3.9.5-eclipse-temurin-21 AS build

# # Set the working directory
# WORKDIR /usr/src/app

# # Copy the project files to the container
# COPY pom.xml .
# COPY src ./src

# # Build the application
# RUN mvn clean install

# # Switch to the official OpenJDK image for the runtime
# FROM openjdk:21-jdk

# # Set the working directory
# WORKDIR /usr/src/app

# # Copy the built JAR file from the Maven image
# COPY --from=build /usr/src/app/target/backend.jar .

# # Expose the port on which your Spring Boot app runs
# EXPOSE 8080

# # Command to run the Spring Boot app
# CMD ["java", "-jar", "backend.jar"]

# Use an OpenJDK image that supports Java 21
FROM openjdk:21-jdk

# Set the working directory
WORKDIR /usr/src/app

# Copy the project files to the container
COPY . .

# Build the application
RUN ./mvnw clean install

# Expose the port on which your Spring Boot app runs
EXPOSE 8080

# Command to run the Spring Boot app
CMD ["java", "-jar", "target/backend.jar"]