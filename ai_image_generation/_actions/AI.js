'use server'


const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.stability.ai';// 25 Free Trial Credits.

// v1.0 => 0.2 Credits / 1 image
const URL = `${BASE_URL}/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image`

// v1.6 => 0.3 Credits / 1 image
const URL1 = `${BASE_URL}/v1/generation/stable-diffusion-v1-6/text-to-image`

export async function generationImage(prompt){
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      text_prompts: [
        {
          text: prompt,
        },
      ],
      cfg_scale: 7,
      height: 1024,
      width: 1024,
      steps: 30,
      samples: 2,
    })
  })

  if(!response.ok){
    const data = await response.json();
    return { errMsg: data.message };
  }

  const { artifacts } = await response.json();
  const imgs = artifacts.map(item => `data:image/jpg;base64,${item.base64}`);

  return { prompt, imgs };
}