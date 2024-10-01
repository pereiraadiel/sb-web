import { ComponentProps } from "react";

import { cn } from "@/core/lib/utils";
import { GridList } from "@/presentation/atoms/gridList.atom";
import { StoreIcon } from "lucide-react";
import { CardAtom } from "@/presentation/atoms/card.atom";
import LineChartMolecule from "@/presentation/molecules/lineChart.molecule";
import { SeparatorAtom } from "@/presentation/atoms/separtator.atom";

type StandsOrganism = ComponentProps<'div'>;

const StandsOrganism: React.FC<StandsOrganism> = ({className, ...props}) => {
	return (
		<div className={cn('w-full h-full p-4', className)} {...props}>
			<h2 className="flex gap-2 text-3xl items-center"><StoreIcon size={36}/> Barraquinhas</h2>
			<SeparatorAtom className="my-2"/>
			<GridList>
				<CardAtom className="h-64 p-3">
					<h2>Barraquinha 1</h2>
					<LineChartMolecule/>
				</CardAtom>
				<CardAtom className="h-64 p-3">
					<p>Barraquinha 2</p>
					<LineChartMolecule/>
				</CardAtom>
				<CardAtom className="h-64 p-3">
					<p>Barraquinha 3</p>
					<LineChartMolecule/>
				</CardAtom>
				<CardAtom className="h-64 p-3">
					<p>Barraquinha 4</p>
					<LineChartMolecule/>
				</CardAtom>
				<CardAtom className="h-64 p-3">
					<p>Barraquinha 5</p>
					<LineChartMolecule/>
				</CardAtom>
				<CardAtom className="h-64 p-3">
					<p>Barraquinha 6</p>
					<LineChartMolecule/>
				</CardAtom>
			</GridList>
		</div>
	);
}

export { StandsOrganism };