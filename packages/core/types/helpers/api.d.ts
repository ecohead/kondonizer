import { DeleteMediaProps, ListMediasProps, Media, ShowMediaProps, UpdateMediaProps, UploadMediaProps } from "../types.js";
export default class API {
    private static generateApiEndpoint;
    static getMedia({ el, params, config }: ShowMediaProps): Promise<Media | null>;
    static getList({ el, params, config }: ListMediasProps): Promise<Array<Media> | null>;
    static updateMedia({ el, media, config, formData, params }: UpdateMediaProps): Promise<Media | null>;
    static deleteMedia({ el, media, config, params }: DeleteMediaProps): Promise<boolean>;
    static uploadFile({ el, file, config, params }: UploadMediaProps): Promise<Media | null>;
}
