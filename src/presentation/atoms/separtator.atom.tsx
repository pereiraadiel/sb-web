import { ComponentProps } from "react";

import { cn } from "@/core/lib/utils";

type SeparatorAtom = ComponentProps<'div'>;

const SeparatorAtom: React.FC<SeparatorAtom> = ({className, ...props}) => {
	return <div className={cn('h-0.5 w-full bg-dark-tertiary', className)} {...props} />
}

export { SeparatorAtom };