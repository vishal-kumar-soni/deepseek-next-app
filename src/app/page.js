'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { assets } from "../../public/assets/assets";
import Sidebar from "@/components/Sidebar.js";
import PromptBox from "@/components/PromptBox.js";
import Message from "@/components/Message.js";
import { useAppContext } from "@/context/AppContext";


export default function Home() {

  const [expand, setExpand] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { selectedChat } = useAppContext()
  
  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])
  

  return (
    <div>
      <div className="flex h-screen">

        {/* Sidebar */}
        <Sidebar expand={expand} setExpand={setExpand} />

        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-8 text-white relative bg-[#292a2b]">
          <div className="w-full md:hidden absolute px-4 top-6 flex items-center justify-between ">
            <Image alt="" onClick={() => (expand ? setExpand(false) : setExpand(true))} className="rotate-180 " src={assets.menu_icon} />
            <Image alt="" className="opacity-70 " src={assets.chat_icon} />
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
              <div className="relative flex flex-col justify-start items-center mt-20 w-full max-h-screen  overflow-y-auto">
                <p className="fixed top-8 border border-transparent hover:border-gray-500/50 py-1 px-2 rounded-lg font-semibold mb-6">{selectedChat.name}</p>
                {
                  messages.map((msg, idx)=>(
                    <Message key={idx} role={msg.role} content={msg.content} />
                  ))
                }
                {
                  isLoading? (
                    <div className="flex gap-4 max-w-3xl w-full py-3">
                      <Image className="h-9 w-9 p-1 border border-white/15 rounded-full " src={assets.logo_icon} alt=""/>
                      <div className="loader flex justify-center items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-white animate-bounce "></div>
                        <div className="w-1 h-1 rounded-full bg-white animate-bounce "></div>
                        <div className="w-1 h-1 rounded-full bg-white animate-bounce "></div>
                      </div>
                    </div>
                  ):(<></>)
                }
              </div>
            )
          }

          {/* Prompt Box */}
          <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />

          <p className="text-xs absolute bottom-1 text-gray-400">AI-generated, for reference only</p>

        </div>
      </div>
    </div>
  );
}
