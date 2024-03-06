import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

const listProducts = [
  {
    itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4,
  },
  {
    itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10,
  },
  {
    itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2,
  },
  {
    itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5,
  },
];

function getItemById(id) {
  for (const product of listProducts) {
    if (String(product.itemId) === id) {
      return product;
    }
  }
  return null;
}

const client = createClient();
function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock);
}
const getAsync = promisify(client.get).bind(client);
async function getCurrentReservedStockById(itemId) {
  const value = await getAsync(`item.${itemId}`);
  return value;
}

const app = express();
app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

app.get('/list_products/:itemId', (req, res) => {
  const { itemId } = req.params;
  const product = getItemById(itemId);
  if (product === null) {
    res.json({ status: 'Product not found' });
    return;
  }
  getCurrentReservedStockById(itemId)
    // eslint-disable-next-line radix
    .then((result) => Number.parseInt(result || 0))
    .then((reservedStock) => {
      product.currentQuantity = product.initialAvailableQuantity - reservedStock;
      res.json(product);
    });
});

app.get('/reserve_product/:itemId', (req, res) => {
  const { itemId } = req.params;
  const product = getItemById(itemId);
  if (product === null) {
    res.send({ status: 'Product not found' });
    return;
  }
  getCurrentReservedStockById(itemId)
    // eslint-disable-next-line radix
    .then((result) => Number.parseInt(result || 0))
    .then((reservedStock) => {
      if (reservedStock >= product.initialAvailableQuantity) {
        res.json({ status: 'Not enough stock available', itemId });
      } else {
        reserveStockById(itemId, reservedStock + 1);
        res.json({ status: 'Reservation confirmed', itemId });
      }
    });
});

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});
