import Table from "react-bootstrap/Table";

export const QueryResults = ({ results = [], header }) => {
  if (results.length === 0) return "";

  const renderTableHeader = () => (
    <tr>
      {Object.keys(header).map((columnName) => (
        <th key={columnName}>{columnName}</th>
      ))}
    </tr>
  );
  const renderTableBody = () => {
    return (
      <tbody>
        {results.map((tuple, index) => {
          return (
            <tr key={`row-${index}`}>
              {Object.values(tuple).map((val, colIndex) => (
                <td key={`col-${colIndex}`}>
                  {typeof val === "object" ? JSON.stringify(val) : val}
                </td>
                // Some records in the data have nested objects
                // For the purpose of stub, the nested data has been stringified.
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <>
      <Table responsive bordered className="mt-5" striped>
        <thead>{renderTableHeader()}</thead>
        {renderTableBody()}
      </Table>
    </>
  );
};
