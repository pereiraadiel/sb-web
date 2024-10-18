import { ComponentProps } from "react";
import { ShoppingBasketIcon } from "lucide-react";

import { cn } from "@/core/lib/utils";
import { GridList } from "@/presentation/atoms/gridList.atom";
import { CardAtom } from "@/presentation/atoms/card.atom";
import { SeparatorAtom } from "@/presentation/atoms/separtator.atom";
import { useGood } from "@/domain/hooks/good.hook";

type ProductsOrganism = ComponentProps<'div'>;

const ProductsOrganism: React.FC<ProductsOrganism> = ({className, ...props}) => {
	const { goods } = useGood();

	return (
		<div className={cn('w-full h-full p-4', className)} {...props}>
			<h2 className="flex gap-2 text-3xl items-center"><ShoppingBasketIcon size={36}/> Produtos</h2>
			<SeparatorAtom className="my-2"/>
			<GridList>
				{ goods && goods.map((good) => (
					<CardAtom className="h-24 p-3">
						<h2>{good.fullname}</h2>
						<p className="text-light-tertiary line-clamp-1">{good.description}</p>
						<p className="mt-1">{(good.priceCents / 100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
					</CardAtom>
				))}
			</GridList>
		</div>
	);
}

export { ProductsOrganism };