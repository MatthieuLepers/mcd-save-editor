import GlobalI18N from '@renderer/i18n/Global';

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
    TitleBarMenu: {
      fileMenu: {
        label: 'Fichier',
        selectProfil: 'Sélection du profil...',
        exit: 'Quitter',
      },
      langMenu: {
        label: 'Langage',
        'fr-FR': 'Français',
        'en-EN': 'Anglais',
      },
      aboutMenu: {
        label: 'À propos',
      },
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
    DataCorruption: {
      Page: {
        title: 'Rapport d\'erreur de données corrompues',
        errorCount: 'Erreur {0}/{1}',
        prevButtonLabel: 'Erreur précédente',
        nextButtonLabel: 'Erreur suivante',
      },
      Fixup: {
        title: 'Choisissez la solution à appliquer :',
        success: 'Toutes les erreurs ont été corrigées !',
        giftedType1: 'Supprimer la propriété "gifted"',
        giftedType2: 'Définir "gifted" à "true"',
        inventoryIndexMinimum: 'Définir "inventoryIndex" à "0"',
        inventoryIndexMaximum: 'Définir "inventoryIndex" à "179"',
        markedNewType1: 'Supprimer la propriété "markedNew"',
        markedNewType2: 'Définir "markedNew" à "true"',
        enchantmentsRequired: 'Ajouter 9 enchantements manquants',
        enchantmentsMinItems: 'Ajouter {0} enchantements manquants',
        enchantmentsMaxItems: 'Supprimer les {0} derniers enchantements',
        enchantmentsIdRequired: 'Ajouter "id" et la définir à "Unset"',
        enchantmentsInvestedPointsRequired: 'Ajouter "investedPoints" et la définir à "0"',
        enchantmentsLevelRequired: 'Ajouter "level" et la définir à "0"',
        enchantmentsIdEnum: 'Définir "id" à "Unset"',
        enchantmentsInvestedPointsMinimum: 'Définir "investedPoints" à "{0}"',
        enchantmentsLevelMinimum: 'Définir "level" à "0"',
        enchantmentsLevelMaximum: 'Définir "level" à "3"',
        enchantmentsChunksLevelConsistency: 'Définir tous les niveaux à "0"',
        enchantmentsChunksUniqueChunkEnchant: 'Définir les doublons à "Unset"',
        enchantmentsForbbiden: 'Supprimer la propriété "enchantments"',
        equipmentSlotType: 'Déséquiper l\'objet',
        netheriteEnchantType: 'Supprimer la propriété "netheriteEnchant"',
        netheriteEnchantInvestedPointsRequired: 'Ajouter "investedPoints" et la définir à "{0}"',
        netheriteEnchantLevelRequired1: 'Ajouter "level" et la définir à 1',
        netheriteEnchantLevelRequired2: 'Ajouter "level" et la définir à 2',
        netheriteEnchantLevelRequired3: 'Ajouter "level" et la définir à 3',
        powerRequired: 'Ajouter "power" et la définir à "1"',
        rarityRequired: 'Ajouter "rarity" et la définir à "{0}"',
        deleteItem: 'Supprimer l\'objet',
        createIssueOnGithub: 'Créer une issue sur GitHub',
        upgradedRequired: 'Ajouter "upgraded" et la définir à "false"',
        upgradedType: 'Définir "upgraded" à "false"',
        armorpropertiesMinItems1: 'Supprimer la propriété "armorproperties"',
        armorpropertiesMinItems2: 'Réinitialiser "armorproperties" vers ça valeur initiale',
        armorpropertiesRarityEnum: 'Définir "rarity" à "Common"',
      },
      oneOf: 'Une propriété obligatoire est manquante parmis celles-ci : "equimentSlot", "inventoryIndex", "power", "rarity", "type" ou "upgraded"',
      equipmentSlot: {
        type: 'La propriété "equipmentSlot" doit être du type string',
        required: 'Propriété obligatoire "equipmentSlot" manquante',
        enum: 'L\'emplacement d\'equipement "{value}" est inconnu',
      },
      inventoryIndex: {
        type: 'La propriété "inventoryIndex" doit être du type number',
        required: 'Propriété obligatoire "inventoryIndex" manquante',
        minimum: 'La valeur de "inventoryIndex" ne doit pas être plus petite que 0',
        maximum: 'La valeur de "inventoryIndex" ne doit pas être plus grande que 179',
      },
      power: {
        type: 'La propriété "power" doit être du type number',
        required: 'Propriété obligatoire "power" manquante',
        minimum: 'La valeur de "power" ne doit pas être plus petite que 1',
      },
      rarity: {
        type: 'La propriété "rarity" doit être du type string',
        required: 'Propriété obligatoire "rarity" manquante',
        enum: 'La rareté "{value}" est inconnue',
      },
      type: {
        type: 'La propriété "type" doit être du type string',
        required: 'Propriété obligatoire "type" manquante',
        enum: 'L\'id d\'objet "{value}" est inconnu',
      },
      upgraded: {
        type: 'La propriété "upgraded" doit être du type boolean',
        required: 'Propriété obligatoire "upgraded" manquante',
        const: 'La valeur de "upgraded" doit être "false"',
      },
      gifted: {
        type: 'La propriété "gifted" doit être du type boolean',
        const: 'La valeur de "gifted" doit être "true"',
      },
      markedNew: {
        type: 'La propriété "markedNew" doit être du type boolean',
        const: 'La valeur de "markedNew" doit être "true"',
      },
      armorproperties: {
        id: {
          type: 'La propriété "id" doit être du type string',
          required: 'Propriété obligatoire "id" manquante',
          enum: 'L\'id de la propriété d\'armure "{value}" est inconnu',
        },
        rarity: {
          type: 'La propriété "rarity" doit être du type string',
          required: 'Propriété obligatoire "rarity" manquante',
          enum: 'La rareté "{value}" est inconnue',
        },
        type: 'La propriété "armorproperties" doit être du type array',
        required: 'Propriété obligatoire "armorproperties" manquante pour les objets de type "{itemType}"',
        forbbiden: 'La propriété "armorproperties" est interdite pour les objets de type "{itemType}"',
        minItems: 'Le tableau "armorproperties" doit contenir au minimum 1 propriété d\'armure',
        maxItems: 'Le tableau "armorproperties" doit contenir au maximum 4 propriétés d\'armure',
        uniqueItems: 'Le tableau "armorproperties" ne doit pas contenir de doublons',
        uniqueItemsId: 'Le tableau "armorproperties" ne doit pas contenir plusieurs fois la propriété d\'armure "{0}"',
      },
      netheriteEnchant: {
        id: {
          type: 'La propriété "id" doit être du type string',
          required: 'Propriété obligatoire "id" manquante',
          enum: 'L\'id d\'enchantement "{value}" est inconnu',
          unique: 'L\'id d\'enchantement "{0}" à déjà été nivelé dans le tableau "enchantements"',
        },
        investedPoints: {
          type: 'La propriété "investedPoints" doit être du type number',
          required: 'Propriété obligatoire "investedPoints" manquante',
          const: 'La valeur de "investedPoints" doit être "0"',
        },
        level: {
          type: 'La propriété "level" doit être du type number',
          required: 'Propriété obligatoire "level" manquante',
          minimum: 'La valeur de "level" ne doit pas être plus petite que 0',
          maximum: 'La valeur de "level" ne doit pas être plus grande que 3',
        },
        type: 'La propriété "netheriteEnchant" doit être du type object',
        forbbiden: 'La propriété "netheriteEnchant" est interdite pour les objets de type "{itemType}"',
      },
      enchantments: {
        id: {
          type: 'La propriété "id" doit être du type string',
          required: 'Propriété obligatoire "id" manquante',
          enum: 'L\'id d\'enchantement "{value}" est inconnu',
        },
        investedPoints: {
          type: 'La propriété "investedPoints" doit être du type number',
          required: 'Propriété obligatoire "investedPoints" manquante',
          const: 'La valeur de "investedPoints" doit être "0"',
        },
        level: {
          type: 'La propriété "level" doit être du type number',
          required: 'Propriété obligatoire "level" manquante',
          minimum: 'La valeur de "level" ne doit pas être plus petite que 0',
          maximum: 'La valeur de "level" ne doit pas être plus grande que 3',
        },
        chunks: {
          levelConsistency: 'Le groupe d\'enchantement n°{0} ne doit pas contenir plus d\'un enchantement dans le niveau est supérieur à 0',
          uniqueChunkEnchant: 'Le groupe d\'enchantement n°{0} ne doit pas contenir plusieurs fois l\'enchantement "{1}"',
        },
        type: 'La propriété "enchantments" doit être du type array',
        required: 'Propriété obligatoire "enchantments" pour les objets de type "{itemType}"',
        forbbiden: 'La propriété "enchantments" est interdite pour les objets de type "{itemType}"',
        minItems: 'Le tableau "enchantments" doit contenir au minimum 9 enchantements',
        maxItems: 'Le tableau "enchantments" doit contenir au maximum 9 enchantements',
        noLeveledUnset: 'L\'enchantment "Unset" doit avoir un niveau égal à 0',
      },
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
        'Voulez-vous la réstaurer ?',
      ],
      contentNoBackupAvailable: [
        'Les données de ce personnage sont corrompues mais il n\'y a aucune backup disponible.',
        'Vous pouvez essayer de recharger l\'onglet.',
      ],
      okLabel: 'Restaurer',
      showReport: 'Voir le rapport d\'erreur',
      dateFormat: 'dS F Y - Hhi',
      restoreSuccess: 'Restauration terminée !',
      restoreError: 'Échec de la restauration.',
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
          content1: 'Cet objet va être importé dans votre inventaire.',
          content2: 'L\'objet actuellement séléctionné n\'en sera pas affecté.',
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
    dialogs: {
      filters: {
        '*': 'Tous les fichiers',
        json: 'Fichier JSON',
        txt: 'Fichier texte',
      },
      openFile: {
        title: 'Ouvrir...',
        button: 'Ouvrir',
      },
      saveFile: {
        title: 'Enregistrer sous...',
        button: 'Enregistrer',
      },
    },
  },
  Date: {
    days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    daySuffix: ['er'],
    defaultDaySuffix: '',
  },
  Materials: {
    Tabs: {
      newTab: 'Nouvel onglet',
    },
    Form: {
      Select: {
        emptyResult: 'Aucun résultat pour « {0} »',
      },
    },
  },
};
