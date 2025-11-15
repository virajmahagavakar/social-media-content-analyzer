# Use official Maven & JDK image to build the project
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the project source
COPY src ./src

# Copy tessdata folder
COPY tessdata ./tessdata

# Build the jar
RUN mvn clean package -DskipTests

# Runtime image
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Copy tessdata to runtime
COPY tessdata ./tessdata

# Set Tesseract data path
ENV TESSDATA_PREFIX=/app/tessdata

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
