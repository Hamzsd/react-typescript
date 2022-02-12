import React ,{ useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


export default function DeleteMaterial(){
    return (
        <Button variant="contained" color="error" size="small">
           <DeleteIcon size="small"/>
        </Button>
    )
    
}