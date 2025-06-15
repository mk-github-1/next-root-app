"use client";

/**************************************************
 * AppInitializer: 一部importのプリロードで高速化 + AG Grid ModuleRegistry
 *
 *
 **************************************************/

// Next.js、React
import { JSX } from "react";

// MUI
import { Autocomplete, Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, Modal, TextField, Typography, Snackbar, SnackbarContent, Backdrop, CircularProgress } from "@mui/material";

// MUI for DatePicker
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

// MUI icon materials ※アイコンは重いため個別import
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

// AG Grid
import { AgGridReact } from "ag-grid-react";
// Community版
import { ModuleRegistry, ClientSideRowModelModule, RowDragModule } from "ag-grid-community";
/* ValidationModule, MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule, SetFilterModule, NumberFilterModule, TextFilterModule, StatusBarModule, SideBarModule, ClipboardModule, CsvExportModule */
// Enterprise版
// import { ExcelExportModule, MasterDetailModule, ServerSideRowModelModule, InfiniteRowModelModule, ViewportRowModelModule, RowGroupingModule, PivotModule, ChartsModule, SparklinesModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowDragModule
  // Community版: ValidationModule, MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule, SetFilterModule, NumberFilterModule, TextFilterModule, StatusBarModule, SideBarModule, ClipboardModule, CsvExportModule,
  // Enterprise版: ExcelExportModule, MasterDetailModule, ServerSideRowModelModule, InfiniteRowModelModule, ViewportRowModelModule, RowGroupingModule, PivotModule, ChartsModule, SparklinesModule
]);

// Chart.js
// ここにChart.jsのプリロードしたいものを記載

export const AppInitializer = (): JSX.Element => {
  /**************************************************
   * return JSX.Element: dummy 描画
   *
   **************************************************/
  return (
    <div style={{ display: "none" }}>
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

      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DatePicker value={null} onChange={() => {}} />
      </LocalizationProvider>

      <ClearIcon />
      <KeyboardDoubleArrowLeftIcon />
      <KeyboardDoubleArrowRightIcon />

      <AgGridReact rowData={[]} columnDefs={[]} />
    </div>
  );
};
