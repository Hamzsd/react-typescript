import React from "react";
import MetaMaterialsTable from './MetaMaterials';
import MaterialsTable from './Materials';
import AddMaterial from './AddMaterial';
import DeleteMaterial from './DeleteMaterial';
import Stack from '@mui/material/Stack';



export function Home (){
    return (
        <>
        </>
    )
}

export function Materials (){
    return (
        <div>
            <Stack direction="row" spacing={1}   justifyContent="right">
                <AddMaterial/>
                <DeleteMaterial/>
            </Stack>
            <br></br>
            <div className="row">
                <MaterialsTable/>
            </div>
        </div>
    )
}

export function MetaMaterials (){
    return (
        <>
            <MetaMaterialsTable/>
        </>
    )
}