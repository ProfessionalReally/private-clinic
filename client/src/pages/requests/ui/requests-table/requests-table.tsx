import type { ColDef } from 'ag-grid-community';

import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

type Request = {
	date: string;
	fullname: string;
	phone: string;
	problem: string;
};

export const RequestsTable = () => {
	const [rowData] = useState<Request[]>([
		{
			date: '2025-10-18T14:35:00Z',
			fullname: 'Ivan Ivanov',
			phone: '+7 (999) 123-45-67',
			problem: 'Back pain',
		},
		{
			date: '2025-10-15T09:20:00Z',
			fullname: 'Petr Petrov',
			phone: '+7 (921) 777-88-99',
			problem: 'Headache',
		},
		{
			date: '2025-10-12T18:45:00Z',
			fullname: 'Anna Sidorova',
			phone: '+7 (902) 111-22-33',
			problem: 'High blood pressure',
		},
	]);

	const columnDefs = useMemo<ColDef<Request>[]>(
		() => [
			{
				comparator: (a, b) => dayjs(a).valueOf() - dayjs(b).valueOf(),
				field: 'date',
				filter: 'agDateColumnFilter',
				headerName: 'Date & Time',
				sort: 'desc',
				valueFormatter: (params) =>
					dayjs(params.value).locale('ru').format('DD.MM.YYYY HH:mm'),
				width: 200,
			},
			{
				field: 'fullname',
				headerName: 'Full Name',
				width: 220,
			},
			{
				field: 'phone',
				headerName: 'Phone',
				width: 180,
			},
			{
				field: 'problem',
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
