const AssistantV2 = require("ibm-watson/assistant/v2");

export class WatsonService {
  assistant = new AssistantV2({
    version: "2019-02-28",
    authenticator: new IamAuthenticator({
      apikey: process.env.WATSON_ASSISTANT_IAM_APIKEY,
    }),
  });

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

  sendAssistantMessage = async (payload, user) => {
    try {
      return this.assistant.message(payload);
    } catch (e) {
      payload.sessionId = await this.getSession();
      console.log(payload);
      // await botUsers.findByIdAndUpdate(user._id, {
      //   phone: user.phone,
      //   sessionId: payload.sessionId,
      // });
      return this.assistant.message(payload);
    }
  };
}
