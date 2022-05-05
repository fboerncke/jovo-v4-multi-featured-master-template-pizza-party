# "Pizza Party!" - Yet another Jovo V4 master template supporting a lot of features

There are a lot of Jovo examples around but I did not find any project template that served my use case: this is why I collected pieces and examples on the web, Slack channels, forums, docs and what I learned from personal communication (especially thanks for that!). I used the results to prepare this template project which hopefully serves a lot of users to find their way into Jovo.  

This Jovo V4 example project includes the following **features**:

- Configuration prepared for stages **PROD** and **DEV**
  (including **different product and invocation names** for PROD and DEV for **easier testing and maintenance** )
- Generated code deploys to **Amazon Alexa** and **Google Assistant**
- Simple **Pizza Party** example shows usage of **Jovo V4 component concept** (reusable YesNoChoiceComponent.ts)
- Implements **i18n** (currently "de", "en")
- Configuration prepared for **locales 'de-DE'** and **locales 'en-US', 'en-GB', 'en-AU', 'en-CA', 'en-IN'**
- Shows implementation for platform specific intents **AMAZON.StopIntent, AMAZON.CancelIntent, AMAZON.HelpIntent, AMAZON.RepeatIntent, AMAZON.StartOverIntent, AMAZON.YesIntent, AMAZON.NoIntent**.
- Learn how to configure **Alexa Card support**
- Localized i18n "**quick replies**" for both Google Assistant and Echo Show devices
- Shows how to add an **APL (Alexa Presentation Language) document** to Echo Show devices ("Good Bye" page example)
- Prepared examples how to define and **run locale specific test cases** using jest for some basic intents (run npm test)
- **Bonus Time Saver**: how to maintain all those necessary entries for the Amazon/Google marketplaces from file while avoiding duplicate maintenance.

Nice: **The generated code artifacts validate within Developer/Google Console**, so the results are technically ready for deployment: *more time for you to focus on your use case!*

For sure there is a lot to improve.
Let me know what you think.
Comments welcome!

frank.boerncke@gmail.com


