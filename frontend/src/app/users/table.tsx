"use client";

// React、MUI
import { JSX } from "react";
// import styles from "./page.module.css";

// AG Grid
import { AgGridReact } from "ag-grid-react";
// import type { GridApi } from "ag-grid-community";
import { ColDef, GridOptions, ModuleRegistry, ClientSideRowModelModule, RowDragModule, ValidationModule, RowDoubleClickedEvent } from "ag-grid-community";
/* , MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule, SetFilterModule, NumberFilterModule, TextFilterModule, StatusBarModule, SideBarModule, ClipboardModule, CsvExportModule */
// import { ExcelExportModule, MasterDetailModule, ServerSideRowModelModule, InfiniteRowModelModule, ViewportRowModelModule, RowGroupingModule, PivotModule, ChartsModule, SparklinesModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([
  // Community版
  ClientSideRowModelModule,
  RowDragModule,
  // MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule, SetFilterModule, NumberFilterModule, TextFilterModule, StatusBarModule, SideBarModule, ClipboardModule, CsvExportModule,
  ValidationModule
  // Enterprise版
  // ExcelExportModule, MasterDetailModule, ServerSideRowModelModule, InfiniteRowModelModule, ViewportRowModelModule, RowGroupingModule, PivotModule, ChartsModule, SparklinesModule
]);

// Luxon
import { DateTime } from "luxon";

// Data
import { User } from "@/types/User";

// IProps
interface IProps {
  rowData: User[];
  onRowDoubleClick: (event: RowDoubleClickedEvent<User>) => void;
}

// Organisms
export const Table = (props: IProps): JSX.Element => {
  /**************************************************
   * Props
   *
   **************************************************/

  const { rowData, onRowDoubleClick }: IProps = props;

  // Ag Grid: gridApi参照 (必要時)
  // const gridApi = useRef<GridApi | null>(null);

  /**************************************************
   * AG Grid設定
   *
   **************************************************/

  // Ag Grid: Column定義
  const columnDefs: ColDef[] = [
    { rowDrag: true, field: "RowDrag", headerName: "", /* valueGetter: () => { return ""; }, */ /* editable: false, */ width: 40, pinned: "left" },
    { field: "account", headerName: "アカウント名", /* colId: "account", */ width: 140, pinned: "left" },
    { field: "username", headerName: "ユーザー名", width: 140 },
    { field: "age", headerName: "年齢", width: 70 },
    {
      field: "hobby",
      headerName: "趣味",
      width: 100,
      valueFormatter: (params): string => {
        // リストは実際はbackendや定数から取得
        const hobbies: Record<string, string>[] = [
          { code: "", label: "選択してください" },
          { code: "music", label: "音楽" },
          { code: "sports", label: "スポーツ" },
          { code: "reading", label: "読書" },
          { code: "travel", label: "旅行" }
        ];

        const match = hobbies.find((h) => h.code === params.value);
        return match ? match.label : "";
      }
    },
    {
      field: "applyDate",
      headerName: "適用日",
      width: 120,
      valueFormatter: (params): string => {
        /*
        if (!params.value) return "";
        const datetime = parseISO(params.value);
        return isValid(datetime) ? format(datetime, "yyyy/MM/dd") : "";
        */
        if (!params.value) return "";
        const datetime = DateTime.fromISO(params.value);
        return datetime.isValid ? datetime.toFormat("yyyy/MM/dd") : "";
      }
    },
    { field: "isEnabled", headerName: "有効フラグ", width: 110 },
    { field: "remarks", headerName: "備考", width: 140 },
    { field: "isDeleted", headerName: "IsDeleted", hide: true },
    { field: "sortOrder", headerName: "順序", width: 70 },
    { field: "createdAt", headerName: "CreatedAt", hide: true },
    {
      field: "updatedAt",
      headerName: "更新日時",
      width: 160,
      valueFormatter: (params): string => {
        if (!params.value) return "";
        const datetime = DateTime.fromISO(params.value);
        return datetime.isValid ? datetime.toFormat("yyyy/MM/dd HH:mm:ss") : "";
      }
    },
    { field: "createdBy", headerName: "CreatedBy", hide: true },
    { field: "updatedBy", headerName: "UpdatedBy", hide: true }
  ];

  // Ag Grid: GridOptions
  const gridOptions: GridOptions = {
    columnDefs: columnDefs,
    rowDragManaged: true,
    onRowDoubleClicked: onRowDoubleClick
  };

  /**************************************************
   * return JSX.Element
   *
   **************************************************/

  return (
    <>
      {/* AgGridReactを利用、gridOptions と rowData を渡す */}
      <AgGridReact gridOptions={gridOptions} rowData={rowData} />
    </>
  );
};
