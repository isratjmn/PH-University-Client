import MainLayoutt from "./components/Layouts/MainLayoutt";
import ProtectedRoutes from "./components/Layouts/ProtectedRoutes";

function App() {
	return (
		<ProtectedRoutes role={undefined}>
			<MainLayoutt />
		</ProtectedRoutes>
	);
}
export default App;
