import {ReactNode} from "react";

export default function CreateProductsLayout({ children }: {
    children: ReactNode
}) {
        return (
            <div className="flex flex-col h-full flex-1 justify-center p-8 bg-stone-900">
                {children}
            </div>
        );
}
