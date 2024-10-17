import { ComponentProps, FormEvent, useEffect, useState } from "react";

import { ButtonAtom } from "@/presentation/atoms/button.atom";
import { InputAtom } from "@/presentation/atoms/input.atom";
import { FormMolecule } from "@/presentation/molecules/form.molecule";
import { useAuth } from "@/domain/hooks/auth.hook";
import { useToast } from "@/domain/hooks/toast.hook";
import { cn } from "@/core/lib/utils";

type LoginFormOrganism = ComponentProps<'form'>;

const LoginFormOrganism: React.FC<LoginFormOrganism> = ({className, ...props}) => {
	const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
	const [code, setCode] = useState("");
  const { authenticate, error: authError} = useAuth();
  const { addToast } = useToast();


  useEffect(() => {
    if (authError) {
      addToast(authError.split('.')[1], 'error');
      setError(!!authError);
      setTimeout(() => {
        setError(false);
      }, 500);
    }
  }, [authError, addToast]);

  const handleAuthenticate = async () => {
    try {
      if(!code) return;
      authenticate(code);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 500);
    } catch (err) {
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
    setLoading(true)
    handleAuthenticate();
  }

	return (
		<FormMolecule {...props} onSubmit={handleSubmit} className={cn("w-80 p-2 rounded-2xl", className)}>
			<InputAtom label="Código" type="text" placeholder="Digite o código" value={code} onChange={e => setCode(e.target.value)}/>
			<ButtonAtom className="mt-2" success={success} error={error} loading={loading}>Entrar</ButtonAtom>
		</FormMolecule>
	)
}

export { LoginFormOrganism };