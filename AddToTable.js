import React from "react"
function AddToTable(props) {
    return (
        <tr>
            <th>{props.provinceState}</th>
            <th>{props.confirmed}</th>
            <th>{props.recovery === null ? props.recovery : "Not found in API"}</th>
            <th>{props.deaths}</th>
        </tr>
    )
}
export default AddToTable
