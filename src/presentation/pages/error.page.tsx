import { ComponentProps } from "react";
import { CardAtom } from "@/presentation/atoms/card.atom";
import { MainTemplate } from "../templates/main.template";
import { ButtonAtom } from "../atoms/button.atom";

type ErrorPage = ComponentProps<'div'>;

const ErrorPage: React.FC<ErrorPage> = () => {
	const handleBack = () => {
		window.history.back();
	}
	return (
		<MainTemplate>
			<CardAtom className="w-64 p-2 m-auto flex items-center border border-red-tertiary">
				<h1 className="mb-2 text-2xl text-red-tertiary font-bold">Erro 404</h1>
				<p className="mb-2 text-red-tertiary">Página não encontrada</p>
				<ButtonAtom 
					className="bg-red-tertiary text-dark-tertiary"
					onClick={handleBack}
					>
						Voltar
				</ButtonAtom>
			</CardAtom>
		</MainTemplate>
	);
};

export { ErrorPage };	