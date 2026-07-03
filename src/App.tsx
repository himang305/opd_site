import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { useEffect } from "react";
import Index from "./pages/Index.tsx";

function NotFound() {
    const location = useLocation();
    useEffect(() => {
        console.error("404:", location.pathname);
    }, [location.pathname]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-6">
                <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
                <h2 className="text-2xl font-semibold">Page Not Found</h2>
                <p className="text-muted-foreground">This page does not exist.</p>
                <Link to="/" className="inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    Return to Home
                </Link>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
