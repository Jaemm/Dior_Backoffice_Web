import {
  Box,
  IconButton,
  TableFooter,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface AppTablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

export function AppTablePaginationActions(
  props: AppTablePaginationActionsProps
) {
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box display="flex">
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPage />
      </IconButton>
    </Box>
  );
}

interface AppTableFooterProps {
  total: number;
  pageSize: number;
  colSpan: number;
  page: number;
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (pageSize: number) => void;
}

export function AppTableFooter({
  total,
  pageSize,
  colSpan,
  page,
  onChangePage,
  onChangeRowsPerPage,
}: AppTableFooterProps) {
  const { t } = useTranslation();

  if (total <= pageSize) {
    return null;
  }

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30, 40]}
          colSpan={colSpan}
          count={total}
          rowsPerPage={pageSize}
          page={page - 1}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          onChangePage={(_, p) => {
            onChangePage(p + 1);
          }}
          onChangeRowsPerPage={(event) => {
            onChangeRowsPerPage(parseInt(event.target.value, 10));
          }}
          labelRowsPerPage={t('pagination.rows_per_page')}
          ActionsComponent={AppTablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
}
