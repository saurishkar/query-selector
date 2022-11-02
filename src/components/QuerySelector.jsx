import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import QUERIES from "../stubs/queries.json";

export const QuerySelector = () => {
  const [query, setQuery] = useState("");

  const handleQueryChange = (value) => {
    setQuery(value);
  };

  return (
    <div className="query-selector">
      <div className="query-input">
        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
          {QUERIES.map(({ queryId, queryString }) => (
            <Dropdown.Item
              key={queryId}
              onClick={() => handleQueryChange(queryString)}
            >
              {queryString}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <textarea onChange={handleQueryChange} value={query} />
      </div>
    </div>
  );
};
