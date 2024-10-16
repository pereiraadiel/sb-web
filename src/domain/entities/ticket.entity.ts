export type Ticket = {
	id: string;
	title: string;
	description: string;
	status: 'open' | 'closed';
}