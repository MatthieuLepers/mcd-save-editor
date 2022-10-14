// ArmorProperties
import DodgeRoot from './ArmorProperties/DodgeRoot';

// Armors
import PiglinArmor from './Armors/PiglinArmor';
import SproutArmor from './Armors/SproutArmor';

// Artefacts
import MobMasher from './Artefacts/MobMasher';
import NetherWartSporeGrenade from './Artefacts/NetherWartSporeGrenade';
import SpinWheel from './Artefacts/SpinWheel';
import ThunderingQuiver from './Artefacts/ThunderingQuiver';

// Enchants
import ArtifactCharge from './Enchants/ArtifactCharge';
import BeastBoss from './Enchants/BeastBoss';
import BeastBurst from './Enchants/BeastBurst';
import BeastSurge from './Enchants/BeastSurge';
import CooldownShot from './Enchants/CooldownShot';
import DamageSynergy from './Enchants/DamageSynergy';
import FireFocus from './Enchants/FireFocus';
import LightningFocus from './Enchants/LightningFocus';
import PainCycle from './Enchants/PainCycle';
import PoisonFocus from './Enchants/PoisonFocus';
import Reckless from './Enchants/Reckless';
import ShockWeb from './Enchants/ShockWeb';
import SoulFocus from './Enchants/SoulFocus';

// MeleeWeapons
import Boneclub from './MeleeWeapons/Boneclub';
import Chainsword from './MeleeWeapons/Chainsword';

// RangedWeapons
import CogCrossbow from './RangedWeapons/CogCrossbow';
import TwistingVineBow from './RangedWeapons/TwistingVineBow';

export default {
  ArmorProperties: {
    DodgeRoot,
  },
  Armors: {
    ...PiglinArmor,
    ...SproutArmor,
  },
  Artefacts: {
    ...MobMasher,
    ...NetherWartSporeGrenade,
    ...SpinWheel,
    ...ThunderingQuiver,
  },
  Enchants: {
    ArtifactCharge,
    BeastBoss,
    BeastBurst,
    BeastSurge,
    CooldownShot,
    DamageSynergy,
    FireFocus,
    LightningFocus,
    PainCycle,
    PoisonFocus,
    Reckless,
    ShockWeb,
    SoulFocus,
  },
  MeleeWeapons: {
    ...Boneclub,
    ...Chainsword,
  },
  RangedWeapons: {
    ...CogCrossbow,
    ...TwistingVineBow,
  },
};
