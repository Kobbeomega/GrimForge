import { weaponDamageLabel } from "../../../compendium/equipment";
import {
  useMemo,
  useState,
} from "react";

import { GrimButton } from "../../../components/ui/GrimButton";

import {
  equipment, getEquipmentById,
} from "../../../compendium/equipment";

import type {
  EquipmentDefinition,
  WeaponItem,
} from "../../../compendium/equipment";

import { resolveInventoryItem } from "../../archives/utils/resolveInventoryItem";
import type {
  HomebrewEquipment,
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
  catalogId?: string;
  homebrew?: HomebrewEquipment;
  name: string;
  category: InventoryItemCategory;
  quantity: number;
  weight: number;
  notes: string;
}

type InventoryFilter =
  | "all"
  | InventoryItemCategory;

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

const filterLabels: Record<
  InventoryFilter,
  string
> = {
  all: "Alles",
  ...categoryLabels,
};

const emptyItemDraft: NewInventoryItemDraft = {
  name: "",
  category: "adventuring-gear",
  quantity: 1,
  weight: 0,
  notes: "",
  homebrew: {kind:"gear",price:0},
};

export function InventoryPanel({
  inventory,
  onChange,
}: InventoryPanelProps) {
  const [isAddingItem, setIsAddingItem] =
    useState(false);

  const [activeFilter, setActiveFilter] =
    useState<InventoryFilter>("all");

  const [newItem, setNewItem] =
    useState<NewInventoryItemDraft>(
      emptyItemDraft,
    );

  const [editId,setEditId] = useState<string>();

  const totalWeight = useMemo(
    () =>
      inventory.items.reduce(
        (sum, item) =>
          sum +
          item.weight *
            Math.max(0, item.quantity),
        0,
      ),
    [inventory.items],
  );

  const totalItemCount = useMemo(
    () =>
      inventory.items.reduce(
        (sum, item) =>
          sum +
          Math.max(0, item.quantity),
        0,
      ),
    [inventory.items],
  );

  const equippedItems = useMemo(
    () =>
      inventory.items.filter(
        (item) => item.equipped,
      ),
    [inventory.items],
  );

  const filteredItems = useMemo(
    () =>
      activeFilter === "all"
        ? inventory.items
        : inventory.items.filter(
            (item) =>
              item.category ===
              activeFilter,
          ),
    [
      activeFilter,
      inventory.items,
    ],
  );

  function handleAddItem() {
    const name = newItem.name.trim();

    if (!name) {
      return;
    }

    const timestamp =
      new Date().toISOString();

    const existing=inventory.items.find(item=>item.id===editId);
    const item: CharacterInventoryItem = {
      id: existing?.id ?? crypto.randomUUID(),

      name,
      catalogId: newItem.catalogId,
      homebrew: newItem.catalogId ? undefined : newItem.homebrew,

      category: newItem.category,

      quantity: Math.max(
        1,
        Math.floor(newItem.quantity),
      ),

      weight: Math.max(
        0,
        newItem.weight,
      ),

      equipped: Boolean(existing?.equipped && existing.homebrew?.kind === newItem.homebrew?.kind),

      notes: newItem.notes.trim(),

      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
    };

    if (item.homebrew && item.homebrew.kind !== "gear" && !resolveInventoryItem(item)) return;
    onChange({
      ...inventory,

      items: existing ? inventory.items.map(old=>old.id===existing.id?item:old) : [...inventory.items,item],
    });

    setNewItem(emptyItemDraft);
    setEditId(undefined);
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
          0,
          item.quantity + amount,
        ),
      }),
    );
  }

  function toggleEquipped(
    itemId: string,
  ) {
    const target = inventory.items.find(item=>item.id===itemId);
    if (!target) return;
    const category = resolveInventoryItem(target)?.category;
    const exclusive = !target.equipped && (category==="armor" || category==="shield");
    onChange({...inventory,items:inventory.items.map(item => item.id===itemId
      ? {...item,equipped:!item.equipped,updatedAt:new Date().toISOString()}
      : exclusive && resolveInventoryItem(item)?.category===category ? {...item,equipped:false} : item)});

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
    <section className="live-inventory">
      <header className="live-inventory__header">
        <div>
          <p>Kapitel III</p>

          <h2>Inventar</h2>

          <span>
            Ausrüstung, Vorräte und Waffen für
            die laufende Sitzung.
          </span>
        </div>

        <GrimButton
          type="button"
          onClick={() => {setEditId(undefined);setNewItem(emptyItemDraft);setIsAddingItem(!isAddingItem)}}
        >
          {isAddingItem
            ? "Editor schließen"
            : "Gegenstand hinzufügen"}
        </GrimButton>
      </header>

      <InventorySummary
        itemCount={totalItemCount}
        uniqueItemCount={
          inventory.items.length
        }
        equippedCount={
          equippedItems.length
        }
        totalWeight={totalWeight}
      />

      <EquippedItemsPanel
        items={equippedItems}
        onToggleEquipped={
          toggleEquipped
        }
      />

      <CurrencyEditor
        currency={inventory.currency}
        onChange={updateCurrency}
      />

      {isAddingItem && (
        <InventoryItemEditor
          key={editId ?? "new"}
          editing={Boolean(editId)}
          value={newItem}
          onChange={setNewItem}
          onSubmit={handleAddItem}
          onCancel={() => {
            setNewItem(emptyItemDraft);
            setEditId(undefined);
            setIsAddingItem(false);
          }}
        />
      )}

      <InventoryFilters
        activeFilter={activeFilter}
        items={inventory.items}
        onChange={setActiveFilter}
      />

      {inventory.items.length === 0 ? (
        <div className="live-inventory__empty">
          <strong>
            Noch keine Ausrüstung
          </strong>

          <span>
            Füge Waffen, Rüstungen,
            Verbrauchsgüter oder Werkzeuge
            hinzu.
          </span>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="live-inventory__empty">
          <strong>
            Keine passenden Gegenstände
          </strong>

          <span>
            In dieser Kategorie befinden sich
            aktuell keine Einträge.
          </span>
        </div>
      ) : (
        <div className="live-inventory__grid">
          {filteredItems.map((item) => (
            <InventoryItemCard
              key={item.id}
              item={item}
              onEdit={item.homebrew ? () => {setNewItem({...item});setEditId(item.id);setIsAddingItem(true)} : undefined}
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
  uniqueItemCount: number;
  equippedCount: number;
  totalWeight: number;
}

function InventorySummary({
  itemCount,
  uniqueItemCount,
  equippedCount,
  totalWeight,
}: InventorySummaryProps) {
  return (
    <dl className="live-inventory-summary">
      <div>
        <dt>Gegenstände</dt>

        <dd>{itemCount}</dd>

        <small>
          {uniqueItemCount} Einträge
        </small>
      </div>

      <div>
        <dt>Ausgerüstet</dt>

        <dd>{equippedCount}</dd>

        <small>
          kampfbereit
        </small>
      </div>

      <div>
        <dt>Gesamtgewicht</dt>

        <dd>
          {formatWeight(totalWeight)}
        </dd>

        <small>kg</small>
      </div>
    </dl>
  );
}

interface EquippedItemsPanelProps {
  items: CharacterInventoryItem[];

  onToggleEquipped: (
    itemId: string,
  ) => void;
}

function EquippedItemsPanel({
  items,
  onToggleEquipped,
}: EquippedItemsPanelProps) {
  return (
    <section className="equipped-items">
      <header className="equipped-items__header">
        <div>
          <p>Live-Ausrüstung</p>

          <h3>Ausgerüstete Gegenstände</h3>
        </div>

        <span>
          {items.length} aktiv
        </span>
      </header>

      {items.length === 0 ? (
        <div className="equipped-items__empty">
          <strong>
            Nichts ausgerüstet
          </strong>

          <span>
            Rüste unten eine Waffe, Rüstung
            oder einen Schild aus.
          </span>
        </div>
      ) : (
        <div className="equipped-items__grid">
          {items.map((item) => {
            const definition =
              resolveInventoryItem(item);

            return (
              <article
                key={item.id}
                className="equipped-item"
              >
                <header>
                  <div>
                    <span>
                      {
                        categoryLabels[
                          item.category
                        ]
                      }
                    </span>

                    <h4>{item.name}</h4>
                  </div>

                  <strong>
                    ×{item.quantity}
                  </strong>
                </header>

                <EquipmentDefinitionDetails
                  definition={definition}
                  fallbackNotes={item.notes}
                />

                <button
                  type="button"
                  onClick={() =>
                    onToggleEquipped(
                      item.id,
                    )
                  }
                >
                  Ablegen
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

interface InventoryFiltersProps {
  activeFilter: InventoryFilter;

  items: CharacterInventoryItem[];

  onChange: (
    filter: InventoryFilter,
  ) => void;
}

function InventoryFilters({
  activeFilter,
  items,
  onChange,
}: InventoryFiltersProps) {
  const filters: InventoryFilter[] = [
    "all",
    "weapon",
    "armor",
    "consumable",
    "adventuring-gear",
    "tool",
    "treasure",
    "other",
  ];

  return (
    <nav
      className="inventory-filters"
      aria-label="Inventarkategorien"
    >
      {filters.map((filter) => {
        const count =
          filter === "all"
            ? items.length
            : items.filter(
                (item) =>
                  item.category ===
                  filter,
              ).length;

        if (
          filter !== "all" &&
          count === 0
        ) {
          return null;
        }

        return (
          <button
            key={filter}
            type="button"
            className={
              activeFilter === filter
                ? "inventory-filters__button inventory-filters__button--active"
                : "inventory-filters__button"
            }
            aria-pressed={
              activeFilter === filter
            }
            onClick={() =>
              onChange(filter)
            }
          >
            <span>
              {filterLabels[filter]}
            </span>

            <strong>{count}</strong>
          </button>
        );
      })}
    </nav>
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
    <section className="live-currency">
      <header>
        <p>Vermögen</p>

        <h3>Münzen</h3>
      </header>

      <div className="live-currency__grid">
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
  function change(
    amount: number,
  ) {
    onChange(
      Math.max(
        0,
        value + amount,
      ),
    );
  }

  return (
    <article className="live-currency__field">
      <header>
        <span>{label}</span>

        <strong>
          {abbreviation}
        </strong>
      </header>

      <div>
        <button
          type="button"
          aria-label={`${label} verringern`}
          disabled={value <= 0}
          onClick={() => change(-1)}
        >
          −
        </button>

        <input
          type="number"
          min={0}
          inputMode="numeric"
          value={value}
          onChange={(event) =>
            onChange(
              Math.max(
                0,
                Number(
                  event.target.value,
                ),
              ),
            )
          }
        />

        <button
          type="button"
          aria-label={`${label} erhöhen`}
          onClick={() => change(1)}
        >
          +
        </button>
      </div>
    </article>
  );
}

interface InventoryItemCardProps {
  onEdit?: () => void;
  item: CharacterInventoryItem;

  onQuantityChange: (
    amount: number,
  ) => void;

  onToggleEquipped: () => void;
  onRemove: () => void;
}

function InventoryItemCard({
  item,
  onEdit,
  onQuantityChange,
  onToggleEquipped,
  onRemove,
}: InventoryItemCardProps) {
  const definition =
    resolveInventoryItem(item);

  const canEquip =
    item.category === "weapon" ||
    item.category === "armor" ||
    item.category === "tool" ||
    item.category ===
      "adventuring-gear";

  return (
    <article
      className={[
        "live-inventory-item",

        item.equipped
          ? "live-inventory-item--equipped"
          : "",

        item.quantity === 0
          ? "live-inventory-item--empty"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="live-inventory-item__header">
        <div>
          <p>
            {categoryLabels[item.category]}
          </p>

          <h3>{item.name}</h3>
        </div>

        {item.equipped && (
          <span>Ausgerüstet</span>
        )}
      </header>

      <EquipmentDefinitionDetails
        definition={definition}
        fallbackNotes={item.notes}
      />
      {item.homebrew && (item.homebrew.kind === "armor" || item.homebrew.kind === "shield") && item.notes && <p className="equipment-live-notes">{item.notes}</p>}

      <dl className="live-inventory-item__facts">
        <div>
          <dt>Menge</dt>

          <dd>{item.quantity}</dd>
        </div>

        <div>
          <dt>Stückgewicht</dt>

          <dd>
            {formatWeight(item.weight)} kg
          </dd>
        </div>

        <div>
          <dt>Gesamtgewicht</dt>

          <dd>
            {formatWeight(
              item.weight *
                item.quantity,
            )}{" "}
            kg
          </dd>
        </div>
        {definition && <div><dt>Wert je Stück</dt><dd>{definition.price} GM</dd></div>}
        {item.homebrew?.kind === "weapon" && <div><dt>Zusatzboni</dt><dd>Angriff {item.homebrew.attackBonus} · Schaden {item.homebrew.damageBonus}</dd></div>}
      </dl>

      <div className="live-inventory-item__quantity">
        <button
          type="button"
          disabled={item.quantity <= 0}
          aria-label={`${item.name} verbrauchen oder entfernen`}
          onClick={() =>
            onQuantityChange(-1)
          }
        >
          −
        </button>

        <strong>{item.quantity}</strong>

        <button
          type="button"
          aria-label={`${item.name} hinzufügen`}
          onClick={() =>
            onQuantityChange(1)
          }
        >
          +
        </button>
      </div>

      <footer className="live-inventory-item__actions">
        {onEdit && <button type="button" onClick={onEdit}>Werte bearbeiten</button>}
        {canEquip && (
          <button
            type="button"
            disabled={
              item.quantity <= 0
            }
            onClick={
              onToggleEquipped
            }
          >
            {item.equipped
              ? "Ablegen"
              : "Ausrüsten"}
          </button>
        )}

        <button
          type="button"
          className="live-inventory-item__remove"
          onClick={onRemove}
        >
          Entfernen
        </button>
      </footer>
    </article>
  );
}

interface EquipmentDefinitionDetailsProps {
  definition:
    | EquipmentDefinition
    | undefined;

  fallbackNotes: string;
}

function EquipmentDefinitionDetails({
  definition,
  fallbackNotes,
}: EquipmentDefinitionDetailsProps) {
  if (!definition) {
    return fallbackNotes ? (
      <p className="equipment-live-notes">
        {fallbackNotes}
      </p>
    ) : null;
  }

  if (
    definition.category === "weapon"
  ) {
    return (
      <><WeaponDetails weapon={definition} />{fallbackNotes && !fallbackNotes.includes("Schaden:") && <p className="equipment-live-notes">{fallbackNotes}</p>}</>
    );
  }

  if (
    definition.category === "armor" ||
    definition.category === "shield"
  ) {
    return (
      <dl className="equipment-live-facts">
        <div>
          <dt>Rüstungsklasse</dt>

          <dd>
            {definition.category ===
            "shield"
              ? `+${definition.armorClass}`
              : definition.armorClass}
          </dd>
        </div>

        <div>
          <dt>GE-Bonus</dt>

          <dd>
            {definition.dexterityModifier
              ? typeof definition.maximumDexterityBonus ===
                "number"
                ? `bis +${definition.maximumDexterityBonus}`
                : "voll"
              : "keiner"}
          </dd>
        </div>

        {definition.strengthRequirement && (
          <div>
            <dt>Mindeststärke</dt>

            <dd>
              {
                definition
                  .strengthRequirement
              }
            </dd>
          </div>
        )}

        <div>
          <dt>Heimlichkeit</dt>

          <dd>
            {definition.stealthDisadvantage
              ? "Nachteil"
              : "Normal"}
          </dd>
        </div>
      </dl>
    );
  }

  const description =
    definition.description ||
    fallbackNotes;

  return description ? (
    <p className="equipment-live-notes">
      {description}
    </p>
  ) : null;
}

function WeaponDetails({
  weapon,
}: {
  weapon: WeaponItem;
}) {
  const properties =
    weapon.properties.map(
      getWeaponPropertyLabel,
    );

  return (
    <section className="weapon-live-details">
      <dl className="equipment-live-facts">
        <div>
          <dt>Schaden</dt>

          <dd>
            {weaponDamageLabel(weapon.damage,getDamageTypeLabel(weapon.damage.type))}
          </dd>
        </div>

        {weapon.versatile && (
          <div>
            <dt>Vielseitig</dt>

            <dd>
              {weapon.versatile.dice}W
              {weapon.versatile.die}
            </dd>
          </div>
        )}

        {weapon.range && (
          <div>
            <dt>Reichweite</dt>

            <dd>
              {weapon.range.normal}
              {weapon.range.long
                ? ` / ${weapon.range.long}`
                : ""}{" "}
              ft
            </dd>
          </div>
        )}
      </dl>

      {properties.length > 0 && (
        <div className="weapon-live-properties">
          {properties.map(
            (property) => (
              <span key={property}>
                {property}
              </span>
            ),
          )}
        </div>
      )}
    </section>
  );
}

interface InventoryItemEditorProps {
  editing: boolean;
  value: NewInventoryItemDraft;

  onChange: (
    value: NewInventoryItemDraft,
  ) => void;

  onSubmit: () => void;
  onCancel: () => void;
}

function InventoryItemEditor({
  editing,
  value,
  onChange,
  onSubmit,
  onCancel,
}: InventoryItemEditorProps) {
  const [catalogQuery, setCatalogQuery] = useState("");
  const [useCatalog, setUseCatalog] = useState(false);
  const homebrew = value.homebrew ?? {kind:"gear",price:0};
  const patch = (h:HomebrewEquipment) => onChange({...value,homebrew:h});
  const num = (label:string,n:number,min:number,max:number,update:(n:number)=>void,step=1) =>
    <label className="grim-field"><span>{label}</span><input type="number" value={n} min={min} max={max} step={step} onChange={e=>{const v=e.target.valueAsNumber;if(Number.isFinite(v))update(Math.min(max,Math.max(min,step===1?Math.round(v):v)))}} /></label>;
  return (
    <section className="inventory-editor">
      <header>
        <p>Neuer Eintrag</p>

        <h3>{editing ? "Homebrew-Werte bearbeiten" : "Gegenstand hinzufügen"}</h3>
      </header>

      {!editing && <label className="grim-field"><span>Eintragsart</span><select value={useCatalog?"catalog":"custom"} onChange={e=>{setUseCatalog(e.target.value==="catalog");onChange(emptyItemDraft)}}><option value="custom">Eigener Gegenstand (Homebrew)</option><option value="catalog">Aus dem Ausrüstungskatalog</option></select></label>}
      {useCatalog && <div className="inventory-editor__grid">
        <label className="grim-field"><span>Katalog durchsuchen</span><input type="search" value={catalogQuery} onChange={e=>setCatalogQuery(e.target.value)}/></label>
        <label className="grim-field"><span>Kataloggegenstand</span><select value={value.catalogId??""} onChange={e=>{
          const d=getEquipmentById(e.target.value);if(!d){onChange(emptyItemDraft);return;}
          const category=d.category==="shield"?"armor":d.category==="ammunition"?"consumable":d.category==="gear"||d.category==="focus"?"adventuring-gear":d.category;
          onChange({...value,catalogId:d.id,name:d.name,category,weight:d.weight*0.45359237,notes:d.description??""});
        }}><option value="">Bitte wählen</option>{equipment.filter(d=>d.id===value.catalogId || d.name.toLocaleLowerCase("de").includes(catalogQuery.trim().toLocaleLowerCase("de"))).sort((a,b)=>a.name.localeCompare(b.name,"de")).map(d=><option key={d.id} value={d.id}>{d.name} · {d.price} GM</option>)}</select></label>
      </div>}
      <div className="inventory-editor__grid">
        <label className="grim-field">
          <span>Name</span>

          <input
            type="text"
            value={value.name}
            readOnly={useCatalog}
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
            disabled={useCatalog}
            onChange={(event) =>
              onChange({
                ...value,
                homebrew: event.target.value==="weapon" ? {kind:"weapon",price:homebrew.price,dice:1,die:6,damageType:"slashing",martial:false,finesse:false,ranged:false,twoHanded:false,attackBonus:0,damageBonus:0} : event.target.value==="armor" ? {kind:"armor",price:homebrew.price,armorClass:11,dexterity:"full"} : {kind:"gear",price:homebrew.price},
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
            step="any"
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

        {!useCatalog && num("Wert pro Stück (GM)",homebrew.price,0,1000000,price=>patch({...homebrew,price}),0.01)}
        {!useCatalog && homebrew.kind==="weapon" && <>
          {num("Anzahl Schadenswürfel",homebrew.dice,1,20,dice=>patch({...homebrew,dice}))}
          {num("Würfelseiten (1 = fester Schaden)",homebrew.die,1,100,die=>patch({...homebrew,die}))}
          <label className="grim-field"><span>Schadensart</span><select value={homebrew.damageType} onChange={e=>patch({...homebrew,damageType:e.target.value as typeof homebrew.damageType})}><option value="slashing">Hieb</option><option value="piercing">Stich</option><option value="bludgeoning">Wucht</option></select></label>
          {num("Zusatzbonus Angriff",homebrew.attackBonus,-20,20,attackBonus=>patch({...homebrew,attackBonus}))}
          {num("Zusatzbonus Schaden",homebrew.damageBonus,-20,20,damageBonus=>patch({...homebrew,damageBonus}))}
          {([["martial","Kriegswaffe"],["finesse","Finesse"],["ranged","Fernkampf"],["thrown","Wurfwaffe"],["twoHanded","Zweihändig"]] as const).map(([key,label])=><label key={key}><input type="checkbox" checked={Boolean(homebrew[key])} onChange={e=>patch({...homebrew,[key]:e.target.checked})}/> {label}</label>)}
          {(homebrew.ranged || homebrew.thrown) && <>
            {num("Normale Reichweite (Fuß; 0 = offen)",homebrew.rangeNormal??0,0,1000,rangeNormal=>patch({...homebrew,rangeNormal}))}
            {num("Maximale Reichweite (Fuß; 0 = offen)",homebrew.rangeLong??0,0,1000,rangeLong=>patch({...homebrew,rangeLong}))}
          </>}
        </>}
        {!useCatalog && (homebrew.kind==="armor" || homebrew.kind==="shield") && <>
          <label className="grim-field"><span>Art</span><select value={homebrew.kind} onChange={e=>patch({...homebrew,kind:e.target.value==="shield"?"shield":"armor",armorClass:e.target.value==="shield"?2:11})}><option value="armor">Rüstung</option><option value="shield">Schild</option></select></label>
          {num(homebrew.kind==="shield"?"RK-Bonus":"Basis-RK",homebrew.armorClass,1,homebrew.kind==="shield"?10:30,armorClass=>patch({...homebrew,armorClass}))}
          {homebrew.kind==="armor" && <label className="grim-field"><span>Geschicklichkeit zur RK</span><select value={homebrew.dexterity} onChange={e=>patch({...homebrew,dexterity:e.target.value as typeof homebrew.dexterity})}><option value="full">Voll</option><option value="limited">Maximal +2</option><option value="none">Nicht addieren</option></select></label>}
        </>}
        <label className="grim-field inventory-editor__notes">
          <span>Notizen und besondere Effekte</span>

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
          disabled={!value.name.trim() || (useCatalog && !value.catalogId)}
        >
          Eintrag versiegeln
        </GrimButton>
      </footer>
    </section>
  );
}

function getDamageTypeLabel(
  damageType:
    | "slashing"
    | "piercing"
    | "bludgeoning",
): string {
  switch (damageType) {
    case "slashing":
      return "Hieb";

    case "piercing":
      return "Stich";

    case "bludgeoning":
      return "Wucht";
  }
}

function getWeaponPropertyLabel(
  property:
    | "light"
    | "heavy"
    | "finesse"
    | "two-handed"
    | "versatile"
    | "reach"
    | "thrown"
    | "loading"
    | "ammunition",
): string {
  switch (property) {
    case "light":
      return "Leicht";

    case "heavy":
      return "Schwer";

    case "finesse":
      return "Finesse";

    case "two-handed":
      return "Zweihändig";

    case "versatile":
      return "Vielseitig";

    case "reach":
      return "Reichweite";

    case "thrown":
      return "Geworfen";

    case "loading":
      return "Laden";

    case "ammunition":
      return "Munition";
  }
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
