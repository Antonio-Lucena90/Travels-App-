import {promises as fs} from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const deleteFile = async(filename, folder) => {
  const filepath = path.join(__dirname, '../public/images', folder, filename);
  try{
    await fs.unlink(filepath)
  }catch(error){
    throw error; 
  }
}