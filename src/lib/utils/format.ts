import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

export const formatContent = (content: string) => {
	const parsedContent = marked.parse(content);
	const sanitizedContent = sanitizeHtml(parsedContent);
	return sanitizedContent;
};

export const sanitizeContent = (content: string) => {
	const sanitizedContent = sanitizeHtml(content);
	return sanitizedContent;
};
