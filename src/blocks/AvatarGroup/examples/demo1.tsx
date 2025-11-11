import { AvatarGroup } from '@xybot/ui';
import { useSafeState } from 'ahooks';

export default function App() {
  const [count, setCOunt] = useSafeState(30);

  // @ts-expect-error
  window.setCount = setCOunt;
  return (
    <div>
      <AvatarGroup
        avatarList={Array.from({ length: count }).map((_, index) => ({
          // src: `https://api.dicebear.com/7.x/miniavs/svg?seed=3`,
          name: `U`,
        }))}
        indent={-12}
        borderWidth={4}
        borderColor="#fff"
        className=" !text-xs"
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
