import { Box, Button, Typography } from "@mui/material"
import React, { useEffect } from "react"
import CustomizedInput from "../components/shared/CustomizedInput"
import toast, { } from 'react-hot-toast'
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const navigate = useNavigate()
    const auth = useAuth()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        try {
            toast.loading("Iniciando sesion", { id: "login" })
            await auth?.login(email, password)
            toast.success("Se inicio sesion", { id: "login" })
        } catch (error) {
            console.log(error)
            toast.error('Inicio de sesion fallido', { id: 'login' })
        }
    }
    useEffect(() => {
        if (auth?.user) {
            return navigate("/chat")
        }
    }, [auth])
    return (
        <Box width={'100%'} height={'100%'} display={'flex'} flex={1}>
            <Box
                padding={8}
                mt={8}
                display={{ md: 'flex', sm: 'none', xs: 'none' }}
            >
                <img src="asistente.png" alt="Robot" style={{ width: "400px" }}></img>
            </Box>
            <Box
                display={"flex"}
                flex={{ xs: 1, md: 0.5 }}
                justifyContent={'center'}
                alignItems={"center"}
                padding={2}
                ml={"auto"}
                mt={"16"}
            >
                <form
                    onSubmit={(handleSubmit)}
                    style={{
                        margin: 'auto',
                        padding: '30px',
                        boxShadow: '10px 10px 20px #000',
                        borderRadius: '10px',
                        border: 'none',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h4" textAlign={"center"} padding={2} fontWeight={600}>
                            Login
                        </Typography>
                        <CustomizedInput type="email" name="email" label="Email" />
                        <CustomizedInput type="password" name="password" label="Password" />
                    </Box>
                    <Button
                        type="submit"
                        sx={{
                            color: "black",
                            px: 2,
                            py: 1,
                            mt: 2,
                            width: '400px',
                            borderRadius: 2,
                            bgcolor: "#41b7dd",
                            ":hover": {
                                bgcolor: "white",
                                color: "black"
                            }
                        }}
                    >
                        Iniciar Sesion
                    </Button>
                </form>
            </Box>
        </Box>
    )
}

export default Login