import { json, type RequestHandler } from '@sveltejs/kit';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

export const POST = (async ({ request }) => {
	const { content } = await request.json();
	const parsedContent = marked.parse(content);
	const sanitizedContent = DOMPurify.sanitize(parsedContent);
	// const highlightedContent = hljs.highlightAuto(sanitizedContent).value;
	return json({ content: sanitizedContent });
}) satisfies RequestHandler;
