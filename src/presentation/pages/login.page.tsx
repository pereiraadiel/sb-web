import { ComponentProps } from "react";

import { LoginFormOrganism } from "@/presentation/organisms/loginForm.organism";
import { MainTemplate } from "@/presentation/templates/main.template";
import { useAuth } from "@/domain/hooks/auth.hook";
import { Navigate } from "react-router-dom";

type LoginPage = ComponentProps<'div'>;

const LoginPage: React.FC<LoginPage> = () => {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? <Navigate to="/barraquinhas" />  : (
		<MainTemplate>
			<div className="flex-1 flex items-center justify-center">
				<LoginFormOrganism className=""/>
			</div>
		</MainTemplate>
	);
}

export { LoginPage };