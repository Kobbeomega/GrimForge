# character.ts – Integration

Ergänze die Imports:

```ts
import {
  resolveCharacterClassFeatures,
} from "./classFeatures";

import {
  resolveCharacterClassResources,
} from "./classResources";

import type {
  CharacterClassResourceUsage,
} from "./classResources";
```

Ergänze `CharacterRuleInput`:

```ts
subclassId?: string;
spentClassResources?: CharacterClassResourceUsage;
```

Ergänze `CalculatedCharacterRules`:

```ts
classFeatures: ReturnType<
  typeof resolveCharacterClassFeatures
>;

classResources: ReturnType<
  typeof resolveCharacterClassResources
>;
```

Innerhalb von `calculateCharacterRules()`:

```ts
const classFeatures =
  resolveCharacterClassFeatures({
    classId: input.classId,
    subclassId: input.subclassId,
    level: input.level,
  });

const classResources =
  resolveCharacterClassResources({
    classId: input.classId,
    subclassId: input.subclassId,
    level: input.level,
    abilityScores: input.abilityScores,
    spentByResourceId:
      input.spentClassResources ?? {},
  });
```

Ergänze die Rückgabe:

```ts
classFeatures,
classResources,
```
