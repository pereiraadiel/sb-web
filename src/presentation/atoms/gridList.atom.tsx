import { ComponentProps } from "react";

import { cn } from "@/core/lib/utils";

type GridList = ComponentProps<'div'>;

const GridList: React.FC<GridList> = ({
	className,
	children,
	...props
}) => {
	return (
		<div className={cn("grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ", className)} {...props}>
			{children}
		</div>
	);
}

export { GridList };