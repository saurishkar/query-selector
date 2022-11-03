import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import range from "lodash/range";

const RECORDS_PER_PAGE = 5;

export const Paginate = ({ size = 0, children }) => {
  const [recordsPerPage, setRecordsPerPage] = useState(RECORDS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(size / recordsPerPage);
  const startIndex = currentPage <= 1 ? 0 : (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  const onPrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleRecordNumSelection = (value) => {
    setCurrentPage(1);
		setRecordsPerPage(value);
  };

	useEffect(() => {
		setCurrentPage(1);
	}, [size]);

  return (
    <div className="mt-5">
      <DropdownButton
        id="pagination-button"
        title={`Rows per page = ${recordsPerPage}`}
        className="float-right"
				variant="outline-secondary"
				size="sm"
      >
        {range(5, 20, 5).map((numOfRecords) => (
          <Dropdown.Item key={numOfRecords} onClick={() => handleRecordNumSelection(numOfRecords)}>
            {numOfRecords}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      {children(startIndex, endIndex)}
      <div className="mt-5">
        <div className="d-flex flex-direction-row justify-content-center align-items-center">
          <Button
            disabled={currentPage === 1}
            className="mx-2"
            onClick={onPrevClick}
						variant="outline-secondary"
						size="sm"
          >
            Previous
          </Button>
          <div>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>{" "}
          </div>
          <Button
            disabled={currentPage === totalPages}
            className="mx-2"
            onClick={onNextClick}
						variant="outline-secondary"
						size="sm"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
