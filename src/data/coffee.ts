export type CoffeeOrigin = {
  id: string;
  name: string;
  notes: string;
  weightGrams: number;
  priceByn: number;
};

export type DripPack = {
  id: string;
  name: string;
  quantity: number;
  priceByn: number;
};

export type Subscription = {
  id: string;
  description: string;
  packsPerMonth: number;
  weightGramsPerPack: number;
  priceBynPerMonth: number;
  freeDelivery: boolean;
};

export type CompanyInfo = {
  founders: string;
  foundersBio: string;
  batchSizeKg: number;
  sinceYear: number;
  roastDay: string;
  deliveryDay: string;
  freshnessNote: string;
};

export type PickupAddress = {
  city: string;
  street: string;
  building: string;
  fullAddress: string;
  hoursWeekdays: string;
  hoursWeekend: string;
};

export const coffeeOrigins: CoffeeOrigin[] = [
  {
    id: "ethiopia-yirgacheffe",
    name: "Эфиопия Иргачефф",
    notes: "цветочный, бергамот, светлая обжарка",
    weightGrams: 250,
    priceByn: 32,
  },
  {
    id: "colombia-huila",
    name: "Колумбия Уила",
    notes: "карамель, красное яблоко",
    weightGrams: 250,
    priceByn: 29,
  },
  {
    id: "brazil-cerrado",
    name: "Бразилия Серрадо",
    notes: "орех, шоколад, под эспрессо",
    weightGrams: 250,
    priceByn: 26,
  },
];

export const dripPack: DripPack = {
  id: "drip-assorti",
  name: "Ассорти",
  quantity: 10,
  priceByn: 18,
};

export const subscription: Subscription = {
  id: "monthly-subscription",
  description: "2 пачки по 250 г раз в месяц, доставка бесплатно",
  packsPerMonth: 2,
  weightGramsPerPack: 250,
  priceBynPerMonth: 54,
  freeDelivery: true,
};

export const company: CompanyInfo = {
  founders: "Аня и Дмитрий",
  foundersBio:
    "бывшие бариста, обжаривают партиями по 5 кг с 2019 года. Обжарка по четвергам, развоз по пятницам. Зерно на 1–3 день после обжарки.",
  batchSizeKg: 5,
  sinceYear: 2019,
  roastDay: "четверг",
  deliveryDay: "пятница",
  freshnessNote: "Зерно отправляем на 1–3 день после обжарки.",
};

export const pickup: PickupAddress = {
  city: "Минск",
  street: "ул. Короля",
  building: "9",
  fullAddress: "Минск, ул. Короля, 9",
  hoursWeekdays: "пн–пт 8:00–20:00",
  hoursWeekend: "сб–вс 10:00–18:00",
};

export const delivery = {
  day: "пятница",
  freeFromByn: 50,
  subscriptionFreeDelivery: true,
} as const;

export type OrderInterest = "subscription" | "one-time" | "question";

export const orderInterestOptions: { value: OrderInterest; label: string }[] = [
  { value: "subscription", label: "Подписка" },
  { value: "one-time", label: "Разовый заказ" },
  { value: "question", label: "Вопрос" },
];
