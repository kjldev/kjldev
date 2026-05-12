import type { ImageMetadata } from 'astro';

export interface Project {
	order: number;
	title: string;
	status: string;
	image?: ImageMetadata;
	description?: string;
	links?: LinkProp[];
	tags?: string[];
	hasContent: boolean;
	remoteReadme?: string;
}

export interface LinkProp {
	name: string;
	url: string;
	/** Mutually exclusive with `emoji`. Required if `emoji` is absent. */
	image?: ImageMetadata;
	/** Single-character emoji. Mutually exclusive with `image`. Required if `image` is absent. */
	emoji?: string;
}
