FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /workspace/app

COPY pom.xml .
COPY src src

RUN mvn clean install -DskipTests -q

FROM eclipse-temurin:21-jre-alpine
RUN addgroup -S spring && adduser -S spring -G spring
WORKDIR /app

COPY --from=build /workspace/app/target/*.jar app.jar

# Upload directory for local storage
RUN mkdir -p uploads && chown spring:spring uploads

USER spring:spring

EXPOSE 8080

ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-Dspring.profiles.active=prod", \
  "-jar", "app.jar"]
