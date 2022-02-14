import React from "react";
import MetaMaterialsTable from './MetaMaterials';
import MaterialsTable from './Materials';
import AddMaterial from './AddMaterial';
import DeleteMaterial from './DeleteMaterial';
import EditMaterial from './DeleteMaterial';
import Stack from '@mui/material/Stack';



export function Home (){
    return (
        <>
        </>
    )
}

export function Materials (){
    return (
        <>
            <MaterialsTable/>
        </>
 
  
    )
}

export function MetaMaterials (){
    return (
        <>
            <MetaMaterialsTable/>
        </>
    )
}