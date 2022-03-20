import React ,{ useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useQuery, useMutation, gql } from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
import SketchExample from './ColorPicker'
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface metaMaterial {
    name: string;
}

interface parameters {
    [key: string]: string;
}
  
interface listMetaMaterials{
    metaMaterials: metaMaterial[];
}

interface parameter {
    name: string;
    diffuse: string;
    specular: string;
    emissive: string;
    shininess: string;
    ambient: string;
    transparency: string;
    texture: string;
    mapping: string
}

interface listParameters {
    materialParams: parameter[];
}

const parametersList:string[]=["ambient","diffuse","specular","emission","shininess","transparency","texture","mapping"]

const META_MATERIAL_QUERY = gql`{
    metaMaterials {
     name
    }
}`;

const SAVE_MATERIAL = gql `mutation addMat($name:String!,$desc:String!,$mMat:String!) {
    addMaterial(name:$name,desc:$desc,mMat:$mMat)
 }`;


const SAVE_PARAMERTER_MATERIAL = gql `mutation addParams($ambient:String!,$diffuse:String!,$specular:String!,
    $emission:String!,$shininess:String!,$transparency:String!,$texture:String!,$mapping:String!){

        addParamsMaterial(ambient:$ambient,diffuse:$diffuse,specular:$specular,emission:$emission,shininess:$shininess,
            transparency:$transparency,texture:$texture,mapping:$mapping
        )
 }`; 


export default function FormDialog() {
    let materialParams:parameters = {};

    const [name, setName] = useState('');
    const [desc, setDescription] = useState('');
    const [mMat, setMetaMaterial] = useState('');

    const initParams = (params:string[]) => {
        params.forEach(function (element) {
            materialParams[element]=""
        }); 
    }

    const selectedColor = (id:string,color:string) =>{
        materialParams[id]=color
        console.log(id,color)
    }
    
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        initParams(parametersList)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    const [saveMaterial] = useMutation(SAVE_MATERIAL, {
        variables: { name:name,desc:desc,mMat:mMat }
    });

    const [saveParamsMaterial] = useMutation(SAVE_PARAMERTER_MATERIAL, {
        variables: { ambient:materialParams.ambient,
            difusse:materialParams.diffuse,
            specular:materialParams.specular,
            emission:materialParams.emission,
            shininess:materialParams.shininess,
            texture:materialParams.texture,
            mapping:materialParams.mapping,
            transparency:materialParams.transparency
        }
    });

    const notify = () =>{
        saveMaterial()
        saveParamsMaterial()
        handleClose()
        toast.success("Material Added",{position:toast.POSITION.TOP_RIGHT, autoClose:1000})
        window.location.reload()
    }

    const { loading, data } =  useQuery<listMetaMaterials>(META_MATERIAL_QUERY);
    if (loading) return <p>Loading...</p>;

    return (
        <div>
        <Button variant="contained" size="small" onClick={handleClickOpen}>
            <AddIcon/>
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Material</DialogTitle>
            <DialogContent>
            <Box>
                <br></br>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <TextField id="outlined-name" label="Name" value={name} onChange={e=>setName(e.target.value)}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id="outlined-name" label="Description UL" value={desc} onChange={e=>setDescription(e.target.value)}/>
                    </Grid>
                    <Grid item lg={4}>
                        <Select value={mMat} onChange={e=>setMetaMaterial(e.target.value)} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                            <MenuItem value=""><em>Meta-Material List</em></MenuItem>
                                {data && data?.metaMaterials.map((metaMaterial,i) => (
                            <MenuItem key={i} value={metaMaterial.name}>{metaMaterial.name}</MenuItem>
                        ))}
                        </Select>
                    </Grid>
                    <Grid item xs={2}>
                      <ListItemText primary="Ambient" />
                        <SketchExample id="ambient" baseColor="000000" onSelectColor={selectedColor }/>
                    </Grid>
                    <Grid item xs={2}>
                    <ListItemText primary="Diffuse" />
                        <SketchExample id="diffuse" baseColor="000000" onSelectColor={selectedColor }/>
                    </Grid>
                    <Grid item xs={2}>
                    <ListItemText primary="Emission" />
                        <SketchExample id="emission" baseColor="000000" onSelectColor={selectedColor }/>
                    </Grid>
                    <Grid item xs={2}>
                    <ListItemText primary="Specular" />
                        <SketchExample id="specular" baseColor="000000" onSelectColor={selectedColor }/>
                    </Grid>       
               </Grid>
            </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={notify}>Add</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}