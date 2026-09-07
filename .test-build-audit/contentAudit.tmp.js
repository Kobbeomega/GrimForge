//#region src/content/phase1/spellRulesLevel0To3.ts
var sourceSpellRulesLevel0To3 = [
	{
		"id": "calling-card",
		"sourceId": "calling_card",
		"name": "Calling Card",
		"level": 0,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": false,
		"castingTime": "Action",
		"range": "Touch",
		"components": "V, S, M (a fang from a rabid animal)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Unsichtbarkeit, RK/Schutz, Wahrnehmung, Kontrolle, Verwandlung. Rettungswurf: Weisheit. temporäre TP. Zustände: verängstigt, unsichtbar. Konzentration erforderlich.",
		"rulesTextEnglish": "You touch a corpse and leave a magical mark. You can choose to make it a visible mark that appears as a rune or word written on the flesh, or you can choose to make the mark Invisible. A creature that takes the Study action to specifically examine a corpse automatically detects it, whether visible or Invisible.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": [],
		"healingGerman": ["temporäre TP"],
		"conditionsGerman": ["verängstigt", "unsichtbar"],
		"effectTagsGerman": [
			"Heilung/TP",
			"Unsichtbarkeit",
			"RK/Schutz",
			"Wahrnehmung",
			"Kontrolle",
			"Verwandlung"
		],
		"source": "Grim Hollow 2025",
		"sourcePage": 192
	},
	{
		"id": "frightful-start",
		"sourceId": "frightful_start",
		"name": "Frightful Start",
		"level": 0,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": false,
		"castingTime": "Action",
		"range": "30 feet",
		"components": "V, S, M (a dead spider)",
		"duration": "1 round",
		"concentration": false,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Illusion. Rettungswurf: Weisheit. Zustände: verängstigt.",
		"rulesTextEnglish": "You twist your visage to scare a creature that you can see within range. The creature must succeed on a Wisdom saving throw or have the Frightened condition until the start of your next turn.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["verängstigt"],
		"effectTagsGerman": ["Illusion"],
		"source": "Grim Hollow 2025",
		"sourcePage": 197
	},
	{
		"id": "holy-word",
		"sourceId": "holy_word",
		"name": "Holy Word",
		"level": 0,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "Action",
		"range": "60 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["cleric"],
		"classLabelsGerman": ["Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Bewegung. Angriff: Fernkampf-Zauberangriff. Schaden: 1W8 gleißend.",
		"rulesTextEnglish": "You whisper a divine word under your breath, careful not to speak loudly, for such celestial power isn’t for the unworthy. Make a ranged spell attack against a target within range. On a hit, the target takes 1d8 Radiant damage.",
		"scalingTextEnglish": "",
		"attackTypesGerman": ["Fernkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": ["1W8 gleißend"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Bewegung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 198
	},
	{
		"id": "hunter-sense",
		"sourceId": "hunter_sense",
		"name": "Hunter Sense",
		"level": 0,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": false,
		"castingTime": "Action",
		"range": "Touch",
		"components": "V, S",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["druid"],
		"classLabelsGerman": ["Druide"],
		"mechanicsSummaryGerman": "Effekt: Erkenntnismagie. Konzentration erforderlich.",
		"rulesTextEnglish": "You touch a willing creature. For the duration, the target’s senses are heightened. Whenever the target makes a Wisdom (Perception) check, it can treat a d20 roll of 9 or lower as a 10.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erkenntnismagie"],
		"source": "Grim Hollow 2025",
		"sourcePage": 198
	},
	{
		"id": "illusory-instrument",
		"sourceId": "illusory_instrument",
		"name": "Illusory Instrument",
		"level": 0,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": false,
		"castingTime": "Action",
		"range": "Touch",
		"components": "V, S",
		"duration": "10 minutes",
		"concentration": false,
		"classIds": ["bard", "warlock"],
		"classLabelsGerman": ["Barde", "Hexenmeister"],
		"mechanicsSummaryGerman": "Effekt: Illusion, Erschaffung.",
		"rulesTextEnglish": "You create an illusionary copy of a mundane musical instrument. The copy of the instrument takes on the shape of your fondest memory of the instrument, such as the first flute you owned or the half harp gifted to you by a loved one. This illusion moves as its physical counterpart would, but it is weightless and is tangible only to you.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Illusion", "Erschaffung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 198
	},
	{
		"id": "preserve",
		"sourceId": "preserve",
		"name": "Preserve",
		"level": 0,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "Action",
		"range": "Touch",
		"components": "V, S, M (a sack containing a pinch of salt)",
		"duration": "12 hours",
		"concentration": false,
		"classIds": [
			"bard",
			"cleric",
			"druid",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Druide",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Verwandlung.",
		"rulesTextEnglish": "Food and other perishable items weighing 5 pounds or less that you place in a sack don’t age or decay for the duration.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verwandlung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 202
	},
	{
		"id": "arcane-aegis",
		"sourceId": "arcane_aegis",
		"name": "Arcane Aegis",
		"level": 1,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "Action",
		"range": "Self",
		"components": "S, M (a statuette of a hedgehog)",
		"duration": "1 minute",
		"concentration": false,
		"classIds": ["wizard"],
		"classLabelsGerman": ["Magier"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Schaden, Licht. Schaden: variabel (siehe Kurzregel EN). temporäre TP (2W10). Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "When you cast this spell, you are surrounded by a shimmering light that quickly dissipates. You gain 2d10 Temporary Hit Points. If a creature hits you with a melee attack before the spell ends, the creature takes Force damage equal to the number of Temporary Hit Points lost as a result of the attack.",
		"scalingTextEnglish": "You gain an additional 2d10 Temporary Hit Points for each spell slot level above 1.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": ["temporäre TP (2W10)"],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Heilung/TP",
			"Schaden",
			"Licht"
		],
		"source": "Grim Hollow 2025",
		"sourcePage": 189
	},
	{
		"id": "assisted-aim",
		"sourceId": "assisted_aim",
		"name": "Assisted Aim",
		"level": 1,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "Action",
		"range": "30 feet",
		"components": "V, S",
		"duration": "1 minute",
		"concentration": false,
		"classIds": [
			"bard",
			"cleric",
			"druid",
			"paladin",
			"ranger"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Druide",
			"Paladin",
			"Waldläufer"
		],
		"mechanicsSummaryGerman": "Effekt: Waffenwirkung. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You invigorate up to three creatures within range with improved accuracy. Each target gains a +1 bonus to attack rolls it makes with Ranged weapons. Additionally, the normal and long range of Ranged weapons wielded by a target are doubled for the spell’s duration.",
		"scalingTextEnglish": "You can target one additional creature for each spell slot level above 1.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Waffenwirkung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 189
	},
	{
		"id": "binding-pledge",
		"sourceId": "binding_pledge",
		"name": "Binding Pledge",
		"level": 1,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": true,
		"castingTime": "1 minute or Ritual",
		"range": "Touch",
		"components": "V, S, M (a book of religious or legal importance)",
		"duration": "10 days",
		"concentration": false,
		"classIds": [
			"bard",
			"cleric",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Erkenntnismagie. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "When you cast the spell, a willing creature within range makes a promise, swears an oath, or enters into a contract. For the duration of the spell, you immediately know if the creature breaks that promise, oath, or contract. If this happens, for the remainder of the duration of the spell, you know the distance and direction to the creature.",
		"scalingTextEnglish": "The duration becomes 30 days (level 3-4 slot) or 1 year (level 5-6 slot). If you use a level 7+ spell slot, the spell lasts until dispelled.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erkenntnismagie"],
		"source": "Grim Hollow 2025",
		"sourcePage": 189
	},
	{
		"id": "blood-rush",
		"sourceId": "blood_rush",
		"name": "Blood Rush",
		"level": 1,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "Bonus Action",
		"range": "Self",
		"components": "S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["druid", "ranger"],
		"classLabelsGerman": ["Druide", "Waldläufer"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP. TP-Effekt (siehe Kurzregel EN). Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "As part of casting this spell, you must expend one Hit Point Die or the spell automatically fails. Roll the Hit Point Die twice, and regain a number of Hit Points equal to the added roll plus your spellcasting ability modifier. Using a Higher-Level Spell Slot.",
		"scalingTextEnglish": "You can expend one additional Hit Point Die for each spell slot level above 1.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": ["TP-Effekt (siehe Kurzregel EN)"],
		"conditionsGerman": [],
		"effectTagsGerman": ["Heilung/TP"],
		"source": "Grim Hollow 2025",
		"sourcePage": 190
	},
	{
		"id": "bloodbane-rune",
		"sourceId": "bloodbane_rune",
		"name": "Bloodbane Rune",
		"level": 1,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "Action",
		"range": "Touch",
		"components": "S",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["cleric"],
		"classLabelsGerman": ["Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Waffenwirkung. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "As part of casting this spell, you must expend one Hit Point Die or the spell automatically fails. You target a weapon of your choice within range and scrawl onto it a rune written in blood. For the duration, while you wield this weapon, it weeps a phantasmal red ichor when within 30 feet of an Undead creature.",
		"scalingTextEnglish": "You expend an additional Hit Point Die for each spell slot level above 1. In addition, your Concentration can last longer with a spell slot of level 2 (up to 10 minutes) or 3+ (up to 1 hour).",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Waffenwirkung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 190
	},
	{
		"id": "boil-blood",
		"sourceId": "boil_blood",
		"name": "Boil Blood",
		"level": 1,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "Action",
		"range": "Touch",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["sangromancy"],
		"classLabelsGerman": ["Sangromancy"],
		"mechanicsSummaryGerman": "Effekt: Schaden. Schaden: variabel (siehe Kurzregel EN). Zustände: vergiftet.",
		"rulesTextEnglish": "As part of casting this spell, you must expend one Hit Point Die or the spell automatically fails. A willing target takes Fire damage equal to a roll of the expended Hit Point Die. If the target has the Poisoned condition, that condition immediately ends.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": [],
		"conditionsGerman": ["vergiftet"],
		"effectTagsGerman": ["Schaden"],
		"source": "Grim Hollow 2025",
		"sourcePage": 191
	},
	{
		"id": "consumption",
		"sourceId": "consumption",
		"name": "Consumption",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "Bonus Action",
		"range": "60 feet",
		"components": "V, S, M (a malnourished leech)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"druid",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Druide",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Konstitution. Schaden: variabel (siehe Kurzregel EN). Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "As part of casting this spell, you must expend one Hit Point Die or the spell automatically fails. Choose a creature within range and roll the expended Hit Point Die. The target takes Necrotic damage equal to the result.",
		"scalingTextEnglish": "You can target one additional creature for each spell slot level above 1.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "Grim Hollow 2025",
		"sourcePage": 193
	},
	{
		"id": "creeping-touch",
		"sourceId": "creeping_touch",
		"name": "Creeping Touch",
		"level": 1,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "Action",
		"range": "Self",
		"components": "V, S",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden, Kommunikation, Verwandlung. Schaden: 1W6 psychisch. Konzentration erforderlich.",
		"rulesTextEnglish": "You detach your hand at the wrist, transforming it into a Spider. While the spider is within 100 feet of you, you can communicate with it telepathically. Additionally, as a Magic action, you can see through its eyes and hear what it hears until the start of your next turn.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["1W6 psychisch"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Schaden",
			"Kommunikation",
			"Verwandlung"
		],
		"source": "Grim Hollow 2025",
		"sourcePage": 193
	},
	{
		"id": "crimson-lash",
		"sourceId": "crimson_lash",
		"name": "Crimson Lash",
		"level": 1,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "Bonus Action",
		"range": "Self",
		"components": "S",
		"duration": "1 minute",
		"concentration": false,
		"classIds": ["warlock", "wizard"],
		"classLabelsGerman": ["Hexenmeister", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Schaden, Licht, Waffenwirkung. Schaden: variabel (siehe Kurzregel EN). TP-Effekt (siehe Kurzregel EN). Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "As part of casting this spell, you must expend one Hit Point Die or the spell automatically fails. A writhing lash of coagulated blood springs from your hand with the following properties: • It counts as a Simple weapon with which you are proficient. • It has the Light, Finesse, and Reach properties. • You can use your spellcasting ability modifier instead of your Strength or Dexterity modifier for the attack and damage rolls with this weapon. • Its damage die is the same as the Hit Point Die expended to cast the spell, and the damage dealt is Necrotic. • Each time a creature takes damage from this weapon, its Hit Point maximum decreases...",
		"scalingTextEnglish": "If you cast this spell using a level 3-4 spell slot, you can make two weapon attacks with this weapon when you take the Attack action. If you use a level 5+ spell slot, you can make three weapon attacks with this weapon when you take the Attack action.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": ["TP-Effekt (siehe Kurzregel EN)"],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Heilung/TP",
			"Schaden",
			"Licht",
			"Waffenwirkung"
		],
		"source": "Grim Hollow 2025",
		"sourcePage": 193
	},
	{
		"id": "ghost-light",
		"sourceId": "ghost_light",
		"name": "Ghost Light",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "Action",
		"range": "Touch",
		"components": "V, S, M (a clear marble)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": [
			"bard",
			"cleric",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Licht.",
		"rulesTextEnglish": "You touch one object that is no larger than 10 feet in any dimension and specify any number of creatures you can see within 10 feet. Until the spell ends, the object sheds silvery Bright Light in a 20-foot radius and Dim Light for an additional 20 feet. This light is only visible to the creatures you specified during the casting of the spell; all other creatures perceive the area affected by the light as they regularly would.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Licht"],
		"source": "Grim Hollow 2025",
		"sourcePage": 197
	},
	{
		"id": "intaglio",
		"sourceId": "intaglio",
		"name": "Intaglio",
		"level": 1,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": true,
		"castingTime": "Action or Ritual",
		"range": "Touch",
		"components": "V, S, M (a quill or a vial of ink)",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": [
			"bard",
			"cleric",
			"paladin",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Paladin",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Erschaffung. Konzentration erforderlich.",
		"rulesTextEnglish": "You create a duplicate of a text or image. During the spell’s duration, you can take a Magic action to trace your hand over any non-magical text or image on a surface within range. You copy the text or image onto a new medium that you provide, such as another book or parchement.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erschaffung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 199
	},
	{
		"id": "neutralize-aura",
		"sourceId": "neutralize_aura",
		"name": "Neutralize Aura",
		"level": 1,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 minute",
		"range": "Touch",
		"components": "V, S, M (a sprig of sage)",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": [
			"bard",
			"cleric",
			"paladin"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Paladin"
		],
		"mechanicsSummaryGerman": "Effekt: Bannmagie. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You touch a willing creature and neutralize its aura. Until the spell ends, the target can’t be perceived by Fey, Fiends, Celestials, and Undead. The spell ends early immediately after the target makes an attack roll, deals damage, casts a spell, or moves within 5 feet of one of the creature types.",
		"scalingTextEnglish": "You can target one additional creature for each spell slot level above 1.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Bannmagie"],
		"source": "Grim Hollow 2025",
		"sourcePage": 201
	},
	{
		"id": "shroud-blood",
		"sourceId": "shroud_blood",
		"name": "Shroud Blood",
		"level": 1,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": false,
		"castingTime": "Action",
		"range": "30 feet",
		"components": "V, S",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": [
			"bard",
			"druid",
			"ranger",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Druide",
			"Waldläufer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Unsichtbarkeit. Zustände: unsichtbar. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "As part of casting this spell, you must expend one Hit Point Die or the spell automatically fails. You can choose yourself or a willing creature within 30 feet of yourself to have Advantage on Dexterity (Stealth) checks. When the target loses the Invisible condition, it can take a Reaction to gain the Invisible condition for a number of rounds equal to the number of Hit Point Dice expended to cast the spell.",
		"scalingTextEnglish": "You can target an additional creature for each spell slot level above 1.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["unsichtbar"],
		"effectTagsGerman": ["Unsichtbarkeit"],
		"source": "Grim Hollow 2025",
		"sourcePage": 205
	},
	{
		"id": "somnolence",
		"sourceId": "somnolence",
		"name": "Somnolence",
		"level": 1,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "Action",
		"range": "30 feet",
		"components": "V, S, M (sand mixed with the spellcast- er’s blood)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["bard", "warlock"],
		"classLabelsGerman": ["Barde", "Hexenmeister"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Schaden. Schaden: variabel (siehe Kurzregel EN). TP-Effekt (siehe Kurzregel EN). Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "As part of casting this spell, you must expend one Hit Point Die or the spell automatically fails. Roll the Hit Point Die expended to cast the spell plus 2d12 and choose a creature within range. If the roll’s total is equal to or greater than the chosen creature’s current Hit Points, the creature falls into a magical slumber for 1 minute.",
		"scalingTextEnglish": "You roll an additional 1d12 and can expend an additional two Hit Point Dice for every spell slot level above 1.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": ["TP-Effekt (siehe Kurzregel EN)"],
		"conditionsGerman": [],
		"effectTagsGerman": ["Heilung/TP", "Schaden"],
		"source": "Grim Hollow 2025",
		"sourcePage": 205
	},
	{
		"id": "thorn-armor",
		"sourceId": "thorn_armor",
		"name": "Thorn Armor",
		"level": 1,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "Action",
		"range": "Touch",
		"components": "V, S, M (a rose)",
		"duration": "10 minutes",
		"concentration": false,
		"classIds": ["druid", "ranger"],
		"classLabelsGerman": ["Druide", "Waldläufer"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Schaden. Schaden: variabel (siehe Kurzregel EN). temporäre TP (3W6) temporäre TP (2W6). Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "When you cast this spell, a flexible exoskeleton covered in thorns appears around a willing target within range. The target gains 3d6 Temporary Hit Points. If a creature hits the target with a melee attack roll before the spell ends, that creature takes Piercing damage equal to the number of Temporary Hit Points lost as a result of the attack.",
		"scalingTextEnglish": "The target gains an additional 2d6 Temporary Hit Points for each spell slot level above 1.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": ["temporäre TP (3W6)", "temporäre TP (2W6)"],
		"conditionsGerman": [],
		"effectTagsGerman": ["Heilung/TP", "Schaden"],
		"source": "Grim Hollow 2025",
		"sourcePage": 208
	},
	{
		"id": "tremor",
		"sourceId": "tremor",
		"name": "Tremor",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "Action",
		"range": "Self",
		"components": "V, S, M (small bell)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"bard",
			"druid",
			"ranger",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Druide",
			"Waldläufer",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Geschicklichkeit. Schaden: 1W6 Wucht. Zustände: liegend. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "The ground around you in a 15-foot Emanation begins to shake violently. You are unaffected by the tremors. The ground is considered Difficult Terrain and whenever the Emanation enters a creature’s space, a creature enters the Emanation, or the creature ends its turn there, the creature makes a Dexterity saving throw.",
		"scalingTextEnglish": "The damage increases by 1d6 for each spell slot level above 1.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": ["1W6 Wucht"],
		"healingGerman": [],
		"conditionsGerman": ["liegend"],
		"effectTagsGerman": ["Schaden"],
		"source": "Grim Hollow 2025",
		"sourcePage": 208
	},
	{
		"id": "vampiric-claws",
		"sourceId": "vampiric_claws",
		"name": "Vampiric Claws",
		"level": 1,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "Bonus Action",
		"range": "Self",
		"components": "V",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"druid",
			"ranger",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Druide",
			"Waldläufer",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Schaden. Schaden: 1W6 Hieb. temporäre TP. Konzentration erforderlich.",
		"rulesTextEnglish": "You sprout wicked claws. When you use your Unarmed Strike to deal damage with the new growth, it deals 1d6 Slashing damage instead of dealing the normal damage for your Unarmed Strike, and you use your spellcasting ability modifier for the attack and damage rolls rather than using Strength. While the spell lasts, each time you deal damage with an Unarmed Strike, you gain a number of Temporary Hit Points equal to your spellcasting ability modifier.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["1W6 Hieb"],
		"healingGerman": ["temporäre TP"],
		"conditionsGerman": [],
		"effectTagsGerman": ["Heilung/TP", "Schaden"],
		"source": "Grim Hollow 2025",
		"sourcePage": 209
	},
	{
		"id": "vibrating-humors",
		"sourceId": "vibrating_humors",
		"name": "Vibrating Humors",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "Action",
		"range": "30 feet",
		"components": "V, S, M (a tuning fork)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Hervorrufung. Rettungswurf: Konstitution. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "As part of casting this spell, you must expend one Hit Die or the spell automatically fails. A creature you can see within 30 feet of you must make a Constitution saving throw. On a failed save, the target takes Thunder damage and has Disadvantage on Dexterity (Stealth) checks from its blood vibrating loudly.",
		"scalingTextEnglish": "You increase the damage by expending an additional Hit Die for each spell slot level above 1.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Hervorrufung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 209
	},
	{
		"id": "bloat",
		"sourceId": "bloat",
		"name": "Bloat",
		"level": 2,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": false,
		"castingTime": "Action",
		"range": "30 feet",
		"components": "V, S, M (a bean)",
		"duration": "1 round",
		"concentration": false,
		"classIds": [
			"cleric",
			"druid",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Kleriker",
			"Druide",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Konstitution. Schaden: 3W10 nekrotisch.",
		"rulesTextEnglish": "You cause the gases within a creature you can see within range to expand rapidly. The target makes a Constitution saving throw, taking 3d10 Necrotic damage on a failed save or half as much damage on a successful one. If the damage that the creature takes equals or exceeds its Constitution ability score, the creature floats vertically 5 feet and remains suspended until the start of your next turn.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": ["3W10 nekrotisch"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "Grim Hollow 2025",
		"sourcePage": 189
	},
	{
		"id": "blood-wisp",
		"sourceId": "blood_wisp",
		"name": "Blood Wisp",
		"level": 2,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "Action",
		"range": "Self",
		"components": "V, S, M (a ruby worth 10 GP)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": [
			"bard",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden, Erschaffung. Schaden: variabel (siehe Kurzregel EN). Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "As part of casting this spell, you must expend two Hit Point Dice or the spell automatically fails. Roll the Hit Point Dice expended to cast the spell and create a red wisp with a number of Hit Points equal to the roll plus your spellcasting ability modifier. The wisp circles your head.",
		"scalingTextEnglish": "You can expend one additional Hit Point Die for each spell slot level above 2.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Erschaffung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 190
	},
	{
		"id": "bloodletter",
		"sourceId": "bloodletter",
		"name": "Bloodletter",
		"level": 2,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": false,
		"castingTime": "Bonus Action",
		"range": "Touch",
		"components": "V, S",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"cleric",
			"paladin",
			"ranger"
		],
		"classLabelsGerman": [
			"Kleriker",
			"Paladin",
			"Waldläufer"
		],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Schaden, Waffenwirkung. Rettungswurf: Konstitution. Schaden: 2W6 nekrotisch. TP-Effekt (siehe Kurzregel EN). Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You touch a nonmagical weapon. Until the spell ends, the first creature hit by the weapon must succeed on a Constitution saving throw or receive a festering wound. A creature with a festering wound takes 2d6 Necrotic damage at the start of each of its turns for the spell’s duration.",
		"scalingTextEnglish": "The damage increases by 1d6 for each spell slot above 2.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": ["2W6 nekrotisch"],
		"healingGerman": ["TP-Effekt (siehe Kurzregel EN)"],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Heilung/TP",
			"Schaden",
			"Waffenwirkung"
		],
		"source": "Grim Hollow 2025",
		"sourcePage": 190
	},
	{
		"id": "dazing-blast",
		"sourceId": "dazing_blast",
		"name": "Dazing Blast",
		"level": 2,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "Action",
		"range": "60 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Konstitution. Schaden: 2W6 Kraft. Zustände: betäubt. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A wave of force leaves your palms, targeting a creature within range. The target makes a Constitution saving throw. On a failed save, the creature takes 2d6 Force damage and has the Stunned condition until the end of its next turn.",
		"scalingTextEnglish": "One additional creature can be targeted for each spell slot above 2.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": ["2W6 Kraft"],
		"healingGerman": [],
		"conditionsGerman": ["betäubt"],
		"effectTagsGerman": ["Schaden"],
		"source": "Grim Hollow 2025",
		"sourcePage": 194
	},
	{
		"id": "enspelled-armament",
		"sourceId": "enspelled_armament",
		"name": "Enspelled Armament",
		"level": 2,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "Bonus Action",
		"range": "Self",
		"components": "M (a vial of oil and water)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": ["sorcerer"],
		"classLabelsGerman": ["Zauberer"],
		"mechanicsSummaryGerman": "Effekt: Waffenwirkung. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "When you cast this spell, choose one Simple or Martial weapon. A replica of the chosen weapon, made of iridescent energy, appears in your hands. For the duration, you are proficient with that weapon and whenever you attack with the weapon, you can use your spellcasting ability modifier for the attack and damage rolls instead of using Strength or Dexterity.",
		"scalingTextEnglish": "The damage of the weapon increases by 1d4 for each spell slot level above 2. If you cast the spell using a level 5+ spell slot, the duration becomes 8 hours.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Waffenwirkung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 195
	},
	{
		"id": "life-tether",
		"sourceId": "life_tether",
		"name": "Life Tether",
		"level": 2,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": false,
		"castingTime": "Action",
		"range": "120 feet",
		"components": "V, S",
		"duration": "Concentration, up to 1 minute.",
		"concentration": true,
		"classIds": [
			"cleric",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Kleriker",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden, Erschaffung. Rettungswurf: Weisheit. Schaden: variabel (siehe Kurzregel EN). Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "Choose a creature you can see within range. The target must make a Wisdom saving throw. On a failed save, a sickly green tether forms between you and your target.",
		"scalingTextEnglish": "You can create additional tethers with a spell slot of level 4 (two tethers), 6 (three tethers), or 8 (four tethers).",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Erschaffung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 199
	},
	{
		"id": "overgrow",
		"sourceId": "overgrow",
		"name": "Overgrow",
		"level": 2,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "Action",
		"range": "60 feet",
		"components": "V, S, M (a single seed)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"druid",
			"ranger",
			"sorcerer"
		],
		"classLabelsGerman": [
			"Druide",
			"Waldläufer",
			"Zauberer"
		],
		"mechanicsSummaryGerman": "Effekt: Verwandlung. Rettungswurf: Stärke. Zustände: festgesetzt. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "When you cast this spell, choose a creature or an object within range that is Huge or smaller and not being worn or carried within range. Vibrant vines quickly grow around the target, pinning it into place and making it easier to traverse. If the target is a creature, it must succeed on a Strength saving throw or have the Restrained condition until the spell ends.",
		"scalingTextEnglish": "You can choose an additional target for each spell slot level above 2.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Stärke"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["festgesetzt"],
		"effectTagsGerman": ["Verwandlung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 201
	},
	{
		"id": "sanguine-shield",
		"sourceId": "sanguine_shield",
		"name": "Sanguine Shield",
		"level": 2,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "Action",
		"range": "Self",
		"components": "V, S",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Erschaffung. temporäre TP. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "As part of casting this spell, you must expend two Hit Point Dice or the spell automatically fails. You draw lifeforce from those injured around you to create a swirling shield of blood. You gain 5 Temporary Hit Points for each creature within 30 feet of you that is below its Hit Point maximum (including you) to a maximum of 15 Temporary Hit Points.",
		"scalingTextEnglish": "The maximum number of Temporary Hit Points you gain increases by 5 for each two spell slot levels above 2.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": ["temporäre TP"],
		"conditionsGerman": [],
		"effectTagsGerman": ["Heilung/TP", "Erschaffung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 204
	},
	{
		"id": "seal-spellcasting",
		"sourceId": "seal_spellcasting",
		"name": "Seal Spellcasting",
		"level": 2,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "Action",
		"range": "60 feet",
		"components": "V, S, M (wax mixed with lead and a stamp)",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": ["sorcerer"],
		"classLabelsGerman": ["Zauberer"],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Charisma. Schaden: 3W8 Kraft. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "When you cast this spell, choose a creature you can see within range. When the target casts a spell, it must make a Charisma saving throw. On a failed save, the creature expends a spell slot to cast the spell as normal but the spell has no effect.",
		"scalingTextEnglish": "The damage increases by 1d8 for each spell slot above level 2.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Charisma"],
		"damageGerman": ["3W8 Kraft"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "Grim Hollow 2025",
		"sourcePage": 204
	},
	{
		"id": "sense-lifeblood",
		"sourceId": "sense_lifeblood",
		"name": "Sense Lifeblood",
		"level": 2,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": false,
		"castingTime": "Bonus Action",
		"range": "Self",
		"components": "S",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"druid",
			"ranger",
			"sorcerer"
		],
		"classLabelsGerman": [
			"Druide",
			"Waldläufer",
			"Zauberer"
		],
		"mechanicsSummaryGerman": "Effekt: Waffenwirkung. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "As part of casting this spell, you must expend two Hit Point Dice or the spell automatically fails. The lifeblood flowing within creatures tells you its secrets. Creatures that have Immunity to the Exhaustion condition are immune to this spell.",
		"scalingTextEnglish": "Your Concentration can last longer with a spell slot of level 3-4 (up to 1 hour) or 5+ (up to 8 hours).",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Waffenwirkung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 204
	},
	{
		"id": "summon-plant",
		"sourceId": "summon_plant",
		"name": "Summon Plant",
		"level": 2,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "Action",
		"range": "90 feet",
		"components": "V, S, M (a ceramic pot filled with herbs and fertilizer worth at least 200 GP)",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": ["druid", "ranger"],
		"classLabelsGerman": ["Druide", "Waldläufer"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Schaden, Licht, Bewegung. Schaden: variabel (siehe Kurzregel EN). TP-Effekt (siehe Kurzregel EN). Zustände: blind, taub, betäubt. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You call forth a plant spirit. It manifests in an unoccupied space you can see within range. This corporeal form uses the Plant Spirit stat block.",
		"scalingTextEnglish": "Use the spell slot’s level for the spell’s level in the stat block. Plant Spirit Medium (Large if Oaken) Plant, Neutral AC 11 + the spell’s level HP 20 (Blooming and Thorny Only) or 30 (Oaken Only) + 10 for each spell level above 2 Speed 30 ft.; Climb 30 ft. (Blooming and Thorny Only) MOD SAVE MOD SAVE MOD SAVE STR 16 +3 +3 DEX 13 +1 +1 CON 19 +4 +4 INT 4 -3 -3 WIS 12 +1 +1 CHA 10 +0 +0 Immunities Blinded, Deafened, Exhaustion, Stunned Senses Tremorsense 30 ft. (Blind beyond this radius), Passive Perception 11 Languages Understands the languages you know Challenge None (XP 0; PB equals...",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": ["TP-Effekt (siehe Kurzregel EN)"],
		"conditionsGerman": [
			"blind",
			"taub",
			"betäubt"
		],
		"effectTagsGerman": [
			"Heilung/TP",
			"Schaden",
			"Licht",
			"Bewegung"
		],
		"source": "Grim Hollow 2025",
		"sourcePage": 206
	},
	{
		"id": "theft-of-vitae",
		"sourceId": "theft_of_vitae",
		"name": "Theft of Vitae",
		"level": 2,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "Reaction, which you take when a creature you can see within 30 feet of you takes damage",
		"range": "Self",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["druid", "wizard"],
		"classLabelsGerman": ["Druide", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Schaden. Schaden: variabel (siehe Kurzregel EN). temporäre TP. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "Roll the Hit Point Dice expended to cast the spell. The triggering creature takes Necrotic damage equal to the result. You gain Temporary Hit Points equal to the result plus the triggering damage, to a maximum of 15 Temporary Hit Points.",
		"scalingTextEnglish": "The maximum number of Temporary Hit Points you can gain from casting increases by 10 for each slot level above 2.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": ["temporäre TP"],
		"conditionsGerman": [],
		"effectTagsGerman": ["Heilung/TP", "Schaden"],
		"source": "Grim Hollow 2025",
		"sourcePage": 208
	},
	{
		"id": "wilting-smite",
		"sourceId": "wilting_smite",
		"name": "Wilting Smite",
		"level": 2,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "Bonus Action, which you take immediately after hitting a creature with a Melee weapon or an Unarmed Strike",
		"range": "Self",
		"components": "V",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["paladin"],
		"classLabelsGerman": ["Paladin"],
		"mechanicsSummaryGerman": "Effekt: Verwandlung.",
		"rulesTextEnglish": "As part of casting this spell, you must expend two Hit Point Dice or the spell automatically fails. The creature loses all Resistances to damage until the start of your next turn. The target hit by the strike takes extra Necrotic damage from the attack.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verwandlung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 210
	},
	{
		"id": "wrack",
		"sourceId": "wrack",
		"name": "Wrack",
		"level": 2,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": false,
		"castingTime": "Action",
		"range": "30 feet",
		"components": "V, S, M (a frayed piece of cord)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["cleric"],
		"classLabelsGerman": ["Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Dunkelheit, Waffenwirkung, Bewegung, Erschaffung, Verwandlung. Rettungswurf: Konstitution. TP-Effekt (siehe Kurzregel EN). Konzentration erforderlich.",
		"rulesTextEnglish": "Choose a creature that you can see within range. The target must succeed on a Constitution saving throw or be afflicted with excruciating muscle spasms for the duration. On a failed save, the target’s Speed is halved and it has Disadvantage on attack rolls.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": [],
		"healingGerman": ["TP-Effekt (siehe Kurzregel EN)"],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Heilung/TP",
			"Dunkelheit",
			"Waffenwirkung",
			"Bewegung",
			"Erschaffung",
			"Verwandlung"
		],
		"source": "Grim Hollow 2025",
		"sourcePage": 210
	},
	{
		"id": "blood-bond",
		"sourceId": "blood_bond",
		"name": "Blood Bond",
		"level": 3,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "Action",
		"range": "Touch",
		"components": "V, S, M (a rag soaked in your own blood)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": ["druid"],
		"classLabelsGerman": ["Druide"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Schaden. Schaden: variabel (siehe Kurzregel EN). temporäre TP. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "As part of casting this spell, you must expend three Hit Point Dice or the spell automatically fails. Roll the expended Hit Point Dice, and the target gains a number of Temporary Hit Points equal to the roll’s total. For the duration, you know the direction and distance to the target, and you and the target can speak telepathically.",
		"scalingTextEnglish": "The duration increases with a spell slot level 5 or 6 (8 hours), 7 or 8 (24 hours), and 9 (7 days).",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": ["temporäre TP"],
		"conditionsGerman": [],
		"effectTagsGerman": ["Heilung/TP", "Schaden"],
		"source": "Grim Hollow 2025",
		"sourcePage": 190
	},
	{
		"id": "conjure-plants",
		"sourceId": "conjure_plants",
		"name": "Conjure Plants",
		"level": 3,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "Action",
		"range": "60 feet",
		"components": "V, S",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": [
			"druid",
			"ranger",
			"warlock"
		],
		"classLabelsGerman": [
			"Druide",
			"Waldläufer",
			"Hexenmeister"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden, Beschwörung, Licht. Rettungswurf: Geschicklichkeit. Schaden: 3W6 Hieb. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You conjure animated plants that appear as a Large mass of vines, stems, shoots, roots, and leaves in an unoccupied space you can see within range. The vegetation lasts for the duration. While you’re within 5 feet of the plants or sharing a space with them, you are considered to be in a Lightly Obscured area.",
		"scalingTextEnglish": "The damage increases by 1d6 for each spell slot level above 3.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": ["3W6 Hieb"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Schaden",
			"Beschwörung",
			"Licht"
		],
		"source": "Grim Hollow 2025",
		"sourcePage": 192
	},
	{
		"id": "curse-of-fastidious-pride",
		"sourceId": "curse_of_fastidious_pride",
		"name": "Curse of Fastidious Pride",
		"level": 3,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 hour",
		"range": "Special",
		"components": "V, S, M (a shred of the target’s clothing, an uncrushed dead spider, and a sewing needle worth 600+ GP, all of which the spell consumes)",
		"duration": "Until cured",
		"concentration": false,
		"classIds": ["shadowsteel-curse"],
		"classLabelsGerman": ["Shadowsteel Curse"],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Intelligenz. Schaden: 2W10 psychisch, 4W10 psychisch. Zustände: blind.",
		"rulesTextEnglish": "This spell curses a creature with narcissistic hubris. The target must make an Intelligence saving throw. Successful Saving Throw.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Intelligenz"],
		"damageGerman": ["2W10 psychisch", "4W10 psychisch"],
		"healingGerman": [],
		"conditionsGerman": ["blind"],
		"effectTagsGerman": ["Schaden"],
		"source": "Grim Hollow 2025",
		"sourcePage": 215
	},
	{
		"id": "curse-of-ravenous-hunger",
		"sourceId": "curse_of_ravenous_hunger",
		"name": "Curse of Ravenous Hunger",
		"level": 3,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 hour",
		"range": "Special",
		"components": "V, S, M (a morsel of food that belonged to the target, a sun-dried slug, and a dining plate worth 400+ GP, all of which the spell consumes)",
		"duration": "Until cured",
		"concentration": false,
		"classIds": ["shadowsteel-curse"],
		"classLabelsGerman": ["Shadowsteel Curse"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Schaden. Rettungswurf: Konstitution. Schaden: 2W10 Gift, 4W10 Gift. TP-Effekt (siehe Kurzregel EN). Zustände: vergiftet.",
		"rulesTextEnglish": "This spell curses a creature with painful and unending starvation. The target must make a Constitution saving throw. Successful Saving Throw.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": ["2W10 Gift", "4W10 Gift"],
		"healingGerman": ["TP-Effekt (siehe Kurzregel EN)"],
		"conditionsGerman": ["vergiftet"],
		"effectTagsGerman": ["Heilung/TP", "Schaden"],
		"source": "Grim Hollow 2025",
		"sourcePage": 217
	},
	{
		"id": "elemental-exhalation",
		"sourceId": "elemental_exhalation",
		"name": "Elemental Exhalation",
		"level": 3,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "Action",
		"range": "Self",
		"components": "S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["druid", "sorcerer"],
		"classLabelsGerman": ["Druide", "Zauberer"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Bewegung. Rettungswurf: Geschicklichkeit. Schaden: 2W6 Feuer. Zustände: verängstigt, liegend. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "When you cast this spell, choose one of the following effects that determine the spell’s damage type: Air. The damage type is Thunder. Each creature that fails the saving throw is pushed 10 feet away from you.",
		"scalingTextEnglish": "The damage increases by 1d6 for each spell slot level above 3.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": ["2W6 Feuer"],
		"healingGerman": [],
		"conditionsGerman": ["verängstigt", "liegend"],
		"effectTagsGerman": ["Schaden", "Bewegung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 194
	},
	{
		"id": "emmeline-s-essence-infusion",
		"sourceId": "emmeline_s_essence_infusion",
		"name": "Emmeline’s Essence Infusion",
		"level": 3,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "8 hours",
		"range": "Touch",
		"components": "V, S, M (a diamond vial containing at least one ounce of blood worth at least 100 GP, which this spell consumes)",
		"duration": "Special",
		"concentration": false,
		"classIds": ["wizard"],
		"classLabelsGerman": ["Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Teleportation, Licht, Waffenwirkung. Schaden: 1W6 psychisch, 1W6 gleißend, 1W4 Kraft, 1W6 nekrotisch. Zustände: verängstigt.",
		"rulesTextEnglish": "When you cast this spell, you target one nonmagical weapon within range. That weapon becomes magical and gains a special benefit based on the creature type of the blood used as the Material component for this spell. The item requires Attunement, and only the creature attuned to this weapon gains these benefits.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [
			"1W6 psychisch",
			"1W6 gleißend",
			"1W4 Kraft",
			"1W6 nekrotisch"
		],
		"healingGerman": [],
		"conditionsGerman": ["verängstigt"],
		"effectTagsGerman": [
			"Schaden",
			"Teleportation",
			"Licht",
			"Waffenwirkung"
		],
		"source": "Grim Hollow 2025",
		"sourcePage": 195
	},
	{
		"id": "extract-iron",
		"sourceId": "extract_iron",
		"name": "Extract Iron",
		"level": 3,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "Action",
		"range": "Touch",
		"components": "V, S, M (a handful of sulfur)",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": ["sangromancy"],
		"classLabelsGerman": ["Sangromancy"],
		"mechanicsSummaryGerman": "Effekt: Licht, Erschaffung, Verwandlung. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "As part of casting this spell, you must expend three Hit Dice or the spell automatically fails. Roll the expended Hit Dice and extract a number of pounds of iron from your blood equal to the roll’s total. You fashion this iron into nonmagical metal objects.",
		"scalingTextEnglish": "You can expend an additional Hit Point Die and create additional iron for each spell slot level above 3. Chapter 7: Spells & Curses 191 Fiend Flesh Level 2 Transmutation (Bard, Cleric, Sorcerer, Warlock, Wizard) Casting Time: Action Range: Touch Components: V, S, M (a handful of sulfur) Duration: Concentration, up to 1 hour You touch a willing creature, transforming its skin into red scales. Until the spell ends, the target has Resistance to Cold, Fire, and Lightning damage, and the target also has Immunity to Poison damage.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Licht",
			"Erschaffung",
			"Verwandlung"
		],
		"source": "Grim Hollow 2025",
		"sourcePage": 195
	},
	{
		"id": "flash-fever",
		"sourceId": "flash_fever",
		"name": "Flash Fever",
		"level": 3,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": false,
		"castingTime": "Action",
		"range": "60 feet",
		"components": "V, S, M (flint and steel)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["druid", "warlock"],
		"classLabelsGerman": ["Druide", "Hexenmeister"],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Konstitution. Schaden: 4W6 Feuer, 2W6 Feuer, 8W6 Feuer. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "Choose a creature that you can see within range. The creature breaks into a cold sweat and makes a Constitution saving throw. On a failed save, the cold sweat becomes a burning fever and the creature takes 4d6 Fire damage.",
		"scalingTextEnglish": "The initial damage increases by 1d6 for each spell slot level above 3.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": [
			"4W6 Feuer",
			"2W6 Feuer",
			"8W6 Feuer"
		],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "Grim Hollow 2025",
		"sourcePage": 196
	},
	{
		"id": "maelfa-s-quickened-class",
		"sourceId": "maelfa_s_quickened_class",
		"name": "Maelfa’s Quickened Class",
		"level": 3,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "10 minutes",
		"range": "30 feet",
		"components": "V, S",
		"duration": "24 hours",
		"concentration": false,
		"classIds": ["wizard"],
		"classLabelsGerman": ["Magier"],
		"mechanicsSummaryGerman": "Effekt: Verzauberung. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "When you cast this spell, you give an abbreviated lecture on a topic of your choosing to 10 willing creatures of your choice within range. When you do so, choose one spell you know or have prepared, one skill you are proficient in, or one language you can speak, read, and write. Each chosen creature is temporarily imparted with a portion of your knowledge.",
		"scalingTextEnglish": "The duration of the spell increases with a spell slot level of 3 or 4 (30 days), 5 or 6 (10 days), 7 or 8 (30 days), or 9 (1 year).",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verzauberung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 200
	},
	{
		"id": "mirror-spell",
		"sourceId": "mirror_spell",
		"name": "Mirror Spell",
		"level": 3,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "Reaction, which you take when you see a creature within 60 feet of you casting a spell",
		"range": "60 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Bannmagie. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You attempt to copy and cast a spell of level 3 or lower that you can see being cast. You can only copy spells cast by creatures, and you can't copy your own spell. If the triggering spell is level 2 or lower, you automatically copy and cast the spell.",
		"scalingTextEnglish": "Treat the level of the spell slot used as the maximum level of spell you can copy and cast.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Bannmagie"],
		"source": "Grim Hollow 2025",
		"sourcePage": 200
	},
	{
		"id": "reanimate",
		"sourceId": "reanimate",
		"name": "Reanimate",
		"level": 3,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "Action",
		"range": "Touch",
		"components": "V, S, M (a mélange of wilted daisies and other herbal powders worth 300+ GP, which this spell consumes)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["druid"],
		"classLabelsGerman": ["Druide"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP. temporäre TP.",
		"rulesTextEnglish": "As part of casting this spell, you must expend three Hit Point Dice or the spell automatically fails. You touch a creature that has died within the last 10 minutes and return it to life with 1 Hit Point. In addition, roll the Hit Point Dice expended to cast the spell, and the creature gains Temporary Hit Points equal to the roll.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": ["temporäre TP"],
		"conditionsGerman": [],
		"effectTagsGerman": ["Heilung/TP"],
		"source": "Grim Hollow 2025",
		"sourcePage": 202
	},
	{
		"id": "sanguine-poppet",
		"sourceId": "sanguine_poppet",
		"name": "Sanguine Poppet",
		"level": 3,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 minute",
		"range": "Touch",
		"components": "V, S, M (an object shaped like a creature worth 1+ CP)",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": ["bard", "warlock"],
		"classLabelsGerman": ["Barde", "Hexenmeister"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Kontrolle. Rettungswurf: Geschicklichkeit. Schaden: variabel (siehe Kurzregel EN). Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "As part of casting this spell, you must expend three Hit Point Dice or the spell automatically fails. You smear the spell’s Material component with your blood. The object shudders and becomes a poppet under your control.",
		"scalingTextEnglish": "You can expend an additional Hit Point Die for each spell slot level above 3. Additionally, the duration of this spell increases by 1 hour for each spell slot level above 3.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Kontrolle"],
		"source": "Grim Hollow 2025",
		"sourcePage": 203
	},
	{
		"id": "serpent-tongue",
		"sourceId": "serpent_tongue",
		"name": "Serpent Tongue",
		"level": 3,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "Bonus Action",
		"range": "Self",
		"components": "V, S",
		"duration": "1 minute",
		"concentration": false,
		"classIds": ["warlock", "wizard"],
		"classLabelsGerman": ["Hexenmeister", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Verwandlung. Angriff: Nahkampf-Zauberangriff. Schaden: 1W12 Stich. Zustände: vergiftet. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You transform your tongue into a poisonous serpent for the duration. As a Bonus Action, you can make a melee spell attack against a creature within 10 feet of you. On a hit, the target takes 1d12 Piercing damage and has the Poisoned condition for the duration of the spell.",
		"scalingTextEnglish": "The damage increases by 1d12 for every spell slot level above 3.",
		"attackTypesGerman": ["Nahkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": ["1W12 Stich"],
		"healingGerman": [],
		"conditionsGerman": ["vergiftet"],
		"effectTagsGerman": ["Schaden", "Verwandlung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 205
	},
	{
		"id": "suffocate",
		"sourceId": "suffocate",
		"name": "Suffocate",
		"level": 3,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "Action",
		"range": "60 feet",
		"components": "V, S, M (a leather glove)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Unsichtbarkeit, Erschaffung. Angriff: Fernkampf-Zauberangriff. Zustände: unsichtbar, festgesetzt. Konzentration erforderlich.",
		"rulesTextEnglish": "You create a pair of grasping hands made from invisible force. Make a ranged spell attack against a creature you can see within range. On a hit, the creature has the Restrained condition.",
		"scalingTextEnglish": "",
		"attackTypesGerman": ["Fernkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["unsichtbar", "festgesetzt"],
		"effectTagsGerman": ["Unsichtbarkeit", "Erschaffung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 206
	},
	{
		"id": "summon-sea-spirit",
		"sourceId": "summon_sea_spirit",
		"name": "Summon Sea Spirit",
		"level": 3,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "Action",
		"range": "90 feet",
		"components": "V, S, M (a bejeweled statuette of a sea serpent worth at least 300 GP)",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": ["druid", "warlock"],
		"classLabelsGerman": ["Druide", "Hexenmeister"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Bewegung. Rettungswurf: Stärke, Weisheit. Schaden: 2W6 Stich. Zustände: bezaubert, gepackt, liegend. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You call forth an abyssal spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Sea Serpent stat block.",
		"scalingTextEnglish": "Use the spell slot’s level for the spell’s level in the stat block. Sea Serpent Spirit Large Monstrosity, Neutral AC 11 + spell’s level HP 30 + 10 for each spell level above 3 Speed 30 ft., Fly 40 ft. (Scaled Wings only), Swim 60 ft.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Stärke", "Weisheit"],
		"damageGerman": ["2W6 Stich"],
		"healingGerman": [],
		"conditionsGerman": [
			"bezaubert",
			"gepackt",
			"liegend"
		],
		"effectTagsGerman": ["Schaden", "Bewegung"],
		"source": "Grim Hollow 2025",
		"sourcePage": 207
	},
	{
		"id": "acid-splash",
		"sourceId": "acid_splash",
		"name": "Acid Splash",
		"level": 0,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Geschicklichkeit. Schaden: 1W6 Säure. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage.",
		"scalingTextEnglish": "This spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": ["1W6 Säure"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 192
	},
	{
		"id": "blade-ward",
		"sourceId": "blade_ward",
		"name": "Blade Ward",
		"level": 0,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S",
		"duration": "1 round",
		"concentration": false,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Waffenwirkung.",
		"rulesTextEnglish": "You extend your hand and trace a sigil of warding in the air. Until the end of your next turn, you have resistance against bludgeoning, piercing, and slashing damage dealt by weapon attacks.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Waffenwirkung"],
		"source": "PHB 2014",
		"sourcePage": 199
	},
	{
		"id": "chill-touch",
		"sourceId": "chill_touch",
		"name": "Chill Touch",
		"level": 0,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S",
		"duration": "1 round",
		"concentration": false,
		"classIds": [
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Schaden, Erschaffung. Angriff: Fernkampf-Zauberangriff. Schaden: 1W8 nekrotisch. Heilung/TP: 1W8. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You create a ghostly, skeletal hand in the space of a creature within range. Make a ranged spell attack against the creature to assail it with the chill of the grave. On a hit, the target takes 1d8 necrotic damage, and it can’t regain hit points until the start of your next turn.",
		"scalingTextEnglish": "This spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
		"attackTypesGerman": ["Fernkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": ["1W8 nekrotisch"],
		"healingGerman": ["Heilung/TP: 1W8"],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Heilung/TP",
			"Schaden",
			"Erschaffung"
		],
		"source": "PHB 2014",
		"sourcePage": 202
	},
	{
		"id": "dancing-lights",
		"sourceId": "dancing_lights",
		"name": "Dancing Lights",
		"level": 0,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S, M (a bit of phosphorus or wychwood, or a glowworm)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Licht, Erschaffung. Konzentration erforderlich.",
		"rulesTextEnglish": "You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration. You can also combine the four lights into one glowing vaguely humanoid form of Medium size. Whichever form you choose, each light sheds dim light in a 10-foot radius.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Licht", "Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 211
	},
	{
		"id": "druidcraft",
		"sourceId": "druidcraft",
		"name": "Druidcraft",
		"level": 0,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["druid"],
		"classLabelsGerman": ["Druide"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht, Erschaffung. Rettungswurf: Geschicklichkeit, Konstitution. Schaden: 5W6 Wucht. Zustände: liegend.",
		"rulesTextEnglish": "Whispering to the spirits of nature, you create one of the following effects within range: • You create a tiny, harmless sensory effect that predicts what the weather will be at your location for the next 24 hours. The effect might manifest as a golden orb for clear skies, a cloud for rain, falling snowflakes for snow, and so on. This effect persists for 1 round. • You instantly make a flower blossom, a seed pod open, or a leaf bud bloom. • You create an instantaneous, harmless sensory effect, such as falling leaves, a puff of wind, the sound of a small animal, or the faint odor of skunk.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit", "Konstitution"],
		"damageGerman": ["5W6 Wucht"],
		"healingGerman": [],
		"conditionsGerman": ["liegend"],
		"effectTagsGerman": [
			"Schaden",
			"Licht",
			"Erschaffung"
		],
		"source": "PHB 2014",
		"sourcePage": 216
	},
	{
		"id": "eldritch-blast",
		"sourceId": "eldritch_blast",
		"name": "Eldritch Blast",
		"level": 0,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["warlock"],
		"classLabelsGerman": ["Hexenmeister"],
		"mechanicsSummaryGerman": "Effekt: Erschaffung. Angriff: Fernkampf-Zauberangriff. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A beam of crackling energy streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1dlO force damage.",
		"scalingTextEnglish": "The spell creates more than one beam when you reach higher levels: two beams at 5th level, three beams at 11th level, and four beams at 17th level.",
		"attackTypesGerman": ["Fernkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 217
	},
	{
		"id": "fire-bolt",
		"sourceId": "fire_bolt",
		"name": "Fire Bolt",
		"level": 0,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden. Angriff: Fernkampf-Zauberangriff. Schaden: 1W10 Feuer. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage.",
		"scalingTextEnglish": "This spell’s damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).",
		"attackTypesGerman": ["Fernkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": ["1W10 Feuer"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 222
	},
	{
		"id": "friends",
		"sourceId": "friends",
		"name": "Friends",
		"level": 0,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self",
		"components": "S, M (a small amount of makeup applied to the face as this spell is cast)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Verzauberung. Zustände: liegend. Konzentration erforderlich.",
		"rulesTextEnglish": "For the duration, you have advantage on all Charisma checks directed at one creature of your choice that isn’t hostile toward you. When the spell ends, the creature realizes that you used magic to influence its mood and becomes hostile toward you. A creature prone to violence might attack you.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["liegend"],
		"effectTagsGerman": ["Verzauberung"],
		"source": "PHB 2014",
		"sourcePage": 224
	},
	{
		"id": "guidance",
		"sourceId": "guidance",
		"name": "Guidance",
		"level": 0,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["cleric", "druid"],
		"classLabelsGerman": ["Kleriker", "Druide"],
		"mechanicsSummaryGerman": "Effekt: Erkenntnismagie. Konzentration erforderlich.",
		"rulesTextEnglish": "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check of its choice. It can roll the die before or after making the ability check.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erkenntnismagie"],
		"source": "PHB 2014",
		"sourcePage": 227
	},
	{
		"id": "light",
		"sourceId": "light",
		"name": "Light",
		"level": 0,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, M (a firefly or phosphorescent moss)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": [
			"bard",
			"cleric",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Licht. Rettungswurf: Geschicklichkeit.",
		"rulesTextEnglish": "You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Licht"],
		"source": "PHB 2014",
		"sourcePage": 234
	},
	{
		"id": "mage-hand",
		"sourceId": "mage_hand",
		"name": "Mage Hand",
		"level": 0,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S",
		"duration": "1 minute",
		"concentration": false,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Kontrolle.",
		"rulesTextEnglish": "A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Kontrolle"],
		"source": "PHB 2014",
		"sourcePage": 235
	},
	{
		"id": "mending",
		"sourceId": "mending",
		"name": "Mending",
		"level": 0,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 minute",
		"range": "Touch",
		"components": "V, S, M (two lodestones)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"bard",
			"cleric",
			"druid",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Druide",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Verwandlung.",
		"rulesTextEnglish": "This spell repairs a single break or tear in an object you touch, such as a broken chain link, two halves of a broken key, a torn cloak, or a leaking wineskin. As long as the break or tear is no larger than 1 foot in any dimension, you mend it. leaving no trace of the former damage. This spell can physically repair a magic item or construct, but the spell can’t restore magic to such an object.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verwandlung"],
		"source": "PHB 2014",
		"sourcePage": 238
	},
	{
		"id": "message",
		"sourceId": "message",
		"name": "Message",
		"level": 0,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S, M (a short piece of copper wire)",
		"duration": "1 round",
		"concentration": false,
		"classIds": [
			"bard",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Verwandlung.",
		"rulesTextEnglish": "You point your finger toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear. You can cast this spell through solid objects if you are familiar with the target and know it is beyond the barrier.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verwandlung"],
		"source": "PHB 2014",
		"sourcePage": 238
	},
	{
		"id": "minor-illusion",
		"sourceId": "minor_illusion",
		"name": "Minor Illusion",
		"level": 0,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "S, M (a bit of fleece)",
		"duration": "1 minute",
		"concentration": false,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Licht, Illusion, Erschaffung.",
		"rulesTextEnglish": "You create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss it as an action or cast this spell again. If you create a sound, its volume can range from a whisper to a scream.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Licht",
			"Illusion",
			"Erschaffung"
		],
		"source": "PHB 2014",
		"sourcePage": 239
	},
	{
		"id": "poison-spray",
		"sourceId": "poison_spray",
		"name": "Poison Spray",
		"level": 0,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "10 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"druid",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Druide",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Konstitution. Schaden: 1W12 Gift. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You extend your hand toward a creature you can see within range and project a puff of noxious gas from your palm. The creature must succeed on a Constitution saving throw or take 1d12 poison damage. This spell’s damage increases by 1d12 when you reach 5th level (2d12), 11th level (3d12), and 17th level (4d12).",
		"scalingTextEnglish": "This spell’s damage increases by 1d12 when you reach 5th level (2d12), 11th level (3d12), and 17th level (4d12).",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": ["1W12 Gift"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 245
	},
	{
		"id": "prestidigitation",
		"sourceId": "prestidigitation",
		"name": "Prestidigitation",
		"level": 0,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "10 feet",
		"components": "V, S",
		"duration": "Up to 1 hour",
		"concentration": false,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Licht, Erschaffung.",
		"rulesTextEnglish": "This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical effects within range: • You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musi cal notes, or an odd odor. • You instantaneously light or snuff out a candle, a torch, or a small campfire. • You instantaneously clean or soil an object no larger than 1 cubic foot. • You chill, warm, or flavor up to 1 cubic foot of nonliv ing material for 1 hour. • You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour. • You create a nonmagical trinket or...",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Licht", "Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 246
	},
	{
		"id": "produce-flame",
		"sourceId": "produce_flame",
		"name": "Produce Flame",
		"level": 0,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S",
		"duration": "10 minutes",
		"concentration": false,
		"classIds": ["druid"],
		"classLabelsGerman": ["Druide"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht. Angriff: Fernkampf-Zauberangriff. Schaden: 1W8 Feuer. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A flickering flame appears in your hand. The flame remains there for the duration and harms neither you nor your equipment. The flame sheds bright light in a 10-foot radius and dim light for an additional 10 feet.",
		"scalingTextEnglish": "This spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
		"attackTypesGerman": ["Fernkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": ["1W8 Feuer"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Licht"],
		"source": "PHB 2014",
		"sourcePage": 247
	},
	{
		"id": "ray-of-frost",
		"sourceId": "ray_of_frost",
		"name": "Ray of Frost",
		"level": 0,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht, Bewegung. Angriff: Fernkampf-Zauberangriff. Schaden: 1W8 Kälte. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn.",
		"scalingTextEnglish": "The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
		"attackTypesGerman": ["Fernkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": ["1W8 Kälte"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Schaden",
			"Licht",
			"Bewegung"
		],
		"source": "PHB 2014",
		"sourcePage": 249
	},
	{
		"id": "resistance",
		"sourceId": "resistance",
		"name": "Resistance",
		"level": 0,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (a miniature cloak)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["cleric", "druid"],
		"classLabelsGerman": ["Kleriker", "Druide"],
		"mechanicsSummaryGerman": "Effekt: Bannmagie. Konzentration erforderlich.",
		"rulesTextEnglish": "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one saving throw of its choice. It can roll the die before or after making the saving throw.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Bannmagie"],
		"source": "PHB 2014",
		"sourcePage": 250
	},
	{
		"id": "sacred-flame",
		"sourceId": "sacred_flame",
		"name": "Sacred Flame",
		"level": 0,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["cleric"],
		"classLabelsGerman": ["Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Geschicklichkeit. Schaden: 1W8 gleißend. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "Flame-like radiance descends on a creature that you can see within range. The target must succeed on a Dexterity saving throw or take 1d8 radiant damage. The target gains no benefit from cover for this saving throw.",
		"scalingTextEnglish": "The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": ["1W8 gleißend"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 250
	},
	{
		"id": "shillelagh",
		"sourceId": "shillelagh",
		"name": "Shillelagh",
		"level": 0,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "Touch",
		"components": "V, S, M (mistletoe, a shamrock leaf, and a club or quarterstaff)",
		"duration": "1 minute",
		"concentration": false,
		"classIds": ["druid"],
		"classLabelsGerman": ["Druide"],
		"mechanicsSummaryGerman": "Effekt: Waffenwirkung.",
		"rulesTextEnglish": "The wood of a club or quarterstaff you are holding is imbued with nature’s power. For the duration, you can use your spellcasting ability instead of Strength for the attack and damage rolls of melee attacks using that weapon, and the weapon's damage die becomes a d8. The weapon also becomes magical, if it isn’t already.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Waffenwirkung"],
		"source": "PHB 2014",
		"sourcePage": 253
	},
	{
		"id": "shocking-grasp",
		"sourceId": "shocking_grasp",
		"name": "Shocking Grasp",
		"level": 0,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht. Angriff: Nahkampf-Zauberangriff. Schaden: 1W8 Blitz. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a melee spell attack against the target. You have advantage on the attack roll if the target is wearing armor made of metal.",
		"scalingTextEnglish": "The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
		"attackTypesGerman": ["Nahkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": ["1W8 Blitz"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Licht"],
		"source": "PHB 2014",
		"sourcePage": 253
	},
	{
		"id": "spare-the-dying",
		"sourceId": "spare_the_dying",
		"name": "Spare the Dying",
		"level": 0,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["cleric"],
		"classLabelsGerman": ["Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Nekromantie.",
		"rulesTextEnglish": "You touch a living creature that has 0 hit points. The creature becomes stable. This spell has no effect on undead or constructs.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Nekromantie"],
		"source": "PHB 2014",
		"sourcePage": 255
	},
	{
		"id": "thaumaturgy",
		"sourceId": "thaumaturgy",
		"name": "Thaumaturgy",
		"level": 0,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V",
		"duration": "Up to 1 minute",
		"concentration": false,
		"classIds": ["cleric"],
		"classLabelsGerman": ["Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Erschaffung.",
		"rulesTextEnglish": "You manifest a minor wonder, a sign of supernatural power, within range. You create one of the following magical effects within range: • Your voice booms up to three times as loud as normal for 1 minute. • You cause flames to flicker, brighten, dim, or change color for 1 minute. • You cause harmless tremors in the ground for 1 minute. • You create an instantaneous sound that originates from a point of your choice within range, such as a rumble of thunder, the cry of a raven, or ominous whispers. • You instantaneously cause an unlocked door or win dow to fly open or slam shut. • You alter the appearance of your eyes for 1 minute. If you...",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 260
	},
	{
		"id": "thorn-whip",
		"sourceId": "thorn_whip",
		"name": "Thorn Whip",
		"level": 0,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S, M (the stem of a plant with thorns)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["druid"],
		"classLabelsGerman": ["Druide"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Erschaffung. Angriff: Nahkampf-Zauberangriff. Schaden: 1W6 Stich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You create a long, vine-like whip covered in thorns that lashes out at your command toward a creature in range. Make a melee spell attack against the target. If the attack hits, the creature takes 1d6 piercing damage, and if the creature is Large or smaller, you pull the creature up to 10 feet closer to you.",
		"scalingTextEnglish": "This spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
		"attackTypesGerman": ["Nahkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": ["1W6 Stich"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 260
	},
	{
		"id": "true-strike",
		"sourceId": "true_strike",
		"name": "True Strike",
		"level": 0,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "S",
		"duration": "Concentration, up to 1 round",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Erkenntnismagie. Konzentration erforderlich.",
		"rulesTextEnglish": "You extend your hand and point a finger at a target in range. Your magic grants you a brief insight into the target’s defenses. On your next turn, you gain advantage on your first attack roll against the target, provided that this spell hasn’t ended.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erkenntnismagie"],
		"source": "PHB 2014",
		"sourcePage": 262
	},
	{
		"id": "vicious-mockery",
		"sourceId": "vicious_mockery",
		"name": "Vicious Mockery",
		"level": 0,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["bard"],
		"classLabelsGerman": ["Barde"],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Weisheit. Schaden: 1W4 psychisch. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You unleash a string of insults laced with subtle enchantments at a creature you can see within range. If the target can hear you (though it need not understand you), it must succeed on a Wisdom saving throw or take 1d4 psychic damage and have disadvantage on the next attack roll it makes before the end of its next turn. This spell’s damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4).",
		"scalingTextEnglish": "This spell’s damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4).",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": ["1W4 psychisch"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 263
	},
	{
		"id": "alarm",
		"sourceId": "alarm",
		"name": "Alarm",
		"level": 1,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": true,
		"castingTime": "1 minute",
		"range": "30 feet",
		"components": "V, S, M (a tiny bell and a piece of fine silver wire)",
		"duration": "8 hours",
		"concentration": false,
		"classIds": ["ranger", "wizard"],
		"classLabelsGerman": ["Waldläufer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Bannmagie.",
		"rulesTextEnglish": "You set an alarm against unwanted intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot cube. Until the spell ends, an alarm alerts you whenever a Tiny or larger creature touches or enters the warded area.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Bannmagie"],
		"source": "PHB 2014",
		"sourcePage": 192
	},
	{
		"id": "animal-friendship",
		"sourceId": "animal_friendship",
		"name": "Animal Friendship",
		"level": 1,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S, M (a morsel of food)",
		"duration": "24 hours",
		"concentration": false,
		"classIds": [
			"bard",
			"druid",
			"ranger"
		],
		"classLabelsGerman": [
			"Barde",
			"Druide",
			"Waldläufer"
		],
		"mechanicsSummaryGerman": "Effekt: Verzauberung. Rettungswurf: Weisheit. Zustände: bezaubert. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "This spell lets you convince a beast that you mean it no harm. Choose a beast that you can see within range. It must see and hear you.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, you can affect one additional beast for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["bezaubert"],
		"effectTagsGerman": ["Verzauberung"],
		"source": "PHB 2014",
		"sourcePage": 193
	},
	{
		"id": "armor-of-agathys",
		"sourceId": "armor_of_agathys",
		"name": "Armor of Agathys",
		"level": 1,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S, M (a cup of water)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": ["warlock"],
		"classLabelsGerman": ["Hexenmeister"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP. temporäre TP. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A protective magical force surrounds you, manifesting as a spectral frost that covers you and your gear. You gain 5 temporary hit points for the duration. If a creature hits you with a melee attack while you have these hit points, the creature takes 5 cold damage.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, both the temporary hit points and the cold damage increase by 5 for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": ["temporäre TP"],
		"conditionsGerman": [],
		"effectTagsGerman": ["Heilung/TP"],
		"source": "PHB 2014",
		"sourcePage": 196
	},
	{
		"id": "arms-of-hadar",
		"sourceId": "arms_of_hadar",
		"name": "Arms of Hadar",
		"level": 1,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self (10-foot radius)",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["warlock"],
		"classLabelsGerman": ["Hexenmeister"],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Stärke. Schaden: 2W6 nekrotisch. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You invoke the power of Hadar, the Dark Hunger. Tendrils of dark energy erupt from you and batter all creatures within 10 feet of you. Each creature in that area must make a Strength saving throw.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Stärke"],
		"damageGerman": ["2W6 nekrotisch"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 196
	},
	{
		"id": "bane",
		"sourceId": "bane",
		"name": "Bane",
		"level": 1,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S, M (a drop of blood)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["bard", "cleric"],
		"classLabelsGerman": ["Barde", "Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Verzauberung. Rettungswurf: Charisma. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "Up to three creatures of your choice that you can see within range must make Charisma saving throws. Whenever a target that fails this saving throw makes an attack roll or a saving throw before the spell ends, the target must roll a d4 and subtract the number rolled from the attack roll or saving throw. At Higher Levels.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Charisma"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verzauberung"],
		"source": "PHB 2014",
		"sourcePage": 197
	},
	{
		"id": "bless",
		"sourceId": "bless",
		"name": "Bless",
		"level": 1,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S, M (a sprinkling of holy water)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["cleric", "paladin"],
		"classLabelsGerman": ["Kleriker", "Paladin"],
		"mechanicsSummaryGerman": "Effekt: Verzauberung. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You bless up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target can roll a d4 and add the number rolled to the attack roll or saving throw. At Higher Levels.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verzauberung"],
		"source": "PHB 2014",
		"sourcePage": 200
	},
	{
		"id": "burning-hands",
		"sourceId": "burning_hands",
		"name": "Burning Hands",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self (15-foot cone)",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Geschicklichkeit. Schaden: 3W6 Feuer. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each creature in a 15-foot cone must make a Dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much damage on a successful one.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": ["3W6 Feuer"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 201
	},
	{
		"id": "charm-person",
		"sourceId": "charm_person",
		"name": "Charm Person",
		"level": 1,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S",
		"duration": "1 hour",
		"concentration": false,
		"classIds": [
			"bard",
			"druid",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Druide",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Verzauberung. Rettungswurf: Weisheit. Zustände: bezaubert. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You attempt to charm a humanoid you can see within range. It must make a Wisdom saving throw, and does so with advantage if you or your companions are fighting it. If it fails the saving throw, it is charmed by you until the spell ends or until you or your companions do anything harmful to it.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["bezaubert"],
		"effectTagsGerman": ["Verzauberung"],
		"source": "PHB 2014",
		"sourcePage": 202
	},
	{
		"id": "chromatic-orb",
		"sourceId": "chromatic_orb",
		"name": "Chromatic Orb",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "90 feet",
		"components": "V, S, M (a diamond worth at least 50 gp)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht, Erschaffung. Angriff: Fernkampf-Zauberangriff. Rettungswurf: Konstitution. Schaden: 8W6 nekrotisch. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You hurl a 4-inch-diameter sphere of energy at a creature that you can see within range. You choose acid, cold, fire, lightning, poison, or thunder for the type of orb you create, and then make a ranged spell attack against the target. If the attack hits, the creature takes 3d8 damage of the type you chose.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st. C ircle of Death 6 th-level necromancy Casting Time: 1 action Range: 150 feet Components: V, S, M (the powder of a crushed black pearl worth at least 500 gp) Duration: Instantaneous A sphere of negative energy ripples out in a 60-footradius sphere from a point within range.",
		"attackTypesGerman": ["Fernkampf-Zauberangriff"],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": ["8W6 nekrotisch"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Schaden",
			"Licht",
			"Erschaffung"
		],
		"source": "PHB 2014",
		"sourcePage": 202
	},
	{
		"id": "color-spray",
		"sourceId": "color_spray",
		"name": "Color Spray",
		"level": 1,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self (15-foot cone)",
		"components": "V, S, M (a pinch of powder or sand that is colored red, yellow, and blue)",
		"duration": "1 round",
		"concentration": false,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Licht. Zustände: blind, bewusstlos. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A dazzling array of flashing, colored light springs from your hand. Roll 6d10; the total is how many hit points of creatures this spell can effect. Creatures in a 15-foot cone originating from you are affected in ascending order of their current hit points (ignoring unconscious creatures and creatures that can’t see).",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, roll an additional 2d10 for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["blind", "bewusstlos"],
		"effectTagsGerman": ["Licht"],
		"source": "PHB 2014",
		"sourcePage": 203
	},
	{
		"id": "command",
		"sourceId": "command",
		"name": "Command",
		"level": 1,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V",
		"duration": "1 round",
		"concentration": false,
		"classIds": ["cleric", "paladin"],
		"classLabelsGerman": ["Kleriker", "Paladin"],
		"mechanicsSummaryGerman": "Effekt: Verzauberung. Rettungswurf: Weisheit. Zustände: liegend. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You speak a one-word command to a creature you can see within range. The target must succeed on a Wisdom saving throw or follow the command on its next turn. The spell has no effect if the target is undead, if it doesn’t understand your language, or if your command is directly harmful to it.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, you can affect one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["liegend"],
		"effectTagsGerman": ["Verzauberung"],
		"source": "PHB 2014",
		"sourcePage": 204
	},
	{
		"id": "compelled-duel",
		"sourceId": "compelled_duel",
		"name": "Compelled Duel",
		"level": 1,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "30 feet",
		"components": "V",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["paladin"],
		"classLabelsGerman": ["Paladin"],
		"mechanicsSummaryGerman": "Effekt: Verzauberung. Rettungswurf: Weisheit. Konzentration erforderlich.",
		"rulesTextEnglish": "You attempt to compel a creature into a duel. One creature that you can see within range must make a Wisdom saving throw. On a failed save, the creature is drawn to you, compelled by your divine demand.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verzauberung"],
		"source": "PHB 2014",
		"sourcePage": 205
	},
	{
		"id": "comprehend-languages",
		"sourceId": "comprehend_languages",
		"name": "Comprehend Languages",
		"level": 1,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": true,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S, M (a pinch of soot and salt)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Erkenntnismagie.",
		"rulesTextEnglish": "For the duration, you understand the literal meaning of any spoken language that you hear. You also understand any written language that you see, but you must be touching the surface on which the words are written. It takes about 1 minute to read one page of text.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erkenntnismagie"],
		"source": "PHB 2014",
		"sourcePage": 205
	},
	{
		"id": "create-or-destroy-water",
		"sourceId": "create_or_destroy_water",
		"name": "Create or Destroy Water",
		"level": 1,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S, M (a drop of water if creating water or a few grains of sand if destroying it)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["cleric", "druid"],
		"classLabelsGerman": ["Kleriker", "Druide"],
		"mechanicsSummaryGerman": "Effekt: Erschaffung. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You either create or destroy water. Create Water. You create up to 10 gallons of clean water within range in an open container.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, you create or destroy 10 additional gallons of water, or the size of the cube increases by 5 feet, for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 210
	},
	{
		"id": "cure-wounds",
		"sourceId": "cure_wounds",
		"name": "Cure Wounds",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"bard",
			"cleric",
			"druid",
			"paladin",
			"ranger"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Druide",
			"Paladin",
			"Waldläufer"
		],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP. Heilung/TP: 1W8. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs. At Higher Levels.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d8 for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": ["Heilung/TP: 1W8"],
		"conditionsGerman": [],
		"effectTagsGerman": ["Heilung/TP"],
		"source": "PHB 2014",
		"sourcePage": 211
	},
	{
		"id": "detect-evil-and-good",
		"sourceId": "detect_evil_and_good",
		"name": "Detect Evil and Good",
		"level": 1,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": ["cleric", "paladin"],
		"classLabelsGerman": ["Kleriker", "Paladin"],
		"mechanicsSummaryGerman": "Effekt: Erkenntnismagie. Konzentration erforderlich.",
		"rulesTextEnglish": "For the duration, you know if there is an aberration, celestial, elemental, fey, fiend, or undead within 30 feet of you, as well as where the creature is located. Similarly, you know if there is a place or object within 30 feet of you that has been magically consecrated or desecrated. The spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erkenntnismagie"],
		"source": "PHB 2014",
		"sourcePage": 212
	},
	{
		"id": "detect-magic",
		"sourceId": "detect_magic",
		"name": "Detect Magic",
		"level": 1,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": true,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": [
			"bard",
			"cleric",
			"druid",
			"paladin",
			"ranger",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Druide",
			"Paladin",
			"Waldläufer",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Erkenntnismagie. Konzentration erforderlich.",
		"rulesTextEnglish": "For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic, and you learn its school of magic, if any. The spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erkenntnismagie"],
		"source": "PHB 2014",
		"sourcePage": 212
	},
	{
		"id": "detect-poison-and-disease",
		"sourceId": "detect_poison_and_disease",
		"name": "Detect Poison and Disease",
		"level": 1,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": true,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S, M (a yew leaf)",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": [
			"cleric",
			"druid",
			"paladin",
			"ranger"
		],
		"classLabelsGerman": [
			"Kleriker",
			"Druide",
			"Paladin",
			"Waldläufer"
		],
		"mechanicsSummaryGerman": "Effekt: Erkenntnismagie. Konzentration erforderlich.",
		"rulesTextEnglish": "For the duration, you can sense the presence and location of poisons, poisonous creatures, and diseases within 30 feet of you. You also identify the kind of poison, poisonous creature, or disease in each case. The spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erkenntnismagie"],
		"source": "PHB 2014",
		"sourcePage": 212
	},
	{
		"id": "disguise-self",
		"sourceId": "disguise_self",
		"name": "Disguise Self",
		"level": 1,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S",
		"duration": "1 hour",
		"concentration": false,
		"classIds": [
			"bard",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Illusion, Waffenwirkung.",
		"rulesTextEnglish": "You make yourself—including your clothing, armor, weapons, and other belongings on your person—look different until the spell ends or until you use your action to dismiss it. You can seem 1 foot shorter or taller and can appear thin, fat, or in between. You can’t change your body type, so you must adopt a form that has the same basic arrangement of limbs.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Illusion", "Waffenwirkung"],
		"source": "PHB 2014",
		"sourcePage": 213
	},
	{
		"id": "dissonant-whispers",
		"sourceId": "dissonant_whispers",
		"name": "Dissonant Whispers",
		"level": 1,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["bard"],
		"classLabelsGerman": ["Barde"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Bewegung. Rettungswurf: Weisheit. Schaden: 3W6 psychisch. Zustände: taub. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You whisper a discordant melody that only one creature of your choice within range can hear, wracking it with terrible pain. The target must make a Wisdom saving throw. On a failed save, it takes 3d6 psychic damage and must immediately use its reaction, if available, to move as far as its speed allows away from you.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": ["3W6 psychisch"],
		"healingGerman": [],
		"conditionsGerman": ["taub"],
		"effectTagsGerman": ["Schaden", "Bewegung"],
		"source": "PHB 2014",
		"sourcePage": 214
	},
	{
		"id": "divine-favor",
		"sourceId": "divine_favor",
		"name": "Divine Favor",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "Self",
		"components": "V, S",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["paladin"],
		"classLabelsGerman": ["Paladin"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Waffenwirkung. Schaden: 1W4 gleißend. Konzentration erforderlich.",
		"rulesTextEnglish": "Your prayer empowers you with divine radiance. Until the spell ends, your weapon attacks deal an extra 1d4 radiant damage on a hit.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["1W4 gleißend"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Waffenwirkung"],
		"source": "PHB 2014",
		"sourcePage": 214
	},
	{
		"id": "ensnaring-strike",
		"sourceId": "ensnaring_strike",
		"name": "Ensnaring Strike",
		"level": 1,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "Self",
		"components": "V",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["ranger"],
		"classLabelsGerman": ["Waldläufer"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Waffenwirkung. Rettungswurf: Stärke. Schaden: 1W6 Stich. Zustände: festgesetzt. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "The next time you hit a creature with a weapon attack before this spell ends, a writhing mass of thorny vines appears at the point of impact, and the target must succeed on a Strength saving throw or be restrained by the magical vines until the spell ends. A Large or larger creature has advantage on this saving throw. If the target succeeds on the save, the vines shrivel away.",
		"scalingTextEnglish": "If you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Stärke"],
		"damageGerman": ["1W6 Stich"],
		"healingGerman": [],
		"conditionsGerman": ["festgesetzt"],
		"effectTagsGerman": ["Schaden", "Waffenwirkung"],
		"source": "PHB 2014",
		"sourcePage": 217
	},
	{
		"id": "entangle",
		"sourceId": "entangle",
		"name": "Entangle",
		"level": 1,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "90 feet",
		"components": "V, S",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["druid"],
		"classLabelsGerman": ["Druide"],
		"mechanicsSummaryGerman": "Effekt: Beschwörung. Rettungswurf: Stärke. Zustände: festgesetzt. Konzentration erforderlich.",
		"rulesTextEnglish": "Grasping weeds and vines sprout from the ground in a 20-foot square starting from a point within range. For the duration, these plants turn the ground in the area into difficult terrain. A creature in the area when you cast the spell must succeed on a Strength saving throw or be restrained by the entangling plants until the spell ends.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Stärke"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["festgesetzt"],
		"effectTagsGerman": ["Beschwörung"],
		"source": "PHB 2014",
		"sourcePage": 218
	},
	{
		"id": "expeditious-retreat",
		"sourceId": "expeditious_retreat",
		"name": "Expeditious Retreat",
		"level": 1,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "Self",
		"components": "V, S",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": [
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Verwandlung. Rettungswurf: Weisheit. Zustände: verängstigt, bewusstlos. Konzentration erforderlich.",
		"rulesTextEnglish": "This spell allows you to move at an incredible pace. When you cast this spell, and then as a bonus action on each of your turns until the spell ends, you can take the Dash action. E yebite 6 th-level necromancy Casting Time: 1 action Range: Self Components: V, S Duration: Concentration, up to 1 minute For the spell’s duration, your eyes become an inky void imbued with dread power.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["verängstigt", "bewusstlos"],
		"effectTagsGerman": ["Verwandlung"],
		"source": "PHB 2014",
		"sourcePage": 218
	},
	{
		"id": "faerie-fire",
		"sourceId": "faerie_fire",
		"name": "Faerie Fire",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["bard", "druid"],
		"classLabelsGerman": ["Barde", "Druide"],
		"mechanicsSummaryGerman": "Effekt: Licht, Unsichtbarkeit. Rettungswurf: Geschicklichkeit. Zustände: unsichtbar. Konzentration erforderlich.",
		"rulesTextEnglish": "Each object in a 20-foot cube within range is outlined in blue, green, or violet light (your choice). Any creature in the area when the spell is cast is also outlined in light if it fails a Dexterity saving throw. For the duration, objects and affected creatures shed dim light in a 10-foot radius.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["unsichtbar"],
		"effectTagsGerman": ["Licht", "Unsichtbarkeit"],
		"source": "PHB 2014",
		"sourcePage": 219
	},
	{
		"id": "false-life",
		"sourceId": "false_life",
		"name": "False Life",
		"level": 1,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S, M (a small amount of alcohol or distilled spirits)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP. temporäre TP (1W4 + 4). Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "Bolstering yourself with a necromantic facsimile of life, you gain 1d4 + 4 temporary hit points for the duration. At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you gain 5 additional temporary hit points for each slot level above 1st.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, you gain 5 additional temporary hit points for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": ["temporäre TP (1W4 + 4)"],
		"conditionsGerman": [],
		"effectTagsGerman": ["Heilung/TP"],
		"source": "PHB 2014",
		"sourcePage": 219
	},
	{
		"id": "feather-fall",
		"sourceId": "feather_fall",
		"name": "Feather Fall",
		"level": 1,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 reaction, which you take when you or a creature within 60 feet of you falls",
		"range": "60 feet",
		"components": "V, M (a small feather or piece of down)",
		"duration": "1 minute",
		"concentration": false,
		"classIds": [
			"bard",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden, Kommunikation. Rettungswurf: Intelligenz. Schaden: 4W6 psychisch.",
		"rulesTextEnglish": "Choose up to five falling creatures within range. A falling creature's rate of descent slows to 60 feet per round until the spell ends. If the creature lands before the spell ends, it takes no falling damage and can land on its feet, and the spell ends for that creature.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Intelligenz"],
		"damageGerman": ["4W6 psychisch"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Kommunikation"],
		"source": "PHB 2014",
		"sourcePage": 219
	},
	{
		"id": "find-familiar",
		"sourceId": "find_familiar",
		"name": "Find Familiar",
		"level": 1,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": true,
		"castingTime": "1 hour",
		"range": "10 feet",
		"components": "V, S, M (10 gp worth of charcoal, incense, and herbs that must be consumed by fire in a brass brazier)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["wizard"],
		"classLabelsGerman": ["Magier"],
		"mechanicsSummaryGerman": "Effekt: Beschwörung, Kommunikation, Verwandlung.",
		"rulesTextEnglish": "You gain the service of a familiar, a spirit that takes an animal form you choose: bat, cat, crab, frog (toad), hawk, lizard, octopus, owl, poisonous snake, fish (quipper), rat, raven, sea horse, spider, or weasel. Appearing in an unoccupied space within range, the familiar has the statistics of the chosen form, though it is a celestial, fey, or fiend (your choice) instead of a beast. Your familiar acts independently of you, but it always obeys your commands.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Beschwörung",
			"Kommunikation",
			"Verwandlung"
		],
		"source": "PHB 2014",
		"sourcePage": 220
	},
	{
		"id": "fog-cloud",
		"sourceId": "fog_cloud",
		"name": "Fog Cloud",
		"level": 1,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": [
			"druid",
			"ranger",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Druide",
			"Waldläufer",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Teleportation, Bewegung, Erschaffung. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You create a 20-foot-radius sphere of fog centered on a point within range. The sphere spreads around corners, and its area is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, the radius of the fog increases by 20 feet for each slot level above 1st. Forbiddance 6 th-level abjuration (ritual) Casting Time: 10 minutes Range: Touch Components: V, S, M (a sprinkling of holy water, rare incense, and powdered ruby worth at least 1,000 gp) Duration: 1 day You create a ward against magical travel that protects up to 40,000 square feet of floor space to a height of 30 feet above the floor. For the duration, creatures can’t teleport into the area or use portals, such as those created by the gate spell, to...",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Teleportation",
			"Bewegung",
			"Erschaffung"
		],
		"source": "PHB 2014",
		"sourcePage": 223
	},
	{
		"id": "goodberry",
		"sourceId": "goodberry",
		"name": "Goodberry",
		"level": 1,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (a sprig of mistletoe)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["druid", "ranger"],
		"classLabelsGerman": ["Druide", "Waldläufer"],
		"mechanicsSummaryGerman": "Effekt: Verwandlung.",
		"rulesTextEnglish": "Up to ten berries appear in your hand and are infused with magic for the duration. A creature can use its action to eat one berry. Eating a berry restores 1 hit point, and the berry provides enough nourishment to sustain a creature for one day.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verwandlung"],
		"source": "PHB 2014",
		"sourcePage": 226
	},
	{
		"id": "grease",
		"sourceId": "grease",
		"name": "Grease",
		"level": 1,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S, M (a bit of pork rind or butter)",
		"duration": "1 minute",
		"concentration": false,
		"classIds": ["wizard"],
		"classLabelsGerman": ["Magier"],
		"mechanicsSummaryGerman": "Effekt: Beschwörung. Rettungswurf: Geschicklichkeit. Zustände: liegend.",
		"rulesTextEnglish": "Slick grease covers the ground in a 10-foot square centered on a point within range and turns it into difficult terrain for the duration. When the grease appears, each creature standing in its area must succeed on a Dexterity saving throw or fall prone. A creature that enters the area or ends its turn there must also succeed on a Dexterity saving throw or fall prone.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["liegend"],
		"effectTagsGerman": ["Beschwörung"],
		"source": "PHB 2014",
		"sourcePage": 226
	},
	{
		"id": "guiding-bolt",
		"sourceId": "guiding_bolt",
		"name": "Guiding Bolt",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S",
		"duration": "1 round",
		"concentration": false,
		"classIds": ["cleric"],
		"classLabelsGerman": ["Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht. Angriff: Fernkampf-Zauberangriff. Schaden: 4W6 gleißend. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A flash of light streaks toward a creature of your choice within range. Make a ranged spell attack against the target. On a hit, the target takes 4d6 radiant damage, and the next attack roll made against this target before the end of your next turn has advantage, thanks to the mystical dim light glittering on the target until then.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.",
		"attackTypesGerman": ["Fernkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": ["4W6 gleißend"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Licht"],
		"source": "PHB 2014",
		"sourcePage": 227
	},
	{
		"id": "hail-of-thorns",
		"sourceId": "hail_of_thorns",
		"name": "Hail of Thorns",
		"level": 1,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "Self",
		"components": "V",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["ranger"],
		"classLabelsGerman": ["Waldläufer"],
		"mechanicsSummaryGerman": "Effekt: Waffenwirkung, Erschaffung. Angriff: Fernkampfangriff. Rettungswurf: Geschicklichkeit. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "The next time you hit a creature with a ranged weapon attack before the spell ends, this spell creates a rain of thorns that sprouts from your ranged weapon or ammunition. In addition to the normal effect of the attack, the target of the attack and each creature within 5 feet of it must make a Dexterity saving throw. A creature takes 1dlO piercing damage on a failed save, or half as much damage on a successful one.",
		"scalingTextEnglish": "If you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d10 for each slot level above 1st (to a maximum of 6d10).",
		"attackTypesGerman": ["Fernkampfangriff"],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Waffenwirkung", "Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 228
	},
	{
		"id": "healing-word",
		"sourceId": "healing_word",
		"name": "Healing Word",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "60 feet",
		"components": "V",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"bard",
			"cleric",
			"druid"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Druide"
		],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP. Heilung/TP: 1W4. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A creature of your choice that you can see within range regains hit points equal to 1d4 + your spellcasting ability modifier. This spell has no effect on undead or constructs. At Higher Levels.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d4 for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": ["Heilung/TP: 1W4"],
		"conditionsGerman": [],
		"effectTagsGerman": ["Heilung/TP"],
		"source": "PHB 2014",
		"sourcePage": 229
	},
	{
		"id": "hellish-rebuke",
		"sourceId": "hellish_rebuke",
		"name": "Hellish Rebuke",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 reaction, which you take in response to being damaged by a creature within 60 feet of you that you can see",
		"range": "60 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["warlock"],
		"classLabelsGerman": ["Hexenmeister"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Schaden. Rettungswurf: Geschicklichkeit, Weisheit. Schaden: 2W10 Feuer. Heilung/TP: 2W10. Zustände: verängstigt. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You point your finger, and the creature that damaged you is momentarily surrounded by hellish flames. The creature must make a Dexterity saving throw. It takes 2d10 fire damage on a failed save, or half as much damage on a successful one.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1dlO for each slot level above 1st. H eroes’ Feast 6 th-level conjuration Casting Time: 10 minutes Range: 30 feet Components: V, S, M (a gem-encrusted bowl worth at least 1,000 gp, which the spell consumes) Duration: Instantaneous You bring forth a great feast, including magnificent food and drink. The feast takes 1 hour to consume and disappears at the end of that time, and the beneficial effects don’t set in until this hour is over.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit", "Weisheit"],
		"damageGerman": ["2W10 Feuer"],
		"healingGerman": ["Heilung/TP: 2W10"],
		"conditionsGerman": ["verängstigt"],
		"effectTagsGerman": ["Heilung/TP", "Schaden"],
		"source": "PHB 2014",
		"sourcePage": 229
	},
	{
		"id": "heroism",
		"sourceId": "heroism",
		"name": "Heroism",
		"level": 1,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["bard", "paladin"],
		"classLabelsGerman": ["Barde", "Paladin"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP. temporäre TP. Zustände: verängstigt. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A willing creature you touch is imbued with bravery. Until the spell ends, the creature is immune to being frightened and gains temporary hit points equal to your spellcasting ability modifier at the start of each of its turns. When the spell ends, the target loses any remaining temporary hit points from this spell.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": ["temporäre TP"],
		"conditionsGerman": ["verängstigt"],
		"effectTagsGerman": ["Heilung/TP"],
		"source": "PHB 2014",
		"sourcePage": 229
	},
	{
		"id": "hex",
		"sourceId": "hex",
		"name": "Hex",
		"level": 1,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "90 feet",
		"components": "V, S, M (the petrified eye of a newt)",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": ["warlock"],
		"classLabelsGerman": ["Hexenmeister"],
		"mechanicsSummaryGerman": "Effekt: Schaden. Schaden: 1W6 nekrotisch. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You place a curse on a creature that you can see within range. Until the spell ends, you deal an extra 1d6 necrotic damage to the target whenever you hit it with an attack. Also, choose one ability when you cast the spell.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd or 4th level, you can maintain your concentration on the spell for up to 8 hours. When you use a spell slot of 5th level or higher, you can maintain your concentration on the spell for up to 24 hours.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["1W6 nekrotisch"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 230
	},
	{
		"id": "hunter-s-mark",
		"sourceId": "hunter_s_mark",
		"name": "Hunter’s Mark",
		"level": 1,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "90 feet",
		"components": "V",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": ["ranger"],
		"classLabelsGerman": ["Waldläufer"],
		"mechanicsSummaryGerman": "Effekt: Waffenwirkung. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You choose a creature you can see within range and mystically mark it as your quarry. Until the spell ends, you deal an extra 1d6 damage to the target whenever you hit it with a weapon attack, and you have advantage on any Wisdom (Perception) or Wisdom (Survival) check you make to find it. If the target drops to 0 hit points before this spell ends, you can use a bonus action on a subsequent turn of yours to mark a new creature.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd or 4th level, you can maintain your concentration on the spell for up to 8 hours. When you use a spell slot of 5th level or higher, you can maintain your concentration on the spell for up to 24 hours.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Waffenwirkung"],
		"source": "PHB 2014",
		"sourcePage": 230
	},
	{
		"id": "identify",
		"sourceId": "identify",
		"name": "Identify",
		"level": 1,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": true,
		"castingTime": "1 minute",
		"range": "Touch",
		"components": "V, S, M (a pearl worth at least 100 gp and an owl feather)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["bard", "wizard"],
		"classLabelsGerman": ["Barde", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Erschaffung.",
		"rulesTextEnglish": "You choose one object that you must touch throughout the casting of the spell. If it is a magic item or some other magic-imbued object, you learn its properties and how to use them, whether it requires attunement to use, and how many charges it has, if any. You learn whether any spells are affecting the item and what they are.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 231
	},
	{
		"id": "illusory-script",
		"sourceId": "illusory_script",
		"name": "Illusory Script",
		"level": 1,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": true,
		"castingTime": "1 minute",
		"range": "Touch",
		"components": "S, M (a lead-based ink worth at least 10 gp, which the spell consumes)",
		"duration": "10 days",
		"concentration": false,
		"classIds": [
			"bard",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Illusion.",
		"rulesTextEnglish": "You write on parchment, paper, or some other suitable writing material and imbue it with a potent illusion that lasts for the duration. To you and any creatures you designate when you cast the spell, the writing appears normal, written in your hand, and conveys whatever meaning you intended when you wrote the text. To all others, the writing appears as if it were written in an unknown or magical script that is unintelligible.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Illusion"],
		"source": "PHB 2014",
		"sourcePage": 231
	},
	{
		"id": "inflict-wounds",
		"sourceId": "inflict_wounds",
		"name": "Inflict Wounds",
		"level": 1,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["cleric"],
		"classLabelsGerman": ["Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Schaden. Angriff: Nahkampf-Zauberangriff. Schaden: 3W10 nekrotisch. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "Make a melee spell attack against a creature you can reach. On a hit, the target takes 3d10 necrotic damage. At Higher Levels.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d10 for each slot level above 1st.",
		"attackTypesGerman": ["Nahkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": ["3W10 nekrotisch"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 232
	},
	{
		"id": "jump",
		"sourceId": "jump",
		"name": "Jump",
		"level": 1,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (a grasshopper’s hind leg)",
		"duration": "1 minute",
		"concentration": false,
		"classIds": [
			"druid",
			"ranger",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Druide",
			"Waldläufer",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Verwandlung.",
		"rulesTextEnglish": "You touch a creature. The creature’s jump distance is tripled until the spell ends.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verwandlung"],
		"source": "PHB 2014",
		"sourcePage": 233
	},
	{
		"id": "longstrider",
		"sourceId": "longstrider",
		"name": "Longstrider",
		"level": 1,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (a pinch of dirt)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": [
			"bard",
			"druid",
			"ranger",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Druide",
			"Waldläufer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Bewegung. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You touch a creature. The target’s speed increases by 10 feet until the spell ends. At Higher Levels.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Bewegung"],
		"source": "PHB 2014",
		"sourcePage": 235
	},
	{
		"id": "mage-armor",
		"sourceId": "mage_armor",
		"name": "Mage Armor",
		"level": 1,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (a piece of cured leather)",
		"duration": "8 hours",
		"concentration": false,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Bannmagie.",
		"rulesTextEnglish": "You touch a willing creature who isn’t wearing armor, and a protective magical force surrounds it until the spell ends. The target’s base AC becomes 13 + its Dexterity modifier. The spell ends if the target dons armor or if you dismiss the spell as an action.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Bannmagie"],
		"source": "PHB 2014",
		"sourcePage": 235
	},
	{
		"id": "magic-missile",
		"sourceId": "magic_missile",
		"name": "Magic Missile",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Erschaffung. Schaden: 1W4 + 1 Kraft. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4 + 1 force damage to its target.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, the spell creates one more dart for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["1W4 + 1 Kraft"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 236
	},
	{
		"id": "protection-from-evil-and-good",
		"sourceId": "protection_from_evil_and_good",
		"name": "Protection from Evil and Good",
		"level": 1,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (holy water or powdered silver and iron, which the spell consumes)",
		"duration": "Concentration up to 10 minutes",
		"concentration": true,
		"classIds": [
			"cleric",
			"paladin",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Kleriker",
			"Paladin",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Bannmagie. Zustände: bezaubert, verängstigt. Konzentration erforderlich.",
		"rulesTextEnglish": "Until the spell ends, one willing creature you touch is protected against certain types of creatures: aberrations, celestials, elementals, fey, fiends, and undead. The protection grants several benefits. Creatures of those types have disadvantage on attack rolls against the target.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["bezaubert", "verängstigt"],
		"effectTagsGerman": ["Bannmagie"],
		"source": "PHB 2014",
		"sourcePage": 248
	},
	{
		"id": "purify-food-and-drink",
		"sourceId": "purify_food_and_drink",
		"name": "Purify Food and Drink",
		"level": 1,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": true,
		"castingTime": "1 action",
		"range": "10 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"cleric",
			"druid",
			"paladin"
		],
		"classLabelsGerman": [
			"Kleriker",
			"Druide",
			"Paladin"
		],
		"mechanicsSummaryGerman": "Effekt: Verwandlung.",
		"rulesTextEnglish": "All nonmagical food and drink within a 5-foot-radius sphere centered on a point of your choice within range is purified and rendered free of poison and disease.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verwandlung"],
		"source": "PHB 2014",
		"sourcePage": 248
	},
	{
		"id": "ray-of-sickness",
		"sourceId": "ray_of_sickness",
		"name": "Ray of Sickness",
		"level": 1,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden. Angriff: Fernkampf-Zauberangriff. Rettungswurf: Konstitution. Schaden: 2W8 Gift. Zustände: vergiftet. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A ray of sickening greenish energy lashes out toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 2d8 poison damage and must make a Constitution saving throw.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.",
		"attackTypesGerman": ["Fernkampf-Zauberangriff"],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": ["2W8 Gift"],
		"healingGerman": [],
		"conditionsGerman": ["vergiftet"],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 249
	},
	{
		"id": "sanctuary",
		"sourceId": "sanctuary",
		"name": "Sanctuary",
		"level": 1,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "30 feet",
		"components": "V, S, M (a small silver mirror)",
		"duration": "1 minute",
		"concentration": false,
		"classIds": ["cleric"],
		"classLabelsGerman": ["Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Bannmagie. Rettungswurf: Weisheit.",
		"rulesTextEnglish": "You ward a creature within range against attack. Until the spell ends, any creature who targets the warded creature with an attack or a harmful spell must first make a Wisdom saving throw. On a failed save, the creature must choose a new target or lose the attack or spell.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Bannmagie"],
		"source": "PHB 2014",
		"sourcePage": 250
	},
	{
		"id": "searing-smite",
		"sourceId": "searing_smite",
		"name": "Searing Smite",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "Self",
		"components": "V",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["paladin"],
		"classLabelsGerman": ["Paladin"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Waffenwirkung. Angriff: Nahkampfangriff. Rettungswurf: Konstitution. Schaden: 1W6 Feuer. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "The next time you hit a creature with a melee weapon attack during the spell’s duration, your weapon flares with white-hot intensity, and the attack deals an extra 1d6 fire damage to the target and causes the target to ignite in flames. At the start of each of its turns until the spell ends, the target must make a Constitution saving throw. On a failed save, it takes 1d6 fire damage.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, the initial extra damage dealt by the attack increases by 1d6 for each slot level above 1st.",
		"attackTypesGerman": ["Nahkampfangriff"],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": ["1W6 Feuer"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Waffenwirkung"],
		"source": "PHB 2014",
		"sourcePage": 252
	},
	{
		"id": "shield",
		"sourceId": "shield",
		"name": "Shield",
		"level": 1,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 reaction, which you take when you are hit by an attack or targeted by the magic missile spell",
		"range": "Self",
		"components": "V, S",
		"duration": "1 round",
		"concentration": false,
		"classIds": [
			"cleric",
			"paladin",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Kleriker",
			"Paladin",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Unsichtbarkeit. Zustände: unsichtbar.",
		"rulesTextEnglish": "An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from magic missile.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["unsichtbar"],
		"effectTagsGerman": ["Unsichtbarkeit"],
		"source": "PHB 2014",
		"sourcePage": 253
	},
	{
		"id": "shield-of-faith",
		"sourceId": "shield_of_faith",
		"name": "Shield of Faith",
		"level": 1,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "60 feet",
		"components": "V, S, M (a small parchment with a bit of holy text written on it)",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": ["cleric", "paladin"],
		"classLabelsGerman": ["Kleriker", "Paladin"],
		"mechanicsSummaryGerman": "Effekt: Bannmagie. Konzentration erforderlich.",
		"rulesTextEnglish": "A shimmering field appears and surrounds a creature of your choice within range, granting it a +2 bonus to AC for the duration.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Bannmagie"],
		"source": "PHB 2014",
		"sourcePage": 253
	},
	{
		"id": "silent-image",
		"sourceId": "silent_image",
		"name": "Silent Image",
		"level": 1,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S, M (a bit of fleece)",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Illusion, Erschaffung. Konzentration erforderlich.",
		"rulesTextEnglish": "You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 15-foot cube. The image appears at a spot within range and lasts for the duration. The image is purely visual; it isn't accompanied by sound, smell, or other sensory effects.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Illusion", "Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 254
	},
	{
		"id": "sleep",
		"sourceId": "sleep",
		"name": "Sleep",
		"level": 1,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "90 feet",
		"components": "V, S, M (a pinch of fine sand, rose petals, or a cricket)",
		"duration": "1 minute",
		"concentration": false,
		"classIds": [
			"bard",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden. Schaden: variabel (siehe Kurzregel EN). Zustände: bezaubert, bewusstlos. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "This spell sends creatures into a magical slumber. Roll 5d8; the total is how many hit points of creatures this spell can affect. Creatures within 20 feet of a point you choose within range are affected in ascending order of their current hit points (ignoring unconscious creatures).",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, roll an additional 2d8 for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": [],
		"conditionsGerman": ["bezaubert", "bewusstlos"],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 254
	},
	{
		"id": "speak-with-animals",
		"sourceId": "speak_with_animals",
		"name": "Speak with Animals",
		"level": 1,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": true,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S",
		"duration": "10 minutes",
		"concentration": false,
		"classIds": [
			"bard",
			"druid",
			"ranger"
		],
		"classLabelsGerman": [
			"Barde",
			"Druide",
			"Waldläufer"
		],
		"mechanicsSummaryGerman": "Effekt: Kommunikation.",
		"rulesTextEnglish": "You gain the ability to comprehend and verbally communicate with beasts for the duration. The knowledge and awareness of many beasts is limited by their intelligence, but at minimum, beasts can give you information about nearby locations and monsters, including whatever they can perceive or have perceived within the past day. You might be able to persuade a beast to perform a small favor for you, at the DM’s discretion.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Kommunikation"],
		"source": "PHB 2014",
		"sourcePage": 255
	},
	{
		"id": "tasha-s-hideous-laughter",
		"sourceId": "tasha_s_hideous_laughter",
		"name": "Tasha’s Hideous Laughter",
		"level": 1,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S, M (tiny tarts and a feather that is waved in the air)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["bard", "wizard"],
		"classLabelsGerman": ["Barde", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Weisheit. Schaden: variabel (siehe Kurzregel EN). Zustände: kampfunfähig, liegend. Konzentration erforderlich.",
		"rulesTextEnglish": "A creature of your choice that you can see within range perceives everything as hilariously funny and falls into fits of laughter if this spell affects it. The target must succeed on a Wisdom saving throw or fall prone, becoming incapacitated and unable to stand up for the duration. A creature with an Intelligence score of 4 or less isn’t affected.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": [],
		"conditionsGerman": ["kampfunfähig", "liegend"],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 258
	},
	{
		"id": "tenser-s-floating-disk",
		"sourceId": "tenser_s_floating_disk",
		"name": "Tenser’s Floating Disk",
		"level": 1,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": true,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S, M (a drop of mercury)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": ["wizard"],
		"classLabelsGerman": ["Magier"],
		"mechanicsSummaryGerman": "Effekt: Erschaffung.",
		"rulesTextEnglish": "This spell creates a circular, horizontal plane of force, 3 feet in diameter and 1 inch thick, that floats 3 feet above the ground in an unoccupied space of your choice that you can see within range. The disk remains for the duration, and can hold up to 500 pounds. If more weight is placed on it, the spell ends, and everything on the disk falls to the ground.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 260
	},
	{
		"id": "thunderous-smite",
		"sourceId": "thunderous_smite",
		"name": "Thunderous Smite",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "Self",
		"components": "V",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["paladin"],
		"classLabelsGerman": ["Paladin"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Waffenwirkung. Angriff: Nahkampfangriff. Rettungswurf: Stärke. Schaden: 2W6 Donner. Zustände: liegend. Konzentration erforderlich.",
		"rulesTextEnglish": "The first time you hit with a melee weapon attack during this spell’s duration, your weapon rings with thunder that is audible within 300 feet of you, and the attack deals an extra 2d6 thunder damage to the target. Additionally, if the target is a creature, it must succeed on a Strength saving throw or be pushed 10 feet away from you and knocked prone.",
		"scalingTextEnglish": "",
		"attackTypesGerman": ["Nahkampfangriff"],
		"savingThrowsGerman": ["Stärke"],
		"damageGerman": ["2W6 Donner"],
		"healingGerman": [],
		"conditionsGerman": ["liegend"],
		"effectTagsGerman": ["Schaden", "Waffenwirkung"],
		"source": "PHB 2014",
		"sourcePage": 260
	},
	{
		"id": "thunderwave",
		"sourceId": "thunderwave",
		"name": "Thunderwave",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self (15-foot cube)",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"bard",
			"druid",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Druide",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Konstitution. Schaden: 2W8 Donner. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube originating from you must make a Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": ["2W8 Donner"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 260
	},
	{
		"id": "unseen-servant",
		"sourceId": "unseen_servant",
		"name": "Unseen Servant",
		"level": 1,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": true,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S, M (a piece of string and a bit of wood)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": [
			"bard",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Licht, Unsichtbarkeit, Erschaffung. Zustände: unsichtbar.",
		"rulesTextEnglish": "This spell creates an invisible, mindless, shapeless force that performs simple tasks at your command until the spell ends. The servant springs into existence in an unoccupied space on the ground within range. It has AC 10, 1 hit point, and a Strength of 2, and it can’t attack.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["unsichtbar"],
		"effectTagsGerman": [
			"Licht",
			"Unsichtbarkeit",
			"Erschaffung"
		],
		"source": "PHB 2014",
		"sourcePage": 262
	},
	{
		"id": "witch-bolt",
		"sourceId": "witch_bolt",
		"name": "Witch Bolt",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S, M (a twig from a tree that has been struck by lightning)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht. Angriff: Fernkampf-Zauberangriff. Schaden: 1W12 Blitz. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A beam of crackling, blue energy lances out toward a creature within range, forming a sustained arc of lightning between you and the target. Make a ranged spell attack against that creature. On a hit, the target takes 1d12 lightning damage, and on each of your turns for the duration, you can use your action to deal 1d12 lightning damage to the target automatically.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 2nd level or higher, the initial damage increases by 1d12 for each slot level above 1st.",
		"attackTypesGerman": ["Fernkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": ["1W12 Blitz"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Licht"],
		"source": "PHB 2014",
		"sourcePage": 266
	},
	{
		"id": "wrathful-smite",
		"sourceId": "wrathful_smite",
		"name": "Wrathful Smite",
		"level": 1,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "Self",
		"components": "V",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["paladin"],
		"classLabelsGerman": ["Paladin"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Waffenwirkung. Angriff: Nahkampfangriff. Rettungswurf: Weisheit. Schaden: 1W6 psychisch. Zustände: verängstigt. Konzentration erforderlich.",
		"rulesTextEnglish": "The next time you hit with a melee weapon attack during this spell’s duration, your attack deals an extra 1d6 psychic damage. Additionally, if the target is a creature, it must make a Wisdom saving throw or be frightened of you until the spell ends. As an action, the creature can make a Wisdom check against your spell save DC to steel its resolve and end this spell.",
		"scalingTextEnglish": "",
		"attackTypesGerman": ["Nahkampfangriff"],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": ["1W6 psychisch"],
		"healingGerman": [],
		"conditionsGerman": ["verängstigt"],
		"effectTagsGerman": ["Schaden", "Waffenwirkung"],
		"source": "PHB 2014",
		"sourcePage": 266
	},
	{
		"id": "aid",
		"sourceId": "aid",
		"name": "Aid",
		"level": 2,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S, M (a tiny strip of white cloth)",
		"duration": "8 hours",
		"concentration": false,
		"classIds": ["cleric", "paladin"],
		"classLabelsGerman": ["Kleriker", "Paladin"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP. TP-Effekt (siehe Kurzregel EN). Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range. Each target’s hit point maximum and current hit points increase by 5 for the duration.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd level or higher, a target’s hit points increase by an additional 5 for each slot level above 2nd.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": ["TP-Effekt (siehe Kurzregel EN)"],
		"conditionsGerman": [],
		"effectTagsGerman": ["Heilung/TP"],
		"source": "PHB 2014",
		"sourcePage": 192
	},
	{
		"id": "alter-self",
		"sourceId": "alter_self",
		"name": "Alter Self",
		"level": 2,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Waffenwirkung, Bewegung, Verwandlung. Konzentration erforderlich.",
		"rulesTextEnglish": "You assume a different form. When you cast the spell, choose one of the following options, the effects of which last for the duration of the spell. While the spell lasts, you can end one option as an action to gain the benefits of a different one.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Waffenwirkung",
			"Bewegung",
			"Verwandlung"
		],
		"source": "PHB 2014",
		"sourcePage": 192
	},
	{
		"id": "animal-messenger",
		"sourceId": "animal_messenger",
		"name": "Animal Messenger",
		"level": 2,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": true,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S, M (a morsel of food)",
		"duration": "24 hours",
		"concentration": false,
		"classIds": [
			"bard",
			"druid",
			"ranger"
		],
		"classLabelsGerman": [
			"Barde",
			"Druide",
			"Waldläufer"
		],
		"mechanicsSummaryGerman": "Effekt: Verwandlung. Zustände: bewusstlos. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "By means of this spell, you use an animal to deliver a message. Choose a Tiny beast you can see within range, such as a squirrel, a blue jay, or a bat. You specify a location, which you must have visited, and a recipient who matches a general description, such as “a man or woman dressed in the uniform of the town guard” or “a red-haired dwarf wearing a pointed hat.” You also speak a message of up to twenty-five words.",
		"scalingTextEnglish": "If you cast this spell using a spell slot of 3nd level or higher, the duration of the spell increases by 48 hours for each slot level above 2nd. A nimal Shapes 8 th-level transmutation Casting Time: 1 action Range: 30 feet Components: V, S Duration: Concentration, up to 24 hours Your magic turns others into beasts. Choose any number of willing creatures that you can see within range.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["bewusstlos"],
		"effectTagsGerman": ["Verwandlung"],
		"source": "PHB 2014",
		"sourcePage": 193
	},
	{
		"id": "arcane-lock",
		"sourceId": "arcane_lock",
		"name": "Arcane Lock",
		"level": 2,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (gold dust worth at least 25 gp, which the spell consumes)",
		"duration": "Until dispelled",
		"concentration": false,
		"classIds": ["wizard"],
		"classLabelsGerman": ["Magier"],
		"mechanicsSummaryGerman": "Effekt: Bannmagie.",
		"rulesTextEnglish": "You touch a closed door, window, gate, chest, or other entryway, and it becomes locked for the duration. You and the creatures you designate when you cast this spell can open the object normally. You can also set a password that, when spoken within 5 feet of the object, suppresses this spell for 1 minute.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Bannmagie"],
		"source": "PHB 2014",
		"sourcePage": 196
	},
	{
		"id": "augury",
		"sourceId": "augury",
		"name": "Augury",
		"level": 2,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": true,
		"castingTime": "1 minute",
		"range": "Self",
		"components": "V, S, M (specially marked sticks, bones, or similar tokens worth at least 25 gp)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["cleric"],
		"classLabelsGerman": ["Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Erkenntnismagie.",
		"rulesTextEnglish": "By casting gem-inlaid sticks, rolling dragon bones, laying out ornate cards, or employing some other divining tool, you receive an omen from an otherworldly entity about the results of a specific course of action that you plan to take within the next 30 minutes. The DM chooses from the following possible omens: • Weal, for good results • Woe, for bad results • Weal and woe, for both good and bad results • Nothing, for results that aren’t especially good or bad The spell doesn’t take into account any possible circumstances that might change the outcome, such as the casting of additional spells or the loss or gain of a companion. If you...",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erkenntnismagie"],
		"source": "PHB 2014",
		"sourcePage": 196
	},
	{
		"id": "barkskin",
		"sourceId": "barkskin",
		"name": "Barkskin",
		"level": 2,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (a handful of oak bark)",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": ["druid", "ranger"],
		"classLabelsGerman": ["Druide", "Waldläufer"],
		"mechanicsSummaryGerman": "Effekt: Verwandlung. Konzentration erforderlich.",
		"rulesTextEnglish": "You touch a willing creature. Until the spell ends, the target’s skin has a rough, bark-like appearance, and the target’s AC can’t be less than 16, regardless of what kind of armor it is wearing.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verwandlung"],
		"source": "PHB 2014",
		"sourcePage": 198
	},
	{
		"id": "beast-sense",
		"sourceId": "beast_sense",
		"name": "Beast Sense",
		"level": 2,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": true,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "S",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": ["druid", "ranger"],
		"classLabelsGerman": ["Druide", "Waldläufer"],
		"mechanicsSummaryGerman": "Effekt: Erkenntnismagie. Zustände: blind, taub. Konzentration erforderlich.",
		"rulesTextEnglish": "You touch a willing beast. For the duration of the spell, you can use your action to see through the beast’s eyes and hear what it hears, and continue to do so until you use your action to return to your normal senses. While perceiving through the beast’s senses, you gain the benefits of any special senses possessed by that creature, though you are blinded and deafened to your own surroundings.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["blind", "taub"],
		"effectTagsGerman": ["Erkenntnismagie"],
		"source": "PHB 2014",
		"sourcePage": 198
	},
	{
		"id": "blindness-deafness",
		"sourceId": "blindness_deafness",
		"name": "Blindness/Deafness",
		"level": 2,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V",
		"duration": "1 minute",
		"concentration": false,
		"classIds": [
			"bard",
			"cleric",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Nekromantie. Rettungswurf: Konstitution. Zustände: blind, taub. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You can blind or deafen a foe. Choose one creature that you can see within range to make a Constitution saving throw. If it fails, the target is either blinded or deafened (your choice) for the duration.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["blind", "taub"],
		"effectTagsGerman": ["Nekromantie"],
		"source": "PHB 2014",
		"sourcePage": 200
	},
	{
		"id": "blur",
		"sourceId": "blur",
		"name": "Blur",
		"level": 2,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Illusion. Konzentration erforderlich.",
		"rulesTextEnglish": "Your body becomes blurred, shifting and wavering to all who can see you. For the duration, any creature has disadvantage on attack rolls against you. An attacker is immune to this effect if it doesn’t rely on sight, as with blindsight, or can see through illusions, as with truesight.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Illusion"],
		"source": "PHB 2014",
		"sourcePage": 200
	},
	{
		"id": "branding-smite",
		"sourceId": "branding_smite",
		"name": "Branding Smite",
		"level": 2,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "Self",
		"components": "V",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["paladin"],
		"classLabelsGerman": ["Paladin"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht, Unsichtbarkeit, Waffenwirkung. Schaden: 2W6 gleißend. Zustände: unsichtbar. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "The next time you hit a creature with a weapon attack before this spell ends, the weapon gleams with astral radiance as you strike. The attack deals an extra 2d6 radiant damage to the target, which becomes visible if it’s invisible, and the target sheds dim light in a 5-foot radius and can’t become invisible until the spell ends. At Higher Levels.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd level or higher, the extra damage increases by 1d6 for each slot level above 2nd.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["2W6 gleißend"],
		"healingGerman": [],
		"conditionsGerman": ["unsichtbar"],
		"effectTagsGerman": [
			"Schaden",
			"Licht",
			"Unsichtbarkeit",
			"Waffenwirkung"
		],
		"source": "PHB 2014",
		"sourcePage": 200
	},
	{
		"id": "calm-emotions",
		"sourceId": "calm_emotions",
		"name": "Calm Emotions",
		"level": 2,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["bard", "cleric"],
		"classLabelsGerman": ["Barde", "Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht, Erschaffung. Rettungswurf: Geschicklichkeit, Charisma. Schaden: 10W8 Blitz. Zustände: bezaubert, verängstigt. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You attempt to suppress strong emotions in a group of people. Each humanoid in a 20-foot-radius sphere centered on a point you choose within range must make a Charisma saving throw; a creature can choose to fail this saving throw if it wishes. If a creature fails its saving throw, choose one of the following two effects.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 7th level or higher, one additional bolt leaps from the first target to another target for each slot level above 6th.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit", "Charisma"],
		"damageGerman": ["10W8 Blitz"],
		"healingGerman": [],
		"conditionsGerman": ["bezaubert", "verängstigt"],
		"effectTagsGerman": [
			"Schaden",
			"Licht",
			"Erschaffung"
		],
		"source": "PHB 2014",
		"sourcePage": 202
	},
	{
		"id": "cloud-of-daggers",
		"sourceId": "cloud_of_daggers",
		"name": "Cloud of Daggers",
		"level": 2,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S, M (a sliver of glass)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden. Schaden: 4W4 Hieb. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You fill the air with spinning daggers in a cube 5 feet on each side, centered on a point you choose within range. A creature takes 4d4 slashing damage when it enters the spell’s area for the first time on a turn or starts its turn there. At Higher Levels.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 2d4 for each slot level above 2nd.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["4W4 Hieb"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 203
	},
	{
		"id": "continual-flame",
		"sourceId": "continual_flame",
		"name": "Continual Flame",
		"level": 2,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (ruby dust worth 50 gp, which the spell consumes)",
		"duration": "Until dispelled",
		"concentration": false,
		"classIds": ["cleric", "wizard"],
		"classLabelsGerman": ["Kleriker", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Erschaffung.",
		"rulesTextEnglish": "A flame, equivalent in brightness to a torch, springs forth from an object that you touch. The effect looks like a regular flame, but it creates no heat and doesn’t use oxygen. A continual flame can be covered or hidden but not smothered or quenched.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 208
	},
	{
		"id": "cordon-of-arrows",
		"sourceId": "cordon_of_arrows",
		"name": "Cordon of Arrows",
		"level": 2,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "5 feet",
		"components": "V, S, M (four or more arrows or bolts)",
		"duration": "8 hours",
		"concentration": false,
		"classIds": ["ranger"],
		"classLabelsGerman": ["Waldläufer"],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Geschicklichkeit. Schaden: 1W6 Stich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You plant four pieces of nonmagical ammunition— arrows or crossbow bolts—in the ground within range and lay magic upon them to protect an area. Until the spell ends, whenever a creature other than you comes within 30 feet of the ammunition for the first time on a turn or ends its turn there, one piece of ammunition flies up to strike it. The creature must succeed on a Dexterity saving throw or take 1d6 piercing damage.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd level or higher, the amount of ammunition that can be affected increases by two for each slot level above 2nd.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": ["1W6 Stich"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 209
	},
	{
		"id": "crown-of-madness",
		"sourceId": "crown_of_madness",
		"name": "Crown of Madness",
		"level": 2,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Kontrolle. Rettungswurf: Weisheit. Zustände: bezaubert. Konzentration erforderlich.",
		"rulesTextEnglish": "One humanoid of your choice that you can see within range must succeed on a Wisdom saving throw or become charmed by you for the duration. While the target is charmed in this way, a twisted crown of jagged iron appears on its head, and a madness glows in its eyes. The charmed target must use its action before moving on each of its turns to make a melee attack against a creature other than itself that you mentally choose.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["bezaubert"],
		"effectTagsGerman": ["Kontrolle"],
		"source": "PHB 2014",
		"sourcePage": 210
	},
	{
		"id": "darkness",
		"sourceId": "darkness",
		"name": "Darkness",
		"level": 2,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, M (bat fur and a drop of pitch or piece of coal)",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": [
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Licht, Dunkelheit, Erschaffung. Konzentration erforderlich.",
		"rulesTextEnglish": "Magical darkness spreads from a point you choose within range to fill a 15-foot-radius sphere for the duration. The darkness spreads around corners. A creature with darkvision can’t see through this darkness, and nonmagical light can’t illuminate it.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Licht",
			"Dunkelheit",
			"Erschaffung"
		],
		"source": "PHB 2014",
		"sourcePage": 211
	},
	{
		"id": "darkvision",
		"sourceId": "darkvision",
		"name": "Darkvision",
		"level": 2,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (either a pinch of dried carrot or an agate)",
		"duration": "8 hours",
		"concentration": false,
		"classIds": [
			"druid",
			"ranger",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Druide",
			"Waldläufer",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Verwandlung.",
		"rulesTextEnglish": "You touch a willing creature to grant it the ability to see in the dark. For the duration, that creature has darkvision out to a range of 60 feet.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verwandlung"],
		"source": "PHB 2014",
		"sourcePage": 211
	},
	{
		"id": "detect-thoughts",
		"sourceId": "detect_thoughts",
		"name": "Detect Thoughts",
		"level": 2,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S, M (a copper piece)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Wahrnehmung. Rettungswurf: Weisheit. Konzentration erforderlich.",
		"rulesTextEnglish": "For the duration, you can read the thoughts of certain creatures. When you cast the spell and as your action on each turn until the spell ends, you can focus your mind on any one creature that you can see within 30 feet of you. If the creature you choose has an Intelligence of 3 or lower or doesn’t speak any language, the creature is unaffected.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Wahrnehmung"],
		"source": "PHB 2014",
		"sourcePage": 212
	},
	{
		"id": "enhance-ability",
		"sourceId": "enhance_ability",
		"name": "Enhance Ability",
		"level": 2,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (fur or a feather from a beast)",
		"duration": "Concentration, up to 1 hour.",
		"concentration": true,
		"classIds": [
			"bard",
			"cleric",
			"druid",
			"sorcerer"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Druide",
			"Zauberer"
		],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Schaden. Schaden: variabel (siehe Kurzregel EN). temporäre TP (2W6). Zustände: kampfunfähig. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You touch a creature and bestow upon it a magical enhancement. Choose one of the following effects; the target gains that effect until the spell ends. Bear’s Endurance.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": ["temporäre TP (2W6)"],
		"conditionsGerman": ["kampfunfähig"],
		"effectTagsGerman": ["Heilung/TP", "Schaden"],
		"source": "PHB 2014",
		"sourcePage": 217
	},
	{
		"id": "enlarge-reduce",
		"sourceId": "enlarge_reduce",
		"name": "Enlarge/Reduce",
		"level": 2,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S, M (a pinch of powdered iron)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Waffenwirkung. Rettungswurf: Stärke, Konstitution. Schaden: 1W4 extra, 1W4 less. Konzentration erforderlich.",
		"rulesTextEnglish": "You cause a creature or an object you can see within range to grow larger or smaller for the duration. Choose either a creature or an object that is neither worn nor carried. If the target is unwilling, it can make a Constitution saving throw.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Stärke", "Konstitution"],
		"damageGerman": ["1W4 extra", "1W4 less"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Waffenwirkung"],
		"source": "PHB 2014",
		"sourcePage": 217
	},
	{
		"id": "enthrall",
		"sourceId": "enthrall",
		"name": "Enthrall",
		"level": 2,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S",
		"duration": "1 minute",
		"concentration": false,
		"classIds": ["bard", "warlock"],
		"classLabelsGerman": ["Barde", "Hexenmeister"],
		"mechanicsSummaryGerman": "Effekt: Verzauberung. Rettungswurf: Weisheit. Zustände: bezaubert, kampfunfähig.",
		"rulesTextEnglish": "You weave a distracting string of words, causing creatures of your choice that you can see within range and that can hear you to make a Wisdom saving throw. Any creature that can’t be charmed succeeds on this saving throw automatically, and if you or your companions are fighting a creature, it has advantage on the save. On a failed save, the target has disadvantage on Wisdom (Perception) checks made to perceive any creature other than you until the spell ends or until the target can no longer hear you.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["bezaubert", "kampfunfähig"],
		"effectTagsGerman": ["Verzauberung"],
		"source": "PHB 2014",
		"sourcePage": 218
	},
	{
		"id": "find-steed",
		"sourceId": "find_steed",
		"name": "Find Steed",
		"level": 2,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "10 minutes",
		"range": "30 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["paladin"],
		"classLabelsGerman": ["Paladin"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Beschwörung, Kommunikation. TP-Effekt (siehe Kurzregel EN).",
		"rulesTextEnglish": "You summon a spirit that assumes the form of an unusually intelligent, strong, and loyal steed, creating a long-lasting bond with it. Appearing in an unoccupied space within range, the steed takes on a form that you choose, such as a warhorse, a pony, a camel, an elk, or a mastiff. (Your DM might allow other animals to be summoned as steeds.) The steed has the statistics of the chosen form, though it is a celestial, fey, or fiend (your choice) instead of its normal type. Additionally, if your steed has an Intelligence of 5 or less, its Intelligence becomes 6, and it gains the ability to understand one language of your choice that you speak.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": ["TP-Effekt (siehe Kurzregel EN)"],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Heilung/TP",
			"Beschwörung",
			"Kommunikation"
		],
		"source": "PHB 2014",
		"sourcePage": 220
	},
	{
		"id": "find-traps",
		"sourceId": "find_traps",
		"name": "Find Traps",
		"level": 2,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"cleric",
			"druid",
			"ranger"
		],
		"classLabelsGerman": [
			"Kleriker",
			"Druide",
			"Waldläufer"
		],
		"mechanicsSummaryGerman": "Effekt: Erkenntnismagie.",
		"rulesTextEnglish": "You sense the presence of any trap within range that is within line of sight. A trap, for the purpose of this spell, includes anything that would inflict a sudden or unexpected effect you consider harmful or undesirable, which was specifically intended as such by its creator. Thus, the spell would sense an area affected by the alarm spell, a glyph o f warding, or a mechanical pit trap, but it would not reveal a natural weakness in the floor, an unstable ceiling, or a hidden sinkhole.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erkenntnismagie"],
		"source": "PHB 2014",
		"sourcePage": 221
	},
	{
		"id": "flame-blade",
		"sourceId": "flame_blade",
		"name": "Flame Blade",
		"level": 2,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "Self",
		"components": "V, S, M (leaf of sumac)",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": ["druid"],
		"classLabelsGerman": ["Druide"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht. Angriff: Nahkampf-Zauberangriff. Schaden: 3W6 Feuer. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You evoke a fiery blade in your free hand. The blade is similar in size and shape to a scimitar, and it lasts for the duration. If you let go of the blade, it disappears, but you can evoke the blade again as a bonus action.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for every two slot levels above 2nd.",
		"attackTypesGerman": ["Nahkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": ["3W6 Feuer"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Licht"],
		"source": "PHB 2014",
		"sourcePage": 222
	},
	{
		"id": "flaming-sphere",
		"sourceId": "flaming_sphere",
		"name": "Flaming Sphere",
		"level": 2,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S, M (a bit of tallow, a pinch of brimstone, and a dusting of powdered iron)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["druid", "wizard"],
		"classLabelsGerman": ["Druide", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht. Rettungswurf: Geschicklichkeit, Konstitution. Schaden: 2W6 Feuer. Zustände: versteinert, festgesetzt. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A 5-foot-diameter sphere of fire appears in an unoccupied space of your choice within range and lasts for the duration. Any creature that ends its turn within 5 feet of the sphere must make a Dexterity saving throw. The creature takes 2d6 fire damage on a failed save, or half as much damage on a successful one.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot level above 2nd. Flesh to Stone 6 th-level transmutation Casting Time: 1 action Range: 60 feet Components: V, S, M (a pinch of lime, water, and earth) Duration: Concentration, up to 1 minute You attempt to turn one creature that you can see within range into stone. If the target’s body is made of flesh, the creature must make a Constitution saving throw.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit", "Konstitution"],
		"damageGerman": ["2W6 Feuer"],
		"healingGerman": [],
		"conditionsGerman": ["versteinert", "festgesetzt"],
		"effectTagsGerman": ["Schaden", "Licht"],
		"source": "PHB 2014",
		"sourcePage": 222
	},
	{
		"id": "gentle-repose",
		"sourceId": "gentle_repose",
		"name": "Gentle Repose",
		"level": 2,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": true,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (a pinch of salt and one copper piece placed on each of the corpse’s eyes, which must remain there for the duration)",
		"duration": "10 days",
		"concentration": false,
		"classIds": ["cleric", "wizard"],
		"classLabelsGerman": ["Kleriker", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Nekromantie.",
		"rulesTextEnglish": "You touch a corpse or other remains. For the duration, the target is protected from decay and can’t become undead. The spell also effectively extends the time limit on raising the target from the dead, since days spent under the influence of this spell don’t count against the time limit of spells such as raise dead.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Nekromantie"],
		"source": "PHB 2014",
		"sourcePage": 225
	},
	{
		"id": "gust-of-wind",
		"sourceId": "gust_of_wind",
		"name": "Gust of Wind",
		"level": 2,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self (60-foot line)",
		"components": "V, S, M (a legume seed)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"druid",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Druide",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Hervorrufung. Rettungswurf: Stärke. Konzentration erforderlich.",
		"rulesTextEnglish": "A line of strong wind 60 feet long and 10 feet wide blasts from you in a direction you choose for the spell’s duration. Each creature that starts its turn in the line must succeed on a Strength saving throw or be pushed 15 feet away from you in a direction following the line. Any creature in the line must spend 2 feet of movement for every 1 foot it moves when moving closer to you.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Stärke"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Hervorrufung"],
		"source": "PHB 2014",
		"sourcePage": 227
	},
	{
		"id": "heat-metal",
		"sourceId": "heat_metal",
		"name": "Heat Metal",
		"level": 2,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S, M (a piece of iron and a flame)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["bard", "druid"],
		"classLabelsGerman": ["Barde", "Druide"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Waffenwirkung. Rettungswurf: Konstitution. Schaden: 2W8 Feuer. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "Choose a manufactured metal object, such as a metal weapon or a suit of heavy or medium metal armor, that you can see within range. You cause the object to glow red-hot. Any creature in physical contact with the object takes 2d8 fire damage when you cast the spell.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for each slot level above 2nd.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": ["2W8 Feuer"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Waffenwirkung"],
		"source": "PHB 2014",
		"sourcePage": 229
	},
	{
		"id": "hold-person",
		"sourceId": "hold_person",
		"name": "Hold Person",
		"level": 2,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S, M (a small, straight piece of iron)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"bard",
			"cleric",
			"druid",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Druide",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Licht. Rettungswurf: Konstitution, Weisheit. Zustände: blind, gelähmt. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "Choose a humanoid that you can see within range. The target must succeed on a Wisdom saving throw or be paralyzed for the duration. At the end of each of its turns, the target can make another Wisdom saving throw.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd level or higher, you can target one additional humanoid for each slot level above 2nd. The humanoids must be within 30 feet of each other when you target them. H oly Aura 8 th-level abjuration Casting Time: 1 action Range: Self Components: V, S, M (a tiny reliquary worth at least 1,000 gp containing a sacred relic, such as a scrap of cloth from a saint’s robe or a piece of parchment from a religious text) Duration: Concentration, up to 1 minute Divine light washes out from you and coalesces in a soft radiance in a 30-foot radius around you.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution", "Weisheit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["blind", "gelähmt"],
		"effectTagsGerman": ["Licht"],
		"source": "PHB 2014",
		"sourcePage": 230
	},
	{
		"id": "invisibility",
		"sourceId": "invisibility",
		"name": "Invisibility",
		"level": 2,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (an eyelash encased in gum arabic)",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Unsichtbarkeit. Zustände: unsichtbar. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target’s person. The spell ends for a target that attacks or casts a spell.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["unsichtbar"],
		"effectTagsGerman": ["Unsichtbarkeit"],
		"source": "PHB 2014",
		"sourcePage": 233
	},
	{
		"id": "knock",
		"sourceId": "knock",
		"name": "Knock",
		"level": 2,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"bard",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Verwandlung.",
		"rulesTextEnglish": "Choose an object that you can see within range. The object can be a door, a box, a chest, a set of manacles, a padlock, or another object that contains a mundane or magical means that prevents access. A target that is held shut by a mundane lock or that is stuck or barred becomes unlocked, unstuck, or unbarred.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verwandlung"],
		"source": "PHB 2014",
		"sourcePage": 233
	},
	{
		"id": "lesser-restoration",
		"sourceId": "lesser_restoration",
		"name": "Lesser Restoration",
		"level": 2,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"bard",
			"cleric",
			"druid",
			"paladin",
			"ranger"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Druide",
			"Paladin",
			"Waldläufer"
		],
		"mechanicsSummaryGerman": "Effekt: Bannmagie. Zustände: blind, taub, gelähmt, vergiftet.",
		"rulesTextEnglish": "You touch a creature and can end either one disease or one condition afflicting it. The condition can be blinded, deafened, paralyzed, or poisoned.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [
			"blind",
			"taub",
			"gelähmt",
			"vergiftet"
		],
		"effectTagsGerman": ["Bannmagie"],
		"source": "PHB 2014",
		"sourcePage": 234
	},
	{
		"id": "levitate",
		"sourceId": "levitate",
		"name": "Levitate",
		"level": 2,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S, M (either a small leather loop or a piece of golden wire bent into a cup shape with a long shank on one end)",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Verwandlung. Rettungswurf: Konstitution. Konzentration erforderlich.",
		"rulesTextEnglish": "One creature or object of your choice that you can see within range rises vertically, up to 20 feet, and remains suspended there for the duration. The spell can levitate a target that weighs up to 500 pounds. An unwilling creature that succeeds on a Constitution saving throw is unaffected.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verwandlung"],
		"source": "PHB 2014",
		"sourcePage": 234
	},
	{
		"id": "locate-animals-or-plants",
		"sourceId": "locate_animals_or_plants",
		"name": "Locate Animals or Plants",
		"level": 2,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": true,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S, M (a bit of fur from a bloodhound)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"bard",
			"druid",
			"ranger"
		],
		"classLabelsGerman": [
			"Barde",
			"Druide",
			"Waldläufer"
		],
		"mechanicsSummaryGerman": "Effekt: Erkenntnismagie.",
		"rulesTextEnglish": "Describe or name a specific kind of beast or plant. Concentrating on the voice of nature in your surroundings, you learn the direction and distance to the closest creature or plant of that kind within 5 miles, if any are present.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erkenntnismagie"],
		"source": "PHB 2014",
		"sourcePage": 235
	},
	{
		"id": "locate-object",
		"sourceId": "locate_object",
		"name": "Locate Object",
		"level": 2,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S, M (a forked twig)",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": [
			"bard",
			"cleric",
			"druid",
			"paladin",
			"ranger",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Druide",
			"Paladin",
			"Waldläufer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Waffenwirkung. Konzentration erforderlich.",
		"rulesTextEnglish": "Describe or name an object that is familiar to you. You sense the direction to the object’s location, as long as that object is within 1,000 feet of you. If the object is in motion, you know the direction of its movement.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Waffenwirkung"],
		"source": "PHB 2014",
		"sourcePage": 235
	},
	{
		"id": "magic-mouth",
		"sourceId": "magic_mouth",
		"name": "Magic Mouth",
		"level": 2,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": true,
		"castingTime": "1 minute",
		"range": "30 feet",
		"components": "V, S, M (a small bit of honeycomb and jade dust worth at least 10 gp, which the spell consumes)",
		"duration": "Until dispelled",
		"concentration": false,
		"classIds": ["bard", "wizard"],
		"classLabelsGerman": ["Barde", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Illusion.",
		"rulesTextEnglish": "You implant a message within an object in range, a message that is uttered when a trigger condition is met. Choose an object that you can see and that isn’t being worn or carried by another creature. Then speak the message, which must be 25 words or less, though it can be delivered over as long as 10 minutes.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Illusion"],
		"source": "PHB 2014",
		"sourcePage": 236
	},
	{
		"id": "magic-weapon",
		"sourceId": "magic_weapon",
		"name": "Magic Weapon",
		"level": 2,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "Touch",
		"components": "V, S",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": ["paladin", "wizard"],
		"classLabelsGerman": ["Paladin", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Waffenwirkung. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You touch a nonmagical weapon. Until the spell ends, that weapon becomes a magic weapon with a +1 bonus to attack rolls and damage rolls. At Higher Levels.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 4th level or higher, the bonus increases to +2. When you use a spell slot of 6th level or higher, the bonus increases to +3.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Waffenwirkung"],
		"source": "PHB 2014",
		"sourcePage": 236
	},
	{
		"id": "melf-s-acid-arrow",
		"sourceId": "melf_s_acid_arrow",
		"name": "Melf’s Acid Arrow",
		"level": 2,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "90 feet",
		"components": "V, S, M (powdered rhubarb leaf and an adder’s stomach)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["wizard"],
		"classLabelsGerman": ["Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden. Angriff: Fernkampf-Zauberangriff. Schaden: 4W4 Säure, 2W4 Säure. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd.",
		"attackTypesGerman": ["Fernkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": ["4W4 Säure", "2W4 Säure"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 238
	},
	{
		"id": "mirror-image",
		"sourceId": "mirror_image",
		"name": "Mirror Image",
		"level": 2,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S",
		"duration": "1 minute",
		"concentration": false,
		"classIds": [
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Illusion.",
		"rulesTextEnglish": "Three illusory duplicates of yourself appear in your space. Until the spell ends, the duplicates move with you and mimic your actions, shifting position so it’s impossible to track which image is real. You can use your action to dismiss the illusory duplicates.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Illusion"],
		"source": "PHB 2014",
		"sourcePage": 239
	},
	{
		"id": "misty-step",
		"sourceId": "misty_step",
		"name": "Misty Step",
		"level": 2,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "Self",
		"components": "V",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Teleportation.",
		"rulesTextEnglish": "Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Teleportation"],
		"source": "PHB 2014",
		"sourcePage": 239
	},
	{
		"id": "moonbeam",
		"sourceId": "moonbeam",
		"name": "Moonbeam",
		"level": 2,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S, M (several seeds of any moonseed plant and a piece of opalescent feldspar)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["druid"],
		"classLabelsGerman": ["Druide"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht. Rettungswurf: Konstitution. Schaden: 2W10 gleißend. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A silvery beam of pale light shines down in a 5-footradius, 40-foot-high cylinder centered on a point within range. Until the spell ends, dim light fills the cylinder. When a creature enters the spell’s area for the first time on a turn or starts its turn there, it is engulfed in ghostly flames that cause searing pain, and it must make a Constitution saving throw.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1dlO for each slot level above 2nd.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": ["2W10 gleißend"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Licht"],
		"source": "PHB 2014",
		"sourcePage": 240
	},
	{
		"id": "nystul-s-magic-aura",
		"sourceId": "nystul_s_magic_aura",
		"name": "Nystul’s Magic Aura",
		"level": 2,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (a small square of silk)",
		"duration": "24 hours",
		"concentration": false,
		"classIds": ["wizard"],
		"classLabelsGerman": ["Magier"],
		"mechanicsSummaryGerman": "Effekt: Illusion, Wahrnehmung.",
		"rulesTextEnglish": "You place an illusion on a creature or an object you touch so that divination spells reveal false information about it. The target can be a willing creature or an object that isn’t being carried or worn by another creature. When you cast the spell, choose one or both of the following effects.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Illusion", "Wahrnehmung"],
		"source": "PHB 2014",
		"sourcePage": 242
	},
	{
		"id": "pass-without-trace",
		"sourceId": "pass_without_trace",
		"name": "Pass without Trace",
		"level": 2,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S, M (ashes from a burned leaf of mistletoe and a sprig of spruce)",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": ["druid", "ranger"],
		"classLabelsGerman": ["Druide", "Waldläufer"],
		"mechanicsSummaryGerman": "Effekt: Wahrnehmung. Konzentration erforderlich.",
		"rulesTextEnglish": "A veil of shadows and silence radiates from you, masking you and your companions from detection. For the duration, each creature you choose within 30 feet of you (including you) has a +10 bonus to Dexterity (Stealth) checks and can’t be tracked except by magical means. A creature that receives this bonus leaves behind no tracks or other traces of its passage.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Wahrnehmung"],
		"source": "PHB 2014",
		"sourcePage": 243
	},
	{
		"id": "phantasmal-force",
		"sourceId": "phantasmal_force",
		"name": "Phantasmal Force",
		"level": 2,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S, M (a bit of fleece)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden, Illusion, Erschaffung. Rettungswurf: Intelligenz. Schaden: variabel (siehe Kurzregel EN), 1W6 psychisch. Konzentration erforderlich.",
		"rulesTextEnglish": "You craft an illusion that takes root in the mind of a creature that you can see within range. The target must make an Intelligence saving throw. On a failed save, you create a phantasmal object, creature, or other visible phenomenon of your choice that is no larger than a 10-foot cube and that is perceivable only to the target for the duration.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Intelligenz"],
		"damageGerman": ["variabel (siehe Kurzregel EN)", "1W6 psychisch"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Schaden",
			"Illusion",
			"Erschaffung"
		],
		"source": "PHB 2014",
		"sourcePage": 243
	},
	{
		"id": "prayer-of-healing",
		"sourceId": "prayer_of_healing",
		"name": "Prayer of Healing",
		"level": 2,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "10 minutes",
		"range": "30 feet",
		"components": "V",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["cleric"],
		"classLabelsGerman": ["Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP. Heilung/TP: 2W8 Heilung/TP: 1W8. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "Up to six creatures of your choice that you can see within range each regain hit points equal to 2d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs. At Higher Levels.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd level or higher, the healing increases by 1d8 for each slot level above 2nd.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": ["Heilung/TP: 2W8", "Heilung/TP: 1W8"],
		"conditionsGerman": [],
		"effectTagsGerman": ["Heilung/TP"],
		"source": "PHB 2014",
		"sourcePage": 246
	},
	{
		"id": "protection-from-poison",
		"sourceId": "protection_from_poison",
		"name": "Protection from Poison",
		"level": 2,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S",
		"duration": "1 hour",
		"concentration": false,
		"classIds": [
			"cleric",
			"druid",
			"paladin",
			"ranger"
		],
		"classLabelsGerman": [
			"Kleriker",
			"Druide",
			"Paladin",
			"Waldläufer"
		],
		"mechanicsSummaryGerman": "Effekt: Bannmagie. Zustände: vergiftet.",
		"rulesTextEnglish": "You touch a creature. If it is poisoned, you neutralize the poison. If more than one poison afflicts the target, you neutralize one poison that you know is present, or you neutralize one at random.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["vergiftet"],
		"effectTagsGerman": ["Bannmagie"],
		"source": "PHB 2014",
		"sourcePage": 248
	},
	{
		"id": "ray-of-enfeeblement",
		"sourceId": "ray_of_enfeeblement",
		"name": "Ray of Enfeeblement",
		"level": 2,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["warlock", "wizard"],
		"classLabelsGerman": ["Hexenmeister", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Waffenwirkung. Angriff: Fernkampf-Zauberangriff. Rettungswurf: Konstitution. Konzentration erforderlich.",
		"rulesTextEnglish": "A black beam of enervating energy springs from your finger toward a creature within range. Make a ranged spell attack against the target. On a hit, the target deals only half damage with weapon attacks that use Strength until the spell ends.",
		"scalingTextEnglish": "",
		"attackTypesGerman": ["Fernkampf-Zauberangriff"],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Waffenwirkung"],
		"source": "PHB 2014",
		"sourcePage": 249
	},
	{
		"id": "rope-trick",
		"sourceId": "rope_trick",
		"name": "Rope Trick",
		"level": 2,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (powdered corn extract and a twisted loop of parchment)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": ["wizard"],
		"classLabelsGerman": ["Magier"],
		"mechanicsSummaryGerman": "Effekt: Unsichtbarkeit. Zustände: unsichtbar.",
		"rulesTextEnglish": "You touch a length of rope that is up to 60 feet long. One end of the rope then rises into the air until the whole rope hangs perpendicular to the ground. At the upper end of the rope, an invisible entrance opens to an extradimensional space that lasts until the spell ends.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["unsichtbar"],
		"effectTagsGerman": ["Unsichtbarkeit"],
		"source": "PHB 2014",
		"sourcePage": 250
	},
	{
		"id": "scorching-ray",
		"sourceId": "scorching_ray",
		"name": "Scorching Ray",
		"level": 2,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Erschaffung. Angriff: Fernkampf-Zauberangriff. Schaden: 2W6 Feuer. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You create three rays of fire and hurl them at targets within range. You can hurl them at one target or several. Make a ranged spell attack for each ray.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd level or higher, you create one additional ray for each slot level above 2nd.",
		"attackTypesGerman": ["Fernkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": ["2W6 Feuer"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 251
	},
	{
		"id": "see-invisibility",
		"sourceId": "see_invisibility",
		"name": "See Invisibility",
		"level": 2,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S, M (a pinch of talc and a small sprinkling of powdered silver)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": [
			"bard",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Unsichtbarkeit. Zustände: unsichtbar.",
		"rulesTextEnglish": "For the duration, you see invisible creatures and objects as if they were visible, and you can see into the Ethereal Plane. Ethereal creatures and objects appear ghostly and translucent.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["unsichtbar"],
		"effectTagsGerman": ["Unsichtbarkeit"],
		"source": "PHB 2014",
		"sourcePage": 252
	},
	{
		"id": "shatter",
		"sourceId": "shatter",
		"name": "Shatter",
		"level": 2,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S, M (a chip of mica)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Konstitution. Schaden: 3W8 Donner. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A sudden loud ringing noise, painfully intense, erupts from a point of your choice within range. Each creature in a 10-foot-radius sphere centered on that point must make a Constitution saving throw. A creature takes 3d8 thunder damage on a failed save, or half as much damage on a successful one.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for each slot level above 2nd.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": ["3W8 Donner"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 253
	},
	{
		"id": "silence",
		"sourceId": "silence",
		"name": "Silence",
		"level": 2,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": true,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": [
			"bard",
			"cleric",
			"ranger"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Waldläufer"
		],
		"mechanicsSummaryGerman": "Effekt: Erschaffung. Zustände: taub. Konzentration erforderlich.",
		"rulesTextEnglish": "For the duration, no sound can be created within or pass through a 20-foot-radius sphere centered on a point you choose within range. Any creature or object entirely inside the sphere is immune to thunder damage, and creatures are deafened while entirely inside it. Casting a spell that includes a verbal component is impossible there.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["taub"],
		"effectTagsGerman": ["Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 253
	},
	{
		"id": "spider-climb",
		"sourceId": "spider_climb",
		"name": "Spider Climb",
		"level": 2,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (a drop of bitumen and a spider)",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": [
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Bewegung. Konzentration erforderlich.",
		"rulesTextEnglish": "Until the spell ends, one willing creature you touch gains the ability to move up, down, and across vertical surfaces and upside down along ceilings, while leaving its hands free. The target also gains a climbing speed equal to its walking speed.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Bewegung"],
		"source": "PHB 2014",
		"sourcePage": 255
	},
	{
		"id": "spike-growth",
		"sourceId": "spike_growth",
		"name": "Spike Growth",
		"level": 2,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "150 feet",
		"components": "V, S, M (seven sharp thorns or seven small twigs, each sharpened to a point)",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": ["druid", "ranger"],
		"classLabelsGerman": ["Druide", "Waldläufer"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Verwandlung. Schaden: 2W4 Stich. Konzentration erforderlich.",
		"rulesTextEnglish": "The ground in a 20-foot radius centered on a point within range twists and sprouts hard spikes and thorns. The area becomes difficult terrain for the duration. When a creature moves into or within the area, it takes 2d4 piercing damage for every 5 feet it travels.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["2W4 Stich"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Verwandlung"],
		"source": "PHB 2014",
		"sourcePage": 255
	},
	{
		"id": "spiritual-weapon",
		"sourceId": "spiritual_weapon",
		"name": "Spiritual Weapon",
		"level": 2,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "60 feet",
		"components": "V, S",
		"duration": "1 minute",
		"concentration": false,
		"classIds": ["cleric"],
		"classLabelsGerman": ["Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Waffenwirkung, Erschaffung. Angriff: Nahkampf-Zauberangriff. Schaden: variabel (siehe Kurzregel EN). Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You create a floating, spectral weapon within range that lasts for the duration or until you cast this spell again. When you cast the spell, you can make a melee spell attack against a creature within 5 feet of the weapon. On a hit, the target takes force damage equal to 1d8 + your spellcasting ability modifier.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for every two slot levels above the 2nd.",
		"attackTypesGerman": ["Nahkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Schaden",
			"Waffenwirkung",
			"Erschaffung"
		],
		"source": "PHB 2014",
		"sourcePage": 256
	},
	{
		"id": "suggestion",
		"sourceId": "suggestion",
		"name": "Suggestion",
		"level": 2,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, M (a snake’s tongue and either a bit of honeycomb or a drop of sweet oil)",
		"duration": "Concentration, up to 8 hours",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Verzauberung. Rettungswurf: Weisheit. Zustände: bezaubert. Konzentration erforderlich.",
		"rulesTextEnglish": "You suggest a course of activity (limited to a sentence or two) and magically influence a creature you can see within range that can hear and understand you. Creatures that can’t be charmed are immune to this effect. The suggestion must be worded in such a manner as to make the course of action sound reasonable.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["bezaubert"],
		"effectTagsGerman": ["Verzauberung"],
		"source": "PHB 2014",
		"sourcePage": 257
	},
	{
		"id": "warding-bond",
		"sourceId": "warding_bond",
		"name": "Warding Bond",
		"level": 2,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (a pair of platinum rings worth at least 50 gp each, which you and the target must wear for the duration)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": ["cleric"],
		"classLabelsGerman": ["Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Erschaffung. Schaden: variabel (siehe Kurzregel EN).",
		"rulesTextEnglish": "This spell wards a willing creature you touch and creates a mystic connection between you and the target until the spell ends. While the target is within 60 feet of you, it gains a +1 bonus to AC and saving throws, and it has resistance to all damage. Also, each time it takes damage, you take the same amount of damage.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 264
	},
	{
		"id": "web",
		"sourceId": "web",
		"name": "Web",
		"level": 2,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S, M (a bit of spiderweb)",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Beschwörung, Licht. Rettungswurf: Geschicklichkeit. Schaden: 2W4 Feuer. Zustände: festgesetzt. Konzentration erforderlich.",
		"rulesTextEnglish": "You conjure a mass of thick, sticky webbing at a point of your choice within range. The webs fill a 20-foot cube from that point for the duration. The webs are difficult terrain and lightly obscure their area.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": ["2W4 Feuer"],
		"healingGerman": [],
		"conditionsGerman": ["festgesetzt"],
		"effectTagsGerman": [
			"Schaden",
			"Beschwörung",
			"Licht"
		],
		"source": "PHB 2014",
		"sourcePage": 264
	},
	{
		"id": "zone-of-truth",
		"sourceId": "zone_of_truth",
		"name": "Zone of Truth",
		"level": 2,
		"school": "enchantment",
		"schoolLabelGerman": "Verzauberung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S",
		"duration": "10 minutes",
		"concentration": false,
		"classIds": [
			"bard",
			"cleric",
			"paladin"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Paladin"
		],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Schaden, Beschwörung, Licht, Dunkelheit, Unsichtbarkeit, Illusion, Waffenwirkung, RK/Schutz, Bewegung, Wahrnehmung, Kommunikation, Kontrolle, Erschaffung, Verwandlung. Angriff: Fernkampfangriff, Nahkampfangriff. Rettungswurf: Stärke, Geschicklichkeit, Konstitution, Weisheit, Charisma. Schaden: variabel (siehe Kurzregel EN). TP-Effekt (siehe Kurzregel EN) temporäre TP. Zustände: blind, bezaubert, taub, verängstigt, gepackt, kampfunfähig, unsichtbar, gelähmt, versteinert, vergiftet, liegend, festgesetzt, betäubt, bewusstlos.",
		"rulesTextEnglish": "You create a magical zone that guards against deception in a 15-foot-radius sphere centered on a point of your choice within range. Until the spell ends, a creature that enters the spell’s area for the first time on a turn or starts its turn there must make a Charisma saving throw. On a failed save, a creature can’t speak a deliberate lie while in the radius.",
		"scalingTextEnglish": "",
		"attackTypesGerman": ["Fernkampfangriff", "Nahkampfangriff"],
		"savingThrowsGerman": [
			"Stärke",
			"Geschicklichkeit",
			"Konstitution",
			"Weisheit",
			"Charisma"
		],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": ["TP-Effekt (siehe Kurzregel EN)", "temporäre TP"],
		"conditionsGerman": [
			"blind",
			"bezaubert",
			"taub",
			"verängstigt",
			"gepackt",
			"kampfunfähig",
			"unsichtbar",
			"gelähmt",
			"versteinert",
			"vergiftet",
			"liegend",
			"festgesetzt",
			"betäubt",
			"bewusstlos"
		],
		"effectTagsGerman": [
			"Heilung/TP",
			"Schaden",
			"Beschwörung",
			"Licht",
			"Dunkelheit",
			"Unsichtbarkeit",
			"Illusion",
			"Waffenwirkung",
			"RK/Schutz",
			"Bewegung",
			"Wahrnehmung",
			"Kommunikation",
			"Kontrolle",
			"Erschaffung",
			"Verwandlung"
		],
		"source": "PHB 2014",
		"sourcePage": 266
	},
	{
		"id": "animate-dead",
		"sourceId": "animate_dead",
		"name": "Animate Dead",
		"level": 3,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": false,
		"castingTime": "1 minute",
		"range": "10 feet",
		"components": "V, S, M (a drop of blood, a piece of flesh, and a pinch of bone dust)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["cleric", "wizard"],
		"classLabelsGerman": ["Kleriker", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Kontrolle, Erschaffung. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "This spell creates an undead servant. Choose a pile of bones or a corpse of a Medium or Small humanoid within range. Your spell imbues the target with a foul mimicry of life, raising it as an undead creature.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 4th level or higher, you animate or reassert control over two additional undead creatures for each slot level above 3rd.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Kontrolle", "Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 193
	},
	{
		"id": "aura-of-vitality",
		"sourceId": "aura_of_vitality",
		"name": "Aura of Vitality",
		"level": 3,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self (30-foot radius)",
		"components": "V",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["paladin"],
		"classLabelsGerman": ["Paladin"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP. TP-Effekt (siehe Kurzregel EN) Heilung/TP: 2W6. Konzentration erforderlich.",
		"rulesTextEnglish": "Healing energy radiates from you in an aura with a 30-foot radius. Until the spell ends, the aura moves with you, centered on you. You can use a bonus action to cause one creature in the aura (including you) to regain 2d6 hit points.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": ["TP-Effekt (siehe Kurzregel EN)", "Heilung/TP: 2W6"],
		"conditionsGerman": [],
		"effectTagsGerman": ["Heilung/TP"],
		"source": "PHB 2014",
		"sourcePage": 197
	},
	{
		"id": "beacon-of-hope",
		"sourceId": "beacon_of_hope",
		"name": "Beacon of Hope",
		"level": 3,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["cleric"],
		"classLabelsGerman": ["Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP. Rettungswurf: Weisheit. TP-Effekt (siehe Kurzregel EN). Konzentration erforderlich.",
		"rulesTextEnglish": "This spell bestows hope and vitality. Choose any number of creatures within range. For the duration, each target has advantage on Wisdom saving throws and death saving throws, and regains the maximum number of hit points possible from any healing.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": [],
		"healingGerman": ["TP-Effekt (siehe Kurzregel EN)"],
		"conditionsGerman": [],
		"effectTagsGerman": ["Heilung/TP"],
		"source": "PHB 2014",
		"sourcePage": 198
	},
	{
		"id": "bestow-curse",
		"sourceId": "bestow_curse",
		"name": "Bestow Curse",
		"level": 3,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"bard",
			"cleric",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Weisheit. Schaden: 1W8 nekrotisch. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You touch a creature, and that creature must succeed on a Wisdom saving throw or become cursed for the duration of the spell. When you cast this spell, choose the nature of the curse from the following options: • Choose one ability score. While cursed, the target has disadvantage on ability checks and saving throws made with that ability score. • While cursed, the target has disadvantage on attack rolls against you. • While cursed, the target must make a Wisdom sav ing throw at the start of each of its turns.",
		"scalingTextEnglish": "If you cast this spell using a spell slot of 4th level or higher, the duration is concentration, up to 10 minutes. If you use a spell slot of 5th level or higher, the duration is 8 hours. If you use a spell slot of 7th level or higher, the duration is 24 hours.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": ["1W8 nekrotisch"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 199
	},
	{
		"id": "blinding-smite",
		"sourceId": "blinding_smite",
		"name": "Blinding Smite",
		"level": 3,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "Self",
		"components": "V",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["paladin"],
		"classLabelsGerman": ["Paladin"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht, Waffenwirkung. Angriff: Nahkampfangriff. Rettungswurf: Konstitution. Schaden: 3W8 gleißend. Zustände: blind. Konzentration erforderlich.",
		"rulesTextEnglish": "The next time you hit a creature with a melee weapon attack during this spell’s duration, your weapon flares with bright light, and the attack deals an extra 3d8 radiant damage to the target. Additionally, the target must succeed on a Constitution saving throw or be blinded until the spell ends. A creature blinded by this spell makes another Constitution saving throw at the end of each of its turns.",
		"scalingTextEnglish": "",
		"attackTypesGerman": ["Nahkampfangriff"],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": ["3W8 gleißend"],
		"healingGerman": [],
		"conditionsGerman": ["blind"],
		"effectTagsGerman": [
			"Schaden",
			"Licht",
			"Waffenwirkung"
		],
		"source": "PHB 2014",
		"sourcePage": 200
	},
	{
		"id": "blink",
		"sourceId": "blink",
		"name": "Blink",
		"level": 3,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S",
		"duration": "1 minute",
		"concentration": false,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Verwandlung.",
		"rulesTextEnglish": "Roll a d20 at the end of each of your turns for the duration of the spell. On a roll of 11 or higher, you vanish from your current plane of existence and appear in the Ethereal Plane (the spell fails and the casting is wasted if you were already on that plane). At the start of your next turn, and when the spell ends if you are on the Ethereal Plane, you return to an unoccupied space of your choice that you can see within 10 feet of the space you vanished from.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verwandlung"],
		"source": "PHB 2014",
		"sourcePage": 200
	},
	{
		"id": "call-lightning",
		"sourceId": "call_lightning",
		"name": "Call Lightning",
		"level": 3,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": ["druid"],
		"classLabelsGerman": ["Druide"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht, Kontrolle. Rettungswurf: Geschicklichkeit. Schaden: 3W10 Blitz. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A storm cloud appears in the shape of a cylinder that is 10 feet tall with a 60-foot radius, centered on a point you can see 100 feet directly above you. The spell fails if you can’t see a point in the air where the storm cloud could appear (for example, if you are in a room that can’t accommodate the cloud). When you cast the spell, choose a point you can see within range.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 4th or higher level, the damage increases by 1d10 for each slot level above 3rd.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": ["3W10 Blitz"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Schaden",
			"Licht",
			"Kontrolle"
		],
		"source": "PHB 2014",
		"sourcePage": 201
	},
	{
		"id": "clairvoyance",
		"sourceId": "clairvoyance",
		"name": "Clairvoyance",
		"level": 3,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": false,
		"castingTime": "10 minutes",
		"range": "1 mile",
		"components": "V, S, M (a focus worth at least 100 gp, either a jeweled horn for hearing or a glass eye for seeing)",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": [
			"bard",
			"cleric",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Unsichtbarkeit, Erschaffung. Zustände: unsichtbar. Konzentration erforderlich.",
		"rulesTextEnglish": "You create an invisible sensor within range in a location familiar to you (a place you have visited or seen before) or in an obvious location that is unfamiliar to you (such as behind a door, around a corner, or in a grove of trees). The sensor remains in place for the duration, and it can’t be attacked or otherwise interacted with. When you cast the spell, you choose seeing or hearing.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["unsichtbar"],
		"effectTagsGerman": ["Unsichtbarkeit", "Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 203
	},
	{
		"id": "conjure-animals",
		"sourceId": "conjure_animals",
		"name": "Conjure Animals",
		"level": 3,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": ["druid", "ranger"],
		"classLabelsGerman": ["Druide", "Waldläufer"],
		"mechanicsSummaryGerman": "Effekt: Beschwörung. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You summon fey spirits that take the form of beasts and appear in unoccupied spaces that you can see within range. Choose one of the following options for what appears: • One beast of challenge rating 2 or lower • Two beasts of challenge rating 1 or lower • Four beasts of challenge rating 1/2 or lower • Eight beasts of challenge rating 1/4 or lower Each beast is also considered fey, and it disappears when it drops to 0 hit points or when the spell ends. The summoned creatures are friendly to you and your companions.",
		"scalingTextEnglish": "When you cast this spell using certain higher-level spell slots, you choose one of the summoning options above, and more creatures appear: twice as many with a 5th-level slot, three times as many with a 7th-level slot, and four times as many with a 9th-level slot.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Beschwörung"],
		"source": "PHB 2014",
		"sourcePage": 206
	},
	{
		"id": "conjure-barrage",
		"sourceId": "conjure_barrage",
		"name": "Conjure Barrage",
		"level": 3,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self (60-foot cone)",
		"components": "V, S, M (one piece of ammunition or a thrown weapon)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["ranger"],
		"classLabelsGerman": ["Waldläufer"],
		"mechanicsSummaryGerman": "Effekt: Waffenwirkung, Erschaffung. Rettungswurf: Geschicklichkeit.",
		"rulesTextEnglish": "You throw a nonmagical weapon or fire a piece of nonmagical ammunition into the air to create a cone of identical weapons that shoot forward and then disappear. Each creature in a 60-foot cone must succeed on a Dexterity saving throw. A creature takes 3d8 damage on a failed save, or half as much damage on a successful one.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Waffenwirkung", "Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 206
	},
	{
		"id": "counterspell",
		"sourceId": "counterspell",
		"name": "Counterspell",
		"level": 3,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 reaction, which you take when you see a creature within 60 feet of you casting a spell",
		"range": "60 feet",
		"components": "S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Licht. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of 3rd level or lower, its spell fails and has no effect. If it is casting a spell of 4th level or higher, make an ability check using your spellcasting ability.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 4th level or higher, the interrupted spell has no effect if its level is less than or equal to the level of the spell slot you used.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Licht"],
		"source": "PHB 2014",
		"sourcePage": 209
	},
	{
		"id": "create-food-and-water",
		"sourceId": "create_food_and_water",
		"name": "Create Food and Water",
		"level": 3,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["cleric", "paladin"],
		"classLabelsGerman": ["Kleriker", "Paladin"],
		"mechanicsSummaryGerman": "Effekt: Erschaffung.",
		"rulesTextEnglish": "You create 45 pounds of food and 30 gallons of water on the ground or in containers within range, enough to sustain up to fifteen humanoids or five steeds for 24 hours. The food is bland but nourishing, and spoils if uneaten after 24 hours. The water is clean and doesn’t go bad.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 210
	},
	{
		"id": "crusader-s-mantle",
		"sourceId": "crusader_s_mantle",
		"name": "Crusader’s Mantle",
		"level": 3,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["paladin"],
		"classLabelsGerman": ["Paladin"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Waffenwirkung. Schaden: 1W4 gleißend. Konzentration erforderlich.",
		"rulesTextEnglish": "Holy power radiates from you in an aura with a 30-foot radius, awakening boldness in friendly creatures. Until the spell ends, the aura moves with you, centered on you. While in the aura, each nonhostile creature in the aura (including you) deals an extra 1d4 radiant damage when it hits with a weapon attack.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["1W4 gleißend"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Waffenwirkung"],
		"source": "PHB 2014",
		"sourcePage": 211
	},
	{
		"id": "daylight",
		"sourceId": "daylight",
		"name": "Daylight",
		"level": 3,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "60 feet",
		"components": "V, S",
		"duration": "1 hour",
		"concentration": false,
		"classIds": [
			"cleric",
			"druid",
			"paladin",
			"ranger",
			"sorcerer"
		],
		"classLabelsGerman": [
			"Kleriker",
			"Druide",
			"Paladin",
			"Waldläufer",
			"Zauberer"
		],
		"mechanicsSummaryGerman": "Effekt: Licht, Dunkelheit, Erschaffung.",
		"rulesTextEnglish": "A 60-foot-radius sphere of light spreads out from a point you choose within range. The sphere is bright light and sheds dim light for an additional 60 feet. If you chose a point on an object you are holding or one that isn’t being worn or carried, the light shines from the object and moves with it.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Licht",
			"Dunkelheit",
			"Erschaffung"
		],
		"source": "PHB 2014",
		"sourcePage": 211
	},
	{
		"id": "dispel-magic",
		"sourceId": "dispel_magic",
		"name": "Dispel Magic",
		"level": 3,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"bard",
			"cleric",
			"druid",
			"paladin",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Druide",
			"Paladin",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Bannmagie. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "Choose one creature, object, or magical effect within range. Any spell of 3rd level or lower on the target ends. For each spell of 4th level or higher on the target, make an ability check using your spellcasting ability.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 4th level or higher, you automatically end the effects of a spell on the target if the spell’s level is equal to or less than the level of the spell slot you used.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Bannmagie"],
		"source": "PHB 2014",
		"sourcePage": 214
	},
	{
		"id": "elemental-weapon",
		"sourceId": "elemental_weapon",
		"name": "Elemental Weapon",
		"level": 3,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": ["paladin"],
		"classLabelsGerman": ["Paladin"],
		"mechanicsSummaryGerman": "Effekt: Licht, Waffenwirkung. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A nonmagical weapon you touch becomes a magic weapon. Choose one of the following damage types: acid, cold, fire, lightning, or thunder. For the duration, the weapon has a +1 bonus to attack rolls and deals an extra 1d4 damage of the chosen type when it hits.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 5th or 6th level, the bonus to attack rolls increases to +2 and the extra damage increases to 2d4. When you use a spell slot of 7th level or higher, the bonus increases to +3 and the extra damage increases to 3d4.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Licht", "Waffenwirkung"],
		"source": "PHB 2014",
		"sourcePage": 217
	},
	{
		"id": "fear",
		"sourceId": "fear",
		"name": "Fear",
		"level": 3,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self (30-foot cone)",
		"components": "V, S, M (a white feather or the heart of a hen)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Illusion. Rettungswurf: Weisheit. Zustände: verängstigt. Konzentration erforderlich.",
		"rulesTextEnglish": "You project a phantasmal image of a creature’s worst fears. Each creature in a 30-foot cone must succeed on a Wisdom saving throw or drop whatever it is holding and become frightened for the duration. While frightened by this spell, a creature must take the Dash action and move away from you by the safest available route on each of its turns, unless there is nowhere to move.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["verängstigt"],
		"effectTagsGerman": ["Illusion"],
		"source": "PHB 2014",
		"sourcePage": 219
	},
	{
		"id": "feign-death",
		"sourceId": "feign_death",
		"name": "Feign Death",
		"level": 3,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": true,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (a pinch of graveyard dirt)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": [
			"bard",
			"cleric",
			"druid",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Druide",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Bewegung. Zustände: blind, kampfunfähig, vergiftet.",
		"rulesTextEnglish": "You touch a willing creature and put it into a cataleptic state that is indistinguishable from death. For the spell’s duration, or until you use an action to touch the target and dismiss the spell, the target appears dead to all outward inspection and to spells used to determine the target’s status. The target is blinded and incapacitated, and its speed drops to 0.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [
			"blind",
			"kampfunfähig",
			"vergiftet"
		],
		"effectTagsGerman": ["Bewegung"],
		"source": "PHB 2014",
		"sourcePage": 220
	},
	{
		"id": "fireball",
		"sourceId": "fireball",
		"name": "Fireball",
		"level": 3,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "150 feet",
		"components": "V, S, M (a tiny ball of bat guano and sulfur)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden. Rettungswurf: Geschicklichkeit. Schaden: 8W6 Feuer. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": ["8W6 Feuer"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 221
	},
	{
		"id": "fly",
		"sourceId": "fly",
		"name": "Fly",
		"level": 3,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (a wing feather from any bird)",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": [
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Bewegung. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You touch a willing creature. The target gains a flying speed of 60 feet for the duration. When the spell ends, the target falls if it is still aloft, unless it can stop the fall.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 4th level or higher, you can target one additional creature for each slot level above 3rd.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Bewegung"],
		"source": "PHB 2014",
		"sourcePage": 223
	},
	{
		"id": "gaseous-form",
		"sourceId": "gaseous_form",
		"name": "Gaseous Form",
		"level": 3,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (a bit of gauze and a wisp of smoke)",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": [
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Bewegung, Verwandlung. Rettungswurf: Konstitution. Zustände: kampfunfähig, betäubt. Konzentration erforderlich.",
		"rulesTextEnglish": "You transform a willing creature you touch, along with everything it’s wearing and carrying, into a misty cloud for the duration. The spell ends if the creature drops to 0 hit points. An incorporeal creature isn’t affected.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["kampfunfähig", "betäubt"],
		"effectTagsGerman": ["Bewegung", "Verwandlung"],
		"source": "PHB 2014",
		"sourcePage": 224
	},
	{
		"id": "glyph-of-warding",
		"sourceId": "glyph_of_warding",
		"name": "Glyph of Warding",
		"level": 3,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 hour",
		"range": "Touch",
		"components": "V, S, M (incense and powdered diamond worth at least 200 gp, which the spell consumes)",
		"duration": "Until dispelled or triggered",
		"concentration": false,
		"classIds": [
			"bard",
			"cleric",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Beschwörung, Licht, Unsichtbarkeit, Erschaffung. Rettungswurf: Geschicklichkeit. Zustände: unsichtbar. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "When you cast this spell, you inscribe a glyph that harms other creatures, either upon a surface (such as a table or a section of floor or wall) or within an object that can be closed (such as a book, a scroll, or a treasure chest) to conceal the glyph. If you choose a surface, the glyph can cover an area of the surface no larger than 10 feet in diameter. If you choose an object, that object must remain in its place; if the object is moved more than 10 feet from where you cast this spell, the glyph is broken, and the spell ends without being triggered.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 4th level or higher, the damage of an explosive runes glyph increases by 1d8 for each slot level above 3rd. If you create a spell glyph, you can store any spell of up to the same level as the slot you use for the glyph o f warding.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["unsichtbar"],
		"effectTagsGerman": [
			"Beschwörung",
			"Licht",
			"Unsichtbarkeit",
			"Erschaffung"
		],
		"source": "PHB 2014",
		"sourcePage": 225
	},
	{
		"id": "haste",
		"sourceId": "haste",
		"name": "Haste",
		"level": 3,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S, M (a shaving of licorice root)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Waffenwirkung, Bewegung. Rettungswurf: Geschicklichkeit. TP-Effekt (siehe Kurzregel EN). Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "Choose a willing creature that you can see within range. Until the spell ends, the target’s speed is doubled, it gains a +2 bonus to AC, it has advantage on Dexterity saving throws, and it gains an additional action on each of its turns. That action can be used only to take the Attack (one weapon attack only), Dash, Disengage, Hide, or Use an Object action.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 7th level or higher, the amount of healing increases by 10 for each slot level above 6th.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": [],
		"healingGerman": ["TP-Effekt (siehe Kurzregel EN)"],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Heilung/TP",
			"Waffenwirkung",
			"Bewegung"
		],
		"source": "PHB 2014",
		"sourcePage": 229
	},
	{
		"id": "hunger-of-hadar",
		"sourceId": "hunger_of_hadar",
		"name": "Hunger of Hadar",
		"level": 3,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "150 feet",
		"components": "V, S, M (a pickled octopus tentacle)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["warlock"],
		"classLabelsGerman": ["Hexenmeister"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht, Erschaffung. Rettungswurf: Geschicklichkeit. Schaden: 2W6 Kälte, 2W6 Säure. Zustände: blind. Konzentration erforderlich.",
		"rulesTextEnglish": "You open a gateway to the dark between the stars, a region infested with unknown horrors. A 20-foot-radius sphere of blackness and bitter cold appears, centered on a point with range and lasting for the duration. This void is filled with a cacophony of soft whispers and slurping noises that can be heard up to 30 feet away.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": ["2W6 Kälte", "2W6 Säure"],
		"healingGerman": [],
		"conditionsGerman": ["blind"],
		"effectTagsGerman": [
			"Schaden",
			"Licht",
			"Erschaffung"
		],
		"source": "PHB 2014",
		"sourcePage": 230
	},
	{
		"id": "hypnotic-pattern",
		"sourceId": "hypnotic_pattern",
		"name": "Hypnotic Pattern",
		"level": 3,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "S, M (a glowing stick of incense or a crystal vial filled with phosphorescent material)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Bewegung, Erschaffung. Rettungswurf: Weisheit. Zustände: bezaubert, kampfunfähig. Konzentration erforderlich.",
		"rulesTextEnglish": "You create a twisting pattern of colors that weaves through the air inside a 30-foot cube within range. The pattern appears for a moment and vanishes. Each creature in the area who sees the pattern must make a Wisdom saving throw.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["bezaubert", "kampfunfähig"],
		"effectTagsGerman": ["Bewegung", "Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 231
	},
	{
		"id": "leomund-s-tiny-hut",
		"sourceId": "leomund_s_tiny_hut",
		"name": "Leomund’s Tiny Hut",
		"level": 3,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": true,
		"castingTime": "1 minute",
		"range": "Self (10-foot-radius hemisphere)",
		"components": "V, S, M (a small crystal bead)",
		"duration": "8 hours",
		"concentration": false,
		"classIds": ["bard", "wizard"],
		"classLabelsGerman": ["Barde", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Hervorrufung.",
		"rulesTextEnglish": "A 10-foot-radius immobile dome of force springs into existence around and above you and remains stationary for the duration. The spell ends if you leave its area. Nine creatures of Medium size or smaller can fit inside the dome with you.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Hervorrufung"],
		"source": "PHB 2014",
		"sourcePage": 234
	},
	{
		"id": "lightning-arrow",
		"sourceId": "lightning_arrow",
		"name": "Lightning Arrow",
		"level": 3,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "Self",
		"components": "V, S",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["ranger"],
		"classLabelsGerman": ["Waldläufer"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht, Waffenwirkung, Verwandlung. Angriff: Fernkampfangriff. Rettungswurf: Geschicklichkeit. Schaden: 4W8 Blitz, 2W8 Blitz. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "The next time you make a ranged weapon attack during the spell’s duration, the weapon’s ammunition, or the weapon itself if it’s a thrown weapon, transforms into a bolt of lightning. Make the attack roll as normal. The target takes 4d8 lightning damage on a hit, or half as much damage on a miss, instead of the weapon’s normal damage.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 4th level or higher, the damage for both effects of the spell increases by 1d8 for each slot level above 3rd.",
		"attackTypesGerman": ["Fernkampfangriff"],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": ["4W8 Blitz", "2W8 Blitz"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": [
			"Schaden",
			"Licht",
			"Waffenwirkung",
			"Verwandlung"
		],
		"source": "PHB 2014",
		"sourcePage": 234
	},
	{
		"id": "lightning-bolt",
		"sourceId": "lightning_bolt",
		"name": "Lightning Bolt",
		"level": 3,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self (100-foot line)",
		"components": "V, S, M (a bit of fur and a rod of amber, crystal, or glass)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht. Rettungswurf: Geschicklichkeit. Schaden: 8W6 Blitz. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "A stroke of lightning forming a line 100 feet long and 5 feet wide blasts out from you in a direction you choose. Each creature in the line must make a Dexterity saving throw. A creature takes 8d6 lightning damage on a failed save, or half as much damage on a successful one.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit"],
		"damageGerman": ["8W6 Blitz"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Licht"],
		"source": "PHB 2014",
		"sourcePage": 234
	},
	{
		"id": "magic-circle",
		"sourceId": "magic_circle",
		"name": "Magic Circle",
		"level": 3,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 minute",
		"range": "10 feet",
		"components": "V, S, M (holy water or powdered silver and iron worth at least 100 gp, which the spell consumes)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": [
			"cleric",
			"paladin",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Kleriker",
			"Paladin",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Kontrolle, Erschaffung. Rettungswurf: Charisma. Zustände: bezaubert. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You create a 10-foot-radius, 20-foot-tall cylinder of magical energy centered on a point on the ground that you can see within range. Glowing runes appear wherever the cylinder intersects with the floor or other surface. Choose one or more of the following types of creatures: celestials, elementals, fey, fiends, or undead.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 4th level or higher, the duration increases by 1 hour for each slot level above 3rd. M agic Jar 6 th-level necromancy Casting Time: 1 minute Range: Self Components: V, S, M (a gem, crystal, reliquary, or some other ornamental container worth at least 500 gp) Duration: Until dispelled Your body falls into a catatonic state as your soul leaves it and enters the container you used for the spell’s material component.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Charisma"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["bezaubert"],
		"effectTagsGerman": ["Kontrolle", "Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 235
	},
	{
		"id": "major-image",
		"sourceId": "major_image",
		"name": "Major Image",
		"level": 3,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S, M (a bit of fleece)",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Illusion, Erschaffung. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 20-foot cube. The image appears at a spot that you can see within range and lasts for the duration. It seems completely real, including sounds, smells, and temperature appropriate to the thing depicted.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 6th level or higher, the spell lasts until dispelled, without requiring your concentration.",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Illusion", "Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 237
	},
	{
		"id": "mass-healing-word",
		"sourceId": "mass_healing_word",
		"name": "Mass Healing Word",
		"level": 3,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 bonus action",
		"range": "60 feet",
		"components": "V",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["cleric"],
		"classLabelsGerman": ["Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP. Rettungswurf: Weisheit. Heilung/TP: 1W4. Zustände: bezaubert. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "As you call out words of restoration, up to six creatures of your choice that you can see within range regain hit points equal to 1d4 + your spellcasting ability modifier. This spell has no effect on undead or constructs. At Higher Levels.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 4th level or higher, the healing increases by 1d4 for each slot level above 3rd. M ass Suggestion 6 th-level enchantment Casting Time: 1 action Range: 60 feet Components: V, M (a snake’s tongue and either a bit of honeycomb or a drop of sweet oil) Duration: 24 hours You suggest a course of activity (limited to a sentence or two) and magically influence up to twelve creatures of your choice that you can see within range and that can hear and understand you. Creatures that can’t be charmed are immune to this effect.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": [],
		"healingGerman": ["Heilung/TP: 1W4"],
		"conditionsGerman": ["bezaubert"],
		"effectTagsGerman": ["Heilung/TP"],
		"source": "PHB 2014",
		"sourcePage": 237
	},
	{
		"id": "meld-into-stone",
		"sourceId": "meld_into_stone",
		"name": "Meld into Stone",
		"level": 3,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": true,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S",
		"duration": "8 hours",
		"concentration": false,
		"classIds": ["cleric", "druid"],
		"classLabelsGerman": ["Kleriker", "Druide"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Wahrnehmung. Schaden: 6W6 Wucht. Zustände: liegend.",
		"rulesTextEnglish": "You step into a stone object or surface large enough to fully contain your body, melding yourself and all the equipment you carry with the stone for the duration. Using your movement, you step into the stone at a point you can touch. Nothing of your presence remains visible or otherwise detectable by nonmagical senses.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["6W6 Wucht"],
		"healingGerman": [],
		"conditionsGerman": ["liegend"],
		"effectTagsGerman": ["Schaden", "Wahrnehmung"],
		"source": "PHB 2014",
		"sourcePage": 238
	},
	{
		"id": "nondetection",
		"sourceId": "nondetection",
		"name": "Nondetection",
		"level": 3,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (a pinch of diamond dust worth 25 gp sprinkled over the target, which the spell consumes)",
		"duration": "8 hours",
		"concentration": false,
		"classIds": [
			"bard",
			"ranger",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Waldläufer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Bannmagie.",
		"rulesTextEnglish": "For the duration, you hide a target that you touch from divination magic. The target can be a willing creature or a place or an object no larger than 10 feet in any dimension. The target can’t be targeted by any divination magic or perceived through magical scrying sensors.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Bannmagie"],
		"source": "PHB 2014",
		"sourcePage": 242
	},
	{
		"id": "phantom-steed",
		"sourceId": "phantom_steed",
		"name": "Phantom Steed",
		"level": 3,
		"school": "illusion",
		"schoolLabelGerman": "Illusion",
		"ritual": true,
		"castingTime": "1 minute",
		"range": "30 feet",
		"components": "V, S",
		"duration": "1 hour",
		"concentration": false,
		"classIds": ["wizard"],
		"classLabelsGerman": ["Magier"],
		"mechanicsSummaryGerman": "Effekt: Bewegung, Erschaffung.",
		"rulesTextEnglish": "A Large quasi-real, horselike creature appears on the ground in an unoccupied space of your choice within range. You decide the creature’s appearance, but it is equipped with a saddle, bit, and bridle. Any of the equipment created by the spell vanishes in a puff of smoke if it is carried more than 10 feet away from the steed.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Bewegung", "Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 244
	},
	{
		"id": "plant-growth",
		"sourceId": "plant_growth",
		"name": "Plant Growth",
		"level": 3,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action or 8 hours",
		"range": "150 feet",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"bard",
			"druid",
			"ranger"
		],
		"classLabelsGerman": [
			"Barde",
			"Druide",
			"Waldläufer"
		],
		"mechanicsSummaryGerman": "Effekt: Verwandlung.",
		"rulesTextEnglish": "This spell channels vitality into plants within a specific area. There are two possible uses for the spell, granting either immediate or long-term benefits. If you cast this spell using 1 action, choose a point within range.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verwandlung"],
		"source": "PHB 2014",
		"sourcePage": 245
	},
	{
		"id": "protection-from-energy",
		"sourceId": "protection_from_energy",
		"name": "Protection from Energy",
		"level": 3,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S",
		"duration": "Concentration, up to 1 hour",
		"concentration": true,
		"classIds": [
			"cleric",
			"druid",
			"ranger",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Kleriker",
			"Druide",
			"Waldläufer",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Licht. Konzentration erforderlich.",
		"rulesTextEnglish": "For the duration, the willing creature you touch has resistance to one damage type of your choice: acid, cold, fire, lightning, or thunder.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Licht"],
		"source": "PHB 2014",
		"sourcePage": 248
	},
	{
		"id": "remove-curse",
		"sourceId": "remove_curse",
		"name": "Remove Curse",
		"level": 3,
		"school": "abjuration",
		"schoolLabelGerman": "Bannmagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": [
			"cleric",
			"paladin",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Kleriker",
			"Paladin",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Bannmagie.",
		"rulesTextEnglish": "At your touch, all curses affecting one creature or object end. If the object is a cursed magic item, its curse remains, but the spell breaks its owner’s attunement to the object so it can be removed or discarded.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Bannmagie"],
		"source": "PHB 2014",
		"sourcePage": 249
	},
	{
		"id": "revivify",
		"sourceId": "revivify",
		"name": "Revivify",
		"level": 3,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, S, M (diamonds worth 300 gp, which the spell consumes)",
		"duration": "Instantaneous",
		"concentration": false,
		"classIds": ["cleric", "paladin"],
		"classLabelsGerman": ["Kleriker", "Paladin"],
		"mechanicsSummaryGerman": "Effekt: Beschwörung.",
		"rulesTextEnglish": "You touch a creature that has died within the last minute. That creature returns to life with 1 hit point. This spell can’t return to life a creature that has died of old age, nor can it restore any missing body parts.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Beschwörung"],
		"source": "PHB 2014",
		"sourcePage": 250
	},
	{
		"id": "sending",
		"sourceId": "sending",
		"name": "Sending",
		"level": 3,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Unlimited",
		"components": "V, S, M (a short piece of fine copper wire)",
		"duration": "1 round",
		"concentration": false,
		"classIds": [
			"bard",
			"cleric",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Hervorrufung.",
		"rulesTextEnglish": "You send a short message of twenty-five words or less to a creature with which you are familiar. The creature hears the message in its mind, recognizes you as the sender if it knows you, and can answer in a like manner immediately. The spell enables creatures with Intelligence scores of at least 1 to understand the meaning of your message.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Hervorrufung"],
		"source": "PHB 2014",
		"sourcePage": 252
	},
	{
		"id": "sleet-storm",
		"sourceId": "sleet_storm",
		"name": "Sleet Storm",
		"level": 3,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "150 feet",
		"components": "V, S, M (a pinch of dust and a few drops of water)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"druid",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Druide",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Beschwörung. Rettungswurf: Geschicklichkeit, Konstitution. Zustände: liegend. Konzentration erforderlich.",
		"rulesTextEnglish": "Until the spell ends, freezing rain and sleet fall in a 20-foot-tall cylinder with a 40-foot radius centered on a point you choose within range. The area is heavily obscured, and exposed flames in the area are doused. The ground in the area is covered with slick ice, making it difficult terrain.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit", "Konstitution"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["liegend"],
		"effectTagsGerman": ["Beschwörung"],
		"source": "PHB 2014",
		"sourcePage": 254
	},
	{
		"id": "slow",
		"sourceId": "slow",
		"name": "Slow",
		"level": 3,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S, M (a drop of molasses)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["sorcerer", "wizard"],
		"classLabelsGerman": ["Zauberer", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Bewegung. Rettungswurf: Geschicklichkeit, Weisheit. Konzentration erforderlich.",
		"rulesTextEnglish": "You alter time around up to six creatures of your choice in a 40-foot cube within range. Each target must succeed on a Wisdom saving throw or be affected by this spell for the duration. An affected target’s speed is halved, it takes a -2 penalty to AC and Dexterity saving throws, and it can’t use reactions.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Geschicklichkeit", "Weisheit"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Bewegung"],
		"source": "PHB 2014",
		"sourcePage": 255
	},
	{
		"id": "speak-with-dead",
		"sourceId": "speak_with_dead",
		"name": "Speak with Dead",
		"level": 3,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "10 feet",
		"components": "V, S, M (burning incense)",
		"duration": "10 minutes",
		"concentration": false,
		"classIds": ["bard", "cleric"],
		"classLabelsGerman": ["Barde", "Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Nekromantie.",
		"rulesTextEnglish": "You grant the semblance of life and intelligence to a corpse of your choice within range, allowing it to answer the questions you pose. The corpse must still have a mouth and can’t be undead. The spell fails if the corpse was the target of this spell within the last 10 days.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Nekromantie"],
		"source": "PHB 2014",
		"sourcePage": 255
	},
	{
		"id": "speak-with-plants",
		"sourceId": "speak_with_plants",
		"name": "Speak with Plants",
		"level": 3,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self (30-foot radius)",
		"components": "V, S",
		"duration": "10 minutes",
		"concentration": false,
		"classIds": [
			"bard",
			"druid",
			"ranger"
		],
		"classLabelsGerman": [
			"Barde",
			"Druide",
			"Waldläufer"
		],
		"mechanicsSummaryGerman": "Effekt: Kommunikation, Erschaffung. Zustände: festgesetzt.",
		"rulesTextEnglish": "You imbue plants within 30 feet of you with limited sentience and animation, giving them the ability to communicate with you and follow your simple commands. You can question plants about events in the spell’s area within the past day, gaining information about creatures that have passed, weather, and other circumstances. You can also turn difficult terrain caused by plant growth (such as thickets and undergrowth) into ordinary terrain that lasts for the duration.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": ["festgesetzt"],
		"effectTagsGerman": ["Kommunikation", "Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 255
	},
	{
		"id": "spirit-guardians",
		"sourceId": "spirit_guardians",
		"name": "Spirit Guardians",
		"level": 3,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self (15-foot radius)",
		"components": "V, S, M (a holy symbol)",
		"duration": "Concentration, up to 10 minutes",
		"concentration": true,
		"classIds": ["cleric"],
		"classLabelsGerman": ["Kleriker"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Bewegung. Rettungswurf: Weisheit. Schaden: 3W8 gleißend, 3W8 nekrotisch. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "You call forth spirits to protect you. They flit around you to a distance of 15 feet for the duration. If you are good or neutral, their spectral form appears angelic or fey (your choice).",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d8 for each slot level above 3rd.",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Weisheit"],
		"damageGerman": ["3W8 gleißend", "3W8 nekrotisch"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Bewegung"],
		"source": "PHB 2014",
		"sourcePage": 256
	},
	{
		"id": "stinking-cloud",
		"sourceId": "stinking_cloud",
		"name": "Stinking Cloud",
		"level": 3,
		"school": "conjuration",
		"schoolLabelGerman": "Beschwörung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "90 feet",
		"components": "V, S, M (a rotten egg or several skunk cabbage leaves)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": [
			"bard",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Erschaffung. Rettungswurf: Konstitution. Konzentration erforderlich.",
		"rulesTextEnglish": "You create a 20-foot-radius sphere of yellow, nauseating gas centered on a point within range. The cloud spreads around corners, and its area is heavily obscured. The cloud lingers in the air for the duration.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Konstitution"],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erschaffung"],
		"source": "PHB 2014",
		"sourcePage": 256
	},
	{
		"id": "tongues",
		"sourceId": "tongues",
		"name": "Tongues",
		"level": 3,
		"school": "divination",
		"schoolLabelGerman": "Erkenntnismagie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Touch",
		"components": "V, M (a small clay model of a ziggurat)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": [
			"bard",
			"cleric",
			"sorcerer",
			"warlock",
			"wizard"
		],
		"classLabelsGerman": [
			"Barde",
			"Kleriker",
			"Zauberer",
			"Hexenmeister",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Erkenntnismagie.",
		"rulesTextEnglish": "This spell grants the creature you touch the ability to understand any spoken language it hears. Moreover, when the target speaks, any creature that knows at least one language and can hear the target understands what it says.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Erkenntnismagie"],
		"source": "PHB 2014",
		"sourcePage": 261
	},
	{
		"id": "vampiric-touch",
		"sourceId": "vampiric_touch",
		"name": "Vampiric Touch",
		"level": 3,
		"school": "necromancy",
		"schoolLabelGerman": "Nekromantie",
		"ritual": false,
		"castingTime": "1 action",
		"range": "Self",
		"components": "V, S",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["warlock", "wizard"],
		"classLabelsGerman": ["Hexenmeister", "Magier"],
		"mechanicsSummaryGerman": "Effekt: Heilung/TP, Schaden. Angriff: Nahkampf-Zauberangriff. Schaden: 3W6 nekrotisch. Heilung/TP: 3W6. Konzentration erforderlich. Hochstufung/Skalierung vorhanden; Details im Feld `scaling_en`.",
		"rulesTextEnglish": "The touch of your shadow-wreathed hand can siphon life force from others to heal your wounds. Make a melee spell attack against a creature within your reach. On a hit, the target takes 3d6 necrotic damage, and you regain hit points equal to half the amount of necrotic damage dealt.",
		"scalingTextEnglish": "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.",
		"attackTypesGerman": ["Nahkampf-Zauberangriff"],
		"savingThrowsGerman": [],
		"damageGerman": ["3W6 nekrotisch"],
		"healingGerman": ["Heilung/TP: 3W6"],
		"conditionsGerman": [],
		"effectTagsGerman": ["Heilung/TP", "Schaden"],
		"source": "PHB 2014",
		"sourcePage": 263
	},
	{
		"id": "water-breathing",
		"sourceId": "water_breathing",
		"name": "Water Breathing",
		"level": 3,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": true,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S, M (a short reed or piece of straw)",
		"duration": "24 hours",
		"concentration": false,
		"classIds": [
			"druid",
			"ranger",
			"sorcerer",
			"wizard"
		],
		"classLabelsGerman": [
			"Druide",
			"Waldläufer",
			"Zauberer",
			"Magier"
		],
		"mechanicsSummaryGerman": "Effekt: Verwandlung.",
		"rulesTextEnglish": "This spell grants up to ten willing creatures you can see within range the ability to breathe underwater until the spell ends. Affected creatures also retain their normal mode of respiration.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": [],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Verwandlung"],
		"source": "PHB 2014",
		"sourcePage": 264
	},
	{
		"id": "water-walk",
		"sourceId": "water_walk",
		"name": "Water Walk",
		"level": 3,
		"school": "transmutation",
		"schoolLabelGerman": "Verwandlung",
		"ritual": true,
		"castingTime": "1 action",
		"range": "30 feet",
		"components": "V, S, M (a piece of cork)",
		"duration": "1 hour",
		"concentration": false,
		"classIds": [
			"cleric",
			"druid",
			"ranger",
			"sorcerer"
		],
		"classLabelsGerman": [
			"Kleriker",
			"Druide",
			"Waldläufer",
			"Zauberer"
		],
		"mechanicsSummaryGerman": "Effekt: Schaden. Schaden: variabel (siehe Kurzregel EN).",
		"rulesTextEnglish": "This spell grants the ability to move across any liquid surface—such as water, acid, mud, snow, quicksand, or lava—as if it were harmless solid ground (creatures crossing molten lava can still take damage from the heat). Up to ten willing creatures you can see within range gain this ability for the duration. If you target a creature submerged in a liquid, the spell carries the target to the surface of the liquid at a rate of 60 feet per round.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": [],
		"damageGerman": ["variabel (siehe Kurzregel EN)"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden"],
		"source": "PHB 2014",
		"sourcePage": 264
	},
	{
		"id": "wind-wall",
		"sourceId": "wind_wall",
		"name": "Wind Wall",
		"level": 3,
		"school": "evocation",
		"schoolLabelGerman": "Hervorrufung",
		"ritual": false,
		"castingTime": "1 action",
		"range": "120 feet",
		"components": "V, S, M (a tiny fan and a feather of exotic origin)",
		"duration": "Concentration, up to 1 minute",
		"concentration": true,
		"classIds": ["druid", "ranger"],
		"classLabelsGerman": ["Druide", "Waldläufer"],
		"mechanicsSummaryGerman": "Effekt: Schaden, Licht. Rettungswurf: Stärke. Schaden: 3W8 Wucht. Konzentration erforderlich.",
		"rulesTextEnglish": "A wall of strong wind rises from the ground at a point you choose within range. You can make the wall up to 50 feet long, 15 feet high, and 1 foot thick. You can shape the wall in any way you choose so long as it makes one continuous path along the ground.",
		"scalingTextEnglish": "",
		"attackTypesGerman": [],
		"savingThrowsGerman": ["Stärke"],
		"damageGerman": ["3W8 Wucht"],
		"healingGerman": [],
		"conditionsGerman": [],
		"effectTagsGerman": ["Schaden", "Licht"],
		"source": "PHB 2014",
		"sourcePage": 265
	}
];
//#endregion
//#region src/compendium/spells/spells.ts
var verbalSomatic = {
	verbal: true,
	somatic: true,
	material: false
};
var verbalOnly = {
	verbal: true,
	somatic: false,
	material: false
};
var curatedSpells = [
	{
		id: "acid-splash",
		name: "Säurespritzer",
		level: 0,
		school: "conjuration",
		castingTime: "1 Aktion",
		range: "18 m",
		components: verbalSomatic,
		duration: "Sofort",
		concentration: false,
		ritual: false,
		description: "Du schleuderst eine Blase aus Säure auf ein Ziel. Das Ziel führt einen Geschicklichkeitsrettungswurf aus und erleidet bei einem Fehlschlag Säureschaden.",
		damage: {
			dice: {
				dice: 1,
				die: 6
			},
			damageType: "acid",
			savingThrowAbility: "dexterity"
		},
		scaling: [
			{
				characterLevel: 5,
				dice: {
					dice: 2,
					die: 6
				}
			},
			{
				characterLevel: 11,
				dice: {
					dice: 3,
					die: 6
				}
			},
			{
				characterLevel: 17,
				dice: {
					dice: 4,
					die: 6
				}
			}
		],
		classIds: ["sorcerer", "wizard"]
	},
	{
		id: "chill-touch",
		name: "Kalte Hand",
		level: 0,
		school: "necromancy",
		castingTime: "1 Aktion",
		range: "36 m",
		components: verbalSomatic,
		duration: "1 Runde",
		concentration: false,
		ritual: false,
		description: "Eine geisterhafte Hand greift ein Ziel an. Bei einem Treffer erleidet es nekrotischen Schaden und kann bis zum Beginn deines nächsten Zuges keine Trefferpunkte zurückerhalten.",
		damage: {
			dice: {
				dice: 1,
				die: 8
			},
			damageType: "necrotic"
		},
		scaling: [
			{
				characterLevel: 5,
				dice: {
					dice: 2,
					die: 8
				}
			},
			{
				characterLevel: 11,
				dice: {
					dice: 3,
					die: 8
				}
			},
			{
				characterLevel: 17,
				dice: {
					dice: 4,
					die: 8
				}
			}
		],
		classIds: [
			"sorcerer",
			"warlock",
			"wizard"
		]
	},
	{
		id: "eldritch-blast",
		name: "Schauriger Strahl",
		level: 0,
		school: "evocation",
		castingTime: "1 Aktion",
		range: "36 m",
		components: verbalSomatic,
		duration: "Sofort",
		concentration: false,
		ritual: false,
		description: "Ein Strahl knisternder Energie schießt auf eine Kreatur. Führe einen Fernkampf-Zauberangriff aus.",
		damage: {
			dice: {
				dice: 1,
				die: 10
			},
			damageType: "force"
		},
		scaling: [
			{
				characterLevel: 5,
				dice: {
					dice: 2,
					die: 10
				}
			},
			{
				characterLevel: 11,
				dice: {
					dice: 3,
					die: 10
				}
			},
			{
				characterLevel: 17,
				dice: {
					dice: 4,
					die: 10
				}
			}
		],
		classIds: ["warlock"]
	},
	{
		id: "fire-bolt",
		name: "Feuerpfeil",
		level: 0,
		school: "evocation",
		castingTime: "1 Aktion",
		range: "36 m",
		components: verbalSomatic,
		duration: "Sofort",
		concentration: false,
		ritual: false,
		description: "Du schleuderst einen Funken aus Feuer. Führe einen Fernkampf-Zauberangriff aus.",
		damage: {
			dice: {
				dice: 1,
				die: 10
			},
			damageType: "fire"
		},
		scaling: [
			{
				characterLevel: 5,
				dice: {
					dice: 2,
					die: 10
				}
			},
			{
				characterLevel: 11,
				dice: {
					dice: 3,
					die: 10
				}
			},
			{
				characterLevel: 17,
				dice: {
					dice: 4,
					die: 10
				}
			}
		],
		classIds: ["sorcerer", "wizard"]
	},
	{
		id: "guidance",
		name: "Führung",
		level: 0,
		school: "divination",
		castingTime: "1 Aktion",
		range: "Berührung",
		components: verbalSomatic,
		duration: "Konzentration, bis zu 1 Minute",
		concentration: true,
		ritual: false,
		description: "Das berührte Ziel kann einmal 1W4 auf eine Attributsprobe addieren.",
		classIds: ["cleric", "druid"]
	},
	{
		id: "light",
		name: "Licht",
		level: 0,
		school: "evocation",
		castingTime: "1 Aktion",
		range: "Berührung",
		components: {
			verbal: true,
			somatic: false,
			material: true,
			materialDescription: "Ein Glühwürmchen oder phosphoreszierendes Moos"
		},
		duration: "1 Stunde",
		concentration: false,
		ritual: false,
		description: "Ein berührter Gegenstand spendet helles und dämmriges Licht.",
		classIds: [
			"bard",
			"cleric",
			"sorcerer",
			"wizard"
		]
	},
	{
		id: "mage-hand",
		name: "Magierhand",
		level: 0,
		school: "conjuration",
		castingTime: "1 Aktion",
		range: "9 m",
		components: verbalSomatic,
		duration: "1 Minute",
		concentration: false,
		ritual: false,
		description: "Eine schwebende geisterhafte Hand erscheint und kann einfache Gegenstände bewegen oder bedienen.",
		classIds: [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		]
	},
	{
		id: "minor-illusion",
		name: "Einfache Illusion",
		level: 0,
		school: "illusion",
		castingTime: "1 Aktion",
		range: "9 m",
		components: {
			verbal: false,
			somatic: true,
			material: true,
			materialDescription: "Ein Stück Vlies"
		},
		duration: "1 Minute",
		concentration: false,
		ritual: false,
		description: "Du erschaffst ein Geräusch oder ein unbewegliches Bild eines Gegenstands.",
		classIds: [
			"bard",
			"sorcerer",
			"warlock",
			"wizard"
		]
	},
	{
		id: "poison-spray",
		name: "Gift versprühen",
		level: 0,
		school: "conjuration",
		castingTime: "1 Aktion",
		range: "3 m",
		components: verbalSomatic,
		duration: "Sofort",
		concentration: false,
		ritual: false,
		description: "Du erzeugst eine Wolke aus giftigem Gas. Das Ziel führt einen Konstitutionsrettungswurf aus.",
		damage: {
			dice: {
				dice: 1,
				die: 12
			},
			damageType: "poison",
			savingThrowAbility: "constitution"
		},
		scaling: [
			{
				characterLevel: 5,
				dice: {
					dice: 2,
					die: 12
				}
			},
			{
				characterLevel: 11,
				dice: {
					dice: 3,
					die: 12
				}
			},
			{
				characterLevel: 17,
				dice: {
					dice: 4,
					die: 12
				}
			}
		],
		classIds: [
			"druid",
			"sorcerer",
			"warlock",
			"wizard"
		]
	},
	{
		id: "produce-flame",
		name: "Flammen erzeugen",
		level: 0,
		school: "conjuration",
		castingTime: "1 Aktion",
		range: "Selbst",
		components: verbalSomatic,
		duration: "10 Minuten",
		concentration: false,
		ritual: false,
		description: "Eine Flamme erscheint in deiner Hand. Du kannst sie als Lichtquelle verwenden oder auf ein Ziel schleudern.",
		damage: {
			dice: {
				dice: 1,
				die: 8
			},
			damageType: "fire"
		},
		scaling: [
			{
				characterLevel: 5,
				dice: {
					dice: 2,
					die: 8
				}
			},
			{
				characterLevel: 11,
				dice: {
					dice: 3,
					die: 8
				}
			},
			{
				characterLevel: 17,
				dice: {
					dice: 4,
					die: 8
				}
			}
		],
		classIds: ["druid"]
	},
	{
		id: "ray-of-frost",
		name: "Kältestrahl",
		level: 0,
		school: "evocation",
		castingTime: "1 Aktion",
		range: "18 m",
		components: verbalSomatic,
		duration: "Sofort",
		concentration: false,
		ritual: false,
		description: "Ein eisiger Strahl verursacht Kälteschaden und reduziert die Bewegung des Ziels bis zum Beginn deines nächsten Zuges.",
		damage: {
			dice: {
				dice: 1,
				die: 8
			},
			damageType: "cold"
		},
		scaling: [
			{
				characterLevel: 5,
				dice: {
					dice: 2,
					die: 8
				}
			},
			{
				characterLevel: 11,
				dice: {
					dice: 3,
					die: 8
				}
			},
			{
				characterLevel: 17,
				dice: {
					dice: 4,
					die: 8
				}
			}
		],
		classIds: ["sorcerer", "wizard"]
	},
	{
		id: "sacred-flame",
		name: "Heilige Flamme",
		level: 0,
		school: "evocation",
		castingTime: "1 Aktion",
		range: "18 m",
		components: verbalSomatic,
		duration: "Sofort",
		concentration: false,
		ritual: false,
		description: "Strahlendes Feuer fährt auf ein Ziel herab. Das Ziel führt einen Geschicklichkeitsrettungswurf aus.",
		damage: {
			dice: {
				dice: 1,
				die: 8
			},
			damageType: "radiant",
			savingThrowAbility: "dexterity"
		},
		scaling: [
			{
				characterLevel: 5,
				dice: {
					dice: 2,
					die: 8
				}
			},
			{
				characterLevel: 11,
				dice: {
					dice: 3,
					die: 8
				}
			},
			{
				characterLevel: 17,
				dice: {
					dice: 4,
					die: 8
				}
			}
		],
		classIds: ["cleric"]
	},
	{
		id: "shillelagh",
		name: "Shillelagh",
		level: 0,
		school: "transmutation",
		castingTime: "1 Bonusaktion",
		range: "Berührung",
		components: {
			verbal: true,
			somatic: true,
			material: true,
			materialDescription: "Mistelzweig, Kleeblatt und Kampfstab oder Knüppel"
		},
		duration: "1 Minute",
		concentration: false,
		ritual: false,
		description: "Ein Kampfstab oder Knüppel wird magisch. Du kannst Weisheit für Angriff und Schaden verwenden.",
		classIds: ["druid"]
	},
	{
		id: "spare-the-dying",
		name: "Verschonung der Sterbenden",
		level: 0,
		school: "necromancy",
		castingTime: "1 Aktion",
		range: "Berührung",
		components: verbalSomatic,
		duration: "Sofort",
		concentration: false,
		ritual: false,
		description: "Du stabilisierst eine lebende Kreatur mit 0 Trefferpunkten.",
		classIds: ["cleric"]
	},
	{
		id: "thaumaturgy",
		name: "Thaumaturgie",
		level: 0,
		school: "transmutation",
		castingTime: "1 Aktion",
		range: "9 m",
		components: verbalOnly,
		duration: "Bis zu 1 Minute",
		concentration: false,
		ritual: false,
		description: "Du erzeugst eine kleine übernatürliche Manifestation, beispielsweise eine verstärkte Stimme oder flackernde Flammen.",
		classIds: ["cleric"]
	},
	{
		id: "vicious-mockery",
		name: "Bösartiger Spott",
		level: 0,
		school: "enchantment",
		castingTime: "1 Aktion",
		range: "18 m",
		components: verbalOnly,
		duration: "Sofort",
		concentration: false,
		ritual: false,
		description: "Du überschüttest ein Ziel mit magisch verstärktem Spott. Es führt einen Weisheitsrettungswurf aus.",
		damage: {
			dice: {
				dice: 1,
				die: 4
			},
			damageType: "psychic",
			savingThrowAbility: "wisdom"
		},
		scaling: [
			{
				characterLevel: 5,
				dice: {
					dice: 2,
					die: 4
				}
			},
			{
				characterLevel: 11,
				dice: {
					dice: 3,
					die: 4
				}
			},
			{
				characterLevel: 17,
				dice: {
					dice: 4,
					die: 4
				}
			}
		],
		classIds: ["bard"]
	},
	{
		id: "bane",
		name: "Verderben",
		level: 1,
		school: "enchantment",
		castingTime: "1 Aktion",
		range: "9 m",
		components: {
			verbal: true,
			somatic: true,
			material: true,
			materialDescription: "Ein Tropfen Blut"
		},
		duration: "Konzentration, bis zu 1 Minute",
		concentration: true,
		ritual: false,
		description: "Bis zu drei Kreaturen müssen Charismarettungswürfe bestehen. Betroffene Ziele ziehen 1W4 von Angriffs- und Rettungswürfen ab.",
		higherLevels: "Für jeden höheren Zauberplatz kann ein zusätzliches Ziel betroffen werden.",
		classIds: ["bard", "cleric"]
	},
	{
		id: "bless",
		name: "Segnen",
		level: 1,
		school: "enchantment",
		castingTime: "1 Aktion",
		range: "9 m",
		components: {
			verbal: true,
			somatic: true,
			material: true,
			materialDescription: "Ein Spritzer Weihwasser"
		},
		duration: "Konzentration, bis zu 1 Minute",
		concentration: true,
		ritual: false,
		description: "Bis zu drei Kreaturen addieren 1W4 auf Angriffs- und Rettungswürfe.",
		higherLevels: "Für jeden höheren Zauberplatz kann ein zusätzliches Ziel betroffen werden.",
		classIds: ["cleric", "paladin"]
	},
	{
		id: "burning-hands",
		name: "Brennende Hände",
		level: 1,
		school: "evocation",
		castingTime: "1 Aktion",
		range: "Selbst, Kegel von 4,5 m",
		components: verbalSomatic,
		duration: "Sofort",
		concentration: false,
		ritual: false,
		description: "Flammen schießen aus deinen Händen. Kreaturen im Bereich führen Geschicklichkeitsrettungswürfe aus.",
		damage: {
			dice: {
				dice: 3,
				die: 6
			},
			damageType: "fire",
			savingThrowAbility: "dexterity",
			halfDamageOnSave: true
		},
		higherLevels: "Der Schaden steigt für jeden höheren Zauberplatz um 1W6.",
		classIds: ["sorcerer", "wizard"]
	},
	{
		id: "charm-person",
		name: "Person bezaubern",
		level: 1,
		school: "enchantment",
		castingTime: "1 Aktion",
		range: "9 m",
		components: verbalSomatic,
		duration: "1 Stunde",
		concentration: false,
		ritual: false,
		description: "Ein Humanoider führt einen Weisheitsrettungswurf aus. Bei einem Fehlschlag ist er von dir bezaubert.",
		higherLevels: "Für jeden höheren Zauberplatz kann ein zusätzliches Ziel betroffen werden.",
		classIds: [
			"bard",
			"druid",
			"sorcerer",
			"warlock",
			"wizard"
		]
	},
	{
		id: "command",
		name: "Befehl",
		level: 1,
		school: "enchantment",
		castingTime: "1 Aktion",
		range: "18 m",
		components: verbalOnly,
		duration: "1 Runde",
		concentration: false,
		ritual: false,
		description: "Du sprichst einen einwortigen Befehl. Das Ziel führt einen Weisheitsrettungswurf aus.",
		higherLevels: "Für jeden höheren Zauberplatz kann ein zusätzliches Ziel betroffen werden.",
		classIds: ["cleric", "paladin"]
	},
	{
		id: "cure-wounds",
		name: "Wunden heilen",
		level: 1,
		school: "evocation",
		castingTime: "1 Aktion",
		range: "Berührung",
		components: verbalSomatic,
		duration: "Sofort",
		concentration: false,
		ritual: false,
		description: "Eine berührte Kreatur erhält Trefferpunkte zurück.",
		healing: { dice: {
			dice: 1,
			die: 8
		} },
		higherLevels: "Die Heilung steigt für jeden höheren Zauberplatz um 1W8.",
		classIds: [
			"bard",
			"cleric",
			"druid",
			"paladin",
			"ranger"
		]
	},
	{
		id: "detect-magic",
		name: "Magie entdecken",
		level: 1,
		school: "divination",
		castingTime: "1 Aktion",
		range: "Selbst",
		components: verbalSomatic,
		duration: "Konzentration, bis zu 10 Minuten",
		concentration: true,
		ritual: true,
		description: "Du spürst Magie in einem Umkreis von 9 Metern und kannst ihre Schule erkennen.",
		classIds: [
			"bard",
			"cleric",
			"druid",
			"paladin",
			"ranger",
			"sorcerer",
			"wizard"
		]
	},
	{
		id: "disguise-self",
		name: "Selbstverkleidung",
		level: 1,
		school: "illusion",
		castingTime: "1 Aktion",
		range: "Selbst",
		components: verbalSomatic,
		duration: "1 Stunde",
		concentration: false,
		ritual: false,
		description: "Du veränderst das Aussehen deiner Person und deiner getragenen Ausrüstung.",
		classIds: [
			"bard",
			"sorcerer",
			"wizard"
		]
	},
	{
		id: "entangle",
		name: "Verstricken",
		level: 1,
		school: "conjuration",
		castingTime: "1 Aktion",
		range: "27 m",
		components: verbalSomatic,
		duration: "Konzentration, bis zu 1 Minute",
		concentration: true,
		ritual: false,
		description: "Ranken wachsen in einem Bereich. Kreaturen können durch einen Stärkerettungswurf festgesetzt werden.",
		classIds: ["druid"]
	},
	{
		id: "faerie-fire",
		name: "Feenfeuer",
		level: 1,
		school: "evocation",
		castingTime: "1 Aktion",
		range: "18 m",
		components: verbalOnly,
		duration: "Konzentration, bis zu 1 Minute",
		concentration: true,
		ritual: false,
		description: "Kreaturen und Gegenstände in einem Würfel werden von Licht umgeben. Angriffe gegen betroffene Ziele können Vorteil erhalten.",
		classIds: ["bard", "druid"]
	},
	{
		id: "false-life",
		name: "Falsches Leben",
		level: 1,
		school: "necromancy",
		castingTime: "1 Aktion",
		range: "Selbst",
		components: {
			verbal: true,
			somatic: true,
			material: true,
			materialDescription: "Eine kleine Menge Alkohol oder destillierter Geist"
		},
		duration: "1 Stunde",
		concentration: false,
		ritual: false,
		description: "Du erhältst 1W4 + 4 temporäre Trefferpunkte.",
		classIds: ["sorcerer", "wizard"]
	},
	{
		id: "find-familiar",
		name: "Vertrauten finden",
		level: 1,
		school: "conjuration",
		castingTime: "1 Stunde",
		range: "3 m",
		components: {
			verbal: true,
			somatic: true,
			material: true,
			materialDescription: "Kohle, Weihrauch und Kräuter im Wert von 10 GM"
		},
		duration: "Sofort",
		concentration: false,
		ritual: true,
		description: "Du beschwörst einen tierischen Geist, der die Gestalt eines vertrauten Wesens annimmt.",
		classIds: ["wizard"]
	},
	{
		id: "fog-cloud",
		name: "Nebelwolke",
		level: 1,
		school: "conjuration",
		castingTime: "1 Aktion",
		range: "36 m",
		components: verbalSomatic,
		duration: "Konzentration, bis zu 1 Stunde",
		concentration: true,
		ritual: false,
		description: "Eine stark verschleiernde Nebelwolke entsteht.",
		higherLevels: "Der Radius steigt für jeden höheren Zauberplatz.",
		classIds: [
			"druid",
			"ranger",
			"sorcerer",
			"wizard"
		]
	},
	{
		id: "goodberry",
		name: "Gute Beeren",
		level: 1,
		school: "transmutation",
		castingTime: "1 Aktion",
		range: "Berührung",
		components: {
			verbal: true,
			somatic: true,
			material: true,
			materialDescription: "Ein Mistelzweig"
		},
		duration: "24 Stunden",
		concentration: false,
		ritual: false,
		description: "Bis zu zehn magische Beeren erscheinen. Jede Beere stellt 1 Trefferpunkt wieder her und nährt eine Kreatur.",
		classIds: ["druid", "ranger"]
	},
	{
		id: "guiding-bolt",
		name: "Lenkendes Geschoss",
		level: 1,
		school: "evocation",
		castingTime: "1 Aktion",
		range: "36 m",
		components: verbalSomatic,
		duration: "1 Runde",
		concentration: false,
		ritual: false,
		description: "Ein Lichtblitz trifft ein Ziel. Führe einen Fernkampf-Zauberangriff aus.",
		damage: {
			dice: {
				dice: 4,
				die: 6
			},
			damageType: "radiant"
		},
		higherLevels: "Der Schaden steigt für jeden höheren Zauberplatz um 1W6.",
		classIds: ["cleric"]
	},
	{
		id: "healing-word",
		name: "Heilendes Wort",
		level: 1,
		school: "evocation",
		castingTime: "1 Bonusaktion",
		range: "18 m",
		components: verbalOnly,
		duration: "Sofort",
		concentration: false,
		ritual: false,
		description: "Eine Kreatur in Reichweite erhält Trefferpunkte zurück.",
		healing: { dice: {
			dice: 1,
			die: 4
		} },
		higherLevels: "Die Heilung steigt für jeden höheren Zauberplatz um 1W4.",
		classIds: [
			"bard",
			"cleric",
			"druid"
		]
	},
	{
		id: "hellish-rebuke",
		name: "Höllischer Tadel",
		level: 1,
		school: "evocation",
		castingTime: "1 Reaktion",
		range: "18 m",
		components: verbalSomatic,
		duration: "Sofort",
		concentration: false,
		ritual: false,
		description: "Als Reaktion auf erlittenen Schaden lässt du Flammen um den Angreifer auflodern.",
		damage: {
			dice: {
				dice: 2,
				die: 10
			},
			damageType: "fire",
			savingThrowAbility: "dexterity",
			halfDamageOnSave: true
		},
		higherLevels: "Der Schaden steigt für jeden höheren Zauberplatz um 1W10.",
		classIds: ["warlock"]
	},
	{
		id: "heroism",
		name: "Heldenmut",
		level: 1,
		school: "enchantment",
		castingTime: "1 Aktion",
		range: "Berührung",
		components: verbalSomatic,
		duration: "Konzentration, bis zu 1 Minute",
		concentration: true,
		ritual: false,
		description: "Eine Kreatur wird immun gegen den Zustand Verängstigt und erhält in jedem Zug temporäre Trefferpunkte.",
		classIds: ["bard", "paladin"]
	},
	{
		id: "hex",
		name: "Verhexen",
		level: 1,
		school: "enchantment",
		castingTime: "1 Bonusaktion",
		range: "27 m",
		components: {
			verbal: true,
			somatic: true,
			material: true,
			materialDescription: "Das versteinerte Auge eines Molchs"
		},
		duration: "Konzentration, bis zu 1 Stunde",
		concentration: true,
		ritual: false,
		description: "Du verfluchst ein Ziel. Deine Treffer verursachen zusätzlich 1W6 nekrotischen Schaden.",
		classIds: ["warlock"]
	},
	{
		id: "hunters-mark",
		name: "Mal des Jägers",
		level: 1,
		school: "divination",
		castingTime: "1 Bonusaktion",
		range: "27 m",
		components: verbalOnly,
		duration: "Konzentration, bis zu 1 Stunde",
		concentration: true,
		ritual: false,
		description: "Du markierst ein Ziel. Deine Waffentreffer verursachen zusätzlich 1W6 Schaden.",
		classIds: ["ranger"]
	},
	{
		id: "mage-armor",
		name: "Magierrüstung",
		level: 1,
		school: "abjuration",
		castingTime: "1 Aktion",
		range: "Berührung",
		components: {
			verbal: true,
			somatic: true,
			material: true,
			materialDescription: "Ein Stück gehärtetes Leder"
		},
		duration: "8 Stunden",
		concentration: false,
		ritual: false,
		description: "Die Rüstungsklasse eines ungerüsteten Ziels beträgt 13 plus Geschicklichkeitsmodifikator.",
		classIds: ["sorcerer", "wizard"]
	},
	{
		id: "magic-missile",
		name: "Magisches Geschoss",
		level: 1,
		school: "evocation",
		castingTime: "1 Aktion",
		range: "36 m",
		components: verbalSomatic,
		duration: "Sofort",
		concentration: false,
		ritual: false,
		description: "Drei magische Geschosse treffen automatisch und verursachen jeweils 1W4 + 1 Energieschaden.",
		damage: {
			dice: {
				dice: 1,
				die: 4
			},
			damageType: "force"
		},
		higherLevels: "Für jeden höheren Zauberplatz entsteht ein zusätzliches Geschoss.",
		classIds: ["sorcerer", "wizard"]
	},
	{
		id: "protection-from-evil-and-good",
		name: "Schutz vor Gut und Böse",
		level: 1,
		school: "abjuration",
		castingTime: "1 Aktion",
		range: "Berührung",
		components: {
			verbal: true,
			somatic: true,
			material: true,
			materialDescription: "Weihwasser oder pulverisiertes Silber und Eisen"
		},
		duration: "Konzentration, bis zu 10 Minuten",
		concentration: true,
		ritual: false,
		description: "Das Ziel wird gegen bestimmte übernatürliche Kreaturentypen geschützt.",
		classIds: [
			"cleric",
			"paladin",
			"warlock",
			"wizard"
		]
	},
	{
		id: "shield",
		name: "Schild",
		level: 1,
		school: "abjuration",
		castingTime: "1 Reaktion",
		range: "Selbst",
		components: verbalSomatic,
		duration: "1 Runde",
		concentration: false,
		ritual: false,
		description: "Eine unsichtbare Barriere gewährt bis zum Beginn deines nächsten Zuges +5 auf die Rüstungsklasse.",
		classIds: ["sorcerer", "wizard"]
	},
	{
		id: "shield-of-faith",
		name: "Schild des Glaubens",
		level: 1,
		school: "abjuration",
		castingTime: "1 Bonusaktion",
		range: "18 m",
		components: {
			verbal: true,
			somatic: true,
			material: true,
			materialDescription: "Ein kleines Pergament mit heiligem Text"
		},
		duration: "Konzentration, bis zu 10 Minuten",
		concentration: true,
		ritual: false,
		description: "Ein Ziel erhält für die Dauer +2 auf die Rüstungsklasse.",
		classIds: ["cleric", "paladin"]
	},
	{
		id: "sleep",
		name: "Schlaf",
		level: 1,
		school: "enchantment",
		castingTime: "1 Aktion",
		range: "27 m",
		components: {
			verbal: true,
			somatic: true,
			material: true,
			materialDescription: "Sand, Rosenblüten oder eine Grille"
		},
		duration: "1 Minute",
		concentration: false,
		ritual: false,
		description: "Kreaturen in einem Bereich fallen abhängig von ihren Trefferpunkten in magischen Schlaf.",
		classIds: [
			"bard",
			"sorcerer",
			"wizard"
		]
	},
	{
		id: "speak-with-animals",
		name: "Mit Tieren sprechen",
		level: 1,
		school: "divination",
		castingTime: "1 Aktion",
		range: "Selbst",
		components: verbalSomatic,
		duration: "10 Minuten",
		concentration: false,
		ritual: true,
		description: "Du kannst Tiere verstehen und verbal mit ihnen kommunizieren.",
		classIds: [
			"bard",
			"druid",
			"ranger"
		]
	},
	{
		id: "thunderwave",
		name: "Donnerwoge",
		level: 1,
		school: "evocation",
		castingTime: "1 Aktion",
		range: "Selbst, Würfel von 4,5 m",
		components: verbalSomatic,
		duration: "Sofort",
		concentration: false,
		ritual: false,
		description: "Eine Welle aus Donnerkraft trifft Kreaturen in einem Bereich.",
		damage: {
			dice: {
				dice: 2,
				die: 8
			},
			damageType: "thunder",
			savingThrowAbility: "constitution",
			halfDamageOnSave: true
		},
		higherLevels: "Der Schaden steigt für jeden höheren Zauberplatz um 1W8.",
		classIds: [
			"bard",
			"druid",
			"sorcerer",
			"wizard"
		]
	}
];
function parseSourceComponents(value) {
	const normalized = value.toUpperCase();
	const materialMatch = value.match(/M\s*\((.+)\)/i);
	return {
		verbal: /(^|[,\s])V([,\s]|$)/.test(normalized),
		somatic: /(^|[,\s])S([,\s]|$)/.test(normalized),
		material: /(^|[,\s])M([,\s(]|$)/.test(normalized),
		materialDescription: materialMatch?.[1]
	};
}
var sourceRuleById = new Map(sourceSpellRulesLevel0To3.map((spell) => [spell.id, spell]));
var enrichedCuratedSpells = curatedSpells.map((spell) => {
	const sourceRule = sourceRuleById.get(spell.id);
	if (!sourceRule) return spell;
	return {
		...spell,
		mechanicsSummary: sourceRule.mechanicsSummaryGerman,
		rulesText: sourceRule.rulesTextEnglish,
		attackTypes: [...sourceRule.attackTypesGerman],
		savingThrows: [...sourceRule.savingThrowsGerman],
		damageText: [...sourceRule.damageGerman],
		healingText: [...sourceRule.healingGerman],
		conditions: [...sourceRule.conditionsGerman],
		effectTags: [...sourceRule.effectTagsGerman],
		sourceLabel: sourceRule.source,
		sourcePage: sourceRule.sourcePage,
		higherLevels: spell.higherLevels || sourceRule.scalingTextEnglish || void 0
	};
});
var curatedSpellIds = new Set(enrichedCuratedSpells.map((spell) => spell.id));
var importedSpells = sourceSpellRulesLevel0To3.filter((spell) => !curatedSpellIds.has(spell.id)).map((spell) => ({
	id: spell.id,
	name: spell.name,
	level: spell.level,
	school: spell.school,
	castingTime: spell.castingTime,
	range: spell.range,
	components: parseSourceComponents(spell.components),
	duration: spell.duration,
	concentration: spell.concentration,
	ritual: spell.ritual,
	description: spell.mechanicsSummaryGerman,
	mechanicsSummary: spell.mechanicsSummaryGerman,
	rulesText: spell.rulesTextEnglish,
	attackTypes: [...spell.attackTypesGerman],
	savingThrows: [...spell.savingThrowsGerman],
	damageText: [...spell.damageGerman],
	healingText: [...spell.healingGerman],
	conditions: [...spell.conditionsGerman],
	effectTags: [...spell.effectTagsGerman],
	sourceLabel: spell.source,
	sourcePage: spell.sourcePage,
	higherLevels: spell.scalingTextEnglish || void 0,
	classIds: [...spell.classIds]
}));
/** Zentrale, deduplizierte Zauber-Registry für Creator, Sheet und Compendium. */
var spells = [...enrichedCuratedSpells, ...importedSpells].sort((a, b) => a.level - b.level || a.name.localeCompare(b.name, "de"));
new Map(spells.map((spell) => [spell.id, spell]));
//#endregion
//#region src/content/phase1/backgrounds2014.ts
var sourceBackgrounds2014 = [
	{
		"id": "acolyte",
		"name_de": "Akolyth",
		"skills": "Motiv erkennen, Religion",
		"tools": "-",
		"languages": "2 nach Wahl",
		"equipment": "Heiliges Symbol; Gebetbuch/-rad; 5 Räucherstäbchen; Gewänder; gewöhnliche Kleidung; 15 GM",
		"feature": "Zuflucht der Gläubigen",
		"app_id": "acolyte"
	},
	{
		"id": "charlatan",
		"name_de": "Scharlatan",
		"skills": "Täuschen, Fingerfertigkeit",
		"tools": "Verkleidungsset, Fälscherwerkzeug",
		"languages": "-",
		"equipment": "Feine Kleidung; Verkleidungsset; Betrugsutensilien nach Wahl; 15 GM",
		"feature": "Falsche Identität",
		"app_id": "charlatan"
	},
	{
		"id": "criminal",
		"name_de": "Krimineller / Spion",
		"skills": "Täuschen, Heimlichkeit",
		"tools": "Ein Spielset, Diebeswerkzeug",
		"languages": "-",
		"equipment": "Brecheisen; dunkle gewöhnliche Kleidung mit Kapuze; 15 GM",
		"feature": "Krimineller Kontakt",
		"app_id": "criminal"
	},
	{
		"id": "entertainer",
		"name_de": "Unterhaltungskünstler / Gladiator",
		"skills": "Akrobatik, Auftreten",
		"tools": "Verkleidungsset, ein Musikinstrument",
		"languages": "-",
		"equipment": "Musikinstrument; Gunstbeweis eines Bewunderers; Kostüm; 15 GM",
		"feature": "Auf vielfachen Wunsch",
		"app_id": "entertainer"
	},
	{
		"id": "folk_hero",
		"name_de": "Volksheld",
		"skills": "Tierkunde, Überleben",
		"tools": "Ein Handwerkszeug, Landfahrzeuge",
		"languages": "-",
		"equipment": "Handwerkszeug; Schaufel; Eisentopf; gewöhnliche Kleidung; 10 GM",
		"feature": "Rustikale Gastfreundschaft",
		"app_id": "folk_hero"
	},
	{
		"id": "guild_artisan",
		"name_de": "Gildenhandwerker / Gildenhändler",
		"skills": "Motiv erkennen, Überzeugen",
		"tools": "Ein Handwerkszeug",
		"languages": "1 nach Wahl",
		"equipment": "Handwerkszeug; Empfehlungsschreiben der Gilde; Reisekleidung; 15 GM",
		"feature": "Gildenmitgliedschaft",
		"app_id": "guild_artisan"
	},
	{
		"id": "hermit",
		"name_de": "Einsiedler",
		"skills": "Heilkunde, Religion",
		"tools": "Kräuterkundeausrüstung",
		"languages": "1 nach Wahl",
		"equipment": "Schriftrollenkapsel mit Notizen; Winterdecke; gewöhnliche Kleidung; Kräuterkundeausrüstung; 5 GM",
		"feature": "Entdeckung",
		"app_id": "hermit"
	},
	{
		"id": "noble",
		"name_de": "Adliger / Ritter",
		"skills": "Geschichte, Überzeugen",
		"tools": "Ein Spielset",
		"languages": "1 nach Wahl",
		"equipment": "Feine Kleidung; Siegelring; Stammbaumrolle; 25 GM",
		"feature": "Privilegierte Stellung",
		"app_id": "noble"
	},
	{
		"id": "outlander",
		"name_de": "Fremdländer",
		"skills": "Athletik, Überleben",
		"tools": "Ein Musikinstrument",
		"languages": "1 nach Wahl",
		"equipment": "Stab; Jagdfalle; Trophäe eines Tiers; Reisekleidung; 10 GM",
		"feature": "Wanderer",
		"app_id": "outlander"
	},
	{
		"id": "sage",
		"name_de": "Weiser",
		"skills": "Arkane Kunde, Geschichte",
		"tools": "-",
		"languages": "2 nach Wahl",
		"equipment": "Tintenfass; Feder; kleines Messer; Brief eines verstorbenen Kollegen; gewöhnliche Kleidung; 10 GM",
		"feature": "Forscher",
		"app_id": "sage"
	},
	{
		"id": "sailor",
		"name_de": "Seemann / Pirat",
		"skills": "Athletik, Wahrnehmung",
		"tools": "Navigatorwerkzeug, Wasserfahrzeuge",
		"languages": "-",
		"equipment": "Belegnagel; 50 Fuß Seidenseil; Glücksbringer; gewöhnliche Kleidung; 10 GM",
		"feature": "Schiffspassage",
		"app_id": "sailor"
	},
	{
		"id": "soldier",
		"name_de": "Soldat",
		"skills": "Athletik, Einschüchtern",
		"tools": "Ein Spielset, Landfahrzeuge",
		"languages": "-",
		"equipment": "Rangabzeichen; Trophäe; Spielset; gewöhnliche Kleidung; 10 GM",
		"feature": "Militärischer Rang",
		"app_id": "soldier"
	},
	{
		"id": "urchin",
		"name_de": "Straßenkind",
		"skills": "Fingerfertigkeit, Heimlichkeit",
		"tools": "Verkleidungsset, Diebeswerkzeug",
		"languages": "-",
		"equipment": "Kleines Messer; Stadtkarte; Hausmaus; Andenken an die Eltern; gewöhnliche Kleidung; 10 GM",
		"feature": "Stadtgeheimnisse",
		"app_id": "urchin"
	}
];
//#endregion
//#region src/compendium/backgrounds/backgrounds.ts
var curatedBackgrounds = [
	{
		id: "acolyte",
		name: "Akolyth",
		description: "Du hast einen bedeutenden Teil deines Lebens im Dienst eines Tempels, Ordens oder religiösen Bundes verbracht.",
		source: "core",
		skillProficiencies: ["insight", "religion"],
		toolProficiencies: [],
		languageChoices: 2,
		equipment: [],
		feature: {
			id: "shelter-of-the-faithful",
			name: "Zuflucht des Glaubens",
			description: "Angehörige deiner Glaubensgemeinschaft erkennen deine Ausbildung an und können dir im Rahmen ihrer Möglichkeiten Unterkunft, Rat oder einfache Unterstützung gewähren.",
			source: "core"
		}
	},
	{
		id: "criminal",
		name: "Krimineller",
		description: "Du kennst die verborgenen Wege der Städte, den Wert eines guten Kontakts und die Regeln der Unterwelt.",
		source: "core",
		skillProficiencies: ["deception", "stealth"],
		toolProficiencies: ["Diebeswerkzeug", "Ein Spielset nach Wahl"],
		languageChoices: 0,
		equipment: [],
		feature: {
			id: "criminal-contact",
			name: "Kontakt zur Unterwelt",
			description: "Du kennst eine verlässliche Person oder ein Netzwerk, über das Nachrichten, Gerüchte oder kleinere Gefälligkeiten innerhalb krimineller Kreise vermittelt werden können.",
			source: "core"
		}
	},
	{
		id: "folk-hero",
		name: "Volksheld",
		description: "Deine Herkunft liegt unter gewöhnlichen Leuten, doch eine mutige Tat machte dich in deiner Heimat bekannt.",
		source: "core",
		skillProficiencies: ["animal-handling", "survival"],
		toolProficiencies: ["Ein Handwerkszeug nach Wahl", "Landfahrzeuge"],
		languageChoices: 0,
		equipment: [],
		feature: {
			id: "rustic-hospitality",
			name: "Freund des einfachen Volkes",
			description: "Gewöhnliche Leute neigen dazu, dir zu vertrauen, dir ein einfaches Versteck anzubieten oder dich vor unmittelbarer Gefahr zu warnen.",
			source: "core"
		}
	},
	{
		id: "noble",
		name: "Adliger",
		description: "Du entstammst einer angesehenen Familie oder wurdest in die Regeln von Hof, Rang und Einfluss eingeführt.",
		source: "core",
		skillProficiencies: ["history", "persuasion"],
		toolProficiencies: ["Ein Spielset nach Wahl"],
		languageChoices: 1,
		equipment: [],
		feature: {
			id: "position-of-privilege",
			name: "Stand und Ansehen",
			description: "Dein Name, dein Auftreten oder deine Verbindungen öffnen dir in vielen gehobenen Kreisen Türen, die anderen verschlossen bleiben.",
			source: "core"
		}
	},
	{
		id: "sage",
		name: "Gelehrter",
		description: "Jahre des Studiums haben dir einen breiten Wissensschatz und Erfahrung im Umgang mit Archiven und Lehrstätten vermittelt.",
		source: "core",
		skillProficiencies: ["arcana", "history"],
		toolProficiencies: [],
		languageChoices: 2,
		equipment: [],
		feature: {
			id: "researcher",
			name: "Weg zum Wissen",
			description: "Wenn dir eine Information fehlt, kannst du häufig einschätzen, in welcher Bibliothek, Sammlung oder bei welcher Fachperson sie zu finden sein könnte.",
			source: "core"
		}
	},
	{
		id: "soldier",
		name: "Soldat",
		description: "Du wurdest für Krieg, Wachdienst oder den bewaffneten Schutz einer Gemeinschaft ausgebildet.",
		source: "core",
		skillProficiencies: ["athletics", "intimidation"],
		toolProficiencies: ["Ein Spielset nach Wahl", "Landfahrzeuge"],
		languageChoices: 0,
		equipment: [],
		feature: {
			id: "military-rank",
			name: "Militärischer Rang",
			description: "Veteranen und Angehörige organisierter Streitkräfte erkennen deine Erfahrung und deinen früheren Rang häufig an.",
			source: "core"
		}
	}
];
var skillNameToId = {
	"Akrobatik": "acrobatics",
	"Tierkunde": "animal-handling",
	"Arkane Kunde": "arcana",
	"Athletik": "athletics",
	"Täuschen": "deception",
	"Geschichte": "history",
	"Motiv erkennen": "insight",
	"Einschüchtern": "intimidation",
	"Nachforschungen": "investigation",
	"Heilkunde": "medicine",
	"Naturkunde": "nature",
	"Wahrnehmung": "perception",
	"Auftreten": "performance",
	"Überzeugen": "persuasion",
	"Religion": "religion",
	"Fingerfertigkeit": "sleight-of-hand",
	"Heimlichkeit": "stealth",
	"Überleben": "survival"
};
function parseList(value) {
	return value === "-" ? [] : value.split(",").map((entry) => entry.trim()).filter(Boolean);
}
function parseLanguageChoices(value) {
	const match = value.match(/\d+/);
	return match ? Number(match[0]) : 0;
}
var importedBackgroundFeatureDescriptions = {
	charlatan: "Du hast eine zweite Identität mit passender Verkleidung, Dokumenten und einer glaubwürdigen Hintergrundgeschichte aufgebaut. Du kannst diese Identität nutzen, um dich als die entsprechende Person auszugeben, und passende Schriftstücke oder persönliche Unterlagen fälschen, sofern du ein vergleichbares Beispiel zur Hand hast.",
	entertainer: "Du findest gewöhnlich einen Ort zum Auftreten, etwa in einem Gasthaus, Zirkus, Theater oder bei einem Fest. Im Gegenzug für deine Darbietung erhältst du in der Regel einfache Unterkunft und Verpflegung; dein Ruf kann außerdem dazu führen, dass Fremde dich wiedererkennen.",
	"guild-artisan": "Als anerkanntes Mitglied deiner Gilde kannst du auf die Unterstützung deiner Zunft zählen. Gildenmitglieder gewähren dir nach Möglichkeit Unterkunft und Verpflegung und helfen dir, andere Mitglieder oder einflussreiche Kontakte zu erreichen. In Städten kann ein Gildenhaus als Treffpunkt, Informationsquelle und Anlaufstelle dienen. Für die Mitgliedschaft fallen regelmäßig Beiträge an.",
	hermit: "Während deiner Abgeschiedenheit bist du auf eine bedeutende Entdeckung gestoßen. Ihre genaue Natur hängt von deinem Charakter und der Kampagne ab: ein verborgenes Wissen, eine vergessene Wahrheit, ein ungewöhnlicher Ort oder eine Erkenntnis, deren Bedeutung sich erst im Abenteuer vollständig zeigt.",
	outlander: "Du besitzt ein ausgezeichnetes Gedächtnis für Karten und Gelände und kannst dich an die grobe Lage wichtiger Landschaftsmerkmale erinnern. In geeigneter Wildnis findest du außerdem Nahrung und frisches Wasser für dich und mehrere weitere Personen, sofern die Umgebung solche Ressourcen überhaupt bietet.",
	sailor: "Wenn nötig, kannst du für dich und deine Gefährten eine kostenlose Passage auf einem Segelschiff organisieren, auf dem du früher gedient hast oder zu dessen Besatzung du gute Beziehungen unterhältst. Fahrplan und Route liegen beim Kapitän; als Gegenleistung wird möglicherweise Mithilfe an Bord erwartet.",
	urchin: "Du kennst die verborgenen Wege, Durchgänge und Abkürzungen einer Stadt. Außerhalb eines Kampfes kannst du dich mit deiner Gruppe zwischen zwei Orten in derselben Stadt deutlich schneller bewegen, wenn du diese Schleichwege nutzen kannst."
};
var curatedBackgroundIds = new Set(curatedBackgrounds.map((entry) => entry.id));
var importedBackgrounds = sourceBackgrounds2014.map((source) => ({
	...source,
	normalizedId: source.app_id.replaceAll("_", "-")
})).filter((source) => !curatedBackgroundIds.has(source.normalizedId)).map((source) => ({
	id: source.normalizedId,
	name: source.name_de,
	description: `Klassischer Hintergrund mit dem Merkmal „${source.feature}“.`,
	source: "core",
	skillProficiencies: parseList(source.skills).map((name) => skillNameToId[name]).filter((id) => Boolean(id)),
	toolProficiencies: parseList(source.tools),
	languageChoices: parseLanguageChoices(source.languages),
	equipment: source.equipment.split(";").map((entry) => entry.trim()).filter(Boolean),
	feature: {
		id: `${source.normalizedId}-feature`,
		name: source.feature,
		description: importedBackgroundFeatureDescriptions[source.normalizedId] ?? `Das Merkmal „${source.feature}“ ist für diesen Hintergrund noch nicht redaktionell beschrieben.`,
		source: "core"
	}
}));
var sourceBackgroundEquipment = new Map(sourceBackgrounds2014.map((source) => [source.app_id.replaceAll("_", "-"), source.equipment.split(";").map((entry) => entry.trim()).filter(Boolean)]));
/** Zentrale Hintergrund-Registry; kuratierte Texte haben Vorrang, die 2014-Startausrüstung stammt einheitlich aus der Quelldatei. */
var backgrounds = [...curatedBackgrounds.map((entry) => ({
	...entry,
	equipment: sourceBackgroundEquipment.get(entry.id) ?? entry.equipment
})), ...importedBackgrounds].sort((a, b) => a.name.localeCompare(b.name, "de"));
new Map(backgrounds.map((entry) => [entry.id, entry]));
//#endregion
//#region src/content/phase1/weapons2014.ts
var sourceWeapons2014 = [
	{
		"name_de": "Keule",
		"category": "Einfach/Nahkampf",
		"damage": "1W4 Wucht",
		"cost_gp": .1,
		"weight_lb": 2,
		"properties": "Leicht",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "keule"
	},
	{
		"name_de": "Dolch",
		"category": "Einfach/Nahkampf",
		"damage": "1W4 Stich",
		"cost_gp": 2,
		"weight_lb": 1,
		"properties": "Finesse, Leicht, Wurf 20/60",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "dolch"
	},
	{
		"name_de": "Zweihandkeule",
		"category": "Einfach/Nahkampf",
		"damage": "1W8 Wucht",
		"cost_gp": .2,
		"weight_lb": 10,
		"properties": "Zweihändig",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "zweihandkeule"
	},
	{
		"name_de": "Beil",
		"category": "Einfach/Nahkampf",
		"damage": "1W6 Hieb",
		"cost_gp": 5,
		"weight_lb": 2,
		"properties": "Leicht, Wurf 20/60",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "beil"
	},
	{
		"name_de": "Wurfspeer",
		"category": "Einfach/Nahkampf",
		"damage": "1W6 Stich",
		"cost_gp": .5,
		"weight_lb": 2,
		"properties": "Wurf 30/120",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "wurfspeer"
	},
	{
		"name_de": "Leichter Hammer",
		"category": "Einfach/Nahkampf",
		"damage": "1W4 Wucht",
		"cost_gp": 2,
		"weight_lb": 2,
		"properties": "Leicht, Wurf 20/60",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "leichter-hammer"
	},
	{
		"name_de": "Streitkolben",
		"category": "Einfach/Nahkampf",
		"damage": "1W6 Wucht",
		"cost_gp": 5,
		"weight_lb": 4,
		"properties": "-",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "streitkolben"
	},
	{
		"name_de": "Kampfstab",
		"category": "Einfach/Nahkampf",
		"damage": "1W6 Wucht",
		"cost_gp": .2,
		"weight_lb": 4,
		"properties": "Vielseitig 1W8",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "kampfstab"
	},
	{
		"name_de": "Sichel",
		"category": "Einfach/Nahkampf",
		"damage": "1W4 Hieb",
		"cost_gp": 1,
		"weight_lb": 2,
		"properties": "Leicht",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "sichel"
	},
	{
		"name_de": "Speer",
		"category": "Einfach/Nahkampf",
		"damage": "1W6 Stich",
		"cost_gp": 1,
		"weight_lb": 3,
		"properties": "Wurf 20/60, Vielseitig 1W8",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "speer"
	},
	{
		"name_de": "Leichte Armbrust",
		"category": "Einfach/Fernkampf",
		"damage": "1W8 Stich",
		"cost_gp": 25,
		"weight_lb": 5,
		"properties": "Munition 80/320, Laden, Zweihändig",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "leichte-armbrust"
	},
	{
		"name_de": "Wurfpfeil",
		"category": "Einfach/Fernkampf",
		"damage": "1W4 Stich",
		"cost_gp": .05,
		"weight_lb": .25,
		"properties": "Finesse, Wurf 20/60",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "wurfpfeil"
	},
	{
		"name_de": "Kurzbogen",
		"category": "Einfach/Fernkampf",
		"damage": "1W6 Stich",
		"cost_gp": 25,
		"weight_lb": 2,
		"properties": "Munition 80/320, Zweihändig",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "kurzbogen"
	},
	{
		"name_de": "Schleuder",
		"category": "Einfach/Fernkampf",
		"damage": "1W4 Wucht",
		"cost_gp": .1,
		"weight_lb": 0,
		"properties": "Munition 30/120",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "schleuder"
	},
	{
		"name_de": "Streitaxt",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "1W8 Hieb",
		"cost_gp": 10,
		"weight_lb": 4,
		"properties": "Vielseitig 1W10",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "streitaxt"
	},
	{
		"name_de": "Flegel",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "1W8 Wucht",
		"cost_gp": 10,
		"weight_lb": 2,
		"properties": "-",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "flegel"
	},
	{
		"name_de": "Glefe",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "1W10 Hieb",
		"cost_gp": 20,
		"weight_lb": 6,
		"properties": "Schwer, Reichweite, Zweihändig",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "glefe"
	},
	{
		"name_de": "Zweihandaxt",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "1W12 Hieb",
		"cost_gp": 30,
		"weight_lb": 7,
		"properties": "Schwer, Zweihändig",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "zweihandaxt"
	},
	{
		"name_de": "Zweihandschwert",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "2W6 Hieb",
		"cost_gp": 50,
		"weight_lb": 6,
		"properties": "Schwer, Zweihändig",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "zweihandschwert"
	},
	{
		"name_de": "Hellebarde",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "1W10 Hieb",
		"cost_gp": 20,
		"weight_lb": 6,
		"properties": "Schwer, Reichweite, Zweihändig",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "hellebarde"
	},
	{
		"name_de": "Lanze",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "1W12 Stich",
		"cost_gp": 10,
		"weight_lb": 6,
		"properties": "Reichweite, Besonders",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "lanze"
	},
	{
		"name_de": "Langschwert",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "1W8 Hieb",
		"cost_gp": 15,
		"weight_lb": 3,
		"properties": "Vielseitig 1W10",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "langschwert"
	},
	{
		"name_de": "Zweihandhammer (Maul)",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "2W6 Wucht",
		"cost_gp": 10,
		"weight_lb": 10,
		"properties": "Schwer, Zweihändig",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "zweihandhammer-maul"
	},
	{
		"name_de": "Morgenstern",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "1W8 Stich",
		"cost_gp": 15,
		"weight_lb": 4,
		"properties": "-",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "morgenstern"
	},
	{
		"name_de": "Pike",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "1W10 Stich",
		"cost_gp": 5,
		"weight_lb": 18,
		"properties": "Schwer, Reichweite, Zweihändig",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "pike"
	},
	{
		"name_de": "Rapier",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "1W8 Stich",
		"cost_gp": 25,
		"weight_lb": 2,
		"properties": "Finesse",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "rapier"
	},
	{
		"name_de": "Krummsäbel",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "1W6 Hieb",
		"cost_gp": 25,
		"weight_lb": 3,
		"properties": "Finesse, Leicht",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "krummsaebel"
	},
	{
		"name_de": "Kurzschwert",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "1W6 Stich",
		"cost_gp": 10,
		"weight_lb": 2,
		"properties": "Finesse, Leicht",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "kurzschwert"
	},
	{
		"name_de": "Dreizack",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "1W6 Stich",
		"cost_gp": 5,
		"weight_lb": 4,
		"properties": "Wurf 20/60, Vielseitig 1W8",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "dreizack"
	},
	{
		"name_de": "Kriegspicke",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "1W8 Stich",
		"cost_gp": 5,
		"weight_lb": 2,
		"properties": "-",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "kriegspicke"
	},
	{
		"name_de": "Kriegshammer",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "1W8 Wucht",
		"cost_gp": 15,
		"weight_lb": 2,
		"properties": "Vielseitig 1W10",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "kriegshammer"
	},
	{
		"name_de": "Peitsche",
		"category": "Kriegswaffe/Nahkampf",
		"damage": "1W4 Hieb",
		"cost_gp": 2,
		"weight_lb": 3,
		"properties": "Finesse, Reichweite",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "peitsche"
	},
	{
		"name_de": "Blasrohr",
		"category": "Kriegswaffe/Fernkampf",
		"damage": "1 Stich",
		"cost_gp": 10,
		"weight_lb": 1,
		"properties": "Munition 25/100, Laden",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "blasrohr"
	},
	{
		"name_de": "Handarmbrust",
		"category": "Kriegswaffe/Fernkampf",
		"damage": "1W6 Stich",
		"cost_gp": 75,
		"weight_lb": 3,
		"properties": "Munition 30/120, Leicht, Laden",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "handarmbrust"
	},
	{
		"name_de": "Schwere Armbrust",
		"category": "Kriegswaffe/Fernkampf",
		"damage": "1W10 Stich",
		"cost_gp": 50,
		"weight_lb": 18,
		"properties": "Munition 100/400, Schwer, Laden, Zweihändig",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "schwere-armbrust"
	},
	{
		"name_de": "Langbogen",
		"category": "Kriegswaffe/Fernkampf",
		"damage": "1W8 Stich",
		"cost_gp": 50,
		"weight_lb": 2,
		"properties": "Munition 150/600, Schwer, Zweihändig",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "langbogen"
	},
	{
		"name_de": "Netz",
		"category": "Kriegswaffe/Fernkampf",
		"damage": "-",
		"cost_gp": 1,
		"weight_lb": 3,
		"properties": "Besonders, Wurf 5/15",
		"ruleset": "2014; 2024-Waffenmeisterschaft separat speichern",
		"app_id": "netz"
	}
];
//#endregion
//#region src/content/phase1/armor2014.ts
var sourceArmor2014 = [
	{
		"name_de": "Gepolsterte Rüstung",
		"category": "Leicht",
		"armor_class": "11 + GE",
		"cost_gp": 5,
		"weight_lb": 8,
		"strength": "-",
		"stealth": "Nachteil",
		"ruleset": "2014; Grundwerte mit 2024-Eintrag abgleichen",
		"app_id": "gepolsterte-ruestung"
	},
	{
		"name_de": "Lederrüstung",
		"category": "Leicht",
		"armor_class": "11 + GE",
		"cost_gp": 10,
		"weight_lb": 10,
		"strength": "-",
		"stealth": "Nein",
		"ruleset": "2014; Grundwerte mit 2024-Eintrag abgleichen",
		"app_id": "lederruestung"
	},
	{
		"name_de": "Beschlagene Lederrüstung",
		"category": "Leicht",
		"armor_class": "12 + GE",
		"cost_gp": 45,
		"weight_lb": 13,
		"strength": "-",
		"stealth": "Nein",
		"ruleset": "2014; Grundwerte mit 2024-Eintrag abgleichen",
		"app_id": "beschlagene-lederruestung"
	},
	{
		"name_de": "Fellrüstung",
		"category": "Mittel",
		"armor_class": "12 + GE (max. +2)",
		"cost_gp": 10,
		"weight_lb": 12,
		"strength": "-",
		"stealth": "Nein",
		"ruleset": "2014; Grundwerte mit 2024-Eintrag abgleichen",
		"app_id": "fellruestung"
	},
	{
		"name_de": "Kettenhemd",
		"category": "Mittel",
		"armor_class": "13 + GE (max. +2)",
		"cost_gp": 50,
		"weight_lb": 20,
		"strength": "-",
		"stealth": "Nein",
		"ruleset": "2014; Grundwerte mit 2024-Eintrag abgleichen",
		"app_id": "kettenhemd"
	},
	{
		"name_de": "Schuppenpanzer",
		"category": "Mittel",
		"armor_class": "14 + GE (max. +2)",
		"cost_gp": 50,
		"weight_lb": 45,
		"strength": "-",
		"stealth": "Nachteil",
		"ruleset": "2014; Grundwerte mit 2024-Eintrag abgleichen",
		"app_id": "schuppenpanzer"
	},
	{
		"name_de": "Brustplatte",
		"category": "Mittel",
		"armor_class": "14 + GE (max. +2)",
		"cost_gp": 400,
		"weight_lb": 20,
		"strength": "-",
		"stealth": "Nein",
		"ruleset": "2014; Grundwerte mit 2024-Eintrag abgleichen",
		"app_id": "brustplatte"
	},
	{
		"name_de": "Halbplatte",
		"category": "Mittel",
		"armor_class": "15 + GE (max. +2)",
		"cost_gp": 750,
		"weight_lb": 40,
		"strength": "-",
		"stealth": "Nachteil",
		"ruleset": "2014; Grundwerte mit 2024-Eintrag abgleichen",
		"app_id": "halbplatte"
	},
	{
		"name_de": "Ringpanzer",
		"category": "Schwer",
		"armor_class": "14",
		"cost_gp": 30,
		"weight_lb": 40,
		"strength": "-",
		"stealth": "Nachteil",
		"ruleset": "2014; Grundwerte mit 2024-Eintrag abgleichen",
		"app_id": "ringpanzer"
	},
	{
		"name_de": "Kettenrüstung",
		"category": "Schwer",
		"armor_class": "16",
		"cost_gp": 75,
		"weight_lb": 55,
		"strength": "ST 13",
		"stealth": "Nachteil",
		"ruleset": "2014; Grundwerte mit 2024-Eintrag abgleichen",
		"app_id": "kettenruestung"
	},
	{
		"name_de": "Schienenpanzer",
		"category": "Schwer",
		"armor_class": "17",
		"cost_gp": 200,
		"weight_lb": 60,
		"strength": "ST 15",
		"stealth": "Nachteil",
		"ruleset": "2014; Grundwerte mit 2024-Eintrag abgleichen",
		"app_id": "schienenpanzer"
	},
	{
		"name_de": "Plattenrüstung",
		"category": "Schwer",
		"armor_class": "18",
		"cost_gp": 1500,
		"weight_lb": 65,
		"strength": "ST 15",
		"stealth": "Nachteil",
		"ruleset": "2014; Grundwerte mit 2024-Eintrag abgleichen",
		"app_id": "plattenruestung"
	},
	{
		"name_de": "Schild",
		"category": "Schild",
		"armor_class": "+2 RK",
		"cost_gp": 10,
		"weight_lb": 6,
		"strength": "-",
		"stealth": "Nein",
		"ruleset": "2014; Grundwerte mit 2024-Eintrag abgleichen",
		"app_id": "schild"
	}
];
//#endregion
//#region src/compendium/equipment/equipment.ts
var curatedWeapons = [
	{
		id: "club",
		name: "Keule",
		category: "weapon",
		weaponCategory: "simple",
		damage: {
			dice: 1,
			die: 4,
			type: "bludgeoning"
		},
		properties: ["light"],
		weight: 2,
		price: .1
	},
	{
		id: "dagger",
		name: "Dolch",
		category: "weapon",
		weaponCategory: "simple",
		damage: {
			dice: 1,
			die: 4,
			type: "piercing"
		},
		range: {
			normal: 20,
			long: 60
		},
		properties: [
			"finesse",
			"light",
			"thrown"
		],
		weight: 1,
		price: 2
	},
	{
		id: "dart",
		name: "Wurfpfeil",
		category: "weapon",
		weaponCategory: "simple",
		damage: {
			dice: 1,
			die: 4,
			type: "piercing"
		},
		range: {
			normal: 20,
			long: 60
		},
		properties: ["finesse", "thrown"],
		weight: .25,
		price: .05
	},
	{
		id: "greatclub",
		name: "Zweihändige Keule",
		category: "weapon",
		weaponCategory: "simple",
		damage: {
			dice: 1,
			die: 8,
			type: "bludgeoning"
		},
		properties: ["two-handed"],
		weight: 10,
		price: .2
	},
	{
		id: "handaxe",
		name: "Handaxt",
		category: "weapon",
		weaponCategory: "simple",
		damage: {
			dice: 1,
			die: 6,
			type: "slashing"
		},
		range: {
			normal: 20,
			long: 60
		},
		properties: ["light", "thrown"],
		weight: 2,
		price: 5
	},
	{
		id: "javelin",
		name: "Wurfspeer",
		category: "weapon",
		weaponCategory: "simple",
		damage: {
			dice: 1,
			die: 6,
			type: "piercing"
		},
		range: {
			normal: 30,
			long: 120
		},
		properties: ["thrown"],
		weight: 2,
		price: .5
	},
	{
		id: "mace",
		name: "Streitkolben",
		category: "weapon",
		weaponCategory: "simple",
		damage: {
			dice: 1,
			die: 6,
			type: "bludgeoning"
		},
		properties: [],
		weight: 4,
		price: 5
	},
	{
		id: "quarterstaff",
		name: "Kampfstab",
		category: "weapon",
		weaponCategory: "simple",
		damage: {
			dice: 1,
			die: 6,
			type: "bludgeoning"
		},
		versatile: {
			dice: 1,
			die: 8,
			type: "bludgeoning"
		},
		properties: ["versatile"],
		weight: 4,
		price: .2
	},
	{
		id: "spear",
		name: "Speer",
		category: "weapon",
		weaponCategory: "simple",
		damage: {
			dice: 1,
			die: 6,
			type: "piercing"
		},
		versatile: {
			dice: 1,
			die: 8,
			type: "piercing"
		},
		range: {
			normal: 20,
			long: 60
		},
		properties: ["thrown", "versatile"],
		weight: 3,
		price: 1
	},
	{
		id: "light-crossbow",
		name: "Leichte Armbrust",
		category: "weapon",
		weaponCategory: "simple",
		damage: {
			dice: 1,
			die: 8,
			type: "piercing"
		},
		range: {
			normal: 80,
			long: 320
		},
		properties: [
			"ammunition",
			"loading",
			"two-handed"
		],
		weight: 5,
		price: 25
	},
	{
		id: "shortbow",
		name: "Kurzbogen",
		category: "weapon",
		weaponCategory: "simple",
		damage: {
			dice: 1,
			die: 6,
			type: "piercing"
		},
		range: {
			normal: 80,
			long: 320
		},
		properties: ["ammunition", "two-handed"],
		weight: 2,
		price: 25
	},
	{
		id: "battleaxe",
		name: "Streitaxt",
		category: "weapon",
		weaponCategory: "martial",
		damage: {
			dice: 1,
			die: 8,
			type: "slashing"
		},
		versatile: {
			dice: 1,
			die: 10,
			type: "slashing"
		},
		properties: ["versatile"],
		weight: 4,
		price: 10
	},
	{
		id: "greataxe",
		name: "Große Axt",
		category: "weapon",
		weaponCategory: "martial",
		damage: {
			dice: 1,
			die: 12,
			type: "slashing"
		},
		properties: ["heavy", "two-handed"],
		weight: 7,
		price: 30
	},
	{
		id: "greatsword",
		name: "Großschwert",
		category: "weapon",
		weaponCategory: "martial",
		damage: {
			dice: 2,
			die: 6,
			type: "slashing"
		},
		properties: ["heavy", "two-handed"],
		weight: 6,
		price: 50
	},
	{
		id: "longsword",
		name: "Langschwert",
		category: "weapon",
		weaponCategory: "martial",
		damage: {
			dice: 1,
			die: 8,
			type: "slashing"
		},
		versatile: {
			dice: 1,
			die: 10,
			type: "slashing"
		},
		properties: ["versatile"],
		weight: 3,
		price: 15
	},
	{
		id: "rapier",
		name: "Rapier",
		category: "weapon",
		weaponCategory: "martial",
		damage: {
			dice: 1,
			die: 8,
			type: "piercing"
		},
		properties: ["finesse"],
		weight: 2,
		price: 25
	},
	{
		id: "scimitar",
		name: "Krummsäbel",
		category: "weapon",
		weaponCategory: "martial",
		damage: {
			dice: 1,
			die: 6,
			type: "slashing"
		},
		properties: ["finesse", "light"],
		weight: 3,
		price: 25
	},
	{
		id: "shortsword",
		name: "Kurzschwert",
		category: "weapon",
		weaponCategory: "martial",
		damage: {
			dice: 1,
			die: 6,
			type: "piercing"
		},
		properties: ["finesse", "light"],
		weight: 2,
		price: 10
	},
	{
		id: "warhammer",
		name: "Kriegshammer",
		category: "weapon",
		weaponCategory: "martial",
		damage: {
			dice: 1,
			die: 8,
			type: "bludgeoning"
		},
		versatile: {
			dice: 1,
			die: 10,
			type: "bludgeoning"
		},
		properties: ["versatile"],
		weight: 2,
		price: 15
	},
	{
		id: "longbow",
		name: "Langbogen",
		category: "weapon",
		weaponCategory: "martial",
		damage: {
			dice: 1,
			die: 8,
			type: "piercing"
		},
		range: {
			normal: 150,
			long: 600
		},
		properties: [
			"ammunition",
			"heavy",
			"two-handed"
		],
		weight: 2,
		price: 50
	}
];
var curatedArmor = [
	{
		id: "leather",
		name: "Lederrüstung",
		category: "armor",
		armorClass: 11,
		dexterityModifier: true,
		weight: 10,
		price: 10
	},
	{
		id: "scale-mail",
		name: "Schuppenpanzer",
		category: "armor",
		armorClass: 14,
		dexterityModifier: true,
		maximumDexterityBonus: 2,
		stealthDisadvantage: true,
		weight: 45,
		price: 50
	},
	{
		id: "chain-mail",
		name: "Kettenrüstung",
		category: "armor",
		armorClass: 16,
		dexterityModifier: false,
		strengthRequirement: 13,
		stealthDisadvantage: true,
		weight: 55,
		price: 75
	},
	{
		id: "shield",
		name: "Schild",
		category: "shield",
		armorClass: 2,
		dexterityModifier: false,
		weight: 6,
		price: 10
	}
];
function normalizeEquipmentName(value) {
	return value.toLocaleLowerCase("de").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
}
function parseDamage(value) {
	const match = value.match(/(\d+)W(\d+)\s+(Hieb|Stich|Wucht)/);
	return {
		dice: Number(match?.[1] ?? 1),
		die: Number(match?.[2] ?? 4),
		type: {
			Hieb: "slashing",
			Stich: "piercing",
			Wucht: "bludgeoning"
		}[match?.[3]] ?? "bludgeoning"
	};
}
function parseWeaponProperties(value) {
	return [
		[/Leicht/i, "light"],
		[/Schwer/i, "heavy"],
		[/Finesse/i, "finesse"],
		[/Zweihändig/i, "two-handed"],
		[/Vielseitig/i, "versatile"],
		[/Reichweite/i, "reach"],
		[/Wurf/i, "thrown"],
		[/Laden/i, "loading"],
		[/Munition/i, "ammunition"]
	].filter(([pattern]) => pattern.test(value)).map(([, property]) => property);
}
function parseRange(value) {
	const match = value.match(/(?:Wurf|Munition)\s+(\d+)\/(\d+)/i);
	return match ? {
		normal: Number(match[1]),
		long: Number(match[2])
	} : void 0;
}
var curatedWeaponNames = new Set(curatedWeapons.map((item) => normalizeEquipmentName(item.name)));
var importedWeapons = sourceWeapons2014.filter((source) => !curatedWeaponNames.has(normalizeEquipmentName(source.name_de))).map((source) => ({
	id: source.app_id,
	name: source.name_de,
	category: "weapon",
	weaponCategory: source.category.startsWith("Kriegswaffe") ? "martial" : "simple",
	damage: parseDamage(source.damage),
	properties: parseWeaponProperties(source.properties),
	range: parseRange(source.properties),
	weight: source.weight_lb,
	price: source.cost_gp,
	description: `2014-Referenz: ${source.properties === "-" ? "keine besonderen Eigenschaften" : source.properties}.`
}));
var weapons = [...curatedWeapons, ...importedWeapons].sort((a, b) => a.name.localeCompare(b.name, "de"));
function parseArmorClass(value) {
	const match = value.match(/\d+/);
	return Number(match?.[0] ?? 10);
}
var curatedArmorNames = new Set(curatedArmor.map((item) => normalizeEquipmentName(item.name)));
var importedArmor = sourceArmor2014.filter((source) => !curatedArmorNames.has(normalizeEquipmentName(source.name_de))).map((source) => ({
	id: source.app_id,
	name: source.name_de,
	category: source.category === "Schild" ? "shield" : "armor",
	weight: source.weight_lb,
	price: source.cost_gp,
	armorClass: parseArmorClass(source.armor_class),
	dexterityModifier: source.armor_class.includes("GE"),
	maximumDexterityBonus: source.armor_class.includes("max. +2") ? 2 : void 0,
	strengthRequirement: source.strength === "-" ? void 0 : Number(source.strength.match(/\d+/)?.[0]),
	stealthDisadvantage: source.stealth === "Nachteil",
	description: `Rüstungskategorie: ${source.category}.`
}));
var armor = [...curatedArmor, ...importedArmor].sort((a, b) => a.name.localeCompare(b.name, "de"));
var gear = [
	{
		id: "backpack",
		name: "Rucksack",
		category: "gear",
		weight: 5,
		price: 2
	},
	{
		id: "bedroll",
		name: "Schlafsack",
		category: "gear",
		weight: 7,
		price: 1
	},
	{
		id: "blanket",
		name: "Decke",
		category: "gear",
		weight: 3,
		price: .5
	},
	{
		id: "crowbar",
		name: "Brecheisen",
		category: "gear",
		weight: 5,
		price: 2
	},
	{
		id: "hammer",
		name: "Hammer",
		category: "gear",
		weight: 3,
		price: 1
	},
	{
		id: "piton",
		name: "Kletterhaken",
		category: "gear",
		weight: .25,
		price: .05
	},
	{
		id: "rope",
		name: "Hanfseil (50 ft)",
		category: "gear",
		weight: 10,
		price: 1
	},
	{
		id: "torch",
		name: "Fackel",
		category: "consumable",
		weight: 1,
		price: .01
	},
	{
		id: "ration",
		name: "Tagesration",
		category: "consumable",
		weight: 2,
		price: .5
	},
	{
		id: "waterskin",
		name: "Wasserschlauch",
		category: "gear",
		weight: 5,
		price: .2
	},
	{
		id: "tinderbox",
		name: "Zunderbüchse",
		category: "gear",
		weight: 1,
		price: .5
	},
	{
		id: "mess-kit",
		name: "Essgeschirr",
		category: "gear",
		weight: 1,
		price: .2
	},
	{
		id: "healers-kit",
		name: "Heilerausrüstung",
		category: "tool",
		weight: 3,
		price: 5
	},
	{
		id: "thieves-tools",
		name: "Diebeswerkzeug",
		category: "tool",
		weight: 1,
		price: 25
	},
	{
		id: "lute",
		name: "Laute",
		category: "tool",
		weight: 2,
		price: 35
	},
	{
		id: "holy-symbol",
		name: "Heiliges Symbol",
		category: "focus",
		weight: 1,
		price: 5
	},
	{
		id: "druidic-focus",
		name: "Druidischer Fokus",
		category: "focus",
		weight: 1,
		price: 1
	},
	{
		id: "arcane-focus",
		name: "Arkaner Fokus",
		category: "focus",
		weight: 1,
		price: 10
	},
	{
		id: "component-pouch",
		name: "Komponententasche",
		category: "focus",
		weight: 2,
		price: 25
	},
	{
		id: "spellbook",
		name: "Zauberbuch",
		category: "gear",
		weight: 3,
		price: 50
	},
	{
		id: "arrows",
		name: "Pfeile",
		category: "ammunition",
		weight: .05,
		price: .05
	},
	{
		id: "crossbow-bolts",
		name: "Armbrustbolzen",
		category: "ammunition",
		weight: .075,
		price: .05
	}
];
var equipment = [
	...weapons,
	...armor,
	...gear
];
new Map(equipment.map((entry) => [entry.id, entry]));
option("barbarian-greataxe", "Große Axt", [["greataxe", 1]]), option("barbarian-greatsword", "Großschwert", [["greatsword", 1]]), option("bard-rapier", "Rapier", [["rapier", 1]]), option("bard-longsword", "Langschwert", [["longsword", 1]]), option("cleric-mace", "Streitkolben", [["mace", 1]]), option("cleric-warhammer", "Kriegshammer", [["warhammer", 1]]), option("cleric-scale-mail", "Schuppenpanzer", [["scale-mail", 1]]), option("cleric-leather", "Lederrüstung", [["leather", 1]]), option("cleric-crossbow", "Leichte Armbrust", [["light-crossbow", 1], ["crossbow-bolts", 20]]), option("cleric-spear", "Speer", [["spear", 1]]), option("druid-shield", "Schild", [["shield", 1]]), option("druid-spear", "Speer", [["spear", 1]]), option("druid-scimitar", "Krummsäbel", [["scimitar", 1]]), option("druid-quarterstaff", "Kampfstab", [["quarterstaff", 1]]), option("fighter-chain-mail", "Kettenrüstung", [["chain-mail", 1]]), option("fighter-leather", "Lederrüstung", [["leather", 1]]), option("fighter-longsword-shield", "Langschwert und Schild", [["longsword", 1], ["shield", 1]]), option("fighter-two-longswords", "Zwei Langschwerter", [["longsword", 2]]), option("fighter-greatsword", "Großschwert", [["greatsword", 1]]), option("fighter-crossbow", "Leichte Armbrust", [["light-crossbow", 1], ["crossbow-bolts", 20]]), option("fighter-handaxes", "Zwei Handäxte", [["handaxe", 2]]), option("monk-shortsword", "Kurzschwert", [["shortsword", 1]]), option("monk-quarterstaff", "Kampfstab", [["quarterstaff", 1]]), option("paladin-longsword-shield", "Langschwert und Schild", [["longsword", 1], ["shield", 1]]), option("paladin-two-longswords", "Zwei Langschwerter", [["longsword", 2]]), option("paladin-greatsword", "Großschwert", [["greatsword", 1]]), option("paladin-javelins", "Fünf Wurfspeere", [["javelin", 5]]), option("paladin-spear", "Speer", [["spear", 1]]), option("ranger-scale-mail", "Schuppenpanzer", [["scale-mail", 1]]), option("ranger-leather", "Lederrüstung", [["leather", 1]]), option("ranger-shortswords", "Zwei Kurzschwerter", [["shortsword", 2]]), option("ranger-handaxes", "Zwei Handäxte", [["handaxe", 2]]), option("rogue-rapier", "Rapier", [["rapier", 1]]), option("rogue-shortsword", "Kurzschwert", [["shortsword", 1]]), option("rogue-shortbow", "Kurzbogen", [["shortbow", 1], ["arrows", 20]]), option("rogue-second-shortsword", "Weiteres Kurzschwert", [["shortsword", 1]]), option("sorcerer-crossbow", "Leichte Armbrust", [["light-crossbow", 1], ["crossbow-bolts", 20]]), option("sorcerer-quarterstaff", "Kampfstab", [["quarterstaff", 1]]), option("sorcerer-component-pouch", "Komponententasche", [["component-pouch", 1]]), option("sorcerer-arcane-focus", "Arkaner Fokus", [["arcane-focus", 1]]), option("warlock-crossbow", "Leichte Armbrust", [["light-crossbow", 1], ["crossbow-bolts", 20]]), option("warlock-shortbow", "Kurzbogen", [["shortbow", 1], ["arrows", 20]]), option("warlock-component-pouch", "Komponententasche", [["component-pouch", 1]]), option("warlock-arcane-focus", "Arkaner Fokus", [["arcane-focus", 1]]), option("wizard-quarterstaff", "Kampfstab", [["quarterstaff", 1]]), option("wizard-dagger", "Dolch", [["dagger", 1]]), option("wizard-component-pouch", "Komponententasche", [["component-pouch", 1]]), option("wizard-arcane-focus", "Arkaner Fokus", [["arcane-focus", 1]]), option("monster-hunter-scale-mail", "Schuppenpanzer", [["scale-mail", 1]]), option("monster-hunter-leather", "Lederrüstung", [["leather", 1]]), option("monster-hunter-longsword", "Langschwert", [["longsword", 1]]), option("monster-hunter-rapier", "Rapier", [["rapier", 1]]), option("monster-hunter-greatsword", "Großschwert", [["greatsword", 1]]), option("monster-hunter-shield", "Schild", [["shield", 1]]), option("monster-hunter-light-crossbow", "Leichte Armbrust", [["light-crossbow", 1], ["crossbow-bolts", 20]]), option("monster-hunter-handaxes", "Zwei Handäxte", [["handaxe", 2]]);
function option(id, title, entries) {
	return {
		id,
		title,
		equipment: entries.map(([equipmentId, quantity]) => ({
			equipmentId,
			quantity
		}))
	};
}
//#endregion
//#region src/compendium/ancestries/ancestries.ts
var ancestries = [
	{
		id: "dragonborn",
		name: "Drachenblütiger",
		description: "Eine stolze humanoide Herkunft mit drakonischen Zügen, elementarer Macht und einschüchternder Präsenz.",
		size: "medium",
		speed: 9,
		languages: [],
		abilityBonuses: {
			strength: 2,
			charisma: 1
		},
		traits: [
			"Atemwaffe",
			"Schadensresistenz",
			"Bedrohliches Brüllen",
			"Dunkelsicht",
			"Natürliche Bewegung",
			"Kräftiger Körperbau",
			"Fester Einfluss",
			"Vom Glauben bewegt"
		],
		variants: []
	},
	{
		id: "dwarf",
		name: "Zwerg",
		description: "Eine widerstandsfähige und traditionsbewusste Herkunft, geprägt von Handwerk, Standfestigkeit und uralten Gemeinschaften.",
		size: "medium",
		speed: 9,
		darkvision: 18,
		languages: [],
		abilityBonuses: { constitution: 2 },
		traits: [
			"Schwere Rüstung reduziert die Bewegung nicht",
			"Schadensresistenz: Gift",
			"Zähigkeit",
			"Waffenbegabung",
			"Dunkelsicht",
			"Giftzähigkeit",
			"Standfest",
			"Handwerklicher Schwerpunkt",
			"Auge des Handwerkers"
		],
		variants: [{
			id: "hill-dwarf",
			name: "Hügelzwerg",
			description: "Zäh und weise.",
			abilityBonuses: { wisdom: 1 },
			traits: ["Zwergische Zähigkeit"]
		}, {
			id: "mountain-dwarf",
			name: "Gebirgszwerg",
			description: "Stark und rüstungsgeübt.",
			abilityBonuses: { strength: 2 },
			traits: ["Rüstungstraining"]
		}]
	},
	{
		id: "elf",
		name: "Elf",
		description: "Eine langlebige, wachsame und magisch begabte Herkunft mit tiefer Verbindung zu Erinnerung und Wildnis.",
		size: "medium",
		speed: 9,
		darkvision: 18,
		languages: [],
		abilityBonuses: { dexterity: 2 },
		traits: [
			"Erwachter Geist",
			"Fokussierter Geist",
			"Waffenbegabung",
			"Dunkelsicht",
			"Meditative Ruhe",
			"Schleier der Wildnis",
			"Angeborene Wahrnehmung",
			"Magische Gewandtheit"
		],
		variants: [
			{
				id: "high-elf",
				name: "Hochelf",
				description: "Magisch geschult und gelehrt.",
				abilityBonuses: { intelligence: 1 },
				traits: ["Elfisches Waffentraining", "Magier-Zaubertrick"]
			},
			{
				id: "wood-elf",
				name: "Waldelf",
				description: "Schnell und naturverbunden.",
				abilityBonuses: { wisdom: 1 },
				speedBonus: 1.5,
				traits: ["Maske der Wildnis"]
			},
			{
				id: "drow",
				name: "Drow",
				description: "Von der Tiefe und ihrer Magie geprägt.",
				abilityBonuses: { charisma: 1 },
				darkvision: 36,
				traits: ["Drow-Magie", "Sonnenlichtempfindlichkeit"]
			}
		]
	},
	{
		id: "gnome",
		name: "Gnom",
		description: "Eine kleine, neugierige und erfinderische Herkunft mit ausgeprägter geistiger Widerstandskraft und magischer Begabung.",
		size: "small",
		speed: 9,
		darkvision: 18,
		languages: [],
		abilityBonuses: { intelligence: 2 },
		traits: [
			"Magische Befestigung",
			"Schnelles Entwischen",
			"Kunstfertigkeits-Expertise",
			"Dunkelsicht",
			"Verblassen",
			"Magische Gewandtheit",
			"Meisterhafte Begabung",
			"Stimme der Natur"
		],
		variants: [{
			id: "forest-gnome",
			name: "Waldgnom",
			description: "Verbunden mit Illusion und kleinen Tieren.",
			abilityBonuses: { dexterity: 1 },
			traits: ["Kleine Illusion", "Mit kleinen Tieren sprechen"]
		}, {
			id: "rock-gnome",
			name: "Felsengnom",
			description: "Erfinderisch und widerstandsfähig.",
			abilityBonuses: { constitution: 1 },
			traits: ["Handwerkerwissen", "Bastler"]
		}]
	},
	{
		id: "halfling",
		name: "Halbling",
		description: "Eine kleine, mutige und gemeinschaftsorientierte Herkunft, deren Angehörige für Glück und Anpassungsfähigkeit bekannt sind.",
		size: "small",
		speed: 9,
		languages: [],
		abilityBonuses: { dexterity: 2 },
		traits: [
			"Tapfer",
			"Kreaturendeckung",
			"Glücklich",
			"Helfende Hand",
			"Hindurchschlüpfen",
			"Kraftschlaf",
			"Handwerklicher Schwerpunkt",
			"Die Vergangenheit annehmen"
		],
		variants: [{
			id: "lightfoot-halfling",
			name: "Leichtfuß",
			description: "Unauffällig und gewinnend.",
			abilityBonuses: { charisma: 1 },
			traits: ["Von Natur aus verstohlen"]
		}, {
			id: "stout-halfling",
			name: "Stämmiger Halbling",
			description: "Robust und giftzäh.",
			abilityBonuses: { constitution: 1 },
			traits: ["Stämmige Zähigkeit"]
		}]
	},
	{
		id: "human",
		name: "Mensch",
		description: "Eine vielseitige und anpassungsfähige Herkunft, deren Stärke aus Ehrgeiz, Erfahrung und kultureller Vielfalt erwächst.",
		size: "medium",
		speed: 9,
		languages: [],
		abilityBonuses: {
			strength: 1,
			dexterity: 1,
			constitution: 1,
			intelligence: 1,
			wisdom: 1,
			charisma: 1
		},
		traits: [
			"Beeindruckender kritischer Treffer",
			"Erstschlag",
			"Waffenbegabung",
			"Helfende Hand",
			"Angeborene Orientierung",
			"Handwerklicher Schwerpunkt",
			"Scharfsinniger Überlebender",
			"Fertigkeitskönnen"
		],
		variants: []
	},
	{
		id: "halfelf",
		name: "Halbelf",
		description: "Eine vielseitige Herkunft zwischen menschlichem Ehrgeiz und elfischem Erbe.",
		size: "medium",
		speed: 9,
		darkvision: 18,
		languages: ["Gemeinsprache", "Elfisch"],
		abilityBonuses: { charisma: 2 },
		abilityBonusChoice: {
			choose: 2,
			bonus: 1,
			exclude: ["charisma"]
		},
		traits: ["Feenblut", "Vielseitige Fertigkeit"],
		variants: []
	},
	{
		id: "halforc",
		name: "Halbork",
		description: "Eine kraftvolle und unbeugsame Herkunft mit orkischem Erbe.",
		size: "medium",
		speed: 9,
		darkvision: 18,
		languages: ["Gemeinsprache", "Orkisch"],
		abilityBonuses: {
			strength: 2,
			constitution: 1
		},
		traits: [
			"Bedrohlich",
			"Unerbittliche Ausdauer",
			"Wilde Angriffe"
		],
		variants: []
	},
	{
		id: "tiefling",
		name: "Tiefling",
		description: "Eine infernalisch geprägte Herkunft mit angeborener Magie und Feuerresistenz.",
		size: "medium",
		speed: 9,
		darkvision: 18,
		languages: ["Gemeinsprache", "Infernalisch"],
		abilityBonuses: {
			intelligence: 1,
			charisma: 2
		},
		traits: ["Höllische Resistenz", "Höllisches Vermächtnis"],
		variants: []
	},
	{
		id: "dreamer",
		name: "Träumer",
		description: "Eine seltene Herkunft, deren Angehörige tief mit Schlaf, Träumen und verborgenen Wahrnehmungen verbunden sind.",
		size: "medium",
		speed: 9,
		darkvision: 18,
		languages: [],
		abilityBonuses: {},
		traits: [
			"Schnelle Initiative",
			"Standhafte Reserven",
			"Dunkelsicht",
			"Helfende Hand",
			"Kraftschlaf",
			"Traumwandeln",
			"Improvisator",
			"Angeborene Wahrnehmung"
		],
		variants: []
	},
	{
		id: "grudgel",
		name: "Grudgel",
		description: "Eine seltene, kräftige und handwerklich geprägte Herkunft mit ausgeprägter Konzentration und Ausdauer.",
		size: "medium",
		speed: 9,
		darkvision: 18,
		languages: [],
		abilityBonuses: {},
		traits: [
			"Schlachtfeldkontrolle",
			"Zentriert",
			"Dunkelsicht",
			"Kräftiger Körperbau",
			"Unermüdlich",
			"Handwerklicher Schwerpunkt",
			"Spontaner Handwerker",
			"Magische Gewandtheit"
		],
		variants: []
	},
	{
		id: "laneshi",
		name: "Laneshi",
		description: "Eine amphibische und geistig begabte Herkunft, die in Wasser ebenso sicher lebt wie an Land.",
		size: "medium",
		speed: 9,
		darkvision: 18,
		languages: [],
		abilityBonuses: {},
		traits: [
			"9 m Schwimmbewegung",
			"Erwachter Geist",
			"Psychischer Geist",
			"Amphibisch",
			"Dunkelsicht",
			"Schwimmer",
			"Tierfreund",
			"Magische Gewandtheit",
			"Stimme der Natur"
		],
		variants: []
	},
	{
		id: "ogresh",
		name: "Ogresh",
		description: "Eine seltene und kräftige Herkunft mit natürlicher Wachsamkeit, taktischer Einsicht und eindrucksvoller Präsenz.",
		size: "medium",
		speed: 9,
		languages: [],
		abilityBonuses: {},
		traits: [
			"Feind in Bewegung",
			"Fokussierter Geist",
			"Umgebungsbewusstsein",
			"Natürliche Bewegung",
			"Kräftiger Körperbau",
			"Berechnender Zuhörer",
			"Gebietende Einsicht",
			"Überzeugendes Talent"
		],
		variants: []
	},
	{
		id: "cursed",
		name: "Verfluchter",
		description: "Eine einzigartige, von einem Fluch geformte Herkunft, deren Eigenschaften vollständig individuell zusammengestellt werden.",
		size: "medium",
		speed: 9,
		languages: [],
		abilityBonuses: {},
		traits: ["Freie Auswahl von acht Herkunftseigenschaften"],
		variants: []
	},
	{
		id: "awakened",
		name: "Erweckter",
		description: "Eine künstlich erschaffene und kaum alternde Herkunft, deren Körper nicht den üblichen Grenzen sterblicher Wesen folgt.",
		size: "medium",
		speed: 9,
		languages: [],
		abilityBonuses: {},
		traits: [
			"Magische Befestigung",
			"Hartnäckig",
			"Zähigkeit",
			"Künstliche Gestalt",
			"An die Elemente gewöhnt",
			"Die Vergangenheit annehmen",
			"Magische Einsicht",
			"Unnatürlicher Heiler"
		],
		variants: []
	},
	{
		id: "dhampir",
		name: "Dhampir",
		description: "Eine vom Vampirismus berührte Herkunft mit unnatürlichem Hunger, körperlicher Kraft und zeitloser Erscheinung.",
		size: "medium",
		speed: 9,
		darkvision: 18,
		languages: [],
		abilityBonuses: {},
		traits: [
			"Altert nicht",
			"Entziehender Angriff",
			"Natürlicher Angriff: Fänge",
			"Gut geschützt",
			"Kletterer",
			"Dunkelsicht",
			"Eifriger Täuscher",
			"Magisches Ausnahmetalent",
			"Magische Gewandtheit"
		],
		variants: []
	},
	{
		id: "disembodied",
		name: "Körperloser",
		description: "Eine teilweise aus der materiellen Welt gelöste Herkunft, die zwischen körperlicher und ätherischer Existenz schwankt.",
		size: "medium",
		speed: 9,
		languages: [],
		abilityBonuses: {},
		traits: [
			"Magische Befestigung",
			"Meister der Ablenkung",
			"Phasenverschoben",
			"Ätherisches Verblassen",
			"An die Elemente gewöhnt",
			"Magische Einsicht",
			"Magisches Ausnahmetalent",
			"Magische Gewandtheit"
		],
		variants: []
	},
	{
		id: "fallen",
		name: "Gefallener",
		description: "Eine langlebige, von himmlischer oder göttlicher Macht gezeichnete Herkunft zwischen Gnade, Pflicht und Verderbnis.",
		size: "medium",
		speed: 9,
		languages: [],
		abilityBonuses: {},
		traits: [
			"Sehr langlebig",
			"Göttliche Sangromantie",
			"Berührung des Lebens",
			"An die Elemente gewöhnt",
			"Meditative Ruhe",
			"Unermüdlich",
			"Magisches Ausnahmetalent",
			"Magische Gewandtheit",
			"Vom Glauben bewegt"
		],
		variants: []
	},
	{
		id: "changeling",
		name: "Wechselkind",
		description: "Eine kleine, künstliche und kaum alternde Herkunft mit ausgeprägter Begabung für Illusion, Täuschung und Anpassung.",
		size: "small",
		speed: 9,
		languages: [],
		abilityBonuses: {},
		traits: [
			"Künstlicher Körper",
			"Altert kaum",
			"Kreaturendeckung",
			"Magische Befestigung",
			"Künstliche Gestalt",
			"Helfende Hand",
			"Hindurchschlüpfen",
			"Magisches Ausnahmetalent",
			"Magische Gewandtheit",
			"Intuitiver Akrobat"
		],
		variants: []
	},
	{
		id: "wulven",
		name: "Wulven",
		description: "Eine wolfsähnliche Herkunft mit scharfen Sinnen, natürlicher Bewaffnung und starkem Rudelinstinkt.",
		size: "medium",
		speed: 9,
		languages: [],
		abilityBonuses: {},
		traits: [
			"Jägerinstinkt",
			"Natürlicher Angriff: Klauen",
			"Rudeljäger",
			"Geschwindigkeitsschub",
			"Kletterer",
			"Athletengeist",
			"Angeborene Wahrnehmung",
			"Stimme der Natur"
		],
		variants: []
	},
	{
		id: "custom",
		name: "Eigene Abstammung",
		description: "Eine frei definierbare Abstammung ohne automatisch vorgegebene Regelwerte.",
		size: "medium",
		speed: 9,
		languages: [],
		abilityBonuses: {},
		traits: [],
		variants: []
	}
];
//#endregion
//#region src/compendium/ancestries/ancestryTraits.ts
var repeatableTraits = {
	"craft-focus": {
		maxSelections: 2,
		secondSelectionName: "Handwerkliche Expertise"
	},
	"breath-weapon": {
		maxSelections: 2,
		secondSelectionName: "Verbesserte Atemwaffe"
	},
	centered: {
		maxSelections: 2,
		secondSelectionName: "Fokussierter Vorteil"
	},
	climber: {
		maxSelections: 2,
		secondSelectionName: "Verbesserter Kletterer"
	},
	"damage-resistance": {
		maxSelections: 2,
		secondSelectionName: "Weitere Schadensresistenz"
	},
	"hunter-instinct": {
		maxSelections: 2,
		secondSelectionName: "Unnachgiebiger Instinkt"
	},
	"larger-target": {
		maxSelections: 2,
		secondSelectionName: "Noch größer"
	},
	"light-armor-training": {
		maxSelections: 2,
		secondSelectionName: "Leichte Rüstungsexpertise"
	},
	lucky: {
		maxSelections: 2,
		secondSelectionName: "Meister des Glücks"
	},
	"magical-fortification": {
		maxSelections: 2,
		secondSelectionName: "Erweiterte Befestigung"
	},
	"magical-aptitude": {
		maxSelections: 2,
		secondSelectionName: "Magisches Ausnahmetalent"
	},
	"master-of-distraction": {
		maxSelections: 2,
		secondSelectionName: "Behindernde Ablenkung"
	},
	"medium-armor-training": {
		maxSelections: 2,
		secondSelectionName: "Schwere Rüstungsausbildung"
	},
	"menacing-roar": {
		maxSelections: 2,
		secondSelectionName: "Unvergleichliches Brüllen"
	},
	"natural-attack": {
		maxSelections: 2,
		secondSelectionName: "Verbesserter natürlicher Angriff"
	},
	"powerful-build": {
		maxSelections: 2,
		secondSelectionName: "Verbesserter kräftiger Körperbau"
	},
	"supple-squeeze": {
		maxSelections: 2,
		secondSelectionName: "Zwängen mit voller Geschwindigkeit"
	},
	swimmer: {
		maxSelections: 2,
		secondSelectionName: "Beschleunigtes Schwimmen"
	},
	tenacious: {
		maxSelections: 2,
		secondSelectionName: "Schwer zu töten"
	},
	tireless: {
		maxSelections: 2,
		secondSelectionName: "Kraftvoll"
	},
	toughness: {
		maxSelections: 2,
		secondSelectionName: "Besonders zäh"
	},
	"well-protected": {
		maxSelections: 2,
		secondSelectionName: "Schützende Deckung"
	}
};
var traitDescriptions = {
	amphibious: "Die Figur kann sowohl in Luft als auch unter Wasser atmen.",
	"artificial-form": "Der Körper besitzt Vorteile einer künstlich erschaffenen Gestalt.",
	"craft-focus": "Gewährt Kenntnisse und Spezialisierung in einem gewählten Handwerk.",
	"awakened-mind": "Verleiht eine geistig oder telepathisch geprägte Fähigkeit.",
	"breath-weapon": "Gewährt einen skalierenden Flächenangriff mit einer gewählten Schadensart.",
	climber: "Verbessert das Klettern oder gewährt eine Kletterbewegung.",
	"creature-cover": "Eine kleine Figur kann größere Kreaturen taktisch als Deckung nutzen.",
	"damage-resistance": "Gewährt Resistenz gegen eine bei der Auswahl festgelegte Schadensart.",
	darkvision: "Ermöglicht das Sehen in Dunkelheit.",
	"draining-attack": "Ein Angriff kann Lebenskraft entziehen und die eigene Figur stärken.",
	"helping-hand": "Verbessert Unterstützung und Zusammenarbeit mit anderen.",
	"elemental-acclimation": "Erhöht die Widerstandskraft gegen Umwelt- und Wettergefahren.",
	lucky: "Kann besonders schlechte oder misslungene Würfe situationsabhängig abfangen.",
	"magical-fortification": "Verbessert die Verteidigung gegen Magie.",
	"magical-aptitude": "Gewährt einen ausgewählten Zaubertrick.",
	"magical-prodigy": "Gewährt begrenzten Zugang zu einem Zauber des 1. Grades.",
	"meditative-rest": "Ersetzt normalen Schlaf teilweise durch meditative Erholung.",
	"natural-attack": "Gewährt eine natürliche Waffe wie Klauen oder Fänge.",
	"natural-movement": "Gewährt oder verbessert eine besondere natürliche Bewegungsart.",
	"powerful-build": "Die Figur gilt für Traglast und bewegbares Gewicht als größer.",
	swimmer: "Verbessert Bewegung und Handlungsfähigkeit unter Wasser.",
	tenacious: "Verbessert Todesrettungswürfe und die Widerstandskraft an der Schwelle des Todes.",
	tireless: "Verbessert Erholung und den Umgang mit Erschöpfung.",
	toughness: "Erhöht das Trefferpunktmaximum und skaliert mit der Charakterstufe.",
	"weapon-aptitude": "Gewährt oder verbessert den Umgang mit ausgewählten Waffen.",
	"well-protected": "Gewährt eine alternative ungerüstete Rüstungsklasse."
};
var combatTraitSeeds = [
	["animal-friend", "Tierfreund"],
	["impressive-critical-hit", "Beeindruckender kritischer Treffer"],
	["awakened-mind", "Erwachter Geist"],
	["battlefield-control", "Schlachtfeldkontrolle"],
	["brave", "Tapfer"],
	["breath-weapon", "Atemwaffe"],
	["centered", "Zentriert"],
	["charging-assault", "Sturmangriff"],
	["creature-cover", "Kreaturendeckung"],
	["damage-resistance", "Schadensresistenz"],
	["divine-sangromancy", "Göttliche Sangromantie"],
	["draining-attack", "Entziehender Angriff"],
	["moving-enemy", "Feind in Bewegung"],
	["first-strike", "Erstschlag"],
	["focused-mind", "Fokussierter Geist"],
	["hunter-instinct", "Jägerinstinkt"],
	["larger-target", "Größeres Ziel"],
	["light-armor-training", "Leichte Rüstungsausbildung"],
	["lucky", "Glücklich"],
	["magical-fortification", "Magische Befestigung"],
	["master-of-distraction", "Meister der Ablenkung"],
	["medium-armor-training", "Mittlere Rüstungsausbildung"],
	["menacing-roar", "Bedrohliches Brüllen"],
	["natural-attack", "Natürlicher Angriff"],
	["phase-shifted", "Phasenverschoben"],
	["pack-hunter", "Rudeljäger"],
	["pack-tactics", "Rudeltaktik"],
	["personal-bastion", "Persönliche Bastion"],
	["psychic-mind", "Psychischer Geist"],
	["quick-initiative", "Schnelle Initiative"],
	["quick-escape", "Schnelles Entwischen"],
	["reckless-reaction", "Rücksichtslose Reaktion"],
	["skirmish-tactics", "Plänkeltaktik"],
	["slippery", "Schlüpfrig"],
	["steadfast-reserves", "Standhafte Reserven"],
	["tenacious", "Hartnäckig"],
	["touch-of-life", "Berührung des Lebens"],
	["toughness", "Zähigkeit"],
	["unrestrained", "Ungehemmt"],
	["weapon-aptitude", "Waffenbegabung"],
	["well-protected", "Gut geschützt"]
];
var explorationTraitSeeds = [
	["amphibious", "Amphibisch"],
	["artifice-expertise", "Kunstfertigkeits-Expertise"],
	["artificial-form", "Künstliche Gestalt"],
	["speed-burst", "Geschwindigkeitsschub"],
	["climber", "Kletterer"],
	["darkvision", "Dunkelsicht"],
	["driver", "Fahrer"],
	["environmental-awareness", "Umgebungsbewusstsein"],
	["ethereal-fading", "Ätherisches Verblassen"],
	["fading", "Verblassen"],
	["fleet-footed", "Flinkfüßig"],
	["helping-hand", "Helfende Hand"],
	["hold-breath", "Luft anhalten"],
	["innate-orientation", "Angeborene Orientierung"],
	["elemental-acclimation", "An die Elemente gewöhnt"],
	["indomitable-sight", "Unbezwingbare Sicht"],
	["meditative-rest", "Meditative Ruhe"],
	["natural-camouflage", "Natürliche Tarnung"],
	["natural-movement", "Natürliche Bewegung"],
	["slip-through", "Hindurchschlüpfen"],
	["poison-resilience", "Giftzähigkeit"],
	["power-sleep", "Kraftschlaf"],
	["powerful-build", "Kräftiger Körperbau"],
	["resilient-ears", "Widerstandsfähige Ohren"],
	["veil-of-the-wild", "Schleier der Wildnis"],
	["standing-jump", "Sprung aus dem Stand"],
	["steadfast", "Standfest"],
	["supple-squeeze", "Geschmeidiges Zwängen"],
	["swimmer", "Schwimmer"],
	["tireless", "Unermüdlich"]
];
var roleplayTraitSeeds = [
	["craft-focus", "Handwerklicher Schwerpunkt"],
	["athletic-spirit", "Athletengeist"],
	["calculating-listener", "Berechnender Zuhörer"],
	["commanding-insight", "Gebietende Einsicht"],
	["connection-to-nature", "Verbindung zur Natur"],
	["craftsmans-eye", "Auge des Handwerkers"],
	["dreamwalking", "Traumwandeln"],
	["eager-deceiver", "Eifriger Täuscher"],
	["embrace-the-past", "Die Vergangenheit annehmen"],
	["firm-influence", "Fester Einfluss"],
	["gifted-artist", "Begabter Künstler"],
	["spontaneous-craftsman", "Spontaner Handwerker"],
	["improviser", "Improvisator"],
	["innate-perception", "Angeborene Wahrnehmung"],
	["instrumentalist", "Instrumentalist"],
	["intuitive-acrobat", "Intuitiver Akrobat"],
	["astute-survivor", "Scharfsinniger Überlebender"],
	["magical-insight", "Magische Einsicht"],
	["magical-prodigy", "Magisches Ausnahmetalent"],
	["magical-aptitude", "Magische Gewandtheit"],
	["masterful-aptitude", "Meisterhafte Begabung"],
	["mindful-investigator", "Achtsamer Ermittler"],
	["moved-by-faith", "Vom Glauben bewegt"],
	["voice-of-nature", "Stimme der Natur"],
	["nimble-movements", "Flinke Bewegungen"],
	["persuasive-talent", "Überzeugendes Talent"],
	["skill-prowess", "Fertigkeitskönnen"],
	["unnatural-healer", "Unnatürlicher Heiler"]
];
[
	...createTraitDefinitions("combat", combatTraitSeeds),
	...createTraitDefinitions("exploration", explorationTraitSeeds),
	...createTraitDefinitions("roleplay", roleplayTraitSeeds)
];
function createTraitDefinitions(category, seeds) {
	return seeds.map(([id, name]) => {
		const repeatable = repeatableTraits[id];
		return {
			id,
			name,
			description: traitDescriptions[id] ?? getDefaultDescription(category),
			source: "grim-hollow",
			sourcePage: 30,
			category,
			maxSelections: repeatable?.maxSelections ?? 1,
			secondSelectionName: repeatable?.secondSelectionName
		};
	});
}
function getDefaultDescription(category) {
	switch (category) {
		case "combat": return "Eine Herkunftseigenschaft für Angriff, Verteidigung oder Widerstandskraft.";
		case "exploration": return "Eine Herkunftseigenschaft für Bewegung, Wahrnehmung, Reisen oder Umweltinteraktion.";
		case "roleplay": return "Eine Herkunftseigenschaft für Fertigkeiten, Werkzeuge, soziale Interaktion oder Magie.";
	}
}
//#endregion
//#region src/compendium/transformations/transformations.ts
function feature(id, name, description, kind, sourcePage, prerequisites) {
	return {
		id,
		name,
		description,
		source: "grim-hollow",
		sourcePage,
		kind,
		prerequisites
	};
}
var transformations = [
	{
		id: "aberrant-horror",
		name: "Aberranter Schrecken",
		description: "Eine fremdartige Wandlung, bei der Körper und Geist durch unnatürliche Mutationen, Tentakel und instabile Existenz verändert werden.",
		source: "grim-hollow",
		sourcePage: 134,
		tags: [
			"aberration",
			"mutation",
			"tentacles"
		],
		theme: "Mutation, Fremdartigkeit und körperliche Instabilität",
		origin: "Kontakt mit einer aberranten Macht, einem fremdartigen Parasiten oder einer entstellenden magischen Kraft.",
		stages: [
			{
				stage: 1,
				title: "Aberrantes Erwachen",
				description: "Die Figur wird zu einer teilweise aberranten Kreatur und entwickelt ihre erste körperliche Mutation.",
				automaticFeatures: [feature("aberrant-horror-aberrant-form", "Aberrante Gestalt", "Die Figur erhält Aberration als zusätzlichen Kreaturentyp und kann eine veränderliche, fremdartige Kampfgestalt offenbaren.", "passive", 134)],
				boons: [feature("aberrant-horror-aberrant-mutation", "Aberrante Mutation", "Wähle eine körperliche Mutation, die Bewegung, natürliche Angriffe oder Verteidigung auf besondere Weise verbessert.", "benefit", 134)],
				flaws: [feature("aberrant-horror-unstable-form", "Instabile Gestalt", "Nach besonders gefährlichen Abenteuertagen kann der Körper unkontrolliert mutieren und einen zufälligen Instabilitätseffekt entwickeln.", "drawback", 135)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 2,
				title: "Tödliche Anpassung",
				description: "Die Mutation entwickelt sich zu einer effizienteren und kontrollierenden Kampfgestalt.",
				boons: [feature("aberrant-horror-efficient-killer", "Effizienter Killer", "Natürliche Waffen und Angriffe gegen verwundete Ziele werden gefährlicher.", "passive", 135), feature("aberrant-horror-writhing-tentacles", "Sich windende Tentakel", "Tentakel erweitern Reichweite und ermöglichen zusätzliche Kontrolle, Manipulation oder Greifmöglichkeiten.", "action", 135)],
				flaws: [feature("aberrant-horror-hideous-appearance", "Abscheuliches Aussehen", "Die körperliche Veränderung ist kaum noch zu verbergen und erschwert viele soziale Begegnungen.", "drawback", 135)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 3,
				title: "Instabile Existenz",
				description: "Die Figur ist kaum noch vollständig an ihre ursprüngliche Form oder die materielle Wirklichkeit gebunden.",
				boons: [feature("aberrant-horror-terrifying-visage", "Furchterregendes Antlitz", "Die aberrante Gestalt kann Gegner mit einem übernatürlich schrecklichen Anblick in Furcht versetzen.", "action", 136), feature("aberrant-horror-constricting-tentacles", "Einengende Tentakel", "Tentakel können Ziele stärker festsetzen, würgen und in ihrer Bewegung kontrollieren.", "action", 136)],
				flaws: [feature("aberrant-horror-unstable-existence", "Instabile Existenz", "Die Realität hält den mutierten Körper nur noch unzuverlässig zusammen und verursacht zusätzliche Instabilitätseffekte.", "drawback", 136)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 4,
				title: "Entropische Abscheulichkeit",
				description: "Die Wandlung erreicht eine mächtige, endgültige und kaum kontrollierbare aberrante Form.",
				boons: [feature("aberrant-horror-uncanny-aberration", "Unheimliche Aberration", "Die endgültige Aberrationsgestalt verleiht überragende körperliche und übernatürliche Fähigkeiten.", "passive", 137), feature("aberrant-horror-venomous-tentacles", "Giftige Tentakel", "Tentakelangriffe übertragen eine gefährliche Giftwirkung.", "passive", 137)],
				flaws: [feature("aberrant-horror-entropic-abomination", "Entropische Abscheulichkeit", "Die bloße Existenz der Figur wird zerstörerisch, unnatürlich und schwer kontrollierbar.", "drawback", 137)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			}
		]
	},
	{
		id: "fey",
		name: "Feenwesen",
		description: "Eine Wandlung durch die Macht der Feenwelt, geprägt von Verzauberung, Illusion und der Bindung an einen der vier Höfe.",
		source: "grim-hollow",
		sourcePage: 138,
		tags: [
			"fey",
			"illusion",
			"enchantment"
		],
		theme: "Feenmagie, Jahreszeiten und fremdartige Schönheit",
		origin: "Ein Feenpakt, ein Aufenthalt in der Feenwelt oder die Gunst beziehungsweise Forderung einer mächtigen Feenherrscherin.",
		stages: [
			{
				stage: 1,
				title: "Diener eines Feenhofes",
				description: "Die Figur erhält eine Feengestalt und bindet sich an den Frühlings-, Sommer-, Herbst- oder Winterhof.",
				automaticFeatures: [feature("fey-fey-form", "Feengestalt", "Die Figur erhält Feenwesen als zusätzlichen Kreaturentyp und entwickelt erkennbare übernatürliche Merkmale.", "passive", 138)],
				boons: [
					feature("fey-spring-court-servant", "Diener des Frühlingshofes", "Die Wandlung wird durch Wachstum, Erneuerung und frühlingshafte Magie geprägt.", "benefit", 138),
					feature("fey-summer-court-servant", "Diener des Sommerhofes", "Die Wandlung wird durch Hitze, Leidenschaft und sommerliche Macht geprägt.", "benefit", 138),
					feature("fey-autumn-court-servant", "Diener des Herbsthofes", "Die Wandlung wird durch Wandel, Verfall und herbstliche Magie geprägt.", "benefit", 138),
					feature("fey-winter-court-servant", "Diener des Winterhofes", "Die Wandlung wird durch Kälte, Stille und winterliche Magie geprägt.", "benefit", 138)
				],
				flaws: [feature("fey-planar-binding", "Ebenenbindung", "Die Figur ist an die Feenwelt gebunden; Bannung, Ebenenwechsel und bestimmte magische Orte können besondere Folgen haben.", "drawback", 139)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 2,
				title: "Feenhafte Täuschung",
				description: "Die Verbindung zur Feenwelt stärkt Gestaltwandel, Täuschung und spontane Magie.",
				boons: [feature("fey-two-faced", "Doppelgesichtig", "Die Figur kann zwischen sterblichem und feenhaftem Auftreten wechseln und andere leichter über ihre wahre Natur täuschen.", "passive", 139), feature("fey-magical-tricks", "Magische Tricks", "Die Figur erhält zusätzliche feenhafte Zauber und magische Kunststücke.", "action", 139)],
				flaws: [feature("fey-command-of-the-queen", "Befehl der Königin", "Die Herrscherin des gewählten Hofes kann Dienste, Aufgaben und Gehorsam verlangen.", "drawback", 139)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 3,
				title: "Kind der Anderswelt",
				description: "Illusion, Traum und natürliche Wildheit prägen die weiterentwickelte Feengestalt.",
				boons: [
					feature("fey-cloak-of-illusion", "Illusionsmantel", "Eine starke Illusions- und Tarnwirkung verschleiert Gestalt und Position.", "action", 140),
					feature("fey-tooth-and-claw", "Zahn und Klaue", "Die feenhafte Gestalt entwickelt gefährlichere offensive Eigenschaften.", "passive", 140),
					feature("fey-dreams-and-nightmares", "Träume und Albträume", "Die Figur kann Schlaf, Träume und Furcht anderer Wesen beeinflussen.", "action", 140)
				],
				flaws: [feature("fey-weakened-constitution", "Geschwächte Konstitution", "Die Feennatur macht den Körper gegenüber bestimmten sterblichen Belastungen und Einflüssen anfälliger.", "drawback", 140)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 4,
				title: "Vollendetes Feenwesen",
				description: "Die Figur wird zu einer mächtigen Verkörperung ihres Hofes und der Feenwelt.",
				boons: [feature("fey-greater-magical-tricks", "Größere magische Tricks", "Die feenhafte Magie wird mächtiger und eröffnet stärkere übernatürliche Effekte.", "action", 141), feature("fey-twilight-enchantment", "Zwielicht-Verzauberung", "Die Figur erhält mächtige Glamour-, Schutz- und Täuschungsmagie.", "action", 141)],
				flaws: [feature("fey-seasonally-influenced", "Saisonal beeinflusst", "Stimmung, Verhalten und Kräfte werden zunehmend vom gewählten Hof und seiner Jahreszeit bestimmt.", "drawback", 141)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			}
		]
	},
	{
		id: "fiend",
		name: "Unhold",
		description: "Eine infernalische oder abyssale Wandlung, die Macht durch Verderbnis, Brandzeichen und bindende Verträge verleiht.",
		source: "grim-hollow",
		sourcePage: 142,
		tags: [
			"fiend",
			"infernal",
			"contracts"
		],
		theme: "Verderbnis, Verträge und höllische Macht",
		origin: "Ein Pakt, eine verfluchte Blutlinie oder die direkte Bindung an eine infernalische beziehungsweise abyssale Macht.",
		stages: [
			{
				stage: 1,
				title: "Unholdseele",
				description: "Die Seele wird mit unheiligen Kräften verbunden und entwickelt ihre erste infernalische Spezialisierung.",
				automaticFeatures: [feature("fiend-fiendish-soul", "Unholdseele", "Die Figur erhält übernatürliche, unheilige Widerstandskraft.", "passive", 142)],
				boons: [feature("fiend-infernal-strike", "Infernalischer Schlag", "Angriffe können durch infernalische oder abyssale Energie zusätzlichen Schaden verursachen.", "action", 142), feature("fiend-devilish-contract-partner", "Teuflischer Vertragspartner", "Die Figur kann bindende übernatürliche Verträge schließen.", "action", 142)],
				flaws: [feature("fiend-bound-to-the-fiend", "An den Unhold gebunden", "Seele und Macht bleiben an eine infernalische Quelle, einen Meister oder eine Verpflichtung gekettet.", "drawback", 143)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 2,
				title: "Zeichen der Verdammnis",
				description: "Brandzeichen und Verträge erhalten größere Macht und hinterlassen deutlichere körperliche Spuren.",
				boons: [feature("fiend-demonic-brand", "Dämonisches Brandzeichen", "Ein Ziel kann mit einem unheiligen Brandzeichen belegt werden, das zusätzliche Effekte ermöglicht.", "action", 143), feature("fiend-improved-contract", "Verbesserter Vertrag", "Übernatürliche Verträge werden mächtiger und schwerer zu umgehen.", "passive", 143)],
				flaws: [feature("fiend-fiendish-form", "Unholdgestalt", "Offensichtliche körperliche Zeichen der Verderbnis erschweren den Umgang mit Sterblichen.", "drawback", 143)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 3,
				title: "Sog der Unterwelt",
				description: "Die Figur verteilt infernalische Macht oder überwältigt gebrandmarkte Ziele.",
				boons: [feature("fiend-devilish-subcontractor", "Teuflischer Untervertragspartner", "Die Figur kann Macht über weitere Abmachungen verteilen oder für sich nutzen.", "action", 144), feature("fiend-overwhelming-brand", "Überwältigendes Brandzeichen", "Das Brandzeichen erhält stärkere Schadens- oder Kontrolleffekte.", "passive", 144)],
				flaws: [feature("fiend-pull-of-the-underworld", "Sog der Unterwelt", "Die Unterwelt fordert die Figur immer stärker und beeinflusst Verhalten, Ziele oder Schicksal.", "drawback", 144)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 4,
				title: "Vollendeter Unhold",
				description: "Die Figur erreicht eine nahezu vollständige infernalische oder abyssale Gestalt.",
				boons: [
					feature("fiend-abyssal-resistance", "Abyssische Resistenz", "Die Figur erhält mächtige Widerstandskraft gegen zerstörerische Einflüsse.", "passive", 145),
					feature("fiend-infernal-summoning", "Infernalische Beschwörung", "Die Figur kann infernalische oder abyssale Wesen beziehungsweise Kräfte herbeirufen.", "action", 145),
					feature("fiend-ultimate-brand", "Ultimatives Brandzeichen", "Das unheilige Brandzeichen erreicht seine mächtigste Form.", "action", 145)
				],
				flaws: [feature("fiend-true-name", "Wahrer Name", "Wer den wahren Namen der Figur kennt, erhält gefährlichen Einfluss auf sie.", "drawback", 145)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			}
		]
	},
	{
		id: "hag",
		name: "Vettel",
		description: "Eine hexenhafte Wandlung, die Flüche, groteske Gestalt und die Magie einer Schwesternschaft verbindet.",
		source: "grim-hollow",
		sourcePage: 146,
		tags: [
			"hag",
			"curse",
			"witchcraft"
		],
		theme: "Flüche, Schwesternschaften und grausame Hexenmagie",
		origin: "Ein Hexenfluch, ein Pakt mit einem Zirkel oder die schrittweise Übernahme durch eine uralte Vettel.",
		stages: [
			{
				stage: 1,
				title: "Schwesternschaft",
				description: "Die Figur entwickelt eine Vettelgestalt und bindet sich an eine grüne, rote oder maritime Schwesternschaft.",
				automaticFeatures: [feature("hag-hag-form", "Vettelgestalt", "Die Figur entwickelt eine groteske, übernatürlich hexenhafte Gestalt.", "passive", 146)],
				boons: [
					feature("hag-green-sisterhood", "Grüne Schwesternschaft", "Die Wandlung konzentriert sich auf Gift, Natur und verderbte Wildnis.", "benefit", 146),
					feature("hag-red-sisterhood", "Rote Schwesternschaft", "Die Wandlung konzentriert sich auf Blut, Schmerz und Gewalt.", "benefit", 146),
					feature("hag-sea-sisterhood", "Meerschwesternschaft", "Die Wandlung konzentriert sich auf Wasser, Sturm und die Tiefe.", "benefit", 146)
				],
				flaws: [feature("hag-hideous-appearance", "Abscheuliches Aussehen", "Die groteske körperliche Veränderung ist gesellschaftlich belastend und schwer zu verbergen.", "drawback", 147)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 2,
				title: "Adeptin der Schwesternschaft",
				description: "Die gewählte Schwesternschaft verleiht eine fortgeschrittene Spezialisierung.",
				boons: [
					feature("hag-green-sisterhood-adept", "Adeptin der grünen Schwesternschaft", "Gift- und Naturkräfte der grünen Linie werden verstärkt.", "benefit", 147, ["hag-green-sisterhood"]),
					feature("hag-red-sisterhood-adept", "Adeptin der roten Schwesternschaft", "Blut- und Gewaltkräfte der roten Linie werden verstärkt.", "benefit", 147, ["hag-red-sisterhood"]),
					feature("hag-sea-sisterhood-adept", "Adeptin der Meerschwesternschaft", "Wasser- und Sturmkräfte der maritimen Linie werden verstärkt.", "benefit", 147, ["hag-sea-sisterhood"])
				],
				flaws: [feature("hag-iron-sensitivity", "Eisenempfindlichkeit", "Eisen- und Stahlwaffen verursachen besondere Schmerzen oder zusätzliche Einschränkungen.", "drawback", 147)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 3,
				title: "Meisterin der Schwesternschaft",
				description: "Die Figur erreicht die höchste Spezialisierung ihrer gewählten Schwesternschaft.",
				boons: [
					feature("hag-green-sisterhood-master", "Meisterin der grünen Schwesternschaft", "Die grüne Linie erreicht ihre höchste Spezialisierung.", "benefit", 148, ["hag-green-sisterhood-adept"]),
					feature("hag-red-sisterhood-master", "Meisterin der roten Schwesternschaft", "Die rote Linie erreicht ihre höchste Spezialisierung.", "benefit", 148, ["hag-red-sisterhood-adept"]),
					feature("hag-sea-sisterhood-master", "Meisterin der Meerschwesternschaft", "Die maritime Linie erreicht ihre höchste Spezialisierung.", "benefit", 148, ["hag-sea-sisterhood-adept"])
				],
				flaws: [feature("hag-pain-of-purity", "Schmerz der Reinheit", "Aufrichtig gute, geweihte oder reinigende Einflüsse verursachen Schmerz und Einschränkungen.", "drawback", 148)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 4,
				title: "Erzvettel",
				description: "Die Figur erhält mächtige Blick- und Großmutterflüche, muss jedoch einen grausamen Hunger stillen.",
				boons: [feature("hag-evil-eye", "Böser Blick", "Ein mächtiger Blickfluch schwächt oder kontrolliert ein Ziel.", "action", 149), feature("hag-grandmother-curse", "Fluch der Großmutter", "Die Figur kann einen weitreichenden und schwer zu brechenden Fluch wirken.", "action", 149)],
				flaws: [feature("hag-archhag-hunger", "Hunger der Erzvettel", "Die wachsende Vettel verlangt nach bestimmten grausamen Handlungen, Opfern oder Nahrung.", "drawback", 149)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			}
		]
	},
	{
		id: "lich",
		name: "Lich",
		description: "Eine Wandlung in Richtung Untod, Seelenbindung und arkaner Unsterblichkeit.",
		source: "grim-hollow",
		sourcePage: 150,
		tags: [
			"undead",
			"necromancy",
			"soul-vessel"
		],
		theme: "Untod, Seelenmagie und arkane Unsterblichkeit",
		origin: "Ein verbotenes Ritual, ein Seelengefäß oder die bewusste Abkehr vom natürlichen Tod.",
		stages: [
			{
				stage: 1,
				title: "Gebundene Seele",
				description: "Die Figur bindet ihre Existenz an ein Seelengefäß und wählt ihre Form des Lichdoms.",
				automaticFeatures: [feature("lich-undead-form", "Untote Gestalt", "Die Figur erhält untote Eigenschaften und entfernt sich zunehmend von einer sterblichen Existenz.", "passive", 150)],
				boons: [feature("lich-memori-lichdom", "Memori-Lichdom", "Die Wandlung konzentriert sich auf Erinnerung, Wissen und geistige Bewahrung.", "benefit", 150), feature("lich-lich-magica", "Lich Magica", "Die Wandlung konzentriert sich auf Zaubermacht und arkane Vollendung.", "benefit", 150)],
				flaws: [feature("lich-soul-vessel", "Seelengefäß", "Existenz und Wiederkehr sind an ein Gefäß gebunden; Verlust, Zerstörung oder Entladung haben gravierende Folgen.", "drawback", 151)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 2,
				title: "Nekromantische Herrschaft",
				description: "Die Figur vertieft ihre Kontrolle über Untote, Flüche oder verderbende Magie.",
				boons: [
					feature("lich-acolyte-of-the-undead", "Akolyth der Untoten", "Die Verbindung zu Untoten und die Kontrolle über sie werden stärker.", "passive", 151),
					feature("lich-binding-curse", "Bindender Fluch", "Die Figur kann einen einschränkenden und schwer zu lösenden Fluch auferlegen.", "action", 151),
					feature("lich-corrupting-magic", "Verderbende Magie", "Zauber erhalten nekrotische oder korrumpierende Wirkung.", "passive", 151)
				],
				flaws: [feature("lich-hideous-appearance", "Abscheuliches Aussehen", "Die leichenhafte Erscheinung wird zunehmend offensichtlich und schwer zu verbergen.", "drawback", 151)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 3,
				title: "Meister des Untods",
				description: "Konzentration, Heilung durch unheilige Kraft und Kontrolle über Untote erreichen ein neues Niveau.",
				boons: [
					feature("lich-uncanny-concentration", "Unheimliche Konzentration", "Die Konzentration auf Zauber wird erheblich zuverlässiger.", "passive", 152),
					feature("lich-master-of-the-undead", "Meister der Untoten", "Die Figur kontrolliert und stärkt Untote mit größerer Macht.", "passive", 152),
					feature("lich-unholy-healing", "Unheilige Heilung", "Nekrotische oder unheilige Kraft kann zur eigenen Heilung genutzt werden.", "action", 152)
				],
				flaws: [feature("lich-necromantic-dystrophy", "Nekromantische Dystrophie", "Der Körper zerfällt ohne regelmäßige Seelenenergie oder andere unnatürliche Nahrung.", "drawback", 152)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 4,
				title: "Vollendeter Lich",
				description: "Die Figur überwindet ihre sterbliche Existenz und erreicht eine mächtige Form arkanen Untods.",
				boons: [
					feature("lich-soul-shattering-attack", "Seelenerschütternder Angriff", "Ein mächtiger Angriff erschüttert Körper und Seele des Ziels.", "action", 153),
					feature("lich-uncanny-omniscience", "Unheimliche Allwissenheit", "Die Figur erhält außergewöhnlichen Zugriff auf Wissen und Erinnerungen.", "passive", 153),
					feature("lich-lord-of-the-undead", "Herr der Untoten", "Die Figur erreicht die höchste Form der Herrschaft über Untote.", "passive", 153)
				],
				flaws: [feature("lich-weight-of-the-ages", "Gewicht der Zeitalter", "Das hohe Alter zersetzt die Form und verstärkt die Abhängigkeit vom Seelengefäß.", "drawback", 153)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			}
		]
	},
	{
		id: "lycanthrope",
		name: "Lykanthrop",
		description: "Eine tierische Wandlung, die Instinkt, Jagd und den Kampf mit der inneren Bestie verbindet.",
		source: "grim-hollow",
		sourcePage: 154,
		tags: [
			"shapechanger",
			"beast",
			"hunt"
		],
		theme: "Bestie, Jagd und Kontrollverlust",
		origin: "Ein Fluch, eine Verletzung oder eine geerbte Verbindung zu einer lykanthropischen Blutlinie.",
		stages: [
			{
				stage: 1,
				title: "Bestialisches Erwachen",
				description: "Die Figur entwickelt eine Hybridgestalt und bindet sich an die Natur einer Ratte, eines Wolfes oder eines Bären.",
				boons: [
					feature("lycanthrope-rat-hybrid", "Hybridgestalt: Ratte", "Die Hybridgestalt konzentriert sich auf Beweglichkeit, List und schwer fassbare Bewegung.", "benefit", 154),
					feature("lycanthrope-wolf-hybrid", "Hybridgestalt: Wolf", "Die Hybridgestalt konzentriert sich auf Rudeljagd, Sinne und Verfolgung.", "benefit", 154),
					feature("lycanthrope-bear-hybrid", "Hybridgestalt: Bär", "Die Hybridgestalt konzentriert sich auf Kraft, Zähigkeit und rohe Gewalt.", "benefit", 154)
				],
				flaws: [feature("lycanthrope-lust-for-the-hunt", "Lust auf die Jagd", "Blut, verwundete Beute und Jagdsituationen können Kontrollverlust auslösen.", "drawback", 155)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 2,
				title: "Jägergestalt",
				description: "Verfolgung, natürliche Verteidigung oder zusätzliche Gestalten verbessern die Jagdfähigkeit.",
				boons: [
					feature("lycanthrope-hunters-focus", "Jägerfokus", "Die Figur kann Beute besser verfolgen und an ein Ziel gebunden bleiben.", "passive", 155),
					feature("lycanthrope-iron-hide", "Eisenfell", "Die natürliche Verteidigung der Hybridgestalt wird erhöht.", "passive", 155),
					feature("lycanthrope-kindred-form", "Verwandte Gestalt", "Die Figur erhält eine zusätzliche tierische oder humanoide Form.", "action", 155)
				],
				flaws: [feature("lycanthrope-silver-sensitivity", "Silberempfindlichkeit", "Silber umgeht Teile des übernatürlichen Schutzes und verursacht zusätzliche Nachteile.", "drawback", 155)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 3,
				title: "Herrschaft der Bestie",
				description: "Die Hybridgestalt entwickelt stärkere Lebenskraft und gefährlichere natürliche Angriffe.",
				boons: [feature("lycanthrope-bestial-vitality", "Bestialische Lebenskraft", "Die Figur erhält erhöhte Zähigkeit und Regenerationsfähigkeit.", "passive", 156), feature("lycanthrope-shapeshifters-ferocity", "Wildheit des Gestaltwandlers", "Natürliche Angriffe und Verwandlungsfähigkeiten werden stärker.", "passive", 156)],
				flaws: [feature("lycanthrope-frayed-thoughts", "Ausgefranste Gedanken", "Tierische Instinkte stören Konzentration, Vernunft und soziale Kontrolle.", "drawback", 156)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 4,
				title: "Ultimativer Räuber",
				description: "Die Bestie erreicht ihre höchste Form und wird nahezu dauerhaft beherrschbar – bis der Räuber übernimmt.",
				boons: [feature("lycanthrope-hybrid-form-affinity", "Affinität zur Hybridgestalt", "Die Hybridgestalt kann leichter, länger oder zuverlässiger genutzt werden.", "passive", 157), feature("lycanthrope-wild-instincts", "Wilde Instinkte", "Die Figur erhält überragende Sinne und Jagdfähigkeiten.", "passive", 157)],
				flaws: [feature("lycanthrope-ultimate-predator", "Ultimativer Räuber", "Bei Kontrollverlust übernimmt das Raubtier vollständig und gefährdet auch Verbündete.", "drawback", 157)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			}
		]
	},
	{
		id: "ooze",
		name: "Schleimwesen",
		description: "Eine formlose Wandlung, die den Körper verflüssigt und ungewöhnliche Anpassung, Reichweite und Widerstandskraft ermöglicht.",
		source: "grim-hollow",
		sourcePage: 158,
		tags: [
			"ooze",
			"acid",
			"shapeshifting"
		],
		theme: "Formlosigkeit, Anpassung und körperlicher Verfall",
		origin: "Kontakt mit einem alchemistischen Experiment, einem lebenden Schleim oder einer körperauflösenden Magie.",
		stages: [
			{
				stage: 1,
				title: "Instabile Gestalt",
				description: "Die Figur entwickelt eine formlose Schleimgestalt und erste funktionale Anpassungen.",
				automaticFeatures: [feature("ooze-ooze-form", "Schleimgestalt", "Die Figur erhält Schleimwesen als zusätzlichen Kreaturentyp und entwickelt formlose Eigenschaften.", "passive", 158)],
				boons: [feature("ooze-slimy-presence", "Schleimiges Auftreten", "Die formlose Gestalt erleichtert Entkommen, Rutschen und defensive Bewegung.", "passive", 158), feature("ooze-mutable-body", "Veränderlicher Körper", "Die Figur kann ihre Körperform für unterschiedliche Funktionen anpassen.", "action", 158)],
				flaws: [feature("ooze-sluggish", "Träge", "Die zähflüssige Form beeinträchtigt Bewegung oder Reaktionsgeschwindigkeit.", "drawback", 159)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 2,
				title: "Formbare Masse",
				description: "Die Figur streckt Gliedmaßen und absorbiert Schaden durch eine zähflüssige Körperstruktur.",
				boons: [feature("ooze-elastic-limbs", "Elastische Gliedmaßen", "Gliedmaßen erhalten größere Reichweite und flexible Interaktionsmöglichkeiten.", "passive", 159), feature("ooze-viscous-durability", "Zähflüssige Haltbarkeit", "Der formlose Körper kann Schaden besser aufnehmen.", "passive", 159)],
				flaws: [feature("ooze-molten-appearance", "Geschmolzenes Aussehen", "Humanoide Tarnung und soziale Akzeptanz verschlechtern sich deutlich.", "drawback", 159)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 3,
				title: "Lebender Schleim",
				description: "Säure und Verschlingen machen den formbaren Körper zu einer gefährlichen Waffe.",
				boons: [feature("ooze-corrosive-membrane", "Ätzende Membran", "Berührung und Nahkampf können Säureschaden verursachen.", "passive", 160), feature("ooze-engulf", "Verschlingen", "Die Figur kann ein Ziel in ihren Körper aufnehmen und festsetzen.", "action", 160)],
				flaws: [feature("ooze-physical-decay", "Körperlicher Verfall", "Ausrüstung und Körperstruktur leiden unter der schleimigen Form.", "drawback", 160)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 4,
				title: "Vollendetes Schleimwesen",
				description: "Die Figur kann sich aufspalten oder Gegenstände durch formlose Anpassung imitieren.",
				boons: [feature("ooze-ooze-legion", "Schleimlegion", "Die Figur kann Abspaltungen oder mehrere verbundene Schleimkörper erzeugen.", "action", 161), feature("ooze-object-mimicry", "Gegenstand imitieren", "Form und Erscheinung eines Objekts können angenommen werden.", "action", 161)],
				flaws: [feature("ooze-slippery-self", "Schlüpfriges Ich", "Erinnerungen, Identität und Persönlichkeit lösen sich zunehmend auf.", "drawback", 161)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			}
		]
	},
	{
		id: "primordial",
		name: "Urelementar",
		description: "Eine elementare Wandlung, bei der sich die Figur zunehmend mit einer chaotischen Urgewalt verbindet.",
		source: "grim-hollow",
		sourcePage: 162,
		tags: [
			"elemental",
			"aura",
			"primordial"
		],
		theme: "Elementarkraft, Widerstand und chaotische Urgewalten",
		origin: "Die Verschmelzung mit elementarer Energie, ein uraltes Ritual oder die Berührung einer elementaren Machtquelle.",
		stages: [
			{
				stage: 1,
				title: "Elementares Erwachen",
				description: "Die Figur entwickelt eine urelementare Gestalt und bindet sich an eine elementare Affinität.",
				automaticFeatures: [feature("primordial-primordial-form", "Urelementare Gestalt", "Die Figur erhält Elementar als zusätzlichen Kreaturentyp.", "passive", 162)],
				boons: [feature("primordial-elemental-affinity", "Elementare Affinität", "Wähle ein Element, das Resistenz, Angriff und besondere Bewegung der Wandlung prägt.", "benefit", 162)],
				flaws: [feature("primordial-planar-binding", "Ebenenbindung", "Die zugehörige Elementarebene zieht die Figur an sich und beeinflusst Ebenenmagie.", "drawback", 163)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 2,
				title: "Doppelnatur",
				description: "Ein zweites Element oder ein aktiver Elementarausbruch erweitert die Urkraft.",
				boons: [feature("primordial-dual-nature", "Doppelnatur", "Die Figur erhält Zugang zu einem zweiten Element oder einer elementaren Kombination.", "benefit", 163), feature("primordial-elemental-burst", "Elementarer Ausbruch", "Ein aktiver Elementarangriff oder unterstützender Impuls setzt gespeicherte Urkraft frei.", "action", 163)],
				flaws: [feature("primordial-surging-elements", "Wallende Elemente", "Elementare Kräfte brechen ungewollt hervor und beeinflussen Umgebung oder Verbündete.", "drawback", 163)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 3,
				title: "Urzeitlicher Körper",
				description: "Die Figur wird zu einem widerstandsfähigen Kanal verschiedener Elementarkräfte.",
				boons: [
					feature("primordial-ancient-body", "Urzeitlicher Körper", "Der Körper erhält starke elementare Widerstandskraft.", "passive", 164),
					feature("primordial-master-of-many-elements", "Meister vieler Elemente", "Die Auswahl und Beherrschung elementarer Kräfte wird erweitert.", "passive", 164),
					feature("primordial-aura-of-awakening", "Aura des Erwachens", "Die Umgebung wird mit elementarer Kraft erfüllt.", "passive", 164)
				],
				flaws: [feature("primordial-elemental-imbalance", "Elementares Ungleichgewicht", "Gegensätzliche Elemente oder körperliche Bedürfnisse geraten in Konflikt.", "drawback", 164)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 4,
				title: "Urelementares Chaos",
				description: "Die Figur wird zu einer dauerhaften Verkörperung elementarer Urgewalt.",
				boons: [feature("primordial-primordial-aura", "Urelementare Aura", "Eine dauerhafte und mächtige elementare Aura umgibt die Figur.", "passive", 165), feature("primordial-elemental-mastery", "Elementarbeherrschung", "Affinitätskräfte werden stärker und können häufiger genutzt werden.", "passive", 165)],
				flaws: [feature("primordial-primordial-chaos", "Urelementares Chaos", "Rohe Elementarkraft kann unkontrolliert und zerstörerisch hervorbrechen.", "drawback", 165)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			}
		]
	},
	{
		id: "seraph",
		name: "Seraph",
		description: "Eine himmlische Wandlung, die Licht, Flug, Schutz und göttliche Vergeltung verkörpert.",
		source: "grim-hollow",
		sourcePage: 166,
		tags: [
			"celestial",
			"radiant",
			"wings"
		],
		theme: "Licht, Glaube und göttliche Macht",
		origin: "Eine göttliche Berufung, ein himmlischer Segen oder die Berührung einer höheren Macht.",
		stages: [
			{
				stage: 1,
				title: "Himmlisches Erwachen",
				description: "Die Figur erhält eine himmlische Gestalt, Engelsflügel und heilige Angriffe.",
				automaticFeatures: [
					feature("seraph-celestial-form", "Himmlische Gestalt", "Die Figur erhält einen himmlisch geprägten Kreaturentyp und erkennbare göttliche Merkmale.", "passive", 166),
					feature("seraph-angelic-wings", "Engelsflügel", "Die Figur entwickelt Flügel und erhält eine Form des Fluges.", "passive", 166),
					feature("seraph-holy-strikes", "Heilige Schläge", "Angriffe können durch strahlende himmlische Kraft verstärkt werden.", "passive", 166)
				],
				flaws: [feature("seraph-planar-binding", "Ebenenbindung", "Die höhere Ebene und der himmlische Auftrag beanspruchen die Figur.", "drawback", 167)],
				featureSelection: {
					boons: 0,
					flaws: 1
				}
			},
			{
				stage: 2,
				title: "Göttliche Milde",
				description: "Die Figur schützt oder heilt Verbündete und bestraft feindliche Angriffe.",
				boons: [feature("seraph-divine-mercy", "Göttliche Milde", "Die Figur kann Verbündeten Schutz oder Heilung gewähren.", "action", 167), feature("seraph-holy-retribution", "Heilige Vergeltung", "Angriffe gegen die Figur oder ihre Verbündeten können durch heilige Macht bestraft werden.", "reaction", 167)],
				flaws: [feature("seraph-blinding-radiance", "Blendendes Strahlen", "Die wahre Gestalt ist schwer zu verbergen und kann andere Wesen beeinträchtigen.", "drawback", 167)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 3,
				title: "Himmlischer Vollstrecker",
				description: "Reinigung, Schutz und himmlische Bewaffnung erweitern die göttliche Macht.",
				boons: [
					feature("seraph-purify-suffering", "Leiden reinigen", "Die Figur kann Zustände, Leiden oder schädliche Einflüsse entfernen.", "action", 168),
					feature("seraph-protective-wings", "Schützende Flügel", "Flügel können als defensive Reaktion oder schützende Aura eingesetzt werden.", "reaction", 168),
					feature("seraph-bow-of-celestial-judgment", "Bogen des himmlischen Gerichts", "Die Figur erschafft eine himmlische Fernkampfwaffe.", "action", 168)
				],
				flaws: [feature("seraph-beacon-for-darkness", "Leuchtfeuer für die Dunkelheit", "Böse und übernatürliche Mächte können die Figur leichter wahrnehmen und verfolgen.", "drawback", 168)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 4,
				title: "Vollendeter Seraph",
				description: "Die Figur erhält eine mächtige heilige Aura oder die vollendete Form ihrer himmlischen Waffe.",
				boons: [
					feature("seraph-aura-of-holy-purification", "Aura der heiligen Läuterung", "Eine mächtige Aura reinigt und schwächt verderbte Einflüsse.", "passive", 169),
					feature("seraph-aura-of-righteous-grace", "Aura rechtschaffener Gnade", "Eine heilige Aura schützt und stärkt Verbündete.", "passive", 169),
					feature("seraph-bow-of-celestial-dominion", "Bogen himmlischer Herrschaft", "Die himmlische Fernkampfwaffe erreicht ihre vollendete Form.", "action", 169)
				],
				flaws: [feature("seraph-seraphic-corruption", "Seraphische Verderbnis", "Handlungen gegen das himmlische Ideal erzeugen Verderbnis, Schmerz oder Machtverlust.", "drawback", 169)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			}
		]
	},
	{
		id: "shadowsteel-ghoul",
		name: "Schattenstahl-Ghul",
		description: "Eine ghulartige Wandlung durch Schattenstahl, die untote Zähigkeit, Flüche und körperlichen Verfall verbindet.",
		source: "grim-hollow",
		sourcePage: 170,
		tags: [
			"undead",
			"shadowsteel",
			"curse"
		],
		theme: "Untod, Schattenstahl und zehrende Verderbnis",
		origin: "Vergiftung oder Verwundung durch Schattenstahl, ein untotes Ritual oder der Fluch eines ghulartigen Wesens.",
		stages: [
			{
				stage: 1,
				title: "Erwachender Schattenstahl",
				description: "Die Figur bindet eine Waffe an ihre Verderbnis und lernt, Schattenstahlflüche zu verstärken.",
				boons: [feature("shadowsteel-ghoul-shadowsteel-weapon", "Schattenstahlwaffe", "Eine Waffe wird an die Verderbnis der Figur gebunden.", "benefit", 170), feature("shadowsteel-ghoul-shadowsteel-curser", "Schattenstahl-Verflucher", "Die Figur verstärkt Schattenstahlflüche und ihre Auswirkungen.", "passive", 170)],
				flaws: [feature("shadowsteel-ghoul-debilitating-magic", "Schwächende Magie", "Die Nutzung von Schattenstahl entzieht Körper und Seele Kraft.", "drawback", 171)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 2,
				title: "Schattenstahlspezialisierung",
				description: "Die Figur spezialisiert sich auf Magieresistenz, Absorption, Zauberei oder Waffenmeisterschaft.",
				boons: [
					feature("shadowsteel-ghoul-magic-resistance", "Magieresistenz", "Die Figur erhält stärkere Verteidigung gegen Magie.", "passive", 171),
					feature("shadowsteel-ghoul-shadowsteel-absorption", "Schattenstahlabsorption", "Schattenstahlenergie kann aufgenommen oder umgeleitet werden.", "reaction", 171),
					feature("shadowsteel-ghoul-shadowsteel-caster", "Schattenstahlwirker", "Die Figur nutzt Schattenstahl als Quelle oder Verstärker magischer Effekte.", "passive", 171),
					feature("shadowsteel-ghoul-shadowsteel-weapon-master", "Schattenstahl-Waffenmeister", "Die Beherrschung gebundener Schattenstahlwaffen wird deutlich verbessert.", "passive", 171)
				],
				flaws: [feature("shadowsteel-ghoul-friendless", "Freundlos", "Die Figur gilt für viele Humanoide und unterstützende Effekte nicht mehr als normaler Verbündeter.", "drawback", 171)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 3,
				title: "Verfluchte Klaue",
				description: "Die Verderbnis formt einen mächtigen natürlichen Schattenstahlangriff.",
				automaticFeatures: [feature("shadowsteel-ghoul-cursed-claw", "Verfluchte Klaue", "Die Figur erhält einen mächtigen natürlichen Schattenstahlangriff.", "action", 172)],
				flaws: [feature("shadowsteel-ghoul-healing-resistance", "Heilungsresistenz", "Magische und gewöhnliche Heilung wirken vermindert.", "drawback", 172)],
				featureSelection: {
					boons: 0,
					flaws: 1
				}
			},
			{
				stage: 4,
				title: "Schattenstahlzorn",
				description: "Die Figur speichert arkane Energie oder entfesselt einen mächtigen offensiven Endzustand.",
				boons: [feature("shadowsteel-ghoul-arcane-shadowsteel-vessel", "Arkanes Schattenstahlgefäß", "Die Figur kann arkane Energie im Schattenstahl speichern.", "passive", 173), feature("shadowsteel-ghoul-shadowsteel-wrath", "Schattenstahlzorn", "Die Verderbnis wird als mächtiger offensiver Endzustand entfesselt.", "action", 173)],
				flaws: [feature("shadowsteel-ghoul-shadowsteel-explosion", "Schattenstahlexplosion", "Angesammelte Verderbnis kann katastrophal und unkontrolliert freigesetzt werden.", "drawback", 173)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			}
		]
	},
	{
		id: "specter",
		name: "Gespenst",
		description: "Eine geisterhafte Wandlung zwischen Leben, Tod und körperloser Existenz.",
		source: "grim-hollow",
		sourcePage: 174,
		tags: [
			"spirit",
			"ethereal",
			"possession"
		],
		theme: "Tod, Körperlosigkeit und ätherische Existenz",
		origin: "Ein unvollendeter Tod, eine Bindung an einen Ort oder eine starke Verbindung zur Geisterwelt.",
		stages: [
			{
				stage: 1,
				title: "Geisterhafte Spur",
				description: "Die Figur erhält eine spektrale Gestalt, körperlose Bewegung und eine grauenhafte Berührung.",
				automaticFeatures: [
					feature("specter-spectral-form", "Spektrale Gestalt", "Die Figur erhält einen geisterhaften Kreaturentyp und übernatürliche Resistenzen.", "passive", 174),
					feature("specter-incorporeal-movement", "Körperlose Bewegung", "Die Figur kann durch Kreaturen und feste Gegenstände gleiten.", "passive", 174),
					feature("specter-horrifying-touch", "Grauenhafte Berührung", "Die Figur erhält einen geisterhaften Nahkampfangriff.", "action", 174)
				],
				flaws: [feature("specter-drawn-to-darkness", "Von der Dunkelheit angezogen", "Helles Licht und Dunkelheit beeinflussen Bewegung, Ruhe oder Kräfte der Figur.", "drawback", 175)],
				featureSelection: {
					boons: 0,
					flaws: 1
				}
			},
			{
				stage: 2,
				title: "Ätherische Gestalt",
				description: "Die Figur kann zwischen Ebenen wechseln oder ihre Beute fliegend heimsuchen.",
				boons: [feature("specter-ethereal-phasing", "Ätherisches Phasenwandeln", "Die Figur kann zeitweise in die Ätherebene wechseln.", "action", 175), feature("specter-haunting-flight", "Heimsuchender Flug", "Die Figur erhält Flug und verbesserte geisterhafte Verfolgung.", "passive", 175)],
				flaws: [feature("specter-detached-from-life", "Vom Leben gelöst", "Heilung, Nahrung und lebendige Bindungen funktionieren zunehmend schlechter.", "drawback", 175)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 3,
				title: "Zwischen den Welten",
				description: "Die Figur entzieht Lebenskraft beim Durchqueren und kann Ziele mit ihrer Berührung lähmen.",
				boons: [feature("specter-draining-flight", "Entziehender Flug", "Das Durchqueren von Kreaturen kann diese schädigen oder schwächen.", "passive", 176), feature("specter-paralyzing-touch", "Lähmende Berührung", "Die geisterhafte Berührung kann Ziele lähmen.", "action", 176)],
				flaws: [feature("specter-fraying-reality", "Ausfransende Realität", "Die Verbindung zur materiellen Welt wird zunehmend instabil.", "drawback", 176)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 4,
				title: "Sog des Vergessens",
				description: "Die Figur kann Auslöschung herbeirufen oder einen fremden Körper besetzen.",
				boons: [feature("specter-call-of-annihilation", "Ruf der Auslöschung", "Die Figur entfesselt einen mächtigen zerstörerischen Geistereffekt.", "action", 177), feature("specter-possession", "Besessenheit", "Die Figur kann einen fremden Körper kontrollieren.", "action", 177)],
				flaws: [feature("specter-pull-of-oblivion", "Sog des Vergessens", "Die Figur droht endgültig aus der Realität gezogen zu werden.", "drawback", 177)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			}
		]
	},
	{
		id: "vampire",
		name: "Vampir",
		description: "Eine blutgebundene Wandlung, die Hunger, natürliche Waffen und die Macht einer vampirischen Blutlinie vereint.",
		source: "grim-hollow",
		sourcePage: 178,
		tags: [
			"undead",
			"blood",
			"vampire"
		],
		theme: "Blutdurst, Nacht und unnatürliche Unsterblichkeit",
		origin: "Der Biss eines Vampirs, ein Blutritual oder eine verfluchte Blutlinie.",
		stages: [
			{
				stage: 1,
				title: "Blutdurst",
				description: "Die Figur erhält einen Fangbiss und wählt eine vampirische Blutlinie.",
				automaticFeatures: [feature("vampire-fanged-bite", "Fangbiss", "Die Figur erhält einen natürlichen Angriff mit den Fängen und kann über Blutraub Kraft gewinnen.", "action", 178)],
				boons: [
					feature("vampire-strigoi-bloodline", "Strigoi-Blutlinie", "Die Blutlinie konzentriert sich auf körperliche Jagd, Stärke und bestialische Fähigkeiten.", "benefit", 178),
					feature("vampire-soman-bloodline", "Soman-Blutlinie", "Die Blutlinie konzentriert sich auf Magie, Beweglichkeit und übernatürliche Eleganz.", "benefit", 178),
					feature("vampire-fzeg-bloodline", "Fzeg-Blutlinie", "Die Blutlinie konzentriert sich auf Beherrschung, Täuschung und Heimlichkeit.", "benefit", 178)
				],
				flaws: [feature("vampire-sanguine-curse", "Sanguinischer Fluch", "Blutdurst, Sonnenlicht und weitere klassische vampirische Einschränkungen belasten die Figur.", "drawback", 179)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 2,
				title: "Nächtlicher Jäger",
				description: "Die Figur spezialisiert sich auf Nachtsehen, untote Seele, Reflexe oder Widerstandskraft.",
				boons: [
					feature("vampire-eyes-of-the-night", "Augen der Nacht", "Die Sinne der Figur werden an Dunkelheit und nächtliche Jagd angepasst.", "passive", 179),
					feature("vampire-grave-touched-soul", "Grabberührte Seele", "Die untote Natur der Seele wird stärker und widerstandsfähiger.", "passive", 179),
					feature("vampire-inhuman-reflexes", "Unmenschliche Reflexe", "Die Figur reagiert mit übernatürlicher Geschwindigkeit.", "reaction", 179),
					feature("vampire-undead-resilience", "Untote Widerstandskraft", "Die Figur erhält zusätzliche Widerstandskraft einer untoten Kreatur.", "passive", 179)
				],
				flaws: [feature("vampire-greater-sanguine-curse", "Größerer sanguinischer Fluch", "Hunger und vampirische Verwundbarkeiten verschärfen sich.", "drawback", 179)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 3,
				title: "Untoter Adel",
				description: "Der Fangbiss, die Nebelgestalt, Sangromantie oder vampirische Verführung erreichen größere Macht.",
				boons: [
					feature("vampire-improved-fanged-bite", "Verbesserter Fangbiss", "Der natürliche Fangangriff und sein Blutraub werden stärker.", "passive", 180),
					feature("vampire-mist-form", "Nebelgestalt", "Die Figur kann eine schwer greifbare Nebelgestalt annehmen.", "action", 180),
					feature("vampire-sangromancy-specialist", "Sangromantie-Spezialist", "Die Figur spezialisiert sich auf Magie, die Blut als Quelle oder Fokus verwendet.", "passive", 180),
					feature("vampire-seducers-charm", "Charme des Verführers", "Die vampirische Präsenz kann andere Wesen übernatürlich beeinflussen.", "action", 180)
				],
				flaws: [feature("vampire-superior-sanguine-curse", "Überlegener sanguinischer Fluch", "Weitere Tabus sowie stärkere Hunger- und Sonnennachteile treten auf.", "drawback", 180)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			},
			{
				stage: 4,
				title: "Vollendeter Vampir",
				description: "Die Blutlinie erreicht ihre vollendete Gestalt oder entwickelt mächtige Regeneration.",
				boons: [
					feature("vampire-perfected-strigoi-bloodline", "Vollendete Strigoi-Blutlinie", "Die körperlichen und jagdbezogenen Kräfte der Strigoi erreichen ihre höchste Form.", "benefit", 181, ["vampire-strigoi-bloodline"]),
					feature("vampire-perfected-soman-bloodline", "Vollendete Soman-Blutlinie", "Die magischen und beweglichen Kräfte der Soman erreichen ihre höchste Form.", "benefit", 181, ["vampire-soman-bloodline"]),
					feature("vampire-perfected-fzeg-bloodline", "Vollendete Fzeg-Blutlinie", "Die Kräfte der Beherrschung und Heimlichkeit der Fzeg erreichen ihre höchste Form.", "benefit", 181, ["vampire-fzeg-bloodline"]),
					feature("vampire-regeneration", "Regeneration", "Die Figur regeneriert sich mit unnatürlicher Geschwindigkeit, sofern ihre Schwächen dies nicht verhindern.", "passive", 181)
				],
				flaws: [feature("vampire-ultimate-sanguine-curse", "Ultimativer sanguinischer Fluch", "Die Figur ist vollständig an Blutdurst und die endgültigen Schwächen ihrer Art gebunden.", "drawback", 181)],
				featureSelection: {
					boons: 1,
					flaws: 1
				}
			}
		]
	}
];
//#endregion
//#region src/compendium/classes/classes.ts
var classes = [
	{
		id: "barbarian",
		name: "Barbar",
		description: "Ein kompromissloser Frontkämpfer, der rohe Kraft und ungezähmten Zorn in den Kampf trägt.",
		hitDie: 12,
		primaryAbilities: ["strength", "constitution"],
		savingThrows: ["strength", "constitution"],
		armorProficiencies: [
			"Leichte Rüstung",
			"Mittlere Rüstung",
			"Schilde"
		],
		weaponProficiencies: ["Einfache Waffen", "Kriegswaffen"],
		toolProficiencies: [],
		spellcasting: false,
		features: [
			{
				id: "barbarian-rage",
				name: "Kampfrausch",
				description: "Als Bonusaktion verfällst du bis zu 1 Minute in Kampfrausch. Ohne schwere Rüstung erhältst du Vorteil auf Stärkeproben und Stärkerettungswürfe, +2 Schaden mit Nahkampfangriffen über Stärke sowie Resistenz gegen Hieb-, Stich- und Wuchtschaden.",
				level: 1,
				kind: "bonus-action",
				resource: {
					id: "barbarian-rage-uses",
					name: "Kampfrausch",
					amount: {
						kind: "level-table",
						values: {
							1: 2,
							3: 3
						}
					},
					recharge: "long-rest"
				}
			},
			{
				id: "barbarian-unarmored-defense",
				name: "Ungepanzerte Verteidigung",
				description: "Ohne Rüstung beträgt deine RK 10 + GE-Modifikator + KO-Modifikator. Einen Schild kannst du dabei verwenden.",
				level: 1,
				kind: "passive"
			},
			{
				id: "barbarian-reckless-attack",
				name: "Rücksichtsloser Angriff",
				description: "Beim ersten Angriff deines Zuges kannst du rücksichtslos angreifen: Vorteil auf Stärke-basierte Nahkampfangriffe in diesem Zug, dafür haben Angriffe gegen dich bis zu deinem nächsten Zug Vorteil.",
				level: 2,
				kind: "passive"
			},
			{
				id: "barbarian-danger-sense",
				name: "Gefahrengespür",
				description: "Du hast Vorteil auf GE-Rettungswürfe gegen sichtbare Effekte wie Fallen und Zauber, solange du nicht blind, taub oder kampfunfähig bist.",
				level: 2,
				kind: "passive"
			},
			{
				id: "barbarian-primal-path",
				name: "Urpfad",
				description: "Auf Stufe 3 wählst du deinen barbarischen Urpfad. Die konkreten Unterklassenmerkmale werden über die gewählte Unterklasse ergänzt.",
				level: 3,
				kind: "passive"
			}
		],
		subclasses: [
			{
				id: "berserker",
				name: "Berserker",
				description: "Ein Pfad der ungezügelten Gewalt und völligen Hingabe an den Kampfrausch.",
				features: [{
					id: "berserker-1",
					name: "Raserei",
					description: "Im Kampfrausch kannst du Raserei wählen. Ab dem Zug nach Aktivierung darfst du als Bonusaktion einen Nahkampfwaffenangriff ausführen; nach Ende des Kampfrauschs erhältst du eine Stufe Erschöpfung.",
					level: 3,
					kind: "bonus-action"
				}]
			},
			{
				id: "totem-warrior",
				name: "Totemkrieger",
				description: "Ein spiritueller Pfad, der tierische Vorbilder und Ahnenkräfte vereint.",
				features: [{
					id: "totem-warrior-1",
					name: "Geistsucher",
					description: "2014-Unterklassenmerkmal: You gain ritual access to beast sense and speak with animals, representing your bond with nature spirits.",
					level: 3,
					kind: "passive"
				}, {
					id: "totem-warrior-2",
					name: "Totemgeist",
					description: "2014-Unterklassenmerkmal: Choose Bear, Eagle, or Wolf. While raging, your chosen totem grants its level-3 benefit.",
					level: 3,
					kind: "passive"
				}]
			},
			{
				id: "ancestral-guardian",
				name: "Ahnenwächter",
				description: "Ein Krieger, der im Kampf von den Geistern seiner Vorfahren begleitet wird.",
				features: [{
					id: "ancestral-guardian-1",
					name: "Ahnenbeschützer",
					description: "2014-Unterklassenmerkmal: While raging, the first creature you hit on your turn becomes hindered by ancestral spirits: it has disadvantage on attacks against others, and its target gains resistance if such an attack still hits.",
					level: 3,
					kind: "passive"
				}]
			},
			{
				id: "beast",
				name: "Bestie",
				description: "Ein Pfad, auf dem sich der eigene Körper in eine natürliche Waffe verwandelt.",
				features: [{
					id: "beast-1",
					name: "Gestalt der Bestie",
					description: "2014-Unterklassenmerkmal: When you enter a rage, choose Bite, Claws, or Tail. That natural weapon lasts until the rage ends and uses Strength for its attacks.",
					level: 3,
					kind: "passive"
				}]
			},
			{
				id: "storm-herald",
				name: "Sturmbote",
				description: "Ein Barbar, dessen Zorn die Kraft extremer Landschaften entfesselt.",
				features: [{
					id: "storm-herald-1",
					name: "Sturmaura",
					description: "2014-Unterklassenmerkmal: While raging you project a 10-foot storm aura. Choose Desert, Sea, or Tundra when you gain this feature; your bonus action can trigger the aura’s level-3 effect.",
					level: 3,
					kind: "bonus-action"
				}]
			}
		],
		startingEquipment: [
			"Große Axt",
			"Zwei Handäxte",
			"Entdeckerpaket",
			"Vier Wurfspeere"
		]
	},
	{
		id: "bard",
		name: "Barde",
		description: "Ein vielseitiger Künstler, dessen Worte, Musik und Geschichten selbst Magie formen können.",
		hitDie: 8,
		primaryAbilities: ["charisma"],
		savingThrows: ["dexterity", "charisma"],
		armorProficiencies: ["Leichte Rüstung"],
		weaponProficiencies: [
			"Einfache Waffen",
			"Handarmbrüste",
			"Langschwerter",
			"Rapiere",
			"Kurzschwerter"
		],
		toolProficiencies: ["Drei Musikinstrumente nach Wahl"],
		spellcasting: true,
		spellcastingRules: {
			ability: "charisma",
			progression: "full",
			preparation: "known",
			ritualCasting: true,
			startsAtLevel: 1
		},
		features: [
			{
				id: "bard-bardic-inspiration",
				name: "Bardische Inspiration",
				description: "Als Bonusaktion erhält eine andere Kreatur innerhalb von 18 m, die dich hören kann, einen W6-Inspirationswürfel. Sie kann ihn innerhalb von 10 Minuten auf einen Attributs-, Angriffs- oder Rettungswurf addieren.",
				level: 1,
				kind: "bonus-action",
				resource: {
					id: "bard-bardic-inspiration-uses",
					name: "Bardische Inspiration",
					amount: "ability-modifier",
					recharge: "long-rest"
				}
			},
			{
				id: "bard-spellcasting",
				name: "Zauberwirken",
				description: "Du kennst Bardenzauber und wirkst sie mit Charisma. Auf Stufe 1 kennst du 2 Zaubertricks und 4 Zauber des 1. Grades.",
				level: 1,
				kind: "passive"
			},
			{
				id: "bard-jack-of-all-trades",
				name: "Alleskönner",
				description: "Auf Attributsproben ohne deinen Übungsbonus addierst du deinen halben Übungsbonus, abgerundet.",
				level: 2,
				kind: "passive"
			},
			{
				id: "bard-song-of-rest",
				name: "Lied der Erholung",
				description: "Während einer kurzen Rast erhalten Kreaturen, die Trefferwürfel zur Heilung ausgeben und dein Lied hören, zusätzlich 1W6 Trefferpunkte.",
				level: 2,
				kind: "passive"
			},
			{
				id: "bard-college",
				name: "Bardenschule",
				description: "Auf Stufe 3 wählst du eine Bardenschule und erhältst deren erste Merkmale.",
				level: 3,
				kind: "passive"
			},
			{
				id: "bard-expertise",
				name: "Expertise",
				description: "Wähle zwei Fertigkeiten, in denen du geübt bist. Dein Übungsbonus wird für Proben mit diesen Fertigkeiten verdoppelt.",
				level: 3,
				kind: "passive"
			}
		],
		subclasses: [
			{
				id: "college-of-lore",
				name: "Kolleg des Wissens",
				description: "Ein Pfad für Gelehrte, Redner und Sammler vergessener Geheimnisse.",
				features: [{
					id: "college-of-lore-1",
					name: "Zusätzliche Übungen",
					description: "2014-Unterklassenmerkmal: You gain proficiency in three skills of your choice.",
					level: 3,
					kind: "passive"
				}, {
					id: "college-of-lore-2",
					name: "Schneidende Worte",
					description: "2014-Unterklassenmerkmal: As a reaction, spend Bardic Inspiration to subtract the die from a creature’s attack roll, ability check, or damage roll when the feature’s conditions are met.",
					level: 3,
					kind: "reaction"
				}]
			},
			{
				id: "college-of-valor",
				name: "Kolleg der Tapferkeit",
				description: "Ein kriegerischer Barde, der Verbündete mit Taten und Liedern antreibt.",
				features: [{
					id: "college-of-valor-1",
					name: "Zusätzliche Übungen",
					description: "2014-Unterklassenmerkmal: You gain proficiency with medium armor, shields, and martial weapons.",
					level: 3,
					kind: "passive"
				}, {
					id: "college-of-valor-2",
					name: "Kampfinspiration",
					description: "2014-Unterklassenmerkmal: A creature holding your Bardic Inspiration die can also add it to weapon damage or, as a reaction, to AC against one attack.",
					level: 3,
					kind: "passive"
				}]
			},
			{
				id: "college-of-whispers",
				name: "Kolleg des Flüsterns",
				description: "Ein düsterer Pfad aus Geheimnissen, Furcht und gezielter Manipulation.",
				features: [{
					id: "college-of-whispers-1",
					name: "Psychische Klingen",
					description: "2014-Unterklassenmerkmal: When you hit with a weapon attack, you can expend Bardic Inspiration to deal an extra 2d6 psychic damage; once per round.",
					level: 3,
					kind: "passive"
				}, {
					id: "college-of-whispers-2",
					name: "Worte des Schreckens",
					description: "2014-Unterklassenmerkmal: After speaking privately with a humanoid for at least 1 minute, you can attempt to frighten it for up to 1 hour; usable once per short or long rest.",
					level: 3,
					kind: "action",
					resource: {
						id: "whispers-words-of-terror-uses",
						name: "Worte des Schreckens",
						amount: 1,
						recharge: "short-rest"
					}
				}]
			}
		],
		startingEquipment: [
			"Rapier oder Langschwert",
			"Diplomatenpaket oder Unterhalterpaket",
			"Laute oder anderes Musikinstrument",
			"Lederrüstung",
			"Dolch"
		]
	},
	{
		id: "cleric",
		name: "Kleriker",
		description: "Ein geweihter Diener höherer Mächte, der Glauben, Schutz und göttliche Magie verbindet.",
		hitDie: 8,
		primaryAbilities: ["wisdom"],
		savingThrows: ["wisdom", "charisma"],
		armorProficiencies: [
			"Leichte Rüstung",
			"Mittlere Rüstung",
			"Schilde"
		],
		weaponProficiencies: ["Einfache Waffen"],
		toolProficiencies: [],
		spellcasting: true,
		spellcastingRules: {
			ability: "wisdom",
			progression: "full",
			preparation: "prepared",
			ritualCasting: true,
			startsAtLevel: 1
		},
		features: [
			{
				id: "cleric-spellcasting",
				name: "Zauberwirken",
				description: "Du bereitest Klerikerzauber vor und wirkst sie mit Weisheit. Die Zahl vorbereiteter Zauber entspricht WE-Modifikator + Klerikerstufe, mindestens 1.",
				level: 1,
				kind: "passive"
			},
			{
				id: "cleric-divine-domain",
				name: "Göttliche Domäne",
				description: "Auf Stufe 1 wählst du eine göttliche Domäne und erhältst deren Domänenzauber und Merkmale.",
				level: 1,
				kind: "passive"
			},
			{
				id: "cleric-channel-divinity",
				name: "Göttliche Macht fokussieren",
				description: "Du kanalisierst göttliche Energie für Untote vertreiben oder eine Option deiner Domäne. Der SG entspricht deinem Zauberrettungswurf-SG.",
				level: 2,
				kind: "action",
				resource: {
					id: "cleric-channel-divinity-uses",
					name: "Göttliche Macht fokussieren",
					amount: 1,
					recharge: "short-rest"
				}
			},
			{
				id: "cleric-turn-undead",
				name: "Untote vertreiben",
				description: "Als Aktion präsentierst du dein heiliges Symbol. Untote innerhalb von 9 m, die dich sehen oder hören, müssen einen WE-Rettungswurf bestehen oder werden 1 Minute lang vertrieben.",
				level: 2,
				kind: "action"
			}
		],
		subclasses: [
			{
				id: "life-domain",
				name: "Domäne des Lebens",
				description: "Eine göttliche Ausrichtung auf Heilung, Schutz und die Bewahrung des Lebens.",
				features: [
					{
						id: "life-domain-1",
						name: "Zusätzliche Übung",
						description: "2014-Unterklassenmerkmal: You gain proficiency with heavy armor.",
						level: 1,
						kind: "passive"
					},
					{
						id: "life-domain-2",
						name: "Jünger des Lebens",
						description: "2014-Unterklassenmerkmal: Your healing spells of 1st level or higher restore extra hit points equal to 2 + the spell’s level.",
						level: 1,
						kind: "passive"
					},
					{
						id: "life-domain-3",
						name: "Göttliche Macht fokussieren: Leben bewahren",
						description: "2014-Unterklassenmerkmal: As an action, distribute healing equal to five times your cleric level among creatures within 30 feet, without healing a creature above half its hit-point maximum.",
						level: 2,
						kind: "action"
					}
				]
			},
			{
				id: "light-domain",
				name: "Domäne des Lichts",
				description: "Eine strahlende Tradition, die Dunkelheit und Verderbnis bekämpft.",
				features: [
					{
						id: "light-domain-1",
						name: "Zusätzlicher Zaubertrick",
						description: "2014-Unterklassenmerkmal: You learn the light cantrip if you do not already know it.",
						level: 1,
						kind: "passive"
					},
					{
						id: "light-domain-2",
						name: "Schützendes Flackern",
						description: "2014-Unterklassenmerkmal: As a reaction, impose disadvantage on an attack from a creature you can see within 30 feet. Uses per long rest equal to your Wisdom modifier, minimum 1.",
						level: 1,
						kind: "reaction",
						resource: {
							id: "light-warding-flare-uses",
							name: "Schützendes Flackern",
							amount: "ability-modifier",
							recharge: "long-rest"
						}
					},
					{
						id: "light-domain-3",
						name: "Göttliche Macht fokussieren: Glanz der Morgenröte",
						description: "2014-Unterklassenmerkmal: As an action, dispel magical darkness and damage hostile creatures around you with radiant power; a Constitution save halves the damage.",
						level: 2,
						kind: "action"
					}
				]
			},
			{
				id: "war-domain",
				name: "Domäne des Krieges",
				description: "Eine kämpferische Ausrichtung für Priester, die ihren Glauben mit Waffen verteidigen.",
				features: [
					{
						id: "war-domain-1",
						name: "Zusätzliche Übungen",
						description: "2014-Unterklassenmerkmal: You gain proficiency with martial weapons and heavy armor.",
						level: 1,
						kind: "passive"
					},
					{
						id: "war-domain-2",
						name: "Kriegspriester",
						description: "2014-Unterklassenmerkmal: After taking the Attack action, you can make one weapon attack as a bonus action. Uses per long rest equal to your Wisdom modifier, minimum 1.",
						level: 1,
						kind: "bonus-action",
						resource: {
							id: "war-priest-uses",
							name: "Kriegspriester",
							amount: "ability-modifier",
							recharge: "long-rest"
						}
					},
					{
						id: "war-domain-3",
						name: "Göttliche Macht fokussieren: Geführter Schlag",
						description: "2014-Unterklassenmerkmal: After making an attack roll, you can use Channel Divinity to gain +10 to that roll.",
						level: 2,
						kind: "passive"
					}
				]
			},
			{
				id: "grave-domain",
				name: "Domäne des Grabes",
				description: "Eine düstere Lehre über Tod, Übergang und das Gleichgewicht zwischen Leben und Sterben.",
				features: [
					{
						id: "grave-domain-1",
						name: "Kreis der Sterblichkeit",
						description: "2014-Unterklassenmerkmal: When you heal a creature at 0 hit points with a spell, treat the healing dice as maximum; you also learn spare the dying and can cast it as a bonus action at 30 feet.",
						level: 1,
						kind: "passive"
					},
					{
						id: "grave-domain-2",
						name: "Augen des Grabes",
						description: "2014-Unterklassenmerkmal: As an action, sense undead within 60 feet that are not behind total cover or protected from divination. Uses per long rest equal to your Wisdom modifier, minimum 1.",
						level: 1,
						kind: "action",
						resource: {
							id: "grave-eyes-of-the-grave-uses",
							name: "Augen des Grabes",
							amount: "ability-modifier",
							recharge: "long-rest"
						}
					},
					{
						id: "grave-domain-3",
						name: "Göttliche Macht fokussieren: Pfad zum Grab",
						description: "2014-Unterklassenmerkmal: As an action, curse a creature within 30 feet; the next time it takes damage before the end of your next turn, it is vulnerable to all of that attack or effect’s damage.",
						level: 2,
						kind: "action"
					}
				]
			}
		],
		startingEquipment: [
			"Streitkolben oder Kriegshammer",
			"Schuppenpanzer oder Lederrüstung",
			"Leichte Armbrust oder einfache Waffe",
			"Priesterpaket oder Entdeckerpaket",
			"Schild",
			"Heiliges Symbol"
		]
	},
	{
		id: "druid",
		name: "Druide",
		description: "Ein Hüter der Wildnis, der uralte Naturkräfte, Tiere und Wandel miteinander verbindet.",
		hitDie: 8,
		primaryAbilities: ["wisdom"],
		savingThrows: ["intelligence", "wisdom"],
		armorProficiencies: [
			"Leichte Rüstung",
			"Mittlere Rüstung",
			"Schilde"
		],
		weaponProficiencies: [
			"Knüppel",
			"Dolche",
			"Wurfpfeile",
			"Wurfspeere",
			"Streitkolben",
			"Kampfstäbe",
			"Krummsäbel",
			"Sicheln",
			"Schleudern",
			"Speere"
		],
		toolProficiencies: ["Kräuterkundeausrüstung"],
		spellcasting: true,
		spellcastingRules: {
			ability: "wisdom",
			progression: "full",
			preparation: "prepared",
			ritualCasting: true,
			startsAtLevel: 1
		},
		features: [
			{
				id: "druid-druidic",
				name: "Druidisch",
				description: "Du beherrschst die geheime Sprache der Druiden und kannst darin verborgene Botschaften hinterlassen.",
				level: 1,
				kind: "passive"
			},
			{
				id: "druid-spellcasting",
				name: "Zauberwirken",
				description: "Du bereitest Druidenzauber vor und wirkst sie mit Weisheit. Die Zahl vorbereiteter Zauber entspricht WE-Modifikator + Druidenstufe, mindestens 1.",
				level: 1,
				kind: "passive"
			},
			{
				id: "druid-wild-shape",
				name: "Tiergestalt",
				description: "Als Aktion verwandelst du dich in eine Tiergestalt, die du bereits gesehen hast. Auf Stufe 2 gelten die normalen 2014-Grenzen für HG, Flug- und Schwimmbewegung.",
				level: 2,
				kind: "action",
				resource: {
					id: "druid-wild-shape-uses",
					name: "Tiergestalt",
					amount: 2,
					recharge: "short-rest"
				}
			},
			{
				id: "druid-circle",
				name: "Druidenzirkel",
				description: "Auf Stufe 2 wählst du einen Druidenzirkel und erhältst dessen erste Merkmale.",
				level: 2,
				kind: "passive"
			}
		],
		subclasses: [
			{
				id: "circle-of-the-land",
				name: "Zirkel des Landes",
				description: "Ein naturverbundener Pfad mit starker Bindung an eine bestimmte Region.",
				features: [
					{
						id: "circle-of-the-land-1",
						name: "Zusätzlicher Zaubertrick",
						description: "2014-Unterklassenmerkmal: You learn one additional druid cantrip of your choice.",
						level: 2,
						kind: "passive"
					},
					{
						id: "circle-of-the-land-2",
						name: "Natürliche Erholung",
						description: "2014-Unterklassenmerkmal: Once per day during a short rest, recover expended spell slots with combined levels up to half your druid level, rounded up; no slot can be 6th level or higher.",
						level: 2,
						kind: "resource",
						resource: {
							id: "land-natural-recovery-uses",
							name: "Natürliche Erholung",
							amount: 1,
							recharge: "long-rest"
						}
					},
					{
						id: "circle-of-the-land-3",
						name: "Zirkelzauber",
						description: "2014-Unterklassenmerkmal: At 3rd level, your chosen land grants two always-prepared circle spells; they count as druid spells and do not count against prepared spells.",
						level: 3,
						kind: "passive"
					}
				]
			},
			{
				id: "circle-of-the-moon",
				name: "Zirkel des Mondes",
				description: "Ein kämpferischer Zirkel, der die Tiergestalt in den Mittelpunkt stellt.",
				features: [{
					id: "circle-of-the-moon-1",
					name: "Kampf-Tiergestalt",
					description: "2014-Unterklassenmerkmal: You can use Wild Shape as a bonus action and can expend spell slots while transformed to restore hit points.",
					level: 2,
					kind: "bonus-action"
				}, {
					id: "circle-of-the-moon-2",
					name: "Zirkelgestalten",
					description: "2014-Unterklassenmerkmal: Your Wild Shape can assume stronger beasts: at 2nd level up to CR 1, still respecting the normal movement restrictions.",
					level: 2,
					kind: "passive"
				}]
			},
			{
				id: "circle-of-spores",
				name: "Zirkel der Sporen",
				description: "Eine düstere Tradition über Verfall, Pilze und den Kreislauf des Lebens.",
				features: [{
					id: "circle-of-spores-1",
					name: "Sporenhalo",
					description: "2014-Unterklassenmerkmal: As a reaction when a creature moves into or starts its turn within 10 feet, deal necrotic damage on a failed Constitution save; the die starts at 1d4.",
					level: 2,
					kind: "reaction"
				}, {
					id: "circle-of-spores-2",
					name: "Symbiotische Entität",
					description: "2014-Unterklassenmerkmal: As an action, expend Wild Shape to gain temporary hit points, double Halo of Spores damage, and add 1d6 poison damage to melee weapon hits while the effect lasts.",
					level: 2,
					kind: "action"
				}]
			}
		],
		startingEquipment: [
			"Holzschild oder einfache Waffe",
			"Krummsäbel oder einfache Nahkampfwaffe",
			"Lederrüstung",
			"Entdeckerpaket",
			"Druidischer Fokus"
		]
	},
	{
		id: "fighter",
		name: "Kämpfer",
		description: "Ein disziplinierter Waffenmeister, der durch Ausbildung, Ausdauer und Erfahrung jede Kampfsituation beherrscht.",
		hitDie: 10,
		primaryAbilities: ["strength", "dexterity"],
		savingThrows: ["strength", "constitution"],
		armorProficiencies: ["Alle Rüstungen", "Schilde"],
		weaponProficiencies: ["Einfache Waffen", "Kriegswaffen"],
		toolProficiencies: [],
		spellcasting: false,
		features: [
			{
				id: "fighter-fighting-style",
				name: "Kampfstil",
				description: "Du spezialisierst dich auf einen Kampfstil. Die konkrete Wahl bestimmt den dauerhaften Bonus oder die zusätzliche Kampfoption.",
				level: 1,
				kind: "passive"
			},
			{
				id: "fighter-second-wind",
				name: "Zweiter Wind",
				description: "Als Bonusaktion stellst du 1W10 + Kämpferstufe Trefferpunkte wieder her.",
				level: 1,
				kind: "bonus-action",
				resource: {
					id: "fighter-second-wind-uses",
					name: "Zweiter Wind",
					amount: 1,
					recharge: "short-rest"
				}
			},
			{
				id: "fighter-action-surge",
				name: "Tatendrang",
				description: "In deinem Zug erhältst du zusätzlich zu deiner normalen Aktion und möglichen Bonusaktion eine weitere Aktion.",
				level: 2,
				kind: "resource",
				resource: {
					id: "fighter-action-surge-uses",
					name: "Tatendrang",
					amount: 1,
					recharge: "short-rest"
				}
			},
			{
				id: "fighter-martial-archetype",
				name: "Kriegerischer Archetyp",
				description: "Auf Stufe 3 wählst du deinen kriegerischen Archetyp und erhältst dessen erste Merkmale.",
				level: 3,
				kind: "passive"
			}
		],
		subclasses: [
			{
				id: "champion",
				name: "Champion",
				description: "Ein körperlich überragender Kämpfer mit direktem und zuverlässigem Spielstil.",
				features: [{
					id: "champion-1",
					name: "Verbesserter kritischer Treffer",
					description: "2014-Unterklassenmerkmal: Your weapon attacks score a critical hit on a roll of 19 or 20.",
					level: 3,
					kind: "passive"
				}]
			},
			{
				id: "battle-master",
				name: "Kampfmeister",
				description: "Ein taktischer Krieger, der Manöver und Kontrolle über rohe Gewalt stellt.",
				features: [{
					id: "battle-master-1",
					name: "Kampfüberlegenheit",
					description: "Du lernst drei Manöver und erhältst vier Überlegenheitswürfel (W8). Verbrauchte Würfel kehren nach kurzer oder langer Rast zurück.",
					level: 3,
					kind: "resource",
					resource: {
						id: "battle-master-superiority-dice",
						name: "Überlegenheitswürfel",
						amount: 4,
						recharge: "short-rest"
					}
				}, {
					id: "battle-master-2",
					name: "Kriegsschüler",
					description: "2014-Unterklassenmerkmal: You gain proficiency with one type of artisan’s tools of your choice.",
					level: 3,
					kind: "passive"
				}]
			},
			{
				id: "eldritch-knight",
				name: "Arkaner Ritter",
				description: "Ein Kämpfer, der Waffenführung mit begrenzter arkaner Magie verbindet.",
				features: [{
					id: "eldritch-knight-1",
					name: "Zauberwirken",
					description: "2014-Unterklassenmerkmal: You gain limited wizard spellcasting using Intelligence. At 3rd level you know two cantrips and three 1st-level wizard spells, mostly from abjuration or evocation.",
					level: 3,
					kind: "passive"
				}, {
					id: "eldritch-knight-2",
					name: "Waffenbindung",
					description: "2014-Unterklassenmerkmal: During a 1-hour ritual you can bond with up to two weapons. You cannot be disarmed of a bonded weapon while conscious and can summon one to your hand as a bonus action.",
					level: 3,
					kind: "bonus-action"
				}]
			},
			{
				id: "samurai",
				name: "Samurai",
				description: "Ein entschlossener Duellant, der Disziplin und mentale Stärke verkörpert.",
				features: [{
					id: "samurai-1",
					name: "Zusätzliche Übung",
					description: "2014-Unterklassenmerkmal: Gain proficiency in one of History, Insight, Performance, or Persuasion; alternatively learn one language.",
					level: 3,
					kind: "passive"
				}, {
					id: "samurai-2",
					name: "Kampfgeist",
					description: "Als Bonusaktion erhältst du bis zum Ende des Zuges Vorteil auf Waffenangriffe und 5 temporäre TP. 3 Anwendungen pro langer Rast.",
					level: 3,
					kind: "bonus-action",
					resource: {
						id: "samurai-fighting-spirit-uses",
						name: "Kampfgeist",
						amount: 3,
						recharge: "long-rest"
					}
				}]
			}
		],
		startingEquipment: [
			"Kettenrüstung oder Lederrüstung",
			"Kriegswaffe und Schild oder zwei Kriegswaffen",
			"Leichte Armbrust oder zwei Handäxte",
			"Gewölbeforscherpaket oder Entdeckerpaket"
		]
	},
	{
		id: "monk",
		name: "Mönch",
		description: "Ein disziplinierter Kämpfer, der Körper, Geist und innere Energie zu einer einzigen Waffe formt.",
		hitDie: 8,
		primaryAbilities: ["dexterity", "wisdom"],
		savingThrows: ["strength", "dexterity"],
		armorProficiencies: [],
		weaponProficiencies: ["Einfache Waffen", "Kurzschwerter"],
		toolProficiencies: ["Ein Handwerkszeug oder Musikinstrument nach Wahl"],
		spellcasting: false,
		features: [
			{
				id: "monk-martial-arts",
				name: "Kampfkünste",
				description: "Ohne Rüstung und Schild kannst du GE statt ST für passende Mönchswaffen und waffenlose Angriffe verwenden; dein Kampfkunstwürfel ist bis Stufe 4 ein W4 und ermöglicht einen waffenlosen Bonusangriff.",
				level: 1,
				kind: "passive"
			},
			{
				id: "monk-unarmored-defense",
				name: "Ungepanzerte Verteidigung",
				description: "Ohne Rüstung und Schild beträgt deine RK 10 + GE-Modifikator + WE-Modifikator.",
				level: 1,
				kind: "passive"
			},
			{
				id: "monk-ki",
				name: "Ki",
				description: "Du erhältst Ki-Punkte in Höhe deiner Mönchsstufe. Du kannst sie unter anderem für Schlaghagel, Geduldige Verteidigung und Schritt des Windes ausgeben.",
				level: 2,
				kind: "resource",
				resource: {
					id: "monk-ki-points",
					name: "Ki",
					amount: "class-level",
					recharge: "short-rest"
				}
			},
			{
				id: "monk-unarmored-movement",
				name: "Ungepanzerte Bewegung",
				description: "Ohne Rüstung und Schild steigt deine Bewegungsrate ab Stufe 2 um 3 m.",
				level: 2,
				kind: "passive"
			},
			{
				id: "monk-monastic-tradition",
				name: "Klostertradition",
				description: "Auf Stufe 3 wählst du deine Klostertradition und erhältst deren erste Merkmale.",
				level: 3,
				kind: "passive"
			},
			{
				id: "monk-deflect-missiles",
				name: "Geschosse abwehren",
				description: "Als Reaktion verringerst du den Schaden eines Fernkampf-Waffenangriffs um 1W10 + GE-Modifikator + Mönchsstufe. Reduzierst du auf 0, kannst du das Geschoss unter den Regelbedingungen zurückwerfen.",
				level: 3,
				kind: "reaction"
			}
		],
		subclasses: [
			{
				id: "way-of-the-open-hand",
				name: "Weg der offenen Hand",
				description: "Ein klassischer Pfad für Kontrolle, Bewegung und waffenlosen Kampf.",
				features: [{
					id: "way-of-the-open-hand-1",
					name: "Technik der offenen Hand",
					description: "2014-Unterklassenmerkmal: Whenever you hit with an attack granted by Flurry of Blows, you can prevent reactions, push the target, or knock it prone depending on the chosen option and save.",
					level: 3,
					kind: "passive"
				}]
			},
			{
				id: "way-of-shadow",
				name: "Weg des Schattens",
				description: "Ein heimlicher Pfad aus Dunkelheit, Täuschung und lautloser Bewegung.",
				features: [{
					id: "way-of-shadow-1",
					name: "Schattenkünste",
					description: "2014-Unterklassenmerkmal: You learn minor illusion. By spending 2 ki, you can cast darkness, darkvision, pass without trace, or silence without material components.",
					level: 3,
					kind: "action"
				}]
			},
			{
				id: "way-of-the-long-death",
				name: "Weg des langen Todes",
				description: "Eine düstere Schule über Furcht, Sterblichkeit und die Grenzen des Körpers.",
				features: [{
					id: "way-of-the-long-death-1",
					name: "Berührung des Todes",
					description: "2014-Unterklassenmerkmal: When you reduce a creature within 5 feet to 0 hit points, gain temporary hit points equal to your Wisdom modifier + monk level.",
					level: 3,
					kind: "passive"
				}]
			}
		],
		startingEquipment: [
			"Kurzschwert oder einfache Waffe",
			"Gewölbeforscherpaket oder Entdeckerpaket",
			"Zehn Wurfpfeile"
		]
	},
	{
		id: "paladin",
		name: "Paladin",
		description: "Ein geweihter Krieger, dessen Eid, Überzeugung und Wille übernatürliche Macht verleihen.",
		hitDie: 10,
		primaryAbilities: ["strength", "charisma"],
		savingThrows: ["wisdom", "charisma"],
		armorProficiencies: ["Alle Rüstungen", "Schilde"],
		weaponProficiencies: ["Einfache Waffen", "Kriegswaffen"],
		toolProficiencies: [],
		spellcasting: true,
		spellcastingRules: {
			ability: "charisma",
			progression: "half",
			preparation: "prepared",
			startsAtLevel: 2
		},
		features: [
			{
				id: "paladin-divine-sense",
				name: "Göttliches Gespür",
				description: "Als Aktion spürst du bis zum Ende deines nächsten Zuges Himmlische, Unholde und Untote innerhalb von 18 m sowie geweihte oder entweihte Orte auf.",
				level: 1,
				kind: "action",
				resource: {
					id: "paladin-divine-sense-uses",
					name: "Göttliches Gespür",
					amount: "ability-modifier-plus-one",
					recharge: "long-rest"
				}
			},
			{
				id: "paladin-lay-on-hands",
				name: "Handauflegen",
				description: "Du besitzt einen Heilpool von 5 Trefferpunkten pro Paladinstufe. Als Aktion kannst du daraus heilen oder 5 Punkte ausgeben, um bestimmte Krankheiten oder Gifte zu neutralisieren.",
				level: 1,
				kind: "action",
				resource: {
					id: "paladin-lay-on-hands-pool",
					name: "Handauflegen",
					amount: {
						kind: "class-level-multiplier",
						multiplier: 5
					},
					recharge: "long-rest"
				}
			},
			{
				id: "paladin-fighting-style",
				name: "Kampfstil",
				description: "Auf Stufe 2 wählst du einen Kampfstil und erhältst dessen dauerhaften Vorteil.",
				level: 2,
				kind: "passive"
			},
			{
				id: "paladin-spellcasting",
				name: "Zauberwirken",
				description: "Ab Stufe 2 bereitest du Paladinzauber vor und wirkst sie mit Charisma.",
				level: 2,
				kind: "passive"
			},
			{
				id: "paladin-divine-smite",
				name: "Göttliches Niederstrecken",
				description: "Wenn du mit einer Nahkampfwaffe triffst, kannst du einen Zauberplatz ausgeben, um zusätzlichen gleißenden Schaden zu verursachen; höhere Plätze erhöhen den Schaden.",
				level: 2,
				kind: "passive"
			},
			{
				id: "paladin-divine-health",
				name: "Göttliche Gesundheit",
				description: "Ab Stufe 3 bist du gegen Krankheiten immun.",
				level: 3,
				kind: "passive"
			},
			{
				id: "paladin-sacred-oath",
				name: "Heiliger Eid",
				description: "Auf Stufe 3 legst du deinen Heiligen Eid ab und erhältst dessen erste Merkmale und Optionen für Göttliche Macht fokussieren.",
				level: 3,
				kind: "passive"
			}
		],
		subclasses: [
			{
				id: "oath-of-devotion",
				name: "Eid der Hingabe",
				description: "Ein klassischer Eid über Ehre, Schutz und den Kampf gegen das Böse.",
				features: [
					{
						id: "oath-of-devotion-1",
						name: "Eidzauber",
						description: "2014-Unterklassenmerkmal: You always have protection from evil and good and sanctuary prepared; they do not count against your prepared paladin spells.",
						level: 3,
						kind: "passive"
					},
					{
						id: "oath-of-devotion-2",
						name: "Göttliche Macht fokussieren: Heilige Waffe",
						description: "2014-Unterklassenmerkmal: As an action, empower one weapon for 1 minute, adding your Charisma modifier to its attack rolls and making it magical and luminous.",
						level: 3,
						kind: "action"
					},
					{
						id: "oath-of-devotion-3",
						name: "Göttliche Macht fokussieren: Unheilige vertreiben",
						description: "2014-Unterklassenmerkmal: As an action, fiends and undead within 30 feet that can see or hear you must save or be turned for 1 minute.",
						level: 3,
						kind: "action"
					}
				]
			},
			{
				id: "oath-of-vengeance",
				name: "Eid der Vergeltung",
				description: "Ein unerbittlicher Schwur, Schuldige zu verfolgen und Unrecht zu vergelten.",
				features: [
					{
						id: "oath-of-vengeance-1",
						name: "Eidzauber",
						description: "2014-Unterklassenmerkmal: You always have bane and hunter’s mark prepared; they do not count against your prepared paladin spells.",
						level: 3,
						kind: "passive"
					},
					{
						id: "oath-of-vengeance-2",
						name: "Göttliche Macht fokussieren: Feind bannen",
						description: "2014-Unterklassenmerkmal: As an action, frighten one creature you can see within 60 feet on a failed Wisdom save; fiends and undead have disadvantage on the save.",
						level: 3,
						kind: "action"
					},
					{
						id: "oath-of-vengeance-3",
						name: "Göttliche Macht fokussieren: Schwur der Feindschaft",
						description: "2014-Unterklassenmerkmal: As a bonus action, choose a creature within 10 feet and gain advantage on attacks against it for 1 minute or until it drops unconscious.",
						level: 3,
						kind: "bonus-action"
					}
				]
			},
			{
				id: "oath-of-the-ancients",
				name: "Eid der Uralten",
				description: "Ein Eid zum Schutz von Hoffnung, Natur und dem Licht des Lebens.",
				features: [
					{
						id: "oath-of-the-ancients-1",
						name: "Eidzauber",
						description: "2014-Unterklassenmerkmal: You always have ensnaring strike and speak with animals prepared; they do not count against your prepared paladin spells.",
						level: 3,
						kind: "passive"
					},
					{
						id: "oath-of-the-ancients-2",
						name: "Göttliche Macht fokussieren: Zorn der Natur",
						description: "2014-Unterklassenmerkmal: As an action, spectral vines attempt to restrain a creature within 10 feet; it can repeat a Strength or Dexterity save to escape.",
						level: 3,
						kind: "action"
					},
					{
						id: "oath-of-the-ancients-3",
						name: "Göttliche Macht fokussieren: Treulose vertreiben",
						description: "2014-Unterklassenmerkmal: As an action, fey and fiends within 30 feet that can hear you must save or be turned for 1 minute.",
						level: 3,
						kind: "action"
					}
				]
			},
			{
				id: "oath-of-the-crown",
				name: "Eid der Krone",
				description: "Ein Schwur an Ordnung, Pflicht, Gemeinschaft und Herrschaft.",
				features: [
					{
						id: "oath-of-the-crown-1",
						name: "Eidzauber",
						description: "2014-Unterklassenmerkmal: You always have command and compelled duel prepared; they do not count against your prepared paladin spells.",
						level: 3,
						kind: "passive"
					},
					{
						id: "oath-of-the-crown-2",
						name: "Göttliche Macht fokussieren: Herausforderung des Champions",
						description: "2014-Unterklassenmerkmal: As a bonus action, creatures of your choice within 30 feet must save or be unable to willingly move more than 30 feet away from you.",
						level: 3,
						kind: "bonus-action"
					},
					{
						id: "oath-of-the-crown-3",
						name: "Göttliche Macht fokussieren: Blatt wenden",
						description: "2014-Unterklassenmerkmal: As a bonus action, creatures of your choice within 30 feet that can hear you regain 1d6 + Charisma modifier hit points if they are below half their maximum.",
						level: 3,
						kind: "bonus-action"
					}
				]
			}
		],
		startingEquipment: [
			"Kriegswaffe und Schild oder zwei Kriegswaffen",
			"Fünf Wurfspeere oder einfache Nahkampfwaffe",
			"Priesterpaket oder Entdeckerpaket",
			"Kettenrüstung",
			"Heiliges Symbol"
		]
	},
	{
		id: "ranger",
		name: "Waldläufer",
		description: "Ein erfahrener Jäger, Kundschafter und Grenzgänger, der seine Feinde mit Geduld und Präzision verfolgt.",
		hitDie: 10,
		primaryAbilities: ["dexterity", "wisdom"],
		savingThrows: ["strength", "dexterity"],
		armorProficiencies: [
			"Leichte Rüstung",
			"Mittlere Rüstung",
			"Schilde"
		],
		weaponProficiencies: ["Einfache Waffen", "Kriegswaffen"],
		toolProficiencies: [],
		spellcasting: true,
		spellcastingRules: {
			ability: "wisdom",
			progression: "half",
			preparation: "known",
			startsAtLevel: 2
		},
		features: [
			{
				id: "ranger-favored-enemy",
				name: "Erzfeind",
				description: "Du wählst einen Typ bevorzugter Feinde. Du hast Vorteil auf WE-(Überleben)-Proben zum Verfolgen sowie auf IN-Proben, um Wissen über diese Feinde abzurufen, und lernst gegebenenfalls eine passende Sprache.",
				level: 1,
				kind: "passive"
			},
			{
				id: "ranger-natural-explorer",
				name: "Natürlicher Entdecker",
				description: "Du wählst ein bevorzugtes Gelände und erhältst dort die 2014-Vorteile für Reise, Orientierung, Nahrungssuche, Spurenlesen und andere Wildnisaufgaben.",
				level: 1,
				kind: "passive"
			},
			{
				id: "ranger-fighting-style",
				name: "Kampfstil",
				description: "Auf Stufe 2 wählst du einen Kampfstil und erhältst dessen dauerhaften Vorteil.",
				level: 2,
				kind: "passive"
			},
			{
				id: "ranger-spellcasting",
				name: "Zauberwirken",
				description: "Ab Stufe 2 kennst du Waldläuferzauber und wirkst sie mit Weisheit. Auf Stufe 2 kennst du 2 Zauber des 1. Grades.",
				level: 2,
				kind: "passive"
			},
			{
				id: "ranger-archetype",
				name: "Waldläuferarchetyp",
				description: "Auf Stufe 3 wählst du deinen Waldläuferarchetyp und erhältst dessen erste Merkmale.",
				level: 3,
				kind: "passive"
			},
			{
				id: "ranger-primeval-awareness",
				name: "Urbewusstsein",
				description: "Du kannst einen Zauberplatz ausgeben, um für eine begrenzte Zeit bestimmte Kreaturenarten in deiner Umgebung aufzuspüren; die Fähigkeit verrät nicht Ort oder Anzahl.",
				level: 3,
				kind: "action"
			}
		],
		subclasses: [
			{
				id: "hunter",
				name: "Jäger",
				description: "Ein vielseitiger Spezialist im Kampf gegen besonders gefährliche Beute.",
				features: [{
					id: "hunter-1",
					name: "Beute des Jägers",
					description: "2014-Unterklassenmerkmal: Choose Colossus Slayer, Giant Killer, or Horde Breaker and gain that option’s offensive benefit.",
					level: 3,
					kind: "passive"
				}]
			},
			{
				id: "beast-master",
				name: "Tiermeister",
				description: "Ein Waldläufer, der an der Seite eines treuen Tiergefährten kämpft.",
				features: [{
					id: "beast-master-1",
					name: "Gefährte des Waldläufers",
					description: "2014-Unterklassenmerkmal: You gain a beast companion of CR 1/4 or lower that meets the 2014 size and movement limits. It acts on your initiative and normally attacks when you use your action to command it.",
					level: 3,
					kind: "passive"
				}]
			},
			{
				id: "gloom-stalker",
				name: "Düsterpirscher",
				description: "Ein Jäger der Finsternis, der in Höhlen, Ruinen und Schatten besonders gefährlich ist.",
				features: [
					{
						id: "gloom-stalker-1",
						name: "Düsterpirscher-Magie",
						description: "2014-Unterklassenmerkmal: You learn disguise self at 3rd level; it counts as a ranger spell and does not reduce your normal spells known.",
						level: 3,
						kind: "passive"
					},
					{
						id: "gloom-stalker-2",
						name: "Schreckensangreifer",
						description: "2014-Unterklassenmerkmal: Add Wisdom modifier to initiative. On your first turn of combat your speed increases by 10 feet, and if you take the Attack action you can make one additional weapon attack that deals an extra 1d8 damage on a hit.",
						level: 3,
						kind: "passive"
					},
					{
						id: "gloom-stalker-3",
						name: "Umbralsicht",
						description: "2014-Unterklassenmerkmal: You gain 60-foot darkvision, or extend existing darkvision by 30 feet. In darkness you are invisible to creatures relying on darkvision to see you.",
						level: 3,
						kind: "passive"
					}
				]
			}
		],
		startingEquipment: [
			"Schuppenpanzer oder Lederrüstung",
			"Zwei Kurzschwerter oder zwei einfache Nahkampfwaffen",
			"Gewölbeforscherpaket oder Entdeckerpaket",
			"Langbogen",
			"Zwanzig Pfeile"
		]
	},
	{
		id: "monster-hunter",
		name: "Monsterjäger",
		description: "Ein gehärteter Spezialist, der übernatürliche Beute studiert, vorbereitet und mit Wissen, Werkzeugen und kompromissloser Präzision zur Strecke bringt.",
		source: "grim-hollow-2025",
		hitDie: 10,
		primaryAbilities: ["dexterity", "wisdom"],
		savingThrows: ["dexterity", "wisdom"],
		armorProficiencies: [
			"Leichte Rüstung",
			"Mittlere Rüstung",
			"Schilde"
		],
		weaponProficiencies: ["Einfache Waffen", "Kriegswaffen"],
		toolProficiencies: ["Alchemistenbedarf"],
		spellcasting: false,
		features: [
			{
				id: "monster-hunter-quarry",
				name: "Gezeichnete Beute",
				description: "Als Bonusaktion erklärst du eine sichtbare Kreatur zu deiner Beute. Deine Ausbildung hilft dir, ihre Schwächen zu erkennen und sie unerbittlich zu verfolgen.",
				level: 1,
				kind: "bonus-action",
				resource: {
					id: "monster-hunter-quarry-uses",
					name: "Gezeichnete Beute",
					amount: "proficiency-bonus",
					recharge: "long-rest"
				}
			},
			{
				id: "monster-hunter-lore",
				name: "Monsterkunde",
				description: "Du bist im Erkennen übernatürlicher Kreaturen, ihrer Spuren und typischen Verwundbarkeiten ausgebildet.",
				level: 1,
				kind: "passive"
			},
			{
				id: "monster-hunter-prepared-hunter",
				name: "Vorbereiteter Jäger",
				description: "Du beherrschst den sicheren Umgang mit Jagdwerkzeugen, Tinkturen und spezialisierten Waffen gegen gefährliche Beute.",
				level: 1,
				kind: "passive"
			}
		],
		subclasses: [
			{
				id: "monster-hunter-beast-slayer",
				name: "Bestienschlächter",
				description: "Ein Pfad für Jäger, die körperlich überlegene Ungeheuer durch Ausdauer, Fallen und präzise Gewalt bezwingen.",
				source: "grim-hollow-2025"
			},
			{
				id: "monster-hunter-occult-warden",
				name: "Okkulter Wächter",
				description: "Ein Pfad gegen Flüche, Geister und fremdartige Mächte, der Wissen mit schützenden Ritualen verbindet.",
				source: "grim-hollow-2025"
			},
			{
				id: "monster-hunter-trophy-bearer",
				name: "Trophäenträger",
				description: "Ein Pfad, auf dem die Überreste besiegter Monster zu Werkzeugen, Warnzeichen und Quellen neuer Stärke werden.",
				source: "grim-hollow-2025"
			}
		],
		startingEquipment: [
			"Schuppenpanzer oder Lederrüstung",
			"Langschwert, Rapier oder Großschwert",
			"Schild, leichte Armbrust oder zwei Handäxte",
			"Gewölbeforscherpaket oder Entdeckerpaket",
			"Dolch"
		]
	},
	{
		id: "rogue",
		name: "Schurke",
		description: "Ein geschickter Spezialist für Heimlichkeit, Präzision, Tricks und das Ausnutzen gegnerischer Fehler.",
		hitDie: 8,
		primaryAbilities: ["dexterity"],
		savingThrows: ["dexterity", "intelligence"],
		armorProficiencies: ["Leichte Rüstung"],
		weaponProficiencies: [
			"Einfache Waffen",
			"Handarmbrüste",
			"Langschwerter",
			"Rapiere",
			"Kurzschwerter"
		],
		toolProficiencies: ["Diebeswerkzeug"],
		spellcasting: false,
		features: [
			{
				id: "rogue-expertise",
				name: "Expertise",
				description: "Wähle zwei deiner Fertigkeitsübungen oder eine Fertigkeitsübung und Diebeswerkzeug. Dein Übungsbonus wird dafür verdoppelt.",
				level: 1,
				kind: "passive"
			},
			{
				id: "rogue-sneak-attack",
				name: "Hinterhältiger Angriff",
				description: "Einmal pro Zug verursachst du mit einer Finesse- oder Fernkampfwaffe zusätzlichen Schaden, wenn du Vorteil hast oder ein Verbündeter den Gegner im Nahkampf bindet und du keinen Nachteil hast. Schaden: 1W6 auf Stufe 1–2, 2W6 ab Stufe 3.",
				level: 1,
				kind: "passive"
			},
			{
				id: "rogue-thieves-cant",
				name: "Diebessprache",
				description: "Du beherrschst die geheime Sprache, Zeichen und Codes krimineller Kreise.",
				level: 1,
				kind: "passive"
			},
			{
				id: "rogue-cunning-action",
				name: "Raffinierte Aktion",
				description: "Ab Stufe 2 kannst du in jedem Zug eine Bonusaktion verwenden, um Rennen, Rückzug oder Verstecken auszuführen.",
				level: 2,
				kind: "bonus-action"
			},
			{
				id: "rogue-roguish-archetype",
				name: "Schurkenarchetyp",
				description: "Auf Stufe 3 wählst du deinen Schurkenarchetyp und erhältst dessen erste Merkmale.",
				level: 3,
				kind: "passive"
			}
		],
		subclasses: [
			{
				id: "thief",
				name: "Dieb",
				description: "Ein klassischer Spezialist für Einbruch, Bewegung und den Einsatz von Gegenständen.",
				features: [{
					id: "thief-1",
					name: "Flinke Hände",
					description: "2014-Unterklassenmerkmal: Your Cunning Action can also make a Sleight of Hand check, use thieves’ tools to disarm a trap or open a lock, or take the Use an Object action.",
					level: 3,
					kind: "bonus-action"
				}, {
					id: "thief-2",
					name: "Fassadenkletterer",
					description: "2014-Unterklassenmerkmal: Climbing no longer costs extra movement, and your running jump distance increases by a number of feet equal to your Dexterity modifier.",
					level: 3,
					kind: "passive"
				}]
			},
			{
				id: "assassin",
				name: "Assassine",
				description: "Ein tödlicher Pfad aus Tarnung, Vorbereitung und gezielten Angriffen.",
				features: [{
					id: "assassin-1",
					name: "Zusätzliche Übungen",
					description: "2014-Unterklassenmerkmal: You gain proficiency with the disguise kit and poisoner’s kit.",
					level: 3,
					kind: "passive"
				}, {
					id: "assassin-2",
					name: "Meucheln",
					description: "2014-Unterklassenmerkmal: You have advantage on attacks against creatures that have not yet taken a turn. A hit against a surprised creature is a critical hit.",
					level: 3,
					kind: "passive"
				}]
			},
			{
				id: "arcane-trickster",
				name: "Arkaner Betrüger",
				description: "Ein Schurke, der Täuschung und Heimlichkeit mit begrenzter Magie verbindet.",
				features: [{
					id: "arcane-trickster-1",
					name: "Zauberwirken",
					description: "2014-Unterklassenmerkmal: You gain limited wizard spellcasting using Intelligence. At 3rd level you know mage hand plus two other cantrips and three 1st-level wizard spells, with the 2014 enchantment/illusion restrictions.",
					level: 3,
					kind: "passive"
				}, {
					id: "arcane-trickster-2",
					name: "Fingerfertige Magierhand",
					description: "2014-Unterklassenmerkmal: Your mage hand can be invisible and perform additional roguish tasks such as stowing or retrieving objects, using thieves’ tools, and picking pockets at range.",
					level: 3,
					kind: "passive"
				}]
			},
			{
				id: "inquisitive",
				name: "Inquisitiv",
				description: "Ein Beobachter und Ermittler, der Lügen, Schwächen und verborgene Wahrheiten erkennt.",
				features: [
					{
						id: "inquisitive-1",
						name: "Ohr für Täuschung",
						description: "2014-Unterklassenmerkmal: When an Insight check contests Deception, a d20 roll of 7 or lower counts as an 8.",
						level: 3,
						kind: "passive"
					},
					{
						id: "inquisitive-2",
						name: "Auge fürs Detail",
						description: "2014-Unterklassenmerkmal: As a bonus action, make a Perception check to spot a hidden creature or object, or Investigation to uncover clues.",
						level: 3,
						kind: "bonus-action"
					},
					{
						id: "inquisitive-3",
						name: "Scharfsinniger Kampf",
						description: "2014-Unterklassenmerkmal: As a bonus action, contest your Insight against a creature’s Deception. On success, you can use Sneak Attack against it for 1 minute without advantage, provided you do not have disadvantage.",
						level: 3,
						kind: "bonus-action"
					}
				]
			}
		],
		startingEquipment: [
			"Rapier oder Kurzschwert",
			"Kurzbogen oder Kurzschwert",
			"Einbrecherpaket oder Gewölbeforscherpaket",
			"Lederrüstung",
			"Zwei Dolche",
			"Diebeswerkzeug"
		]
	},
	{
		id: "sorcerer",
		name: "Zauberer",
		description: "Ein angeborener Magiewirker, dessen Macht aus Blutlinie, Schicksal oder einer fremdartigen Quelle stammt.",
		hitDie: 6,
		primaryAbilities: ["charisma"],
		savingThrows: ["constitution", "charisma"],
		armorProficiencies: [],
		weaponProficiencies: [
			"Dolche",
			"Wurfpfeile",
			"Schleudern",
			"Kampfstäbe",
			"Leichte Armbrüste"
		],
		toolProficiencies: [],
		spellcasting: true,
		spellcastingRules: {
			ability: "charisma",
			progression: "full",
			preparation: "known",
			startsAtLevel: 1
		},
		features: [
			{
				id: "sorcerer-spellcasting",
				name: "Zauberwirken",
				description: "Du kennst Zaubererzauber und wirkst sie mit Charisma. Auf Stufe 1 kennst du 4 Zaubertricks und 2 Zauber des 1. Grades.",
				level: 1,
				kind: "passive"
			},
			{
				id: "sorcerer-origin",
				name: "Zaubererursprung",
				description: "Auf Stufe 1 wählst du den Ursprung deiner angeborenen Magie und erhältst dessen erste Merkmale.",
				level: 1,
				kind: "passive"
			},
			{
				id: "sorcerer-font-of-magic",
				name: "Quelle der Magie",
				description: "Ab Stufe 2 besitzt du Zaubereipunkte in Höhe deiner Zaubererstufe. Du kannst Zauberplätze in Zaubereipunkte umwandeln und umgekehrt.",
				level: 2,
				kind: "resource",
				resource: {
					id: "sorcerer-sorcery-points",
					name: "Zaubereipunkte",
					amount: "class-level",
					recharge: "long-rest"
				}
			},
			{
				id: "sorcerer-metamagic",
				name: "Metamagie",
				description: "Auf Stufe 3 wählst du zwei Metamagie-Optionen, mit denen du Zauber durch den Einsatz von Zaubereipunkten veränderst.",
				level: 3,
				kind: "passive"
			}
		],
		subclasses: [
			{
				id: "draconic-bloodline",
				name: "Drachenblutlinie",
				description: "Eine magische Herkunft, die auf drakonische Abstammung oder Einfluss zurückgeht.",
				features: [{
					id: "draconic-bloodline-1",
					name: "Drachenahne",
					description: "2014-Unterklassenmerkmal: Choose a dragon type. You learn Draconic, and double your proficiency bonus on Charisma checks when interacting with dragons when your proficiency applies.",
					level: 1,
					kind: "passive"
				}, {
					id: "draconic-bloodline-2",
					name: "Drakonische Widerstandskraft",
					description: "2014-Unterklassenmerkmal: Your hit-point maximum increases by 1 per sorcerer level. While unarmored, your AC equals 13 + Dexterity modifier.",
					level: 1,
					kind: "passive"
				}]
			},
			{
				id: "wild-magic",
				name: "Wilde Magie",
				description: "Eine unberechenbare Quelle, deren Kraft sich nicht vollständig kontrollieren lässt.",
				features: [{
					id: "wild-magic-1",
					name: "Woge der wilden Magie",
					description: "2014-Unterklassenmerkmal: After casting a sorcerer spell of 1st level or higher, the GM can have you roll a d20; on a 1, roll on the Wild Magic Surge table.",
					level: 1,
					kind: "passive"
				}, {
					id: "wild-magic-2",
					name: "Gezeiten des Chaos",
					description: "2014-Unterklassenmerkmal: Gain advantage on one attack roll, ability check, or saving throw. It normally refreshes after a long rest, but the GM can trigger a Wild Magic Surge after you cast a sorcerer spell to restore it sooner.",
					level: 1,
					kind: "resource",
					resource: {
						id: "wild-magic-tides-of-chaos-uses",
						name: "Gezeiten des Chaos",
						amount: 1,
						recharge: "long-rest"
					}
				}]
			},
			{
				id: "shadow-magic",
				name: "Schattenmagie",
				description: "Eine düstere Verbindung zu Finsternis, Tod oder der Schattenwelt.",
				features: [{
					id: "shadow-magic-1",
					name: "Augen der Dunkelheit",
					description: "2014-Unterklassenmerkmal: You gain darkvision out to 120 feet.",
					level: 1,
					kind: "passive"
				}, {
					id: "shadow-magic-2",
					name: "Kraft des Grabes",
					description: "2014-Unterklassenmerkmal: When damage would reduce you to 0 hit points, make a Charisma save to drop to 1 instead, except against radiant damage or a critical hit. Once successful, it refreshes after a long rest.",
					level: 1,
					kind: "resource",
					resource: {
						id: "shadow-strength-of-the-grave-uses",
						name: "Kraft des Grabes",
						amount: 1,
						recharge: "long-rest"
					}
				}]
			}
		],
		startingEquipment: [
			"Leichte Armbrust oder einfache Waffe",
			"Komponententasche oder arkaner Fokus",
			"Gewölbeforscherpaket oder Entdeckerpaket",
			"Zwei Dolche"
		]
	},
	{
		id: "warlock",
		name: "Hexenmeister",
		description: "Ein Paktmagier, der seine Kräfte durch eine Bindung an eine mächtige und oft gefährliche Entität erhält.",
		hitDie: 8,
		primaryAbilities: ["charisma"],
		savingThrows: ["wisdom", "charisma"],
		armorProficiencies: ["Leichte Rüstung"],
		weaponProficiencies: ["Einfache Waffen"],
		toolProficiencies: [],
		spellcasting: true,
		spellcastingRules: {
			ability: "charisma",
			progression: "pact",
			preparation: "known",
			startsAtLevel: 1
		},
		features: [
			{
				id: "warlock-otherworldly-patron",
				name: "Jenseitiger Schutzherr",
				description: "Auf Stufe 1 wählst du deinen jenseitigen Schutzherrn und erhältst dessen erste Merkmale.",
				level: 1,
				kind: "passive"
			},
			{
				id: "warlock-pact-magic",
				name: "Paktmagie",
				description: "Du kennst Hexenmeisterzauber und wirkst sie mit Charisma. Deine Pakt-Zauberplätze haben alle denselben Grad und kehren nach kurzer oder langer Rast zurück.",
				level: 1,
				kind: "passive"
			},
			{
				id: "warlock-eldritch-invocations",
				name: "Unheimliche Anrufungen",
				description: "Auf Stufe 2 wählst du zwei Unheimliche Anrufungen und erhältst deren besondere Fähigkeiten.",
				level: 2,
				kind: "passive"
			},
			{
				id: "warlock-pact-boon",
				name: "Paktsegen",
				description: "Auf Stufe 3 gewährt dir dein Schutzherr einen Paktsegen, etwa Kette, Klinge oder Buch.",
				level: 3,
				kind: "passive"
			}
		],
		subclasses: [
			{
				id: "the-fiend",
				name: "Der Unhold",
				description: "Ein Pakt mit infernalischen oder abyssalen Mächten.",
				features: [{
					id: "the-fiend-1",
					name: "Erweiterte Zauberliste",
					description: "2014-Unterklassenmerkmal: The Fiend adds burning hands and command to the warlock spell options available to you at 1st level.",
					level: 1,
					kind: "passive"
				}, {
					id: "the-fiend-2",
					name: "Segen des Dunklen Meisters",
					description: "2014-Unterklassenmerkmal: When you reduce a hostile creature to 0 hit points, gain temporary hit points equal to Charisma modifier + warlock level, minimum 1.",
					level: 1,
					kind: "passive"
				}]
			},
			{
				id: "the-archfey",
				name: "Der Erzfee",
				description: "Ein Pakt mit einer uralten und unberechenbaren Feenmacht.",
				features: [{
					id: "the-archfey-1",
					name: "Erweiterte Zauberliste",
					description: "2014-Unterklassenmerkmal: The Archfey adds faerie fire and sleep to the warlock spell options available to you at 1st level.",
					level: 1,
					kind: "passive"
				}, {
					id: "the-archfey-2",
					name: "Feenpräsenz",
					description: "2014-Unterklassenmerkmal: As an action, creatures in a 10-foot cube originating from you make a Wisdom save or are charmed or frightened by you until the end of your next turn. Once per short or long rest.",
					level: 1,
					kind: "action",
					resource: {
						id: "archfey-fey-presence-uses",
						name: "Feenpräsenz",
						amount: 1,
						recharge: "short-rest"
					}
				}]
			},
			{
				id: "the-great-old-one",
				name: "Der Große Alte",
				description: "Ein Pakt mit einer fremdartigen Entität jenseits gewöhnlicher Vernunft.",
				features: [{
					id: "the-great-old-one-1",
					name: "Erweiterte Zauberliste",
					description: "2014-Unterklassenmerkmal: The Great Old One adds dissonant whispers and Tasha’s hideous laughter to the warlock spell options available to you at 1st level.",
					level: 1,
					kind: "passive"
				}, {
					id: "the-great-old-one-2",
					name: "Erwachter Geist",
					description: "2014-Unterklassenmerkmal: You can communicate telepathically with a creature you can see within 30 feet if it understands at least one language.",
					level: 1,
					kind: "passive"
				}]
			},
			{
				id: "the-undead",
				name: "Der Untote",
				description: "Eine Bindung an eine mächtige untote oder todlose Wesenheit.",
				features: [{
					id: "the-undead-1",
					name: "Erweiterte Zauberliste",
					description: "2014-Unterklassenmerkmal: The Undead adds bane and false life to the warlock spell options available to you at 1st level.",
					level: 1,
					kind: "passive"
				}, {
					id: "the-undead-2",
					name: "Gestalt des Schreckens",
					description: "Als Bonusaktion verwandelst du dich 1 Minute: temporäre TP, Immunität gegen Verängstigt und einmal pro Zug kann ein Treffer Furcht auslösen. Anwendungen = Übungsbonus pro langer Rast.",
					level: 1,
					kind: "bonus-action",
					resource: {
						id: "undead-form-of-dread-uses",
						name: "Gestalt des Schreckens",
						amount: "proficiency-bonus",
						recharge: "long-rest"
					}
				}]
			}
		],
		startingEquipment: [
			"Leichte Armbrust oder einfache Waffe",
			"Komponententasche oder arkaner Fokus",
			"Gelehrtenpaket oder Gewölbeforscherpaket",
			"Lederrüstung",
			"Einfache Waffe",
			"Zwei Dolche"
		]
	},
	{
		id: "wizard",
		name: "Magier",
		description: "Ein gelehrter Zauberkundiger, der arkane Kräfte durch Studium, Disziplin und ein eigenes Zauberbuch beherrscht.",
		hitDie: 6,
		primaryAbilities: ["intelligence"],
		savingThrows: ["intelligence", "wisdom"],
		armorProficiencies: [],
		weaponProficiencies: [
			"Dolche",
			"Wurfpfeile",
			"Schleudern",
			"Kampfstäbe",
			"Leichte Armbrüste"
		],
		toolProficiencies: [],
		spellcasting: true,
		spellcastingRules: {
			ability: "intelligence",
			progression: "full",
			preparation: "spellbook",
			ritualCasting: true,
			startsAtLevel: 1
		},
		features: [
			{
				id: "wizard-spellcasting",
				name: "Zauberwirken",
				description: "Du führst ein Zauberbuch, bereitest Magierzauber daraus vor und wirkst sie mit Intelligenz. Auf Stufe 1 enthält dein Zauberbuch sechs Zauber des 1. Grades.",
				level: 1,
				kind: "passive"
			},
			{
				id: "wizard-ritual-adept",
				name: "Ritualwirken",
				description: "Du kannst einen Magierzauber als Ritual wirken, wenn er das Ritualmerkmal besitzt und in deinem Zauberbuch steht; er muss dafür nicht vorbereitet sein.",
				level: 1,
				kind: "passive"
			},
			{
				id: "wizard-arcane-recovery",
				name: "Arkane Erholung",
				description: "Einmal pro Tag kannst du nach einer kurzen Rast verbrauchte Zauberplätze mit einer Gesamtsumme von höchstens der Hälfte deiner Magierstufe (aufgerundet) zurückerlangen; kein Platz darf Grad 6 oder höher sein.",
				level: 1,
				kind: "resource",
				resource: {
					id: "wizard-arcane-recovery-uses",
					name: "Arkane Erholung",
					amount: 1,
					recharge: "long-rest"
				}
			},
			{
				id: "wizard-arcane-tradition",
				name: "Arkane Tradition",
				description: "Auf Stufe 2 wählst du deine arkane Tradition und erhältst deren erste Merkmale.",
				level: 2,
				kind: "passive"
			}
		],
		subclasses: [
			{
				id: "school-of-abjuration",
				name: "Schule der Bannmagie",
				description: "Eine Schule für Schutz, Gegenzauber und die Kontrolle magischer Gefahren.",
				features: [{
					id: "school-of-abjuration-1",
					name: "Bannmagie-Gelehrter",
					description: "2014-Unterklassenmerkmal: The gold and time needed to copy an abjuration spell into your spellbook are halved.",
					level: 2,
					kind: "passive"
				}, {
					id: "school-of-abjuration-2",
					name: "Arkaner Schutz",
					description: "2014-Unterklassenmerkmal: When you cast an abjuration spell of 1st level or higher, create a ward with hit points equal to twice wizard level + Intelligence modifier; later abjuration spells restore ward hit points.",
					level: 2,
					kind: "passive"
				}]
			},
			{
				id: "school-of-evocation",
				name: "Schule der Hervorrufung",
				description: "Eine Schule für direkte, zerstörerische und elementare Magie.",
				features: [{
					id: "school-of-evocation-1",
					name: "Hervorrufungs-Gelehrter",
					description: "2014-Unterklassenmerkmal: The gold and time needed to copy an evocation spell into your spellbook are halved.",
					level: 2,
					kind: "passive"
				}, {
					id: "school-of-evocation-2",
					name: "Zauber formen",
					description: "2014-Unterklassenmerkmal: When you cast an evocation spell affecting creatures you can see, protect up to 1 + spell level of them from its worst effects.",
					level: 2,
					kind: "passive"
				}]
			},
			{
				id: "school-of-necromancy",
				name: "Schule der Nekromantie",
				description: "Eine dunkle Schule über Tod, Lebensenergie und untote Wesen.",
				features: [{
					id: "school-of-necromancy-1",
					name: "Nekromantie-Gelehrter",
					description: "2014-Unterklassenmerkmal: The gold and time needed to copy a necromancy spell into your spellbook are halved.",
					level: 2,
					kind: "passive"
				}, {
					id: "school-of-necromancy-2",
					name: "Düstere Ernte",
					description: "2014-Unterklassenmerkmal: Once per turn when you kill creatures with a spell of 1st level or higher, regain hit points equal to twice the spell’s level, or three times for necromancy spells; constructs and undead do not trigger it.",
					level: 2,
					kind: "passive"
				}]
			},
			{
				id: "school-of-illusion",
				name: "Schule der Illusion",
				description: "Eine Schule für Täuschung, Sinnesbilder und die Manipulation von Wahrnehmung.",
				features: [{
					id: "school-of-illusion-1",
					name: "Illusions-Gelehrter",
					description: "2014-Unterklassenmerkmal: The gold and time needed to copy an illusion spell into your spellbook are halved.",
					level: 2,
					kind: "passive"
				}, {
					id: "school-of-illusion-2",
					name: "Verbesserte Einfache Illusion",
					description: "2014-Unterklassenmerkmal: You learn minor illusion, or another wizard cantrip if you already know it. Your minor illusion can create both a sound and an image with one casting.",
					level: 2,
					kind: "passive"
				}]
			}
		],
		startingEquipment: [
			"Kampfstab oder Dolch",
			"Komponententasche oder arkaner Fokus",
			"Gelehrtenpaket oder Entdeckerpaket",
			"Zauberbuch"
		]
	}
];
[
	{
		"ruleset": "2014",
		"class_id": "barbarian",
		"class_de": "Barbar",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Stärke",
		"priority": "ST > KO > GE > WE",
		"hit_die": "W12",
		"fixed_hp_gain": "7 + KO-Modifikator",
		"saving_throws": "Stärke, Konstitution",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Tierkunde, Athletik, Einschüchtern, Naturkunde, Wahrnehmung oder Überleben",
		"features": "Kampfrausch; Ungepanzerte Verteidigung",
		"resources_and_spellcasting": "2 Rausche, +2 Schaden"
	},
	{
		"ruleset": "2014",
		"class_id": "barbarian",
		"class_de": "Barbar",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Stärke",
		"priority": "ST > KO > GE > WE",
		"hit_die": "W12",
		"fixed_hp_gain": "7 + KO-Modifikator",
		"saving_throws": "Stärke, Konstitution",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Tierkunde, Athletik, Einschüchtern, Naturkunde, Wahrnehmung oder Überleben",
		"features": "Rücksichtsloser Angriff; Gefahrengespür",
		"resources_and_spellcasting": "2 Rausche, +2 Schaden"
	},
	{
		"ruleset": "2014",
		"class_id": "barbarian",
		"class_de": "Barbar",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Stärke",
		"priority": "ST > KO > GE > WE",
		"hit_die": "W12",
		"fixed_hp_gain": "7 + KO-Modifikator",
		"saving_throws": "Stärke, Konstitution",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Tierkunde, Athletik, Einschüchtern, Naturkunde, Wahrnehmung oder Überleben",
		"features": "Urpfad",
		"resources_and_spellcasting": "3 Rausche, +2 Schaden; Unterklasse"
	},
	{
		"ruleset": "2014",
		"class_id": "bard",
		"class_de": "Barde",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > GE > KO > WE",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Geschicklichkeit, Charisma",
		"armor": "Leichte Rüstung",
		"weapons": "2014: einfache Waffen plus Handarmbrust, Langschwert, Rapier, Kurzschwert; 2024: einfache Waffen",
		"skill_choices": "3 beliebige",
		"features": "Zauberwirken; Bardische Inspiration W6",
		"resources_and_spellcasting": "2 Zaubertricks; 4 bekannte Zauber; Plätze 2"
	},
	{
		"ruleset": "2014",
		"class_id": "bard",
		"class_de": "Barde",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > GE > KO > WE",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Geschicklichkeit, Charisma",
		"armor": "Leichte Rüstung",
		"weapons": "2014: einfache Waffen plus Handarmbrust, Langschwert, Rapier, Kurzschwert; 2024: einfache Waffen",
		"skill_choices": "3 beliebige",
		"features": "Alleskönner; Lied der Erholung W6",
		"resources_and_spellcasting": "2 Zaubertricks; 5 bekannte Zauber; Plätze 3"
	},
	{
		"ruleset": "2014",
		"class_id": "bard",
		"class_de": "Barde",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > GE > KO > WE",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Geschicklichkeit, Charisma",
		"armor": "Leichte Rüstung",
		"weapons": "2014: einfache Waffen plus Handarmbrust, Langschwert, Rapier, Kurzschwert; 2024: einfache Waffen",
		"skill_choices": "3 beliebige",
		"features": "Bardenschule; Expertise",
		"resources_and_spellcasting": "2 Zaubertricks; 6 bekannte Zauber; Plätze 4/2"
	},
	{
		"ruleset": "2014",
		"class_id": "cleric",
		"class_de": "Kleriker",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Weisheit",
		"priority": "WE > KO > ST oder GE > CH",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache Waffen",
		"skill_choices": "2: Geschichte, Motiv erkennen, Heilkunde, Überzeugen oder Religion",
		"features": "Zauberwirken; Göttliche Domäne",
		"resources_and_spellcasting": "3 Zaubertricks; vorbereitet WE-Mod + Stufe; Plätze 2"
	},
	{
		"ruleset": "2014",
		"class_id": "cleric",
		"class_de": "Kleriker",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Weisheit",
		"priority": "WE > KO > ST oder GE > CH",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache Waffen",
		"skill_choices": "2: Geschichte, Motiv erkennen, Heilkunde, Überzeugen oder Religion",
		"features": "Göttliche Macht fokussieren (1); Domänenoption",
		"resources_and_spellcasting": "3 Zaubertricks; Plätze 3"
	},
	{
		"ruleset": "2014",
		"class_id": "cleric",
		"class_de": "Kleriker",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Weisheit",
		"priority": "WE > KO > ST oder GE > CH",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache Waffen",
		"skill_choices": "2: Geschichte, Motiv erkennen, Heilkunde, Überzeugen oder Religion",
		"features": "Zauber 2. Grades",
		"resources_and_spellcasting": "3 Zaubertricks; Plätze 4/2"
	},
	{
		"ruleset": "2014",
		"class_id": "druid",
		"class_de": "Druide",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Weisheit",
		"priority": "WE > KO > GE > IN",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Intelligenz, Weisheit",
		"armor": "2014: leicht/mittel und Schilde, traditionell kein Metall; 2024: leicht und Schilde",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Tierkunde, Motiv erkennen, Heilkunde, Naturkunde, Wahrnehmung, Religion oder Überleben",
		"features": "Druidisch; Zauberwirken",
		"resources_and_spellcasting": "2 Zaubertricks; vorbereitet WE-Mod + Stufe; Plätze 2"
	},
	{
		"ruleset": "2014",
		"class_id": "druid",
		"class_de": "Druide",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Weisheit",
		"priority": "WE > KO > GE > IN",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Intelligenz, Weisheit",
		"armor": "2014: leicht/mittel und Schilde, traditionell kein Metall; 2024: leicht und Schilde",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Tierkunde, Motiv erkennen, Heilkunde, Naturkunde, Wahrnehmung, Religion oder Überleben",
		"features": "Tiergestalt (2/Rast); Druidenzirkel",
		"resources_and_spellcasting": "2 Zaubertricks; Plätze 3"
	},
	{
		"ruleset": "2014",
		"class_id": "druid",
		"class_de": "Druide",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Weisheit",
		"priority": "WE > KO > GE > IN",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Intelligenz, Weisheit",
		"armor": "2014: leicht/mittel und Schilde, traditionell kein Metall; 2024: leicht und Schilde",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Tierkunde, Motiv erkennen, Heilkunde, Naturkunde, Wahrnehmung, Religion oder Überleben",
		"features": "Zauber 2. Grades",
		"resources_and_spellcasting": "2 Zaubertricks; Plätze 4/2"
	},
	{
		"ruleset": "2014",
		"class_id": "fighter",
		"class_de": "Kämpfer",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Stärke oder Geschicklichkeit",
		"priority": "ST oder GE > KO > WE; das andere Angriffsattribut meist nachrangig",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Stärke, Konstitution",
		"armor": "Alle Rüstungen, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Akrobatik, Tierkunde, Athletik, Geschichte, Motiv erkennen, Einschüchtern, Überzeugen, Wahrnehmung oder Überleben",
		"features": "Kampfstil; Durchschnaufen",
		"resources_and_spellcasting": "Durchschnaufen 1/kurze oder lange Rast"
	},
	{
		"ruleset": "2014",
		"class_id": "fighter",
		"class_de": "Kämpfer",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Stärke oder Geschicklichkeit",
		"priority": "ST oder GE > KO > WE; das andere Angriffsattribut meist nachrangig",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Stärke, Konstitution",
		"armor": "Alle Rüstungen, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Akrobatik, Tierkunde, Athletik, Geschichte, Motiv erkennen, Einschüchtern, Überzeugen, Wahrnehmung oder Überleben",
		"features": "Tatendrang",
		"resources_and_spellcasting": "Tatendrang 1/kurze oder lange Rast"
	},
	{
		"ruleset": "2014",
		"class_id": "fighter",
		"class_de": "Kämpfer",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Stärke oder Geschicklichkeit",
		"priority": "ST oder GE > KO > WE; das andere Angriffsattribut meist nachrangig",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Stärke, Konstitution",
		"armor": "Alle Rüstungen, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Akrobatik, Tierkunde, Athletik, Geschichte, Motiv erkennen, Einschüchtern, Überzeugen, Wahrnehmung oder Überleben",
		"features": "Kriegerischer Archetyp",
		"resources_and_spellcasting": "Unterklasse"
	},
	{
		"ruleset": "2014",
		"class_id": "monk",
		"class_de": "Mönch",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit und Weisheit",
		"priority": "GE > WE > KO > ST",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Stärke, Geschicklichkeit",
		"armor": "Keine",
		"weapons": "Einfache Waffen; zusätzlich geeignete leichte Kriegswaffen nach 2024-Regeln",
		"skill_choices": "2: Akrobatik, Athletik, Geschichte, Motiv erkennen, Religion oder Heimlichkeit",
		"features": "Ungepanzerte Verteidigung; Kampfkunst",
		"resources_and_spellcasting": "Kampfkunst W4"
	},
	{
		"ruleset": "2014",
		"class_id": "monk",
		"class_de": "Mönch",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit und Weisheit",
		"priority": "GE > WE > KO > ST",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Stärke, Geschicklichkeit",
		"armor": "Keine",
		"weapons": "Einfache Waffen; zusätzlich geeignete leichte Kriegswaffen nach 2024-Regeln",
		"skill_choices": "2: Akrobatik, Athletik, Geschichte, Motiv erkennen, Religion oder Heimlichkeit",
		"features": "Ki; Ungepanzerte Bewegung",
		"resources_and_spellcasting": "2 Ki; +10 Fuß"
	},
	{
		"ruleset": "2014",
		"class_id": "monk",
		"class_de": "Mönch",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit und Weisheit",
		"priority": "GE > WE > KO > ST",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Stärke, Geschicklichkeit",
		"armor": "Keine",
		"weapons": "Einfache Waffen; zusätzlich geeignete leichte Kriegswaffen nach 2024-Regeln",
		"skill_choices": "2: Akrobatik, Athletik, Geschichte, Motiv erkennen, Religion oder Heimlichkeit",
		"features": "Mönchstradition; Geschosse abwehren",
		"resources_and_spellcasting": "3 Ki; Kampfkunst W4; Unterklasse"
	},
	{
		"ruleset": "2014",
		"class_id": "paladin",
		"class_de": "Paladin",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Stärke und Charisma",
		"priority": "ST > CH > KO > WE; GE-Paladine optional",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Alle Rüstungen, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Athletik, Motiv erkennen, Einschüchtern, Heilkunde, Überzeugen oder Religion",
		"features": "Göttliches Gespür; Handauflegen",
		"resources_and_spellcasting": "Gespür 1+CH-Mod/LR; Heilpool 5"
	},
	{
		"ruleset": "2014",
		"class_id": "paladin",
		"class_de": "Paladin",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Stärke und Charisma",
		"priority": "ST > CH > KO > WE; GE-Paladine optional",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Alle Rüstungen, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Athletik, Motiv erkennen, Einschüchtern, Heilkunde, Überzeugen oder Religion",
		"features": "Kampfstil; Zauberwirken; Göttliches Niederstrecken",
		"resources_and_spellcasting": "Heilpool 10; Plätze 2"
	},
	{
		"ruleset": "2014",
		"class_id": "paladin",
		"class_de": "Paladin",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Stärke und Charisma",
		"priority": "ST > CH > KO > WE; GE-Paladine optional",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Alle Rüstungen, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Athletik, Motiv erkennen, Einschüchtern, Heilkunde, Überzeugen oder Religion",
		"features": "Göttliche Gesundheit; Heiliger Eid",
		"resources_and_spellcasting": "Heilpool 15; Plätze 3; Unterklasse/Göttliche Macht fokussieren"
	},
	{
		"ruleset": "2014",
		"class_id": "ranger",
		"class_de": "Waldläufer",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit und Weisheit",
		"priority": "GE > WE > KO > ST",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Stärke, Geschicklichkeit",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "3: Tierkunde, Athletik, Motiv erkennen, Nachforschungen, Naturkunde, Wahrnehmung, Heimlichkeit oder Überleben",
		"features": "Erzfeind; Natürlicher Entdecker",
		"resources_and_spellcasting": "Erkundungsentscheidungen"
	},
	{
		"ruleset": "2014",
		"class_id": "ranger",
		"class_de": "Waldläufer",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit und Weisheit",
		"priority": "GE > WE > KO > ST",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Stärke, Geschicklichkeit",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "3: Tierkunde, Athletik, Motiv erkennen, Nachforschungen, Naturkunde, Wahrnehmung, Heimlichkeit oder Überleben",
		"features": "Kampfstil; Zauberwirken",
		"resources_and_spellcasting": "2 bekannte Zauber; Plätze 2"
	},
	{
		"ruleset": "2014",
		"class_id": "ranger",
		"class_de": "Waldläufer",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit und Weisheit",
		"priority": "GE > WE > KO > ST",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Stärke, Geschicklichkeit",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "3: Tierkunde, Athletik, Motiv erkennen, Nachforschungen, Naturkunde, Wahrnehmung, Heimlichkeit oder Überleben",
		"features": "Waldläuferarchetyp; Urbewusstsein",
		"resources_and_spellcasting": "3 bekannte Zauber; Plätze 3; Unterklasse"
	},
	{
		"ruleset": "2014",
		"class_id": "rogue",
		"class_de": "Schurke",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit",
		"priority": "GE > KO > WE oder IN > CH",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Geschicklichkeit, Intelligenz",
		"armor": "Leichte Rüstung",
		"weapons": "2014: einfache plus ausgewählte; 2024: einfache und Kriegswaffen mit Finesse oder Leicht",
		"skill_choices": "4: Akrobatik, Athletik, Täuschen, Motiv erkennen, Einschüchtern, Nachforschungen, Wahrnehmung, Überzeugen/Auftreten, Fingerfertigkeit oder Heimlichkeit",
		"features": "Expertise; Hinterhältiger Angriff; Diebeszeichen",
		"resources_and_spellcasting": "Hinterhältiger Angriff 1W6"
	},
	{
		"ruleset": "2014",
		"class_id": "rogue",
		"class_de": "Schurke",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit",
		"priority": "GE > KO > WE oder IN > CH",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Geschicklichkeit, Intelligenz",
		"armor": "Leichte Rüstung",
		"weapons": "2014: einfache plus ausgewählte; 2024: einfache und Kriegswaffen mit Finesse oder Leicht",
		"skill_choices": "4: Akrobatik, Athletik, Täuschen, Motiv erkennen, Einschüchtern, Nachforschungen, Wahrnehmung, Überzeugen/Auftreten, Fingerfertigkeit oder Heimlichkeit",
		"features": "Raffinierte Aktion",
		"resources_and_spellcasting": "Hinterhältiger Angriff 1W6"
	},
	{
		"ruleset": "2014",
		"class_id": "rogue",
		"class_de": "Schurke",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit",
		"priority": "GE > KO > WE oder IN > CH",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Geschicklichkeit, Intelligenz",
		"armor": "Leichte Rüstung",
		"weapons": "2014: einfache plus ausgewählte; 2024: einfache und Kriegswaffen mit Finesse oder Leicht",
		"skill_choices": "4: Akrobatik, Athletik, Täuschen, Motiv erkennen, Einschüchtern, Nachforschungen, Wahrnehmung, Überzeugen/Auftreten, Fingerfertigkeit oder Heimlichkeit",
		"features": "Schurkenarchetyp",
		"resources_and_spellcasting": "Hinterhältiger Angriff 2W6; Unterklasse"
	},
	{
		"ruleset": "2014",
		"class_id": "sorcerer",
		"class_de": "Zauberer",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > KO > GE > WE",
		"hit_die": "W6",
		"fixed_hp_gain": "4 + KO-Modifikator",
		"saving_throws": "Konstitution, Charisma",
		"armor": "Keine",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Täuschen, Motiv erkennen, Einschüchtern, Überzeugen oder Religion",
		"features": "Zauberwirken; Magischer Ursprung",
		"resources_and_spellcasting": "4 Zaubertricks; 2 bekannte Zauber; Plätze 2"
	},
	{
		"ruleset": "2014",
		"class_id": "sorcerer",
		"class_de": "Zauberer",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > KO > GE > WE",
		"hit_die": "W6",
		"fixed_hp_gain": "4 + KO-Modifikator",
		"saving_throws": "Konstitution, Charisma",
		"armor": "Keine",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Täuschen, Motiv erkennen, Einschüchtern, Überzeugen oder Religion",
		"features": "Quelle der Magie",
		"resources_and_spellcasting": "2 Zaubereipunkte; 3 bekannte Zauber; Plätze 3"
	},
	{
		"ruleset": "2014",
		"class_id": "sorcerer",
		"class_de": "Zauberer",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > KO > GE > WE",
		"hit_die": "W6",
		"fixed_hp_gain": "4 + KO-Modifikator",
		"saving_throws": "Konstitution, Charisma",
		"armor": "Keine",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Täuschen, Motiv erkennen, Einschüchtern, Überzeugen oder Religion",
		"features": "Metamagie (2 Optionen)",
		"resources_and_spellcasting": "3 Zaubereipunkte; 4 bekannte Zauber; Plätze 4/2"
	},
	{
		"ruleset": "2014",
		"class_id": "warlock",
		"class_de": "Hexenmeister",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > KO > GE > WE",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Leichte Rüstung",
		"weapons": "Einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Täuschen, Geschichte, Einschüchtern, Nachforschungen, Naturkunde oder Religion",
		"features": "Jenseitiger Patron; Paktmagie",
		"resources_and_spellcasting": "2 Zaubertricks; 2 bekannte Zauber; 1 Platz Grad 1"
	},
	{
		"ruleset": "2014",
		"class_id": "warlock",
		"class_de": "Hexenmeister",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > KO > GE > WE",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Leichte Rüstung",
		"weapons": "Einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Täuschen, Geschichte, Einschüchtern, Nachforschungen, Naturkunde oder Religion",
		"features": "Unheimliche Anrufungen (2)",
		"resources_and_spellcasting": "3 bekannte Zauber; 2 Plätze Grad 1"
	},
	{
		"ruleset": "2014",
		"class_id": "warlock",
		"class_de": "Hexenmeister",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > KO > GE > WE",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Leichte Rüstung",
		"weapons": "Einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Täuschen, Geschichte, Einschüchtern, Nachforschungen, Naturkunde oder Religion",
		"features": "Paktsegen",
		"resources_and_spellcasting": "4 bekannte Zauber; 2 Plätze Grad 2"
	},
	{
		"ruleset": "2014",
		"class_id": "wizard",
		"class_de": "Magier",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Intelligenz",
		"priority": "IN > KO > GE > WE",
		"hit_die": "W6",
		"fixed_hp_gain": "4 + KO-Modifikator",
		"saving_throws": "Intelligenz, Weisheit",
		"armor": "Keine",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Geschichte, Motiv erkennen, Nachforschungen, Heilkunde, Naturkunde oder Religion",
		"features": "Zauberwirken; Arkane Erholung",
		"resources_and_spellcasting": "3 Zaubertricks; Zauberbuch 6; vorbereitet IN-Mod + Stufe; Plätze 2"
	},
	{
		"ruleset": "2014",
		"class_id": "wizard",
		"class_de": "Magier",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Intelligenz",
		"priority": "IN > KO > GE > WE",
		"hit_die": "W6",
		"fixed_hp_gain": "4 + KO-Modifikator",
		"saving_throws": "Intelligenz, Weisheit",
		"armor": "Keine",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Geschichte, Motiv erkennen, Nachforschungen, Heilkunde, Naturkunde oder Religion",
		"features": "Arkane Tradition",
		"resources_and_spellcasting": "Zauberbuch +2; Plätze 3"
	},
	{
		"ruleset": "2014",
		"class_id": "wizard",
		"class_de": "Magier",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Intelligenz",
		"priority": "IN > KO > GE > WE",
		"hit_die": "W6",
		"fixed_hp_gain": "4 + KO-Modifikator",
		"saving_throws": "Intelligenz, Weisheit",
		"armor": "Keine",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Geschichte, Motiv erkennen, Nachforschungen, Heilkunde, Naturkunde oder Religion",
		"features": "Zauber 2. Grades",
		"resources_and_spellcasting": "Zauberbuch +2; Plätze 4/2"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "barbarian",
		"class_de": "Barbar",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Stärke",
		"priority": "ST > KO > GE > WE",
		"hit_die": "W12",
		"fixed_hp_gain": "7 + KO-Modifikator",
		"saving_throws": "Stärke, Konstitution",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Tierkunde, Athletik, Einschüchtern, Naturkunde, Wahrnehmung oder Überleben",
		"features": "Kampfrausch; Ungepanzerte Verteidigung; Waffenmeisterschaft",
		"resources_and_spellcasting": "2 Rausche; +2 Schaden; 2 Meisterschaften"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "barbarian",
		"class_de": "Barbar",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Stärke",
		"priority": "ST > KO > GE > WE",
		"hit_die": "W12",
		"fixed_hp_gain": "7 + KO-Modifikator",
		"saving_throws": "Stärke, Konstitution",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Tierkunde, Athletik, Einschüchtern, Naturkunde, Wahrnehmung oder Überleben",
		"features": "Gefahrengespür; Rücksichtsloser Angriff",
		"resources_and_spellcasting": "2 Rausche"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "barbarian",
		"class_de": "Barbar",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Stärke",
		"priority": "ST > KO > GE > WE",
		"hit_die": "W12",
		"fixed_hp_gain": "7 + KO-Modifikator",
		"saving_throws": "Stärke, Konstitution",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Tierkunde, Athletik, Einschüchtern, Naturkunde, Wahrnehmung oder Überleben",
		"features": "Barbarenunterklasse; Urwissen",
		"resources_and_spellcasting": "3 Rausche; Unterklasse"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "bard",
		"class_de": "Barde",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > GE > KO > WE",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Geschicklichkeit, Charisma",
		"armor": "Leichte Rüstung",
		"weapons": "2014: einfache Waffen plus Handarmbrust, Langschwert, Rapier, Kurzschwert; 2024: einfache Waffen",
		"skill_choices": "3 beliebige",
		"features": "Bardische Inspiration; Zauberwirken",
		"resources_and_spellcasting": "2 Zaubertricks; 4 vorbereitete Zauber; Plätze 2"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "bard",
		"class_de": "Barde",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > GE > KO > WE",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Geschicklichkeit, Charisma",
		"armor": "Leichte Rüstung",
		"weapons": "2014: einfache Waffen plus Handarmbrust, Langschwert, Rapier, Kurzschwert; 2024: einfache Waffen",
		"skill_choices": "3 beliebige",
		"features": "Expertise; Alleskönner",
		"resources_and_spellcasting": "2 Zaubertricks; 5 vorbereitete Zauber; Plätze 3"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "bard",
		"class_de": "Barde",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > GE > KO > WE",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Geschicklichkeit, Charisma",
		"armor": "Leichte Rüstung",
		"weapons": "2014: einfache Waffen plus Handarmbrust, Langschwert, Rapier, Kurzschwert; 2024: einfache Waffen",
		"skill_choices": "3 beliebige",
		"features": "Bardenunterklasse",
		"resources_and_spellcasting": "2 Zaubertricks; 6 vorbereitete Zauber; Plätze 4/2"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "cleric",
		"class_de": "Kleriker",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Weisheit",
		"priority": "WE > KO > ST oder GE > CH",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache Waffen",
		"skill_choices": "2: Geschichte, Motiv erkennen, Heilkunde, Überzeugen oder Religion",
		"features": "Zauberwirken; Göttlicher Orden",
		"resources_and_spellcasting": "3 Zaubertricks; 4 vorbereitete Zauber; Plätze 2"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "cleric",
		"class_de": "Kleriker",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Weisheit",
		"priority": "WE > KO > ST oder GE > CH",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache Waffen",
		"skill_choices": "2: Geschichte, Motiv erkennen, Heilkunde, Überzeugen oder Religion",
		"features": "Göttliche Macht fokussieren",
		"resources_and_spellcasting": "3 Zaubertricks; 5 vorbereitete Zauber; Plätze 3"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "cleric",
		"class_de": "Kleriker",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Weisheit",
		"priority": "WE > KO > ST oder GE > CH",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache Waffen",
		"skill_choices": "2: Geschichte, Motiv erkennen, Heilkunde, Überzeugen oder Religion",
		"features": "Klerikerunterklasse",
		"resources_and_spellcasting": "3 Zaubertricks; 6 vorbereitete Zauber; Plätze 4/2"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "druid",
		"class_de": "Druide",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Weisheit",
		"priority": "WE > KO > GE > IN",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Intelligenz, Weisheit",
		"armor": "2014: leicht/mittel und Schilde, traditionell kein Metall; 2024: leicht und Schilde",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Tierkunde, Motiv erkennen, Heilkunde, Naturkunde, Wahrnehmung, Religion oder Überleben",
		"features": "Zauberwirken; Druidisch; Urorden",
		"resources_and_spellcasting": "2 Zaubertricks; 4 vorbereitete Zauber; Plätze 2"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "druid",
		"class_de": "Druide",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Weisheit",
		"priority": "WE > KO > GE > IN",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Intelligenz, Weisheit",
		"armor": "2014: leicht/mittel und Schilde, traditionell kein Metall; 2024: leicht und Schilde",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Tierkunde, Motiv erkennen, Heilkunde, Naturkunde, Wahrnehmung, Religion oder Überleben",
		"features": "Tiergestalt; Wilder Gefährte",
		"resources_and_spellcasting": "2 Tiergestalten; 5 vorbereitete Zauber; Plätze 3"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "druid",
		"class_de": "Druide",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Weisheit",
		"priority": "WE > KO > GE > IN",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Intelligenz, Weisheit",
		"armor": "2014: leicht/mittel und Schilde, traditionell kein Metall; 2024: leicht und Schilde",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Tierkunde, Motiv erkennen, Heilkunde, Naturkunde, Wahrnehmung, Religion oder Überleben",
		"features": "Druidenunterklasse",
		"resources_and_spellcasting": "2 Tiergestalten; 6 vorbereitete Zauber; Plätze 4/2"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "fighter",
		"class_de": "Kämpfer",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Stärke oder Geschicklichkeit",
		"priority": "ST oder GE > KO > WE; das andere Angriffsattribut meist nachrangig",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Stärke, Konstitution",
		"armor": "Alle Rüstungen, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Akrobatik, Tierkunde, Athletik, Geschichte, Motiv erkennen, Einschüchtern, Überzeugen, Wahrnehmung oder Überleben",
		"features": "Kampfstil; Durchschnaufen; Waffenmeisterschaft",
		"resources_and_spellcasting": "2 Durchschnaufen; 3 Meisterschaften"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "fighter",
		"class_de": "Kämpfer",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Stärke oder Geschicklichkeit",
		"priority": "ST oder GE > KO > WE; das andere Angriffsattribut meist nachrangig",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Stärke, Konstitution",
		"armor": "Alle Rüstungen, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Akrobatik, Tierkunde, Athletik, Geschichte, Motiv erkennen, Einschüchtern, Überzeugen, Wahrnehmung oder Überleben",
		"features": "Tatendrang; Taktischer Verstand",
		"resources_and_spellcasting": "Tatendrang 1; 2 Durchschnaufen"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "fighter",
		"class_de": "Kämpfer",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Stärke oder Geschicklichkeit",
		"priority": "ST oder GE > KO > WE; das andere Angriffsattribut meist nachrangig",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Stärke, Konstitution",
		"armor": "Alle Rüstungen, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Akrobatik, Tierkunde, Athletik, Geschichte, Motiv erkennen, Einschüchtern, Überzeugen, Wahrnehmung oder Überleben",
		"features": "Kämpferunterklasse",
		"resources_and_spellcasting": "Unterklasse"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "monk",
		"class_de": "Mönch",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit und Weisheit",
		"priority": "GE > WE > KO > ST",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Stärke, Geschicklichkeit",
		"armor": "Keine",
		"weapons": "Einfache Waffen; zusätzlich geeignete leichte Kriegswaffen nach 2024-Regeln",
		"skill_choices": "2: Akrobatik, Athletik, Geschichte, Motiv erkennen, Religion oder Heimlichkeit",
		"features": "Kampfkunst; Ungepanzerte Verteidigung",
		"resources_and_spellcasting": "Kampfkunst W6"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "monk",
		"class_de": "Mönch",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit und Weisheit",
		"priority": "GE > WE > KO > ST",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Stärke, Geschicklichkeit",
		"armor": "Keine",
		"weapons": "Einfache Waffen; zusätzlich geeignete leichte Kriegswaffen nach 2024-Regeln",
		"skill_choices": "2: Akrobatik, Athletik, Geschichte, Motiv erkennen, Religion oder Heimlichkeit",
		"features": "Mönchsfokus; Ungepanzerte Bewegung; Unheimlicher Stoffwechsel",
		"resources_and_spellcasting": "2 Fokuspunkte; +10 Fuß"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "monk",
		"class_de": "Mönch",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit und Weisheit",
		"priority": "GE > WE > KO > ST",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Stärke, Geschicklichkeit",
		"armor": "Keine",
		"weapons": "Einfache Waffen; zusätzlich geeignete leichte Kriegswaffen nach 2024-Regeln",
		"skill_choices": "2: Akrobatik, Athletik, Geschichte, Motiv erkennen, Religion oder Heimlichkeit",
		"features": "Angriffe abwehren; Mönchsunterklasse",
		"resources_and_spellcasting": "3 Fokuspunkte; Unterklasse"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "paladin",
		"class_de": "Paladin",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Stärke und Charisma",
		"priority": "ST > CH > KO > WE; GE-Paladine optional",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Alle Rüstungen, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Athletik, Motiv erkennen, Einschüchtern, Heilkunde, Überzeugen oder Religion",
		"features": "Handauflegen; Zauberwirken; Waffenmeisterschaft",
		"resources_and_spellcasting": "2 vorbereitete Zauber; Plätze 2"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "paladin",
		"class_de": "Paladin",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Stärke und Charisma",
		"priority": "ST > CH > KO > WE; GE-Paladine optional",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Alle Rüstungen, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Athletik, Motiv erkennen, Einschüchtern, Heilkunde, Überzeugen oder Religion",
		"features": "Kampfstil; Bannschlag des Paladins",
		"resources_and_spellcasting": "3 vorbereitete Zauber; Plätze 2"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "paladin",
		"class_de": "Paladin",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Stärke und Charisma",
		"priority": "ST > CH > KO > WE; GE-Paladine optional",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Alle Rüstungen, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "2: Athletik, Motiv erkennen, Einschüchtern, Heilkunde, Überzeugen oder Religion",
		"features": "Göttliche Macht fokussieren; Paladinunterklasse",
		"resources_and_spellcasting": "2 Anwendungen; 4 vorbereitete Zauber; Plätze 3"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "ranger",
		"class_de": "Waldläufer",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit und Weisheit",
		"priority": "GE > WE > KO > ST",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Stärke, Geschicklichkeit",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "3: Tierkunde, Athletik, Motiv erkennen, Nachforschungen, Naturkunde, Wahrnehmung, Heimlichkeit oder Überleben",
		"features": "Zauberwirken; Erzfeind; Waffenmeisterschaft",
		"resources_and_spellcasting": "2 vorbereitete Zauber; Plätze 2; 2 Meisterschaften"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "ranger",
		"class_de": "Waldläufer",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit und Weisheit",
		"priority": "GE > WE > KO > ST",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Stärke, Geschicklichkeit",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "3: Tierkunde, Athletik, Motiv erkennen, Nachforschungen, Naturkunde, Wahrnehmung, Heimlichkeit oder Überleben",
		"features": "Geschickter Entdecker; Kampfstil",
		"resources_and_spellcasting": "3 vorbereitete Zauber; Plätze 2"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "ranger",
		"class_de": "Waldläufer",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit und Weisheit",
		"priority": "GE > WE > KO > ST",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Stärke, Geschicklichkeit",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "3: Tierkunde, Athletik, Motiv erkennen, Nachforschungen, Naturkunde, Wahrnehmung, Heimlichkeit oder Überleben",
		"features": "Waldläuferunterklasse",
		"resources_and_spellcasting": "4 vorbereitete Zauber; Plätze 3"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "rogue",
		"class_de": "Schurke",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit",
		"priority": "GE > KO > WE oder IN > CH",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Geschicklichkeit, Intelligenz",
		"armor": "Leichte Rüstung",
		"weapons": "2014: einfache plus ausgewählte; 2024: einfache und Kriegswaffen mit Finesse oder Leicht",
		"skill_choices": "4: Akrobatik, Athletik, Täuschen, Motiv erkennen, Einschüchtern, Nachforschungen, Wahrnehmung, Überzeugen/Auftreten, Fingerfertigkeit oder Heimlichkeit",
		"features": "Expertise; Hinterhältiger Angriff; Diebeszeichen; Waffenmeisterschaft",
		"resources_and_spellcasting": "Hinterhältiger Angriff 1W6; 2 Meisterschaften"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "rogue",
		"class_de": "Schurke",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit",
		"priority": "GE > KO > WE oder IN > CH",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Geschicklichkeit, Intelligenz",
		"armor": "Leichte Rüstung",
		"weapons": "2014: einfache plus ausgewählte; 2024: einfache und Kriegswaffen mit Finesse oder Leicht",
		"skill_choices": "4: Akrobatik, Athletik, Täuschen, Motiv erkennen, Einschüchtern, Nachforschungen, Wahrnehmung, Überzeugen/Auftreten, Fingerfertigkeit oder Heimlichkeit",
		"features": "Raffinierte Aktion",
		"resources_and_spellcasting": "Hinterhältiger Angriff 1W6"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "rogue",
		"class_de": "Schurke",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Geschicklichkeit",
		"priority": "GE > KO > WE oder IN > CH",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Geschicklichkeit, Intelligenz",
		"armor": "Leichte Rüstung",
		"weapons": "2014: einfache plus ausgewählte; 2024: einfache und Kriegswaffen mit Finesse oder Leicht",
		"skill_choices": "4: Akrobatik, Athletik, Täuschen, Motiv erkennen, Einschüchtern, Nachforschungen, Wahrnehmung, Überzeugen/Auftreten, Fingerfertigkeit oder Heimlichkeit",
		"features": "Schurkenunterklasse; Ruhiges Zielen",
		"resources_and_spellcasting": "Hinterhältiger Angriff 2W6; Unterklasse"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "sorcerer",
		"class_de": "Zauberer",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > KO > GE > WE",
		"hit_die": "W6",
		"fixed_hp_gain": "4 + KO-Modifikator",
		"saving_throws": "Konstitution, Charisma",
		"armor": "Keine",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Täuschen, Motiv erkennen, Einschüchtern, Überzeugen oder Religion",
		"features": "Zauberwirken; Angeborene Zauberei",
		"resources_and_spellcasting": "4 Zaubertricks; 2 vorbereitete Zauber; Plätze 2; Angeborene Zauberei 2/LR"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "sorcerer",
		"class_de": "Zauberer",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > KO > GE > WE",
		"hit_die": "W6",
		"fixed_hp_gain": "4 + KO-Modifikator",
		"saving_throws": "Konstitution, Charisma",
		"armor": "Keine",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Täuschen, Motiv erkennen, Einschüchtern, Überzeugen oder Religion",
		"features": "Quelle der Magie; Metamagie",
		"resources_and_spellcasting": "2 Punkte; 4 vorbereitete Zauber; Plätze 3"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "sorcerer",
		"class_de": "Zauberer",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > KO > GE > WE",
		"hit_die": "W6",
		"fixed_hp_gain": "4 + KO-Modifikator",
		"saving_throws": "Konstitution, Charisma",
		"armor": "Keine",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Täuschen, Motiv erkennen, Einschüchtern, Überzeugen oder Religion",
		"features": "Zaubererunterklasse",
		"resources_and_spellcasting": "3 Punkte; 6 vorbereitete Zauber; Plätze 4/2"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "warlock",
		"class_de": "Hexenmeister",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > KO > GE > WE",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Leichte Rüstung",
		"weapons": "Einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Täuschen, Geschichte, Einschüchtern, Nachforschungen, Naturkunde oder Religion",
		"features": "Unheimliche Anrufungen; Paktmagie",
		"resources_and_spellcasting": "1 Anrufung; 2 Zaubertricks; 2 vorbereitete Zauber; 1 Platz Grad 1"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "warlock",
		"class_de": "Hexenmeister",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > KO > GE > WE",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Leichte Rüstung",
		"weapons": "Einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Täuschen, Geschichte, Einschüchtern, Nachforschungen, Naturkunde oder Religion",
		"features": "Magische Gerissenheit",
		"resources_and_spellcasting": "3 Anrufungen; 3 vorbereitete Zauber; 2 Plätze Grad 1"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "warlock",
		"class_de": "Hexenmeister",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Charisma",
		"priority": "CH > KO > GE > WE",
		"hit_die": "W8",
		"fixed_hp_gain": "5 + KO-Modifikator",
		"saving_throws": "Weisheit, Charisma",
		"armor": "Leichte Rüstung",
		"weapons": "Einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Täuschen, Geschichte, Einschüchtern, Nachforschungen, Naturkunde oder Religion",
		"features": "Hexenmeisterunterklasse",
		"resources_and_spellcasting": "3 Anrufungen; 4 vorbereitete Zauber; 2 Plätze Grad 2"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "wizard",
		"class_de": "Magier",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Intelligenz",
		"priority": "IN > KO > GE > WE",
		"hit_die": "W6",
		"fixed_hp_gain": "4 + KO-Modifikator",
		"saving_throws": "Intelligenz, Weisheit",
		"armor": "Keine",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Geschichte, Motiv erkennen, Nachforschungen, Heilkunde, Naturkunde oder Religion",
		"features": "Zauberwirken; Ritualgelehrter; Arkane Erholung",
		"resources_and_spellcasting": "3 Zaubertricks; 4 vorbereitete Zauber; Plätze 2"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "wizard",
		"class_de": "Magier",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Intelligenz",
		"priority": "IN > KO > GE > WE",
		"hit_die": "W6",
		"fixed_hp_gain": "4 + KO-Modifikator",
		"saving_throws": "Intelligenz, Weisheit",
		"armor": "Keine",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Geschichte, Motiv erkennen, Nachforschungen, Heilkunde, Naturkunde oder Religion",
		"features": "Gelehrter",
		"resources_and_spellcasting": "5 vorbereitete Zauber; Plätze 3"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "wizard",
		"class_de": "Magier",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Intelligenz",
		"priority": "IN > KO > GE > WE",
		"hit_die": "W6",
		"fixed_hp_gain": "4 + KO-Modifikator",
		"saving_throws": "Intelligenz, Weisheit",
		"armor": "Keine",
		"weapons": "2014 eingeschränkte Liste; 2024 einfache Waffen",
		"skill_choices": "2: Arkane Kunde, Geschichte, Motiv erkennen, Nachforschungen, Heilkunde, Naturkunde oder Religion",
		"features": "Magierunterklasse",
		"resources_and_spellcasting": "6 vorbereitete Zauber; Plätze 4/2"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "monster_hunter",
		"class_de": "Monsterjäger (Grim Hollow)",
		"level": 1,
		"proficiency_bonus": 2,
		"primary": "Stärke oder Geschicklichkeit; Intelligenz für mehrere Merkmale",
		"priority": "ST oder GE > IN > KO > WE",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Stärke, Intelligenz",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "3 aus klassenspezifischer Liste; Monsterwissen und Ermittlung priorisieren",
		"features": "Waffenmeisterschaft (2); Monstergrimoire (2 Kreaturenarten)",
		"resources_and_spellcasting": "Übungsbonus +2"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "monster_hunter",
		"class_de": "Monsterjäger (Grim Hollow)",
		"level": 2,
		"proficiency_bonus": 2,
		"primary": "Stärke oder Geschicklichkeit; Intelligenz für mehrere Merkmale",
		"priority": "ST oder GE > IN > KO > WE",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Stärke, Intelligenz",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "3 aus klassenspezifischer Liste; Monsterwissen und Ermittlung priorisieren",
		"features": "Kampfstil-Talent; Studierte Reaktion",
		"resources_and_spellcasting": "Reaktionskonflikte beachten"
	},
	{
		"ruleset": "2024/SRD-5.2.1",
		"class_id": "monster_hunter",
		"class_de": "Monsterjäger (Grim Hollow)",
		"level": 3,
		"proficiency_bonus": 2,
		"primary": "Stärke oder Geschicklichkeit; Intelligenz für mehrere Merkmale",
		"priority": "ST oder GE > IN > KO > WE",
		"hit_die": "W10",
		"fixed_hp_gain": "6 + KO-Modifikator",
		"saving_throws": "Stärke, Intelligenz",
		"armor": "Leichte und mittlere Rüstung, Schilde",
		"weapons": "Einfache und Kriegswaffen",
		"skill_choices": "3 aus klassenspezifischer Liste; Monsterwissen und Ermittlung priorisieren",
		"features": "Jagdgilde",
		"resources_and_spellcasting": "Schlächter-, Okkultisten- oder Fallenstellergilde"
	}
].filter((entry) => entry.ruleset === "2014").map((entry) => ({
	classId: entry.class_id,
	level: entry.level,
	proficiencyBonus: entry.proficiency_bonus,
	primaryAbility: entry.primary,
	priority: entry.priority,
	hitDie: entry.hit_die,
	fixedHitPointGain: entry.fixed_hp_gain,
	savingThrows: entry.saving_throws.split(",").map((v) => v.trim()),
	armorProficiencies: entry.armor,
	weaponProficiencies: entry.weapons,
	skillChoices: entry.skill_choices,
	features: entry.features.split(";").map((v) => v.trim()).filter(Boolean),
	resourcesAndSpellcasting: entry.resources_and_spellcasting
}));
[
	["acrobatics", "Akrobatik"],
	["animal-handling", "Mit Tieren umgehen"],
	["arcana", "Arkane Kunde"],
	["athletics", "Athletik"],
	["deception", "Täuschen"],
	["history", "Geschichte"],
	["insight", "Motiv erkennen"],
	["intimidation", "Einschüchtern"],
	["investigation", "Nachforschungen"],
	["medicine", "Heilkunde"],
	["nature", "Naturkunde"],
	["perception", "Wahrnehmung"],
	["performance", "Auftreten"],
	["persuasion", "Überzeugen"],
	["religion", "Religion"],
	["sleight-of-hand", "Fingerfertigkeit"],
	["stealth", "Heimlichkeit"],
	["survival", "Überlebenskunst"]
].map(([id, name]) => ({
	id,
	name,
	description: "Dein Übungsbonus wird für diese Fertigkeit verdoppelt."
})), [
	["acrobatics", "Akrobatik"],
	["athletics", "Athletik"],
	["deception", "Täuschen"],
	["insight", "Motiv erkennen"],
	["intimidation", "Einschüchtern"],
	["investigation", "Nachforschungen"],
	["perception", "Wahrnehmung"],
	["performance", "Auftreten"],
	["persuasion", "Überzeugen"],
	["sleight-of-hand", "Fingerfertigkeit"],
	["stealth", "Heimlichkeit"],
	["thieves-tools", "Diebeswerkzeug"]
].map(([id, name]) => ({
	id,
	name,
	description: "Dein Übungsbonus wird für diese Übung verdoppelt."
})), [
	"Aberrationen",
	"Bestien",
	"Celestische",
	"Konstrukte",
	"Drachen",
	"Elementare",
	"Feenwesen",
	"Unholde",
	"Riesen",
	"Monstrositäten",
	"Schlicke",
	"Pflanzen",
	"Untote",
	"Humanoide (zwei Völker)"
].map((name) => ({
	id: name.toLowerCase().replaceAll(" ", "-").replaceAll("(", "").replaceAll(")", "").replaceAll("ö", "oe"),
	name,
	description: "Bevorzugter Feind nach den D&D-2014-Regeln."
})), [
	"Arktis",
	"Küste",
	"Wüste",
	"Wald",
	"Grasland",
	"Gebirge",
	"Sumpf",
	"Unterreich"
].map((name) => ({
	id: name.toLowerCase().replaceAll("ü", "ue"),
	name,
	description: "In diesem Gelände gelten deine Vorteile von Natürlicher Entdecker."
})), [
	["acid-splash", "Säurespritzer"],
	["chill-touch", "Kalte Hand"],
	["eldritch-blast", "Schauriger Strahl"],
	["fire-bolt", "Feuerpfeil"],
	["guidance", "Führung"],
	["light", "Licht"],
	["mage-hand", "Magierhand"],
	["minor-illusion", "Einfache Illusion"],
	["poison-spray", "Gift versprühen"],
	["produce-flame", "Flammen erzeugen"],
	["ray-of-frost", "Kältestrahl"],
	["sacred-flame", "Heilige Flamme"],
	["shillelagh", "Shillelagh"],
	["spare-the-dying", "Verschonung der Sterbenden"],
	["thaumaturgy", "Thaumaturgie"],
	["vicious-mockery", "Bösartiger Spott"]
].map(([id, name]) => ({
	id,
	name,
	description: "Zaubertrick im Buch der Schatten."
})), [
	["acrobatics", "Akrobatik"],
	["animal-handling", "Mit Tieren umgehen"],
	["arcana", "Arkane Kunde"],
	["athletics", "Athletik"],
	["deception", "Täuschen"],
	["history", "Geschichte"],
	["insight", "Motiv erkennen"],
	["intimidation", "Einschüchtern"],
	["investigation", "Nachforschungen"],
	["medicine", "Heilkunde"],
	["nature", "Naturkunde"],
	["perception", "Wahrnehmung"],
	["performance", "Auftreten"],
	["persuasion", "Überzeugen"],
	["religion", "Religion"],
	["sleight-of-hand", "Fingerfertigkeit"],
	["stealth", "Heimlichkeit"],
	["survival", "Überlebenskunst"]
].map(([id, name]) => ({
	id,
	name,
	description: "Du erhältst Übung in dieser Fertigkeit."
})), [
	["alchemist-supplies", "Alchemistenausrüstung"],
	["brewer-supplies", "Brauerwerkzeug"],
	["calligrapher-supplies", "Kalligrafenwerkzeug"],
	["carpenter-tools", "Zimmermannswerkzeug"],
	["cartographer-tools", "Kartografenwerkzeug"],
	["cobbler-tools", "Schusterwerkzeug"],
	["cook-utensils", "Kochutensilien"],
	["glassblower-tools", "Glasbläserwerkzeug"],
	["jeweler-tools", "Juwelierwerkzeug"],
	["leatherworker-tools", "Ledererwerkzeug"],
	["mason-tools", "Maurerwerkzeug"],
	["painter-supplies", "Malerbedarf"],
	["potter-tools", "Töpferwerkzeug"],
	["smith-tools", "Schmiedewerkzeug"],
	["tinker-tools", "Tüftlerwerkzeug"],
	["weaver-tools", "Weberwerkzeug"],
	["woodcarver-tools", "Holzschnitzerwerkzeug"]
].map(([id, name]) => ({
	id,
	name,
	description: "Du erhältst Übung mit diesem Handwerkszeug."
}));
//#endregion
//#region .test-build/contentAudit.tmp.ts
console.log(JSON.stringify({
	spells: spells.length,
	grimHollowSpells: spells.filter((spell) => spell.sourceLabel === "Grim Hollow 2025" || spell.sourceLabel === "Grim Hollow").length,
	backgrounds: backgrounds.length,
	equipment: equipment.length,
	weapons: equipment.filter((entry) => entry.category === "weapon").length,
	armorAndShields: equipment.filter((entry) => entry.category === "armor" || entry.category === "shield").length,
	ancestries: ancestries.length,
	grimHollowAncestries: ancestries.filter((entry) => String(entry.source ?? "").includes("grim")).length,
	transformations: transformations.length,
	classes: classes.length,
	grimHollowClasses: classes.filter((entry) => String(entry.source ?? "").includes("grim")).length
}, null, 2));
//#endregion
export {};
