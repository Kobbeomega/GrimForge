const labels: Record<string,string> = {
  "1 action": "1 Aktion",
  "1 action or 8 hours": "1 Aktion oder 8 Stunden",
  "1 bonus action": "1 Bonusaktion",
  "action": "1 Aktion",
  "action or ritual": "1 Aktion oder Ritual",
  "bonus action": "1 Bonusaktion",
  "1 minute or ritual": "1 Minute oder Ritual",
  "bonus action, which you take immediately after hitting a creature with a melee weapon or an unarmed strike": "1 Bonusaktion unmittelbar nach einem Treffer mit einer Nahkampfwaffe oder einem waffenlosen Schlag",
  "reaction, which you take when a creature you can see within 30 feet of you takes damage": "1 Reaktion, wenn eine sichtbare Kreatur innerhalb von 9 m Schaden erleidet",
  "1 reaction, which you take in response to being damaged by a creature within 60 feet of you that you can see": "1 Reaktion, wenn dir eine sichtbare Kreatur innerhalb von 18 m Schaden zufügt",
  "1 reaction, which you take when you are hit by an attack or targeted by the magic missile spell": "1 Reaktion, wenn ein Angriff dich trifft oder Magisches Geschoss dich zum Ziel hat",
  "1 reaction, which you take when you or a creature within 60 feet of you falls": "1 Reaktion, wenn du oder eine Kreatur innerhalb von 18 m fällt",
  "reaction, which you take when you see a creature within 60 feet of you casting a spell": "1 Reaktion, wenn du siehst, wie eine Kreatur innerhalb von 18 m einen Zauber wirkt",
  "1 reaction, which you take when you see a creature within 60 feet of you casting a spell": "1 Reaktion, wenn du siehst, wie eine Kreatur innerhalb von 18 m einen Zauber wirkt",
  "instantaneous": "Sofort",
  "touch": "Berührung",
  "until cured": "Bis zur Heilung",
  "until dispelled or triggered": "Bis der Zauber gebannt oder ausgelöst wird",
  "until dispelled": "Bis der Zauber gebannt wird",
  "special": "Speziell",
  "unlimited": "Unbegrenzt",
  "1 mile": "1 Meile",
  "self": "Selbst"
};

export function spellFact(value: string): string {
  const key = value.trim().toLowerCase().replace(/\.$/, "");
  if (labels[key]) return labels[key];
  const time = /^(?:(concentration,? up to|up to) )?(\d+) (round|minute|hour|day)s?$/.exec(key);
  if (time) {
    const units: Record<string,string[]> = {round:["Runde","Runden"], minute:["Minute","Minuten"],hour:["Stunde","Stunden"],day:["Tag","Tage"]};
    return (time[1]?.startsWith("concentration") ? "Konzentration, bis zu " : time[1] ? "Bis zu " : "") + time[2]+" "+units[time[3]][Number(time[2])===1?0:1];
  }
  const distance = /^(\d+) feet$/.exec(key);
  const meters = (ft:string) => (Number(ft)*0.3).toLocaleString("de-DE")+" m";
  if(distance) return meters(distance[1]);
  const area = /^self \((\d+)-foot[ -](radius hemisphere|radius|line|cube|cone)\)$/.exec(key);
  const shape: Record<string,string> = {radius:"Radius","radius hemisphere":"Radius, Halbkugel",line:"Linie",cube:"Würfel",cone:"Kegel"};
  if(area) return "Selbst ("+meters(area[1])+" "+shape[area[2]]+")";
  return value;
}
