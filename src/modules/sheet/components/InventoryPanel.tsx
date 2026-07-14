import { useMemo, useState } from "react";

import { GrimButton } from "../../../components/ui/GrimButton";

import type {
  CharacterCurrency,
  CharacterInventory,
  CharacterInventoryItem,
  InventoryItemCategory,
} from "../../archives/types";

interface InventoryPanelProps {
  inventory: CharacterInventory;

  onChange: (
    inventory: CharacterInventory,
  ) => void;
}

interface NewInventoryItemDraft {
  name: string;
  category: InventoryItemCategory;
  quantity: number;
  weight: number;
  notes: string;
}

const categoryLabels: Record<
  InventoryItemCategory,
  string
> = {
  weapon: "Waffe",
  armor: "Rüstung",
  consumable: "Verbrauchsgut",
  "adventuring-gear": "Reiseausrüstung",
  tool: "Werkzeug",
  treasure: "Wertgegenstand",
  other: "Sonstiges",
};

const emptyItemDraft: NewInventoryItemDraft = {
  name: "",
  category: "adventuring-gear",
  quantity: 1,
  weight: 0,
  notes: "",
};

export function InventoryPanel({
  inventory,
  onChange,
}: InventoryPanelProps) {
  const [isAddingItem, setIsAddingItem] =
    useState(false);

  const [newItem, setNewItem] =
    useState<NewInventoryItemDraft>(
      emptyItemDraft,
    );

  const totalWeight = useMemo(
    () =>
      inventory.items.reduce(
        (sum, item) =>
          sum +
          item.weight *
            item.quantity,
        0,
      ),
    [inventory.items],
  );

  function handleAddItem() {
    const name = newItem.name.trim();

    if (!name) {
      return;
    }

    const timestamp =
      new Date().toISOString();

    const item: CharacterInventoryItem = {
      id: crypto.randomUUID(),

      name,

      category: newItem.category,

      quantity: Math.max(
        1,
        Math.floor(newItem.quantity),
      ),

      weight: Math.max(
        0,
        newItem.weight,
      ),

      equipped: false,

      notes: newItem.notes.trim(),

      createdAt: timestamp,
      updatedAt: timestamp,
    };

    onChange({
      ...inventory,

      items: [
        ...inventory.items,
        item,
      ],
    });

    setNewItem(emptyItemDraft);
    setIsAddingItem(false);
  }

  function updateItem(
    itemId: string,
    updater: (
      item: CharacterInventoryItem,
    ) => CharacterInventoryItem,
  ) {
    onChange({
      ...inventory,

      items: inventory.items.map(
        (item) =>
          item.id === itemId
            ? {
                ...updater(item),
                updatedAt:
                  new Date().toISOString(),
              }
            : item,
      ),
    });
  }

  function changeQuantity(
    itemId: string,
    amount: number,
  ) {
    updateItem(
      itemId,
      (item) => ({
        ...item,

        quantity: Math.max(
          1,
          item.quantity + amount,
        ),
      }),
    );
  }

  function toggleEquipped(
    itemId: string,
  ) {
    updateItem(
      itemId,
      (item) => ({
        ...item,
        equipped: !item.equipped,
      }),
    );
  }

  function removeItem(
    itemId: string,
  ) {
    onChange({
      ...inventory,

      items: inventory.items.filter(
        (item) =>
          item.id !== itemId,
      ),
    });
  }

  function updateCurrency(
    currencyId: keyof CharacterCurrency,
    value: number,
  ) {
    onChange({
      ...inventory,

      currency: {
        ...inventory.currency,

        [currencyId]: Math.max(
          0,
          Math.floor(
            Number.isFinite(value)
              ? value
              : 0,
          ),
        ),
      },
    });
  }

  return (
    <section className="inventory-panel">
      <header className="inventory-panel__header">
        <div>
          <p>Kapitel IV</p>

          <h2>Inventar</h2>

          <span>
            Waffen, Ausrüstung, Vorräte und
            Wertgegenstände der geöffneten Akte.
          </span>
        </div>

        <GrimButton
          type="button"
          onClick={() =>
            setIsAddingItem(
              (current) => !current,
            )
          }
        >
          {isAddingItem
            ? "Eintrag schließen"
            : "Gegenstand hinzufügen"}
        </GrimButton>
      </header>

      <InventorySummary
        itemCount={inventory.items.reduce(
          (sum, item) =>
            sum + item.quantity,
          0,
        )}
        totalWeight={totalWeight}
      />

      <CurrencyEditor
        currency={inventory.currency}
        onChange={updateCurrency}
      />

      {isAddingItem && (
        <InventoryItemEditor
          value={newItem}
          onChange={setNewItem}
          onSubmit={handleAddItem}
          onCancel={() => {
            setNewItem(emptyItemDraft);
            setIsAddingItem(false);
          }}
        />
      )}

      {inventory.items.length === 0 ? (
        <div className="inventory-panel__empty">
          <p>
            Diese Akte enthält noch keine
            Ausrüstung.
          </p>

          <span>
            Füge beispielsweise Fackeln,
            Rationen, Waffen oder Werkzeuge
            hinzu.
          </span>
        </div>
      ) : (
        <div className="inventory-grid">
          {inventory.items.map((item) => (
            <InventoryItemCard
              key={item.id}
              item={item}
              onQuantityChange={(amount) =>
                changeQuantity(
                  item.id,
                  amount,
                )
              }
              onToggleEquipped={() =>
                toggleEquipped(item.id)
              }
              onRemove={() =>
                removeItem(item.id)
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}

interface InventorySummaryProps {
  itemCount: number;
  totalWeight: number;
}

function InventorySummary({
  itemCount,
  totalWeight,
}: InventorySummaryProps) {
  return (
    <dl className="inventory-summary">
      <div>
        <dt>Gegenstände</dt>
        <dd>{itemCount}</dd>
      </div>

      <div>
        <dt>Gesamtgewicht</dt>
        <dd>
          {formatWeight(totalWeight)} kg
        </dd>
      </div>
    </dl>
  );
}

interface CurrencyEditorProps {
  currency: CharacterCurrency;

  onChange: (
    currencyId: keyof CharacterCurrency,
    value: number,
  ) => void;
}

function CurrencyEditor({
  currency,
  onChange,
}: CurrencyEditorProps) {
  return (
    <section className="inventory-currency">
      <header>
        <p>Vermögen</p>
        <h3>Münzen</h3>
      </header>

      <div className="inventory-currency__grid">
        <CurrencyField
          label="Kupfer"
          abbreviation="KM"
          value={currency.copper}
          onChange={(value) =>
            onChange("copper", value)
          }
        />

        <CurrencyField
          label="Silber"
          abbreviation="SM"
          value={currency.silver}
          onChange={(value) =>
            onChange("silver", value)
          }
        />

        <CurrencyField
          label="Gold"
          abbreviation="GM"
          value={currency.gold}
          onChange={(value) =>
            onChange("gold", value)
          }
        />
      </div>
    </section>
  );
}

interface CurrencyFieldProps {
  label: string;
  abbreviation: string;
  value: number;

  onChange: (value: number) => void;
}

function CurrencyField({
  label,
  abbreviation,
  value,
  onChange,
}: CurrencyFieldProps) {
  return (
    <label className="inventory-currency__field">
      <span>{label}</span>

      <div>
        <input
          type="number"
          min={0}
          value={value}
          onChange={(event) =>
            onChange(
              Number(event.target.value),
            )
          }
        />

        <strong>
          {abbreviation}
        </strong>
      </div>
    </label>
  );
}

interface InventoryItemEditorProps {
  value: NewInventoryItemDraft;

  onChange: (
    value: NewInventoryItemDraft,
  ) => void;

  onSubmit: () => void;
  onCancel: () => void;
}

function InventoryItemEditor({
  value,
  onChange,
  onSubmit,
  onCancel,
}: InventoryItemEditorProps) {
  return (
    <section className="inventory-editor">
      <header>
        <p>Neuer Eintrag</p>

        <h3>Gegenstand hinzufügen</h3>
      </header>

      <div className="inventory-editor__grid">
        <label className="grim-field">
          <span>Name</span>

          <input
            type="text"
            value={value.name}
            placeholder="Zum Beispiel Fackel"
            onChange={(event) =>
              onChange({
                ...value,
                name: event.target.value,
              })
            }
          />
        </label>

        <label className="grim-field">
          <span>Kategorie</span>

          <select
            value={value.category}
            onChange={(event) =>
              onChange({
                ...value,

                category:
                  event.target.value as
                    InventoryItemCategory,
              })
            }
          >
            {Object.entries(
              categoryLabels,
            ).map(
              ([categoryId, label]) => (
                <option
                  key={categoryId}
                  value={categoryId}
                >
                  {label}
                </option>
              ),
            )}
          </select>
        </label>

        <label className="grim-field">
          <span>Menge</span>

          <input
            type="number"
            min={1}
            value={value.quantity}
            onChange={(event) =>
              onChange({
                ...value,

                quantity: Math.max(
                  1,
                  Number(
                    event.target.value,
                  ),
                ),
              })
            }
          />
        </label>

        <label className="grim-field">
          <span>
            Gewicht pro Stück in kg
          </span>

          <input
            type="number"
            min={0}
            step={0.1}
            value={value.weight}
            onChange={(event) =>
              onChange({
                ...value,

                weight: Math.max(
                  0,
                  Number(
                    event.target.value,
                  ),
                ),
              })
            }
          />
        </label>

        <label className="grim-field inventory-editor__notes">
          <span>Notizen</span>

          <textarea
            rows={4}
            value={value.notes}
            placeholder="Schaden, Eigenschaften oder freie Notizen ..."
            onChange={(event) =>
              onChange({
                ...value,
                notes: event.target.value,
              })
            }
          />
        </label>
      </div>

      <footer className="inventory-editor__actions">
        <GrimButton
          type="button"
          onClick={onCancel}
        >
          Verwerfen
        </GrimButton>

        <GrimButton
          type="button"
          onClick={onSubmit}
          disabled={!value.name.trim()}
        >
          Eintrag versiegeln
        </GrimButton>
      </footer>
    </section>
  );
}

interface InventoryItemCardProps {
  item: CharacterInventoryItem;

  onQuantityChange: (
    amount: number,
  ) => void;

  onToggleEquipped: () => void;
  onRemove: () => void;
}

function InventoryItemCard({
  item,
  onQuantityChange,
  onToggleEquipped,
  onRemove,
}: InventoryItemCardProps) {
  return (
    <article
      className={[
        "inventory-item",
        item.equipped
          ? "inventory-item--equipped"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="inventory-item__header">
        <div>
          <p>
            {categoryLabels[item.category]}
          </p>

          <h3>{item.name}</h3>
        </div>

        {item.equipped && (
          <span>
            Ausgerüstet
          </span>
        )}
      </header>

      <dl className="inventory-item__facts">
        <div>
          <dt>Menge</dt>
          <dd>{item.quantity}</dd>
        </div>

        <div>
          <dt>Gewicht</dt>
          <dd>
            {formatWeight(
              item.weight *
                item.quantity,
            )}{" "}
            kg
          </dd>
        </div>
      </dl>

      {item.notes && (
        <p className="inventory-item__notes">
          {item.notes}
        </p>
      )}

      <div className="inventory-item__quantity">
        <button
          type="button"
          onClick={() =>
            onQuantityChange(-1)
          }
        >
          −
        </button>

        <strong>{item.quantity}</strong>

        <button
          type="button"
          onClick={() =>
            onQuantityChange(1)
          }
        >
          +
        </button>
      </div>

      <footer className="inventory-item__actions">
        <button
          type="button"
          onClick={onToggleEquipped}
        >
          {item.equipped
            ? "Ablegen"
            : "Ausrüsten"}
        </button>

        <button
          type="button"
          onClick={onRemove}
        >
          Entfernen
        </button>
      </footer>
    </article>
  );
}

function formatWeight(
  value: number,
): string {
  return new Intl.NumberFormat(
    "de-DE",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  ).format(value);
}