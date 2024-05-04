// ArmorProperties
import EmeraldShield from '@renderer/core/data/DLCs/03-HowlingPeaks/ArmorProperties/EmeraldShield';

// Armors
import ClimbingGear from '@renderer/core/data/DLCs/03-HowlingPeaks/Armors/ClimbingGear';
import EmeraldArmor from '@renderer/core/data/DLCs/03-HowlingPeaks/Armors/EmeraldArmor';

// Artefacts
import ChargedRedstoneMines from '@renderer/core/data/DLCs/03-HowlingPeaks/Artefacts/ChargedRedstoneMines';
import EnchantersTome from '@renderer/core/data/DLCs/03-HowlingPeaks/Artefacts/EnchantersTome';
import SatchelOfTheElements from '@renderer/core/data/DLCs/03-HowlingPeaks/Artefacts/SatchelOfTheElements';
import UpdraftTome from '@renderer/core/data/DLCs/03-HowlingPeaks/Artefacts/UpdraftTome';

// Enchants
import BaneOfIllagers from '@renderer/core/data/DLCs/03-HowlingPeaks/Enchants/BaneOfIllagers';
import DeathBarter from '@renderer/core/data/DLCs/03-HowlingPeaks/Enchants/DeathBarter';
import EmeraldDivination from '@renderer/core/data/DLCs/03-HowlingPeaks/Enchants/EmeraldDivination';
import MultiDodge from '@renderer/core/data/DLCs/03-HowlingPeaks/Enchants/MultiDodge';
import ResurrectionSurge from '@renderer/core/data/DLCs/03-HowlingPeaks/Enchants/ResurrectionSurge';
import RollCharge from '@renderer/core/data/DLCs/03-HowlingPeaks/Enchants/RollCharge';

// MeleeWeapons
import TempestKnife from '@renderer/core/data/DLCs/03-HowlingPeaks/MeleeWeapons/TempestKnife';

// RangedWeapons
import WindBow from '@renderer/core/data/DLCs/03-HowlingPeaks/RangedWeapons/WindBow';

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
