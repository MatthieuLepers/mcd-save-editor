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
      ancientHunts: 'Ancient hunts',
      tower: 'The tower',
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
      Tower: {
        Challenges: GlobalI18N.TowerChallengesData('en-EN'),
        Bosses: GlobalI18N.TowerBossesData('en-EN'),
        Merchants: GlobalI18N.TowerMerchantsData('en-EN'),
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
    TowerConfiguration: {
      title: 'Tower configuration',
    },
    TowerFloor: {
      floor: 'Floor',
      map: 'Map',
      difficulty: 'Difficulty',
      difficulties: {
        easy: 'easy',
        medium: 'medium',
        hard: 'hard',
      },
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
