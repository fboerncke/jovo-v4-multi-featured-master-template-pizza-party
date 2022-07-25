# "Pizza Party!" - Yet another Jovo V4 master template supporting a lot of features (V1.20220725)

## What this is about

There are a lot of Jovo examples around but I did not find any project template that served my use case: this is why I collected pieces and examples on the web, Slack channels, forums, docs and what I learned from personal communication (especially thanks for that!). I used the results to prepare this template project which hopefully serves a lot of users to find their way into Jovo.  

![Pizza Party Jovo Example Project Template](https://github.com/fboerncke/jovo-v4-multi-featured-master-template-pizza-party/blob/main/resources/images/pizza-party-01.png "Pizza Party Jovo Example Project Template")

## Feature list

This Jovo V4 example project includes the following **features**:

- Configuration prepared for stages **PROD** and **DEV**
- Support for **different product names** for PROD and DEV for **easier maintenance**
- Support for **different invocation names** for PROD and DEV for **easier testing**
- Support for **different invocation names** for Alexa and Google in case that platform specific certification rules require a different selection
- Generated code deploys to **Amazon Alexa** and **Google Assistant**
- Simple **Pizza Party** example shows usage of **Jovo V4 component concept** (reusable YesNoChoiceComponent.ts)
- Implements **i18n** (currently "de", "en")
- Configuration prepared for **locales 'de-DE'** and **locales 'en-US', 'en-GB', 'en-AU', 'en-CA', 'en-IN'**
- Shows implementation for platform specific intents **AMAZON.StopIntent, AMAZON.CancelIntent, AMAZON.HelpIntent, AMAZON.RepeatIntent, AMAZON.StartOverIntent, AMAZON.YesIntent, AMAZON.NoIntent**.
- Learn how to configure **Alexa Card support**
- Localized i18n "**quick replies**" for both Google Assistant and Echo Show devices
- Shows how to add support for **APL (Alexa Presentation Language) document** documents conditionally on supporting devices only ("Good Bye" page example)
- Configuration includes preselection for all APL interfaces: simply remove what you don't need instead of copying and pasting all those variants together
- Includes some prepared examples how to define and **run locale specific test cases** using jest for some basic intents (run npm test)

## Bonus time saver

The configuration in the example shows how to maintain all those necessary entries for the Amazon/Google marketplaces from Jovo configuration files while avoiding duplicate maintenance of settings when targeting multiple locales:

This means *less necessity for working within the developer consoles*. Instead of cloning settings and navigating between multiple browser tabs you can configure it all in one file.

## Ready to deploy
What you will find nice: **The generated code artifacts validate within the Developer/Google Console**, so the results are technically ready for deployment: 

This means *more time for you to focus on your use case!*

## Comments & Feedback welcome!

For sure there is a lot to improve.
Let me know what you think.

frank.boerncke@gmail.com

![Pizza Party Jovo Example Project Template - Good Bye Page](https://github.com/fboerncke/jovo-v4-multi-featured-master-template-pizza-party/blob/main/resources/images/pizza-party-02.png "Pizza Party Jovo Example Project Template - Good Bye Page")


