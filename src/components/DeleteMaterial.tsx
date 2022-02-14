import React ,{ useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useQuery, useMutation, gql } from '@apollo/client';



const DELETE_MATERIAL_QUERY = gql `
mutation delMat($name:String!) {
  deleteMaterial(name:$name)
}`;

export default function DeleteMaterial(){
    const [delName, setName] = useState('');

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [delMaterial, { error, data }] = useMutation(DELETE_MATERIAL_QUERY, {
        variables: { name:delName}
      });
    return (
        <div>
            <Button variant="contained" color="error" size="small" onClick={handleClickOpen}>
                <DeleteIcon/>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete a Material</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField
                            id="outlined-name"
                            label="Name"
                            value={delName}
                            onChange={e=>setName(e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    )   
}