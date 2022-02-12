import { useQuery, gql } from '@apollo/client';
import Table from './Table';

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
        <> 
          <Table title="Materials" row={data?.materials} col={columns}/>
        </>
    )
}