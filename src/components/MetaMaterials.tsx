
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
]

interface metaMaterial {
  name: string;
  description: string;
}

interface listMetaMaterials{
  metaMaterials: metaMaterial[];
}
const META_MATERIAL_QUERY = gql `
{
  metaMaterials {
    name
    description
  }
}`;

export default function MetaMaterialsTable(){
    
    const { loading, data } =  useQuery<listMetaMaterials>(META_MATERIAL_QUERY);
    if (loading) return <p>Loading...</p>;
    console.log(data?.metaMaterials)
    return (
        <> 
        <Table title="Meta Materials" row={data?.metaMaterials} col={columns} />
        </>
    )
}