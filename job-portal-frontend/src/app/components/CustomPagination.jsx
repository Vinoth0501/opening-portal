import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const CustomPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  data,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Stack spacing={2} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => onPageChange(page)}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default CustomPagination;
