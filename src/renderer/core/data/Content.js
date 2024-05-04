import MinecraftDungeons from '@renderer/core/data/DLCs/00-MinecraftDungeons/Content';
import JungleAwakens from '@renderer/core/data/DLCs/01-JungleAwakens/Content';
import CreepingWinter from '@renderer/core/data/DLCs/02-CreepingWinter/Content';
import HowlingPeaks from '@renderer/core/data/DLCs/03-HowlingPeaks/Content';
import FlamesOfTheNether from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Content';
import HiddenDepths from '@renderer/core/data/DLCs/05-HiddenDepths/Content';
import EchoingVoid from '@renderer/core/data/DLCs/06-EchoingVoid/Content';

/**
 * @param {String} contentType
 * @return {Object}
 */
function mergeDlcContent(contentType) {
  return {
    ...(MinecraftDungeons[contentType] || {}),
    ...(JungleAwakens[contentType] || {}),
    ...(CreepingWinter[contentType] || {}),
    ...(HowlingPeaks[contentType] || {}),
    ...(FlamesOfTheNether[contentType] || {}),
    ...(HiddenDepths[contentType] || {}),
    ...(EchoingVoid[contentType] || {}),
  };
}

const Unknown = {
  disabled: true,
  name: 'Unknown',
  image: 'img/Items/Unknown.png',
  i18n: {
    'fr-FR': 'Inconnu',
    'en-EN': 'Unknown',
  },
};

export const ArmorProperties = mergeDlcContent('ArmorProperties');

export const Armors = { Unknown, ...mergeDlcContent('Armors') };

export const Artefacts = { Unknown, ...mergeDlcContent('Artefacts') };

export const Enchants = mergeDlcContent('Enchants');

export const MeleeWeapons = { Unknown, ...mergeDlcContent('MeleeWeapons') };

export const RangedWeapons = { Unknown, ...mergeDlcContent('RangedWeapons') };

export const Items = { Unknown, ...mergeDlcContent('Armors'), ...mergeDlcContent('Artefacts'), ...mergeDlcContent('MeleeWeapons'), ...mergeDlcContent('RangedWeapons') };
