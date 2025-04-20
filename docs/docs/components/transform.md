# Transform

The `Transform` component is used to manage the position, size, and movement of an entity or game object in the scene. It provides methods to translate the object in different directions and undo the last movement.

## Properties

- **x**: `number`  
  The x-coordinate of the object. Default is `0`.

- **y**: `number`  
  The y-coordinate of the object. Default is `0`.

- **width**: `number`  
  The width of the object. Default is `50`.

- **height**: `number`  
  The height of the object. Default is `50`.

- **movementSpeed**: `number`  
  The speed at which the object moves. Default is `5`.
  > **Note:** This propiertie may change in future versions.

- **rotation**: `number`  
  The rotation of the object in degrees. Default is `0`.

- **direction**: `"up" | "down" | "left" | "right" | "quiet"`  
  The current movement direction of the object. Default is `"quiet"`.
  > **Note:** This propiertie may change in future versions.

## Methods

### `translate(move: "up" | "down" | "left" | "right"): void`

Moves the object in the specified direction based on its `movementSpeed`. Updates the `x` and `y` coordinates and tracks the movement direction.

> **Note:** This method may change in future versions.

### `undo(): void`

Reverts the last movement based on the current `direction`. If the direction is `"quiet"`, no changes are made.

> **Note:** This method may change in future versions.

## Example

```ts
import { Transform } from "@cristianrg/game_engine";

const transform = new Transform(0, 0, 50, 50, 10);

// Move the object up
transform.translate("up");
console.log(transform.x, transform.y); // Outputs: 0, -10

// Undo the last movement
transform.undo();
console.log(transform.x, transform.y); // Outputs: 0, 0
```

Also you can add this component to `Entity` & `GameObject` class.

```ts
const entity = new Entity();
entity.addComponent(transform);

// To move the entity you can get the component and set the value or use 
// translate() method
entity.getComponent(Transform)!.x = 10
```

The `Transform` component is essential for managing the spatial properties of game objects and provides a simple API for movement and position tracking.