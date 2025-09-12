import { type FC } from 'react';

const Foo: FC<{ title: string }> = (props) => (
  <h4 className=" flex text-gray-200">{props.title}</h4>
);

export default Foo;
