import { Header } from "@/widgets/header/ui/Header";
import { ListDo } from "@/widgets/list-do";

const HomePage = () => {
	return (
		<main className="max-w-[400px] w-full flex flex-col items-center">
			<Header />
			<ListDo />
		</main>
	);
};

export default HomePage;
