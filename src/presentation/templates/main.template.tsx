type MainTemplate = {
	children: React.ReactNode
}

const MainTemplate: React.FC<MainTemplate> = ({children}) => {
	return (
		<main className="w-full flex-1 flex justify-center">
			{children}
		</main>
	)
}

export { MainTemplate };