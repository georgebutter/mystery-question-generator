import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  let topic = req.body.input;
  console.log(topic);
  console.log(topic.length)
  console.log(!Boolean(topic.length))
  if (!Boolean(topic.length)) {
    const res = await openai.createCompletion("text-davinci-002", {
      prompt: generateTopic(),
      temperature: 1,
    });
    topic = res.data.choices[0].text
  }
  console.log(topic);
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(topic),
    temperature: 1,
  });
  res.status(200).json({ result: {
    question: completion.data.choices[0].text,
    topic,
  }});
}

function generateTopic() {
  return `Suggest a random topic for an icebreaker question`;
}

function generatePrompt(input) {
  return `Suggest an icebreaker question about ${input}`;
}
