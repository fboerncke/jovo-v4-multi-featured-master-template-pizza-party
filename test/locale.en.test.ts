import { TestSuite, InputType } from '@jovotech/framework';

/*
|--------------------------------------------------------------------------
| UNIT TESTING
|--------------------------------------------------------------------------
|
| Run `npm test` to execute this sample test.
| Learn more here: www.jovo.tech/docs/unit-testing
|
*/

const testSuiteEN = new TestSuite({ locale: 'en' });

test('welcome message en', async () => {
  const { output } = await testSuiteEN.run({
    type: 'LAUNCH',
  });

  expect(output[0]).toEqual({ message: 'Welcome to Pizza Party!' });
  expect(output[1]).toEqual({ message: 'Here is a question: ' });
});

test('help intent message en', async () => {
  const { output } = await testSuiteEN.run([
    {
      type: 'LAUNCH',
    },
    {
      intent: 'HelpIntent',
    },
  ]);
  expect(output[0].message).toMatch(new RegExp(`^Please`));
});

test('start over message en', async () => {
  const { output } = await testSuiteEN.run([
    {
      type: 'LAUNCH',
    },
    {
      intent: 'StartOverIntent',
    },
  ]);
  expect(output[0]).toEqual({ message: 'Welcome to Pizza Party!' });
  expect(output[1]).toEqual({ message: 'Here is a question: ' });
});
