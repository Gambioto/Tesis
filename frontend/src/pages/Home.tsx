import { Box } from "@mui/material"
import React from "react"
import TypeAnim from "../components/typer/TypeAnim"

const Home = () => {
    return <Box width={'100%'} height={'100%'}>
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}><TypeAnim /></Box>
    </Box>
}

export default Home