import { CommentTree } from '@xybot/ui';

export default () => {
  return (
    <CommentTree<{ id: number }>
      onReplay={async (ot, y) => {
        console.log(ot, y);
        throw new Error('Failed to post comment');
      }}
      items={[
        {
          id: 1,
          time: Date.now(),
          title: 'User A',
          name: 'User A',
          avatar: 'https://i.pravatar.cc/40?img=1',
          content:
            '<h1>123123123</h1><p></p><h1>123123123</h1><p></p><h1>123123123</h1><p></p><p></p>',
          children: [
            {
              id: 1,
              time: Date.now(),
              title: 'User B',
              name: 'User B',
              avatar: 'https://i.pravatar.cc/40?img=2',
              content: 'This is a reply from User B.',
            },
            {
              id: 1,
              time: Date.now() - 1000000,
              title: 'User B',
              name: 'User B',
              avatar: 'https://i.pravatar.cc/40?img=2',
              content: 'This is a reply from User B.',
              children: [
                {
                  id: 1,
                  time: Date.now(),
                  title: 'User A',
                  name: 'User A',
                  avatar: 'https://i.pravatar.cc/40?img=1',
                  content: 'This is a second-level reply from User A.',
                },
              ],
            },
          ],
        },
        {
          id: 1,
          time: Date.now(),
          title: 'User A',
          name: 'User A',
          avatar: 'https://i.pravatar.cc/40?img=1',
          content: 'This is a comment from User A.',
          children: [
            {
              id: 1,
              time: Date.now(),
              title: 'User B',
              name: 'User B',
              avatar: 'https://i.pravatar.cc/40?img=2',
              content: 'This is a reply from User B.',
            },
          ],
        },
      ]}
    />
  );
};
