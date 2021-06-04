import * as axios from 'axios';

/**
 * Send a basic text message into Slack.
 *
 * @param {*} message
 * @param {*} [channel=process.env.SLACK_CHANNEL]
 * @returns
 */
function sendText(message: string, channel = process.env.SLACK_CHANNEL) {
  return new Promise((resolve, reject) => {
    const data = {
      text: message,
    };
    postToChannel(data, channel)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}

/**
 * Post the Slack data to a channel.
 *
 * @param {Object} data
 * @param {String} [channel=process.env.SLACK_CHANNEL]
 * @returns
 */
async function postToChannel(data: any, channel = process.env.SLACK_CHANNEL) {
  const axiosResult = await axios.default
    .post(channel || '', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  return axiosResult.data;
}

export async function handler(event: any) {
  console.debug(`event: ${JSON.stringify(event)}`);

  await sendText('LHello World :)');
}