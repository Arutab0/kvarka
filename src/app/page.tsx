import { LandingHeader } from "@/components/LandingHeader";
import { OrderCtaButton } from "@/components/OrderCtaButton";
import { RoastingCarousel } from "@/components/RoastingCarousel";
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

export default function Home() {
  return (
    <SiteProviders>
      <LandingHeader />

      <main>
        <section className="border-b border-coffee/10 bg-cream px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-medium uppercase tracking-widest text-olive">
              Ремесленная обжарка · Минск
            </p>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-coffee sm:text-5xl">
              Свежий кофе: обжариваем по четвергам, отправляем свежим
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-coffee/80">
              Небольшие партии по 5&nbsp;кг, зерно на 1–3 день после обжарки.
              Закажите пачку или подписку — доставим в пятницу или заберите на
              ул.&nbsp;Короля.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <OrderCtaButton interest="one-time">
                Заказать кофе
              </OrderCtaButton>
              <OrderCtaButton interest="subscription" variant="secondary">
                Оформить подписку
              </OrderCtaButton>
              <a
                href="#assortment"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium text-coffee/80 underline-offset-4 transition-colors hover:text-coffee hover:underline"
              >
                Смотреть ассортимент
              </a>
            </div>
          </div>
        </section>

        <RoastingCarousel />

        <section
          id="about"
          className="border-b border-coffee/10 bg-white px-4 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-serif text-3xl text-coffee">
                Кто мы и почему свежесть важна
              </h2>
              <p className="mt-6 leading-relaxed text-coffee/85">
                Нас зовут {company.founders} — {company.foundersBio}
              </p>
              <p className="mt-4 leading-relaxed text-coffee/85">
                {company.freshnessNote} Мы не копим склад: каждая партия уходит
                к вам вскоре после обжарки, пока аромат ещё живой.
              </p>
            </div>
            <div className="rounded-2xl border border-coffee/10 bg-cream p-6 sm:p-8">
              <h3 className="font-serif text-xl text-coffee">Самовывоз</h3>
              <p className="mt-3 text-lg text-coffee">{pickup.fullAddress}</p>
              <dl className="mt-6 space-y-2 text-sm text-coffee/80">
                <div className="flex justify-between gap-4 border-b border-coffee/10 pb-2">
                  <dt>Будни</dt>
                  <dd className="font-medium text-coffee">{pickup.hoursWeekdays}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Выходные</dt>
                  <dd className="font-medium text-coffee">{pickup.hoursWeekend}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section
          id="assortment"
          className="border-b border-coffee/10 bg-cream px-4 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="font-serif text-3xl text-coffee">
              Ассортимент и подписка
            </h2>
            <p className="mt-3 max-w-2xl text-coffee/75">
              Три origin-сорта в пачках по 250&nbsp;г, дрип-пакеты для дома и
              офиса и месячная подписка с бесплатной доставкой.
            </p>

            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {coffeeOrigins.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col rounded-2xl border border-coffee/10 bg-white p-6 shadow-sm"
                >
                  <h3 className="font-serif text-xl text-coffee">{item.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-coffee/75">
                    {item.notes}
                  </p>
                  <p className="mt-4 text-sm text-olive">
                    {item.weightGrams} г
                  </p>
                  <p className="mt-1 text-lg font-semibold text-coffee">
                    {formatPrice(item.priceByn)}
                  </p>
                  <OrderCtaButton
                    interest="one-time"
                    comment={`Хочу: ${item.name}, ${item.weightGrams} г`}
                    variant="ghost"
                    className="mt-4 w-full px-4 py-2.5 text-sm"
                  >
                    Заказать
                  </OrderCtaButton>
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <article className="flex flex-col rounded-2xl border border-olive/25 bg-white p-6 shadow-sm">
                <span className="text-xs font-medium uppercase tracking-wide text-olive">
                  Дрип-пакеты
                </span>
                <h3 className="mt-2 font-serif text-xl text-coffee">
                  {dripPack.name}
                </h3>
                <p className="mt-2 flex-1 text-sm text-coffee/75">
                  {dripPack.quantity} штук — удобно попробовать разные профили
                </p>
                <p className="mt-4 text-lg font-semibold text-coffee">
                  {formatPrice(dripPack.priceByn)}
                </p>
                <OrderCtaButton
                  interest="one-time"
                  comment={`Дрип-пакеты: ${dripPack.name}, ${dripPack.quantity} шт.`}
                  variant="secondary"
                  className="mt-4 w-full"
                >
                  Заказать
                </OrderCtaButton>
              </article>

              <article className="flex flex-col rounded-2xl border-2 border-terracotta/40 bg-white p-6 shadow-sm">
                <span className="text-xs font-medium uppercase tracking-wide text-terracotta">
                  Подписка
                </span>
                <h3 className="mt-2 font-serif text-xl text-coffee">
                  Кофе каждый месяц
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-coffee/75">
                  {subscription.description}
                </p>
                <p className="mt-4 text-lg font-semibold text-coffee">
                  {formatPrice(subscription.priceBynPerMonth)}{" "}
                  <span className="text-sm font-normal text-coffee/60">/ мес</span>
                </p>
                <OrderCtaButton
                  interest="subscription"
                  variant="primary"
                  className="mt-4 w-full"
                >
                  Оформить подписку
                </OrderCtaButton>
              </article>
            </div>
          </div>
        </section>

        <section
          id="delivery"
          className="border-b border-coffee/10 bg-white px-4 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="font-serif text-3xl text-coffee">
              Доставка и самовывоз
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div className="rounded-2xl bg-cream p-6 sm:p-8">
                <h3 className="font-serif text-xl text-coffee">Доставка</h3>
                <ul className="mt-4 space-y-3 text-coffee/85">
                  <li className="flex gap-2">
                    <span className="text-terracotta" aria-hidden>
                      ·
                    </span>
                    Развоз по Минску по {delivery.day}ам — в день после
                    обжарки
                  </li>
                  <li className="flex gap-2">
                    <span className="text-terracotta" aria-hidden>
                      ·
                    </span>
                    Бесплатно от {delivery.freeFromByn} BYN за заказ
                  </li>
                  <li className="flex gap-2">
                    <span className="text-terracotta" aria-hidden>
                      ·
                    </span>
                    По подписке доставка всегда бесплатная
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl bg-cream p-6 sm:p-8">
                <h3 className="font-serif text-xl text-coffee">Самовывоз</h3>
                <p className="mt-4 text-coffee/85">{pickup.fullAddress}</p>
                <p className="mt-3 text-sm text-coffee/70">
                  {pickup.hoursWeekdays}, {pickup.hoursWeekend}
                </p>
                <p className="mt-4 text-sm text-coffee/75">
                  Заберите заказ в удобное время — напишите в комментарии к
                  заявке.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-coffee/10 bg-coffee text-cream">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            <div>
              <p className="font-serif text-2xl">Кварта</p>
              <p className="mt-2 text-sm text-cream/75">
                Ремесленная обжарка с {company.sinceYear} года
              </p>
            </div>
            <div className="text-sm text-cream/85">
              <p className="font-medium">{pickup.fullAddress}</p>
              <p className="mt-2">{pickup.hoursWeekdays}</p>
              <p>{pickup.hoursWeekend}</p>
              <p className="mt-4">
                <OrderCtaButton
                  variant="ghost"
                  className="px-0 py-0 text-sm font-normal text-cream underline-offset-4 hover:underline"
                >
                  Оставить заявку
                </OrderCtaButton>
              </p>
            </div>
          </div>
          <p className="mt-10 border-t border-cream/15 pt-6 text-xs text-cream/50">
            © Кварта, Минск
          </p>
        </div>
      </footer>
    </SiteProviders>
  );
}
