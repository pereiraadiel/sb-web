import { ComponentProps, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate para controlar a navegação
import { StoreIcon, ShoppingBasketIcon, TicketsIcon } from 'lucide-react'

import { PanelTemplate } from "@/presentation/templates/panel.template";
import { StandsOrganism } from "@/presentation/organisms/stands.organism";
import { ProductsOrganism } from "@/presentation/organisms/products.organism";
import { TicketsOrganism } from "@/presentation/organisms/tickets.organism";

type PageType = {
	name: 'Barraquinhas' | 'Produtos' | 'Bilhetes';
	icon: React.ReactNode;
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
		'Produtos': <ProductsOrganism/>,
		'Bilhetes': <TicketsOrganism/>
	} as const;

	const [currentPage, setCurrentPage] = useState<PageType>();
	const navigate = useNavigate();
	const location = useLocation();

	const handlePageChange = (page: string) => {
		const selectedPage = pages.find(p => p.name.toLowerCase() === page.toLowerCase());
		if (selectedPage) {
			setCurrentPage(selectedPage);
			navigate(`/${selectedPage.name.toLowerCase()}`);
		}
	};

	useEffect(() => {
		const pathname = location.pathname.split('/').pop();
		const matchedPage = pages.find(p => p.name.toLowerCase() === pathname);

		if (!currentPage && matchedPage) {
			setCurrentPage(matchedPage);
		} else if (!currentPage) {
			setCurrentPage(pages[0]);
			navigate(`/${pages[0].name.toLowerCase()}`);
		}
	}, [currentPage, location.pathname, navigate, pages]);

	if (!currentPage) {
		return null;
	}

	return (
		<PanelTemplate pages={pages} onPageChange={handlePageChange} currentPage={currentPage} >
			{pageComponents[currentPage.name]}
		</PanelTemplate>
	);
};

export { PanelPage };
