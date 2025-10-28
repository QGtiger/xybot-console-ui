import { AvatarGroup } from '@xybot/ui';

export default function App() {
  return (
    <div>
      <AvatarGroup
        avatarList={Array.from({ length: 20 }).map((_, index) => ({
          src: `https://api.dicebear.com/7.x/miniavs/svg?seed=3`,
          name: `User ${index + 1}`,
        }))}
        indent={-12}
        borderWidth={2}
      />
      <AvatarGroup
        avatarList={Array.from({ length: 7 }).map((_, index) => ({
          src: `https://api.dicebear.com/7.x/miniavs/svg?seed=3`,
          name: `User ${index + 1}`,
        }))}
        indent={-12}
        borderWidth={2}
        fixed="right"
      />
    </div>
  );
}
