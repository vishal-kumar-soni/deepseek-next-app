'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { assets } from '../../public/assets/assets'
import { EllipsisVertical, Smartphone, Settings, CircleQuestionMark, LogOut, Search, PanelLeft, CircleFadingPlus } from 'lucide-react';
import { UserButton, useClerk } from '@clerk/nextjs';
import { useAppContext } from '@/context/AppContext.js';
import Chatlabel from './Chatlabel.js';



const footerdata = [

    {
        id: 1,
        title: "Download mobile App",
        icon: <Smartphone width={20} h={20} />
    },
    {
        id: 2,
        title: "Settings",
        icon: <Settings width={20} h={20} />
    },
    {
        id: 3,
        title: "help & Feedback",
        icon: <CircleQuestionMark width={20} h={20} />
    },
    {
        id: 4,
        title: "Log out",
        icon: <LogOut width={20} h={20} />
    },
]


function Sidebar({ expand, setExpand }) {

    console.log("Expand is ", expand)

    const { user, chats, createNewChat } = useAppContext()
    const { openSignIn, signOut } = useClerk()
    const [menuExpand, setMenuExpand] = useState(false)
    const [openMenu, setOpenMenu] = useState({ id: 0, open: false })

    const setSignedOut = async () => {
        await signOut();
        window.location.reload();
        alert('User signed out')
    }


    return (
        // Inside Sidebar.jsx

        <div className={`flex flex-col justify-between border-r border-r-white/5 bg-[rgba(23,24,26,0.96)] transition-all z-0 max-md:h-screen ${expand ? 'absolute left-0 top-0 h-screen px-3 py-4 w-66 z-50' : 'md:w-52 max-md:relative md:bg-[#17181a] md:border-none w-0 max-md:overflow-hidden' 
            }`}>
            <div>
                <div className={` flex ${expand ? 'flex-row justify-between ' : 'flex-row justify-between items-center gap-8 pt-5'}`}>
                    <div className='flex gap-1 items-center justify-center'>
                        <Image src={assets.logo_icon} height={29} width={29} alt='' className={`${!expand ? 'hidden' : 'block '} mb-1`} />
                        <Image src={expand ? assets.logo_text : assets.logo_icon} alt='' className={` ${expand ? 'w-27 h-auto' : " w-10 h-auto ml-4"} `} />
                    </div>

                    <div className={`  group relative flex  items-center justify-end  transition-all duration-300 rounded-3xl cursor-pointer ${expand ? 'w-20 h-10  ' : 'w-30 h-10 p-2  bg-white/15 border border-white/30'} `}>
                        <div className='p-1.5 rounded-full hover:bg-white/10'>
                            <Search className={` ${!expand ? 'text-white' : 'text-white/60'} `} height={20} w={20} />
                        </div>
                        <Image src={assets.menu_icon} alt='' className={`hidden `}/>
                        <div onClick={() => expand ? setExpand(false) : setExpand(true)} className='p-1.5 rounded-full hover:bg-white/10' title={` ${expand ? 'Close' : 'Expand'}`}>
                            <PanelLeft className={`md:block  h-auto ${!expand ? 'text-white' : 'text-white/60'} `} height={20} w={20} />
                        </div>
                        <button onClick={createNewChat} className={` ${!expand ? 'text-white' : 'hidden text-white/60'} p-1.5 rounded-full hover:bg-white/10 `} title='Create new Chat' >
                            <CircleFadingPlus className={`  h-auto `} height={20} w={20} />
                        </button>
                    </div>
                </div>

                {/* New Chat Button  */}
                <button onClick={createNewChat} className={`border border-white/5 py-2.5 w-full flex items-center justify-center gap-2 bg-[#4b4b4d] my-3 rounded-3xl text-white fonr-bold cursor-pointer ${expand ? 'block' : 'hidden'} `}>
                    <CircleFadingPlus height={20} weight={20} />
                    <p className='font-bold text-sm'>New chat</p>
                </button>

                <div className={`mt-8 text-white/25 h-[65vh] overflow-y-scroll text-sm ${expand ? 'block' : "hidden"}`}>
                    <p className='my-1'>Recents</p>

                    {/* Chatlabel */}
                    {
                        chats.map((chat, idx) =>
                            <Chatlabel key={idx} name={chat.name} id={chat._id} openMenu={openMenu} setOpenMenu={setOpenMenu} />
                        )
                    }
                </div>
            </div>

            <div className={` bg-[#313133] absolute bottom-16 rounded-2xl px-2 py-1.5 ${(menuExpand && expand) ? 'w-56' : 'hidden'}`}>
                {
                    footerdata.map((item) => {
                        if (item.id == 4) {
                            return <div key={item.id} onClick={setSignedOut} className='flex gap-2 cursor-pointer text-sm mt-1 py-1.5 pl-2 hover:bg-white/15  rounded-xl text-white/90'>
                                <p className='text-2xl'>{item.icon} </p>
                                <p >{item.title}</p>
                            </div>
                        } else {
                            return <div key={item.id} className='flex gap-2 cursor-pointer text-sm mt-1 py-1.5 pl-2 hover:bg-white/15  rounded-xl text-white/90'>
                                <p className='text-2xl'>{item.icon} </p>
                                <p >{item.title}</p>
                            </div>
                        }
                    })
                }
            </div>

            {/* Footer */}
            <div className={`rounded-lg p-2 gap-2 ${expand ? 'flex justify-between hover:bg-gray-700 ' : 'hidden '}   `}>
                <div className='flex gap-2'>
                    {
                        user ?
                            <UserButton /> :
                            <Image onClick={user ? null : openSignIn} src={assets.profile_picture} alt='' className={'h-7 w-7 rounded-full cursor-pointer'} />
                    }
                    <div className={expand ? 'w-32 overflow-hidden ' : 'w-0'}>
                        <p className={expand ? 'text-white/90 text-sm  mt-1' : ' hidden'}>{user ? user?.fullName : 'Your name'}</p>
                    </div>
                </div>

                <EllipsisVertical onClick={() => menuExpand ? setMenuExpand(false) : setMenuExpand(true)} className={`cursor-pointer zoom-100 text-white/60 rotate-90`} />
            </div>
        </div>
    )
}

export default Sidebar
