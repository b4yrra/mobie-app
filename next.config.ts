import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  // your existing next.js options here
};

export default withSentryConfig(nextConfig, {
  tunnelRoute: "/monitoring",
});
