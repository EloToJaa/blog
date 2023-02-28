type LoadFetch = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

export default LoadFetch;
