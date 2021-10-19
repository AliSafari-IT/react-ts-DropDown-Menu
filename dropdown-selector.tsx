import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";

interface IFruity {
  id: number;
  fruit: string;
  prefix: string;
  suffix?: string;
}

const fruits: IFruity[] = [
  { id: 1, fruit: "Apples", prefix: "How's about them " },
  { id: 2, fruit: "Pear", prefix: "A cracking ", suffix: "!" },
  { id: 3, fruit: "Oranges", prefix: "What rhymes with ", suffix: "?" },
  { id: 4, fruit: "Banana", prefix: "Fruit flies like a " },
  { id: 5, fruit: "Coconuts", prefix: "Oh what a lovely bunch of " },
  { id: 6, fruit: "Avocado", prefix: "Is an ", suffix: " even a fruit?" }
];

type CustomToggleProps = {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {};
};

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(
  (props: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
    <a
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        props.onClick(e);
      }}
    >
      {props.children}
      <span style={{ paddingLeft: "5px" }}>&#x25bc;</span>
    </a>
  )
);

type CustomMenuProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  labeledBy?: string;
};

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  (props: CustomMenuProps, ref: React.Ref<HTMLDivElement>) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={props.style}
        className={props.className}
        aria-labelledby={props.labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={e => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(props.children).filter(
            (child: any) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

export const DropdownSelector = () => {
  const [selectedFruit, setSelectedFruit] = useState(0);

  const theChosenFruit = () => {
    const chosenFruit: IFruity = fruits.find(f => f.id === selectedFruit);
    return chosenFruit
      ? chosenFruit.prefix + chosenFruit.fruit + (chosenFruit.suffix || "")
      : "Select a fruit";
  };

  return (
    <Dropdown onSelect={(e: string) => setSelectedFruit(Number(e))}>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {theChosenFruit()}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        {fruits.map(fruit => {
          return (
            <Dropdown.Item key={fruit.id} eventKey={fruit.id.toString()}>
              {fruit.fruit}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};