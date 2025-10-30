import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
import { EmojiSuggestion } from './suggestion';

// https://tiptap.dev/docs/editor/extensions/nodes/emoji

export function TipTapEmoji(): any {
  return Emoji.configure({
    emojis: gitHubEmojis,
    // 启用表情符号
    enableEmoticons: true,
    suggestion: EmojiSuggestion,
  });
}
