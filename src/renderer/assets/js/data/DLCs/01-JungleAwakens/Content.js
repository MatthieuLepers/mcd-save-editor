// ArmorProperties
import DodgeInvulnerability from './ArmorProperties/DodgeInvulnerability';

// Armors
import OcelotArmor from './Armors/OcelotArmor';

// Artefacts
import CorruptedSeeds from './Artefacts/CorruptedSeeds';

// MeleeWeapons
import Whip from './MeleeWeapons/Whip';

export default {
  ArmorProperties: {
    DodgeInvulnerability,
  },
  Armors: {
    ...OcelotArmor,
  },
  Artefacts: {
    ...CorruptedSeeds,
  },
  MeleeWeapons: {
    ...Whip,
  },
};
