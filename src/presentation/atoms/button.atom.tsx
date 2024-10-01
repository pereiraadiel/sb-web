import { cn } from "@/core/lib/utils"
import { CheckCircledIcon, CircleIcon } from '@radix-ui/react-icons'


type ButtonAtom =  React.ComponentProps<"button">  & {
	success?: boolean
	loading?: boolean
}

const ButtonAtom: React.FC<ButtonAtom> = ({
	children,
	className,
	success,
	loading,
	...props
}) => {
	const styleClass = loading ? "bg-dark-tertiary/60" : success ? "bg-green-secondary text-dark-tertiary" : "bg-dark-tertiary" 
	return (
		<button 
			className={cn("w-full h-10 flex flex-col items-center justify-center rounded-2xl text-light-secondary uppercase", styleClass, className)} 
			disabled={loading || success}
			{...props}
			>
			{ loading ? <CircleIcon className="animate-spin"/> : success ? <CheckCircledIcon /> : children}
		</button>
	);
}

export { ButtonAtom };