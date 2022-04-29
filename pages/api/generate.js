import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(req.body.input),
    temperature: 1,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(input) {
  return `Suggest an icebreaker question about ${input}`;
}
