import Link, { LinkOptions } from '@tiptap/extension-link';

export function LinkExtension(opts?: Partial<LinkOptions>): any {
  return Link.configure({ ...opts });
}
