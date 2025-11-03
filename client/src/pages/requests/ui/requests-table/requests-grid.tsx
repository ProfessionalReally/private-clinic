import type { RequestsWithId } from '@entities/request';
import type { ColDef } from 'ag-grid-community';

import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export const RequestsGrid = ({ rowData }: { rowData: RequestsWithId[] }) => {
	const columnDefs = useMemo<ColDef<RequestsWithId>[]>(
		() => [
			{
				field: 'id',
				headerName: 'ID',
				hide: true,
				width: 100,
			},
			{
				comparator: (a, b) => dayjs(a).valueOf() - dayjs(b).valueOf(),
				field: 'date',
				filter: 'agDateColumnFilter',
				headerName: 'DateTime',
				sort: 'desc',
				valueFormatter: (params) =>
					dayjs(params.value).locale('ru').format('DD.MM.YYYY HH:mm'),
				width: 200,
			},
			{
				field: 'fullName',
				headerName: 'Full Name',
				width: 220,
			},
			{
				field: 'phone',
				headerName: 'Phone',
				width: 180,
			},
			{
				field: 'problemDescription',
				flex: 1,
				headerName: 'Problem Description',
			},
		],
		[],
	);

	const defaultColDef = useMemo<ColDef>(
		() => ({
			filter: true,
			floatingFilter: true,
			resizable: true,
			sortable: true,
		}),
		[],
	);

	return (
		<div style={{ height: '500px', width: '100%' }}>
			<AgGridReact
				animateRows
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				rowData={rowData}
			/>
		</div>
	);
};
