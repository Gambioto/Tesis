import { Box, Button, Typography } from "@mui/material"
import React, { useEffect } from "react"
import CustomizedInput from "../components/shared/CustomizedInput"
import toast, { } from 'react-hot-toast'
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
const Signup = () => {
    const navigate = useNavigate()
    const auth = useAuth()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const username = formData.get('username') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        try {
            toast.loading("Creando cuenta", { id: "signup" })
            await auth?.signup(username, email, password)
            toast.success("Cuenta creada con exito", { id: "signup" })
        } catch (error) {
            console.log(error)
            toast.error('Creacion de cuenta fallido', { id: 'signup' })
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
                            Crear Cuenta
                        </Typography>
                        <CustomizedInput type="text" name="username" label="Username" />
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
                        Crear Cuenta
                    </Button>
                </form>
            </Box>
        </Box>
    )
}

export default Signup