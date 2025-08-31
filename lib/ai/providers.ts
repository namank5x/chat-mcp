import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { createGateway } from '@ai-sdk/gateway';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { isTestEnvironment } from '../constants';

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY,
});

// Debug logging
if (!process.env.AI_GATEWAY_API_KEY) {
  console.warn('Warning: AI_GATEWAY_API_KEY is not set');
} else {
  console.log('AI_GATEWAY_API_KEY is set, length:', process.env.AI_GATEWAY_API_KEY.length);
}

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'gpt-4o-mini': chatModel,
        'gpt-oss-120b': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        // Main chat models
        'gpt-4o-mini': gateway('openai/gpt-4o-mini'),
        'gpt-oss-120b': gateway('openai/gpt-oss-120b'),
        
        // Specialized models (use appropriate models for tasks)
        'title-model': gateway('openai/gpt-oss-120b'), // Fast text generation
        'artifact-model': gateway('openai/gpt-4o-mini'), // Back to language model for text artifacts
      },
      imageModels: {
        // 'small-model': xai.imageModel('grok-2-image'),
      },
    });
