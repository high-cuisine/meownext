import Link from "next/link";
import PageContainer from "@/components/ui/page-container";
import CopyEmailButton from "@/components/layout/copy-email-button";

const SOCIAL_ICONS = {
  Telegram: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        className="fill-[#7a7a7a] transition-colors duration-200 group-hover:fill-[#c20f36]"
        d="M4.54373 23.9546C8.22663 21.9134 12.3377 20.2098 16.179 18.4974C22.7874 15.6928 29.422 12.9367 36.1236 10.3708C37.4275 9.93365 39.7703 9.50618 40 11.4504C39.8742 14.2025 39.3567 16.9385 39.0018 19.6744C38.1009 25.6911 37.0597 31.6872 36.0443 37.6841C35.6944 39.6817 33.2075 40.7157 31.6163 39.4374C27.7921 36.8383 23.9386 34.2644 20.1632 31.605C18.9266 30.3407 20.0734 28.5248 21.1778 27.6219C24.3275 24.4987 27.6678 21.8451 30.6529 18.5604C31.4581 16.604 29.0789 18.2528 28.2942 18.7581C23.9822 21.7479 19.7758 24.9203 15.2297 27.548C12.9075 28.8342 10.201 27.735 7.87987 27.0174C5.79874 26.1503 2.74906 25.2768 4.54352 23.9549L4.54373 23.9546Z"
      />
    </svg>
  ),
  Behance: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        className="fill-[#7a7a7a] transition-colors duration-200 group-hover:fill-[#c20f36]"
        d="M34.9189 17.6226C36.5111 17.6226 37.9441 17.9055 39.2188 18.4692C40.4957 19.0307 41.5472 19.9216 42.375 21.1372C43.1299 22.2091 43.6148 23.4529 43.8359 24.8657C43.9653 25.6916 44.0163 26.8892 43.9951 28.4458H30.6768C30.7567 30.2532 31.3868 31.5232 32.5908 32.2495C33.3199 32.7019 34.1975 32.9292 35.2275 32.9292C36.3117 32.9292 37.1983 32.6528 37.8779 32.103C38.2518 31.8038 38.5811 31.3907 38.8633 30.8618H43.7441C43.6147 31.9291 43.0216 33.0172 41.9727 34.1216C40.3357 35.8734 38.0426 36.7505 35.0957 36.7505C32.6616 36.7505 30.5138 36.013 28.6582 34.5327C26.7933 33.0547 25.8672 30.6457 25.8672 27.314C25.8672 24.1887 26.7069 21.7918 28.3838 20.1235C30.0653 18.4601 32.2404 17.6227 34.9189 17.6226ZM15.9443 11.7495C18.9592 11.7936 21.0923 12.6593 22.3506 14.3481C23.1055 15.3852 23.4843 16.6244 23.4844 18.0698C23.4844 19.557 23.106 20.7567 22.3418 21.6616C21.9137 22.1674 21.2853 22.6317 20.4551 23.0493C21.7156 23.5041 22.6657 24.2213 23.3125 25.2026C23.9522 26.1817 24.2744 27.3745 24.2744 28.7759C24.2744 30.2213 23.908 31.5184 23.1719 32.6646C22.7062 33.4233 22.1227 34.0638 21.4219 34.5835C20.634 35.1798 19.7047 35.5854 18.6299 35.8081C17.5552 36.0285 16.3934 36.1352 15.1377 36.1353H3.99902V11.7495H15.9443ZM8.92578 25.3989V31.9019H14.9277C16.0001 31.9019 16.8376 31.7585 17.4326 31.4731C18.5168 30.9395 19.0575 29.9279 19.0576 28.4292C19.0575 27.1579 18.5355 26.2876 17.4844 25.812C16.8964 25.5476 16.0709 25.4082 15.0127 25.3989H8.92578ZM34.9219 21.5122C33.699 21.5122 32.7433 21.8558 32.0684 22.5425C31.3936 23.2292 30.968 24.1598 30.7939 25.3335H39.0322C38.9452 24.0809 38.5178 23.1339 37.7607 22.4819C36.9941 21.8348 36.0505 21.5123 34.9219 21.5122ZM8.92578 15.9839V21.3647H14.9375C16.0075 21.3647 16.8801 21.163 17.5527 20.7593C18.2206 20.3555 18.5566 19.6405 18.5566 18.6196C18.5565 17.4807 18.1146 16.7313 17.2305 16.3647C16.4638 16.1119 15.4895 15.9839 14.3066 15.9839H8.92578ZM40.1523 15.9204H29.5596V12.8853H40.1523V15.9204Z"
      />
    </svg>
  ),
};

export default function SiteFooter({ email, copyright, socials, links }) {
  const resolvedEmail = email ?? "meowdes.studio@gmail.com";
  const resolvedCopyright = copyright ?? "© Meowdes 2026";
  const resolvedSocials = socials ?? [
    { label: "Telegram", href: "#" },
    { label: "Behance", href: "#" },
  ];
  const resolvedLinks = links ?? [
    { label: "Презентация", href: "#" },
    { label: "Политика конфиденциальности", href: "#" },
  ];

  return (
    <footer
      id="contacts"
      className="border-t border-[#333333] bg-[#0a0a0a] pb-12 pt-8 md:pt-16"
    >
      <PageContainer className="flex flex-col gap-12 md:flex-row md:items-stretch md:gap-5">
        <div className="flex md:min-h-[176px] min-w-0 flex-1 flex-col justify-between gap-5">
          <CopyEmailButton email={resolvedEmail} />
          <p className="hidden text-sm leading-5 text-[#7a7a7a] md:block">{resolvedCopyright}</p>
        </div>

        <div className="flex w-full max-w-[424px] min-w-0 flex-col gap-12">
          <div className="grid w-full grid-cols-2 gap-3">
            {resolvedSocials.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex flex-col items-center gap-1 rounded-xl bg-[#141414] px-6 py-3 transition-[background-color,transform] hover:bg-[#1f1f1f] active:bg-[#292929] active:scale-[0.98]"
                aria-label={item.label}
              >
                <span className="flex items-center rounded-xl p-3">
                  <span className="relative size-12">
                    {SOCIAL_ICONS[item.label] ?? null}
                  </span>
                </span>
                <span className="text-base leading-6 text-[#a5a5a5] transition-colors group-hover:text-[#fdfdfd]">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-start gap-3">
            {resolvedLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="w-fit px-1 text-base font-medium leading-6 text-[#a5a5a5] transition-colors hover:text-[#fdfdfd] active:text-[#d4d4d4]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="text-sm leading-5 text-[#7a7a7a] md:hidden">{resolvedCopyright}</p>
      </PageContainer>
    </footer>
  );
}
