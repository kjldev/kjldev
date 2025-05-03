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
}

export interface LinkProp {
	name: string;
	url: string;
	image: ImageMetadata;
}
