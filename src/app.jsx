/* eslint-disable react/prop-types */
import { useState } from "react";

const ListItems = ({ data, handleDrag, handleDrop, allowDrop }) => {
  return (
    <ul
      onDrop={handleDrop}
      onDragOver={(e) => allowDrop(e)}
      className="border rounded-lg p-4"
    >
      {data &&
        data.map((v) => {
          return (
            <li
              key={v.id}
              draggable
              onDragStart={(e) => handleDrag(e, v.id)}
              id={v.id}
              className="bg-slate-300 p-2 rounded-lg m-2 hover:cursor-pointer"
            >
              {v.item}
            </li>
          );
        })}
    </ul>
  );
};

const Source = ({ data, handleDrag, handleDrop, allowDrop }) => {
  return (
    <div className="w-1/2">
      <p className="text-center">Source Items</p>
      <ListItems
        data={data}
        handleDrag={handleDrag}
        handleDrop={(e) => handleDrop(e, "source")}
        allowDrop={allowDrop}
      />
    </div>
  );
};

const Target = ({ data, handleDrag, handleDrop, allowDrop }) => {
  return (
    <div className="w-1/2 min-h-[13rem]">
      <p className="text-center">Target Items</p>
      <ListItems
        data={data}
        handleDrag={handleDrag}
        handleDrop={(e) => handleDrop(e, "target")}
        allowDrop={allowDrop}
      />
    </div>
  );
};

export const App = () => {

  // Store the source list items : 
  const [sourceItems, setSourceItems] = useState([
    { id: 1, item: "Foo" },
    {
      id: 2,
      item: "Bar",
    },
    {
      id: 3,
      item: "Baz",
    },
  ]);

  // Store the target list items :
  const [targetItems, setTargetItems] = useState([{ id: 8, item: "Bouz" }]);


  // Store the ID of the item dragged : 
  const [lastIdSelected, setLastIdSelected] = useState(null);


  // On Drag we update the actual ID of the item selected :
  const handleDrag = (e, id) => {
    setLastIdSelected(id);
  };

  const handleDrop = (e, zone) => {
    e.preventDefault();

    // Avoid issue if we don't have selected item we do nothing :
    if (!lastIdSelected) return;

    if (zone == "source") {
      // Find the item selected from the target items list :
      const itemFound = targetItems.find((v) => v.id === lastIdSelected);

      // Remove the item selected from the target items list :
      const updateTargetItems = targetItems.filter(
        (v) => v.id !== lastIdSelected
      );

      // If the item exist we transfer it into the Source items list :
      if (itemFound) {
        setTargetItems(updateTargetItems);
        setSourceItems((prev) => [...prev, itemFound]);
      }
    } else if (zone == "target") {
      // Find the item selected from the sourceItems list :
      const itemFound = sourceItems.find((v) => v.id === lastIdSelected);

      // Remove the item selected from the SourceItems list :
      const updateSourceItems = sourceItems.filter(
        (v) => v.id !== lastIdSelected
      );

      // If the Item selected exist then we transfer it into the target items list :
      if (itemFound) {
        setSourceItems(updateSourceItems);
        setTargetItems((prev) => [...prev, itemFound]);
      }
    }


    // Clear out the ID back to NULL :
    setLastIdSelected(null);
  };

  const allowDrop = (e) => {

    // Can add some cool effect todo ...
    e.preventDefault();
  };

  return (
    <div className="flex gap-32 m-32 justify-center items-center">
      <Source
        data={sourceItems}
        handleDrag={handleDrag}
        handleDrop={handleDrop}
        allowDrop={allowDrop}
      />
      <Target
        data={targetItems}
        handleDrag={handleDrag}
        handleDrop={handleDrop}
        allowDrop={allowDrop}
      />
    </div>
  );
};
