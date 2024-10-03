const getRandomNumberExcept = (...number: number[]) => {
  const base = Array.from({ length: 10 }, (_, i) => i);
  const baseExcept = base.filter((num) => !number.includes(num));
  const randomIndex = Math.floor(Math.random() * baseExcept.length);

  return baseExcept[randomIndex];
};

export default getRandomNumberExcept;
