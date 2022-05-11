const { ProjectConfig } = require('@jovotech/cli-core');
const { GoogleAssistantCli } = require('@jovotech/platform-googleassistant');
const { AlexaCli } = require('@jovotech/platform-alexa');
const { ServerlessCli } = require('@jovotech/target-serverless');

// This name will appear in the Alexa and Actions on Google consoles
const INVOCATION_NAME_ALEXA_DE = 'Pizza Party';
const INVOCATION_NAME_ALEXA_EN = 'Pizza Party';
const INVOCATION_NAME_GOOGLE_ASSISTANT_DE = 'Pizza Party';
const INVOCATION_NAME_GOOGLE_ASSISTANT_EN = 'Pizza Party';

let ALEXA_PUBLISHING_INFORMATION_DE = (suffix) => ({
  examplePhrases: [
    'Alexa, öffne ' + INVOCATION_NAME_ALEXA_DE,
    'Alexa, starte ' + INVOCATION_NAME_ALEXA_DE,
    'Alexa, frage ' + INVOCATION_NAME_ALEXA_DE + ' nach Hilfe',
  ],
  name: 'Pizza Party - Jovo Template Projekt ' + suffix,
  summary: 'Kurze Zusammenfassung',
  description:
    'Dies ist ein Beschreibungstext - Schicke frank.boerncke@gmail.com eine Mail und erzähle ihm, was Du mit diesem Template gemacht hast. ',
  keywords: ['einige', 'tolle', 'tags'],
  smallIconUri: 'https://via.placeholder.com/108/09f/09f.png',
  largeIconUri: 'https://via.placeholder.com/512/09f/09f.png',
});

let ALEXA_PUBLISHING_INFORMATION_EN = (suffix) => ({
  examplePhrases: [
    'Alexa, open ' + INVOCATION_NAME_ALEXA_EN,
    'Alexa, launch ' + INVOCATION_NAME_ALEXA_EN,
    'Alexa, ask ' + INVOCATION_NAME_ALEXA_EN + ' for help',
  ],
  name: 'Pizza Party - Jovo Template Project ' + suffix,
  summary: 'Some short summary text.',
  description:
    'Some description text - Send an email to frank.boernke@gmail.com and tell him what you built using this template. ',
  keywords: ['some', 'cool', 'keywords'],
  smallIconUri: 'https://via.placeholder.com/108/09f/09f.png',
  largeIconUri: 'https://via.placeholder.com/512/09f/09f.png',
});

let GOOGLE_ASSISTANT_PUBLISHING_INFORMATION_DE = (suffix) => ({
  localizedSettings: {
    displayName: `${INVOCATION_NAME_GOOGLE_ASSISTANT_DE} ` + suffix,
    developerName: 'Frank Börncke',
    developerEmail: 'frank.boerncke@applicate.de',
    shortDescription: 'Eine schöne kleine Jovo Template Anwendung von Frank Börncke',
    fullDescription:
      'Eine wirklich schöne kleine Jovo Template Anwendung von Frank Börncke. Schicke frank.boerncke@gmail.com eine Mail und erzähle ihm, was Du mit diesem Template gemacht hast. ',
    privacyPolicyUrl: 'https://www.applicate.de',
    pronunciation: `${INVOCATION_NAME_GOOGLE_ASSISTANT_DE} ` + suffix,
    smallLogoImage: '$resources.images.logo',
    termsOfServiceUrl: 'https://www.applicate.de',
    sampleInvocations: ['Sprich mit ' + `${INVOCATION_NAME_ALEXA_DE} ` + suffix],
  },
  // https://developers.google.com/assistant/actionssdk/reference/rest/Shared.Types/Category
  category: 'EDUCATION_AND_REFERENCE',
});

let GOOGLE_ASSISTANT_PUBLISHING_INFORMATION_EN = (suffix) => ({
  localizedSettings: {
    displayName: `${INVOCATION_NAME_GOOGLE_ASSISTANT_EN} ` + suffix,
    developerName: 'Frank Börncke',
    developerEmail: 'frank.boerncke@applicate.de',
    shortDescription: 'Nice little Jovo Template application from Frank Börncke',
    fullDescription:
      'Very nice little Jovo Template application from Frank Börncke. Send an email to frank.boernke@gmail.com and tell him what you built using this template. ',
    privacyPolicyUrl: 'https://www.applicate.de',
    pronunciation: `${INVOCATION_NAME_GOOGLE_ASSISTANT_EN} ` + suffix,
    smallLogoImage: '$resources.images.logo',
    termsOfServiceUrl: 'https://www.applicate.de',
    sampleInvocations: ['Talk to ' + `${INVOCATION_NAME_ALEXA_EN} ` + suffix],
  },
});

/*
|--------------------------------------------------------------------------
| JOVO PROJECT CONFIGURATION
|--------------------------------------------------------------------------
|
| Information used by the Jovo CLI to build and deploy projects
| Learn more here: www.jovo.tech/docs/project-config
|
*/
const project = new ProjectConfig({
  plugins: [
    // "Stageless" configuration for Alexa: Map 'de' model to 'de-DE'
    // @see https://www.jovo.tech/marketplace/platform-alexa/project-config
    new AlexaCli({ locales: { de: ['de-DE'], en: ['en-US', 'en-AU', 'en-IN', 'en-GB', 'en-CA'] } }),

    // "Stageless" configuration for Serverless
    // @see https://www.jovo.tech/marketplace/target-serverless
    new ServerlessCli({
      service: 'jovo-sample',
      provider: {
        runtime: 'nodejs14.x',
        iam: {
          role: {
            statements: [
              {
                Effect: 'Allow',
                Action: [
                  // @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Operations.html
                  'dynamodb:CreateTable',
                  'dynamodb:DescribeTable',
                  'dynamodb:Query',
                  'dynamodb:Scan',
                  'dynamodb:GetItem',
                  'dynamodb:PutItem',
                  'dynamodb:UpdateItem',
                  'dynamodb:DeleteItem',
                ],
                Resource: 'arn:aws:dynamodb:*:*:table/*',
              },
            ],
          },
        },
      },
      functions: {
        handler: {
          url: true, // @see https://www.serverless.com/blog/aws-lambda-function-urls-with-serverless-framework
          timeout: 7, // Sets the timeout to 7 seconds
        },
      },
    }),
  ],

  // @see https://www.jovo.tech/docs/project-config#staging
  defaultStage: 'dev',
  stages: {
    dev: {
      // @see https://www.jovo.tech/docs/webhook
      endpoint: '${JOVO_WEBHOOK_URL}',

      languageModel: {
        de: {
          invocation: INVOCATION_NAME_ALEXA_DE.toLowerCase() + ' test',
        },
        en: {
          invocation: INVOCATION_NAME_ALEXA_EN.toLowerCase() + ' test',
        },
      },

      plugins: [
        // Dev config for Alexa, gets merged into the stageless config
        // @see https://www.jovo.tech/marketplace/platform-alexa/project-config
        new AlexaCli({
          skillId: process.env.ALEXA_SKILL_ID_DEV,
          askProfile: process.env.ALEXA_ASK_PROFILE_DEV,

          // Overrides the skill.json to change the Skill name
          // @see https://www.jovo.tech/marketplace/platform-alexa/project-config#files
          files: {
            'skill-package/skill.json': {
              manifest: {
                publishingInformation: {
                  locales: {
                    'de-DE': ALEXA_PUBLISHING_INFORMATION_DE('TEST'),
                    'en-US': ALEXA_PUBLISHING_INFORMATION_EN('TEST'),
                    'en-AU': ALEXA_PUBLISHING_INFORMATION_EN('TEST'),
                    'en-GB': ALEXA_PUBLISHING_INFORMATION_EN('TEST'),
                    'en-CA': ALEXA_PUBLISHING_INFORMATION_EN('TEST'),
                    'en-IN': ALEXA_PUBLISHING_INFORMATION_EN('TEST'),
                  },
                  automaticDistribution: {
                    isActive: false,
                  },
                  isAvailableWorldwide: true,
                  testingInstructions: 'handle with care',
                  // https://developer.amazon.com/en-US/docs/alexa/smapi/skill-manifest.html#category-enum
                  category: 'EDUCATION_AND_REFERENCE',
                  distributionMode: 'PUBLIC',
                  distributionCountries: [],
                },

                apis: {
                  custom: {
                    interfaces: [
                      {
                        type: 'ALEXA_PRESENTATION_APL',
                        supportedViewports: [
                          {
                            mode: 'HUB',
                            shape: 'RECTANGLE',
                            minHeight: 600,
                            maxHeight: 1279,
                            minWidth: 1280,
                            maxWidth: 1920,
                          },
                          // ...
                        ],
                      },
                    ],
                  },
                },
                privacyAndCompliance: {
                  locales: {
                    'de-DE': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-US': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-CA': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-IN': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-AU': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-GB': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                  },
                  allowsPurchases: false,
                  containsAds: false,
                  isExportCompliant: true,
                  isChildDirected: false,
                  usesPersonalInfo: false,
                },
              },
            },
          },
        }),

        // Dev config for Google Assistant
        // @see https://www.jovo.tech/marketplace/platform-googleassistant/project-config
        new GoogleAssistantCli({
          projectId: process.env.GOOGLE_ACTION_PROJECT_ID_DEV,
          resourcesDirectory: 'resources',

          // Overrides the settings.yaml to change the Action name
          // @see https://www.jovo.tech/marketplace/platform-alexa/project-config#files
          // @see https://developers.google.com/assistant/actionssdk/reference/rest/Shared.Types/LocalizedSettings
          files: {
            'settings/': {
              'en/settings.yaml': GOOGLE_ASSISTANT_PUBLISHING_INFORMATION_EN('TEST'),
              'settings.yaml': GOOGLE_ASSISTANT_PUBLISHING_INFORMATION_DE('TEST'),
            },
          },
        }),
      ],
    },
    prod: {
      languageModel: {
        de: {
          invocation: INVOCATION_NAME_ALEXA_DE.toLowerCase(),
        },
        en: {
          invocation: INVOCATION_NAME_ALEXA_EN.toLowerCase(),
        },
      },

      plugins: [
        // Prod config for Alexa, gets merged into the stageless config
        // @see https://www.jovo.tech/marketplace/platform-alexa/project-config
        new AlexaCli({
          skillId: process.env.ALEXA_SKILL_ID_PROD,
          askProfile: process.env.ALEXA_ASK_PROFILE_PROD,
          endpoint: process.env.LAMBDA_ARN_PROD,

          // Overrides the skill.json to change the Skill name
          // @see https://www.jovo.tech/marketplace/platform-alexa/project-config#files
          files: {
            'skill-package/skill.json': {
              manifest: {
                publishingInformation: {
                  locales: {
                    'de-DE': ALEXA_PUBLISHING_INFORMATION_DE('PROD'),
                    'en-US': ALEXA_PUBLISHING_INFORMATION_EN('PROD'),
                    'en-AU': ALEXA_PUBLISHING_INFORMATION_EN('PROD'),
                    'en-GB': ALEXA_PUBLISHING_INFORMATION_EN('PROD'),
                    'en-CA': ALEXA_PUBLISHING_INFORMATION_EN('PROD'),
                    'en-IN': ALEXA_PUBLISHING_INFORMATION_EN('PROD'),
                  },
                  automaticDistribution: {
                    isActive: false,
                  },
                  isAvailableWorldwide: true,
                  testingInstructions: 'handle with care',
                  // https://developer.amazon.com/en-US/docs/alexa/smapi/skill-manifest.html#category-enum
                  category: 'EDUCATION_AND_REFERENCE',
                  distributionMode: 'PUBLIC',
                  distributionCountries: [],
                },
                apis: {
                  custom: {
                    interfaces: [
                      {
                        type: 'ALEXA_PRESENTATION_APL',
                        supportedViewports: [
                          {
                            mode: 'HUB',
                            shape: 'RECTANGLE',
                            minHeight: 600,
                            maxHeight: 1279,
                            minWidth: 1280,
                            maxWidth: 1920,
                          },
                          // ...
                        ],
                      },
                    ],
                  },
                },
                privacyAndCompliance: {
                  locales: {
                    'de-DE': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-US': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-CA': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-IN': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-AU': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-GB': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                  },
                  allowsPurchases: false,
                  containsAds: false,
                  isExportCompliant: true,
                  isChildDirected: false,
                  usesPersonalInfo: false,
                },
              },
            },
          },
        }),

        // Prod config for Google Assistant
        // @see https://www.jovo.tech/marketplace/platform-googleassistant/project-config
        new GoogleAssistantCli({
          projectId: process.env.GOOGLE_ACTION_PROJECT_ID_PROD,
          resourcesDirectory: 'resources',
          endpoint: process.env.LAMBDA_URL_PROD,

          // Overrides the settings.yaml to change the Action name
          // @see https://www.jovo.tech/marketplace/platform-alexa/project-config#files
          files: {
            'settings/': {
              'en/settings.yaml': GOOGLE_ASSISTANT_PUBLISHING_INFORMATION_EN('PROD'),
              'settings.yaml': GOOGLE_ASSISTANT_PUBLISHING_INFORMATION_DE('PROD'),
            },
          },
        }),

        // Prod config for Serverless, gets merged into the stageless config
        // @see https://www.jovo.tech/marketplace/target-serverless
        new ServerlessCli({
          provider: {
            stage: 'prod',
            environment: {
              DYNAMODB_TABLE_NAME: 'jovo-sample-db',
            },
          },
          functions: {
            handler: {
              events: [
                {
                  alexaSkill: process.env.ALEXA_SKILL_ID_PROD,
                },
              ],
            },
          },
        }),
      ],
    },
  },
});

module.exports = project;
