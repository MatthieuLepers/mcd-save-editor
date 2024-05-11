// Armors
import SnowArmor from '@renderer/core/data/DLCs/02-CreepingWinter/Armors/SnowArmor';

// Artefacts
import IceWand from '@renderer/core/data/DLCs/02-CreepingWinter/Artefacts/IceWand';

// RangedWeapons
import SlowBow from '@renderer/core/data/DLCs/02-CreepingWinter/RangedWeapons/SlowBow';

export default {
  Armors: {
    ...SnowArmor,
  },
  Artefacts: {
    ...IceWand,
  },
  RangedWeapons: {
    ...SlowBow,
  },
};
