export default {
  api_requests: {
    common: {
      no_endpoint_specified: 'ERR1000: Aucun endpoint n\'a été défini pour l\'action %action%.',
      response_not_ok: 'ERR1100: La requête n\'a pas pu aboutir. Veuillez réessayer.',
      response_status_unexpected: 'ERR1101: Le statut de la réponse reçue n\'est pas conforme. Veuillez réessayer.',
      upload_returns_no_media: 'ERR1200: Une erreur est survenue lors de l\'upload. Veuillez réessayer.',
      upload_success: 'Média(s) ajouté(s).',
      invalid_file_type: 'ERR2000: Le format de ce fichier n\'est pas autorisé.',
      update_success: 'Le média a bien été mis à jour.',
      delete_success: 'Le média a bien été supprimé du site.'
    }
  },
  ui: {
    common: {
      close: 'Fermer',
      copy_link: 'Copier le lien',
      edit: 'Éditer',
      open_modal: 'Ouvrir la bibliothèque de médias',
      link_copied: 'Le lien a été copié dans votre presse-papiers.',
    },
    sidebar_edit: {
      title: 'Informations du média',
      close_detail: 'Fermer le détail',
      save_changes: 'Sauvegarder',
      delete_media: 'Supprimer le média du site',
      form: {
        alt_text_label: 'Texte alternatif',
        alt_text_placeholder: 'Écrivez ici...',
        legend_label: 'Légende',
        legend_placeholder: 'Écrivez ici...',
      },
      media_infos: {
        name: 'Nom',
        type: 'Type',
        size: 'Taille',
        uploaded_at: 'Uploadé le',
        uploaded_by: 'Uploadé par'
      },
    },
    modal_footer: {
      confirm_selection: 'Confirmer la sélection',
      no_media_selected: 'Aucun média sélectionné',
      one_media_selected: '1 média sélectionné',
      multiple_medias_selected: '%count% médias sélectionnés',
      selection_constraint_min: 'Vous pouvez sélectionner au moins %min% médias',
      selection_constraint_max: 'Vous pouvez sélectionner au maximum %max% médias',
      selection_constraint_between: 'Vous pouvez sélectionner entre %min% et %max médias',
    },
    modal_header: {
      search_placeholder: 'Rechercher un média...',
      layout_grid: 'Ordonner en grille',
      layout_list: 'Ordonner en liste',
      refresh: 'Rafraîchir',
      filter_by_filetype: 'Filtrer par type de fichier',
      sort_by: 'Ordre d\'affichage',
      translate: 'Traduire',
      confirm_choice: 'Valider',
      clear_filters: 'Par défaut'
    },
    modal_list: {
      no_media: 'Aucun media à afficher :('
    },
    modal_upload: {
      title: 'Ajouter des médias à la librairie',
      button_label: 'Sélectionner...',
      help_message: 'Ou glisser-déposer les fichiers ici',
      accepted_formats: 'Formats acceptés'
    },
    modal_sidebar: {
      clic_to_edit: 'Cliquez sur un média de la liste pour voir les détails.'
    },
    preview: {
      no_media_selected: 'Aucun média sélectionné',
      remove_from_selection: 'Enlever de la sélection'
    },
    filters: {
      filename: 'Nom du fichier',
      uploadedAt: 'Date d\'upload',
    }
  }
}
