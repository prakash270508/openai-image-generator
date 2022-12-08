const { Configuration, OpenAIApi } = require("openai"); 

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
  // apiKey: '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',
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {

  const {prompt, size} = req.body; 

  const imgSize = size == 'small' ? '256x256' : 'medium' ? '512x512' :'1024x1024'

  try {
    const response = await openai.createImage({
      prompt,
      n:1,
      size: imgSize,
    });

    const imgeUrl = response.data.data[0].url

    res.status(200).json({
      success: true,
      data: imgeUrl
    })

  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

module.exports = { generateImage }
