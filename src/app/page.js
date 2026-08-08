'use client'

import Image from "next/image";
import { useState } from "react";
import { assets } from "../../public/assets/assets";
import Sidebar from "@/components/Sidebar";


export default function Home() {

  const [expand, setExpand] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div>
      <div className="flex h-screen">

        {/* Sidebar */}
        <Sidebar expand={expand} setExpand={setExpand}/>


        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-8 text-white relative bg-[#292a2b]">
          <div className="w-full md:hidden absolute px-4 top-6 flex items-center justify-between ">
            <Image alt="" onClick={() => (expand ? setExpand(false) : setExpand(true))} className="rotate-180 " src={assets.menu_icon} />
            <Image  alt=""  className="opacity-70 " src={assets.chat_icon} />
          </div>
          {
            (messages.length === 0) ? (
              <>
                <div className="flex items-center gap-3 bg-amber-20">
                  <Image src={assets.logo_icon} width={40} height={40} className="" alt="Logo" />
                  <p className='  text-2xl font-medium'>Hii, i'm DeepSeek</p>
                </div>
                <p className='text-sm mt-2'>How can I help you Today</p>
              </>
            ) : (
              <div></div>
            )
          }

          {/* Prompt Box */}

          <p className="text-xs absolute bottom-1 text-gray-400">AI-generated, for reference only</p>

        </div>
      </div>
    </div>
  );
}
