declare const __REPOSITORY_URL__: string;

interface RegisterCardParams {
  type: string;
  name: string;
  description: string;
}

export function registerCustomCard(params: RegisterCardParams) {
  const windowWithCards = window as unknown as Window & {
    customCards: unknown[];
  };
  windowWithCards.customCards = windowWithCards.customCards || [];

  const cardPage = params.type.replace("-card", "").replace("equitherm-", "");
  windowWithCards.customCards.push({
    ...params,
    preview: true,
    documentationURL: `${__REPOSITORY_URL__}/blob/main/docs/cards/${cardPage}.md`,
  });
}
