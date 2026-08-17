'use client'

import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"

export const AppContext = createContext();

export const useAppContext = () => {  // This is simply a convenient wrapper.
    return useContext(AppContext)
}

export const AppContextProvider = ({ children }) => {
    const { user } = useUser()
    const { getToken } = useAuth()

    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState(null)

    const createNewChat = async () => {
        try {
            if (!user) return null;

            const token = await getToken()

            await axios.post('/api/chat/create', {}, {
                headers: {
                    authorization: `Bearer ${token}`
                }

            })

            await fetchUsersChat()

        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    const fetchUsersChat = async () => {

        try {
            const token = await getToken()

            const {data} = await axios.get('/api/chat/get', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                console.log(data.data)
                setChats(data.data) 

                //If user has no chat , create one
                if (data.data.length == 0) {
                    await createNewChat();
                    return fetchUsersChat()
                } else {
                    //sort chats by updated date
                    data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                }

                // set recently updated chat as selectedChat
                setSelectedChat(data.data[0])
                console.log(data.data[0])

            } else {
                alert(data.message)
            }
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            fetchUsersChat()
        }
    }, [user])


    const value = {
        user,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        fetchUsersChat,
        createNewChat
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
