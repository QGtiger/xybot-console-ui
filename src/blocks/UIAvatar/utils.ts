const imageBackgroundColors = [
  '#eb5757',
  '#f2994a',
  '#f2c94c',
  '#27ae60',
  '#219653',
  '#2f80ed',
  '#2d9cdb',
  '#56ccf2',
  '#bb6bd9',
];

export const trans2Icon = (name: string) => {
  const hex = name.codePointAt(0) || 0;
  const index = hex % imageBackgroundColors.length;
  const color = imageBackgroundColors[index];
  return {
    backgroundColor: color,
  };
};

// const avatarBackgroundColors = ['#CDDAE9', '#D1EBDE', '#F5D4DF', '#D7D4E9', '#E8ECDD'];
const avatarBackgroundColors = [
  '#303759',
  '#1B7AF6',
  '#F2582A',
  '#8F57EF',
  '#1BAB5E',
];

export const trans2User = (name: string) => {
  if (!name) return {};
  const num = name.charCodeAt(0);
  const index = num % avatarBackgroundColors.length;
  return {
    backgroundColor: avatarBackgroundColors[index],
  };
};
