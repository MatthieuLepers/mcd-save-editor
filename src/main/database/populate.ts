import { Setting } from '@/main/database/models';

export default async function populate() {
  try {
    await Setting.findByPk('cipherKey');
    await Setting.findByPk('cipherIv');
  } catch (e) {
    console.log(e);
  }
}
