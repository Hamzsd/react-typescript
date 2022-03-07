// import React ,{ useState } from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import ListItemText from '@mui/material/ListItemText';
// import ListItem from '@mui/material/ListItem';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
// import Slide from '@mui/material/Slide';
// import { TransitionProps } from '@mui/material/transitions';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import { useQuery, useMutation, gql } from '@apollo/client';
// import SketchExample from './ColorPicker'
//   import Container from '@mui/material/Container';


// interface metaMaterial {
//   name: string;
// }

// interface listMetaMaterials{
//   metaMaterials: metaMaterial[];
// }

// const META_MATERIAL_QUERY = gql`{
//   metaMaterials {
//    name
//   }
// }`;

// const SAVE_MATERIAL = gql `mutation addMat($name:String!,$desc:String!,$mMat:String!) {
//   addMaterial(name:$name,desc:$desc,mMat:$mMat)
// }`;

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement;
//   },
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// export default function FullScreenDialog() {
//   const [name, setName] = useState('');
//   const [desc, setDescription] = useState('');
//   const [mMat, setMetaMaterial] = useState('');
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const selectedColor = (id,color) =>{
//     console.log(id,color)
//   }



//   const [saveMaterial, { error, data:data1 }] = useMutation(SAVE_MATERIAL, {
//     variables: { name:name,desc:desc,mMat:mMat }
//   });
//   const { loading, data } =  useQuery<listMetaMaterials>(META_MATERIAL_QUERY);
//   if (loading) return <p>Loading...</p>;


//   return (
//     <div>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open full-screen dialog
//       </Button>
//       <Dialog
//         fullScreen
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Transition}
//       >
//         <AppBar sx={{ position: 'relative' }}>
//           <Toolbar>
//             <IconButton
//               edge="start"
//               color="inherit"
//               onClick={handleClose}
//               aria-label="close"
//             >
//             <CloseIcon />
//             </IconButton>
//             <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//               Add Material
//             </Typography>
//             <Button autoFocus color="inherit" onClick={handleClose}>
//               save
//             </Button>
//           </Toolbar>
//         </AppBar>
//         <List dense>
//           <ListItem >
//           <ListItemText primary="Material Name" />
//             <TextField
//               id="outlined-name"
//               label="Name"
//               value={name}
//               onChange={e=>setName(e.target.value)}
//             />
//           </ListItem>
//           <Divider />
//           <ListItem>
//           <ListItemText primary="Description" />
//             <TextField
//               id="outlined-name"
//               label="Description"
//               value={desc}
//               onChange={e=>setDescription(e.target.value)}
//             />
//           </ListItem>
//           <Divider /> 
//           <ListItem>
//           <ListItemText primary="Material Name" />
//             <Select
//               value={mMat}
//               onChange={e=>setMetaMaterial(e.target.value)}
//               displayEmpty
//               inputProps={{ 'aria-label': 'Without label' }}
//               >
//               <MenuItem value=""><em>Meta-Material List</em></MenuItem>
//               {data && data?.metaMaterials.map((metaMaterial,i) => (
//               <MenuItem key={i} value={metaMaterial.name}>{metaMaterial.name}</MenuItem>
//               ))}
//             </Select>
//           </ListItem>
//           <Divider /> 
//           <ListItem>
//             <Container maxWidth="sm">
//               <ListItemText primary="Ambient" />
//                 <SketchExample id="ambient" baseColor="A17575" onSelectColor={selectedColor }/>
//               <ListItemText primary="Diffuse" />
//                 <SketchExample id="diffuse" baseColor="000000" onSelectColor={selectedColor }/>
//               <ListItemText primary="Emission" />
//                 <SketchExample id="emission" baseColor=" " onSelectColor={selectedColor }/>
//               <ListItemText primary="Specular" />
//                 <SketchExample id="Specular" baseColor="000000" onSelectColor={selectedColor }/>
//             </Container>
//           </ListItem>
//         </List>
//       </Dialog>
//     </div>
//   );
// }
