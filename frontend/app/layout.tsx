import AuthGuard from "@/guards/AuthGuard";
import Nav from "../components/Nav";
import "./globals.scss";

export const metadata = {
  title: "Dooit",
  description: "A powerful kanban board for the best. Doo it!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dooit-theme">
      <body className="text-dblack">
        <AuthGuard publicRoutes={["/"]} unprotectedRoutes={["/login", "/signup"]}>
          <>
            <Nav />
            <main>
              {children}
            </main>
          </>
        </AuthGuard>
      </body>
    </html>
  );
}
