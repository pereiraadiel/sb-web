import { cn } from "@/core/lib/utils";

type InputAtom =  React.ComponentProps<"input"> & {
	label: string
}

const InputAtom: React.FC<InputAtom> = ({
	label,
	className,
	ref,
	...props
}) => {
	return (
		<div className="w-full flex flex-col" ref={ref}>
			<label className="text-light-secondary mb-0.25">{label}</label>
			<input className={cn("bg-dark-tertiary p-2 rounded-lg", className)} ref={ref} {...props} />
		</div>
	);
}

export { InputAtom };