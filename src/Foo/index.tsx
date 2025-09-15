import { type FC } from 'react';

const Foo: FC<{ title: string }> = (props) => (
  <h4 className=" ui-text-gray-300">{props.title}</h4>
);

export default Foo;
