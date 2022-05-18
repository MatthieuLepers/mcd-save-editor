// ArmorProperties
import HealingAura from './ArmorProperties/HealingAura';
import SquidRollLimited from './ArmorProperties/SquidRollLimited';
import SquidRollQuick from './ArmorProperties/SquidRollQuick';

// Armors
import SquidArmor from './Armors/SquidArmor';
import TurtleArmor from './Armors/TurtleArmor';

// Artefacts
import GuardianEye from './Artefacts/GuardianEye';
import HeavyHarpoonQuiver from './Artefacts/HeavyHarpoonQuiver';
import SatchelOfNeed from './Artefacts/SatchelOfNeed';
import SatchelOfNourishment from './Artefacts/SatchelOfNourishment';

// Enchants
import Flee from './Enchants/Flee';
import GuardingStrike from './Enchants/GuardingStrike';
import LuckOfTheSea from './Enchants/LuckOfTheSea';
import MultiCharge from './Enchants/MultiCharge';
import PotionThirstMelee from './Enchants/PotionThirstMelee';
import PotionThirstRanged from './Enchants/PotionThirstRanged';

// MeleeWeapons
import Anchor from './MeleeWeapons/Anchor';
import CoralBlade from './MeleeWeapons/CoralBlade';

// RangedWeapons
import BubbleBow from './RangedWeapons/BubbleBow';
import HarpoonCrossbow from './RangedWeapons/HarpoonCrossbow';

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
