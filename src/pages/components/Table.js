

import 'bootstrap/dist/css/bootstrap.min.css'; 

function Table(props) {
  
  const datahundred = props.data.slice(0,props.data.length * 0.1)
  return (
    <div className="container mt-4">
      <h1>Data Table</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {props.columns.map((col, index) => (
              <th key={index}>{col}</th>  
            ))}
          </tr>
        </thead>
        <tbody>
          {datahundred.length > 0 ? (
            datahundred.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {props.columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col]}</td>  
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={props.columns.length} className="text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.data.length - datahundred.length} rows hidden

    </div>
  );
}

export default Table;