import { ComponentProps, useEffect, useState } from "react";

import { cn } from "@/core/lib/utils";
import { GridList } from "@/presentation/atoms/gridList.atom";
import { Check, StoreIcon } from "lucide-react";
import { CardAtom } from "@/presentation/atoms/card.atom";
import { SeparatorAtom } from "@/presentation/atoms/separtator.atom";
import { ButtonAtom } from "../atoms/button.atom";
import LineChartMolecule from "../molecules/lineChart.molecule";

type StandsOrganism = ComponentProps<'div'>;

type Stand ={
	name: string,
	code: string,
	sales: number,
	amount: number,
}

type Sales = {
	sales: number,
	amount: number,
}

const StandsOrganism: React.FC<StandsOrganism> = ({className, ...props}) => {

	const [stands, setStands] = useState<Stand[]>([]);
	const [selectedStands, setSelectedStands] = useState<Stand[]>([]);


	useEffect(() => {
		setStands([
			{
				name: 'Barraquinha 1',
				code: '1',
				sales: 15,
				amount: 57
			},
			{
				name: 'Barraquinha 2',
				code: '2',
				sales: 23,
				amount: 45
			},
			{
				name: 'Barraquinha 3',
				code: '3',
				sales: 45,
				amount: 32
			}
		])
	}, [])

	const [sales, setSales] = useState<Sales>();

	const handleSelectStand = (stand: Stand) => {
		if (selectedStands.includes(stand)) {
			setSelectedStands(selectedStands.filter(s => s !== stand));
		} else {
			setSelectedStands([...selectedStands, stand]);
		}
	}

	useEffect(() => {
		const sales = selectedStands.reduce((acc, stand) => acc + stand.sales, 0);
		const amount = selectedStands.reduce((acc, stand) => acc + stand.amount, 0);

		setSales({
			sales,
			amount
		});
	}, [selectedStands])

	return (
		<div className={cn('w-full h-full p-4 justify-between', className)} {...props}>
			<h2 className="flex gap-2 text-3xl items-center"><StoreIcon size={36}/> Barraquinhas</h2>
			
			<SeparatorAtom className="my-2"/>

			<h2 className="text-xl font-bold ml-2 mb-2">Vendas</h2>
			<div className="mx-8 flex-1 h-full max-h-[620px]">
				<CardAtom className="w-full flex-1 h-[100%]">
					{sales && (
						<LineChartMolecule data={[
									// { name: '04/10', vendas: sales[0], R$: sales[0] * price },
									{ name: '04/10', vendas: sales.sales, R$: sales.amount },
								]} dataValues={[{
									value: 'vendas',
									color: '#8884d8'
								}, {
									value: 'R$',
									color: '#82ca9d'
								}]}/>
					)}
				</CardAtom>
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
						</CardAtom>
					)
				})}
			</GridList>
		</div>
	);
}

export { StandsOrganism };