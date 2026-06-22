"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

export const topics = ["Дизайн с нуля", "Редизайн проекта", "Брендинг"];

export const channels = [
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
    inputLabel: "Ваш Whatsapp",
    placeholder: "+7 ...",
    helper: "Номер телефона",
    icon: "/home/contact-whatsapp.svg",
    validate(value) {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15;
    },
    error: "Введите корректный номер телефона (10-15 цифр)",
  },
  {
    key: "email",
    title: "Email",
    inputLabel: "Ваш Email",
    placeholder: "you@example.com",
    helper: "Адрес электронной почты",
    icon: "/home/contact-email.svg",
    validate(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    },
    error: "Введите корректный адрес электронной почты",
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
    return "bg-[#333333] text-[#fdfdfd] ring-2 ring-inset ring-[#ff1447]";
  }

  if (isDimmed) {
    return "bg-[#1f1f1f] text-[#7a7a7a]";
  }

  return "bg-[#333333] text-[#fdfdfd] hover:bg-[#4e4e4e] active:bg-[#292929]";
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

export default function ContactForm({ showHelper = false, idPrefix = "contact", onSubmitted }) {
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

  const activeChannelIndex = useMemo(
    () => channels.findIndex((channel) => channel.key === formData.channel),
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

    onSubmitted?.(formData);
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[417px_256px] md:gap-10">
        <div className="space-y-6">
          <label className="flex flex-col gap-1">
            <span className="px-1 text-base font-medium leading-6  text-[#fdfdfd]">
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
              aria-describedby={shouldShowError("name") && errors.name ? `${idPrefix}-name-error` : undefined}
              className={`w-full rounded-xl border px-4 py-3 text-base leading-6  text-[#fdfdfd] outline-none placeholder:text-[#7a7a7a] ${getFieldClasses(
                shouldShowError("name") && errors.name,
              )}`}
            />
            {shouldShowError("name") && errors.name ? (
              <span id={`${idPrefix}-name-error`} className="px-1 pt-1 text-xs leading-4  text-[#ff1447]">
                {errors.name}
              </span>
            ) : null}
          </label>

          <fieldset className="space-y-2">
            <legend className="px-1 text-base font-medium leading-6  text-[#fdfdfd]">
              Что Вас интересует?
            </legend>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Что вас интересует">
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
                    className={`rounded-xl px-4 py-3 text-base font-medium leading-6 tracking-[-0.04em] whitespace-nowrap transition-all duration-300 ease-out active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff1447] ${getTopicButtonClasses(
                      isSelected,
                      isDimmed,
                    )}`}
                    style={{
                      transitionProperty: "background-color, color, box-shadow, transform",
                    }}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>
            {shouldShowError("interests") && errors.interests ? (
              <p className="px-1 text-xs leading-4  text-[#ff1447]">{errors.interests}</p>
            ) : null}
          </fieldset>

          <label className="flex flex-col gap-1">
            <span className="px-1 text-base font-medium leading-6  text-[#fdfdfd]">
              Описание проекта
            </span>
            <textarea
              name="project"
              rows={2}
              value={formData.project}
              placeholder="Распишите о чем Ваш проект"
              onChange={(event) => handleFieldChange("project", event.target.value)}
              onBlur={() => handleBlur("project")}
              aria-invalid={Boolean(shouldShowError("project") && errors.project)}
              aria-describedby={shouldShowError("project") && errors.project ? `${idPrefix}-project-error` : undefined}
              className={`min-h-[66px] w-full resize-none rounded-xl border px-4 py-3 text-base leading-6  text-[#fdfdfd] outline-none placeholder:text-[#7a7a7a] ${getFieldClasses(
                shouldShowError("project") && errors.project,
              )}`}
            />
            {shouldShowError("project") && errors.project ? (
              <span id={`${idPrefix}-project-error`} className="px-1 pt-1 text-xs leading-4  text-[#ff1447]">
                {errors.project}
              </span>
            ) : null}
          </label>
        </div>

        <div className="space-y-6">
          <fieldset className="space-y-1">
            <legend className="px-1 text-base font-medium leading-6  text-[#fdfdfd]">
              Способ связи
            </legend>
            <div
              className="relative grid grid-cols-3 rounded-full border border-[#333333] bg-[#141414] p-1"
              role="radiogroup"
              aria-label="Способ связи"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute top-1 bottom-1 rounded-full bg-[#333333] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                style={{
                  width: "calc((100% - 8px) / 3)",
                  left: "4px",
                  transform: `translateX(calc(${activeChannelIndex} * 100%))`,
                }}
              />
              {channels.map((channel) => {
                const isActive = formData.channel === channel.key;

                return (
                  <button
                    key={channel.key}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => handleFieldChange("channel", channel.key)}
                    className={`relative z-10 flex min-w-0 items-center justify-center rounded-full bg-transparent px-5 py-2 transition-[background-color,transform] active:scale-95 ${
                      isActive ? "" : "hover:bg-[#1f1f1f] active:bg-[#292929]"
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
            <span className="px-1 text-base font-medium leading-6  text-[#fdfdfd]">
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
              aria-describedby={`${idPrefix}-contact-helper`}
              className={`w-full rounded-xl border px-4 py-3 text-base leading-6  text-[#fdfdfd] outline-none placeholder:text-[#7a7a7a] ${getFieldClasses(
                shouldShowError("contact") && errors.contact,
              )}`}
            />
            {shouldShowError("contact") && errors.contact ? (
              <span id={`${idPrefix}-contact-helper`} className="px-1 text-xs leading-4 text-[#ff1447]">
                {errors.contact}
              </span>
            ) : showHelper ? (
              <span id={`${idPrefix}-contact-helper`} className="px-1 text-xs leading-4 text-[#a5a5a5]">
                {selectedChannel.helper}
              </span>
            ) : null}
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <label className="flex flex-1 items-start gap-3 text-base font-medium leading-6  text-[#a5a5a5]">
          <input
            type="checkbox"
            name="policy"
            checked={formData.policy}
            onChange={(event) => handleFieldChange("policy", event.target.checked)}
            onBlur={() => handleBlur("policy")}
            className="peer sr-only"
          />
          <span
            style={{ borderRadius: "8px" }}
            className={`mt-px flex size-6 shrink-0 items-center justify-center border border-[#333333] bg-[#0a0a0a] p-0.5 transition-colors ${formData.policy ? "" : "peer-hover:bg-[#1f1f1f]"
              }`}
          >
            {formData.policy ? (
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M4.167 10.833 8.333 15l7.5-10" stroke="#e0123f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
          </span>
          <span>
            Отправляя форму, я соглашаюсь на обработку персональных данных и принимаю{" "}
            <a href="#" className="text-[#fdfdfd] underline decoration-transparent underline-offset-2 transition-colors hover:decoration-current active:text-[#d4d4d4]">
              Политику конфиденциальности
            </a>
            {shouldShowError("policy") && errors.policy ? (
              <span className="block pt-1 text-xs leading-4  text-[#ff1447]">{errors.policy}</span>
            ) : null}
          </span>
        </label>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`btn-press w-full rounded-xl px-5 py-3 text-base font-medium leading-6 lg:w-auto ${isFormValid
            ? "bg-[#c20f36] text-[#fdfdfd] hover:bg-[#ab0d30] active:bg-[#8f0b28]"
            : "cursor-not-allowed bg-[#292929] text-[#7a7a7a]"
            }`}
        >
          Отправить заявку
        </button>
      </div>
    </form>
  );
}
