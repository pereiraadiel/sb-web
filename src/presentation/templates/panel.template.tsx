import { ComponentProps } from "react";

import { MainTemplate } from "@/presentation/templates/main.template";
import { SidebarOrganism } from "@/presentation/organisms/sidebar.organism";
import { ButtonAtom } from "@/presentation/atoms/button.atom";

type PanelTemplate = ComponentProps<'div'> & {
	children: React.ReactNode,
	pages: string[],
	currentPage: string,
	onPageChange?: (page: string) => void
}

const PanelTemplate: React.FC<PanelTemplate> = ({children, currentPage, onPageChange, pages}) => {

	const currentPageStyle = "bg-dark-tertiary text-light-primary";
	const otherPageStyle = "bg-dark-secondary text-light-tertiary";
	
	const handlePageChange = (page: string) => {
		if (onPageChange) {
			onPageChange(page);
		}
	}

	return (
		<MainTemplate>
			<SidebarOrganism className="flex-col justify-between">
				<nav className="flex-1 min-h-[92%]">
					<h1 className="text-center font-semibold text-xl mb-3">Tessera</h1>
					<div className="h-0.5 w-56 bg-dark-tertiary mb-3 m-auto"/>
					{pages.map((page, index) => {
						return (
							<ButtonAtom 
								key={index} 
								className={page === currentPage ? currentPageStyle : otherPageStyle}
								onClick={() => handlePageChange(page)}
							>
								{page}
							</ButtonAtom>
						);
					})}
				</nav>
				
				<div className="h-0.5 w-56 bg-dark-tertiary my-3 m-auto"/>
				<ButtonAtom className="mb-2 bg-red-secondary text-light-primary">Sair</ButtonAtom>
      </SidebarOrganism>
			
			<div className="flex-1 flex items-center justify-center">
				{children}
			</div>
		</MainTemplate>
	);
}

export { PanelTemplate };