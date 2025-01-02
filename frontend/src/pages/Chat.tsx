import { Avatar, Box, Button, IconButton, Typography } from "@mui/material"
import { useAuth } from "../context/AuthContext"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { red } from "@mui/material/colors"
import { IoMdSend } from "react-icons/io"
import ChatItem from "../components/chat/ChatItem"
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
type Message = {
    role: 'user' | 'assisttant'
    content: string
}

const Chat = () => {
    const navigate = useNavigate()
    const auth = useAuth()
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [chatMessages, setChatMessages] = useState<Message[]>([])
    const handleSubmit = async () => {
        const content = inputRef.current?.value as string
        if (inputRef && inputRef.current) {
            inputRef.current.value = ""
        }
        const newMessage: Message = { role: 'user', content }
        setChatMessages((prev) => [...prev, newMessage])
        const chatData = await sendChatRequest(content)
        setChatMessages([...chatData.chats])
    }
    const handleDeleteChats = async () => {
        try {
            toast.loading('Deleating Chats', { id: 'deletechats' })
            await deleteUserChats()
            setChatMessages([])
            toast.success('Deleted Chats Succesfully', { id: 'deletechats' })
        } catch (error) {
            console.log(error)
            toast.error('Deleting chats failed', { id: 'deletechats' })
        }
    }
    useLayoutEffect(() => {
        if (auth?.isLoggedIn && auth.user) {
            toast.loading("Loading Chats", { id: "loadchats" })
            getUserChats().then((data) => {
                setChatMessages([...data.chats])
                toast.success("Succesfully loaded chats", { id: 'loadchats' })
            }).catch((err) => {
                console.log(err)
                toast.error("Loading failed", { id: 'loadchats' })
            })
        }
    }, [auth])
    useEffect(() => {
        if (!auth?.user) {
            return navigate("/login")
        }
    }, [auth])
    return (<Box
        sx={{
            display: 'flex',
            flex: 1,
            width: '100%',
            height: '100%',
            mt: 3,
            gap: 3
        }}
    >
        <Box sx={{ display: { md: 'flex', xs: 'none', sm: 'none' }, flex: 0.2, flexDirection: 'column' }}>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '60vh',
                    bgcolor: 'rgb(17,29,39)',
                    borderRadius: 5,
                    flexDirection: 'column',
                    mx: 3
                }}
            >
                <Avatar
                    sx={{
                        mx: 'auto',
                        my: 2,
                        bgcolor: 'white',
                        color: 'black',
                        fontWeight: 700
                    }}
                >{auth?.user?.username[0]}</Avatar>
                <Typography sx={{ mx: 'auto', fontFamily: 'work sans' }}>
                    Estas hablando con tu asistente artificial
                </Typography>
                <Typography sx={{ mx: 'auto', fontFamily: 'work sans', my: 4, p: 3 }}>
                    Puedes hacer preguntas con respecto a cualquier duda que tengas sobre tu empresa. <br></br>
                    Evita compartir informacion personal.
                </Typography>
                <Button
                    onClick={handleDeleteChats}
                    sx={{
                        width: '200px',
                        my: 'auto',
                        color: 'white',
                        fontWeight: '700',
                        borderRadius: 3,
                        mx: 'auto',
                        bgcolor: red[300],
                        ':hover': {
                            bgcolor: red.A400
                        }
                    }}
                >
                    Borrar conversacion
                </Button>
            </Box>
        </Box>
        <Box sx={{ display: 'flex', flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: 'column', px: 3 }}>
            <Typography sx={{ textAlign: 'center', fontSize: '40px', color: 'white', mb: 2, mx: 'auto' }}>Modelo - GPT 4.0</Typography>
            <Box
                sx={{
                    width: '100%',
                    height: '60vh',
                    borderRadius: 3,
                    mx: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'scroll',
                    overflowX: 'hidden',
                    scrollBehavior: 'smooth'
                }}
            >
                {chatMessages.map((chat, index) => (
                    //@ts-ignore
                    < ChatItem content={chat.content} role={chat.role} key={index} />
                ))}
            </Box>
            <div style={{
                width: '100%',
                borderRadius: 8,
                backgroundColor: 'rgb(12,27,39)',
                display: 'flex',
                margin: 'auto'
            }}
            >
                {''}
                <input type="text"
                    ref={inputRef}
                    style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        padding: '20px',
                        border: 'none',
                        outline: 'none',
                        color: 'white',
                        fontSize: '20px'
                    }}
                />
                <IconButton onClick={handleSubmit} sx={{ ml: 'auto', color: 'white', mx: 1 }}><IoMdSend /></IconButton>
            </div>
        </Box>
    </Box>

    )
}

export default Chat