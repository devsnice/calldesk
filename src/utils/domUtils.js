const doesNodeContainClick = (node, e) => {
  if (!node || !e) return false;

  if (node.contains(e.target)) return true;
};

export { doesNodeContainClick };
