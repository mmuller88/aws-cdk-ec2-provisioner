FROM amazon/aws-lambda-nodejs:12

COPY src/lambda/scheduler.ts ./

RUN npm install -g cdk

COPY cdk.out/ ./
# COPY cdk.out/ec2-vm-stack.template.json ./
# COPY cdk.out/manifest.json ./
# COPY cdk.out/cross-region-stack-981237193288:us-east-1.template.json ./
# RUN cdk --app . deploy 'ec2-vm-stack' --require-approval never

RUN npm install @types/aws-lambda
RUN npm install @types/node
RUN npm install -g typescript && tsc scheduler.ts

CMD [ "scheduler.handler" ]

