// ArmorProperties
import DodgeRoot from '@renderer/core/data/DLCs/04-FlamesOfTheNether/ArmorProperties/DodgeRoot';

// Armors
import PiglinArmor from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Armors/PiglinArmor';
import SproutArmor from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Armors/SproutArmor';

// Artefacts
import MobMasher from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Artefacts/MobMasher';
import NetherWartSporeGrenade from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Artefacts/NetherWartSporeGrenade';
import SpinWheel from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Artefacts/SpinWheel';
import ThunderingQuiver from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Artefacts/ThunderingQuiver';

// Enchants
import ArtifactCharge from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Enchants/ArtifactCharge';
import BeastBoss from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Enchants/BeastBoss';
import BeastBurst from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Enchants/BeastBurst';
import BeastSurge from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Enchants/BeastSurge';
import CooldownShot from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Enchants/CooldownShot';
import DamageSynergy from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Enchants/DamageSynergy';
import FireFocus from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Enchants/FireFocus';
import LightningFocus from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Enchants/LightningFocus';
import PainCycle from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Enchants/PainCycle';
import PoisonFocus from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Enchants/PoisonFocus';
import Reckless from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Enchants/Reckless';
import ShockWeb from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Enchants/ShockWeb';
import SoulFocus from '@renderer/core/data/DLCs/04-FlamesOfTheNether/Enchants/SoulFocus';

// MeleeWeapons
import Boneclub from '@renderer/core/data/DLCs/04-FlamesOfTheNether/MeleeWeapons/Boneclub';
import Chainsword from '@renderer/core/data/DLCs/04-FlamesOfTheNether/MeleeWeapons/Chainsword';

// RangedWeapons
import CogCrossbow from '@renderer/core/data/DLCs/04-FlamesOfTheNether/RangedWeapons/CogCrossbow';
import TwistingVineBow from '@renderer/core/data/DLCs/04-FlamesOfTheNether/RangedWeapons/TwistingVineBow';

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
