import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";

import { QueryResults } from "./QueryResults";

import QUERIES from "../stubs/queries.json";

export const QuerySelector = () => {
  const [queryId, setQueryId] = useState("");
  const [queryResults, setQueryResults] = useState([]);

  const handleQueryChange = (queryIndex) => {
    setQueryId(queryIndex);
  };

  const handleQuerySubmit = async (event) => {
    event.preventDefault();
    const queryObj = QUERIES[queryId];
    const data = (await import(`../stubs/data/${queryObj.tableName}.json`))
      .default;
    setQueryResults(data);
  };

  console.log(queryId, QUERIES, QUERIES[queryId]);
  const currentQuery = queryId
    ? queryId === "default"
      ? { queryId: "default", queryString: "example query" }
      : QUERIES[queryId]
    : {};

  return (
    <div className="query-selector">
      <div className="query-input">
        <DropdownButton
          id="dropdown-basic-button"
          title="Dropdown button"
          className="w-100"
        >
          {QUERIES.map(({ queryId, queryString }, index) => (
            <Dropdown.Item
              key={queryId}
              onClick={() => handleQueryChange(index)}
            >
              {queryString}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <form onSubmit={handleQuerySubmit}>
          <textarea
            className="form-control d-block"
            onChange={handleQueryChange}
            value={currentQuery.queryString}
          />
          <Button variant="primary" type="submit">
            Run Query
          </Button>
        </form>
        <QueryResults results={queryResults} />
      </div>
    </div>
  );
};
