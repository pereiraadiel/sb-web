import { ComponentProps, useEffect, useState } from "react";
import { ArrowBigRightDashIcon, ChartSplineIcon, Check, PlusIcon, StoreIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/core/lib/utils";
import { GridList } from "@/presentation/atoms/gridList.atom";
import { CardAtom } from "@/presentation/atoms/card.atom";
import { SeparatorAtom } from "@/presentation/atoms/separtator.atom";
import { ButtonAtom } from "@/presentation/atoms/button.atom";
import LineChartMolecule from "@/presentation/molecules/lineChart.molecule";
import { salesTemp } from "@/domain/sales.temp";

type StandsOrganism = ComponentProps<'div'>;

type Metric = {
	sales: number,
	amount: number,
	date: string,
}

type Stand ={
	name: string,
	code: string,
	metrics: Metric[]
}

type Sales = {
	sales: number,
	amount: number,
}

const StandsOrganism: React.FC<StandsOrganism> = ({className, ...props}) => {

	const [stands, setStands] = useState<Stand[]>([]);
	const [selectedStands, setSelectedStands] = useState<Stand[]>([]);
	const [metrics, setMetrics] = useState<{[key: string]: Sales }>({});

	const navigate = useNavigate();

	useEffect(() => {
		setStands(salesTemp)
	}, [])


	const handleSelectStand = (stand: Stand) => {
		if (selectedStands.includes(stand)) {
			setSelectedStands(selectedStands.filter(s => s !== stand));
		} else {
			setSelectedStands([...selectedStands, stand]);
		}
	}

	const handleSelectAllStands = () => {
		if (selectedStands.length === stands.length) {
			setSelectedStands([]);
		} else {
			setSelectedStands(stands);
		}
	}

	useEffect(() => {
		const selectedStandMetricsByDate = selectedStands.map(stand => stand.metrics).flat().reduce<{[key: string]: Metric[]}>((acc, metric) => {
			if (acc[metric.date]) {
				acc[metric.date].push(metric);
			} else {
				acc[metric.date] = [metric];
			}
			return acc;
		}, {});

		const totalSalesByDate = Object.entries(selectedStandMetricsByDate).reduce<{[key: string]: Sales}>((acc, [date, metrics]) => {
			const sales = metrics.reduce((acc, metric) => acc + metric.sales, 0);
			const amount = metrics.reduce((acc, metric) => acc + metric.amount, 0);
			acc[date] = {
				sales,
				amount
			};
			return acc;
		}, {});

		setMetrics(totalSalesByDate);
	}, [selectedStands])

	return (
		<div className={cn('relative flex-1 w-full h-full p-4 justify-between', className)} {...props}>
			<div className="flex justify-between">
				<h2 className="flex gap-2 text-3xl items-center"><StoreIcon size={36}/> Barraquinhas</h2>
				<ButtonAtom className="w-fit px-2 flex flex-row gap-2">
					<PlusIcon size={24}/>
					Adicionar barraquinha
				</ButtonAtom>
			</div>
			
			<SeparatorAtom className="my-2"/>

			<h2 className="text-xl font-bold ml-2 mb-2">Vendas</h2>
				<div className="mx-8 flex-1 min-h-80">
					{selectedStands.length > 0 ? (
						<CardAtom className="w-full h-96">
							{ metrics && (
								<LineChartMolecule data={
									Object.entries(metrics).map(([date, metric]) => {
										return {
											name: date,
											R$: metric.amount,
											vendas: metric.sales,
										}
									})
								} dataValues={[
									{
										value: 'R$',
										color: '#82ca9d'
									},
									{
										value: 'vendas',
										color: '#8884d8'
									},
								]}/>
						)}
						</CardAtom>
					): 
					(
						<>
							<p className="text-light-tertiary flex flex-col gap-3 items-center justify-center text-center h-96">
								Selecione as barraquinhas para ver as vendas
								<ChartSplineIcon size={64} className="ml-2"/>
							</p>
						</>
					)}
				</div>
					
			<div className="stands-info h-64 p-2 absolute bottom-4 left-0 right-0">

				<SeparatorAtom className="my-4"/>
				<h3 className="text-light-secondary text-xl font-semibold">Selecione as barraquinhas</h3>
				<p className="text-light-tertiary mb-2">Selecione as barraquinhas e veja no gráfico acima as suas vendas durante o período</p>
				<CardAtom className="h-12 w-80 flex-row items-center gap-2">
					<ButtonAtom
						className="w-10 h-10 ml-2 flex items-center justify-center"
						onClick={() => handleSelectAllStands()}
					>
						{selectedStands.length === stands.length && (
							<Check size={24}/>
						)}
					</ButtonAtom>
						<h2 className="flex-1 line-clamp-1">Selecionar tudo</h2>
				</CardAtom>
				
				<SeparatorAtom className="my-1 bg-dark-primary"/>

				<GridList>
					{stands.map((stand, index) => {
						return (
							<CardAtom key={index} className="h-12 flex-row items-center gap-2">
								<ButtonAtom 
									className="w-10 h-10 ml-2 flex items-center justify-center"
									onClick={() => handleSelectStand(stand)}
									>
										{selectedStands.includes(stand) && (
											<Check size={24}/>
										)}
								</ButtonAtom>
								<h2 className="flex-1 line-clamp-1">{stand.name}</h2>
								<ButtonAtom
									className="w-10 h-10 flex items-center justify-center"
									onClick={() => navigate(`/barraquinhas/${stand.code}`)}
								>
									<ArrowBigRightDashIcon/>
								</ButtonAtom>
							</CardAtom>
						)
					})}
				</GridList>
			</div>
		</div>
	);
}

export { StandsOrganism };