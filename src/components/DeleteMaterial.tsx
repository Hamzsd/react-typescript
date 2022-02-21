import React ,{ useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery, useMutation, gql } from '@apollo/client';



const DELETE_MATERIAL_QUERY = gql `
mutation delMat($name:[String!]!) {
  deleteMaterial(name:$name)
}`;

export default function DeleteMaterial(props:{id:string[]}){
    const [delMaterial] = useMutation(DELETE_MATERIAL_QUERY, {
        variables: { name:props.id }
      });
    return (
        <div>
            <Button variant="contained" color="error" size="small" onClick={() => props.id && delMaterial() && window.location.reload()}>
                <DeleteIcon/>
            </Button>
        </div>
    )   
}