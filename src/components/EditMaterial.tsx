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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


interface metaMaterial {
    name: string;
}
  
interface listMetaMaterials{
    metaMaterials: metaMaterial[];
}

const META_MATERIAL_QUERY = gql`{
    metaMaterials {
     name
    }
}`;

const SAVE_MATERIAL = gql `mutation addMat($name:String!,$desc:String!,$mMat:String!) {
    addMaterial(name:$name,desc:$desc,mMat:$mMat)
 }`;

const UPDATE_MATERIAL_QUERY = gql `mutation editMat($name:String!,$newName:String!,$desc:String!,$mMat:String!) {
    editMaterial(name:$name,newName:$newName,desc:$desc,mMat:$mMat)
  }`;
  

export default function EditMaterial(props:{name?:string,desc?:string, mMat?:string}){
    const [name, setName] = useState('');
    const [desc, setDescription] = useState('');
    const [mMat, setMetaMaterial] = useState('');

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

      
    const { loading, data } =  useQuery<listMetaMaterials>(META_MATERIAL_QUERY);
    if (loading) return <p>Loading...</p>;

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
                     value={props.desc}
                     onChange={e=>setDescription(e.target.value)}
                 />
                <Select
                    value={props.mMat}
                    onChange={e=>setMetaMaterial(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value={props.mMat}><em>Meta-Material List</em></MenuItem>
                        {data && data?.metaMaterials.map((metaMaterial,i) => (
                    <MenuItem key={i} value={metaMaterial.name}>{metaMaterial.name}</MenuItem>
                    ))}
                    </Select>
            </Box>
         </DialogContent>
         <DialogActions>
         <Button onClick={handleClose}>Cancel</Button>
         <Button onClick={() => props.name && updateName && props.desc && props.mMat && updateMaterial() && window.location.reload() }>Update</Button>
         </DialogActions>
     </Dialog>
        </div>

    )   
}