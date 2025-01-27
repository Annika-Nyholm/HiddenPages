import '../styles/pages/faqPage.scss';

export const FaqPage = () => {
	return (
		<>
			<section className='faq-wrapper'>
				<article className='faq-item'>
					<h3>Vad är Hidden Pages?</h3>
					<p>
						- Hidden Pages är en bokrekommendationsplattform där du
						får ta ett roligt och personligt quiz för att hitta nya
						böcker att läsa! Baserat på dina svar får du
						skräddarsydda boktips och kan klicka vidare för mer
						info.
					</p>
				</article>

				<article className='faq-item'>
					<h3>Hur fungerar quizet?</h3>
					<p>
						Quizet tar dig på en liten resa där du får svara på 8
						enkla frågor. Baserat på
						dina svar, kommer vi att ge dig bokrekommendationer som
						är skräddarsydda för dig. Det är snabbt, enkelt, roligt och ger
						dig ett personligt urval av böcker att upptäcka!
					</p>
				</article>

				<article className='faq-item'>
					<h3>Vad händer efter att jag har tagit quizet?</h3>
					<p>
						När du är klar med quizet får du en lista med böcker som
						passar din smak. Du kan då välja att läsa mer om
						böckerna och få detaljer om dem genom att klicka på
						bokkortet.
					</p>
				</article>

				<article className='faq-item'>
					<h3>Kan jag ta om quizet?</h3>
					<p>
						Absolut! Om du vill prova på quizet igen för att se om
						du får olika rekommendationer, kan du göra det när som
						helst. Vem vet, kanske hittar du något nytt nästa gång!
					</p>
				</article>

				<article className='faq-item'>
					<h3>Kan jag se detaljer om böckerna?</h3>
					<p>
						Ja! När du får en bokrekommendation kan du klicka på
						bokkortet för att läsa mer om boken. Du får information
						som titel, författare och en kort beskrivning. Du kan
						också klicka vidare till Google Books för att hitta mer
						information.
					</p>
				</article>

				<article className='faq-item'>
					<h3>
						Vad gör jag om jag inte gillar mina bokrekommendationer?
					</h3>
					<p>
						Om boktipsen inte var riktigt din stil, ta quizet igen!
						Vi vet att smaken kan vara föränderlig, så ge det gärna
						en ny chans.
					</p>
				</article>
			</section>
		</>
	);
};
