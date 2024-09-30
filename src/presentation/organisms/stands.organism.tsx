import { ComponentProps } from "react";

import { cn } from "@/core/lib/utils";
import { GridList } from "@/presentation/atoms/gridList.atom";
import { StoreIcon } from "lucide-react";
import { CardAtom } from "../atoms/card.atom";

type StandsOrganism = ComponentProps<'div'>;

const StandsOrganism: React.FC<StandsOrganism> = ({className, ...props}) => {
	return (
		<div className={cn('w-full h-full p-4', className)} {...props}>
			<h2 className="flex gap-2 mb-6 text-3xl items-center"><StoreIcon size={36}/> Barraquinhas</h2>
			<GridList>
				<CardAtom className="h-24 p-2">
					<p>Barraquinha 1</p>
				</CardAtom>
				<CardAtom className="h-24 p-2">
					<p>Barraquinha 2</p>
				</CardAtom>
				<CardAtom className="h-24 p-2">
					<p>Barraquinha 3</p>
				</CardAtom>
				<CardAtom className="h-24 p-2">
					<p>Barraquinha 4</p>
				</CardAtom>
				<CardAtom className="h-24 p-2">
					<p>Barraquinha 5</p>
				</CardAtom>
				<CardAtom className="h-24 p-2">
					<p>Barraquinha 6</p>
				</CardAtom>
			</GridList>
		</div>
	);
}

export { StandsOrganism };