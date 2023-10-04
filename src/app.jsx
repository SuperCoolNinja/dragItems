/* eslint-disable react/prop-types */
import { useState } from "react";

const ListItems = ({ data }) => {
  return (
    <ul className="border rounded-lg p-4">
      {data &&
        data.map((v) => {
          return (
            <li
              key={v.id}
              className="bg-slate-300 p-2 rounded-lg m-2 hover:cursor-pointer"
            >
              {v.item}
            </li>
          );
        })}
    </ul>
  );
};

const Source = ({ data }) => {
  return (
    <div className="w-1/2">
      <p className="text-center">Source Items</p>
      <ListItems data={data} />
    </div>
  );
};

const Target = ({ data }) => {
  return (
    <div className="w-1/2 min-h-[13rem]">
      <p className="text-center">Target Items</p>
      <ListItems data={data} />
    </div>
  );
};

export const App = () => {
  const [sourceItems, setSourceItems] = useState([
    {
      id: 1,
      item: "Foo",
    },
    {
      id: 2,
      item: "Bar",
    },
    {
      id: 3,
      item: "Baz",
    },
  ]);

  const [targetItems, setTargetItems] = useState([]);

  return (
    <div className="flex gap-32 m-32 justify-center items-center">
      <Source data={sourceItems} />
      <Target data={targetItems} />
    </div>
  );
};
