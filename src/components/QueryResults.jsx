import Table from "react-bootstrap/Table";

export const QueryResults = ({ results = [] }) => {
  if (results.length === 0) return "";
  const renderTableHeader = () => (
    <tr>
      {Object.keys(results[0]).map((columnName) => (
        <th>{columnName}</th>
      ))}
    </tr>
  );
  const renderTableBody = () => {
    return (
      <tbody>
        {results.slice(1, 5).map((tuple) => {
          return (
            <tr key={`row-${tuple}`}>
              {Object.values(tuple).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <Table responsive bordered size="sm">
      {renderTableHeader()}
      {renderTableBody()}
    </Table>
  );
};
