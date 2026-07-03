import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthCallback } from "@usehercules/auth/react";
import { useConvexAuth, useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import { api } from "@/convex/_generated/api.js";

export default function AuthCallback() {
    const navigate = useNavigate();
    const { isAuthenticated: isConvexAuthenticated } = useConvexAuth();
    const updateCurrentUser = useMutation(api.users.updateCurrentUser);

    const onSync = useCallback(async () => { await updateCurrentUser(); }, [updateCurrentUser]);
    const navigateHome = useCallback(() => navigate("/", { replace: true }), [navigate]);

    const { status, error, retry } = useAuthCallback({
        isBackendAuthenticated: isConvexAuthenticated,
        onSync,
        onSuccess: navigateHome,
        onNoAuthParams: navigateHome,
    });

    if (status === "error" && error) {
        return (
            <div className="flex flex-col items-center justify-center h-svh gap-6 px-4">
                <p className="text-destructive font-medium">Something went wrong</p>
                <p className="text-sm text-muted-foreground max-w-md text-center">{error}</p>
                <div className="flex gap-3">
                    <button onClick={navigateHome} className="h-9 px-4 rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer">
                        Return home
                    </button>
                    <button onClick={retry} className="h-9 px-4 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer">
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-svh gap-4">
            <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
    );
}
