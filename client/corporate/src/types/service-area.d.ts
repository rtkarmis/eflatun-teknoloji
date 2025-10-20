export interface ServiceArea {
	slug: string;
	title: string;
	shortDesc: string;
	description: string;
	image: string;
	keywords: string[];
	coordinates?: {
		lat: number;
		lng: number;
	};
}