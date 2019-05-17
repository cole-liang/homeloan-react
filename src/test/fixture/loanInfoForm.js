//True(x = 0.2307 && y = 0.5)
export const singleData = {
  yourIncome: "1000",
  yourPeriod: "weekly",
  yourExpense: "1000",
  propertyValue: "100000",
  deposit: "50000"
};

//False(x = 0.5538 && y = 0.5)
export const singleDataFalse1 = {
  ...singleData,
  yourIncome: "5000",
  yourPeriod: "fortnightly",
  yourExpense: "6000"
};

//False(x = 0.2307 && y = 0.1)
export const singleDataFalse2 = {
  ...singleData,
  propertyValue: "100000",
  deposit: "10000"
};

//False(x = 0.52 && y = 0.025)
export const singleDataFalse3 = {
  yourIncome: "10000",
  yourPeriod: "monthly",
  yourExpense: "5200",
  propertyValue: "200000",
  deposit: "5000"
};

//True(x = 0.5 && y = 0.25)
export const coupleData = {
  yourIncome: "100000",
  yourPeriod: "yearly",
  yourExpense: "5000",
  partnerIncome: "20000",
  partnerPeriod: "quarterly",
  partnerExpense: "2500",
  propertyValue: "200000",
  deposit: "50000"
};
