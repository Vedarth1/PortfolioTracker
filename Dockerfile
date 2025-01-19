# Stage 1: Build the JAR file
FROM openjdk:21-slim AS build
WORKDIR /app

# Install Maven
RUN apt-get update && apt-get install -y maven

# Copy the Maven project files
COPY pom.xml .
COPY src ./src

# Build the JAR file
RUN mvn clean package -DskipTests

# Stage 2: Create the final image
FROM openjdk:21-slim
WORKDIR /app
COPY --from=build /app/target/PortfolioTracker-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]