import { ComponentProps, FormEvent, useState } from "react";

import { ButtonAtom } from "@/presentation/atoms/button.atom";
import { InputAtom } from "@/presentation/atoms/input.atom";
import { FormMolecule } from "@/presentation/molecules/form.molecule";
import { AuthenticateAdminUsecase } from "@/domain/usecases/authenticateAdmin.usecase";
import { AccessTokenService } from "@/domain/services/accessToken.service";
import { ApiService } from "@/domain/services/api.service";
import { useToast } from "@/domain/hooks/toast.hook";
import { cn } from "@/core/lib/utils";
import { useNavigate } from "react-router-dom";

type LoginFormOrganism = ComponentProps<'form'>;

const LoginFormOrganism: React.FC<LoginFormOrganism> = ({className, ...props}) => {
	const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
	const [code, setCode] = useState("");
  const { addToast } = useToast();
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/barraquinhas');
  }

  const authenticate = async () => {
    try {
      const authenticateAdminUsecase = new AuthenticateAdminUsecase(new ApiService(), new AccessTokenService())
      await authenticateAdminUsecase.execute(code);
      setSuccess(true);
      handleNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      const errors: Record<string, string> = {
        401: 'Código inválido',
        429: 'Muitas tentativas, tente novamente mais tarde',
      };
      const message = errors[err.status] || 'Erro ao autenticar';
      addToast(`${err.status} · ${message}`, 'error');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
    console.log('submit', code)
    setLoading(true)

    console.warn('autenticando...')
    authenticate();
  }

	return (
		<FormMolecule {...props} onSubmit={handleSubmit} className={cn("w-80 p-2 rounded-2xl", className)}>
			<InputAtom label="Código" type="text" placeholder="Digite o código" value={code} onChange={e => setCode(e.target.value)}/>
			<ButtonAtom className="mt-2" success={success} loading={loading}>Entrar</ButtonAtom>
		</FormMolecule>
	)
}

export { LoginFormOrganism };