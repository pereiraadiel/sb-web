import { cn } from "@/core/lib/utils";
import { ComponentProps } from "react";

type FormMolecule = ComponentProps<'form'> & {
	children: React.ReactNode,
	className?: string
}

const FormMolecule: React.FC<FormMolecule> = ({children, className, ...rest}) => {
	return (
		<form className={cn("flex flex-col w-full bg-dark-secondary", className)} {...rest}>
			{children}
		</form>
	)
}

export { FormMolecule };