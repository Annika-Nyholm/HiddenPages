import { useNavigate } from 'react-router-dom';
import '../styles/pages/homePage.scss';

export const HomePage = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/quiz');
	}
	
	return (
		<>
			<section className='homepage-wrapper'>
				<article className='home-text'>
					<h2>Välkommen till din nästa bokresa!</h2>
					<p>
						Har du någonsin känt att du bläddrar genom boksidorna
						men ändå inte riktigt hittar rätt historia? Tänk om vi
						kunde hjälpa dig att hitta en bok som får dig att se
						världen på ett helt nytt sätt? En bok som är
						skräddarsydd för just dig och din nästa stora
						upptäcktsfärd.
					</p>
					<p>
						Vägen till den perfekta boken är inte alltid rak. Ibland
						krävs det en liten knuff, en chans att prova något
						oväntat. Det är här vårt quiz kommer in. Genom några
						enkla frågor kommer vi att guida dig till de böcker som
						väntar på att få ta plats i din bokhylla.
					</p>
					<p>
						Så, vad säger du? Är du redo att öppna dörren till nya
						världar och kanske hitta din nästa favorit? Ge oss några
						ledtrådar, och vi ger dig boken du inte visste att du
						behövde.
					</p>
					<p>Ta quizet och låt äventyret börja!</p>
					<button data-content='Till quizet' type='button' onClick={handleClick}>Till Quizet</button>
				</article>
			</section>
		</>
	);
};
