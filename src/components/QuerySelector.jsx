import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";

import { QueryResults } from "./QueryResults";
import { Paginate } from "./Paginate";

import QUERIES from "../stubs/queries.json";

export const QuerySelector = () => {
  const [selectedQueryIndex, setSelectedQueryIndex] = useState();
  const [customQuery, setCustomQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);

  const handleQuerySelection = (queryIndex) => {
    setSelectedQueryIndex(queryIndex);
    setCustomQuery(QUERIES[queryIndex].queryString);
  };

  const handleQueryChange = (event) => {
    const { value = "" } = event.target;
    setSelectedQueryIndex(-1);
    setCustomQuery(value);
  };

  const handleQuerySubmit = async (event) => {
    event.preventDefault();
    let tableName = "categories";
    if (selectedQueryIndex > -1) {
      const queryObj = QUERIES[selectedQueryIndex];
      tableName = queryObj.tableName;
    }
    const data = (await import(`../stubs/data/${tableName}.json`)).default;
    setQueryResults(data);
  };

  const header = queryResults[0];
  const records = queryResults.slice(1);

  return (
    <div className="query-selector">
      <div className="query-input m-5">
        <form onSubmit={handleQuerySubmit}>
          <DropdownButton
            id="dropdown-basic-button"
            title="Select from a list of predefined queries"
            className="d-block"
          >
            {QUERIES.map(({ queryId, queryString }, index) => (
              <Dropdown.Item
                key={queryId}
                onClick={() => handleQuerySelection(index)}
              >
                {queryString}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <h5 className="my-3">Or</h5>
          <textarea
            placeholder="Type in your custom query"
            className="form-control d-block"
            onChange={handleQueryChange}
            value={customQuery}
          />
          <Button variant="success" type="submit" className="mt-2 float-right">
            Submit
          </Button>
        </form>

        {queryResults.length > 0 && (
          <Paginate size={queryResults.length - 1}>
            {(startIndex, endIndex) => (
              <QueryResults
                results={records.slice(startIndex, endIndex)}
                header={header}
              />
            )}
          </Paginate>
        )}
      </div>
    </div>
  );
};
