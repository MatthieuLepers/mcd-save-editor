/* eslint-disable import/prefer-default-export */
import MinecraftDungeons from './DLCs/00-MinecraftDungeons/Content';
import JungleAwakens from './DLCs/01-JungleAwakens/Content';
import CreepingWinter from './DLCs/02-CreepingWinter/Content';
import HowlingPeaks from './DLCs/03-HowlingPeaks/Content';
import FlamesOfTheNether from './DLCs/04-FlamesOfTheNether/Content';
import HiddenDepths from './DLCs/05-HiddenDepths/Content';
import EchoingVoid from './DLCs/06-EchoingVoid/Content';

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
  image: 'static/img/Items/Unknown.png',
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
