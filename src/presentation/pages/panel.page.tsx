import { ComponentProps, useEffect, useMemo, useState } from "react";
import { StoreIcon, ShoppingBasketIcon, TicketsIcon } from 'lucide-react'
import { PanelTemplate } from "@/presentation/templates/panel.template";
import { StandsOrganism } from "../organisms/stands.organism";

type PageType = {
	name: 'Barraquinhas' | 'Produtos' | 'Bilhetes'
	icon: React.ReactNode
};
type PanelPage = ComponentProps<'div'>;

const PanelPage: React.FC<PanelPage> = () => {
	const pages: Array<PageType> = useMemo(() => [{
		name: 'Barraquinhas',
		icon: <StoreIcon/>
	}, {
		name: 'Produtos',
		icon: <ShoppingBasketIcon/>
	}, {
		name: 'Bilhetes',
		icon: <TicketsIcon/>
	}], []);

	const pageComponents = {
		'Barraquinhas': <StandsOrganism/>,
		'Produtos': <p> <ShoppingBasketIcon/> Produtos</p>,
		'Bilhetes': <p><TicketsIcon/> Bilhetes</p>
	} as const;
	const [currentPage, setCurrentPage] = useState<PageType>();

	useEffect(() => {
		if(!currentPage) {
			setCurrentPage(pages[0]);
		}
	}, [currentPage, setCurrentPage, pages]);

	if(!currentPage) {
		return null;
	}

	return (
		<PanelTemplate pages={pages} onPageChange={(page: string) => setCurrentPage(pages.find(p => p.name === page))} currentPage={currentPage} >
			{pageComponents[currentPage.name]}
		</PanelTemplate>
	);
}

export { PanelPage };