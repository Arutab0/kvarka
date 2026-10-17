import { HeroCarousel } from "@/components/HeroCarusel";
import { LandingHeader } from "@/components/LandingHeader";
import { OrderCtaButton } from "@/components/OrderCtaButton";
import { ProductImage } from "@/components/ProductImage";
import { SiteProviders } from "@/components/SiteProviders";
import {
  coffeeOrigins,
  company,
  delivery,
  dripPack,
  pickup,
  subscription,
} from "@/data/coffee";

function formatPrice(amount: number): string {
  return `${amount} BYN`;
}

const container = "mx-auto max-w-6xl px-5 sm:px-8 lg:px-10";
const h2 =
  "font-serif text-2xl font-medium leading-tight text-coffee text-balance sm:text-3xl lg:text-4xl";

const mapsUrl = `https://yandex.by/maps/?text=${encodeURIComponent(pickup.fullAddress)}`;

const deliverySteps = [
  {
    title: "Четверг — обжарка",
    text: "Обжариваем партию небольшими порциями под ваши заказы.",
  },
  {
    title: "Пятница — развоз по Минску",
    text: "Привозим на следующий день после обжарки, пока кофе совсем свежий.",
  },
];

export default function Home() {
  return (
    <SiteProviders>
      <LandingHeader />

      <main>
        <HeroCarousel />

        {/* О нас */}
        <section id="about" className="bg-cream py-16 sm:py-20 lg:py-24">
          <div className={`${container} grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16`}>
            <div>
              <h2 className={h2}>Кто мы и почему свежесть важна</h2>
              <p className="mt-6 text-lg leading-relaxed text-coffee">
                Нас зовут {company.founders} — {company.foundersBio}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-coffee-soft">
                Мы не копим склад: каждая партия уходит к вам вскоре после
                обжарки, пока аромат ещё живой.
              </p>
            </div>

            {/* Фото обжарочной / основателей: public/about/roastery.webp */}
            <ProductImage
              src="/about/roastery.webp"
              alt="Обжарочная Кварта"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] rounded-2xl ring-1 ring-coffee/15"
            />
          </div>
        </section>

        {/* Ассортимент */}
        <section id="assortment" className="bg-white py-16 sm:py-20 lg:py-24">
          <div className={container}>
            <h2 className={h2}>Ассортимент и подписка</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-coffee-soft">
              Три сорта в пачках по 250&nbsp;г, дрип-пакеты для дома и офиса и
              месячная подписка с бесплатной доставкой.
            </p>

            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {coffeeOrigins.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col overflow-hidden rounded-2xl bg-cream ring-1 ring-coffee/15"
                >
                  {/* Фото пачки: public/products/<id>.webp */}
                  <ProductImage
                    src={`/products/${item.id}.webp`}
                    alt={item.name}
                    className="aspect-[4/3]"
                  />
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="font-serif text-xl font-medium text-coffee">
                      {item.name}
                    </h3>
                    <p className="mt-3 flex-1 text-base leading-relaxed text-coffee-soft">
                      {item.notes}
                    </p>
                    <p className="mt-5 text-base font-medium text-olive">
                      {item.weightGrams} г
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-coffee">
                      {formatPrice(item.priceByn)}
                    </p>
                    <OrderCtaButton
                      interest="one-time"
                      comment={`Хочу: ${item.name}, ${item.weightGrams} г`}
                      variant="secondary"
                      className="mt-5 w-full px-4 py-3 text-base"
                    >
                      Заказать
                    </OrderCtaButton>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <article className="flex flex-col overflow-hidden rounded-2xl bg-cream ring-1 ring-coffee/15">
                {/* public/products/drip.webp */}
                <ProductImage
                  src="/products/drip.webp"
                  alt={`Дрип-пакеты ${dripPack.name}`}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="aspect-[16/9]"
                />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-base font-semibold text-olive">Дрип-пакеты</p>
                  <h3 className="mt-2 font-serif text-xl font-medium text-coffee">
                    {dripPack.name}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-coffee-soft">
                    {dripPack.quantity} штук — удобно попробовать разные профили
                  </p>
                  <p className="mt-5 text-2xl font-semibold text-coffee">
                    {formatPrice(dripPack.priceByn)}
                  </p>
                  <OrderCtaButton
                    interest="one-time"
                    comment={`Дрип-пакеты: ${dripPack.name}, ${dripPack.quantity} шт.`}
                    variant="secondary"
                    className="mt-5 w-full px-4 py-3 text-base"
                  >
                    Заказать
                  </OrderCtaButton>
                </div>
              </article>

              {/* Единственная тёмная карточка — главный акцент блока */}
              <article className="flex flex-col overflow-hidden rounded-2xl bg-coffee text-cream shadow-lg">
                {/* public/products/subscription.webp */}
                <ProductImage
                  src="/products/subscription.webp"
                  alt="Подписка на кофе"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="aspect-[16/9]"
                />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="w-fit rounded-full bg-terracotta px-3 py-1 text-sm font-semibold text-white">
                    Выгоднее всего
                  </p>
                  <h3 className="mt-3 font-serif text-xl font-medium">
                    Кофе каждый месяц
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-cream/90">
                    {subscription.description}
                  </p>
                  <p className="mt-5 text-2xl font-semibold">
                    {formatPrice(subscription.priceBynPerMonth)}{" "}
                    <span className="text-base font-normal text-cream/80">в месяц</span>
                  </p>
                  <OrderCtaButton
                    interest="subscription"
                    variant="primary"
                    className="mt-5 w-full px-4 py-3 text-base"
                  >
                    Оформить подписку
                  </OrderCtaButton>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Доставка и самовывоз */}
        <section id="delivery" className="bg-cream py-16 sm:py-20 lg:py-24">
          <div className={container}>
            <h2 className={h2}>Доставка и самовывоз</h2>

            <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Слева: как приезжает кофе */}
              <div className="lg:col-span-7">
                <ol className="space-y-6">
                  {deliverySteps.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-coffee text-base font-semibold text-cream">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-serif text-xl font-medium text-coffee">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-lg leading-relaxed text-coffee-soft">
                          {step.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <ul className="mt-8 space-y-3 rounded-2xl bg-white p-6 text-lg text-coffee ring-1 ring-coffee/15">
                  <li className="flex gap-3">
                    <span className="mt-2.5 size-2 shrink-0 rounded-full bg-terracotta" aria-hidden />
                    Доставка бесплатная при заказе от {delivery.freeFromByn} BYN
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2.5 size-2 shrink-0 rounded-full bg-terracotta" aria-hidden />
                    По подписке доставка всегда бесплатная
                  </li>
                </ul>
              </div>

              {/* Справа: самовывоз с фото точки */}
              <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-coffee/15 lg:col-span-5">
                {/* public/place/shop.webp */}
                <ProductImage
                  src="/place/shop.webp"
                  alt="Вход в Кварту на ул. Короля"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="aspect-[16/9]"
                />
                <div className="p-6 sm:p-7">
                  <h3 className="font-serif text-xl font-medium text-coffee">Самовывоз</h3>
                  <p className="mt-2 text-lg text-coffee">{pickup.fullAddress}</p>
                  <dl className="mt-4 text-base">
                    <div className="flex justify-between gap-4 border-b border-coffee/15 py-2.5">
                      <dt className="text-coffee-soft">Будни</dt>
                      <dd className="font-semibold text-coffee">{pickup.hoursWeekdays}</dd>
                    </div>
                    <div className="flex justify-between gap-4 py-2.5">
                      <dt className="text-coffee-soft">Выходные</dt>
                      <dd className="font-semibold text-coffee">{pickup.hoursWeekend}</dd>
                    </div>
                  </dl>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-coffee/30 px-4 py-3 text-base font-semibold text-coffee transition-colors hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coffee"
                  >
                    Как добраться
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-coffee text-cream">
        <div className={`${container} py-12`}>
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            <div>
              <p className="font-serif text-2xl font-medium">Кварта</p>
              <p className="mt-2 text-base text-cream/85">
                Ремесленная обжарка с {company.sinceYear} года
              </p>
            </div>
            <div className="text-base text-cream">
              <p className="font-semibold">{pickup.fullAddress}</p>
              <p className="mt-2 text-cream/85">{pickup.hoursWeekdays}</p>
              <p className="text-cream/85">{pickup.hoursWeekend}</p>
              <OrderCtaButton
                variant="secondary"
                className="mt-5 !border-cream !bg-transparent px-5 py-3 text-base !text-cream hover:!bg-cream/10"
              >
                Оставить заявку
              </OrderCtaButton>
            </div>
          </div>
          <p className="mt-10 border-t border-cream/25 pt-6 text-sm text-cream/75">
            © Кварта, Минск
          </p>
        </div>
      </footer>
    </SiteProviders>
  );
}