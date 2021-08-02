import BeeNest from './Artefacts/BeeNest';
import BootsOfSwiftness from './Artefacts/BootsOfSwiftness';
import ChargedRedstoneMines from './Artefacts/ChargedRedstoneMines';
import CorruptedBeacon from './Artefacts/CorruptedBeacon';
import CorruptedSeeds from './Artefacts/CorruptedSeeds';
import DeathCapMushroom from './Artefacts/DeathCapMushroom';
import EnchantersTome from './Artefacts/EnchantersTome';
import FireworksArrowItem from './Artefacts/FireworksArrowItem';
import FishingRod from './Artefacts/FishingRod';
import FlamingQuiver from './Artefacts/FlamingQuiver';
import GhostCloak from './Artefacts/GhostCloak';
import GolemKit from './Artefacts/GolemKit';
import GongOfWeakening from './Artefacts/GongOfWeakening';
import GuardianEye from './Artefacts/GuardianEye';
import Harvester from './Artefacts/Harvester';
import HeavyHarpoonQuiver from './Artefacts/HeavyHarpoonQuiver';
import IceWand from './Artefacts/IceWand';
import IronHideAmulet from './Artefacts/IronHideAmulet';
import LightFeather from './Artefacts/LightFeather';
import LightningRod from './Artefacts/LightningRod';
import LostEvocation from './Artefacts/LostEvocation';
import LoveMedallion from './Artefacts/LoveMedallion';
import MobMasher from './Artefacts/MobMasher';
import NetherWartSporeGrenade from './Artefacts/NetherWartSporeGrenade';
import RainbowGrass from './Artefacts/RainbowGrass';
import SatchelOfNeed from './Artefacts/SatchelOfNeed';
import SatchelOfNourishment from './Artefacts/SatchelOfNourishment';
import SatchelOfTheElements from './Artefacts/SatchelOfTheElements';
import ShadowSplinter from './Artefacts/ShadowSplinter';
import ShockPowder from './Artefacts/ShockPowder';
import SoulHealer from './Artefacts/SoulHealer';
import SoulLantern from './Artefacts/SoulLantern';
import SpinWheel from './Artefacts/SpinWheel';
import TastyBone from './Artefacts/TastyBone';
import ThunderingQuiver from './Artefacts/ThunderingQuiver';
import TomeOfDuplication from './Artefacts/TomeOfDuplication';
import TormentQuiver from './Artefacts/TormentQuiver';
import TotemOfRegeneration from './Artefacts/TotemOfRegeneration';
import TotemOfShielding from './Artefacts/TotemOfShielding';
import TotemOfSoulProtection from './Artefacts/TotemOfSoulProtection';
import UpdraftTome from './Artefacts/UpdraftTome';
import WindHorn from './Artefacts/WindHorn';
import WonderfulWheat from './Artefacts/WonderfulWheat';

export default {
  ...BeeNest,
  ...BootsOfSwiftness,
  ...ChargedRedstoneMines,
  ...CorruptedBeacon,
  ...CorruptedSeeds,
  ...DeathCapMushroom,
  ...EnchantersTome,
  ...FireworksArrowItem,
  ...FishingRod,
  ...FlamingQuiver,
  ...GhostCloak,
  ...GolemKit,
  ...GongOfWeakening,
  ...GuardianEye,
  ...Harvester,
  ...HeavyHarpoonQuiver,
  ...IceWand,
  ...IronHideAmulet,
  ...LightFeather,
  ...LightningRod,
  ...LostEvocation,
  ...LoveMedallion,
  ...MobMasher,
  ...NetherWartSporeGrenade,
  ...RainbowGrass,
  ...SatchelOfNeed,
  ...SatchelOfNourishment,
  ...SatchelOfTheElements,
  ...ShadowSplinter,
  ...ShockPowder,
  ...SoulHealer,
  ...SoulLantern,
  ...SpinWheel,
  ...TastyBone,
  ...ThunderingQuiver,
  ...TomeOfDuplication,
  ...TormentQuiver,
  ...TotemOfRegeneration,
  ...TotemOfShielding,
  ...TotemOfSoulProtection,
  ...UpdraftTome,
  ...WindHorn,
  ...WonderfulWheat,
};

// 1.019686222076416 => LVL   1 => POWER   40 (FIREWORK) (COMMON)
// 11.42291355133057 => LVL 105 => POWER 4044 (FIREWORK) (COMMON)
// 11.48235321044922 => LVL 105 => POWER 4143 (FIREWORK) (COMMON)
// 11.48703765869141 => LVL 105 => POWER 4151 (FIREWORK) (RARE)
// 11.48834228515625 => LVL 105 => POWER 4153 (FIREWORK) (COMMON)
// 11.49747276306152 => LVL 105 => POWER 4169 (FIREWORK) (COMMON)
// 11.5050516128540  => LVL 106 => POWER 4182 (FIREWORK) (COMMON)
// 11.79001903533936 => LVL 108 => POWER 4695 (FIREWORK) (RARE)

// Power:   1  1.05  1.1  1.15  1.5   2    3  11.42291355133057
// Level:   1     1    2     2    6  11   21                105
// Dmg  :  40    41   42    44   53  70  115               4044

// f(11.48703765869141) = 105, g(11.48703765869141) = 4151
// f(11.42291355133057) = 105, g(11.42291355133057) = 4044

// Player Level
// f(12403300) = 204
// f(12525600) = 205 (+122300)
// f(12648500) = 206 (+122900) (+600)
// f(12772000) = 207 (+123500) (+600)
// f(12896100) = 208 (+124100) (+600)
// f(13020800) = 209 (+124700) (+600)
