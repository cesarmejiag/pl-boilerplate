export const greetings = (name = "World") => `Hello ${name}`;

export const getNumber = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const number = Math.round(Math.random() * 9);
      resolve(number);
    }, 1000);
  });
};

export const getEven = async () => {
  const number: any = await getNumber();

  if (number % 2 === 0) {
    return number;
  } else {
    throw new Error(`${number} is not even`);
  }
};
