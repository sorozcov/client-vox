
import { Table } from "react-bootstrap"

export default function TableStriped({headers,data}){
    return(
        <Table striped bordered>
        <thead>
          <tr>
            {headers.map(header=>(<th key={header}>{header}</th>))}
          </tr>
        </thead>
        <tbody>
          {data.map(row=>(<tr key={row.AccommodationId}>
            {headers.map(header=>(<td key={`${row.AccommodationId}${header}`}>{row[header]}</td>))}
          </tr>))}
        </tbody>
      </Table>
    )
}