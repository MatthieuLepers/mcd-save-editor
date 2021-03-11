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
      },
    },
    loadingProfils: 'Loading profils...',
    noProfilFound: 'No profil found.',
    Navigation: {
      inventory: 'Inventory',
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
    AncientHunts: {
      title: 'Ancient Hunts',
      requiredRunes: 'Invocation requires:',
      button: 'Add found offers to my inventory',
      refresh: 'Refresh',
      reset: 'Reset',
      successMessage: 'Successfully adde {count} item{pluralize} to your inventory.',
      errorMessage: 'Addition not possible, your inventory does not contain enough free space.',
    },
    AncientMobSelect: {
      title: 'Pick ancient creatures',
      search: 'Search...',
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
};
