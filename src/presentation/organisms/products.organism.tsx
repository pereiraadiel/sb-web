import { ComponentProps } from "react";

import { cn } from "@/core/lib/utils";
import { GridList } from "@/presentation/atoms/gridList.atom";
import { ShoppingBasketIcon } from "lucide-react";
import { CardAtom } from "../atoms/card.atom";
import { SeparatorAtom } from "../atoms/separtator.atom";

type ProductsOrganism = ComponentProps<'div'>;

const ProductsOrganism: React.FC<ProductsOrganism> = ({className, ...props}) => {
	return (
		<div className={cn('w-full h-full p-4', className)} {...props}>
			<h2 className="flex gap-2 text-3xl items-center"><ShoppingBasketIcon size={36}/> Produtos</h2>
			<SeparatorAtom className="my-2"/>
			<GridList>
				<CardAtom className="h-24 p-3">
					<h2>Produto 1</h2>
					<p className="text-light-tertiary line-clamp-1">Descrição do produto com um Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, adipisci incidunt quia assumenda unde minima reiciendis corporis distinctio facilis ea modi consequuntur rerum in. Quam nam rem iste maiores vel.</p>
					<p className="mt-1">Custo: R$ 4,00</p>
				</CardAtom>
			</GridList>
		</div>
	);
}

export { ProductsOrganism };