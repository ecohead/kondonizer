import { nothing, TemplateResult } from "lit";
import { Media, Placeholder } from "../types.js";
export declare function displayTruncatedFilename(media: Media): TemplateResult<1>;
export declare function hasBuiltinPreview(filetype: string, previewList: string[]): boolean;
export declare function renderThumbnail({ media, placeholders, cssClasses, listView, previewList }: {
    media: Media;
    placeholders: Placeholder[];
    cssClasses: {
        thumbnail: string;
        name: string;
    };
    listView?: boolean;
    previewList: string[];
}): TemplateResult<1> | typeof nothing;
