import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import en from "@/../lang/en.json";
import de from "@/../lang/de.json";
import { flattenMessages, INestedMessages } from "../../lang/flattenMessages";
export type Locale = "en" | "de";
const messages: Record<Locale, INestedMessages> = {
  en,
  de,
};
export const useLocale = () => {
  const router = useRouter();
  console.log(router.locale);
  const flattenedMessages = useMemo(
    () => flattenMessages(messages[router.locale as keyof typeof messages]),
    [router]
  );

  const switchLocale = useCallback(
    (locale: Locale) => {
      if (locale === router.locale) {
        return;
      }
      const path = router.asPath;
      return router.push(path, path, { locale });
    },
    [router]
  );
  return { locale: router.locale, switchLocale, messages: flattenedMessages };
};
