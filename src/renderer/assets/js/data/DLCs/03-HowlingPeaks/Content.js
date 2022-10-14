// ArmorProperties
import EmeraldShield from './ArmorProperties/EmeraldShield';

// Armors
import ClimbingGear from './Armors/ClimbingGear';
import EmeraldArmor from './Armors/EmeraldArmor';

// Artefacts
import ChargedRedstoneMines from './Artefacts/ChargedRedstoneMines';
import EnchantersTome from './Artefacts/EnchantersTome';
import SatchelOfTheElements from './Artefacts/SatchelOfTheElements';
import UpdraftTome from './Artefacts/UpdraftTome';

// Enchants
import BaneOfIllagers from './Enchants/BaneOfIllagers';
import DeathBarter from './Enchants/DeathBarter';
import EmeraldDivination from './Enchants/EmeraldDivination';
import MultiDodge from './Enchants/MultiDodge';
import ResurrectionSurge from './Enchants/ResurrectionSurge';
import RollCharge from './Enchants/RollCharge';

// MeleeWeapons
import TempestKnife from './MeleeWeapons/TempestKnife';

// RangedWeapons
import WindBow from './RangedWeapons/WindBow';

export default {
  ArmorProperties: {
    EmeraldShield,
  },
  Armors: {
    ...ClimbingGear,
    ...EmeraldArmor,
  },
  Artefacts: {
    ...ChargedRedstoneMines,
    ...EnchantersTome,
    ...SatchelOfTheElements,
    ...UpdraftTome,
  },
  Enchants: {
    BaneOfIllagers,
    DeathBarter,
    EmeraldDivination,
    MultiDodge,
    ResurrectionSurge,
    RollCharge,
  },
  MeleeWeapons: {
    ...TempestKnife,
  },
  RangedWeapons: {
    ...WindBow,
  },
};
