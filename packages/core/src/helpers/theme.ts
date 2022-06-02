import { css, CSSResult } from "lit";

export function useResetStyles() {
  return css`
    *, *::before, *::after {
      box-sizing: border-box;
    }

    * {
      margin: 0;
    }

    img, picture, video, canvas, svg {
      display: block;
      max-inline-size: 100%;
    }

    input, button, textarea, select {
      font: inherit;
    }

    p, h1, h2, h3, h4, h5, h6 {
      overflow-wrap: break-word;
    }

    @media (prefers-reduced-motion: reduce) {
      html:focus-within {
        scroll-behavior: auto;
      }

      *,
      *::before,
      *::after {
        transition-duration: 0.01ms !important;
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
      }
    }
  `
}

export function useButtonStyles() {
  return css`
    .kondoButton {
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      padding: var(--kondo-button-padding, .5rem 1rem);
      border: 0;
      line-height: 1;
      border-radius: var(--kondo-button-radius, 9999px);
      font-size: var(--kondo-button-font-size, var(--kondo-ds-default-font-size));
      gap: .25rem;
      background: var(--kondo-button-background, var(--kondo-ds-colors-primary));
      color: var(--kondo-button-color, var(--kondo-ds-colors-neutral-100));
      cursor: pointer;
    }

    .kondoButton:focus-visible {
      outline: 2px solid var(--kondo-default-outline-color);
      outline-offset: 2px;
    }

    .kondoButton.--outline {
      background: var(--kondo-outline-button-background, transparent);
      color: var(--kondo-outline-button-color, var(--kondo-ds-colors-primary));
      border: var(--kondo-outline-button-border-color, 2px solid var(--kondo-ds-colors-primary));
    }

    .kondoButton.--success {
      background: var(--kondo-success-button-background, var(--kondo-ds-colors-success));
      color: var(--kondo-success-button-color, var(--kondo-ds-colors-neutral-050));
    }

    .kondoButton.--danger {
      background: var(--kondo-danger-button-background, var(--kondo-ds-colors-danger));
      color: var(--kondo-danger-button-color, var(--kondo-ds-colors-neutral-050));
      border: var(--kondo-danger-button-border-color, 2px solid var(--kondo-ds-colors-danger));
    }

    .kondoButton.--square {
      padding: 0;
      inline-size: 35px;
      block-size: 35px;
      justify-content: center;
      border-radius: var(--kondo-square-button-radius, .25rem);
      background: var(--kondo-square-button-background, var(--kondo-ds-colors-white));
      color: var(--kondo-square-button-color, var(--kondo-ds-colors-neutral-500));
      border: var(--kondo-square-button-border, 2px solid var(--kondo-ds-colors-neutral-200));
    }
  `
}

export function useRootStyles(): CSSResult[] {
  return [
    useResetStyles(),
    useButtonStyles(),
    css`
      :host {
        --kondo-ds-colors-primary: #4c1d95;
        --kondo-ds-colors-info: #2563eb;
        --kondo-ds-colors-warning: #f59e0b;
        --kondo-ds-colors-danger: #dc2626;
        --kondo-ds-colors-success: #16a34a;
        --kondo-ds-colors-neutral-050: #f8fafc;
        --kondo-ds-colors-neutral-100: #f1f5f9;
        --kondo-ds-colors-neutral-200: #e2e8f0;
        --kondo-ds-colors-neutral-300: #cbd5e1;
        --kondo-ds-colors-neutral-500: #64748b;
        --kondo-ds-colors-neutral-700: #334155;
        --kondo-ds-colors-neutral-900: #0f172a;
        --kondo-ds-colors-white: #ffffff;
        --kondo-ds-colors-black: #000000;
        --kondo-ds-default-font-size: .9rem;

        --kondo-default-outline-color: #38bdf8;
        --kondo-default-modal-overlay-color: hsla(223, 100%, 5%, .5);

        display: block;
        border: 2px solid var(--kondo-root-border-color, var(--kondo-ds-colors-neutral-300));
        border-radius: var(--kondo-root-border-radius, .5rem);
        background: var(--kondo-root-background, var(--kondo-ds-colors-white));
        padding: 1rem;
      }
    `
  ];
}

export function usePreviewStyles(): CSSResult[] {
  return [
    useResetStyles(),
    css`
      :host {
        inline-size: 100%;
        display: block;
        border-radius: var(--kondo-preview-radius, .25rem);
        color: var(--kondo-preview-text-color, var(--kondo-ds-colors-neutral-500));
        background-color: var(--kondo-preview-background-color, var(--kondo-ds-colors-neutral-100));
      }

      :host .kondo-previewContainer {
        inline-size: 100%;
        margin-block-start: 1rem;
        display: grid;
        padding: .5rem;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: var(--kondo-preview-gap, .5rem);
      }

      :host .kondo-previewContainer.--empty {
        place-items: center;
        text-align: center;
        grid-template-columns: 1fr;
        block-size: 150px;
      }

      :host .kondo-previewContainer.--empty b {
        font-weight: 500;
      }

      :host .kondo-previewItem {
        display: block;
        position: relative;
        border-radius: var(--kondo-preview-item-radius, .25rem);
      }

      :host .kondo-previewItem:focus-visible {
        outline: 2px solid var(--kondo-default-outline-color);
        outline-offset: 2px;
      }

      :host .kondo-previewItem_actions {
        position: absolute;
        inline-size: 2rem;
        block-size: 2rem;
        border: 0;
        border-radius: var(--kondo-preview-item-delete-radius, 9999px);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: .2s ease;
      }

      :host .kondo-previewItem_actions:focus-visible {
        outline: 2px solid var(--kondo-default-outline-color);
        outline-offset: 2px;
      }

      :host .kondo-previewItem:hover > .kondo-previewItem_actions,
      :host .kondo-previewItem:focus-within > .kondo-previewItem_actions {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
      }

      :host .kondo-previewItem_actions.--remove {
        inset-block-start: .5rem;
        inset-inline-end: .5rem;
        color: var(--kondo-preview-item-delete-color, var(--kondo-ds-colors-neutral-050));
        background: var(--kondo-preview-item-delete-background, var(--kondo-ds-colors-danger));
      }

      :host .kondo-previewItem_actions.--copy {
        inset-block-end: .5rem;
        inset-inline-end: .5rem;
        color: var(--kondo-preview-item-copy-color, var(--kondo-ds-colors-neutral-050));
        background: var(--kondo-preview-item-copy-background, var(--kondo-ds-colors-info));
      }

      :host .kondo-previewItem_thumbnail {
        inline-size: 100%;
        block-size: auto;
        aspect-ratio: 16/10;
        object-fit: cover;
        object-position: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;
        border-radius: var(--kondo-preview-item-radius, .25rem);
        background: var(--kondo-preview-item-background, var(--kondo-ds-colors-white));
        border: var(--kondo-preview-item-border, 2px solid var(--kondo-ds-colors-neutral-200));
        overflow: hidden;
      }

      :host .kondo-previewItem_thumbnail img {
        inline-size: 100%;
        block-size: 100%;
        object-fit: cover;
        object-position: center;
      }

      :host .kondo-previewItem_thumbnail.--contain img {
        inline-size: 50%;
        block-size: 50%;
        object-fit: contain;
        object-position: center;
      }

      :host .kondo-previewItem_thumbnail:not(.--hasPreview) svg {
        max-inline-size: 32px;
        block-size: auto;
      }

      :host .kondo-previewItem_thumbnailName {
        font-size: var(--kondo-preview-item-font-size, .75rem);
        display: inline-flex;
        align-items: baseline;
        justify-content: center;
        text-align: center;
      }

      :host .kondo-previewItem_thumbnailName .truncated {
        max-inline-size: 120px;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `
  ];
}

export function useModalStyles(): CSSResult[] {
  return [useResetStyles(), css`
    :host {
      isolation: isolate;
      position: fixed;
      inset: 0;
      z-index: 300;
      display: block;
    }

    :host .kondoModal_container {
      position: relative;
      inline-size: 100%;
      block-size: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    :host .kondoModal_overlay {
      position: absolute;
      inset: 0;
      background-color: var(--kondo-modal-overlay-color, var(--kondo-default-modal-overlay-color));
      z-index: 0;
    }

    :host .kondoModal_modal {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr auto;
      grid-template-areas:
          "kondo_header"
          "kondo_main"
          "kondo_footer";
      position: relative;
      z-index: 2;
      inline-size: 100%;
      max-inline-size: 1000px;
      block-size: 100%;
      max-block-size: 600px;
      background: var(--kondo-modal-background, var(--kondo-ds-colors-neutral-050));
      border-radius: var(--kondo-modal-radius, .5rem);
      overflow: hidden;
    }

    :host .kondoModal_modal.--noSidebar kondo-modal-sidebar {
      display: none;
    }

    @media only screen and (min-width: 800px) {
      :host .kondoModal_modal {
        grid-template-columns: 1fr var(--kondo-sidebar-width, 250px);
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
          "kondo_header kondo_sidebar"
          "kondo_main kondo_sidebar"
          "kondo_footer kondo_footer";
      }

      :host .kondoModal_modal.--noSidebar {
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
          "kondo_header kondo_header"
          "kondo_main kondo_main"
          "kondo_footer kondo_footer";
      }
    }
  `];
}

export function useModalSidebarStyles(): CSSResult[] {
  return [useResetStyles(), css`
    :host {
      display: none;
    }

    @media only screen and (min-width: 800px) {
      :host {
        display: block;
        grid-area: kondo_sidebar;
        border-inline-start: var(--kondo-sibebar-border, 2px solid var(--kondo-ds-colors-neutral-100));
        padding: 1rem .5rem .5rem .5rem;
        max-block-size: 100%;
      }

      :host .kondo-sidebarEditMessage {
        inline-size: 100%;
        block-size: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: var(--kondo-ds-colors-neutral-500);
        font-size: .9rem;
      }
    }
  `];
}

export function useEditMediaStyles(): CSSResult[] {
  return [
    useResetStyles(),
    useButtonStyles(),
    css`
      :host {
        display: none;
      }

      @media only screen and (min-width: 800px) {
        :host {
          display: block;
          block-size: 100%;
          max-block-size: 100%;
        }

        :host .kondo-editMedia {
          inline-size: 100%;
          block-size: 100%;
          max-block-size: 100%;
          display: flex;
          flex-direction: column;
        }

        :host .kondo-editMedia_header {
          display: grid;
          gap: .5rem;
        }

        :host .kondo-editMedia_headerTitle {
          font-size: 1.1rem;
          color: var(--kondo-edit-title-color, var(--kondo-ds-colors-neutral-500));
          font-weight: 500;
          text-align: center;
        }

        :host .kondo-editMedia_headerActions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: .5rem;
        }

        :host .kondo-editMedia_delete,
        :host .kondo-editMedia_close {
          inline-size: 2.5rem;
          block-size: 2.5rem;
          flex: none;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--kondo-edit-buttons-background, transparent);
          border-radius: var(--kondo-edit-buttons-radius, 9999px);
          cursor: pointer;
        }

        :host .kondo-editMedia_delete {
          color: var(--kondo-edit-delete-color, var(--kondo-ds-colors-danger));
          border: var(--kondo-edit-delete-border, 2px solid var(--kondo-ds-colors-danger));
        }

        :host .kondo-editMedia_close {
          color: var(--kondo-edit-close-color, var(--kondo-ds-colors-info));
          border: var(--kondo-edit-close-border, 2px solid var(--kondo-ds-colors-info));
        }

        :host .kondo-editMedia_save {
          padding: .5rem;
          inline-size: 100%;
          display: flex;
          column-gap: .5rem;
          align-items: center;
          justify-content: center;
          color: var(--kondo-edit-save-color, var(--kondo-ds-colors-primary));
          background: var(--kondo-edit-save-background, transparent);
          border-radius: var(--kondo-edit-buttons-radius, 9999px);
          border: var(--kondo-edit-save-border, 2px solid var(--kondo-ds-colors-primary));
          font-size: var(--kondo-edit-save-font-size, var(--kondo-ds-default-font-size));
          cursor: pointer;
          flex: 1;
        }

        :host .kondo-editMedia_save:disabled {
          color: var(--kondo-edit-save-disabled-color, var(--kondo-ds-colors-neutral-300));
          border: var(--kondo-edit-save-disabled-border, 2px solid var(--kondo-ds-colors-neutral-300));
          cursor: not-allowed;
        }

        :host .kondo-editMedia_delete:focus-visible,
        :host .kondo-editMedia_close:focus-visible,
        :host .kondo-editMedia_save:focus-visible {
          outline: 2px solid var(--kondo-default-outline-color);
          outline-offset: 2px;
        }

        :host .kondo-editMedia_form {
          margin-block-start: 1rem;
          align-items: start;
          display: grid;
          grid-auto-rows: max-content;
          flex-grow: 1;
          overflow-y: auto;
        }

        :host .kondo-editMedia_form > * + *:not(.kondo-editMedia_details) {
          margin-block-start: 1rem;
        }

        :host .kondo-editItem_thumbnail {
          inline-size: 100%;
          block-size: auto;
          object-fit: cover;
          object-position: center;
          border-radius: var(--kondo-edit-thumbnail-radius, .25rem);
          background: var(--kondo-edit-thumbnail-background, var(--kondo-ds-colors-white));
          border: var(--kondo-edit-thumbnail-border, 2px solid var(--kondo-ds-colors-neutral-300));
          color: var(--kondo-edit-thumbnail-color, var(--kondo-ds-colors-neutral-500));
        }

        :host .kondo-editItem_thumbnail.--hasPreview > * {
          inline-size: 100%;
          block-size: auto;
        }

        :host .kondo-editItem_thumbnail:not(.--hasPreview) {
          block-size: 150px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }

        :host .kondo-editItem_thumbnail.--contain img {
          inline-size: 50%;
          block-size: 50%;
          margin-inline: auto;
          margin-block: 1rem;
          object-fit: contain;
          object-position: center;
        }

        :host .kondo-editItem_thumbnail:not(.--hasPreview) svg {
          max-inline-size: 32px;
          block-size: auto;
        }

        :host .kondo-editItem_thumbnailName {
          font-size: var(--kondo-edit-thumbnail-font-size, var(--kondo-ds-default-font-size));
          display: inline-flex;
          align-items: baseline;
          justify-content: center;
          text-align: center;
        }

        :host .kondo-editItem_thumbnailName .truncated {
          max-inline-size: 120px;
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        :host .kondo-editMedia_details {
          list-style-type: none;
          padding-inline-start: 0;
          padding-block-start: .5rem;
          border-block-start: var(--kondo-edit-separator-border, 2px solid var(--kondo-ds-colors-neutral-300));
          font-size: var(--kondo-edit-details-font-size, .8rem);
          margin-block-start: 1rem;
          display: flex;
          flex-direction: column;
          gap: .25rem;
          color: var(--kondo-edit-details-color, var(--kondo-ds-colors-neutral-500));
        }

        :host .kondo-editMedia_details li {
          word-break: break-all;
        }

        :host .kondo-editMedia_details b {
          font-weight: 500;
        }

        :host .kondo-formControl {
          display: grid;
          gap: 2px;
        }

        :host .kondo-formLabel {
          font-size: var(--kondo-edit-form-font-size, var(--kondo-ds-default-font-size));
          color: var(--kondo-edit-label-color, var(--kondo-ds-colors-neutral-500));
        }

        :host .kondo-formInput {
          font-size: var(--kondo-edit-form-font-size, var(--kondo-ds-default-font-size));
          padding: .5rem .5rem;
          line-height: 1;
          border: var(--kondo-edit-input-border, 2px solid var(--kondo-ds-colors-neutral-300));
          border-radius: .25rem;
          color: var(--kondo-edit-input-color, var(--kondo-ds-colors-neutral-500));
        }

        :host .kondo-formInput:focus {
          border: 2px solid var(--kondo-default-outline-color);
          outline: 0;
        }

        :host .kondo-formInput::placeholder {
          color: var(--kondo-edit-input-placeholder-color, var(--kondo-ds-colors-neutral-300));
        }

        :host textarea.kondo-formInput {
          resize: vertical;
          min-block-size: 120px;
          line-height: 1.2;
        }

        :host .kondo-formErrors {
          font-size: var(--kondo-edit-error-font-size, .8rem);
          color: var(--kondo-edit-error-color, var(--kondo-ds-colors-danger));
          padding-inline-start: 0;
          list-style-position: inside;
        }

        :host .kondo-formError {
          padding-inline-start: 4px;
        }

        :host dialog {
          z-index: 400;
          inset-block-start: 50%;
          inset-inline-start: 50%;
          transform: translate3d(-50%, -50%, 0);
          border-radius: .5rem;
          border: var(--kondo-dialog-border, solid 2px var(--kondo-ds-colors-danger));
          background: var(--kondo-dialog-background, var(--kondo-ds-colors-neutral-050));
          padding: 1rem;
        }

        :host dialog::backdrop {
          position: fixed;
          inset: 0;
          background: hsla(223, 100%, 5%, .5);
        }

        :host dialog > * {
          display: block;
          inline-size: 100%;
          text-align: center;
        }

        :host dialog > * + * {
          margin-block-start: 1rem;
        }
      }
    `
  ];
}

export function useModalFooterStyles(): CSSResult[] {
  return [
    useResetStyles(),
    useButtonStyles(),
    css`
      :host {
        grid-area: kondo_footer;
        border-block-start: var(--kondo-foooter-border, 2px solid var(--kondo-ds-colors-neutral-100));
        padding: .5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: .5rem;
      }

      :host .kondo-footerInformations {
        font-size: .9rem;
        color: var(--kondo-footer-text-color, var(--kondo-ds-colors-neutral-500));
      }

      :host .kondo-selectionConstraints {
        text-align: center;
      }

      @media only screen and (min-width: 800px) {
        :host {
          flex-direction: row;
          align-items: baseline;
          justify-content: flex-end;
        }

        :host .kondo-selectionConstraints {
          margin-inline-end: auto;
          max-inline-size: 50%;
          text-align: left;
        }
      }
    `
  ];
}

export function useModalHeaderStyles(): CSSResult[] {
  return [
    useResetStyles(),
    useButtonStyles(),
    css`
      :host {
        grid-area: kondo_header;
        border-block-end: var(--kondo-header-border, 2px solid var(--kondo-ds-colors-neutral-100));
        padding: .5rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, max-content);
        grid-template-areas:
          "close refresh"
          "filter ordering"
          "search search";
        align-items: center;
        gap: 1rem;
      }

      :host .kondo-closeModal {
        grid-area: close;
        inline-size: min-content;
      }

      :host .kondo-filters {
        grid-area: filter;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: .25rem;
      }

      :host .kondo-filters_filetype {
        position: relative;
      }

      :host .kondo-filters_filetypeModal {
        position: absolute;
        inset-block-start: calc(100% + 10px);
        inset-inline-start: 0;
        inline-size: 100vw;
        max-inline-size: max(60vw, 200px);
        border-radius: var(--kondo-header-dropdown-radius, .25rem);
        background: var(--kondo-header-dropdown-background, var(--kondo-ds-colors-white));
        box-shadow: var(--kondo-header-dropdown-shadow, 4px 0 5px 5px rgba(0, 0, 0, .05));
        border: var(--kondo-header-dropdown-border, 2px solid var(--kondo-ds-colors-neutral-100));
        z-index: 90;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: .5rem;
      }

      :host .kondo-filters_filetypeModalChoices {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: .25rem;
        padding: 1rem 1rem .5rem 1rem;
        max-block-size: 200px;
        overflow-y: auto;
        overflow-x: visible;
      }

      :host .kondo-filters_filetypeModalChoices + .kondo-filters_filetypeModalChoices {
        padding-block-start: .25rem;
      }

      :host .kondo-filters_filetypeModalChoices input {
        accent-color: var(--kondo-header-choice-accent-color, var(--kondo-ds-colors-primary));
        transform: translateY(3px);
      }

      :host .kondo-filters_filetypeModalChoices input:focus-visible {
        outline: 2px solid var(--kondo-default-outline-color);
        outline-offset: 2px;
      }

      :host .kondo-filters_filetypeModalChoices label {
        color: var(--kondo-header-choice-color, var(--kondo-ds-colors-neutral-500));
        font-size: var(--kondo-header-choice-font-size, var(--kondo-ds-default-font-size));
        display: flex;
        align-items: flex-start;
        justify-content: center;
        word-break: break-word;
        gap: .25rem;
      }

      :host .kondo-filters_filetypeModalActions {
        inline-size: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        gap: .5rem;
        padding: .5rem 1rem 1rem 1rem;
      }

      :host .kondo-filters_filetypeModalActions > button {
        flex-grow: 1;
        justify-content: center;
      }

      :host .kondo-search {
        grid-area: search;
        flex-grow: 1;
        border-radius: var(--kondo-header-search-radius, 9999px);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: .5rem;
        padding: 8px 12px;
        background: var(--kondo-header-search-background, var(--kondo-ds-colors-neutral-200));
      }

      :host .kondo-search:focus-within {
        outline: 2px solid var(--kondo-default-outline-color);
        outline-offset: 2px;
      }

      :host .kondo-search input {
        inline-size: 100%;
        border: 0;
        background-color: transparent;
        font: inherit;
        font-size: var(--kondo-header-search-font-size, var(--kondo-ds-default-font-size));
        outline: none;
      }

      :host .kondo-galleryActions {
        grid-area: ordering;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: .25rem;
        margin-inline-start: auto;
      }

      :host .kondo-galleryActions input {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        clip: rect(0, 0, 0, 0);
        position: absolute;
      }

      :host .kondo-galleryActions button[data-checked] {
        color: var(--kondo-header-layout-icons-color, var(--kondo-ds-colors-neutral-050));
        background: var(--kondo-header-layout-icons-background, var(--kondo-ds-colors-primary));
        border-color: var(--kondo-header-layout-icons-border-color, var(--kondo-ds-colors-primary));
      }

      :host .kondo-refreshList {
        grid-area: refresh;
        margin-inline-start: auto;
      }

      @media only screen and (min-width: 800px) {
        :host {
          grid-template-columns: auto auto 1fr auto auto;
          grid-template-rows: max-content;
          grid-template-areas: "close filter search ordering refresh";
        }

        :host .kondo-filters_filetypeModal {
          max-inline-size: 300px;
        }

        :host .kondo-refreshList {
          margin-inline-start: 0;
        }
      }
    `
  ];
}

export function useModalListStyles(): CSSResult[] {
  return [useResetStyles(), css`
    :host {
      grid-area: kondo_main;
      block-size: 100%;
      overflow: hidden;
    }

    :host .kondo-emptyList {
      inline-size: 100%;
      block-size: 100%;
      padding: 2rem;
      display: grid;
      place-items: center;
      text-align: center;
    }

    :host .kondo-mediaGallery {
      padding: .5rem;
      inline-size: 100%;
      block-size: 100%;
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      grid-auto-rows: min-content;
      gap: .5rem;
      overscroll-behavior-y: contain;
    }

    :host .kondo-mediaGallery.--listView {
      grid-template-columns: 1fr;
    }

    :host .kondo-galleryItem {
      inline-size: 100%;
      display: block;
      aspect-ratio: 1/1;
    }

    :host .kondo-mediaGallery.--listView .kondo-galleryItem {
      aspect-ratio: unset;
      inline-size: 100%;
      padding: .25rem .5rem;
      border-radius: .25rem;
      background-color: transparent;
      transition: background-color .2s ease;
    }

    :host .kondo-mediaGallery.--listView .kondo-galleryItem:hover,
    :host .kondo-mediaGallery.--listView .kondo-galleryItem:focus-within {
      background: var(--kondo-list-hover-background, var(--kondo-ds-colors-neutral-100));
      color: var(--kondo-list-hover-color, currentColor);
    }

    :host .kondo-galleryItem > label {
      inline-size: 100%;
      block-size: 100%;
      display: block;
      position: relative;
    }

    :host .kondo-mediaGallery.--listView .kondo-galleryItem > label {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    :host .kondo-galleryItem_selection {
      position: absolute;
      inset-block-start: 10px;
      inset-inline-start: 10px;
      inline-size: 1rem;
      block-size: 1rem;
      z-index: 2;
      accent-color: var(--kondo-gallery-item-accent-color, var(--kondo-ds-colors-primary));
    }

    :host .kondo-galleryItem_selection:focus-visible {
      outline: 2px solid var(--kondo-default-outline-color);
      outline-offset: 2px;
    }

    :host .kondo-mediaGallery.--listView .kondo-galleryItem_selection {
      position: static;
      inset-block-start: unset;
      inset-inline-start: unset;
    }

    :host .kondo-galleryItem_thumbnail {
      position: absolute;
      inset: 0;
      inline-size: 100%;
      block-size: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
      border-radius: var(--kondo-gallery-item-radius, .25rem);
      overflow: hidden;
      border: var(--kondo-gallery-item-border, 2px solid var(--kondo-ds-colors-neutral-100));
      z-index: 0;
    }

    :host .kondo-mediaGallery:not(.--listView) .kondo-galleryItem_thumbnail {
      background-color: var(--kondo-ds-colors-white);
    }

    :host .kondo-mediaGallery.--listView .kondo-galleryItem_thumbnail {
      position: static;
      block-size: auto;
      border: 0;
      inline-size: 100%;
      display: grid;
      grid-template-columns: auto 1fr;
      justify-content: flex-start;
      border-radius: 0;
      margin-inline-start: .8rem;
      color: var(--kondo-gallery-item-color, var(--kondo-ds-colors-neutral-500));
    }

    :host .kondo-mediaGallery:not(.--listView) .kondo-galleryItem_selection:checked + .kondo-galleryItem_thumbnail {
      border: var(--kondo-gallery-item-selected-border, 2px solid var(--kondo-ds-colors-primary));
    }

    :host .kondo-galleryItem_thumbnail img {
      inline-size: 100%;
      block-size: 100%;
      object-fit: cover;
      object-position: center;
    }

    :host .kondo-galleryItem_thumbnail.--contain img {
      inline-size: 50%;
      block-size: 50%;
      object-fit: contain;
      object-position: center;
    }

    :host .kondo-mediaGallery.--listView .kondo-galleryItem_thumbnail img {
      aspect-ratio: 1/1;
      inline-size: 50px;
      block-size: auto;
      border-radius: var(--kondo-gallery-item-radius, .25rem);
    }

    :host .kondo-galleryItem_thumbnail svg {
      max-inline-size: 32px;
      block-size: auto;
      fill: var(--kondo-gallery-item-color, var(--kondo-ds-colors-neutral-500));
    }

    :host .kondo-mediaGallery.--listView .kondo-galleryItem_thumbnail_svg {
      aspect-ratio: 1/1;
      inline-size: 50px;
      block-size: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host .kondo-galleryItem_thumbnailName {
      font-size: var(--kondo-gallery-item-font-size, .75rem);
      color: var(--kondo-gallery-item-color, var(--kondo-ds-colors-neutral-500));
      display: grid;
      grid-template-columns: auto auto;
      align-items: baseline;
      justify-content: start;
      text-align: center;
    }

    :host .kondo-galleryItem_thumbnailName .truncated {
      max-inline-size: 75px;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :host .kondo-mediaGallery.--listView .kondo-galleryItem_thumbnailName .truncated {
      flex-grow: 1;
      flex-shrink: 1;
      min-inline-size: unset;
    }

    :host .kondo-galleryItem_edit,
    :host .kondo-galleryItem_copy {
      display: none;
    }

    @media only screen and (min-width: 800px) {
      :host .kondo-galleryItem_edit {
        position: absolute;
        inset-block-start: 10px;
        inset-inline-end: 10px;
        inline-size: 35px;
        block-size: 35px;
        border: var(--kondo-gallery-item-edit-border, 2px solid var(--kondo-ds-colors-info));
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--kondo-gallery-item-edit-color, var(--kondo-ds-colors-white));
        border-radius: var(--kondo-gallery-item-edit-radius, 9999px);
        background: var(--kondo-gallery-item-edit-background, var(--kondo-ds-colors-info));;
        cursor: pointer;
        z-index: 2;
        flex: none;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: .2s ease;
      }

      :host .kondo-mediaGallery.--listView .kondo-galleryItem_edit {
        position: static;
        inset-block-start: unset;
        inset-inline-end: unset;
        margin-inline-start: .5rem;
      }

      :host .kondo-galleryItem_copy {
        position: absolute;
        inset-block-end: 10px;
        inset-inline-end: 10px;
        inline-size: 35px;
        block-size: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: var(--kondo-gallery-item-copy-border, 2px solid var(--kondo-ds-colors-info));
        color: var(--kondo-gallery-item-copy-color, var(--kondo-ds-colors-info));
        border-radius: var(--kondo-gallery-item-copy-radius, 9999px);
        background: var(--kondo-gallery-item-copy-background, var(--kondo-ds-colors-white));;
        cursor: pointer;
        z-index: 2;
        flex: none;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: .2s ease;
      }

      :host .kondo-mediaGallery.--listView .kondo-galleryItem_copy {
        position: static;
        inset-block-start: unset;
        inset-inline-end: unset;
        margin-inline-start: auto;
      }

      :host .kondo-galleryItem .kondo-galleryItem_edit:focus-visible,
      :host .kondo-galleryItem .kondo-galleryItem_copy:focus-visible {
        outline: 2px solid var(--kondo-default-outline-color);
        outline-offset: 2px;
      }

      :host .kondo-galleryItem:hover .kondo-galleryItem_edit,
      :host .kondo-galleryItem:hover .kondo-galleryItem_copy,
      :host .kondo-galleryItem:focus-within .kondo-galleryItem_edit,
      :host .kondo-galleryItem:focus-within .kondo-galleryItem_copy {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
      }
    }
  `];
}

export function useModalUploadStyles(): CSSResult[] {
  return [useResetStyles(), css`
    :host {
      display: none;
    }

    @media only screen and (min-width: 800px) {
      :host {
        display: block;
        inline-size: 100%;
        block-size: 100%;
      }

      :host .dropzone {
        block-size: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: var(--kondo-dropzone-radius, .25rem);
        border-width: var(--kondo-dropzone-border-width, 2px);
        border-style: var(--kondo-dropzone-border-style, dashed);
        border-color: var(--kondo-dropzone-border-color, transparent);
        transition: .2s ease-in;
        padding: .5rem;
        position: relative;
      }

      :host .dropzone.--dropped {
        border-color: var(--kondo-dropzone-border-active-color, var(--kondo-ds-colors-info));
      }

      :host .dropzone.--dropped * {
        pointer-events: none;
      }

      :host .dropzone > .kondo-uploadForm {
        color: var(--kondo-upload-text-color, var(--kondo-ds-colors-neutral-500));
        font-size: var(--kondo-upload-font-size, var(--kondo-ds-default-font-size));
        text-align: center;
        inline-size: 100%;
        padding: 1rem;
        display: grid;
        gap: .5rem;
      }

      :host .dropzone strong {
        color: var(--kondo-upload-title-color, var(--kondo-ds-colors-primary));
      }

      :host .dropzone input[type="file"] {
        position: absolute;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }

      :host .dropzone label {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: var(--kondo-button-padding, .5rem 1rem);
        border: 0;
        border-radius: var(--kondo-button-radius, 9999px);
        font-size: var(--kondo-button-font-size, var(--kondo-ds-default-font-size));
        gap: .25rem;
        background: var(--kondo-outline-button-background, transparent);
        color: var(--kondo-outline-button-color, var(--kondo-ds-colors-primary));
        border: var(--kondo-outline-button-border-color, 2px solid var(--kondo-ds-colors-primary));
        cursor: pointer;
      }

      :host .kondo-upload_acceptedFiletypes {
        position: absolute;
        inset-block-end: 0;
        inset-inline-start: 0;
        inline-size: 100%;
      }

      :host .kondo-upload_acceptedFiletypes > summary {
        padding: .75rem .5rem;
        border-block-start: 2px solid var(--kondo-ds-colors-neutral-200);
        text-align: left;
        inline-size: 100%;
        cursor: pointer;
      }

      :host .kondo-upload_acceptedFiletypes > div {
        padding: 0 .5rem .5rem .5rem;
        text-align: left;
        inline-size: 100%;
        block-size: 100%;
        max-block-size: 80px;
        overflow-y: auto;
      }

      :host .kondo-upload_acceptedFiletypes ul {
        padding-inline-start: 0;
        list-style-position: inside;
      }
    }
  `];
}

export function useNotificationsStyles(): CSSResult[] {
  return [useResetStyles(), css`
    :host {
      position: absolute;
      inset-block-end: 0;
      inset-inline-start: 0;
      max-inline-size: 250px;
      display: flex;
      z-index: 10;
      flex-direction: column-reverse;
      gap: .5rem;
      pointer-events: none;
      max-block-size: 70%;
      overflow-y: hidden;
      padding: 1rem;
    }

    @media only screen and (min-width: 800px) {
      :host {
        max-inline-size: 400px;
      }
    }

    .kondoNotification {
      border-radius: var(--kondo-notification-radius, .25rem);
      background: var(--kondo-notification-background, var(--kondo-ds-colors-white));
      padding: .5rem;
      box-shadow: var(--kondo-notification-shadow, 0 0 20px 10px rgba(0, 0, 0, .03));
      pointer-events: all;
      border: solid 2px;
      font-size: var(--kondo-notification-font-size, var(--kondo-ds-default-font-size));
      text-align: left;
      cursor: pointer;
    }

    .kondoNotification.--success {
      color: var(--kondo-ds-colors-success);
      border-color: var(--kondo-ds-colors-success);
    }

    .kondoNotification.--info {
      color: var(--kondo-ds-colors-info);
      border-color: var(--kondo-ds-colors-info);
    }

    .kondoNotification.--warning {
      color: var(--kondo-ds-colors-warning);
      border-color: var(--kondo-ds-colors-warning);
    }

    .kondoNotification.--error {
      color: var(--kondo-ds-colors-danger);
      border-color: var(--kondo-ds-colors-danger);
    }
  `];
}
