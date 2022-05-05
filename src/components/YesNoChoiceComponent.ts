import { Component, BaseComponent, Intents } from '@jovotech/framework';

import { YesNoOutput } from '../output/YesNoOutput';
import { GlobalComponent } from './GlobalComponent';

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
| A component consists of handlers that respond to specific user requests
| Learn more here: www.jovo.tech/docs/components, jovo.tech/docs/handlers
|
*/
@Component()
export class YesNoChoiceComponent extends BaseComponent {
  START() {
    return this.$send(YesNoOutput, {
      message: this.$component.config?.prompt as string,
      reprompt: this.$component.config?.prompt as string,
      card: {
        title: 'Pizza Party!',
        subtitle: 'Enjoy your meal!',
        content: this.$component.config?.prompt as string,
        imageUrl: 'https://img.pizza/500/500?test.png',
        backgroundImageUrl: 'https://jovo-assets.s3.amazonaws.com/jovo-bg.png',
        header: {
          logo: 'https://img.pizza/500/500?test.png',
          title: 'Pizza Party!',
        },
      },
      // activate APL to make this work
      quickReplies: [
        {
          text: this.$t('outputTemplateArray')[0],
          intent: 'yesIntent',
        },
        {
          text: this.$t('outputTemplateArray')[1],
          intent: 'noIntent',
        },
        {
          text: this.$t('outputTemplateArray')[2],
          intent: 'notSureIntent',
        },
        {
          text: this.$t('outputTemplateArray')[3],
          intent: 'repeatIntent',
        },
        {
          text: this.$t('outputTemplateArray')[4],
          intent: 'helpIntent',
        },
      ],
    });
  }

  @Intents(['YesIntent'])
  yesIntent() {
    this.$send({
      message: this.$component.config?.yes as string,
      listen: false,
    });
    return this.$resolve('success');
  }

  @Intents(['NotSureIntent'])
  notSureIntent() {
    this.$send({
      message: this.$component.config?.notSure as string,
      listen: false,
    });
    return this.$resolve('success');
  }

  @Intents(['NoIntent'])
  noIntent() {
    this.$send({ message: this.$component.config?.no as string, listen: false });
    return this.$resolve('success');
  }

  @Intents(['HelpIntent'])
  helpIntent() {
    return this.$send(YesNoOutput, {
      message: (this.$t('helpMessage') + this.$component.config?.prompt) as string,
    });
  }

  @Intents(['RepeatIntent'])
  repeatIntent() {
    return this.$send(YesNoOutput, { message: this.$component.config?.prompt as string });
  }

  @Intents(['StopIntent', 'CancelIntent'])
  terminateIntent() {
    return this.$resolve('terminate');
  }

  UNHANDLED() {
    return this.$send({ message: 'problem resolving (Unhandelled) ...' });
  }
}
