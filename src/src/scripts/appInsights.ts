import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const connectionString =
	'InstrumentationKey=YOUR_INSTRUMENTATION_KEY_OR_CONNECTION_STRING'; // replace!

export const appInsights = new ApplicationInsights({
	config: {
		connectionString,
		enableAutoRouteTracking: true,
		// other options as needed
	},
});

appInsights.loadAppInsights();
