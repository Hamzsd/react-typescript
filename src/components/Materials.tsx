import React from "react";
import ReactDOM from "react-dom";
import { useQuery, gql } from '@apollo/client';
import Table from './Table';
import AddMaterial from './AddMaterial';
import Try from './Try';
import DeleteMaterial from './DeleteMaterial';
import EditMaterial from './EditMaterial';

import Stack from '@mui/material/Stack';
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTable from "react-data-table-component";
import Select from '@mui/material/Select';


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

  const [selectedData, setSelectedData] = React.useState<material[]>([]);
  const handleChange = (state) => {
    setSelectedData(state.selectedRows);
  };

  var matName: string[] = [];
  var editMat: material = {name:"",description:"",metaMaterial:""};
  selectedData.forEach(function (mats) {
    matName.push(mats.name)
    editMat = mats
  }); 

  const { loading, data } =  useQuery<listMaterials>(MATERIAL_QUERY);
  if (loading) return <p>Loading...</p>;
    return (
        <div>
        <Stack direction="row" spacing={1} justifyContent="right">
            <AddMaterial/>
            <EditMaterial name={editMat.name} desc={editMat.description} mMat={editMat.metaMaterial}/>
            <DeleteMaterial id={matName}/>
        </Stack>
        <br></br>
        <div className="row">
          {/* <Table title="Materials" row={data?.materials} col={columns}/> */}
          <Card>
            <DataTable
              title="Materials"
              columns={columns}
              data={data?.materials}
              theme="dark"
              defaultSortField="Name"
              sortIcon={<SortIcon />}
              pagination
              selectableRows
              pointerOnHover
              highlightOnHover
              responsive
              onSelectedRowsChange={handleChange}
            />
          </Card>
        </div>
    </div>
    )
}