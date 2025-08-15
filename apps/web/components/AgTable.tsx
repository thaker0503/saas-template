'use client';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import React, { useMemo, useRef } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

type Props<T> = {
	rowData: T[];
	columnDefs: ColDef<T>[];
	className?: string;
};

export function AgTable<T>({ rowData, columnDefs, className }: Props<T>) {
	const gridRef = useRef<AgGridReact<T>>(null);
	const defaultColDef = useMemo<ColDef<T>>(
		() => ({ sortable: true, filter: true, resizable: true, flex: 1, minWidth: 120 }),
		[],
	);
	return (
		<div className={['ag-theme-quartz', className].filter(Boolean).join(' ')} style={{ height: 500 }}>
			<AgGridReact<T> ref={gridRef} rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
		</div>
	);
}