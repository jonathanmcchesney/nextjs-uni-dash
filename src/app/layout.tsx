import type { Metadata } from "next";
import "./globals.scss";
import ThemeProviderClient from "@/components/ThemeProviderClient/ThemeProviderClient";
import ApolloProviderWrapper from "@/components/ApolloProviderWrapper/ApolloProviderWrapper";
import SimpleBreadcrumbs from "@/components/SimpleBreadcrumbs/SimpleBreadcrumbs";
import { cookies } from "next/headers";

const title = "Recommendation App";

export const metadata: Metadata = {
  title,
  description: "Demo App",
};

const RootLayout = ({ children, pageProps }: any): JSX.Element => {
  const themeCookie = cookies().get("theme")?.value || "light";

  return (
    <html lang="en">
      <body>
        <ThemeProviderClient initialTheme={themeCookie}>
          <ApolloProviderWrapper pageProps={pageProps}>
            <SimpleBreadcrumbs />
            {children}
          </ApolloProviderWrapper>
        </ThemeProviderClient>
      </body>
    </html>
  );
};

export default RootLayout;
