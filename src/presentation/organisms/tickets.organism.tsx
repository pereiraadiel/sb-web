import { ComponentProps } from "react";

import { cn } from "@/core/lib/utils";
import { TicketsIcon } from "lucide-react";
import { SeparatorAtom } from "../atoms/separtator.atom";
import PieChartMolecule from "../molecules/pieChart.molecule";

type TicketsOrganism = ComponentProps<'div'>;

const TicketsOrganism: React.FC<TicketsOrganism> = ({className, ...props}) => {
	return (
		<div className={cn('w-full h-full p-4', className)} {...props}>
			<h2 className="flex gap-2 text-3xl items-center"><TicketsIcon size={36}/> Bilhetes</h2>
			<SeparatorAtom className="my-2"/>
			<PieChartMolecule data={[{
				value: 10,
				name: 'Ativos'
			}, {
				value: 5,
				name: 'Inativos'
			}]}/>
		</div>
	);
}

export { TicketsOrganism };