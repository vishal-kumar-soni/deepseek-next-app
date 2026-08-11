import React, { useState } from 'react'
import Image from 'next/image'
import { assets } from '../../public/assets/assets'


function PromptBox({isLoading, setIsLoading}) {

  const [prompt, setPrompt] = useState('')

  return (
    <form className={`w-full ${false ? 'max-w-3xl' : 'max-w-2xl'} bg-[#404045] p-4 mt-4 rounded-3xl transition-all`}>
      <textarea
        placeholder='Message DeepSeek'
        rows={2}
        className='outline-none w-full  resize-none overflow-hidden wrap-break-word bg-transparent '
        required
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      />

      <div className='flex items-center justify-between text-sm'>
        <div className='flex items-center gap-2'>
          <p className='flex items-center gap-2  text-[12px] border border-gray-300/40 font-semibold  px-2.5 py-1 rounded-full cursor-pointer hover:bg-gray-300/10 transition' title='Think before responding to solve reasoning problems'>
            <Image src={assets.deepthink_icon} alt='' width={15} height={15} /> Deepthink
          </p>
          <p className='flex items-center gap-2 text-[12px] border border-gray-300/40  px-2 py-1 rounded-full cursor-pointer hover:bg-gray-300/10 transition' title='Search the web when necessary'>
            <Image src={assets.search_icon} alt='' height={15} width={15} /> Search
          </p>
        </div>

        <div className='flex items-center gap-5 '>
          <Image className='cursor-pointer ' src={assets.pin_icon} alt='' height={10} width={10} />
          <button className={` ${prompt ? 'bg-primary' : "bg-[#71717a]"} rounded-full p-2 cursor-pointer  `}>
            <Image className=' aspect-square' src={prompt ? assets.arrow_icon : assets.arrow_icon_dull} alt='' height={15} width={15} />
          </button>
        </div>
      </div>

    </form>
  )
}

export default PromptBox
