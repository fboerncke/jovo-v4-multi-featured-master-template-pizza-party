import { Component, BaseComponent, Global, Handle } from '@jovotech/framework';
import { YesNoChoiceComponent } from './YesNoChoiceComponent';
import APL_GOOD_BYE_DOCUMENT from '../APLdocuments/aplGoodByeDocument.json';

/*
|--------------------------------------------------------------------------
| Global Component
|--------------------------------------------------------------------------
|
| The global component handlers can be reached from anywhere in the app
| Learn more here: www.jovo.tech/docs/components#global-components
|
*/
@Global()
@Component()
export class GlobalComponent extends BaseComponent {
  LAUNCH() {
    this.$send(this.$t('welcome'));
    return this.$redirect(GlobalComponent, 'INIT');
  }

  END(): any {
    return this.$send({
      message: this.$t('goodByeMessage'),
      listen: false,
      platforms: {
        alexa: this.$device.supports('ALEXA:APL')
          ? {
              // we have some Echo Show device
              nativeResponse: {
                response: {
                  directives: [
                    {
                      type: 'Alexa.Presentation.APL.RenderDocument',
                      token: 'some-fancy-token-here',
                      document: APL_GOOD_BYE_DOCUMENT,
                      datasources: {
                        headlineData: {
                          headerTitle: 'Pizza Party Master Template',
                          headerSubtitle: 'Building awesome things with Jovo!',
                          primaryText: 'Launch your prototype faster using this Jovo template',
                          secondaryText: 'More time to focus on your business logic',
                          footerHintText: 'Like this? Say hello to frank.boerncke@gmail.com',
                          headerAttributionImage:
                            'https://www.jovo.tech/_next/image?url=%2Fjovo.svg&w=128&q=75',
                        },
                      },
                    },
                  ],
                },
              },
            }
          : {}, //  no screen
      },
    });
  }

  INIT(): any {
    this.$send(this.$t('introQuestion'));

    const random = Math.random();
    if (random < 0.33) {
      return this.$delegate(YesNoChoiceComponent, {
        config: {
          prompt: this.$t('pizzaPrompt'),
          yes: this.$t('pizzaYes'),
          notSure: this.$t('pizzaNotSure'),
          no: this.$t('pizzaNo'),
        },
        resolve: {
          success: this.INIT,
          terminate: this.END,
        },
      });
    } else if (random < 0.66) {
      return this.$delegate(YesNoChoiceComponent, {
        config: {
          prompt: this.$t('drinkPrompt'),
          yes: this.$t('drinkYes'),
          notSure: this.$t('drinkNotSure'),
          no: this.$t('drinkNo'),
        },
        resolve: {
          success: this.INIT,
          terminate: this.END,
        },
      });
    } else {
      return this.$delegate(YesNoChoiceComponent, {
        config: {
          prompt: this.$t('iceCreamPrompt'),
          yes: this.$t('iceCreamYes'),
          notSure: this.$t('iceCreamNotSure'),
          no: this.$t('iceCreamNo'),
        },
        resolve: {
          success: this.INIT,
          terminate: this.END,
        },
      });
    }
  }

  @Handle({ intents: ['StartOverIntent'], prioritizedOverUnhandled: true })
  startOver() {
    return this.LAUNCH();
  }
}
