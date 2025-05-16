import { useEffect } from 'preact/hooks';
import { appInsights } from '../scripts/appInsights';

export default function AppInsightsInit() {
	useEffect(() => {
		// Already initialized via import side effect,
		// but we can setup other things here if needed
	}, []);
	return null;
}
