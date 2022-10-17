import GlobalI18N from './Global';

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
    loadingProfils: 'Loading profils...',
    noProfilFound: 'No profil found.',
    Navigation: {
      inventory: 'Inventory',
      storageChest: 'Storage chest',
      ancientHunts: 'Ancient hunts',
    },
  },
  TitleBarMenu: {
    fileMenu: {
      label: 'File',
      selectProfil: 'Select profil...',
      exit: 'Exit',
    },
    langMenu: {
      label: 'Language',
      french: 'French',
      english: 'English',
    },
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
    Game: {
      AncientMobs: GlobalI18N.AncientMobsData('en-EN'),
      ArmorProperties: GlobalI18N.ArmorProperties('en-EN'),
      Enchants: GlobalI18N.Enchants('en-EN'),
      Items: GlobalI18N.Items('en-EN'),
    },
    DataCorruption: {
      oneOf: 'Missing mandatory property : "equimentSlot", "inventoryIndex", "power", "rarity", "type" or "upgraded"',
      equipmentSlot: {
        type: 'Property "equipmentSlot" must be a string',
        required: 'Missing mandatory property "equipmentSlot"',
        enum: 'Unknown slot "{value}"',
      },
      inventoryIndex: {
        type: 'Property "inventoryIndex" must be a number',
        required: 'Missing mandatory property "inventoryIndex"',
        minimum: '"inventoryIndex"\'s value cannot be lower than 0',
        maximum: '"inventoryIndex"\'s value cannot be higher than 179',
      },
      power: {
        type: 'Property "power" must be a number',
        required: 'Missing mandatory property "power"',
        minimum: '"power"\'s value cannot be lower than 1',
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
        const: '"upgraded"\'s value must be "false"',
      },
      gifted: {
        type: 'Property "gifted" must be a boolean',
        const: '"gifted"\'s value must be "true"',
      },
      markedNew: {
        type: 'Property "markedNew" must be a boolean',
        const: '"markedNew"\'s value must be "true"',
      },
      armorproperties: {
        id: {
          type: 'Property "id" must be a string',
          required: 'Missing mandatory property "id"',
          enum: 'Unknown armor property id {value}',
        },
        rarity: {
          type: 'Property "rarity" must be a string',
          required: 'Missing mandatory property "rarity"',
          enum: 'Unknown rartiy {value}',
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
          const: '"investedPoints"\'s value must be "0"',
        },
        level: {
          type: 'Property "level" must be a number',
          required: 'Missing mandatory property "level"',
          minimum: '"level"\'s value cannot be lower than 0',
          maximum: '"level"\'s value cannot be higher than 3',
        },
        type: 'Property "netheriteEnchant" must be an object',
        forbbiden: 'Property "netheriteEnchant" is forbbiden for "{itemType}" typed items',
      },
      enchantments: {
        id: {
          type: 'Property "id" must be a string',
          required: 'Missing mandatory property "id"',
          enum: 'Unknown enchantment id {value}',
        },
        investedPoints: {
          type: 'Property "investedPoints" must be a number',
          required: 'Missing mandatory property "investedPoints"',
          const: '"investedPoints"\'s value must be "0"',
        },
        level: {
          type: 'Property "level" must be a number',
          required: 'Missing mandatory property "level"',
          minimum: '"level"\'s value cannot be lower than 0',
          maximum: '"level"\'s value cannot be higher than 3',
        },
        chunks: {
          levelConsistency: 'Enchantment chunk n°{0} cannot have more than 1 leveled enchantment',
          uniqueChunkEnchant: 'Enchantment chunk n°{0} cannot contains duplicate enchantment id "{1}"',
        },
        type: 'Property "enchantments" must be an array',
        required: 'Missing mandatory property "enchantments" for "{itemType}" typed items',
        forbbiden: 'Property "enchantments" is forbbiden for "{itemType}" typed items',
        minItems: 'Table "enchantments" cannot contains lower than 1 enchantment',
        maxItems: 'Table "enchantments" cannot contains higher than 4 enchantments',
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
      dateFormat: 'dS F Y - Hhi',
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
          content: [
            'This item will be import to your inventory.',
            'Currently selected item will not be affected.',
          ],
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
    OpenFileDialog: {
      title: 'Open...',
      buttonLabel: 'Open',
      filters: {
        json: 'JSON file',
      },
    },
    SaveFileDialog: {
      title: 'Save as...',
      buttonLabel: 'Save',
      filters: {
        json: 'JSON file',
      },
    },
  },
  Date: {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daySuffix: ['st', 'nd', 'rd'],
    defaultDaySuffix: 'th',
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  },
};
