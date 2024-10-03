import { ComponentProps } from "react";

import { cn } from "@/core/lib/utils";

type SelectAtom = ComponentProps<'select'> & {
	options: {
		value: string,
		label: string
	}[],
	placeholder: string
}

const SelectAtom: React.FC<SelectAtom> = ({className, options, placeholder, ...props}) => {
	return (
		<select 
			className={cn('w-full h-12 bg-dark-tertiary px-4 rounded-xl', className)}
			{...props}
		>
			<option 
				className="" 
				value={''}
			>
				{placeholder}
			</option>
			
			{options.map((option) => (
				<option 
					key={option.value} 
					value={option.value}
					className="h-16 mt-1 p-4"
				>
					{option.label}
				</option>
			))}
		</select>
	)
}


export { SelectAtom,  };