
import DataTable from "react-data-table-component";
import React from "react";

import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";

interface material {
  name: string;
  description: string;
  metaMaterial: string;
}


export default function Table(props:{title?: string, row?:any[], col?:any[]}) {

  return (
    <div>
      <Card>
        <DataTable
          title={props.title}
          columns={props.col}
          data={props.row}
          defaultSortField="title"
          sortIcon={<SortIcon />}
          pagination
          selectableRows
        />
      </Card>
    </div>
  );
}

