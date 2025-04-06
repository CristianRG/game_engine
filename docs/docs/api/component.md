# Component

## What is a component?

A component can be defined as a modular unit of a software program that has well-defined interfaces and dependencies, allowing it to provide or request a set of services or functionalities.

To enable greater scalability and extensibility of the source code, this project uses a component-based architecture that allows you to create new functionalities that you can adapt to your needs.

## Basic Example

Creating a new component is as simple as creating a class with the name of the component you want to use and making it inherit the functionalities of the `Component` class.

```ts
import { Component } from "@cristianrg/game_engine";

class TestComponent extends Component {
    
    constructor(/* Avoid using arguments here... */) {
        super();
    }

    // Implement whatever methods you need for your component
}
```

In the code above, you can see how easy it is to create your own components. However, you should avoid passing arguments in the constructor because not all components use the same parameters, which could cause errors when trying to retrieve the component.

Now you should be able to use your components!

```ts
const entity = new Entity();
entity.addComponent(new TestComponent());
```