'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../../public/assets/assets'
import { EllipsisVertical, Smartphone, Settings, CircleQuestionMark, LogOut } from 'lucide-react';
import { UserButton, useClerk } from '@clerk/nextjs';
import { useAppContext } from '@/context/AppContext';
import Chatlabel from './Chatlabel';


const footerdata = [

    {
        title: "Download mobile App",
        icon: <Smartphone width={20} h={20} />
    },
    {
        title: "Settings",
        icon: <Settings width={20} h={20} />
    },
    {
        title: "help & Feedback",
        icon: <CircleQuestionMark width={20} h={20} />
    },
    {
        title: "Log out",
        icon: <LogOut width={20} h={20} />
    },
]



function Sidebar({ expand, setExpand }) {

    const { user } = useAppContext()
    const { openSignIn } = useClerk()
    const [menuExpand, setMenuExpand] = useState(false)
    const [openMenu, setOpenMenu] = useState({ id: 0, open: false })
    const menuRef = useRef()

    useEffect(() => {

        function handleClickOutside(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setMenuExpand( false )
            }

        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [setMenuExpand])


    return (
        <div className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all z-0 max-md:absolute max-md:h-screen ${expand ? 'p-4 w-72' : 'md:w-20 w-0 max-md:overflow-hidden '}`}>
            <div>
                <div className={` flex ${expand ? 'flex-row gap-8' : 'flex-col items-center gap-8'}`}>
                    <Image src={expand ? assets.logo_text : assets.logo_icon} alt='' className={` ${expand ? 'w-56' : " w-10"} `} />
                    <div onClick={() => expand ? setExpand(false) : setExpand(true)} className={` group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 w-9 h-9  aspect-square rounded-lg cursor-pointer `}>
                        <Image  src={assets.menu_icon} alt='' className="md:hidden" />
                        <Image src={expand ? assets.sidebar_close_icon : assets.sidebar_icon} alt='' className="hidden md:block w-8" />

                        <div className={`w-max absolute ${expand ? 'left-1/2 -translate-x-1/2 top-12' : ' -top-12 left-0'} opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-3 py-2 rounded-lg  shadow-lg pointer-events-none `}>
                            {expand ? 'Close' : 'Expand'}
                            <div className={` w-3 h-3 absolute bg-black rotate-45 ${expand ? 'left-1/2 -top-1.5 -translate-x-1/2 ' : 'left-4 -bottom-1.5'}`}>
                            </div>
                        </div>
                    </div>
                </div>

                <button className={`flex items-center justify-center mt-5 cursor-pointer ${expand ? 'bg-primary hover:opacity-90 rounded-2xl p-2.5 gap-2 w-max  ' : ' group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg '}`}>
                    <Image src={expand ? assets.chat_icon : assets.chat_icon_dull} alt='' className={expand ? 'w-6 ' : 'w-7 '} />
                    <div className='absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none '>
                        New Chat
                        <div className='w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5'>
                        </div>
                    </div>
                    {
                        expand && <p className='text-white text font-medium'>New Chat</p>
                    }
                </button>
                <div className={`mt-8 text-white/25 text-sm ${expand ? 'bloack' : "hidden"}`}>
                    <p className='my-1'>Recents</p>

                    {/* Chatlabel */}
                    <Chatlabel openMenu={openMenu} setOpenMenu={setOpenMenu} />
                </div>
            </div>

            <div className={` bg-white/10 absolute bottom-16 rounded-2xl px-2 py-1.5 ${(menuExpand && expand) ? 'w-56' : 'hidden'}`}>
                {
                    footerdata.map((item) => {
                        return <div key={item.title} className='flex gap-2 cursor-pointer text-sm mt-1 py-1.5 pl-2 hover:bg-white/15  rounded-xl text-white/90'>
                            <p className='text-2xl'>{item.icon} </p>
                            <p >{item.title}</p>
                        </div>
                    })
                }
            </div>

            {/* Footer */}
            <div className={`rounded-lg p-2 gap-2 ${expand ? 'flex justify-between hover:bg-gray-700 ' : 'flex justify-center  cursor-pointer '}   `}>
                <div className='flex gap-2'>
                    {
                        user ?
                            <UserButton /> :
                            <Image onClick={user ? null : openSignIn} src={assets.profile_picture} alt='' className={'h-7 w-7 rounded-full cursor-pointer'} />
                    }
                    <div className={expand ? 'w-52 overflow-hidden ' : 'w-0'}>
                        <p className={expand ? 'text-white/60 text-sm  mt-1' : ' hidden'}>vishal@gmail.com</p>
                    </div>
                </div>

                <EllipsisVertical ref={menuRef} onClick={() => menuExpand ? setMenuExpand(false) : setMenuExpand(true)} className={`cursor-pointer ${expand ? 'text-white/60' : 'hidden'} `} />
            </div>
        </div>
    )
}

export default Sidebar
