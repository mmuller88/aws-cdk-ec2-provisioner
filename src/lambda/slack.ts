import * as qs from 'querystring';
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

export async function handler(event: any) {
  console.debug(`event: ${JSON.stringify(event)}`);

  const webhook = process.env.SLACK_WEBHOOK || '';
  const slackMessage: SlackMessage = {
    text: 'ahoi von dort',
  };
  const axiosResult = await axios.default
    .post(webhook, qs.stringify(slackMessage), {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
  return axiosResult.data;
}