import { createClient } from 'redis';
import { promisify } from 'util';

const client = createClient();
client.on('error', (err) => console.log('Redis client not connected to the server:', err.message));
client.on('ready', () => console.log('Redis client connected to the server'));

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

async function setNewSchool(schoolName, value) {
  try {
    await setAsync(schoolName, value);
    console.log('Reply: OK');
  } catch (err) {
    console.log();
  }
}

async function displaySchoolValue(schoolName) {
  const value = await getAsync(schoolName);
  console.log(value);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
