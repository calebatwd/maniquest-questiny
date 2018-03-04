export const getCard = (card) => {
  const [planet, rank, iter] = action.card.split('_');
  return {planet, rank, iter};
};
