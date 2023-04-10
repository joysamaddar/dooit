import { Draggable } from "react-beautiful-dnd";

export default function TaskCard({
  item,
  index,
}: {
  item: any;
  index: number;
}) {

  const deleteTaskHandler = ()=>{
    console.log("deleted");
  }

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex flex-col justify-center items-start p-4 min-h-[90px] bg-dwhite mt-5 mx-2 border-2 border-dgrey rounded">
            <div className="flex w-full items-center justify-between">
            <p>{item.name}</p>
            <button className="btn btn-square btn-xs" onClick={deleteTaskHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            </div>
            <div className="flex justify-between items-center w-full text-sm font-light text-dgrey">
              <p>
                <span>{item.type}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
