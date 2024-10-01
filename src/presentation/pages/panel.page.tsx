import { ComponentProps, useEffect, useMemo, useState } from "react";
import { StoreIcon, ShoppingBasketIcon, TicketsIcon } from 'lucide-react'
import { PanelTemplate } from "@/presentation/templates/panel.template";
import { StandsOrganism } from "../organisms/stands.organism";
import { ProductsOrganism } from "../organisms/products.organism";
import { TicketsOrganism } from "../organisms/tickets.organism";
import { useLocation, useNavigation } from 'react-router-dom';

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
		'Produtos': <ProductsOrganism/>,
		'Bilhetes': <TicketsOrganism/>
	} as const;
	const [currentPage, setCurrentPage] = useState<PageType>();
	const navigation = useNavigation();
	const location = useLocation();

	const handlePageChange = (page: string) => {
		console.log('location: ',  location)
		if (location && location.pathname) {
			console.log('page: ', page, pages)
			location.pathname = page.toLocaleLowerCase();
			setCurrentPage(pages.find(p => p.name.toLocaleLowerCase() === page.toLocaleLowerCase()));
		}
		
	}

	useEffect(() => {
		const pathname = window.location.pathname.split('/').pop();
		console.log(pathname, pages)
		if(!currentPage) {
			setCurrentPage(pathname ? pages.find(p => p.name.toLowerCase() === pathname) : pages[0]);
			console.log('currentPage: ', currentPage)
			const newPathname = currentPage ? (currentPage as PageType).name.toLowerCase() : pages[0].name.toLowerCase();
			if (navigation && navigation.location) {
				navigation.location.pathname = newPathname;
				setCurrentPage(pages.find(p => p.name === newPathname));
			}
		}
	}, [currentPage, setCurrentPage, pages]);

	if(!currentPage) {
		return null;
	}

	return (
		<PanelTemplate pages={pages} onPageChange={handlePageChange} currentPage={currentPage} >
			{pageComponents[currentPage.name]}
		</PanelTemplate>
	);
}

export { PanelPage };