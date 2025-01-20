import { Link } from 'react-router-dom';
import '../styles/pages/notFoundPage.scss';

export const NotFoundPage = () => {
    return (
		<section className="notfound-container">
			<h1 className="notfound-title">404: Sidan är på vift!</h1>
			<p className="notfound-description">
				Vi letade överallt – i bokhyllorna, under soffkuddarna och till och med i kylskåpet – men sidan du söker verkar ha gömt sig riktigt bra.
			</p>
			<img 
				src="/funny-bookworm.webp"
                width={300}
                height={350} 
				alt="En förvirrad bookworm" 
				className="notfound-image"
			/>
			<p className="notfound-suggestion">
				Vad sägs om att vi börjar om från <Link to="/">hemsidan</Link>, eller så kan du utforska vårt <Link to="/quiz">Quiz</Link> istället?
			</p>
			<p className="notfound-footer">PS: Om du hittar sidan, säg åt den att komma hem!</p>
		</section>
	);

}