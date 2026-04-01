export const getCentreTypeName = (type) => {
  const types = {
    1: "Skill Development Centres",
    2: "AI And Stem Learning Centres",
    3: "Education Development Centres",
    4: "Innovation And Entrepreneurs Centres",
    5: "Community Development Centres",
  };
  return types[type] || "Unknown Centre";
};