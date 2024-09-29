import { ComponentProps } from "react";

import { LoginFormOrganism } from "@/presentation/organisms/loginForm.organism";
import { MainTemplate } from "@/presentation/templates/main.template";

type LoginPage = ComponentProps<'div'>;

const LoginPage: React.FC<LoginPage> = () => {
	return (
		<MainTemplate>
			<div className="flex-1 flex items-center justify-center">
				<LoginFormOrganism className=""/>
			</div>
		</MainTemplate>
	);
}

export { LoginPage };