import { CssBaseline } from '@mui/material';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { StrictMode } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createRoot } from 'react-dom/client';

ModuleRegistry.registerModules([AllCommunityModule]);

import { AppProvider } from './app-provider/app-provider';
import { PrivateClinic } from './private-clinic';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AppProvider>
			<CssBaseline />
			<PrivateClinic />
		</AppProvider>
	</StrictMode>,
);
