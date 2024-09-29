import { ComponentProps, useState } from "react";
import { PanelTemplate } from "../templates/panel.template";

type PageType = 'Barraquinhas' | 'Produtos' | 'Bilhetes';
type PanelPage = ComponentProps<'div'>;

const PanelPage: React.FC<PanelPage> = () => {
	const pages: Array<PageType> = ['Barraquinhas', 'Produtos', 'Bilhetes'];
	const pageComponents = {
		'Barraquinhas': <p>Barraquinhas</p>,
		'Produtos': <p>Produtos</p>,
		'Bilhetes': <p>Bilhetes</p>
	} as const;
	const [currentPage, setCurrentPage] = useState<PageType>('Barraquinhas');

	return (
		<PanelTemplate pages={pages} onPageChange={t => setCurrentPage(t as PageType)} currentPage={currentPage} >
			{pageComponents[currentPage]}
		</PanelTemplate>
	);
}

export { PanelPage };