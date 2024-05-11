// ArmorProperties
import HealingAura from '@renderer/core/data/DLCs/05-HiddenDepths/ArmorProperties/HealingAura';
import SquidRollLimited from '@renderer/core/data/DLCs/05-HiddenDepths/ArmorProperties/SquidRollLimited';
import SquidRollQuick from '@renderer/core/data/DLCs/05-HiddenDepths/ArmorProperties/SquidRollQuick';

// Armors
import SquidArmor from '@renderer/core/data/DLCs/05-HiddenDepths/Armors/SquidArmor';
import TurtleArmor from '@renderer/core/data/DLCs/05-HiddenDepths/Armors/TurtleArmor';

// Artefacts
import GuardianEye from '@renderer/core/data/DLCs/05-HiddenDepths/Artefacts/GuardianEye';
import HeavyHarpoonQuiver from '@renderer/core/data/DLCs/05-HiddenDepths/Artefacts/HeavyHarpoonQuiver';
import SatchelOfNeed from '@renderer/core/data/DLCs/05-HiddenDepths/Artefacts/SatchelOfNeed';
import SatchelOfNourishment from '@renderer/core/data/DLCs/05-HiddenDepths/Artefacts/SatchelOfNourishment';

// Enchants
import Flee from '@renderer/core/data/DLCs/05-HiddenDepths/Enchants/Flee';
import GuardingStrike from '@renderer/core/data/DLCs/05-HiddenDepths/Enchants/GuardingStrike';
import LuckOfTheSea from '@renderer/core/data/DLCs/05-HiddenDepths/Enchants/LuckOfTheSea';
import MultiCharge from '@renderer/core/data/DLCs/05-HiddenDepths/Enchants/MultiCharge';
import PotionThirstMelee from '@renderer/core/data/DLCs/05-HiddenDepths/Enchants/PotionThirstMelee';
import PotionThirstRanged from '@renderer/core/data/DLCs/05-HiddenDepths/Enchants/PotionThirstRanged';

// MeleeWeapons
import Anchor from '@renderer/core/data/DLCs/05-HiddenDepths/MeleeWeapons/Anchor';
import CoralBlade from '@renderer/core/data/DLCs/05-HiddenDepths/MeleeWeapons/CoralBlade';

// RangedWeapons
import BubbleBow from '@renderer/core/data/DLCs/05-HiddenDepths/RangedWeapons/BubbleBow';
import HarpoonCrossbow from '@renderer/core/data/DLCs/05-HiddenDepths/RangedWeapons/HarpoonCrossbow';

export default {
  ArmorProperties: {
    HealingAura,
    SquidRollLimited,
    SquidRollQuick,
  },
  Armors: {
    ...SquidArmor,
    ...TurtleArmor,
  },
  Artefacts: {
    ...GuardianEye,
    ...HeavyHarpoonQuiver,
    ...SatchelOfNeed,
    ...SatchelOfNourishment,
  },
  Enchants: {
    Flee,
    GuardingStrike,
    LuckOfTheSea,
    MultiCharge,
    PotionThirstMelee,
    PotionThirstRanged,
  },
  MeleeWeapons: {
    ...Anchor,
    ...CoralBlade,
  },
  RangedWeapons: {
    ...BubbleBow,
    ...HarpoonCrossbow,
  },
};
