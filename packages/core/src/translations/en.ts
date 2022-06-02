export default {
  api_requests: {
    common: {
      no_endpoint_specified: 'ERR1000: No endpoint has been defined for the %action% action.',
      response_not_ok: 'ERR1100: The request could not be completed. Please try again.',
      response_status_unexpected: 'ERR1101: The status of the received response is not correct. Please try again.',
      upload_returns_no_media: 'ERR1200: An error occurred during the upload. Please try again.',
      upload_success: 'Media added.',
      invalid_file_type: 'ERR2000: The format of this file is not allowed.',
      update_success: 'The media has been updated.',
      delete_success: 'The media has been removed from the site'
    }
  },
  ui: {
    common: {
      close: 'Close',
      copy_link: 'Copy the link',
      edit: 'Edit',
      open_modal: 'Open the media library',
      link_copied: 'The link has been copied to your clipboard.',
    },
    sidebar_edit: {
      title: 'Media information',
      close_detail: 'Close the detail',
      save_changes: 'Save',
      delete_media: 'Remove media from site',
      form: {
        alt_text_label: 'Alternative text',
        alt_text_placeholder: 'Write here...',
        legend_label: 'Caption',
        legend_placeholder: 'Write here...',
      },
      media_infos: {
        name: 'Name',
        type: 'Type',
        size: 'Size',
        uploaded_at: 'Uploaded on',
        uploaded_by: 'Uploaded by'
      },
    },
    modal_footer: {
      confirm_selection: 'Confirm selection',
      no_media_selected: 'No media selected',
      one_media_selected: '1 media selected',
      multiple_medias_selected: '%count% selected media',
      selection_constraint_min: 'You can select at least %min% media',
      selection_constraint_max: 'You can select at most %max% media',
      selection_constraint_between: 'You can select between %min% and %max media',
    },
    modal_header: {
      search_placeholder: 'Search for a media...',
      layout_grid: 'Order in grid',
      layout_list: 'Order in list',
      refresh: 'Refresh',
      filter_by_filetype: 'Filter by file type',
      sort_by: 'Display order',
      translate: 'Translate',
      confirm_choice: 'Validate',
      clear_filters: 'By default'
    },
    modal_list: {
      no_media: 'No media to display :('
    },
    modal_upload: {
      title: 'Add media to the library',
      button_label: 'Select...',
      help_message: 'Or drag and drop files here',
      accepted_formats: 'Accepted formats'
    },
    modal_sidebar: {
      clic_to_edit: 'Click on a media in the list to see the details.'
    },
    preview: {
      no_media_selected: 'No media selected.',
      remove_from_selection: 'Remove from selection'
    },
    filters: {
      filename: 'Filename',
      uploadedAt: 'Upload date',
    }
  }
}
