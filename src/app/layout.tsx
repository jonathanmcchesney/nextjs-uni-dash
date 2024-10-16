import type { Metadata } from "next";
import "./globals.scss";
import ThemeProviderClient from "@/components/ThemeProviderClient/ThemeProviderClient";
import ApolloProviderWrapper from "@/components/ApolloProviderWrapper/ApolloProviderWrapper";
import { cookies } from "next/headers";

const title = "Uni-Dash";

export const metadata: Metadata = {
  title,
  description: "Your one-stop platform to manage your university life—track your progress, stay organized, and access helpful resources.",
};

const RootLayout = ({ children, pageProps }: any): JSX.Element => {
  const themeCookie = cookies().get("theme")?.value || "light";

  return (
    <html lang="en">
      <body>
        <ApolloProviderWrapper pageProps={pageProps}>
          <ThemeProviderClient initialTheme={themeCookie}>
            {children}
          </ThemeProviderClient>
        </ApolloProviderWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
