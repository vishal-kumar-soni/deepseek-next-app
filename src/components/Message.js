'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import { assets } from '../../public/assets/assets'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Prism from 'prismjs'
import ShareIcon from '../../public/assets/shareIcon';



function Message({ role, content }) {

    useEffect(() => {
        Prism.highlightAll()
    }, [content])

    const copyText = () => {
        navigator.clipboard.writeText(content);
        alert('message copied')
    }

    return (
        <div className='flex flex-col items-center w-full max-w-3xl text-sm '>
            <div className={` flex flex-col w-full mb-8 ${role === 'user' && 'items-end'} `}>
                <div className={` group relative max-w-2xl flex py-3 rounded-3xl ${role == 'user' ? 'bg-[#2a2a2e] px-5' : 'gap-3'}`}>
                    <div className={`opacity-0 group-hover:opacity-100   absolute ${role == 'user' ? 'right-1 -bottom-7 ' : 'left-9 -bottom-6'} transition-all `}>
                        <div className='flex  items-center gap-4 opacity-70 text-white/80'>
                            {
                                (role == 'user') ? (
                                    <>
                                        <Image onClick={copyText} src={assets.copy_icon} alt='' className='w-4 h-auto cursor-pointer' />
                                        <Image src={assets.pencil_icon} alt='' className='w-4.5 h-auto cursor-pointer' />
                                    </>
                                ) : (
                                    <>
                                        <Image onClick={copyText} src={assets.copy_icon} alt='' className='w-4.5 h-auto cursor-pointer' />
                                        <Image src={assets.regenerate_icon} alt='' className='w-4  h-autocursor-pointer' />
                                        <Image src={assets.like_icon} alt='' className='w-4 h-auto cursor-pointer' />
                                        <Image src={assets.dislike_icon} alt='' className='w-4 h-auto cursor-pointer' />
                                        <ShareIcon className='text-white/50'/>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    {
                        role == 'user' ? (
                            <span className='text-white/90'>{content}</span>
                        ) : (
                            <>
                                <Image src={assets.logo_icon} alt='' className='h-9 w-9 p-1 border border-white/15 rounded-full ' />
                                <div className='space-y-4 w-full overflow-scroll'>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                    >
                                        {content}
                                    </ReactMarkdown>

                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Message
