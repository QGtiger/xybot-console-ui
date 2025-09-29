import { ThemeModel } from '@xybot/ui';
import { UITable } from '../UITable';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

export default () => {
  const { isDarkMode } = ThemeModel.useModel();
  return (
    <div
      className="flex"
      style={{
        display: 'flex',
        gap: 16,
        flexDirection: 'column',
        padding: 16,
        background: isDarkMode ? '#202127' : '#f4f4f7',
      }}
    >
      <div
        style={{
          background: isDarkMode ? '#2b2b30' : '#fff',
          padding: 16,
          borderRadius: 8,
        }}
      >
        <UITable
          size="lg"
          data={defaultData}
          columns={[
            {
              accessorKey: 'firstName',
              header: 'First Name',
              size: 300,
            },
            {
              accessorKey: 'lastName',
              header: 'Last Name',
            },
          ]}
        />
      </div>
    </div>
  );
};
