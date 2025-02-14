import GlobalI18N from '@renderer/i18n/Global';

export default {
  App: {
    tabs: {
      unamedCharacter: 'Unamed',
      edit: {
        label: 'Edit',
        modal: {
          title: 'Set profil name',
          okLabel: 'Confirm',
          cancelLabel: 'Cancel',
        },
      },
      reload: {
        label: 'Reload',
        success: 'Reloaded successfully!',
        error: 'Failed to reload data.',
      },
      save: {
        label: 'Save',
        success: 'Saved successfully!',
        error: 'Failed to save data.',
        corruptedError: 'Unable to save, data are corrupted, try to reload.',
      },
    },
    webMode: 'This feature is not available on the web version.',
    loadingProfils: 'Loading profils...',
    noProfilFound: 'No profil found.',
    Navigation: {
      inventory: 'Inventory',
      storageChest: 'Storage chest',
      ancientHunts: 'Ancient hunts',
    },
    TitleBarMenu: {
      fileMenu: {
        label: 'Files',
        selectProfil: 'Select profil...',
        open: 'Open...',
        export: 'Export...',
        exit: 'Exit',
      },
      langMenu: {
        label: 'Language',
        'fr-FR': 'French',
        'en-EN': 'English',
      },
      aboutMenu: {
        label: 'About',
      },
    },
  },
  Updater: {
    downloadingUpdate: 'Downloading update...',
    readyToInstall: 'Update ready to install!',
    quitAndInstall: 'Install',
  },
  Tutorial: {
    steps: {
      ...GlobalI18N.TutorialsData('en-EN'),
    },
    buttons: {
      next: 'Next',
      prev: 'Previous',
      finished: 'Finish',
    },
  },
  MCD: {
    DataCorruption: {
      Page: {
        title: 'Data corruption error report',
        errorCount: 'Error {0}/{1}',
        prevButtonLabel: 'Previous error',
        nextButtonLabel: 'Next error',
      },
      Fixup: {
        title: 'Pick a solution to apply:',
        success: 'All errors successfully fixed!',
        giftedType1: 'Remove "gifted" property',
        giftedType2: 'Set "gifted" to "true"',
        inventoryIndexMinimum: 'Set "inventoryIndex" to "0"',
        inventoryIndexMaximum: 'Set "inventoryIndex" to "179"',
        markedNewType1: 'Remove "markedNew" property',
        markedNewType2: 'Set "markedNew" to "true"',
        enchantmentsRequired: 'Add 9 missing enchants',
        enchantmentsMinItems: 'Add {0} missing enchants',
        enchantmentsMaxItems: 'Remove the {0} last enchants',
        enchantmentsIdRequired: 'Add "id" and set it to "Unset"',
        enchantmentsInvestedPointsRequired: 'Add "investedPoints" and set it to "0"',
        enchantmentsLevelRequired: 'Add "level" and set it to "0"',
        enchantmentsIdEnum: 'Set "id" to "Unset"',
        enchantmentsInvestedPointsMinimum: 'Set "investedPoints" to "{0}"',
        enchantmentsLevelMinimum: 'Set "level" to "0"',
        enchantmentsLevelMaximum: 'Set "level" to "3"',
        enchantmentsChunksLevelConsistency: 'Set all levels to "0"',
        enchantmentsChunksUniqueChunkEnchant: 'Set duplicate to "Unset"',
        enchantmentsForbbiden: 'Remove "enchantments" property',
        equipmentSlotType: 'Unequip item',
        netheriteEnchantType: 'Remove "netheriteEnchant" property',
        netheriteEnchantInvestedPointsRequired: 'Add "investedPoints" and set it to "{0}"',
        netheriteEnchantLevelRequired1: 'Add "level" and set it to 1',
        netheriteEnchantLevelRequired2: 'Add "level" and set it to 2',
        netheriteEnchantLevelRequired3: 'Add "level" and set it to 3',
        powerRequired: 'Add "power" and set it to "1"',
        rarityRequired: 'Add "rarity" and set it to "{0}"',
        deleteItem: 'Remove item',
        createIssueOnGithub: 'Create an issue on GitHub',
        upgradedRequired: 'Add "upgraded" and set it to "false"',
        upgradedType: 'Set "upgraded" to "false"',
        armorpropertiesMinItems1: 'Remove "armorproperties" property',
        armorpropertiesMinItems2: 'Reset "armorproperties" to this initial value',
        armorpropertiesRarityEnum: 'Set "rarity" to "Common"',
      },
      oneOf: 'Missing mandatory property : "equimentSlot", "inventoryIndex", "power", "rarity", "type" or "upgraded"',
      equipmentSlot: {
        type: 'Property "equipmentSlot" must be a string',
        required: 'Missing mandatory property "equipmentSlot"',
        enum: 'Unknown slot "{value}"',
      },
      inventoryIndex: {
        type: 'Property "inventoryIndex" must be a number',
        required: 'Missing mandatory property "inventoryIndex"',
        minimum: '"inventoryIndex" value cannot be lower than 0',
        maximum: '"inventoryIndex" value cannot be higher than 179',
      },
      power: {
        type: 'Property "power" must be a number',
        required: 'Missing mandatory property "power"',
        minimum: '"power" value cannot be lower than 1',
      },
      rarity: {
        type: 'Property "rarity" must be a string',
        required: 'Missing mandatory property "rarity"',
        enum: 'Unknown rarity "{value}"',
      },
      type: {
        type: 'Property "type" must be a string',
        required: 'Missing mandatory property "type"',
        enum: 'Unknown item type "{value}"',
      },
      upgraded: {
        type: 'Property "upgraded" must be a boolean',
        required: 'Missing mandatory property "upgraded"',
        const: '"upgraded" value must be "false"',
      },
      gifted: {
        type: 'Property "gifted" must be a boolean',
        const: '"gifted" value must be "true"',
      },
      markedNew: {
        type: 'Property "markedNew" must be a boolean',
        const: '"markedNew" value must be "true"',
      },
      armorproperties: {
        id: {
          type: 'Property "id" must be a string',
          required: 'Missing mandatory property "id"',
          enum: 'Unknown armor property id "{value}"',
        },
        rarity: {
          type: 'Property "rarity" must be a string',
          required: 'Missing mandatory property "rarity"',
          enum: 'Unknown rartiy "{value}"',
        },
        type: 'Property "armorproperties" must be an array',
        required: 'Missing mandatory property "armorproperties" for "{itemType}" typed items',
        forbbiden: 'Property "armorproperties" is forbbiden for "{itemType}" typed items',
        minItems: 'Table "armorproperties" cannot contains lower than 1 armor property',
        maxItems: 'Table "armorproperties" cannot contains higher than 4 armor properties',
        uniqueItems: 'Table "armorproperties" cannot contains duplicate items',
        uniqueItemsId: 'Table "armorproperties" cannot contains duplicate armor property id "{0}"',
      },
      netheriteEnchant: {
        id: {
          type: 'Property "id" must be a string',
          required: 'Missing mandatory property "id"',
          enum: 'Unknown enchantment id {value}',
          unique: 'Enchantment id "{0}" already leveled in "enchantments" table',
        },
        investedPoints: {
          type: 'Property "investedPoints" must be a number',
          required: 'Missing mandatory property "investedPoints"',
          const: '"investedPoints" value must be "0"',
        },
        level: {
          type: 'Property "level" must be a number',
          required: 'Missing mandatory property "level"',
          minimum: '"level" value cannot be lower than 0',
          maximum: '"level" value cannot be higher than 3',
        },
        type: 'Property "netheriteEnchant" must be an object',
        forbbiden: 'Property "netheriteEnchant" is forbbiden for "{itemType}" typed items',
      },
      enchantments: {
        id: {
          type: 'Property "id" must be a string',
          required: 'Missing mandatory property "id"',
          enum: 'Unknown enchantment id "{value}"',
        },
        investedPoints: {
          type: 'Property "investedPoints" must be a number',
          required: 'Missing mandatory property "investedPoints"',
          const: '"investedPoints" value must be "0"',
        },
        level: {
          type: 'Property "level" must be a number',
          required: 'Missing mandatory property "level"',
          minimum: '"level" value cannot be lower than 0',
          maximum: '"level" value cannot be higher than 3',
        },
        chunks: {
          levelConsistency: 'Enchantment chunk n°{0} cannot have more than 1 leveled enchantment',
          uniqueChunkEnchant: 'Enchantment chunk n°{0} cannot contains duplicate enchantment id "{1}"',
        },
        type: 'Property "enchantments" must be an array',
        required: 'Missing mandatory property "enchantments" for "{itemType}" typed items',
        forbbiden: 'Property "enchantments" is forbbiden for "{itemType}" typed items',
        minItems: 'Table "enchantments" cannot contains lower than 9 enchantments',
        maxItems: 'Table "enchantments" cannot contains higher than 9 enchantments',
        noLeveledUnset: '"Unset" enchant level must be 0',
      },
    },
    AncientHunts: {
      title: 'Ancient Hunts',
      invocationRunes: 'Invocation requires:',
      residualRunes: 'Rune{pluralize} in excess :',
      button: 'Add found offers to my inventory',
      refresh: 'Refresh',
      reset: 'Reset',
      successMessage: 'Successfully added {count} item{pluralize} to your inventory.',
      errorMessage: 'Addition not possible, your inventory does not contain enough free space.',
    },
    AncientMobSelect: {
      title: 'Pick ancient creatures',
      search: 'Search...',
    },
    CharacterCorruptionDetection: {
      title: 'Oops!',
      contentBackupAvailable: [
        'This character\'s data is corrupted, the last valid backup dates from {date}.',
        'Do you want to restore it?',
      ],
      contentNoBackupAvailable: [
        'This character\'s data is corrupted but there is no valid backup to restore.',
        'You can try to reload the current tab.',
      ],
      okLabel: 'Restore',
      showReport: 'View error report',
      dateFormat: 'dS F Y - Hhi',
      restoreSuccess: 'Restore complete!',
      restoreError: 'Restore failed.',
    },
    LevelBadge: {
      level: 'Level',
    },
    Inventory: {
      filters: {
        all: 'All',
        melee: 'Melee',
        ranged: 'Ranged',
        armor: 'Armors',
        artefact: 'Artefacts',
        enchanted: 'Enchanted',
        event: 'Event',
        dlc: 'DLC',
      },
    },
    RarityLabel: {
      common: 'Common',
      rare: 'Rare',
      unique: 'Unique',
      clickToToggle: 'Click to toggle',
    },
    GildedLabel: 'Gilded',
    ItemEnchantmentList: {
      title: 'Enchantments',
    },
    ItemEnchantmentChoice: {
      emptySlot: 'Empty slot',
      tiers: {
        common: 'Common',
        powerful: 'Powerful',
      },
    },
    ItemSelect: {
      search: 'Search...',
    },
    ImportButton: {
      label: 'Import',
      modal: {
        confirm: {
          title: 'Confirm import',
          okLabel: 'Continue',
          cancelLabel: 'Cancel',
          content1: 'This item will be import to your inventory.',
          content2: 'Currently selected item will not be affected.',
        },
        error: {
          title: 'Import not possible',
          cancelLabel: 'Close',
          content: 'The structure of the imported file does not match the structure of an inventory item.',
        },
      },
    },
    ExportButton: {
      label: 'Export',
    },
    DeleteButton: {
      label: 'Delete',
    },
    CloneButton: {
      label: 'Clone',
    },
    EnchantmentEditor: {
      upgradeTiers: 'Upgrade tiers',
      costError: 'You need {cost} enchantment point{pluralize} to do that.',
    },
  },
  Electron: {
    dialogs: {
      filters: {
        '*': 'All files',
        json: 'JSON file',
        txt: 'Text file',
      },
      openFile: {
        title: 'Open...',
        button: 'Open',
      },
      saveFile: {
        title: 'Save as...',
        button: 'Save',
      },
    },
  },
  Date: {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    daySuffix: ['st', 'nd', 'rd'],
    defaultDaySuffix: 'th',
  },
  Materials: {
    Tabs: {
      newTab: 'New tab',
    },
    Form: {
      Select: {
        removeOption: 'Remove option',
        emptyResult: 'No result for « {0} »',
      },
      ObjectList: {
        addModel: 'Add model',
        removeModel: 'Remove this model',
      },
    },
  },
};
