import React ,{ useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { useQuery, useMutation, gql } from '@apollo/client';
import EditIcon from '@mui/icons-material/Edit';



const UPDATE_MATERIAL_QUERY = gql `mutation editMat($name:String!,$newName:String!,$desc:String!,$mMat:String!) {
    editMaterial(name:$name,newName:$newName,desc:$desc,mMat:$mMat)
  }`;
  

export default function EditMaterial(props:{name?:string,desc?:string, mMat?:string}){
    const [updateName, setNewName] = useState('');
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [updateMaterial, { error, data:data1 }] = useMutation(UPDATE_MATERIAL_QUERY, {
        variables: { name:props.name,newName:updateName,desc:props.desc,mMat:props.mMat }
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
                     value={props.name}
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
                     value={props.desc}
                 />
                <TextField
                     id="outlined-name"
                     label="MetaMaterial"
                     value={props.mMat}
                 />
            </Box>
         </DialogContent>
         <DialogActions>
         <Button onClick={handleClose}>Cancel</Button>
         <Button onClick={() => props.name && updateName && props.desc && props.mMat && updateMaterial()}>Update</Button>
         </DialogActions>
     </Dialog>
        </div>

    )   
}