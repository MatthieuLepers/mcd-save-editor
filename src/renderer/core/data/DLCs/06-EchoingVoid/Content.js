// ArmorProperties
import InstantTransmission from '@renderer/core/data/DLCs/06-EchoingVoid/ArmorProperties/InstantTransmission';
import Resonant from '@renderer/core/data/DLCs/06-EchoingVoid/ArmorProperties/Resonant';

// Armors
import BardsGarb from '@renderer/core/data/DLCs/06-EchoingVoid/Armors/BardsGarb';
import EndRobes from '@renderer/core/data/DLCs/06-EchoingVoid/Armors/EndRobes';
import ShulkerArmor from '@renderer/core/data/DLCs/06-EchoingVoid/Armors/ShulkerArmor';

// Artefacts
import LostEvocation from '@renderer/core/data/DLCs/06-EchoingVoid/Artefacts/LostEvocation';
import ShadowSplinter from '@renderer/core/data/DLCs/06-EchoingVoid/Artefacts/ShadowSplinter';
import TomeOfDuplication from '@renderer/core/data/DLCs/06-EchoingVoid/Artefacts/TomeOfDuplication';
import VoidQuiver from '@renderer/core/data/DLCs/06-EchoingVoid/Artefacts/VoidQuiver';

// Enchants
import BackstabberEnchant from '@renderer/core/data/DLCs/06-EchoingVoid/Enchants/Backstabber';
import DippingPoison from '@renderer/core/data/DLCs/06-EchoingVoid/Enchants/DippingPoison';
import LevitationShot from '@renderer/core/data/DLCs/06-EchoingVoid/Enchants/LevitationShot';
import ShadowFeast from '@renderer/core/data/DLCs/06-EchoingVoid/Enchants/ShadowFeast';
import ShadowFlash from '@renderer/core/data/DLCs/06-EchoingVoid/Enchants/ShadowFlash';
import VoidTouchedMelee from '@renderer/core/data/DLCs/06-EchoingVoid/Enchants/VoidTouchedMelee';
import VoidTouchedRanged from '@renderer/core/data/DLCs/06-EchoingVoid/Enchants/VoidTouchedRanged';

// MeleeWeapons
import Backstabber from '@renderer/core/data/DLCs/06-EchoingVoid/MeleeWeapons/Backstabber';
import ObsidianClaymore from '@renderer/core/data/DLCs/06-EchoingVoid/MeleeWeapons/ObsidianClaymore';
import VoidTouchedBlades from '@renderer/core/data/DLCs/06-EchoingVoid/MeleeWeapons/VoidTouchedBlades';

// RangedWeapons
import ShadowCrossbow from '@renderer/core/data/DLCs/06-EchoingVoid/RangedWeapons/ShadowCrossbow';
import VoidBow from '@renderer/core/data/DLCs/06-EchoingVoid/RangedWeapons/VoidBow';

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
