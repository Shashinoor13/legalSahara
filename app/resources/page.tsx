import Footer from "../components/footer";
import Navbar from "../components/nav-bar";
import ResourcesList from "../components/resource-component";

export default function Page() {
	return (
		<>
		<Navbar/>
		<ResourcesList showAll={true}/>
		<Footer/>
		</>
	);
	}

