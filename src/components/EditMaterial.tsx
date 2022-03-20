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
import SketchExample from './ColorPicker'
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';


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

interface singleParam {
    singleMaterialParams: parameter;
}

const PARAMETERS_QUERY = gql `
{
    materialParams {
      name
      diffuse
      specular
      emissive
      shininess
      ambient
      transparency
      texture
      mapping
    } 
}`;

const SINGLE_PARAMETER = gql`
query singleParam($name:String!) {
    singleMaterialParams (name:$name) {
        name
        diffuse
        specular
        emissive
        shininess
        ambient
        transparency
        texture
        mapping
    } 
}`

const parametersList:string[]=["ambient","diffuse","specular","emission","shininess","transparency","texture","mapping"]
interface parameters {
    [key: string]: string;
}

export default function EditMaterial(props:{name?:string,desc?:string, mMat?:string}){
    let materialParams:parameters = {};
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
    
    const { loading:l1, data:d1 } =  useQuery<singleParam>(SINGLE_PARAMETER,{
        variables: { name:props.name}
    });

    const initParams = (params:string[]) => {
        params.forEach(function (element) {
            materialParams[element]=""
        }); 
    }
    const selectedColor = (id:string,color:string) =>{
        materialParams[id]=color
        console.log(id,color,d1?.singleMaterialParams.diffuse)
    }

    const [updateMaterial] = useMutation(UPDATE_MATERIAL_QUERY, {
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
         <Box>
                <br></br>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <TextField id="outlined-name" label="Name" value={props.name} onChange={e=>setName(e.target.value)}/>
                    </Grid>
                    <Grid item xs={6}>
                    <TextField id="outlined-name" label="NewName" value={updateName} onChange={e=>setNewName(e.target.value)}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined-name" label="Description UL"  value={props.desc} onChange={e=>setDescription(e.target.value)}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Select  value={props.mMat} onChange={e=>setMetaMaterial(e.target.value)} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                            <MenuItem value=""><em>Meta-Material List</em></MenuItem>
                                {data && data?.metaMaterials.map((metaMaterial,i) => (
                            <MenuItem key={i} value={metaMaterial.name}>{metaMaterial.name}</MenuItem>
                        ))}
                        </Select>
                    </Grid>
                    <Grid item xs={2}>
                      <ListItemText primary="Ambient" />
                        <SketchExample id="ambient" baseColor='C4C41C' onSelectColor={selectedColor }/>
                    </Grid>
                    <Grid item xs={2}>
                    <ListItemText primary="Diffuse" />
                        <SketchExample id="diffuse" baseColor='C4C41C' onSelectColor={selectedColor }/>
                    </Grid>
                    <Grid item xs={2}>
                    <ListItemText primary="Emission" />
                        <SketchExample id="emission" baseColor='C4C41C' onSelectColor={selectedColor }/>
                    </Grid>
                    <Grid item xs={2}>
                    <ListItemText primary="Specular" />
                        <SketchExample id="specular" baseColor='C4C41C' onSelectColor={selectedColor }/>
                    </Grid>       
               </Grid>
            </Box>
         </DialogContent>
         <DialogActions>
         <Button variant="contained" onClick={handleClose}>Cancel</Button>
         <Button variant="contained" onClick={() => props.name && updateName && props.desc && props.mMat && updateMaterial() && window.location.reload() }>Update</Button>
         </DialogActions>
     </Dialog>
        </div>

    )   
}