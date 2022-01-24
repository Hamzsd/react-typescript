import React from "react";
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";

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

