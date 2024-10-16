import { cn } from "@/core/lib/utils";
import { X } from "lucide-react";

type ToastAtom =  React.ComponentProps<"div"> & {
	id: string,
	text: string,
	onClose: (id: string) => void,
	variant?: 'success' | 'error' | 'warning' | 'info',
}

const ToastAtom: React.FC<ToastAtom> = ({
	id,
	text,
	onClose,
	className,
	ref,
	...props
}) => {
	const variantStyles = {
		success: 'bg-green-primary text-dark-secondary',
		error: 'bg-red-primary text-light-secondary',
		warning: 'bg-yellow-primary text-dark-secondary',
		info: 'bg-blue-primary text-light-secondary',
	}
	const variantStyle = variantStyles[props.variant || 'info']

	return (
		<div className={cn("w-64 rounded-lg flex flex-row justify-between gap-2 p-2 absolute top-2 right-2", variantStyle, className)} ref={ref} {...props}>
			<p className="mb-0.25 font-medium">{text}</p>
			<X size={24} onClick={() => onClose(id)}/>
		</div>
	);
}

export { ToastAtom };