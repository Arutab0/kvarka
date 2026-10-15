import { HeroCarousel } from "@/components/HeroCarusel";
import { LandingHeader } from "@/components/LandingHeader";
import { OrderCtaButton } from "@/components/OrderCtaButton";
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

export default function Home() {
  return (
    <SiteProviders>
      <LandingHeader />

      <main>
        <HeroCarousel />

        {/* О нас — кремовый фон */}
        <section id="about" className="bg-cream py-16 sm:py-20 lg:py-24">
          <div className={`${container} grid gap-10 lg:grid-cols-2 lg:gap-16`}>
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

            <div className="self-start rounded-2xl bg-white p-6 shadow-sm ring-1 ring-coffee/15 sm:p-8">
              <h3 className="font-serif text-xl font-medium text-coffee sm:text-2xl">
                Самовывоз
              </h3>
              <p className="mt-3 text-lg text-coffee">{pickup.fullAddress}</p>
              <dl className="mt-6 text-base">
                <div className="flex justify-between gap-4 border-b border-coffee/15 py-3">
                  <dt className="text-coffee-soft">Будни</dt>
                  <dd className="font-semibold text-coffee">{pickup.hoursWeekdays}</dd>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-coffee-soft">Выходные</dt>
                  <dd className="font-semibold text-coffee">{pickup.hoursWeekend}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Ассортимент — белый фон, карточки кремовые */}
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
                  className="flex flex-col rounded-2xl bg-cream p-6 ring-1 ring-coffee/15 sm:p-7"
                >
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
                </li>
              ))}
            </ul>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <article className="flex flex-col rounded-2xl bg-cream p-6 ring-1 ring-coffee/15 sm:p-7">
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
              </article>

              {/* Единственная тёмная карточка — главный акцент блока */}
              <article className="flex flex-col rounded-2xl bg-coffee p-6 text-cream shadow-lg sm:p-7">
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
              </article>
            </div>
          </div>
        </section>

        {/* Доставка — снова кремовый фон */}
        <section id="delivery" className="bg-cream py-16 sm:py-20 lg:py-24">
          <div className={container}>
            <h2 className={h2}>Доставка и самовывоз</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 ring-1 ring-coffee/15 sm:p-8">
                <h3 className="font-serif text-xl font-medium text-coffee">Доставка</h3>
                <ul className="mt-5 space-y-4 text-lg text-coffee">
                  {[
                    "Развоз по Минску по пятницам — на следующий день после обжарки",
                    `Бесплатно при заказе от ${delivery.freeFromByn} BYN`,
                    "По подписке доставка всегда бесплатная",
                  ].map((text) => (
                    <li key={text} className="flex gap-3">
                      <span
                        className="mt-2.5 size-2 shrink-0 rounded-full bg-terracotta"
                        aria-hidden
                      />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white p-6 ring-1 ring-coffee/15 sm:p-8">
                <h3 className="font-serif text-xl font-medium text-coffee">Самовывоз</h3>
                <p className="mt-5 text-lg text-coffee">{pickup.fullAddress}</p>
                <p className="mt-3 text-base text-coffee-soft">
                  {pickup.hoursWeekdays}, {pickup.hoursWeekend}
                </p>
                <p className="mt-5 text-lg text-coffee">
                  Заберите заказ в удобное время — напишите об этом в
                  комментарии к заявке.
                </p>
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