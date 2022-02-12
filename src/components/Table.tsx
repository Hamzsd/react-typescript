import React from "react";
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";

export default function Table(props:{title?: string, row?:any[], col?:any[]}) {
  const [selectedData, setSelectedData] = React.useState();
  
    const handleChange = (state) => {
    setSelectedData(state.selectedRows);
    
  };
  
  console.log(selectedData);

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
          onSelectedRowsChange={handleChange}

        />
      </Card>
    </div>
  );
}

