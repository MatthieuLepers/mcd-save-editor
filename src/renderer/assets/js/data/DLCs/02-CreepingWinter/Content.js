// Armors
import SnowArmor from './Armors/SnowArmor';

// Artefacts
import IceWand from './Artefacts/IceWand';

import SlowBow from './RangedWeapons/SlowBow';

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
