import { ComponentProps, useEffect, useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { MainTemplate } from "@/presentation/templates/main.template";
import { ButtonAtom } from "@/presentation/atoms/button.atom";
import { SelectAtom } from "@/presentation/atoms/select.atom";
import { CardAtom } from "@/presentation/atoms/card.atom";
import { GridList } from "@/presentation/atoms/gridList.atom";
import { SeparatorAtom } from "@/presentation/atoms/separtator.atom";
import LineChartMolecule from "@/presentation/molecules/lineChart.molecule";
import PieChartMolecule from "../molecules/pieChart.molecule";
import BarChartMolecule from "../molecules/barChart.molecule";

type StandDetailsPage = ComponentProps<'div'>;

type Sales = {
	sales: number,
	amount: number,
}


const StandDetailsPage: React.FC<StandDetailsPage> = () => {
	const navigate = useNavigate();
	const [metrics, setMetrics] = useState<{[key: string]: Sales }>({});
	const [productMetrics, setProductMetrics] = useState<{[key: string]: Sales }>({});
	const [mostSoldProducts, setMostSoldProducts] = useState<{name: string, value: number }[]>([]);

	useEffect(() => {
		setMetrics({
			'2021-10-04': {
				sales: 15,
				amount: 75,
			},
			'2021-10-05': {
				sales: 23,
				amount: 115,
			},
			'2021-10-06': {
				sales: 5,
				amount: 25,
			}
		})

		setProductMetrics({
			'Produto 1': {
				sales: 20,
				amount: 153,
			},
			'Produto 2': {
				sales: 5,
				amount: 35,
			},
		});

		setMostSoldProducts([
			{
				name: 'Produto 1',
				value: 245,
			},
			{
				name: 'Produto 2',
				value: 87,
			},
		])
	}, [])

	return (
		<MainTemplate>
			<div className="flex-col w-full">
				<header className="w-full p-3 bg-dark-secondary h-16 flex gap-2 items-center">
					<ButtonAtom
						className="text-light-primary w-12 h-12"
						onClick={() => navigate(-1)}
					>
						<ArrowLeftIcon/>
					</ButtonAtom>
					
					<div className="w-0.5 h-full bg-dark-tertiary" />

					<h1>Barraquinha</h1>
				</header>

				<h1 className="text-light-primary text-2xl p-3">Barraquinha 1</h1>
				<div className="flex gap-2 px-4">
					<CardAtom className="w-1/2 h-[720px]">
						<h2 className="text-light-primary text-lg p-3">Métricas</h2>
						<div className="flex w-full h-56">
							<LineChartMolecule 
								data={
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
								]}
							/>
						</div>

						<SeparatorAtom className="my-6"/>

						<div className="flex w-full gap-2 mt-2 h-80">
							<div className="flex-col w-full px-2">
								<h1 className="mb-2">Vendas por produtos:</h1>
								<BarChartMolecule
									data={
										Object.entries(productMetrics).map(([date, metric]) => {
											return {
												name: date,
												value: metric.sales,
											}
										})
									}
								/>
							</div>
							
							<div className="flex-col w-full items-center justify-center px-2">
								<h2 className="mb-2">Produtos com maior ganho R$: </h2>
								<div className="h-80 w-full flex items-center justify-center">
									<PieChartMolecule data={ mostSoldProducts} />
								</div>
							</div>
						</div>
					</CardAtom>

					<CardAtom className="w-1/2 px-3">
						<h2 className="text-light-primary text-lg">Produtos</h2>

						<p>Adicionar produto:</p>
						<div className="flex items-center gap-2">
							<SelectAtom 
								className="mt-1 flex-1"
								options={[{
									label: 'Produto 1',
									value: '1'
								}]} 
								placeholder="Selecione um produto"
							/>
							<ButtonAtom className="h-full w-28">Adicionar</ButtonAtom>
						</div>

						<SeparatorAtom className="my-4 w-[80%] mx-auto"/>

						<GridList className="flex gap-2">
							<CardAtom className="w-1/2 bg-dark-tertiary p-2">
								<h2 className="text-light-primary text-lg">Produto 1</h2>
								<p>Quantidade: 10</p>
								<p>Preço: R$ 10,00</p>
							</CardAtom>
							<CardAtom className="w-1/2 bg-dark-tertiary p-2">
								<h2 className="text-light-primary text-lg">Produto 2</h2>
								<p>Quantidade: 10</p>
								<p>Preço: R$ 10,00</p>
							</CardAtom>
						</GridList>
					</CardAtom>

				</div>

			</div>
		</MainTemplate>
	);
}

export { StandDetailsPage };