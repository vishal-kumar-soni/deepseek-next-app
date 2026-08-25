'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { assets } from "../../public/assets/assets";
import { Zap } from 'lucide-react';
import Sidebar from "@/components/Sidebar.js";
import PromptBox from "@/components/PromptBox.js";
import Message from "@/components/Message.js";
import { useAppContext } from "@/context/AppContext";
import ShareIcon from '../../public/assets/shareIcon.jsx'


export default function Home() {

  const [expand, setExpand] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { selectedChat } = useAppContext()
  const containerRef = useRef()


  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [selectedChat])

  const handleExpand = () => {
    expand ? setExpand(false) : setExpand(true)
  }

  {/*  */ }
  return (
    <div className="flex h-dvh  relative">

      {/* Sidebar */}
      <Sidebar expand={expand} setExpand={setExpand} />

      <div className="flex h-full flex-1 min-w-0 flex-col items-center justify-center px-4 pb-8 text-white relative bg-[#17181a]">
        <div className="w-full h-4  md:hidden absolute px-4 top-6 flex items-center justify-between ">
          <Image alt="" onClick={handleExpand} height={20} width={20} className="rotate-180 cursor-pointer " src={assets.menu_icon} />
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
            <div ref={containerRef} className="relative flex flex-col justify-start items-center mt-20 w-full max-h-screen overflow-y-auto overflow-x-hidden">
              <div className={`bg-[#17181a] fixed top-5 max-md:top-3 ${expand ? 'left-74 max-md:hidden' : 'left-56 max-md:left-16'} `}>
                <p className=" text-sm border border-transparent hover:border-gray-500/50 rounded-3xl font-semibold px-2 py-1 cursor-pointer ">{selectedChat.name}</p>
                <div className=" flex  items-center justify-start gap-1.5  ">
                  <Zap height={16} width={12} className=" mb-0 text-cyan-500 " />
                  <p className="text-[12px] text-white/70">Instant</p>
                </div>
              </div>

              <div className="fixed top-3 right-8 text-white/70 p-1.5 hover:bg-white/5 rounded-full cursor-pointer" title="Share">
                <ShareIcon />
              </div>
              {
                messages.map((msg, idx) => (
                  <Message key={idx} role={msg.role} content={msg.content} />
                ))
              }
              {
                isLoading && (
                  <div className="flex gap-4 max-w-3xl w-full py-3">
                    <Image className="h-9 w-9 p-1 border border-white/15 rounded-full " src={assets.logo_icon} alt="" />
                    <div className="loader flex justify-center items-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-white animate-bounce "></div>
                      <div className="w-1 h-1 rounded-full bg-white animate-bounce "></div>
                      <div className="w-1 h-1 rounded-full bg-white animate-bounce "></div>
                    </div>
                  </div>
                )
              }
            </div>
          )
        }

        {/* Prompt Box */}
        <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />

        <p className="text-xs absolute bottom-1 text-gray-400">AI-generated, for reference only</p>

      </div>
    </div>

  );
}
