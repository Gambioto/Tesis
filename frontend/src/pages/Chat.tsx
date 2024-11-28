import { Avatar, Box, Button, IconButton, Typography } from "@mui/material"
import { useAuth } from "../context/AuthContext"
import React from "react"
import { red } from "@mui/material/colors"
import { IoMdSend } from "react-icons/io"

const Chat = () => {
    const auth = useAuth()
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
            ></Box>
            <div style={{
                width: '100%',
                padding: '20px',
                borderRadius: 8,
                backgroundColor: 'rgb(12,27,39)',
                display: 'flex',
                margin: 'auto'
            }}
            >
                {''}
                <input type="text"
                    style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        padding: '10px',
                        border: 'none',
                        outline: 'none',
                        color: 'white',
                        fontSize: '20px'
                    }}
                />
                <IconButton sx={{ ml: 'auto', color: 'white' }}><IoMdSend /></IconButton>
            </div>
        </Box>
    </Box>

    )
}

export default Chat