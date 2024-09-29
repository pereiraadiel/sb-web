import { ComponentProps } from "react";

import { cn } from "@/core/lib/utils";

type SidebarOrganism = ComponentProps<'aside'>;

const SidebarOrganism: React.FC<SidebarOrganism> = ({children, className, ...rest}) => {
	return (
		<aside className={cn("w-64 min-h-full bg-dark-secondary p-2", className)} {...rest}>
			{children}
		</aside>
	)
}

export { SidebarOrganism };