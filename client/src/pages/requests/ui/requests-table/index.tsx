import { useGetRequests } from '@pages/requests/api/get-requests/use-get-requests';

import { RequestsGrid } from './requests-grid';

export const RequestsTable = () => {
	const requests = useGetRequests();

	if (requests.isLoading || !requests.data) {
		return null;
	}

	return <RequestsGrid rowData={requests.data} />;
};
