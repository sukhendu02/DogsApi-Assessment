import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import SubBreed from './src/model/SubBreed.js';
import Breed from './src/model/Breed.js';
import { sequelize } from './src/model/index.js';
import dotenv from 'dotenv';
dotenv.config()


const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname)


async function seed() {
  try {
    // Read dogs.json
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'dogs.json'), 'utf-8')
    );

    // Reset schema — safe here because this is a deliberate, one-off script
    await sequelize.sync({ force: true });
    console.log('Tables recreated.');

    // Loop through each breed and its sub-breeds
    for (const [breedName, subBreeds] of Object.entries(data)) {
      const breed = await Breed.create({ name: breedName });

      for (const subBreedName of subBreeds) {
        await SubBreed.create({
          name: subBreedName,
          breedId: breed.id,
        });
      }
    }

    console.log('Seed complete: all breeds and sub-breeds inserted.');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await sequelize.close();
    process.exit();
  }
}

seed();