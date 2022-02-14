import React from "react";
import ReactDOM from "react-dom";
import { useQuery, gql } from '@apollo/client';
import Table from './Table';
import AddMaterial from './AddMaterial';
import DeleteMaterial from './DeleteMaterial';
import EditMaterial from './EditMaterial';
import Stack from '@mui/material/Stack';

const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      center: true
    },
    {
      name: "Description UL",
      selector: "description",
      sortable: true,
      center: true
    },
    {
      name: "Meta Material",
      selector: "metaMaterial",
      sortable: true,
      center: true
    },
];

interface material {
    name: string;
    description: string;
    metaMaterial: string;
}

interface listMaterials {
    materials: material[];
}

const MATERIAL_QUERY = gql `
{
  materials {
    name
    description
    metaMaterial
  }
}`;





export default function MaterialsTable(){
    const { loading, data } =  useQuery<listMaterials>(MATERIAL_QUERY);
    if (loading) return <p>Loading...</p>;
    return (
        <div>
        <Stack direction="row" spacing={1}   justifyContent="right">
            <AddMaterial/>
            <EditMaterial/>
            <DeleteMaterial/>
        </Stack>
        <br></br>
        <div className="row">
          <Table title="Materials" row={data?.materials} col={columns}/>
        </div>
    </div>
    )
}