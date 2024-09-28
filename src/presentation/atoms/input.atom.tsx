import { cn } from "@/core/lib/utils";

type InputAtom =  React.ComponentProps<"input"> & {
	label: string
}

const InputAtom: React.FC<InputAtom> = ({
	label,
	className,
	...props
}) => {
	return (
		<div className="w-80 border border-red-primary">
			<label>{label}</label>
			<input className={cn("", className)} {...props} />
		</div>
	);
}

export { InputAtom };