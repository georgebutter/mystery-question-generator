import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  let topic = req.body.input;

  if (!Boolean(topic.length)) {
    const res = await openai.createCompletion("text-davinci-002", {
      prompt: generateTopic(),
      temperature: 1,
    });
    topic = res.data.choices[0].text
  }

  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(topic),
    temperature: 1,
  });
  const result = {
    question: completion.data.choices[0].text,
    topic,
  }
  console.log(result)
  res.status(200).json(result);
}

function generateTopic() {
  return `Suggest a random single word topic for an icebreaker question`;
}

function generatePrompt(input) {
  return `Suggest an icebreaker question about ${input}`;
}
