import GlobalI18N from './Global';

export default {
  App: {
    tabs: {
      unamedCharacter: 'Sans nom',
      edit: {
        label: 'Modifier',
        modal: {
          title: 'Définir le nom du profil',
          okLabel: 'Confirmer',
          cancelLabel: 'Annuler',
        },
      },
      reload: {
        label: 'Recharger',
        success: 'Rechargement réussi !',
        error: 'Le rechargement a échoué.',
      },
      save: {
        label: 'Sauvegarder',
        success: 'Sauvegarde réussi !',
        error: 'La sauvegarde a échouée.',
        corruptedError: 'Sauvegarde impossible, les données sont corrompues, essayez de recharger.',
      },
    },
    loadingProfils: 'Chargement des profils...',
    noProfilFound: 'Aucun profil trouvé.',
    Navigation: {
      inventory: 'Inventaire',
      storageChest: 'Coffre de stockage',
      ancientHunts: 'Chasses anciennes',
    },
  },
  TitleBarMenu: {
    fileMenu: {
      label: 'Fichier',
      selectProfil: 'Sélection du profil...',
      exit: 'Quitter',
    },
    langMenu: {
      label: 'Langage',
      french: 'Français',
      english: 'Anglais',
    },
  },
  Tutorial: {
    steps: {
      ...GlobalI18N.TutorialsData('fr-FR'),
    },
    buttons: {
      next: 'Suivant',
      prev: 'Précédent',
      finished: 'Terminer',
    },
  },
  MCD: {
    Game: {
      AncientMobs: GlobalI18N.AncientMobsData('fr-FR'),
      ArmorProperties: GlobalI18N.ArmorProperties('fr-FR'),
      Enchants: GlobalI18N.Enchants('fr-FR'),
      Items: GlobalI18N.Items('fr-FR'),
    },
    AncientHunts: {
      title: 'Chasses anciennes',
      invocationRunes: 'L\'invocation requiert :',
      residualRunes: 'Rune{pluralize} en surplus :',
      button: 'Ajouter les offrandes trouvées dans mon inventaire',
      refresh: 'Rafraîchir',
      reset: 'Réinitialiser',
      successMessage: '{count} objet{pluralize} ajouté{pluralize} à votre inventaire.',
      errorMessage: 'Ajout impossible, votre inventaire ne contiens pas assès de place libre.',
    },
    AncientMobSelect: {
      title: 'Choisir des anciennes créatures',
      search: 'Rechercher...',
    },
    CharacterCorruptionDetection: {
      title: 'Oups !',
      contentBackupAvailable: [
        'Les données de ce personnage sont corrompues, la dernière backup valide date du {date}.',
        'Voulez-vous la réstaurée ?',
      ],
      contentNoBackupAvailable: [
        'Les données de ce personnage sont corrompues mais il n\'y a aucune backup disponible.',
        'Vous pouvez essayer de recharger l\'onglet.',
      ],
      okLabel: 'Restaurer',
      dateFormat: 'dS F Y - Hhi',
    },
    LevelBadge: {
      level: 'Niveau',
    },
    Inventory: {
      filters: {
        all: 'Tous',
        melee: 'Corps-à-corps',
        ranged: 'Distances',
        armor: 'Armures',
        artefact: 'Artéfacts',
        enchanted: 'Enchantés',
        event: 'Événement',
        dlc: 'DLC',
      },
    },
    RarityLabel: {
      common: 'Commun',
      rare: 'Rare',
      unique: 'Unique',
      clickToToggle: 'Cliquez pour changer',
    },
    GildedLabel: 'Doré',
    ItemEnchantmentList: {
      title: 'Enchantements',
    },
    ItemEnchantmentChoice: {
      emptySlot: 'Emplacement vide',
      tiers: {
        common: 'Commun',
        powerful: 'Puissant',
      },
    },
    ItemSelect: {
      search: 'Rechercher...',
    },
    ImportButton: {
      label: 'Importer',
      modal: {
        confirm: {
          title: 'Confirmer l\'importation',
          okLabel: 'Continuer',
          cancelLabel: 'Annuler',
          content: [
            'Cet objet va être importer dans votre inventaire.',
            'L\'objet actuellement séléctionné n\'en sera pas affecté.',
          ],
        },
        error: {
          title: 'Import impossible',
          cancelLabel: 'Fermer',
          content: 'La structure du fichier importé ne correspond pas a la structure d\'un objet d\'inventaire.',
        },
      },
    },
    ExportButton: {
      label: 'Exporter',
    },
    DeleteButton: {
      label: 'Supprimer',
    },
    CloneButton: {
      label: 'Dupliquer',
    },
    EnchantmentEditor: {
      upgradeTiers: 'Niveaux d\'amélioration',
      costError: 'Vous avez besoin de {cost} point{pluralize} d\'enchantement pour effectuer cette action.',
    },
  },
  Electron: {
    OpenFileDialog: {
      title: 'Ouvrir...',
      buttonLabel: 'Ouvrir',
      filters: {
        json: 'Fichier JSON',
      },
    },
    SaveFileDialog: {
      title: 'Enregistrer sous...',
      buttonLabel: 'Enregistrer',
      filters: {
        json: 'Fichier JSON',
      },
    },
  },
  Date: {
    days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    daySuffix: ['er'],
    defaultDaySuffix: '',
    months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  },
};
