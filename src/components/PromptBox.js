import React, { useState } from 'react'
import Image from 'next/image'
import { assets } from '../../public/assets/assets'
import { useAppContext } from '@/context/AppContext'
import axios from 'axios'


function PromptBox({ isLoading, setIsLoading }) {

  const [prompt, setPrompt] = useState('')
  const { user, chats, setChats, selectedChat, setSelectedChat, } = useAppContext()

  const handleKeyDown = (e) => {
    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendPrompt(e)
    }
  }

  const sendPrompt = async (e) => {

    const promptCopy = prompt;

    try {

      e.preventDefault();

      if (!user) return alert("Login first to get response")
      if (isLoading) return alert("wait for the prevous response")

      console.log("user is loggedin")

      setIsLoading(true);
      setPrompt('')

      const userPrompt = {
        role: 'user',
        content: prompt,
        timestamp: Date.now()
      }

      //save user prompt in chat array
      setChats((previousChats) => previousChats.map((chat) => (chat._id == selectedChat._id) ? {
        ...chat,
        messages: [...chat.messages, userPrompt],
      } :
        chat
      ))

      //Saving user prompt in selected chat
      setSelectedChat((prev) => ({
        ...prev,
        messages: [...prev.messages, userPrompt]
      }))

      console.log('chats before api call', chats)
      console.log(' selected chats before api call', selectedChat)

      // Fetch data from AI
      const { data } = await axios.post('/api/chat/ai', {
        chatId: selectedChat._id,
        prompt
      })

      console.log("This is api data", data)

      if (data.success) {
        setChats((previousChats) => previousChats.map((chat) => (chat._id == selectedChat._id) ? {
          ...chat,
          messages: [...chat.messages, data.data],
        } :
          chat
        ))

        const message = data.data.content; //  This is actual AI response in text
        const messageTokens = message.split('') // Split the message char by char - ["H", "e", "l", "l", "o" ........] if want word by word do - split(' ')

        let assistantMessage = {
          role: 'assistant',
          content: '',
          timestamp: Date.now()
        }

        setSelectedChat((prev) => ({
          ...prev,
          messages: [...prev.messages, assistantMessage]
        }))

        // The typing effect
        for (let i = 0; i < messageTokens.length; i++) {
          setTimeout(() => {

            assistantMessage.content = messageTokens.slice(0, i + 1).join(""); // issue

            setSelectedChat((prev) => {
              const updateMessages = [
                ...prev.messages.slice(0, -1), assistantMessage
              ]
              return { ...prev, messages: updateMessages }
            })

          })
        }

      } else {
        alert(data.message);
        setPrompt(promptCopy)
      }

    } catch (error) {
      console.log(error)
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={sendPrompt} className={`w-full ${false ? 'max-w-3xl' : 'max-w-2xl'} bg-[#404045] p-4 mt-4 rounded-3xl transition-all`}>
      <textarea
        onKeyDown={handleKeyDown}
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
