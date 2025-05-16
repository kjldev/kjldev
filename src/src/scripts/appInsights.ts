import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ClickAnalyticsPlugin } from '@microsoft/applicationinsights-clickanalytics-js';

const connectionString = import.meta.env.PUBLIC_APPINSIGHTS_CONNECTION_STRING;

const clickPluginInstance = new ClickAnalyticsPlugin();
// Click Analytics configuration
const clickPluginConfig = {
	autoCapture: true,
};

const config = {
	connectionString,
	enableAutoRouteTracking: true,
	extensions: [clickPluginInstance],
	extensionConfig: {
		[clickPluginInstance.identifier]: clickPluginConfig,
	},
};

export const appInsights = new ApplicationInsights({ config: config });

if (connectionString) appInsights.loadAppInsights();
