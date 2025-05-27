"use client";

import { JSX, useRef, useEffect } from "react";
import { User } from "@/types/User";
// import styles from "./page.module.css";

import { DateTime } from "luxon";

// AG Grid
import { AgGridReact } from "ag-grid-react";
import type { GridApi, GridReadyEvent } from "ag-grid-community";
import { ColDef, GridOptions, ModuleRegistry, ClientSideRowModelModule, RowDragModule, ValidationModule, RowDoubleClickedEvent } from "ag-grid-community";
/* , MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule, SetFilterModule, NumberFilterModule, TextFilterModule, StatusBarModule, SideBarModule, ClipboardModule, CsvExportModule */
// import { ExcelExportModule, MasterDetailModule, ServerSideRowModelModule, InfiniteRowModelModule, ViewportRowModelModule, RowGroupingModule, PivotModule, ChartsModule, SparklinesModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([
  // Community版
  ClientSideRowModelModule,
  RowDragModule,
  // MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule, SetFilterModule, NumberFilterModule, TextFilterModule, StatusBarModule, SideBarModule, ClipboardModule, CsvExportModule,
  ValidationModule,
  // Enterprise版
  // ExcelExportModule, MasterDetailModule, ServerSideRowModelModule, InfiniteRowModelModule, ViewportRowModelModule, RowGroupingModule, PivotModule, ChartsModule, SparklinesModule
]);

// IProps
interface IProps {
  rowData: User[];
  isLoading: boolean;
}

// Organisms
export const Table = (props: IProps): JSX.Element => {
  const { rowData, isLoading }: IProps = props;

  // Ag Grid
  const gridApiRef = useRef<GridApi | null>(null);

  const columnDefs: ColDef[] = [
    { rowDrag: true, field: "RowDrag", headerName: "", width: 40 },
    { field: "account", headerName: "アカウント名", width: 140 },
    { field: "username", headerName: "ユーザー名", width: 140 },
    { field: "age", headerName: "年齢", width: 70 },
    {
      field: "hobby",
      headerName: "趣味",
      width: 100,
      valueFormatter: (params) => {
        // リストデータは、実際はテーブルや定数などから取得します
        const hobbies: Record<string, string>[] = [
          { code: "", label: "選択してください" },
          { code: "music", label: "音楽" },
          { code: "sports", label: "スポーツ" },
          { code: "reading", label: "読書" },
          { code: "travel", label: "旅行" },
        ];

        const match = hobbies.find((h) => h.code === params.value);
        return match ? match.label : "";
      },
    },
    {
      field: "registerDate",
      headerName: "登録日",
      width: 120,
      valueFormatter: (params) => {
        if (!params.value) return "";
        const datetime = DateTime.fromISO(params.value);
        return datetime.isValid ? datetime.toFormat("yyyy/MM/dd") : "";
      },
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
      valueFormatter: (params) => {
        if (!params.value) return "";
        const datetime = DateTime.fromISO(params.value);
        return datetime.isValid ? datetime.toFormat("yyyy/MM/dd HH:mm:ss") : "";
      },
    },
    { field: "createdBy", headerName: "CreatedBy", hide: true },
    { field: "updatedBy", headerName: "UpdatedBy", hide: true },
  ];

  const onGridReady = (params: GridReadyEvent) => {
    gridApiRef.current = params.api;
    params.api.setGridOption("loading", isLoading);
  };

  useEffect(() => {
    const api = gridApiRef.current;
    if (!api) return;

    api.setGridOption("loading", isLoading);
  }, [isLoading]);

  const gridOptions: GridOptions = {
    columnDefs: columnDefs,
    rowDragManaged: true,
    loading: isLoading,
  };

  return (
    <>
      <AgGridReact onGridReady={onGridReady} gridOptions={gridOptions} rowData={rowData} />
    </>
  );
};
