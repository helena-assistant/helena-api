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

  extractFeatures = (response) => {
    const { intents, generic, entities } = response.result.output;
    const was_answered = intents.length > 0;
    const { response_type, suggestions } = generic[0];

    if (was_answered) {
      const {
        intent: main_intent,
        confidence: main_intent_confidence,
      } = intents[0];

      const mappedSuggestions = suggestions
        ? suggestions.map((suggestion) => ({
            propensity: suggestion.internal?.propensity,
            label: suggestion.label,
          }))
        : [];

      return {
        main_intent,
        main_intent_confidence,
        was_answered,
        response_type,
        suggestions: mappedSuggestions,
        intents,
        entities,
      };
    }

    return {
      response_type,
      was_answered,
      intents,
      entities,
    };
  };
}

module.exports = new WatsonService();
