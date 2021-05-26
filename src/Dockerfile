FROM amazon/aws-lambda-nodejs:12

COPY lambda/scheduler.ts ./

RUN npm install -g typescript && tsc scheduler.ts

CMD [ "scheduler.handler" ]

