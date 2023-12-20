import {FC} from "react";
import UploadImageForm from "@/components/forms/UploadImageForm";

export const dynamic = 'force-dynamic';

interface UploadImagePageProps {
    params: {
        productId: string;
    };
}

const UploadImagePage: FC<UploadImagePageProps> = async ({params}) => {

    return (
        <>
            <UploadImageForm productId={params.productId} />
        </>
    )
}

export default UploadImagePage;
