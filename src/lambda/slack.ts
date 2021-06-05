import * as lambda from 'aws-lambda';
import * as axios from 'axios';

// curl -X POST --data-urlencode "payload={\"channel\": \"#hacklab\", \"username\": \"webhookbot\", \"text\": \"This is posted to #hacklab and comes from a bot named webhookbot.\", \"icon_emoji\": \":ghost:\"}" https://hooks.slack.com/services/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

export interface SlackMessage {
  text: string;
}

export async function handler(event: lambda.SNSEvent) {
  console.debug(`event: ${JSON.stringify(event)}`);

  const webhook = process.env.SLACK_WEBHOOK || '';

  const filter: string[] = JSON.parse(process.env.FILTER || '');

  for (const record of event.Records) {

    if (filter) {
      console.debug(`filter defined: ${JSON.stringify(filter)}`);
      let filterMatch = false;
      for (const term of filter) {
        if (JSON.stringify(record).indexOf(term) > -1) {
          filterMatch = true;
        }
      }
      if (!filterMatch) {
        console.debug(`Event does not contain filter terms: ${JSON.stringify(filter)} . Skipping!`);
        break;
      }
    }

    const slackMessage: SlackMessage = {
      text: typeof record.Sns.Message === 'object' ? JSON.stringify(record.Sns.Message) : record.Sns.Message +
        `\n\nLink: ${process.env.LINK || undefined}`,
    };
    console.debug(`slackMessage: ${JSON.stringify(slackMessage)}`);

    const axiosResult = await axios.default
      .post(webhook, JSON.stringify(slackMessage), {
        headers: {
          'Content-type': 'application/json',
        },
      });
    console.debug('axiosResult:');
    console.debug(axiosResult);
  };

  return 'done';
}