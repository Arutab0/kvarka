import { OrderForm } from "@/components/OrderForm";
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
    <>
      <header className="border-b border-coffee/10 bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#" className="font-serif text-2xl tracking-tight text-coffee">
            Кварта
          </a>
          <a
            href="#order"
            className="rounded-lg bg-coffee px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-coffee/90"
          >
            Заказать
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
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
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#order"
                className="inline-flex items-center justify-center rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-terracotta-dark"
              >
                Оставить заявку
              </a>
              <a
                href="#assortment"
                className="inline-flex items-center justify-center rounded-lg border border-coffee/20 px-6 py-3 text-sm font-medium text-coffee transition-colors hover:border-coffee/40 hover:bg-coffee/5"
              >
                Смотреть ассортимент
              </a>
            </div>
          </div>
        </section>

        {/* About */}
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

        {/* Assortment */}
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
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <article className="rounded-2xl border border-olive/25 bg-white p-6 shadow-sm">
                <span className="text-xs font-medium uppercase tracking-wide text-olive">
                  Дрип-пакеты
                </span>
                <h3 className="mt-2 font-serif text-xl text-coffee">
                  {dripPack.name}
                </h3>
                <p className="mt-2 text-sm text-coffee/75">
                  {dripPack.quantity} штук — удобно попробовать разные профили
                </p>
                <p className="mt-4 text-lg font-semibold text-coffee">
                  {formatPrice(dripPack.priceByn)}
                </p>
              </article>

              <article className="rounded-2xl border-2 border-terracotta/40 bg-white p-6 shadow-sm">
                <span className="text-xs font-medium uppercase tracking-wide text-terracotta">
                  Подписка
                </span>
                <h3 className="mt-2 font-serif text-xl text-coffee">
                  Кофе каждый месяц
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-coffee/75">
                  {subscription.description}
                </p>
                <p className="mt-4 text-lg font-semibold text-coffee">
                  {formatPrice(subscription.priceBynPerMonth)}{" "}
                  <span className="text-sm font-normal text-coffee/60">/ мес</span>
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Delivery */}
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
                <p className="mt-4 text-coffee/85">
                  {pickup.fullAddress}
                </p>
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

        {/* Order form */}
        <section id="order" className="bg-cream px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-lg">
            <h2 className="font-serif text-3xl text-coffee">Заявка на заказ</h2>
            <p className="mt-3 text-coffee/75">
              Оставьте контакты — перезвоним, уточним детали и соберём заказ к
              ближайшей пятнице.
            </p>
            <div className="mt-8">
              <OrderForm />
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
                <a
                  href="#order"
                  className="underline-offset-4 hover:underline"
                >
                  Оставить заявку
                </a>
              </p>
            </div>
          </div>
          <p className="mt-10 border-t border-cream/15 pt-6 text-xs text-cream/50">
            © Кварта, Минск
          </p>
        </div>
      </footer>
    </>
  );
}
