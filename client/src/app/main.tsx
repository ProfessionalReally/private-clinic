import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
