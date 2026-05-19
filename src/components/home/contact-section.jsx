import PageContainer from "@/components/ui/page-container";

const topics = ["Дизайн с нуля", "Редизайн проекта", "Брендинг"];
const channels = ["Telegram", "WhatsApp", "VK"];

export default function ContactSection() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(194,15,54,0.28),transparent_55%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(135deg,rgba(194,15,54,0.35)_12.5%,transparent_12.5%,transparent_50%,rgba(194,15,54,0.35)_50%,rgba(194,15,54,0.35)_62.5%,transparent_62.5%,transparent_100%)] [background-size:36px_36px]" />

      <PageContainer className="relative">
        <div className="mx-auto max-w-[713px]">
          <h2 className="text-center text-3xl font-semibold text-white sm:text-4xl">
            Начнём работу?
          </h2>

          <form className="mt-8 space-y-6" action="#" method="post">
            <div className="grid gap-6 md:grid-cols-[417px_1fr]">
              <div className="space-y-6">
                <label className="flex flex-col gap-2">
                  <span className="px-1 text-sm text-white sm:text-base">Ваше имя</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Например, Олег"
                    className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-white/30"
                  />
                </label>

                <fieldset className="space-y-3">
                  <legend className="px-1 text-sm text-white sm:text-base">
                    Что вас интересует?
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        className="rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-zinc-300"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <label className="flex flex-col gap-2">
                  <span className="px-1 text-sm text-white sm:text-base">Описание проекта</span>
                  <textarea
                    name="project"
                    rows={4}
                    placeholder="Расскажите, о чём ваш проект"
                    className="resize-none rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-white/30"
                  />
                </label>
              </div>

              <div className="space-y-6">
                <fieldset className="space-y-3">
                  <legend className="px-1 text-sm text-white sm:text-base">Способ связи</legend>
                  <div className="grid grid-cols-3 gap-1 rounded-full border border-white/10 bg-zinc-900 p-1">
                    {channels.map((channel, index) => (
                      <button
                        key={channel}
                        type="button"
                        className={`rounded-full px-3 py-2 text-sm ${
                          index === 0 ? "bg-zinc-700 text-white" : "text-zinc-400"
                        }`}
                      >
                        {channel}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <label className="flex flex-col gap-2">
                  <span className="px-1 text-sm text-white sm:text-base">Ваш Telegram</span>
                  <input
                    type="text"
                    name="contact"
                    placeholder="@nickname"
                    className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-white/30"
                  />
                  <span className="px-1 text-xs text-zinc-500">Никнейм или ссылка</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <label className="flex items-start gap-3 text-sm text-zinc-400">
                <input
                  type="checkbox"
                  name="policy"
                  className="mt-0.5 size-5 rounded border border-white/20 bg-transparent"
                />
                <span>
                  Отправляя форму, я соглашаюсь на обработку персональных данных и принимаю{" "}
                  <a href="#" className="text-white underline underline-offset-4">
                    Политику конфиденциальности
                  </a>
                </span>
              </label>

              <button
                type="submit"
                disabled
                className="rounded-xl bg-zinc-800 px-5 py-3 text-sm font-medium text-zinc-500 sm:text-base"
              >
                Отправить заявку
              </button>
            </div>
          </form>
        </div>
      </PageContainer>
    </section>
  );
}
