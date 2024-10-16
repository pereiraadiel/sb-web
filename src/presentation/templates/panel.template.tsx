import { ComponentProps } from "react";
import { useNavigate } from "react-router-dom";

import { cn } from '@/core/lib/utils';
import { AccessTokenService } from "@/domain/services/accessToken.service";
import { MainTemplate } from "@/presentation/templates/main.template";
import { SidebarOrganism } from "@/presentation/organisms/sidebar.organism";
import { ButtonAtom } from "@/presentation/atoms/button.atom";
import { SeparatorAtom } from "@/presentation/atoms/separtator.atom";

type PageType = {
	name: 'Barraquinhas' | 'Produtos' | 'Bilhetes'
	icon: React.ReactNode
};

type PanelTemplate = ComponentProps<'div'> & {
	children: React.ReactNode,
	pages: PageType[],
	currentPage: PageType,
	onPageChange?: (page: string) => void
}

const PanelTemplate: React.FC<PanelTemplate> = ({children, currentPage, onPageChange, pages}) => {

	const currentPageStyle = "bg-dark-tertiary text-light-primary";
	const otherPageStyle = "bg-dark-secondary text-light-tertiary";
	const navigate = useNavigate();
	
	const handlePageChange = (page: string) => {
		if (onPageChange) {
			onPageChange(page);
		}
	}

	const handleLogout = () => {
		new AccessTokenService().removeAccessToken();
		navigate('/');
	}

	return (
		<MainTemplate>
			<SidebarOrganism className="flex-col justify-between">
				<nav className="flex-1 min-h-[92%]">
					<h1 className="text-center font-semibold text-xl mb-3">Tessera</h1>
					<SeparatorAtom className="my-3"/>
					{pages.map((page, index) => {
						return (
							<ButtonAtom 
								key={index} 
								className={cn('text-left items-start pl-2 mb-1 hover:bg-dark-tertiary/60', page === currentPage ? currentPageStyle : otherPageStyle)}
								onClick={() => handlePageChange(page.name)}
							>
								<div className="flex gap-2">
									{page.icon} {page.name}
								</div>
							</ButtonAtom>
						);
					})}
				</nav>
				
				<SeparatorAtom className="my-3"/>

				<ButtonAtom className="mb-2 bg-red-secondary text-light-primary" onClick={handleLogout}>Sair</ButtonAtom>
      </SidebarOrganism>
			
			<div className="flex-1 flex items-center justify-center">
				{children}
			</div>
		</MainTemplate>
	);
}

export { PanelTemplate };