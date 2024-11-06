import Footer from "../components/footer";
import Navbar from "../components/nav-bar";
import NewsList from "../components/news-component";

export default function Page() {
	return (
		<>
		<Navbar/>
		<NewsList showAll={true}/>
		<Footer/>
		</>
	);
	}

