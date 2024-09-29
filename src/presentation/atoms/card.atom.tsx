import { cn } from "@/core/lib/utils";

type CardAtom =  React.ComponentProps<"div"> 

const CardAtom: React.FC<CardAtom> = ({
	children,
	className,
	...props
}) => {
	return (
		<div className={cn("w-full flex flex-col rounded-2xl bg-dark-secondary", className)} {...props}>
			{children}
		</div>
	);
}

export { CardAtom };