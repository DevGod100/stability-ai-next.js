'use client'

import { generationImage } from "@/_actions/AI"
import SubmitButton from "@/components/SubmitButton"
import IMG from '@/images/img.jpg'
import Loader from '@/images/loader.svg'
import Image from "next/image"
import { useEffect, useState } from "react"


const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");


  useEffect(() => {
    const initData = JSON.parse(localStorage.getItem('imgAI')) || { prompt: '', imgs: [IMG] };
    setData(initData);
  }, [])


  const handleSubmit = async (formData) => {
    const prompt = formData.get("prompt");

    const res = await generationImage(prompt);

    if(res?.errMsg)
      return setErrMsg(res.errMsg);

    setData(res);
    saveImageToLocal(res);
    setErrMsg("");
  }

  const saveImageToLocal = (data) => {
    localStorage.setItem('imgAI', JSON.stringify(data))
  }

  return (
    <main>
      <h1>AI Image Generator Tool NextJS 1</h1>

      <form action={handleSubmit}>
        <input type="text" name="prompt" required
        placeholder="Enter a prompt to display an image" />

        <SubmitButton setLoading={setLoading} />
      </form>

      <div className="error">
        { errMsg ? `ERROR: ${errMsg}` : '' }
      </div>

      {
        data?.imgs.map((img, index) => (
          <div className="img_card" key={index}>
            <Image
              src={img}
              alt="img"
              width={1024}
              height={1024}
              style={{width: '100%', height: 'auto'}}
              priority
            />

            {
              loading
              ? <div className="img_loader">
                <Image
                  src={Loader}
                  alt="Loader"
                  width={250}
                  height={250}
                  priority
                />
              </div>
              : null
            }
            
          </div>
        ))
      }
      

      <h4>{data?.prompt}</h4>
    </main>
  )
}

export default Home