import {ReactNode} from "react";

export default function DashboardLayout({ children,}: {
    children: ReactNode
}) {
    return (
        <div className="container mx-auto mt-10 md:p-5">
            {children}
        </div>
    )
}
