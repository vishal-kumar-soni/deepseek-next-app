import Image from 'next/image'
import React from 'react'
import { assets } from '../../public/assets/assets'


function Chatlabel({ openMenu, setOpenMenu }) {


    return (
        <div className='flex items-center justify-between px-2 py-1.5 text-white hover:bg-white/5 rounded-xl text-[12px] group cursor-pointer'>
            <p className='group-hover:max-w-5/6 truncate '>Chat Name Here</p>
            <div className='group relative flex items-center justify-center h-9 w-9 aspect-square hover:bg-black/15 rounded-full '>
                {/* use it here */}
                <Image src={assets.three_dots} alt='' className={`w-4 ${openMenu.open ? '' : 'hidden'} group-hover:block`} />
                <div className={`absolute ${openMenu.open ? 'block' : 'hidden'} -right-5 top-6 bg-gray-700 rounded-xl w-max p-2 `}>
                    <div className='flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg'>
                        <Image src={assets.pencil_icon} alt='' />
                        <p>Rename</p>
                    </div>
                    <div className='flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg'>
                        <Image src={assets.delete_icon} alt='' />
                        <p>Delete</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatlabel
