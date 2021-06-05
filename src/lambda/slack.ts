import * as lambda from 'aws-lambda';
import * as axios from 'axios';

// curl -X POST --data-urlencode "payload={\"channel\": \"#hacklab\", \"username\": \"webhookbot\", \"text\": \"This is posted to #hacklab and comes from a bot named webhookbot.\", \"icon_emoji\": \":ghost:\"}" https://hooks.slack.com/services/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

export interface SlackMessage {
  channel?: string;
  /**
   * Name of the bot appearing in the message
   */
  username?: string;

  /**
   * For adding links use <https://alert-system.com/alerts/1234|Click here>
   */
  text: string;
  /**
   * e.g. :ghost:
   */
  icon_emoji?: string;
}

export async function handler(event: lambda.SNSEvent) {
  console.debug(`event: ${JSON.stringify(event)}`);

  const webhook = process.env.SLACK_WEBHOOK || '';

  // const axiosResultt = await axios.default
  //   .post(webhook, { text: 'slack-lambda gecallt' }, {
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //   });
  // console.debug('axiosResult:');
  // console.debug(axiosResultt);

  for (const record of event.Records) {
    const slackMessage: SlackMessage = {
      username: 'naala',
      text: typeof record.Sns.Message === 'object' ? JSON.stringify(record.Sns.Message) : record.Sns.Message +
        `\n\nLink: ${process.env.LINK || undefined})`,
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