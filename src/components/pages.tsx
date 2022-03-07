import React from "react";
import MetaMaterialsTable from './MetaMaterials';
import MaterialsTable from './Materials';
import MaterialParams from "./MaterialParameter";



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


export function MaterialParameter (){
    return (
        <>
            <MaterialParams/>
        </>
    )
}