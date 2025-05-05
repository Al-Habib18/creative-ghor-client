/** @format */

import { Loader2 } from "lucide-react";

const Loading = ({ message = "Loading..." }: { message?: string }) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-10 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-sm text-muted-foreground">{message}</p>
        </div>
    );
};

export default Loading;
