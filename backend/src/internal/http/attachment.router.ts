import * as path from 'path';
import { MD5 } from 'crypto-js';
import { sendJson } from './utils';
import { HttpStatus } from '../../pkg/http-status';
import * as zlib from 'zlib';
import { readFileSync } from 'fs';
import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyReply,
    FastifyRequest,
} from 'fastify';
import multer from 'fastify-multer';
import { File, FileFilterCallback } from 'fastify-multer/lib/interfaces';
import sharp from 'sharp';

export class AttachmentRouter {
    public router(
        instance: FastifyInstance,
        options: FastifyPluginOptions,
        done: () => void,
    ) {
        instance.register(multer.contentParser);
        instance.post(
            '/api/v1/attachment/upload/img',
            {
                preHandler: this.upload.array('image'),
            },
            this.uploadImage.bind(this),
        );
        instance.get(
            '/api/v1/attachment/img/:filepath',
            this.getByFilepath.bind(this),
        );
        done();
    }

    private maxSizeImage = 5 * 1000 * 1000;

    private upload = multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: this.maxSizeImage },
        fileFilter: (
            req: FastifyRequest,
            file: File,
            cb: FileFilterCallback,
        ) => {
            const filetypes = /jpeg|jpg|png|webp/;
            const mimetype = filetypes.test(file.mimetype);

            const extname = filetypes.test(
                path.extname(file.originalname).toLowerCase(),
            );

            if (mimetype && extname) {
                return cb(null, true);
            }

            cb(
                new Error(
                    'File upload only supports the following filetypes - ' +
                        filetypes,
                ),
            );
        },
    });

    private async uploadImage(req: FastifyRequest, reply: FastifyReply) {
        const answ = [];
        //@ts-ignore
        const files: File[] | undefined = req.files;

        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const filename =
                    MD5(file.originalname).toString() +
                    path.extname(file.originalname);

                const pathFile = `./upload/img/${filename}`;
                await sharp(file.buffer).resize(300, 300).toFile(pathFile);

                answ.push({
                    originalName: file.originalname,
                    currentName: filename,
                });
            }
        }

        sendJson(
            reply,
            {
                files: answ,
            },
            HttpStatus.OK,
        );
    }

    private async getByFilepath(
        req: FastifyRequest<{
            Params: {
                filepath: string;
            };
        }>,
        reply: FastifyReply,
    ) {
        const filepath = path.resolve(
            process.cwd(),
            'upload',
            'img',
            req.params.filepath,
        );

        const file = readFileSync(filepath);
        const gzip = zlib.gzipSync(file);

        reply
            .header('Content-Length', gzip.length)
            .header('Content-Encoding', 'gzip')
            .header('Connection', 'close');

        reply.type('image/' + path.extname(filepath).slice(1)).send(gzip);
    }
}
