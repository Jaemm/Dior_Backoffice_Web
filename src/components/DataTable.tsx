import {
  Button,
  Checkbox,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  CloudDownload,
  Refresh,
  ExpandLess,
  ExpandMore,
  UnfoldMore,
} from '@material-ui/icons';
import {
  DateRangeDelimiter,
  DesktopDateRangePicker,
} from '@material-ui/pickers';
import { useDebounce } from 'ahooks';
import { format } from 'date-fns';
import React, { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DateParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params';
import { useHttpResource } from '../api/API';
import { AppTableFooter } from './AppTableFooter';
import ExportToCSV from './ExportToCSV';
import { TableWrapper } from './TableWrapper';

interface DataTableProps<T> {
  resource_url: string;
  params?: Record<string, unknown>;
  columns: Array<{
    label: string;
    key?: keyof T;
    content?: (r: T) => ReactNode;
    hide?: boolean;
  }>;
  dataIndex?: keyof T;
  toolbar?: {
    search?: boolean;
    pagination?: boolean;
    filter?: boolean;
    filter_by_date?: boolean;
    export?: boolean;
  };
  toolbarButtons?: any;
  reloadNow?: any;
  setReloadNow?: any;
  setSelectedRowIdsFromParent?: any;
  pageSize?: number;
  filters?: Array<{ key: string; label: string }>;
  shouldFetch?: boolean;
  export_url?: string;
  disableCheckbox?: boolean;
  normalize?: (resource: T[] | undefined) => T[] | undefined;
  headers?: any;
}

export function DataTable<T>(props: DataTableProps<T>) {
  const { t } = useTranslation();

  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [filterHeader, setFilterHeader] = useState({ column: '', order: '' });

  // console.log('Data table props', props?.pageSize);
  let defaultParamsFilterBy: any = props?.params?.filter_by
    ? props?.params?.filter_by
    : '-id';
  const [query, setQuery] = useQueryParams({
    filter_by: withDefault(StringParam, defaultParamsFilterBy),
    ...(props.toolbar?.search
      ? {
          search: withDefault(StringParam, ''),
        }
      : {}),
    ...(props.toolbar?.pagination
      ? {
          page: NumberParam,
          limit: NumberParam,
        }
      : {}),
    // ...(props.toolbar?.filter
    //   ? {
    //       filter_by: withDefault(StringParam, "all"),
    //     }
    //   : {}),
    ...(props.toolbar?.filter_by_date
      ? {
          from: withDefault(DateParam, null),
          to: withDefault(DateParam, null),
        }
      : {}),
  });

  const debouncedSearchValue = useDebounce(query.search, { wait: 500 });

  const results = useHttpResource(
    props.resource_url,
    {
      ...props.params,
      ...(props.toolbar?.search
        ? {
            search: debouncedSearchValue,
          }
        : {}),
      ...(props.toolbar?.pagination
        ? {
            page: query.page,
            limit: query.limit || 20,
          }
        : {}),
      ...(props.toolbar?.filter
        ? {
            filter_by: query.filter_by,
          }
        : {}),
      ...(props.toolbar?.filter_by_date
        ? {
            from: query.from ? format(query.from, 'yyyyMMdd') : undefined,
            to: query.to ? format(query.to, 'yyyyMMdd') : undefined,
          }
        : {}),
    },
    {
      shouldFetch:
        typeof props.shouldFetch === 'boolean' ? props.shouldFetch : true,
      pagination: props.toolbar?.pagination,
    }
  );
  // console.log('Total', results);

  const total = results.data?.total_size || 0;
  const exportData = results?.data?.data;
  const pageSize = query.limit || props.pageSize || 20;

  if(props.reloadNow){
    results.revalidate();
    props.setReloadNow(false)
  }
  
  const onChangeHeaderFilter = (key: string) => {
    if (key === filterHeader.column) {
      const newOrder = filterHeader.order === 'asc' ? 'desc' : 'asc';
      setFilterHeader({
        column: key as string,
        order: newOrder,
      });
      setQuery({
        filter_by: `${newOrder === 'desc' ? '-' : ''}${key}`,
      });
    } else {
      setFilterHeader({
        column: key as string,
        order: 'asc',
      });
      setQuery({ filter_by: `${key}` });
    }
  };

  return (
    <>
      <Grid container direction="column" spacing={2} wrap="nowrap">
        <Grid item container spacing={2} alignItems="center">
          <Grid item container sm spacing={2} alignItems="center">
            {props.toolbar?.search && (
              <Grid item md={3}>
                <TextField
                  label={t('datatable.search')}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={query.search}
                  onChange={(e) => {
                    setQuery({ search: e.target.value });
                  }}
                />
              </Grid>
            )}

            {props.toolbar?.filter_by_date && (
              <Grid item md={6}>
                <DesktopDateRangePicker
                  clearable
                  startText={t('date_picker.start')}
                  endText={t('date_picker.end')}
                  value={[query.from, query.to]}
                  onChange={([from, to]) => {
                    setQuery({ from, to });
                  }}
                  renderInput={(startProps, endProps) => (
                    <>
                      <TextField
                        size="small"
                        fullWidth
                        {...startProps}
                        helperText=""
                      />
                      <DateRangeDelimiter>
                        {' '}
                        {t('date_picker.to')}{' '}
                      </DateRangeDelimiter>
                      <TextField
                        size="small"
                        fullWidth
                        {...endProps}
                        helperText=""
                      />
                    </>
                  )}
                />
              </Grid>
            )}

            {props.toolbar?.filter && (
              <Grid item md={3}>
                <TextField
                  label={t('datatable.filter_by')}
                  select
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={query.filter_by}
                  onChange={(e) => {
                    setQuery({ filter_by: e.target.value });
                  }}
                >
                  {props.filters?.map(({ label, key }) => (
                    <MenuItem key={key} value={key}>
                      {label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}

            {(props.toolbar?.filter ||
              props.toolbar?.filter_by_date ||
              props.toolbar?.search) && (
              <Grid item md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setQuery({
                      ...(props.toolbar?.search
                        ? {
                            search: '',
                          }
                        : {}),
                      ...(props.toolbar?.filter
                        ? {
                            filter_by: '-id',
                          }
                        : {}),
                      ...(props.toolbar?.filter_by_date
                        ? {
                            from: null,
                            to: null,
                          }
                        : {}),
                    });
                  }}
                >
                  {' '}
                  {t('datatable.reset')}
                </Button>
              </Grid>
            )}
          </Grid>

          {/* {props.toolbar?.export && (
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    onClick={() => {
                      results.revalidate();
                    }}
                    disabled={results.isValidating}
                    variant="contained"
                    color="primary"
                    startIcon={<Refresh />}
                  >
                    {t('datatable.refresh')}
                  </Button>
                </Grid>
                <ExportToCSV data={exportData} headers={props?.headers} />
                
              </Grid>
            </Grid>
          )} */}
          {props.toolbarButtons && (props.toolbarButtons)}
        </Grid>

        <Grid item xs>
          <TableWrapper
            style={{
              maxHeight: '100%',
              overflow: 'hidden',
              overflowX: 'initial',
              position: 'relative',
            }}
            isLoading={results.isValidating}
          >
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  {!props.disableCheckbox && (
                    <TableCell>
                      <Checkbox
                        color="primary"
                        indeterminate={
                          selectedRowIds?.length > 0 &&
                          selectedRowIds?.length !== results.data?.data?.length
                        }
                        checked={
                          selectedRowIds?.length ===
                            results.data?.data?.length &&
                          selectedRowIds?.length > 0
                        }
                        onChange={(_, checked) => {
                          if (checked) {
                            const rowIds = results.data?.data?.map(
                              (r) => r[props.dataIndex as string] as string
                            ) || []
                            console.log('rowIds', rowIds)
                            setSelectedRowIds(rowIds);
                            if(props.setSelectedRowIdsFromParent){
                              props.setSelectedRowIdsFromParent(rowIds)
                            }
                          } else {
                            setSelectedRowIds([]);
                            if(props.setSelectedRowIdsFromParent){
                              props.setSelectedRowIdsFromParent([])
                            }
                          }
                        }}
                      />
                    </TableCell>
                  )}
                  {props.columns.map(
                    ({ label, key, hide }) =>
                      !hide && (
                        <TableCell key={key as string}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              cursor: 'pointer',
                            }}
                            onClick={(e) => {
                              onChangeHeaderFilter(key as string);
                            }}
                          >
                            {label}
                            {filterHeader.column !== key && (
                              <div
                                style={{
                                  marginLeft: 10 + 'px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                }}
                              >
                                <UnfoldMore
                                  color="disabled"
                                  fontSize={'small'}
                                />
                              </div>
                            )}
                            {filterHeader.column === key &&
                              filterHeader.order === 'asc' && (
                                <ExpandLess fontSize={'small'} />
                              )}
                            {filterHeader.column === key &&
                              filterHeader.order === 'desc' && (
                                <ExpandMore fontSize={'small'} />
                              )}
                          </div>
                        </TableCell>
                      )
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {results.data?.total_size === 0 && (
                  <TableRow>
                    <TableCell colSpan={12} size="medium">
                      <Typography align="center" color="textSecondary">
                        {t('no_data')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}

                {!results.data ? (
                  <TableRow>
                    <TableCell colSpan={12} size="medium">
                      <Typography align="center" color="textSecondary">
                        {t('loading')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  (props.normalize
                    ? (props.normalize(results.data?.data as T[]) as Array<
                        Record<string, unknown>
                      >)
                    : results.data?.data
                  )?.map((record, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <TableRow key={idx}>
                      {!props.disableCheckbox && (
                        <TableCell>
                          <Checkbox
                            color="primary"
                            checked={selectedRowIds?.includes(
                              record[props.dataIndex as string] as string
                            )}
                            onChange={(_, checked) => {
                              if (checked) {
                                const rowIds = [
                                  ...(selectedRowIds || []),
                                  record[props.dataIndex as string] as string,
                                ]
                                setSelectedRowIds(rowIds);
                                if(props.setSelectedRowIdsFromParent){
                                  props.setSelectedRowIdsFromParent(rowIds)
                                }
                              } else {
                                const rowIds = selectedRowIds?.filter(
                                  (r) =>
                                    r !== record[props.dataIndex as string]
                                )
                                setSelectedRowIds(rowIds);
                                if(props.setSelectedRowIdsFromParent){
                                  props.setSelectedRowIdsFromParent(rowIds)
                                }
                              }
                            }}
                          />
                        </TableCell>
                      )}
                      {props.columns.map(
                        ({ key, content, hide }, index) =>
                          !hide && (
                            <TableCell key={(key as string) || index}>
                              {content
                                ? content?.(record as T)
                                : (record[key as string] as ReactNode)}
                            </TableCell>
                          )
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>

              {props.toolbar?.pagination && (
                <AppTableFooter
                  total={total}
                  page={query.page || 1}
                  pageSize={pageSize}
                  colSpan={props.columns.length + 2}
                  onChangePage={(page) => {
                    setQuery({ page });
                  }}
                  onChangeRowsPerPage={(rowsPerPage) => {
                    setQuery({ limit: rowsPerPage, page: 1 });
                  }}
                />
              )}
            </Table>
          </TableWrapper>
        </Grid>
      </Grid>
    </>
  );
}
