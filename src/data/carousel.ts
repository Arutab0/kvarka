export type CarouselSlide = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const roastingSlides: CarouselSlide[] = [
  {
    id: "green",
    title: "Отбор зелёного зерна",
    description:
      "Работаем с проверенными поставщиками и пробуем каждую партию до обжарки — только зерно с чистым профилем.",
    image: "/carousel/green-beans.webp",
    imageAlt: "Зелёное кофейное зерно в ладонях",
  },
  {
    id: "roast",
    title: "Обжарка по четвергам",
    description:
      "Партии по 5 кг на барабане: следим за температурой и временем, чтобы раскрыть сладость и аромат без пережога.",
    image: "/carousel/roasting.webp",
    imageAlt: "Процесс обжарки кофе на барабане",
  },
  {
    id: "cupping",
    title: "Каппинг и контроль",
    description:
      "После обжарки пробуем каждую партию — так мы понимаем, что именно попадёт в вашу пачку.",
    image: "/carousel/cupping.webp",
    imageAlt: "Дегустация свежего кофе",
  },
  {
    id: "pack",
    title: "Упаковка и развоз",
    description:
      "Пакуем зерно на 1–3 день после обжарки и развозим по пятницам — к вам доезжает максимально свежий кофе.",
    image: "/carousel/packing.webp",
    imageAlt: "Упаковка свежего кофе",
  },
];
