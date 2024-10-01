import { ComponentProps, useEffect, useState } from "react";

import { cn } from "@/core/lib/utils";
import { PrinterIcon, TicketPlusIcon, TicketsIcon } from "lucide-react";
import { SeparatorAtom } from "../atoms/separtator.atom";
import PieChartMolecule from "../molecules/pieChart.molecule";
import LineChartMolecule from "../molecules/lineChart.molecule";
import { CardAtom } from "../atoms/card.atom";
import { ButtonAtom } from "../atoms/button.atom";

type TicketsOrganism = ComponentProps<'div'>;

type Ticket = {
	id: number;
	name: string;
	active: boolean;
}

const TicketsOrganism: React.FC<TicketsOrganism> = ({className, ...props}) => {
	const [printSuccess, setPrintSuccess] = useState(false);
	const [printLoading, setPrintLoading] = useState(false);
	const [generateSuccess, setGenerateSuccess] = useState(false);
	const [generateLoading, setGenerateLoading] = useState(false);

	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [ticketData, setTicketData] = useState<{ativos: number, inativos: number}>({ativos: 0, inativos: 0});

	const handlePrint = () => {
		setPrintLoading(true);
		setTimeout(() => {
			setPrintLoading(false);
			setPrintSuccess(true);
			setTimeout(() => {
				setPrintSuccess(false);
				window.print();
			}, 300);
		}, 2000);
	}

	const handleGenerate = () => {
		setGenerateLoading(true);
		setTimeout(() => {
			setGenerateLoading(false);
			setGenerateSuccess(true);
			setTimeout(() => {
				setGenerateSuccess(false);
				setTickets(current => [...current, ...generateTickets(false)]);
			}, 300);
		}, 2000);
	}

	const generateTickets = (active = true) => {
		const newTickets = Array.from({ length: 10 }, (_, i) => ({
			id: i,
			name: `Bilhete ${i + 1}`,
			active: active ? Math.random() > 0.5 : false
		}));
		return newTickets;
	}

	useEffect(() => {
		const newTickets = generateTickets()
		setTickets(newTickets)
	}, []);

	useEffect(() => {
		const ativos = tickets.filter(t => t.active).length;
		const inativos = tickets.filter(t => !t.active).length;
		setTicketData({ativos, inativos});
	}, [tickets])

	return (
		<div className={cn('w-full h-full p-4', className)} {...props}>
			<header className="flex justify-between">
				<h2 className="flex gap-2 text-3xl items-center"><TicketsIcon size={36}/> Bilhetes</h2>
				<div className="flex gap-2">
					<ButtonAtom 
						className="w-48 flex-row gap-2 transition"
						success={generateSuccess}
						loading={generateLoading}
						onClick={handleGenerate}
						>
							<TicketPlusIcon/> Gerar Bilhetes
					</ButtonAtom>
					<ButtonAtom 
						className="w-56 flex-row gap-2 transition"
						success={printSuccess}
						loading={printLoading}
						onClick={handlePrint}
						>
							<PrinterIcon/> Imprimir Bilhetes
					</ButtonAtom>
				</div>
			</header>
			<SeparatorAtom className="my-2"/>
			<div className="flex gap-8">

				<CardAtom className="my-2 flex-1 h-70 flex items-center">
					<PieChartMolecule data={[{
						value: ticketData.ativos,
						name: 'Ativos'
					}, {
						value: ticketData.inativos,
						name: 'Inativos'
					}]}/>
				</CardAtom>

				<CardAtom className="my-2 flex-1 h-70">
					<LineChartMolecule data={[
						{ name: '04/10', ativos: 10, inativos: 5 },
						{ name: '05/10', ativos: 13, inativos: 2 },
						{ name: '06/10', ativos: 15, inativos: 0 },
					]} dataValues={[{
						value: 'ativos',
						color: '#8884d8'
					}, {
						value: 'inativos',
						color: '#82ca9d'
					}]}/>
				</CardAtom>
			</div>
		</div>
	);
}

export { TicketsOrganism };