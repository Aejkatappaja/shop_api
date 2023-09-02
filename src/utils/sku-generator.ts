export default function generateSKU() {
  return Math.floor(Math.random() * (9900 - 1000 + 1)) + 1000;
}
