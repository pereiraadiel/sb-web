import { ComponentProps, useEffect, useState } from "react";
import { ArrowBigRightDashIcon, Check, StoreIcon } from "lucide-react";

import { cn } from "@/core/lib/utils";
import { GridList } from "@/presentation/atoms/gridList.atom";
import { CardAtom } from "@/presentation/atoms/card.atom";
import { SeparatorAtom } from "@/presentation/atoms/separtator.atom";
import { ButtonAtom } from "@/presentation/atoms/button.atom";
import LineChartMolecule from "@/presentation/molecules/lineChart.molecule";
import { useNavigate } from "react-router-dom";

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
		setStands([
			{
				name: 'Barraquinha 1',
				code: '1',
				metrics: [
					{
						sales: 15,
						amount: 75,
						date: '2021-10-04'
					},
					{
						sales: 23,
						amount: 115,
						date: '2021-10-05'
					},
					{
						sales: 5,
						amount: 25,
						date: '2021-10-06'
					}
				]
			},
			{
				name: 'Barraquinha 2',
				code: '2',
				metrics: [
					{
						sales: 12,
						amount: 60,
						date: '2021-10-04'
					},
					{
						sales: 30,
						amount: 150,
						date: '2021-10-05'
					},
					{
						sales: 45,
						amount: 225,
						date: '2021-10-06'
					}
				]
			},
			{
				name: 'Barraquinha 3',
				code: '3',
				metrics: [
					{
						sales: 21,
						amount: 105,
						date: '2021-10-04'
					},
					{
						sales: 31,
						amount: 155,
						date: '2021-10-05'
					},
					{
						sales: 38,
						amount: 190,
						date: '2021-10-06'
					},
					{
						sales: 35,
						amount: 175,
						date: '2021-10-07'
					}
				]
			}
		])
	}, [])


	const handleSelectStand = (stand: Stand) => {
		if (selectedStands.includes(stand)) {
			setSelectedStands(selectedStands.filter(s => s !== stand));
		} else {
			setSelectedStands([...selectedStands, stand]);
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
		<div className={cn('w-full h-full p-4 justify-between', className)} {...props}>
			<h2 className="flex gap-2 text-3xl items-center"><StoreIcon size={36}/> Barraquinhas</h2>
			
			<SeparatorAtom className="my-2"/>

			<h2 className="text-xl font-bold ml-2 mb-2">Vendas</h2>
				<div className="mx-8 flex-1 h-full max-h-[620px]">
					{selectedStands.length > 0 && (
						<CardAtom className="w-full flex-1 h-[100%]">
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
					)}
				</div>
			<SeparatorAtom className="my-4"/>
					
			<h3 className="text-light-secondary text-xl font-semibold">Selecione as barraquinhas</h3>
			<p className="text-light-tertiary mb-2">Selecione as barraquinhas e veja no gráfico acima as suas vendas durante o período</p>
			<GridList className="">
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
	);
}

export { StandsOrganism };