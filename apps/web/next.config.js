/**** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		serverActions: true,
	},
	headers: async () => {
		return [];
	},
};

module.exports = nextConfig;