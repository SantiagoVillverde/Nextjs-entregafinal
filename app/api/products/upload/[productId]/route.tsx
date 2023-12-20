import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';
import formidable from 'formidable';
import fs from 'fs';

const pipelineAsync = promisify(pipeline);

export async function POST(request: NextRequest): Promise<NextResponse | void> {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./public/uploads";
    form.keepExtensions = true;

    form.parse(request, async (err: Error, fields: formidable.Fields, files: formidable.Files) => {
        if (err) {
            res.status(500).json({ error: 'Error processing the file' });
            return;
        }

        // Mueve el archivo a la carpeta 'public/gamebazar'
        const oldPath = files.image.filepath;
        const newPath = path.join(process.cwd(), 'public/gamebazar', files.image.originalFilename);
        await fs.rename(oldPath, newPath);

        res.status(200).json({ fileName: files.image.originalFilename });
    });
}
