export const DEFAULT_CHAT_MODEL: string = 'gpt-4o-mini';

export interface ChatModel {
  id: string;
  name: string;
  description: string;
  supportsImages?: boolean;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    description: 'Fast, affordable model with function calling',
    supportsImages: true,
  },
  {
    id: 'gpt-oss-120b',
    name: 'GPT-OSS 120B',
    description: 'Fast reasoning, text-only',
    supportsImages: false,
  },
];
