export type LanguageOptions =
  | "english"
  | "arabic"
  | "hebrew"
  | "korean"
  | "japanese"
  | "chinese"
  | "cyrillic"
  | "greek";

export const TypeScaleTranslations: Record<LanguageOptions, string> = {
  english: "The quick brown fox jumps over the lazy dog",
  arabic: "اصبر على حفظ خضر واستشر فطنا، وزج همك في بغداذ منثمل",
  hebrew: "עטלף אבק נס דרך מזגן שהתפוצץ כי חם",
  korean: "다람쥐 헌 쳇바퀴에 타고파",
  japanese:
    "いろはにほへと ちりぬるを わかよたれそ つねならむ うゐのおくやま けふこえて あさきゆめみし ゑひもせす",
  chinese: "視野無限廣，窗外有藍天",
  cyrillic: "Съешь же ещё этих мягких французских булок, да выпей чаю",
  greek: "Ταχίστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός",
};
