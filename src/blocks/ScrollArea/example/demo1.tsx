import { ScrollArea, ThemeModel } from '@xybot/ui';

export default () => {
  const { isDarkMode } = ThemeModel.useModel();
  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        flexDirection: 'column',
        background: isDarkMode ? '#202127' : '#f4f4f7',
        padding: '16px',
      }}
    >
      <ScrollArea
        style={{
          width: 300,
          height: 200,
          padding: 16,
          border: '1px solid #ccc',
          borderRadius: 4,
        }}
      >
        <div
          style={{
            width: 350,
          }}
        >
          Jokester began sneaking into the castle in the middle of the night and
          leaving jokes all over the place: under the king's pillow, in his
          soup, even in the royal toilet. The king was furious, but he couldn't
          seem to stop Jokester. And then, one day, the people of the kingdom
          discovered that the jokes left by Jokester were so funny that they
          couldn't help but laugh. And once they started laughing, they couldn't
          stop. leaving jokes all over the place: under the king's pillow, in
          his soup, even in the royal toilet. The king was furious, but he
          couldn't seem to stop Jokester. And then, one day, the people of the
          kingdom discovered that the jokes left by Jokester were so funny that
          they couldn't help but laugh. And once they started laughing, they
          couldn't stop. leaving jokes all over the place: under the king's
          pillow, in his soup, even in the royal toilet. The king was furious,
          but he couldn't seem to stop Jokester. And then, one day, the people
          of the kingdom discovered that the jokes left by Jokester were so
          funny that they couldn't help but laugh. And once they started
          laughing, they couldn't stop.
        </div>
      </ScrollArea>
    </div>
  );
};
