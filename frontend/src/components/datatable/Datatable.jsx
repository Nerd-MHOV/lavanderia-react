import "./datatable.scss"
import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { userColums, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";

const Datatable = () => {
    const [data, setData] = useState(userRows)

    const handleDelete = (id) => {
        setData(data.filter(item=>item.id !== id))
        console.log(data)

    }

    const actionColumn = [{
        field: "action", headerName: "Action", width: 200,
        renderCell: (params) => {
            return (
                <div className="cellAction">
                    <Link to="/users/test" style={{ textDecoration: "none" }}>
                        <div className="viewButton">View</div>
                    </Link>
                    <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</div>
                </div>
            )
        }
    }]
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New User
                <Link to="/users/new" style={{ textDecoration: "none" }} className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                className="datagrid"
                rows={userRows}
                columns={userColums.concat(actionColumn)}
                pageSize={8}
                rowsPerPageOptions={[8]}
                checkboxSelection
            />
        </div>
    )
}

export default Datatable