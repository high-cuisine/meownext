"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import PageContainer from "@/components/ui/page-container";

const topics = [
  "Дизайн с нуля",
  "Редизайн проекта",
  "Брендинг",
];

const channels = [
  {
    key: "telegram",
    title: "Telegram",
    inputLabel: "Ваш Telegram",
    placeholder: "@nickname",
    helper: "Никнейм или ссылка",
    icon: "/home/contact-telegram.svg",
    validate(value) {
      return /^(@[a-zA-Z0-9_]{3,32}|https?:\/\/(t\.me|telegram\.me)\/[a-zA-Z0-9_]{3,32})$/i.test(
        value,
      );
    },
    error: "Введите ник Telegram в формате @username или ссылку t.me",
  },
  {
    key: "whatsapp",
    title: "WhatsApp",
    inputLabel: "Ваш WhatsApp",
    placeholder: "+7 (999) 123-45-67",
    helper: "Телефон в международном формате",
    icon: "/home/contact-whatsapp.svg",
    validate(value) {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15;
    },
    error: "Введите корректный номер телефона (10-15 цифр)",
  },
  {
    key: "vk",
    title: "VK",
    inputLabel: "Ваш VK",
    placeholder: "vk.com/username",
    helper: "Никнейм или ссылка на профиль",
    icon: "/home/contact-vk.svg",
    validate(value) {
      return /^(@?[a-zA-Z0-9_.]{3,32}|https?:\/\/(www\.)?vk\.com\/[a-zA-Z0-9_.-]{3,64})$/i.test(
        value,
      );
    },
    error: "Введите ник VK или ссылку на профиль",
  },
];

function getFieldClasses(hasError) {
  if (hasError) {
    return "border-[#ff1447] bg-[#141414]";
  }

  return "border-[#333333] bg-[#141414] hover:border-[#4e4e4e] hover:bg-[#1f1f1f] focus:border-[#4e4e4e]";
}

function getTopicButtonClasses(isSelected, isDimmed) {
  if (isSelected) {
    return "border-[#ff1447] bg-[#333333] text-[#fdfdfd] ring-[#ff1447]";
  }

  if (isDimmed) {
    return "border-transparent bg-[#1f1f1f] text-[#7a7a7a] ring-transparent";
  }

  return "border-transparent bg-[#333333] text-[#fdfdfd] ring-transparent hover:border-[#4e4e4e] hover:bg-[#4e4e4e] hover:ring-[#4e4e4e]";
}

function validateForm(formData, selectedChannel) {
  const errors = {};

  if (formData.name.trim().length < 2) {
    errors.name = "Укажите имя не короче 2 символов";
  }

  if (!formData.interests.length) {
    errors.interests = "Выберите хотя бы одно направление";
  }

  if (formData.project.trim().length < 10) {
    errors.project = "Опишите проект минимум в 10 символах";
  }

  if (!selectedChannel.validate(formData.contact.trim())) {
    errors.contact = selectedChannel.error;
  }

  if (!formData.policy) {
    errors.policy = "Нужно согласие с политикой конфиденциальности";
  }

  return errors;
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    interests: [],
    project: "",
    channel: channels[0].key,
    contact: "",
    policy: false,
  });
  const [touched, setTouched] = useState({});
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const selectedChannel = useMemo(
    () => channels.find((channel) => channel.key === formData.channel) ?? channels[0],
    [formData.channel],
  );

  const errors = useMemo(
    () => validateForm(formData, selectedChannel),
    [formData, selectedChannel],
  );
  const isFormValid = Object.keys(errors).length === 0;

  const shouldShowError = (field) => isSubmitAttempted || touched[field];

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const toggleInterest = (interest) => {
    setTouched((prev) => ({ ...prev, interests: true }));
    setFormData((prev) => {
      const hasInterest = prev.interests.includes(interest);
      const nextInterests = hasInterest ? prev.interests : [interest];

      return { ...prev, interests: nextInterests };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitAttempted(true);
    setTouched({
      name: true,
      interests: true,
      project: true,
      contact: true,
      policy: true,
    });

    if (!isFormValid) {
      return;
    }
  };

  return (
    <section className="relative overflow-hidden bg-black py-12 sm:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-[24%] left-1/2 w-[1740px] -translate-x-1/2">
          <Image src="/home/contact-ellipse-bottom.svg" alt="" width={2240} height={2446} className="h-auto w-full max-w-none" />
        </div>
        <div className="absolute left-1/2 top-[-240%] w-[2584px] -translate-x-1/2">
          <Image src="/home/contact-ellipse-top.svg" alt="" width={3584} height={3587} className="h-auto w-full max-w-none" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[188px] opacity-35 [background-image:linear-gradient(135deg,rgba(194,15,54,0.6)_12.5%,transparent_12.5%,transparent_50%,rgba(194,15,54,0.6)_50%,rgba(194,15,54,0.6)_62.5%,transparent_62.5%,transparent_100%)] [background-size:36px_36px]" />
      </div>

      <PageContainer className="relative">
        <div className="mx-auto max-w-[713px]">
          <h2 className="text-center text-[34px] font-semibold leading-[1.2] tracking-[-1.2px] text-[#fdfdfd] sm:text-[40px] sm:leading-[48px] sm:tracking-[-1.33px]">
            Начнём работу?
          </h2>

          <form className="mt-8 space-y-8" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6 md:grid-cols-[417px_256px] md:gap-10">
              <div className="space-y-6">
                <label className="flex flex-col gap-1">
                  <span className="px-1 text-base font-medium leading-6 tracking-[-0.66px] text-[#fdfdfd]">
                    Ваше имя
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Например, Олег"
                    onChange={(event) => handleFieldChange("name", event.target.value)}
                    onBlur={() => handleBlur("name")}
                    aria-invalid={Boolean(shouldShowError("name") && errors.name)}
                    aria-describedby={shouldShowError("name") && errors.name ? "contact-name-error" : undefined}
                    className={`w-full rounded-xl border px-4 py-3 text-base leading-6 tracking-[-0.33px] text-[#fdfdfd] outline-none placeholder:text-[#7a7a7a] ${getFieldClasses(
                      shouldShowError("name") && errors.name,
                    )}`}
                  />
                  {shouldShowError("name") && errors.name ? (
                    <span id="contact-name-error" className="px-1 pt-1 text-xs leading-4 tracking-[-0.33px] text-[#ff1447]">
                      {errors.name}
                    </span>
                  ) : null}
                </label>

                <fieldset className="space-y-2">
                  <legend className="px-1 text-base font-medium leading-6 tracking-[-0.66px] text-[#fdfdfd]">
                    Что Вас интересует?
                  </legend>
                  <div className="flex flex-nowrap justify-between" role="radiogroup" aria-label="Что вас интересует">
                    {topics.map((topic) => {
                      const isSelected = formData.interests.includes(topic);
                      const isDimmed = formData.interests.length > 0 && !isSelected;

                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => toggleInterest(topic)}
                          role="radio"
                          aria-checked={isSelected}
                          className={`rounded-xl border ring-1 ring-inset px-4 py-3 text-base font-medium leading-6 tracking-[-0.66px] transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff1447] ${getTopicButtonClasses(
                            isSelected,
                            isDimmed,
                          )}`}
                          style={{
                            transitionProperty: "background-color, border-color, color, box-shadow",
                          }}
                        >
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                  {shouldShowError("interests") && errors.interests ? (
                    <p className="px-1 text-xs leading-4 tracking-[-0.33px] text-[#ff1447]">{errors.interests}</p>
                  ) : null}
                </fieldset>

                <label className="flex flex-col gap-1">
                  <span className="px-1 text-base font-medium leading-6 tracking-[-0.66px] text-[#fdfdfd]">
                    Описание проекта
                  </span>
                  <textarea
                    name="project"
                    rows={2}
                    value={formData.project}
                    placeholder="Раскажите о чем Ваш проект"
                    onChange={(event) => handleFieldChange("project", event.target.value)}
                    onBlur={() => handleBlur("project")}
                    aria-invalid={Boolean(shouldShowError("project") && errors.project)}
                    aria-describedby={shouldShowError("project") && errors.project ? "contact-project-error" : undefined}
                    className={`min-h-[66px] w-full resize-none rounded-xl border px-4 py-3 text-base leading-6 tracking-[-0.33px] text-[#fdfdfd] outline-none placeholder:text-[#7a7a7a] ${getFieldClasses(
                      shouldShowError("project") && errors.project,
                    )}`}
                  />
                  {shouldShowError("project") && errors.project ? (
                    <span id="contact-project-error" className="px-1 pt-1 text-xs leading-4 tracking-[-0.33px] text-[#ff1447]">
                      {errors.project}
                    </span>
                  ) : null}
                </label>
              </div>

              <div className="space-y-6">
                <fieldset className="space-y-1">
                  <legend className="px-1 text-base font-medium leading-6 tracking-[-0.66px] text-[#fdfdfd]">
                    Способ связи
                  </legend>
                  <div className="grid grid-cols-3 rounded-3 border border-[#333333] bg-[#141414] p-1">
                    {channels.map((channel) => {
                      const isActive = formData.channel === channel.key;

                      return (
                        <button
                          key={channel.key}
                          type="button"
                          onClick={() => handleFieldChange("channel", channel.key)}
                          className={`flex min-w-0 items-center justify-center rounded-[28px] px-5 py-2 transition-colors ${
                            isActive ? "bg-[#333333]" : "bg-transparent hover:bg-[#1f1f1f]"
                          }`}
                          aria-label={channel.title}
                          title={channel.title}
                        >
                          <Image src={channel.icon} alt="" aria-hidden width={24} height={24} className="size-6 shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <label className="flex flex-col gap-1">
                  <span className="px-1 text-base font-medium leading-6 tracking-[-0.66px] text-[#fdfdfd]">
                    {selectedChannel.inputLabel}
                  </span>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    placeholder={selectedChannel.placeholder}
                    onChange={(event) => handleFieldChange("contact", event.target.value)}
                    onBlur={() => handleBlur("contact")}
                    aria-invalid={Boolean(shouldShowError("contact") && errors.contact)}
                    aria-describedby="contact-helper"
                    className={`w-full rounded-xl border px-4 py-3 text-base leading-6 tracking-[-0.33px] text-[#fdfdfd] outline-none placeholder:text-[#7a7a7a] ${getFieldClasses(
                      shouldShowError("contact") && errors.contact,
                    )}`}
                  />
                  <span
                    id="contact-helper"
                    className={`px-1 text-xs leading-4 tracking-[-0.33px] ${
                      shouldShowError("contact") && errors.contact ? "text-[#ff1447]" : "text-[#a5a5a5]"
                    }`}
                  >
                    {shouldShowError("contact") && errors.contact ? errors.contact : selectedChannel.helper}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <label className="flex flex-1 items-start gap-3 text-base font-medium leading-6 tracking-[-0.33px] text-[#a5a5a5]">
                <input
                  type="checkbox"
                  name="policy"
                  checked={formData.policy}
                  onChange={(event) => handleFieldChange("policy", event.target.checked)}
                  onBlur={() => handleBlur("policy")}
                  className="peer sr-only"
                />
                <span
                  className={`mt-px flex size-6 shrink-0 items-center justify-center rounded-lg border border-[#333333] p-0.5 transition-colors ${
                    formData.policy ? "bg-[#0a0a0a]" : "bg-[#0a0a0a] peer-hover:bg-[#1f1f1f]"
                  }`}
                >
                  {formData.policy ? (
                    <Image src="/home/contact-check.svg" alt="" aria-hidden width={15} height={11} className="size-3" />
                  ) : null}
                </span>
                <span>
                  Отправляя форму, я соглашаюсь на обработку персональных данных и принимаю{" "}
                  <a href="#" className="text-[#fdfdfd]">
                    Политику конфиденциальности
                  </a>
                  {shouldShowError("policy") && errors.policy ? (
                    <span className="block pt-1 text-xs leading-4 tracking-[-0.33px] text-[#ff1447]">{errors.policy}</span>
                  ) : null}
                </span>
              </label>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`rounded-xl px-5 py-3 text-base font-medium leading-6 tracking-[-0.66px] transition-colors ${
                  isFormValid
                    ? "bg-[#c20f36] text-[#fdfdfd] hover:bg-[#ab0d30]"
                    : "cursor-not-allowed bg-[#292929] text-[#7a7a7a]"
                }`}
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
