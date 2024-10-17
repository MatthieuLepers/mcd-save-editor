import fs from 'fs';
import axios from 'axios';

export async function downloadImage(url: string, imagePath: string) {
  return axios({
    url,
    responseType: 'stream',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then((response) => new Promise((resolve, reject) => {
      response.data
        .pipe(fs.createWriteStream(imagePath))
        .on('finish', resolve)
        .on('error', reject)
      ;
    }))
    .catch(() => new Promise((resolve, reject) => {
      try {
        const unset = fs.readFileSync('public/img/unset.png');
        fs.writeFileSync(imagePath, unset);
        resolve(imagePath);
      } catch (err) {
        reject(err);
      }
    }))
  ;
}
