FROM amazon/aws-lambda-nodejs:12

COPY lambda/scheduler.js ${FUNCTION_DIR}

CMD [ "scheduler.handler" ]