/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
  },
  handle(handlerInput) {
    
    return handlerInput.responseBuilder
      .speak(GAME_SOUND1 + WELCOME_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const DailyGameHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && 
      request.intent.name === 'DailyGame'&&
        request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput) {
    
    const request = handlerInput.requestEnvelope.request;
    const filledSlots = request.intent.slots;
    const answer = filledSlots.answerA.value;
    
    let currentQuestionCounter = 0;
    let speechOutput = questionArray[currentQuestionCounter].question;
    let correctAnswer = questionArray[currentQuestionCounter].answer;
    
    // if exists in session, we get currentQuestionCounter and previousAnswer
    let currentIntent = handlerInput.requestEnvelope.request.intent;
    const {attributesManager,responseBuilder} = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    if (sessionAttributes[currentIntent.name]) {
      currentQuestionCounter = sessionAttributes[currentIntent.name].currentQuestionCounter;
      correctAnswer =sessionAttributes[currentIntent.name].previousAnswer;
      speechOutput = questionArray[currentQuestionCounter].question;
      console.log("currentQuestionCounter" + currentQuestionCounter);
    }
    if (answer){
      if (answer.toLowerCase() === correctAnswer) {
        speechOutput = CORRECT_ANSWER;
        if (currentQuestionCounter < questionArray.length-1){
          speechOutput = speechOutput + NEXT_QUESTION_MESSAGE + questionArray[currentQuestionCounter+1].question;
          correctAnswer = questionArray[currentQuestionCounter+1].answer;
        }else{
            speechOutput = speechOutput + CONGRATS_MESSAGE;
          }
        currentQuestionCounter++;
        }
        else {
          speechOutput = INCORRECT_ANSWER +" "+ speechOutput;
        }
    }
    // Saving correctAnswer and counter into session
    let previousAnswer = correctAnswer;
    sessionAttributes[currentIntent.name] = {currentQuestionCounter,previousAnswer};
    attributesManager.setSessionAttributes(sessionAttributes);
    
    var response =  handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .addElicitSlotDirective("answerA")
      .getResponse();
    return response;
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`The session ended: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('<say-as interpret-as="interjection">ouch</say-as> there was a problem with your request')
      .reprompt('there was a problem with your request')
      .getResponse();
  },
};

const SKILL_NAME = "Trivia Pal";
const WELCOME_MESSAGE = " Welcome to Trivia pal dynamic!. You can start your daily game, or check on how you compare with your friends. What do you want to do?";
const GAME_SOUND1 = "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_player1_01'/>";
const HELP_MESSAGE = "You can start your daily game, or check how you compare with your friends... ¿How can I help?";
const HELP_REPROMPT = "How can I help?";
const CORRECT_ANSWER = "Correct!";
const INCORRECT_ANSWER = "Incorrect!";
const NEXT_QUESTION_MESSAGE = "Next!";
const CONGRATS_MESSAGE = "Congratulations, the trivia has ended!";
const STOP_MESSAGE = "<say-as interpret-as='interjection'>okey dokey</say-as><s> see you later </s>";

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    DailyGameHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

const questionArray = [
 {"question":"What city is re:invent 2018 in?", "answer":"las vegas" },
 {"question":"How many attendees are expected in re:invent 2018?", "answer":"43000" },
 {"question":"What is the name of this session in Vegas?", "answer":"cool session" }
];