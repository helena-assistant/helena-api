const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");

class WatsonService {
  assistant = null;

  constructor() {
    try {
      this.assistant = new AssistantV2({
        version: "2019-02-28",
        authenticator: new IamAuthenticator({
          apikey: process.env.WATSON_ASSISTANT_IAM_APIKEY,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  }

  getSession = async () => {
    const response = await this.assistant.createSession({
      assistantId: process.env.WATSON_ASSISTANT_ID,
    });
    return response.result.session_id;
  };

  getPayload = (message, sessionId) => ({
    assistantId: process.env.WATSON_ASSISTANT_ID,
    sessionId: sessionId,
    input: {
      message_type: "text",
      text: message,
    },
  });

  sendAssistantMessage = async (message, sessionId) => {
    const payload = this.getPayload(message, sessionId);
    try {
      return this.assistant.message(payload);
    } catch (e) {
      payload.sessionId = await this.getSession();
      return this.assistant.message(payload);
    }
  };
}

module.exports = new WatsonService();
