export const generateId = () => {
  return Math.floor(10000 + Math.random() * 90000);
};



export const generateProducttId = (name) => {
  const text = "product"
  const i = (text || '').slice(0, 2).toLowerCase();
  const o = (name || '').slice(0, 2).toLowerCase();
  const unique = Math.random().toString(36).substring(2, 5);
  const productId = `${i}${o}${unique}`;

  return productId;
}



export const generateOrderId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return `ORD-${result}`;
};

