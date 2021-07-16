import { SKey, S_EN, S_TR } from "languages";
import { useCallback } from "react";
import { Language } from "types";
import create from "zustand";

type LanguageStoreProps = {
	language: Language;
	setLanguage: (language: Language) => void;
};

export const useLanguageStore = create<LanguageStoreProps>((set, get) => ({
	language: Language.en,
	setLanguage: (language: Language) => set(() => ({ language: language })),
}));

function S_Language(key: string, language: Language): string {
	switch (language) {
		case Language.en:
			return S_EN[key];
		case Language.tr:
			return S_TR[key];
		default:
			return S_EN[key];
	}
}

export default function useLocalization() {
	const { language, setLanguage } = useLanguageStore((state) => ({ language: state.language, setLanguage: state.setLanguage }));
	const Key = SKey;

	const S = useCallback(
		(key: string) => {
			return S_Language(key, language);
		},
		[language]
	);

	return { S, Key, language, setLanguage };
}
