import { cn } from "@/core/lib/utils";
import { ToastAtom } from "@/presentation/atoms/toast.atom";
import { useToast } from "@/domain/hooks/toast.hook";

type ToastProviderMolecule =  React.ComponentProps<"div">;

const ToastProviderMolecule: React.FC<ToastProviderMolecule> = ({
	className,
	ref,
	...props
}) => {
	const { toasts, removeToast } = useToast();

	return (
		<div className={cn("w-72 flex flex-col justify-start gap-2 p-2 absolute top-2 right-2", className)} ref={ref} {...props}>
			{
				toasts.map(toast => (
					<ToastAtom
						key={toast.id}
						id={toast.id}
						text={toast.text}
						variant={toast.variant}
						onClose={(id) => removeToast(id)}
					/>
				))
			}
		</div>
	);
}

export { ToastProviderMolecule };