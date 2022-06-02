import { html, nothing, TemplateResult } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { Media, Placeholder } from "../types.js";

export function displayTruncatedFilename(media: Media): TemplateResult<1> {
  const extensionRegex = media.filename.match(/(?<name>.+)\.(?<ext>[\d\w]+)$/);

  if (!extensionRegex || !extensionRegex.groups || !extensionRegex.groups.name || !extensionRegex.groups.ext) {
    return html`${media.filename}`;
  }

  return html`<span class="truncated">${extensionRegex.groups.name}</span>.${extensionRegex.groups.ext}`;
}

export function hasBuiltinPreview(filetype: string, previewList: string[]): boolean {
  return previewList.find(type => type === filetype) !== undefined;
}

export function renderThumbnail({
  media,
  placeholders,
  cssClasses,
  listView = false,
  previewList
}: {
  media: Media,
  placeholders: Placeholder[],
  cssClasses: { thumbnail: string, name: string },
  listView?: boolean,
  previewList: string[]
}): TemplateResult<1>|typeof nothing {
  if (hasBuiltinPreview(media.filetype, previewList)) {
    return html`
        <figure class=${`${cssClasses.thumbnail} --hasPreview ${media.filetype === 'image/svg' ? '--contain' : ''}`} title=${media.filename}>
          <img src=${media.filepath} alt=${ifDefined(media.altText)} loading="lazy" />
          ${listView ? html`<span class=${cssClasses.name}>${displayTruncatedFilename(media)}</span>` : nothing}
        </figure>
      `;
  }

  const hasPlaceholder = placeholders.find(placeholder => placeholder.filetypes.includes(media.filetype));
  if (hasPlaceholder && hasPlaceholder.svg) {
    return html`
        <figure class=${cssClasses.thumbnail} title=${media.filename}>
          <div class=${`${cssClasses.thumbnail}_svg`}>${unsafeHTML(decodeURIComponent(hasPlaceholder.svg))}</div>
          <span class=${cssClasses.name}>${displayTruncatedFilename(media)}</span>
        </figure>
      `;
  }

  if (hasPlaceholder && hasPlaceholder.imageUrl) {
    return html`
        <figure class=${cssClasses.thumbnail} title=${media.filename}>
          <img src=${hasPlaceholder.imageUrl} alt=${ifDefined(media.altText)} loading="lazy" />
          ${listView ? html`<span class=${cssClasses.name}>${displayTruncatedFilename(media)}</span>` : nothing}
        </figure>
      `;
  }

  const genericPlaceholder = placeholders.find(placeholder => placeholder.filetypes.includes('*'));
  if (!genericPlaceholder || !genericPlaceholder.svg) return nothing;

  return html`
      <figure class=${cssClasses.thumbnail} title=${media.filename}>
        <div class=${`${cssClasses.thumbnail}_svg`}>${unsafeHTML(decodeURIComponent(genericPlaceholder.svg))}</div>
        <span class=${cssClasses.name}>${displayTruncatedFilename(media)}</span>
      </figure>
    `;
}
