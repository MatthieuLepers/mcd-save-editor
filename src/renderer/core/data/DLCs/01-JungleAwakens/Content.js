// ArmorProperties
import DodgeInvulnerability from '@renderer/core/data/DLCs/01-JungleAwakens/ArmorProperties/DodgeInvulnerability';

// Armors
import OcelotArmor from '@renderer/core/data/DLCs/01-JungleAwakens/Armors/OcelotArmor';

// Artefacts
import CorruptedSeeds from '@renderer/core/data/DLCs/01-JungleAwakens/Artefacts/CorruptedSeeds';

// MeleeWeapons
import Whip from '@renderer/core/data/DLCs/01-JungleAwakens/MeleeWeapons/Whip';

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
