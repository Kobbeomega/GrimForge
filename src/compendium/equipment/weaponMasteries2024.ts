const weaponsByMastery = {
  Slow: ["club", "javelin", "light-crossbow", "schleuder", "peitsche", "longbow"],
  Nick: ["dagger", "leichter-hammer", "sichel", "scimitar"],
  Push: ["greatclub", "pike", "warhammer", "schwere-armbrust"],
  Vex: ["handaxe", "dart", "shortbow", "rapier", "shortsword", "blasrohr", "handarmbrust"],
  Sap: ["mace", "spear", "flegel", "longsword", "morgenstern", "kriegspicke"],
  Topple: ["quarterstaff", "battleaxe", "lanze", "zweihandhammer-maul", "dreizack"],
  Graze: ["glefe", "greatsword"],
  Cleave: ["greataxe", "hellebarde"],
};

const masteryByWeaponId = new Map(Object.entries(weaponsByMastery).flatMap(([mastery, ids]) =>
  ids.map((id) => [id, mastery] as const)));

export function getWeaponMastery2024(id: string): string | undefined {
  return masteryByWeaponId.get(id);
}
