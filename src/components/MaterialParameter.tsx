import React from "react";
import { useQuery, gql } from '@apollo/client';
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTable from "react-data-table-component";
const columns = [
    {
        name: "Name",
        selector: "name",
        sortable: true,
        center: true,
    
     
    },
    {
        name: "Ambient",
        selector: "ambient",
        sortable: true,
        center: true
    },
    {
        name: "Diffuse",
         selector: "diffuse",
        sortable: true,
        center: true
    },
    {
        name: "Specular",
        selector: "specular",
        sortable: true,
        center: true
    },
    {
        name: "Emission",
        selector: "emissive",
        sortable: true,
        center: true
    },
    {
        name: "Shininess",
        selector: "shininess",
        sortable: true,
        center: true
    },
    {
        name: "Transparency",
        selector: "transparency",
        sortable: true,
        center: true
    },
    {
        name: "Texture",
        selector: "texture",
        sortable: true,
        center: true
    },
    {
        name: "Mapping",
        selector: "mapping",
        sortable: true,
        center: true
    },
];

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


export default function MaterialParams(){

  const [selectedData, setSelectedData] = React.useState<parameter[]>([]);
  const handleChange = (state) => {
    setSelectedData(state.selectedRows);
  };

  const { loading, data } =  useQuery<listParameters>(PARAMETERS_QUERY);
  if (loading) return <p>Loading...</p>;
// const { loading, data } =  useQuery<listParameters>(SINGLE_PARAMETER,{
//     variables: { name:"Brass"}
// });
    return (
        <div className="row">
          <Card>
            <DataTable
              title="Material Parameters"
              columns={columns}
              data={data?.materialParams}
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
    )
}