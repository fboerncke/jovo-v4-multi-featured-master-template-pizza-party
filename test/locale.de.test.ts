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

const testSuiteDE = new TestSuite({ locale: 'de' });

test('welcome message de', async () => {
  const { output } = await testSuiteDE.run({
    type: 'LAUNCH',
  });

  expect(output[0]).toEqual({ message: 'Willkommen bei meiner Pizza Party!' });
  expect(output[1]).toEqual({ message: 'Hier ist eine Frage: ' });
});

test('help intent message de', async () => {
  const { output } = await testSuiteDE.run([
    {
      type: 'LAUNCH',
    },
    {
      intent: 'HelpIntent',
    },
  ]);
  expect(output[0].message).toMatch(new RegExp(`^Bitte`));
});

test('start over message de', async () => {
  const { output } = await testSuiteDE.run([
    {
      type: 'LAUNCH',
    },
    {
      intent: 'StartOverIntent',
    },
  ]);
  expect(output[0]).toEqual({ message: 'Willkommen bei meiner Pizza Party!' });
  expect(output[1]).toEqual({ message: 'Hier ist eine Frage: ' });
});
