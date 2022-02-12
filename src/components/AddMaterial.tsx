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

export default function FormDialog() {
    const [name, setName] = useState('');
    const [desc, setDescription] = useState('');
    const [mMat, setMetaMaterial] = useState('');

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [saveMaterial, { error, data:data1 }] = useMutation(SAVE_MATERIAL, {
        variables: { name:name,desc:desc,mMat:mMat }
      });

    const { loading, data } =  useQuery<listMetaMaterials>(META_MATERIAL_QUERY);
    if (loading) return <p>Loading...</p>;

    return (
        <div>
        <Button variant="contained" size="small" onClick={handleClickOpen}>
            <AddIcon/>
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add a Material</DialogTitle>

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
                        label="Description UL"
                        value={desc}
                        onChange={e=>setDescription(e.target.value)}
                    />
                    <Select
                        value={mMat}
                        onChange={e=>setMetaMaterial(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        >
                        <MenuItem value=""><em>Meta-Material List</em></MenuItem>
                        {data && data?.metaMaterials.map((metaMaterial,i) => (
                        <MenuItem key={i} value={metaMaterial.name}>{metaMaterial.name}</MenuItem>
                        ))}
                    </Select>
                </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => name && desc && mMat && saveMaterial() && console.log(name,desc,mMat)}>Add Material</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
