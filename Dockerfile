FROM amazon/aws-lambda-nodejs:12

COPY src/lambda/scheduler.ts ./

RUN npm install -g cdk

COPY cdk.out/ec2-vm-stack.template.json ./
COPY cdk.out/manifest.json ./
# RUN cdk --app . deploy 'ec2-vm-stack' --require-approval never

RUN npm install -g typescript && tsc scheduler.ts

CMD [ "scheduler.handler" ]

