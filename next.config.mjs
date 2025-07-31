/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://gnssfrgdrjxyuqozdzhl.supabase.co/storage/v1/object/public/cabin-images//**"
      ),
      new URL("https://lh3.googleusercontent.com/**"),
    ],
  },
};

export default nextConfig;
