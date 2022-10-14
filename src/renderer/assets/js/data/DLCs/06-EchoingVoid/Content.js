// ArmorProperties
import InstantTransmission from './ArmorProperties/InstantTransmission';
import Resonant from './ArmorProperties/Resonant';

// Armors
import BardsGarb from './Armors/BardsGarb';
import EndRobes from './Armors/EndRobes';
import ShulkerArmor from './Armors/ShulkerArmor';

// Artefacts
import LostEvocation from './Artefacts/LostEvocation';
import ShadowSplinter from './Artefacts/ShadowSplinter';
import TomeOfDuplication from './Artefacts/TomeOfDuplication';
import VoidQuiver from './Artefacts/VoidQuiver';

// Enchants
import BackstabberEnchant from './Enchants/Backstabber';
import DippingPoison from './Enchants/DippingPoison';
import LevitationShot from './Enchants/LevitationShot';
import ShadowFeast from './Enchants/ShadowFeast';
import ShadowFlash from './Enchants/ShadowFlash';
import VoidTouchedMelee from './Enchants/VoidTouchedMelee';
import VoidTouchedRanged from './Enchants/VoidTouchedRanged';

// MeleeWeapons
import Backstabber from './MeleeWeapons/Backstabber';
import ObsidianClaymore from './MeleeWeapons/ObsidianClaymore';
import VoidTouchedBlades from './MeleeWeapons/VoidTouchedBlades';

// RangedWeapons
import ShadowCrossbow from './RangedWeapons/ShadowCrossbow';
import VoidBow from './RangedWeapons/VoidBow';

export default {
  ArmorProperties: {
    InstantTransmission,
    Resonant,
  },
  Armors: {
    ...BardsGarb,
    ...EndRobes,
    ...ShulkerArmor,
  },
  Artefacts: {
    ...LostEvocation,
    ...ShadowSplinter,
    ...TomeOfDuplication,
    ...VoidQuiver,
  },
  Enchants: {
    Backstabber: BackstabberEnchant,
    DippingPoison,
    LevitationShot,
    ShadowFeast,
    ShadowFlash,
    VoidTouchedMelee,
    VoidTouchedRanged,
  },
  MeleeWeapons: {
    ...Backstabber,
    ...ObsidianClaymore,
    ...VoidTouchedBlades,
  },
  RangedWeapons: {
    ...ShadowCrossbow,
    ...VoidBow,
  },
};
