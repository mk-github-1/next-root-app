"use client";

/**************************************************
 * AppInitializer: 一部importのプリロードで高速化 + AG Grid ModuleRegistry
 *
 *
 **************************************************/

// Next.js、React
import { JSX, useEffect, useRef } from "react";

// MUI
// import { Autocomplete, Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, Modal, TextField, Typography, Snackbar, SnackbarContent, Backdrop, CircularProgress } from "@mui/material";
/*
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
 */
// MUI (message, loading)
/*
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
 */

// MUI for DatePicker ※明らかに重い
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// MUI icon materials
/*
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
*/

// React Hook Form
// import { useForm, Controller } from "react-hook-form";

// AG Grid ※明らかに重い
import { AgGridReact } from "ag-grid-react";
// Community版
import { ModuleRegistry, ClientSideRowModelModule, /* GridApi */ RowDragModule } from "ag-grid-community";
/* ValidationModule, MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule, SetFilterModule, NumberFilterModule, TextFilterModule, StatusBarModule, SideBarModule, ClipboardModule, CsvExportModule */
// Enterprise版
// import { ExcelExportModule, MasterDetailModule, ServerSideRowModelModule, InfiniteRowModelModule, ViewportRowModelModule, RowGroupingModule, PivotModule, ChartsModule, SparklinesModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([
  // Community版
  ClientSideRowModelModule,
  RowDragModule
  // ValidationModule, MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule, SetFilterModule, NumberFilterModule, TextFilterModule, StatusBarModule, SideBarModule, ClipboardModule, CsvExportModule,
  // Enterprise版
  // ExcelExportModule, MasterDetailModule, ServerSideRowModelModule, InfiniteRowModelModule, ViewportRowModelModule, RowGroupingModule, PivotModule, ChartsModule, SparklinesModule
]);

// Chart.js
// ここにChart.jsのプリロードしたいものを記載

export const AppInitializer = (): JSX.Element => {
  const isInitialized = useRef(false);

  // dummy
  // const { control } = useForm();

  useEffect(() => {
    if (!isInitialized.current) {
      ModuleRegistry.registerModules([ClientSideRowModelModule, RowDragModule]);
      isInitialized.current = true;
    }
  }, []);

  /**************************************************
   * return JSX.Element: dummy 描画
   *
   **************************************************/
  return (
    <div style={{ display: "none" }}>
      {/*
      <Autocomplete options={[]} renderInput={(params) => <TextField {...params} />} value={null} onChange={() => {}} />
      <Box></Box>
      <Button></Button>
      <Checkbox></Checkbox>
      <FormControl></FormControl>
      <FormControlLabel control={<Checkbox checked={false} onChange={() => {}} />} label="Dummy" />
      <InputLabel></InputLabel>

      <Modal open={false} onClose={() => {}}>
        <></>
      </Modal>

      <Typography></Typography>

      <Snackbar open={false} />
      <SnackbarContent />

      <Backdrop open={false}>
        <CircularProgress />
      </Backdrop>
      */}

      {/*
      <ClearIcon />
      <KeyboardDoubleArrowLeftIcon />
      <KeyboardDoubleArrowRightIcon />
      */}

      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DatePicker value={null} onChange={() => {}} />
      </LocalizationProvider>

      {/*
      <Controller name="dummy" control={control} render={() => <div />} defaultValue="" />
      */}

      <AgGridReact rowData={[]} columnDefs={[]} />
    </div>
  );
};
