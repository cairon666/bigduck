import {Request, Response, Router} from "express";
import * as path from "path";
import {MD5} from "crypto-js";
import {sendJson} from "./utils";
import {HttpStatus} from "../../pkg/http-status";
import multer from "multer";
import sharp from "sharp";
import * as zlib from "zlib";
import {readFileSync} from "fs";

export class AttachmentRouter {
    // public constructor() {
    // }

    public router(): Router {
        const r = Router();


        r.post('/api/v1/attachment/upload/img', this.upload.array("image"), this.uploadImage.bind(this));
        r.get('/api/v1/attachment/img/:filepath', this.getByFilepath.bind(this));

        return r;
    }

    private maxSizeImage = 5 * 1000 * 1000

    public upload = multer({
        storage: multer.memoryStorage(),
        limits: {fileSize: this.maxSizeImage},
        fileFilter: function (req, file, cb) {
            const filetypes = /jpeg|jpg|png|webp/;
            const mimetype = filetypes.test(file.mimetype);

            const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

            if (mimetype && extname) {
                return cb(null, true);
            }

            cb(new Error("File upload only supports the following filetypes - " + filetypes));
        }
    })

    private async uploadImage(req: Request, resp: Response) {
        const answ = []

        if (req.files && Array.isArray(req.files)) {
            for (let i = 0; i < req.files.length; i++) {
                const file = req.files[i]
                const filename = MD5(file.originalname).toString() + path.extname(file.originalname)

                const pathFile = `./upload/img/${filename}`;
                await sharp(file.buffer)
                    .resize(300, 300)
                    .toFile(pathFile);

                answ.push({
                    originalName: file.originalname,
                    currentName: filename,
                })
            }
        }

        sendJson(resp, {
            files: answ,
        }, HttpStatus.OK)
    }

    private async getByFilepath(req: Request, resp: Response) {
        try {
            const filepath = path.resolve(process.cwd(), 'upload', 'img', req.params.filepath)

            const file = readFileSync(filepath)
            const gzip = zlib.gzipSync(file)


            resp.writeHead(200, {
                'Content-Length': gzip.length,
                'Content-Encoding': 'gzip',
                "Connection": "close",
                'Connection-Type': 'image/' + path.extname(filepath).slice(1),
            })

            const chunkLimit = 16 * 1024 // some clients choke on huge responses
            const chunkCount = Math.ceil(gzip.length / chunkLimit)
            for (let i = 0; i < chunkCount; i++) {
                if (chunkCount > 1) {
                    const chunk = gzip.slice(i * chunkLimit, (i + 1) * chunkLimit)
                    resp.write(chunk)
                } else {
                    resp.write(gzip)
                }
            }
            resp.end()
        } catch (e) {
            resp.status(HttpStatus.NOT_FOUND).end()
        }

    }

}