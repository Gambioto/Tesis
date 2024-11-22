import { TextField } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
type Props = {
    name: string,
    type: string,
    label: string,
}

const CustomizedInput = (props: Props) => {
    return <TextField variant='outlined' margin="normal" name={props.name} label={props.label} type={props.type} slotProps={{
        input: {
            style: { color: 'white', width: '400px', borderRadius: 10, fontSize: 20 }
        }
    }} />
}
export default CustomizedInput