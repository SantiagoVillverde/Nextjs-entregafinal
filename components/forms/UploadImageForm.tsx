'use client'
import {FC, useCallback} from "react";
import {useDropzone} from 'react-dropzone';

interface UploadImageFormProps {
    productId: string;
}

const UploadImageForm: FC<UploadImageFormProps> = ({productId}) => {

    const onUpload = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0]; // Tomar el primer archivo

        // Crear un FormData para enviar el archivo
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`/api/products/upload/${productId}`, { // URL del endpoint
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log("Imagen cargada con éxito");
                // Manejar respuesta exitosa
            } else {
                console.error("Error al cargar la imagen");
                // Manejar error en la carga
            }
        } catch (error) {
            console.error("Error en la carga", error);
            // Manejar error en la petición
        }
    }, [productId]);

    const {getRootProps, getInputProps, acceptedFiles, fileRejections} = useDropzone({
        maxFiles: 1,
        onDropAccepted: onUpload,
    });

    // Renderización de archivos aceptados y rechazados
    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path} className="text-sm text-gray-600">
            {file.path} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({file, errors}) => (
        <li key={file.path} className="text-sm text-red-500">
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => <li key={e.code} className="text-xs">{e.message}</li>)}
            </ul>
        </li>
    ));

    return (
        <section className="container mx-auto p-4">
            <div {...getRootProps({className: 'dropzone bg-gray-100 border-dashed border-2 border-gray-300 rounded p-4 text-center cursor-pointer'})}>
                <input {...getInputProps()} />
                <p className="text-gray-700">Arrastra archivos aquí, o haz clic para seleccionar archivos</p>
                <em className="text-xs text-gray-500">(Solo se puede subir 1 archivo)</em>
            </div>
            <aside className="mt-4">
                <h4 className="text-lg font-semibold">Archivos Aceptados</h4>
                <ul>{acceptedFileItems}</ul>
                <h4 className="text-lg font-semibold mt-2">Archivos Rechazados</h4>
                <ul>{fileRejectionItems}</ul>
            </aside>
        </section>
    )
}

export default UploadImageForm;
