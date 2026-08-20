"use client";

import Image from "next/image";
import React from "react";
import { assets } from "../../public/assets/assets";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";


function Chatlabel({ openMenu, setOpenMenu, name, id }) {
    const { fetchUsersChat, chats, setSelectedChat } = useAppContext();

    const selectChat = () => {
        const chatData = chats.find((chat) => chat._id == id);
        setSelectedChat(chatData);
        console.log(chatData);
    };

    const renameChat = async () => {
        try {
            const newName = prompt("Enter the new name");
            if (!newName) return;

            const { data } = await axios.post("/api/chat/rename", {
                chatId: id,
                name: newName,
            });

            if (data.success) {
                fetchUsersChat();
                setOpenMenu({ id: 0, open: false });
                console.log(data.message);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };

    const deleteChat = async () => {

        try {
            const confirm = window.confirm(
                "This chat can't be recovered.\n\n" +
                "Share links from it will be disabled.\n"
            );

            if (!confirm) return;
            const { data } = await axios.post("/api/chat/delete", { chatId: id });

            if (data.success) {
                fetchUsersChat();
                setOpenMenu({ id: 0, open: false });
                console.log(data.message);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    };

    return (
        <div onClick={selectChat} className="flex items-center justify-between px-2 py-1.5 text-white hover:bg-white/5 rounded-xl text-[12px] group cursor-pointer">
            <p className="group-hover:max-w-5/6 truncate ">{name}</p>
            <div onClick={(e) => { e.stopPropagation(); setOpenMenu({ id: id, open: !openMenu.open }) }} className="group relative flex items-center justify-center h-9 w-9 aspect-square hover:bg-black/15 rounded-full ">

                <Image
                    src={assets.three_dots}
                    alt=""
                    className={`w-4 h-auto ${openMenu.id == id && openMenu.open ? "" : "hidden"} group-hover:block`}
                />
                <div
                    className={`absolute ${openMenu.id == id && openMenu.open ? "block" : "hidden"} -left-20 top-6 bg-gray-700 z-50 rounded-xl w-max p-2 `}>
                    <div onClick={renameChat} className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
                        <Image src={assets.pencil_icon} alt="" />
                        <p>Rename</p>
                    </div>
                    <div onClick={deleteChat} className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
                        <Image src={assets.delete_icon} alt="" />
                        <p>Delete</p>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Chatlabel;
