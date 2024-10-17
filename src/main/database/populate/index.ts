import * as DlcsPopulate from '@/main/database/populate/Dlcs';
import * as EventsPopulate from '@/main/database/populate/Events';
import * as AncientMobsPopulate from '@/main/database/populate/AncientMobs';
import * as ArmorPropertiesPopulate from '@/main/database/populate/ArmorProperties';
import * as ArmorsPopulate from '@/main/database/populate/Armors';
import * as ArtefactsPopulate from '@/main/database/populate/Artefacts';
import * as EnchantsPopulate from '@/main/database/populate/Enchants';
import * as WeaponsPopulate from '@/main/database/populate/Weapons';
import { serial } from '@/main/utils/PromiseUtils';

export const populate = async () => serial([
  DlcsPopulate.populate,
  EventsPopulate.populate,
  AncientMobsPopulate.populate,
  ArmorPropertiesPopulate.populate,
  ArmorsPopulate.populate,
  ArtefactsPopulate.populate,
  EnchantsPopulate.populate,
  WeaponsPopulate.populate,
]).catch(console.log);
