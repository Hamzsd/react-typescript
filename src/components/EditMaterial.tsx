import React ,{ useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useQuery, useMutation, gql } from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';



const UPDATE_MATERIAL_QUERY = gql `mutation editMat($name:String!,$newName:String!,$desc:String!,$mMat:String!) {
    editMaterial(name:$name,newName:$newName,desc:$desc,mMat:$mMat)
  }`;
  

export default function EditMaterial(){
    const [name, setName] = useState('');
    const [updateName, setNewName] = useState('');
    const [desc, setDescription] = useState('');
    const [mMat, setMetaMaterial] = useState('');
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [saveMaterial, { error, data:data1 }] = useMutation(UPDATE_MATERIAL_QUERY, {
        variables: { name:name,desc:desc,mMat:mMat }
      });
    return (
        <div>
        <Button variant="contained" color="warning" size="small" onClick={handleClickOpen}>
           <EditIcon/>
        </Button>
         <Dialog open={open} onClose={handleClose}>
         <DialogTitle>Update Material</DialogTitle>
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
                     value={name}
                     onChange={e=>setName(e.target.value)}
                 />
                <TextField
                        id="outlined-name"
                        label="NewName"
                        value={updateName}
                        onChange={e=>setNewName(e.target.value)}
                />
                 <TextField
                 id="outlined-name"
                     label="Description UL"
                     value={desc}
                     onChange={e=>setDescription(e.target.value)}
                 />
             </Box>
         </DialogContent>
         <DialogActions>
         <Button onClick={handleClose}>Cancel</Button>
         <Button onClick={() => name && desc && mMat && saveMaterial() && console.log(name,desc,mMat)}>Update</Button>
         </DialogActions>
     </Dialog>
        </div>

    )   
}