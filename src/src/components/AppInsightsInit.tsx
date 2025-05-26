import { useEffect } from 'preact/hooks';
import { appInsights } from '../scripts/appInsights';

export default function AppInsightsInit() {
	useEffect(() => {
		if (appInsights.config.enableDebug === true) {
			console.log('App Insights debugging enabled');
		}
	}, []);
	return null;
}
