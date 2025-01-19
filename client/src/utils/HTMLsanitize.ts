import DOMPurify from 'dompurify';

export const sanitizeHtml = (html: string): string => {
	let sanitizedHtml = DOMPurify.sanitize(html);

	const quoteRegex = /“([^”]*)”(?:\s*[-–—]\s*([^.!?]+))?/g;
	const quotes: { text: string; attribution?: string }[] = [];

	sanitizedHtml = sanitizedHtml.replace(
		quoteRegex,
		(_, quote, attribution) => {
			const placeholder = `[[QUOTE${quotes.length}]]`;
			quotes.push({ text: quote, attribution: attribution?.trim() });
			return placeholder;
		}
	);

	sanitizedHtml = sanitizedHtml
		.replace(/<b>/g, '<strong>')
		.replace(/<\/b>/g, '</strong>')
		.replace(/<i>/g, '<em>')
		.replace(/<\/i>/g, '</em>')
		.replace(/<br\s*\/?>/g, '</p><p>');

	const sentenceRegex = /([^.!?]+[.!?]+)(?=\s|$)/g;
	sanitizedHtml = sanitizedHtml.replace(sentenceRegex, (sentence) => {
		const trimmed = sentence.trim();

		if (trimmed === '.') {
			return ' ';
		}

		if (trimmed.endsWith('P.D.')) {
			return `<p>${trimmed}</p>`;
		}
		return `<p>${trimmed}</p>`;
	});

	sanitizedHtml = sanitizedHtml.replace(/\[\[QUOTE(\d+)\]\]/g, (_, index) => {
		const { text, attribution } = quotes[+index];
		return attribution
			? `<p class="quote">“${text}”<span class="attribution"> — ${attribution}</span></p>`
			: `<p class="quote">“${text}”</p>`;
	});

	if (!sanitizedHtml.startsWith('<p>')) {
		sanitizedHtml = `<p>${sanitizedHtml}`;
	}
	if (!sanitizedHtml.endsWith('</p>')) {
		sanitizedHtml = `${sanitizedHtml}</p>`;
	}

	return sanitizedHtml;
};
