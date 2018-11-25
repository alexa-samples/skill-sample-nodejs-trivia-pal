# Advanced Alexa Skills Using Dialog Management 
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/header._TTH_.png" />

## What You Will Learn
*  [AWS Lambda](http://aws.amazon.com/lambda)
*  [Alexa Skills Kit (ASK)](https://developer.amazon.com/alexa-skills-kit)
*  Using the [Dialog Management Features](https://developer.amazon.com/alexa-skills-kit/dialog-management)
*  Voice User Interface (VUI) Design


## What You Will Need
*  [Amazon Developer Portal Account](http://developer.amazon.com)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/skill-sample-nodejs-fact).
*  A basic understanding of Node.js.

## What Your Skill Will Do
This simple "Trivia Pal" Skill will teach you how to use advance dialog management techniques. Pay special attention on the "addElicitSlotDirective" that enable your skill to dynamically request to fill the slot "answer A" that was used as a placeholder.

User: Alexa, open my trivia pal dynamic
Alexa: Welcome to my trivia pal dynamic...
User: daily game
<Triggers the "DailyGame" intent that dynamically ask the questions in a {question, answer} array, until all questions are asked>



