const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!BASE_URL) throw new Error('should have NEXT_PUBLIC_BACKEND_URL in the environment variables');

export { BASE_URL };
