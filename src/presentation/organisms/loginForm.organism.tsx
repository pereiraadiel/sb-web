import { ComponentProps, FormEvent, useState } from "react";

import { ButtonAtom } from "@/presentation/atoms/button.atom";
import { InputAtom } from "@/presentation/atoms/input.atom";
import { FormMolecule } from "@/presentation/molecules/form.molecule";
import { cn } from "@/core/lib/utils";

type LoginFormOrganism = ComponentProps<'form'>;

const LoginFormOrganism: React.FC<LoginFormOrganism> = ({className, ...props}) => {
	const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
	const [code, setCode] = useState("");

  const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false);
				setCode('');
      }, 1000)
    }, 2000)
  }

	return (
		<FormMolecule {...props} onSubmit={handleSubmit} className={cn("w-80 p-2 rounded-2xl", className)}>
			<InputAtom label="Código" type="text" placeholder="Digite o código" value={code} onChange={e => setCode(e.target.value)}/>
			<ButtonAtom className="mt-2" success={success} loading={loading}>Entrar</ButtonAtom>
		</FormMolecule>
	)
}

export { LoginFormOrganism };