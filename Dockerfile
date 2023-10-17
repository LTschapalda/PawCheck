FROM openjdk:20

EXPOSE 8080

ADD backend/target/pawcheck.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]
