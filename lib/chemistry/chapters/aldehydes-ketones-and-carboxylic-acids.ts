import type { ChemCard, ChemChapterContent, ChemConceptQ, ChemLevel, ChemQuestion, ChemReactionQ, ChemReactionStage, ChemSection } from "../types";

/**
 * Chapter 8 · Aldehydes, Ketones and Carboxylic Acids (CBSE 2026-27, 8 marks).
 * Syllabus scope: nomenclature and structure of the carbonyl group, preparation, physical properties, chemical reactions and uses
 * of aldehydes and ketones; nomenclature, structure, preparation, properties, reactions and uses of carboxylic acids.
 */

const q = (id: string, tag: string, level: ChemLevel, text: string, options: string[], ans: number, why: string, hint: string, extra?: { steps?: string[]; balance?: string[]; challenge?: boolean }): ChemQuestion =>
  ({ id, tag, level, text, options, answer: options[ans], why, hint, ...(extra?.steps ? { steps: extra.steps } : {}), ...(extra?.balance ? { balance: extra.balance } : {}), ...(extra?.challenge ? { challenge: true } : {}) });

const AR = [
  "Both A and R are true and R is the correct explanation of A.",
  "Both A and R are true but R is not the correct explanation of A.",
  "A is true but R is false.",
  "A is false but R is true.",
];
const ar = (id: string, level: ChemLevel, a: string, r: string, ans: number, why: string, hint: string): ChemQuestion =>
  q(id, "Assertion–Reason", level, `Assertion (A): ${a}\nReason (R): ${r}`, AR, ans, why, hint, { challenge: true });

const sections: ChemSection[] = [
  {
    kind: "concepts",
    title: "Structure and nomenclature",
    items: [
      { label: "Carbonyl group", body: "The carbonyl carbon is sp² hybridised and trigonal planar. The C=O bond is polar: carbon is electrophilic (δ+) and oxygen nucleophilic (δ−)." },
      { label: "IUPAC names", body: "Aldehydes end in –al (CH₃CHO ethanal), ketones in –one (CH₃COCH₃ propanone), carboxylic acids in –oic acid (CH₃COOH ethanoic acid). The carbonyl or carboxyl carbon is numbered 1 in aldehydes and acids." },
      { label: "Common names", body: "HCHO formaldehyde (methanal), CH₃CHO acetaldehyde (ethanal), CH₃COCH₃ acetone (propanone), HCOOH formic acid (methanoic acid), CH₃COOH acetic acid (ethanoic acid), C₆H₅CHO benzaldehyde, C₆H₅COOH benzoic acid." },
    ],
  },
  {
    kind: "reactions",
    title: "Preparation of aldehydes and ketones",
    items: [
      { label: "Both", body: "Oxidation of primary alcohols (to aldehydes) and secondary alcohols (to ketones). Dehydrogenation of alcohol vapour over Cu at 573 K. Hydration of alkynes: ethyne gives ethanal, other alkynes give ketones." },
      { label: "Aldehydes only", body: "Rosenmund: RCOCl + H₂ (Pd–BaSO₄) → RCHO. Stephen: RCN + SnCl₂/HCl, then H₃O⁺ → RCHO. Etard: toluene + CrO₂Cl₂ in CS₂, then H₃O⁺ → benzaldehyde. Gattermann–Koch: benzene + CO + HCl (anhydrous AlCl₃/CuCl) → benzaldehyde." },
      { label: "Ketones only", body: "Acyl chloride + R₂Cd → ketone. Nitrile + Grignard reagent, then H₃O⁺ → ketone. Friedel–Crafts acylation: benzene + RCOCl (anhydrous AlCl₃) → aryl ketone." },
    ],
  },
  {
    kind: "reactions",
    title: "Reactions of aldehydes and ketones",
    items: [
      { label: "Nucleophilic addition", body: "Aldehydes are more reactive than ketones (less steric hindrance and fewer electron-donating alkyl groups). Additions: HCN gives a cyanohydrin; NaHSO₃ gives a bisulphite adduct; alcohols with dry HCl give hemiacetals then acetals; ammonia derivatives (NH₂OH, NH₂NH₂, phenylhydrazine, 2,4-DNP, semicarbazide) give oximes, hydrazones, and so on." },
      { label: "Reduction", body: "NaBH₄ or LiAlH₄ give alcohols (aldehydes → primary, ketones → secondary). Clemmensen (Zn–Hg/conc. HCl) and Wolff–Kishner (NH₂NH₂ then KOH/ethylene glycol, heat) reduce C=O to CH₂." },
      { label: "Oxidation tests", body: "Aldehydes are oxidised by mild oxidants: Tollens' reagent gives a silver mirror, Fehling's solution gives a red-brown Cu₂O precipitate (aliphatic aldehydes only). Ketones do not react." },
      { label: "Haloform reaction", body: "Methyl ketones (CH₃CO–) and ethanol/secondary alcohols with CH₃CH(OH)– react with NaOX (X₂/NaOH) to give CHX₃ and a carboxylate. Iodoform is a yellow precipitate." },
      { label: "Aldol condensation", body: "Aldehydes and ketones with α-hydrogen, with dilute NaOH, give β-hydroxy carbonyls (aldol), which lose water on heating to give α,β-unsaturated compounds." },
      { label: "Cannizzaro reaction", body: "Aldehydes with no α-hydrogen, with concentrated NaOH, disproportionate to an alcohol and a carboxylate salt: 2HCHO + NaOH → CH₃OH + HCOONa." },
      { label: "Aromatic ring", body: "The carbonyl group is deactivating and meta-directing: nitration of benzaldehyde gives m-nitrobenzaldehyde." },
    ],
  },
  {
    kind: "reactions",
    title: "Carboxylic acids: preparation and reactions",
    items: [
      { label: "Preparation", body: "Oxidation of primary alcohols and aldehydes (KMnO₄ or K₂Cr₂O₇). Oxidation of alkylbenzenes (KMnO₄/KOH, then acid) to benzoic acid. Hydrolysis of nitriles and amides. Grignard reagent + CO₂ (dry ice), then H₃O⁺. Hydrolysis of acyl chlorides, anhydrides and esters." },
      { label: "Physical properties", body: "Boiling points are higher than aldehydes, ketones and even alcohols of similar mass, because of strong hydrogen bonding (dimers). Lower acids dissolve in water." },
      { label: "Acidity", body: "Carboxylic acids are stronger than phenols and alcohols because the carboxylate ion is stabilised by resonance, with the charge shared by two equivalent oxygens. Electron-withdrawing groups (–Cl, –F, –NO₂) increase acidity; electron-donating groups (–CH₃) decrease it. FCH₂COOH > ClCH₂COOH > BrCH₂COOH > CH₃COOH." },
      { label: "Reactions", body: "NaHCO₃ gives CO₂ with effervescence (test for –COOH). Esterification (alcohol, conc. H₂SO₄, reversible). PCl₅, PCl₃ or SOCl₂ give acyl chlorides. NH₃ gives an ammonium salt that loses water on heating to give an amide. LiAlH₄ or B₂H₆ reduce to primary alcohols. Soda lime decarboxylation: RCOONa + NaOH (CaO, heat) → R–H + Na₂CO₃." },
      { label: "HVZ and ring substitution", body: "Hell–Volhard–Zelinsky: acids with α-hydrogen + X₂/red P → α-halo acid. In aromatic acids the –COOH group is meta-directing and deactivating, so nitration of benzoic acid gives m-nitrobenzoic acid and Friedel–Crafts does not occur." },
    ],
  },
  {
    kind: "mistakes",
    title: "Common mistakes",
    items: [
      { body: "Using a strong oxidant (KMnO₄) and expecting an aldehyde. Aldehydes are oxidised further to acids." },
      { body: "Applying Cannizzaro to an aldehyde that has α-hydrogen. Those undergo aldol condensation." },
      { body: "Forgetting that Fehling's test is given only by aliphatic aldehydes, not by benzaldehyde." },
      { body: "Mixing Clemmensen (acidic) and Wolff–Kishner (basic): choose by what else is in the molecule." },
      { body: "Expecting NaBH₄ to reduce a carboxylic acid. It does not; LiAlH₄ or B₂H₆ do." },
    ],
  },
];

const card = (id: string, tag: string, front: string, back: string): ChemCard => ({ id, tag, front, back });

const cards: ChemCard[] = [
  card("ak-c1", "Preparation", "Rosenmund reduction", "Reagent: H₂ with Pd on BaSO₄ (poisoned catalyst)\n\nRCOCl + H₂ → RCHO + HCl\n\nProduct: aldehyde.\nBaSO₄ poisons the catalyst so the aldehyde is not reduced further to an alcohol."),
  card("ak-c2", "Preparation", "Stephen reaction", "Reagent: SnCl₂/HCl, then H₃O⁺\n\nRCN → RCH=NH → RCHO\n\nProduct: aldehyde, through an imine intermediate."),
  card("ak-c3", "Preparation", "Etard reaction", "Reagent: CrO₂Cl₂ in CS₂, then H₃O⁺\n\nC₆H₅CH₃ → C₆H₅CHO\n\nProduct: benzaldehyde. Chromyl chloride stops oxidation at the aldehyde stage."),
  card("ak-c4", "Preparation", "Gattermann–Koch reaction", "Reagent: CO and HCl with anhydrous AlCl₃/CuCl\n\nC₆H₆ + CO + HCl → C₆H₅CHO\n\nProduct: benzaldehyde."),
  card("ak-c5", "Preparation", "Friedel–Crafts acylation", "Reagent: RCOCl with anhydrous AlCl₃\n\nC₆H₆ + CH₃COCl → C₆H₅COCH₃ + HCl\n\nProduct: acetophenone (an aryl ketone)."),
  card("ak-c6", "Preparation", "Ketone from an acyl chloride", "Reagent: dialkylcadmium, R₂Cd (from CdCl₂ + Grignard reagent)\n\n2R′COCl + R₂Cd → 2R′COR + CdCl₂\n\nProduct: ketone."),
  card("ak-c7", "Preparation", "Ketone from a nitrile", "Reagent: Grignard reagent, then H₃O⁺\n\nRCN + R′MgX → RC(=NMgX)R′ → RCOR′\n\nProduct: ketone."),
  card("ak-c8", "Preparation", "Hydration of alkynes", "Reagent: dilute H₂SO₄ with HgSO₄\n\nHC≡CH + H₂O → CH₃CHO\n\nEthyne gives ethanal; other alkynes give ketones (propyne gives propanone)."),
  card("ak-c9", "Nucleophilic addition", "Aldehyde or ketone + HCN", "Reagent: HCN (with a trace of base)\n\nCH₃CHO + HCN → CH₃CH(OH)CN\n\nProduct: cyanohydrin (2-hydroxypropanenitrile)."),
  card("ak-c10", "Nucleophilic addition", "Reactivity in nucleophilic addition", "HCHO > CH₃CHO > CH₃COCH₃ > C₆H₅CHO\n\nAldehydes beat ketones: fewer electron-donating alkyl groups and less steric hindrance. In benzaldehyde the ring donates electrons by resonance."),
  card("ak-c11", "Nucleophilic addition", "Acetal formation", "Reagent: alcohol with dry HCl\n\nRCHO + 2R′OH → RCH(OR′)₂ + H₂O (through a hemiacetal)\n\nProduct: acetal."),
  card("ak-c12", "Nucleophilic addition", "Reaction with ammonia derivatives (H₂N–Z)", "NH₂OH → oxime (C=N–OH)\nNH₂NH₂ → hydrazone\nC₆H₅NHNH₂ → phenylhydrazone\n2,4-DNP → 2,4-dinitrophenylhydrazone (orange-yellow or red precipitate)\nSemicarbazide → semicarbazone"),
  card("ak-c13", "Reduction", "Reduction of C=O to alcohol", "Reagent: NaBH₄ or LiAlH₄ (or H₂/Pd)\n\nRCHO → RCH₂OH (primary alcohol)\nRCOR′ → RCH(OH)R′ (secondary alcohol)"),
  card("ak-c14", "Reduction", "Clemmensen reduction", "Reagent: Zn–Hg and conc. HCl\n\nC=O → CH₂\n\nCH₃COCH₃ → CH₃CH₂CH₃\nUse it when the molecule is stable in acid."),
  card("ak-c15", "Reduction", "Wolff–Kishner reduction", "Reagent: NH₂NH₂, then KOH in ethylene glycol, heat\n\nC=O → CH₂\n\nUse it when the molecule is stable in base."),
  card("ak-c16", "Oxidation", "Tollens' test", "Reagent: ammoniacal silver nitrate\n\nRCHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻ → RCOO⁻ + 2Ag↓ + 4NH₃ + 2H₂O\n\nObservation: silver mirror. Given by aldehydes, not by ketones."),
  card("ak-c17", "Oxidation", "Fehling's test", "Reagent: Fehling's solution (Cu²⁺ in alkaline tartrate)\n\nObservation: red-brown precipitate of Cu₂O.\nGiven by aliphatic aldehydes; benzaldehyde and ketones do not respond."),
  card("ak-c18", "Haloform reaction", "Iodoform test", "Reagent: I₂ with NaOH (NaOI)\n\nCH₃COCH₃ + 3I₂ + 4NaOH → CHI₃↓ + CH₃COONa + 3NaI + 3H₂O\n\nObservation: yellow precipitate of iodoform. Given by methyl ketones and by ethanol and CH₃CH(OH)R."),
  card("ak-c19", "Condensation", "Aldol condensation", "Reagent: dilute NaOH (needs an α-hydrogen)\n\n2CH₃CHO → CH₃CH(OH)CH₂CHO (3-hydroxybutanal)\nOn heating: → CH₃CH=CHCHO (but-2-enal) + H₂O"),
  card("ak-c20", "Condensation", "Cannizzaro reaction", "Reagent: conc. NaOH (aldehyde with no α-hydrogen)\n\n2HCHO + NaOH → CH₃OH + HCOONa\n2C₆H₅CHO + NaOH → C₆H₅CH₂OH + C₆H₅COONa\n\nOne molecule is oxidised and one reduced (disproportionation)."),
  card("ak-c21", "Carboxylic acids", "Acidity of carboxylic acids", "Carboxylate ion: resonance spreads the negative charge over two equivalent oxygens.\n\nElectron-withdrawing groups increase acidity: FCH₂COOH > ClCH₂COOH > BrCH₂COOH > CH₃COOH.\nElectron-donating groups decrease it.\nBenzoic acid is stronger than ethanoic acid."),
  card("ak-c22", "Carboxylic acids", "Test for –COOH", "Reagent: NaHCO₃\n\nRCOOH + NaHCO₃ → RCOONa + CO₂↑ + H₂O\n\nObservation: brisk effervescence. Phenols do not give this because they are weaker acids than carbonic acid."),
  card("ak-c23", "Carboxylic acids", "Esterification", "Reagent: alcohol with conc. H₂SO₄ (catalyst)\n\nCH₃COOH + CH₃CH₂OH ⇌ CH₃COOCH₂CH₃ + H₂O\n\nProduct: ester (ethyl ethanoate). Reversible; remove water to improve yield."),
  card("ak-c24", "Carboxylic acids", "Acid → acyl chloride", "Reagent: PCl₅, PCl₃ or SOCl₂\n\nRCOOH + SOCl₂ → RCOCl + SO₂ + HCl\n\nProduct: acyl chloride."),
  card("ak-c25", "Carboxylic acids", "Acid → amide", "Reagent: NH₃, then strong heating\n\nCH₃COOH + NH₃ → CH₃COONH₄ → CH₃CONH₂ + H₂O\n\nProduct: amide through the ammonium salt."),
  card("ak-c26", "Carboxylic acids", "Reduction of carboxylic acids", "Reagent: LiAlH₄ or B₂H₆\n\nRCOOH → RCH₂OH\n\nNaBH₄ does not reduce carboxylic acids."),
  card("ak-c27", "Carboxylic acids", "Decarboxylation with soda lime", "Reagent: soda lime (NaOH + CaO), heat\n\nRCOONa + NaOH → R–H + Na₂CO₃\n\nCH₃COONa → CH₄. The product has one carbon less."),
  card("ak-c28", "Carboxylic acids", "Hell–Volhard–Zelinsky reaction", "Reagent: Br₂ or Cl₂ with a little red phosphorus\n\nCH₃CH₂COOH + Br₂ → CH₃CHBrCOOH + HBr\n\nProduct: α-halo carboxylic acid (needs an α-hydrogen)."),
  card("ak-c29", "Carboxylic acids", "Nitration of benzoic acid", "Reagent: conc. HNO₃ with conc. H₂SO₄\n\nProduct: m-nitrobenzoic acid. –COOH is deactivating and meta-directing, and benzoic acid does not undergo Friedel–Crafts reactions."),
];

const concept: ChemConceptQ[] = [
  { id: "ak-s1", tag: "Nucleophilic addition", level: 2, q: "Why are aldehydes more reactive than ketones towards nucleophilic addition? Give one reason.", groups: [["steric", "bulky", "crowded", "hindrance", "hindered", "electron donating", "electron releasing", "inductive", "+i", "alkyl groups", "less electrophilic", "more electrophilic"]],
    model: "Any one of: ketones have two electron-donating alkyl groups, which reduce the positive charge on the carbonyl carbon, and the two alkyl groups also cause more steric hindrance to the incoming nucleophile.", hint: "Compare the groups attached to the carbonyl carbon in an aldehyde and a ketone." },
  { id: "ak-s2", tag: "Carboxylic acids", level: 1, q: "Why do carboxylic acids have higher boiling points than aldehydes, ketones and alcohols of comparable molar mass?", groups: [["hydrogen bond", "h bond", "h-bond"]],
    model: "Carboxylic acids form extensive intermolecular hydrogen bonds and exist as dimers, which need more energy to separate.", hint: "Think about the strongest intermolecular force present." },
  { id: "ak-s3", tag: "Carboxylic acids", level: 2, q: "Why is a carboxylic acid a stronger acid than phenol?", groups: [["resonance", "delocal", "stabilis", "stabiliz"], ["carboxylate", "two oxygen", "two equivalent", "equivalent"]],
    model: "The carboxylate ion is stabilised by resonance with two equivalent structures, so the negative charge is shared equally by two electronegative oxygen atoms. In the phenoxide ion the charge is spread less effectively, partly onto carbon.", hint: "Compare the stability of the two conjugate bases." },
  { id: "ak-s4", tag: "Condensation", level: 1, q: "What structural feature must an aldehyde or ketone have to undergo aldol condensation?", groups: [["α hydrogen", "alpha hydrogen", "α h", "alpha h", "α-hydrogen"]],
    model: "It must have at least one α-hydrogen, that is, a hydrogen on the carbon next to the carbonyl group.", hint: "Which carbon is the α-carbon?" },
  { id: "ak-s5", tag: "Oxidation", level: 1, q: "Name a reagent that distinguishes aldehydes from ketones and state what you observe with an aldehyde.", groups: [["tollens", "fehling", "ammoniacal silver", "silver nitrate"], ["silver mirror", "mirror", "red", "brown", "precipitate", "ppt", "cu2o"]],
    model: "Tollens' reagent (ammoniacal silver nitrate) gives a silver mirror with an aldehyde. Fehling's solution gives a red-brown precipitate of Cu₂O with an aliphatic aldehyde. Ketones do not react.", hint: "Aldehydes are easily oxidised; ketones are not." },
  { id: "ak-s6", tag: "Carboxylic acids", level: 2, q: "Why does benzoic acid not undergo the Friedel–Crafts reaction?", groups: [["deactivat", "electron withdrawing", "electron deficient", "alcl3", "lewis acid", "catalyst"]],
    model: "The –COOH group is strongly electron-withdrawing and deactivates the ring, and the catalyst AlCl₃ bonds to the carboxyl group, so the reaction does not occur.", hint: "What does –COOH do to the electron density of the ring?" },
  { id: "ak-s7", tag: "Condensation", level: 2, q: "Why does formaldehyde undergo the Cannizzaro reaction but acetaldehyde does not?", groups: [["α hydrogen", "alpha hydrogen", "α h", "alpha h", "α-hydrogen"], ["no ", "not", "without", "absence", "lack"]],
    model: "Formaldehyde has no α-hydrogen, so with concentrated NaOH it disproportionates (Cannizzaro). Acetaldehyde has α-hydrogens and undergoes aldol condensation instead.", hint: "Look at the carbon next to C=O in each molecule." },
  { id: "ak-s8", tag: "Carboxylic acids", level: 2, q: "Explain why chloroacetic acid is a stronger acid than acetic acid.", groups: [["withdraw", "-i", "inductive", "electronegative"], ["stabilis", "stabiliz", "carboxylate", "anion", "conjugate base"]],
    model: "Chlorine is electron-withdrawing (–I effect). It disperses the negative charge on the carboxylate ion and stabilises it, so the acid ionises more easily.", hint: "What does chlorine do to the charge on the conjugate base?" },
  { id: "ak-s9", tag: "Haloform reaction", level: 2, q: "Which simple test distinguishes pentan-2-one from pentan-3-one?", groups: [["iodoform", "haloform", "i2", "naoi", "iodine", "yellow"]],
    model: "The iodoform test (I₂ and NaOH). Pentan-2-one has a CH₃CO– group and gives a yellow precipitate of iodoform; pentan-3-one does not.", hint: "Which of the two is a methyl ketone?" },
];

const equations: ChemConceptQ[] = [
  { id: "ak-e1", tag: "Preparation", level: 1, q: "Complete the reaction and write the organic product:\nCH₃CH₂OH + PCC →", groups: [["ch3cho", "ethanal", "acetaldehyde"]], model: "CH₃CHO (ethanal). PCC oxidises a primary alcohol only as far as the aldehyde.", hint: "Primary alcohol, mild oxidant." },
  { id: "ak-e2", tag: "Preparation", level: 1, q: "Complete the reaction:\nCH₃COCl + H₂ (Pd–BaSO₄) → ?  (organic product)", groups: [["ch3cho", "ethanal", "acetaldehyde"]], model: "CH₃CHO (ethanal), by Rosenmund reduction.", hint: "The poisoned catalyst stops at the aldehyde.", balance: ["CH3COCl + H2 -> CH3CHO + HCl"] },
  { id: "ak-e3", tag: "Preparation", level: 2, q: "Complete the reaction:\nCH₃CN + SnCl₂/HCl, then H₃O⁺ → ?", groups: [["ch3cho", "ethanal", "acetaldehyde"]], model: "CH₃CHO (ethanal), by Stephen reaction.", hint: "The nitrile carbon becomes the aldehyde carbon." },
  { id: "ak-e4", tag: "Preparation", level: 2, q: "Complete the reaction:\nC₆H₅CH₃ + CrO₂Cl₂ (CS₂), then H₃O⁺ → ?", groups: [["c6h5cho", "benzaldehyde"]], model: "C₆H₅CHO (benzaldehyde), by Etard reaction.", hint: "Chromyl chloride stops at the aldehyde." },
  { id: "ak-e5", tag: "Condensation", level: 2, q: "Complete the reaction and write both organic products:\n2HCHO + conc. NaOH →", groups: [["ch3oh", "methanol", "methyl alcohol"], ["hcoona", "sodium formate", "sodium methanoate"]], model: "CH₃OH (methanol) and HCOONa (sodium formate), by Cannizzaro reaction.", hint: "One molecule is reduced to an alcohol and one oxidised to a carboxylate.", balance: ["2HCHO + NaOH -> CH3OH + HCOONa"] },
  { id: "ak-e6", tag: "Nucleophilic addition", level: 2, q: "Complete the reaction and name the product type:\nCH₃CHO + HCN →", groups: [["ch3ch(oh)cn", "2 hydroxypropanenitrile", "cyanohydrin", "acetaldehyde cyanohydrin"]], model: "CH₃CH(OH)CN (2-hydroxypropanenitrile), a cyanohydrin.", hint: "HCN adds across C=O: H to oxygen, CN to carbon.", balance: ["CH3CHO + HCN -> CH3CH(OH)CN"] },
  { id: "ak-e7", tag: "Reduction", level: 1, q: "Complete the reaction:\nCH₃COCH₃ + NaBH₄, then H₂O → ?", groups: [["ch3ch(oh)ch3", "propan 2 ol", "2 propanol", "isopropyl alcohol", "isopropanol", "propan2ol", "2propanol"]], model: "CH₃CH(OH)CH₃ (propan-2-ol), a secondary alcohol.", hint: "A ketone is reduced to a secondary alcohol." },
  { id: "ak-e8", tag: "Carboxylic acids", level: 2, q: "Complete the reaction and write the organic product:\nCH₃CH₂COOH + PCl₅ →", groups: [["ch3ch2cocl", "propanoyl chloride", "propionyl chloride"]], model: "CH₃CH₂COCl (propanoyl chloride) + POCl₃ + HCl.", hint: "The –OH of the acid is replaced by Cl.", balance: ["CH3CH2COOH + PCl5 -> CH3CH2COCl + POCl3 + HCl"] },
  { id: "ak-e9", tag: "Carboxylic acids", level: 2, q: "Complete the reaction and write the organic product:\nCH₃COONa + NaOH (CaO, heat) →", groups: [["ch4", "methane"]], model: "CH₄ (methane) + Na₂CO₃. This is decarboxylation.", hint: "One carbon is lost as carbonate.", balance: ["CH3COONa + NaOH -> CH4 + Na2CO3"] },
  { id: "ak-e10", tag: "Carboxylic acids", level: 1, q: "Complete the reaction:\nCH₃COOH + CH₃CH₂OH (conc. H₂SO₄) → ?  (organic product)", groups: [["ch3cooch2ch3", "ethyl ethanoate", "ethyl acetate", "ch3cooc2h5"]], model: "CH₃COOCH₂CH₃ (ethyl ethanoate) + H₂O.", hint: "Acid and alcohol give an ester.", balance: ["CH3COOH + CH3CH2OH -> CH3COOCH2CH3 + H2O"] },
  { id: "ak-e11", tag: "Carboxylic acids", level: 2, q: "Complete the reaction:\nCH₃CH₂COOH + Br₂ (red P) → ?  (organic product)", groups: [["ch3chbrcooh", "2 bromopropanoic acid", "α bromopropanoic acid", "alpha bromopropanoic acid", "2bromopropanoic acid"]], model: "CH₃CHBrCOOH (2-bromopropanoic acid) + HBr. This is the Hell–Volhard–Zelinsky reaction.", hint: "Halogen goes to the α-carbon.", balance: ["CH3CH2COOH + Br2 -> CH3CHBrCOOH + HBr"] },
  { id: "ak-e12", tag: "Preparation", level: 2, q: "Complete the reaction and write the organic product:\nC₆H₆ + CH₃COCl (anhydrous AlCl₃) →", groups: [["c6h5coch3", "acetophenone", "methyl phenyl ketone", "1 phenylethanone", "phenylethanone"]], model: "C₆H₅COCH₃ (acetophenone) + HCl, by Friedel–Crafts acylation.", hint: "An acyl group replaces a ring hydrogen.", balance: ["C6H6 + CH3COCl -> C6H5COCH3 + HCl"] },
  { id: "ak-e13", tag: "Preparation", level: 2, q: "Complete the reaction:\nC₆H₆ + CO + HCl (anhydrous AlCl₃/CuCl) → ?", groups: [["c6h5cho", "benzaldehyde"]], model: "C₆H₅CHO (benzaldehyde), by Gattermann–Koch reaction.", hint: "A formyl group is introduced on the ring.", balance: ["C6H6 + CO + HCl -> C6H5CHO + HCl"] },
];

const st = (ask: string, options: string[], answer: number, why: string, hint: string): ChemReactionStage => ({ ask, options, answer, why, hint });
const rx = (id: string, tag: string, level: ChemLevel, title: string, prompt: string, stages: ChemReactionStage[], equation: string, note?: string, balance?: string[]): ChemReactionQ =>
  ({ id, tag, level, title, prompt, stages, equation, ...(note ? { note } : {}), ...(balance ? { balance } : {}) });

const reactions: ChemReactionQ[] = [
  rx("ak-r1", "Preparation", 1, "Rosenmund reduction", "CH₃COCl → CH₃CHO",
    [st("Which reagent?", ["H₂ with Pd–BaSO₄", "LiAlH₄", "NaBH₄", "KMnO₄"], 0, "Hydrogen over palladium on barium sulphate reduces an acyl chloride to an aldehyde.", "It is a catalytic hydrogenation with a deliberately weakened catalyst."),
     st("Why is BaSO₄ added?", ["To stop reduction at the aldehyde stage", "To make the reaction faster", "To absorb HCl", "To oxidise the product"], 0, "It poisons the catalyst so the aldehyde is not reduced further to an alcohol.", "Think about what could happen to the aldehyde if the catalyst were too active.")],
    "CH₃COCl + H₂ (Pd–BaSO₄) → CH₃CHO + HCl", undefined, ["CH3COCl + H2 -> CH3CHO + HCl"]),
  rx("ak-r2", "Preparation", 2, "Stephen reaction", "CH₃CN → CH₃CHO",
    [st("Which reagent?", ["SnCl₂/HCl, then H₃O⁺", "LiAlH₄ only", "KMnO₄", "Zn–Hg/HCl"], 0, "Stannous chloride and HCl reduce the nitrile to an imine, which hydrolyses to the aldehyde.", "A mild reducing agent based on tin."),
     st("What is the intermediate?", ["CH₃CH=NH (an imine)", "CH₃COOH", "CH₃CH₂NH₂", "CH₃COCl"], 0, "RCN is reduced to the imine RCH=NH, which H₃O⁺ converts to RCHO.", "It still has nitrogen and a C=N bond.")],
    "CH₃CN → CH₃CH=NH → CH₃CHO"),
  rx("ak-r3", "Preparation", 2, "Etard reaction", "C₆H₅CH₃ → C₆H₅CHO",
    [st("Which reagent?", ["CrO₂Cl₂ in CS₂, then H₃O⁺", "KMnO₄/KOH", "K₂Cr₂O₇/H₂SO₄", "LiAlH₄"], 0, "Chromyl chloride oxidises the methyl group only as far as the aldehyde.", "You need an oxidant that does not over-oxidise."),
     st("What would hot alkaline KMnO₄ give instead?", ["Benzoic acid", "Benzaldehyde", "Benzyl alcohol", "Phenol"], 0, "Strong oxidants oxidise the side chain all the way to –COOH.", "Think about full oxidation of the side chain.")],
    "C₆H₅CH₃ + CrO₂Cl₂ (CS₂) → [chromium complex] →(H₃O⁺) C₆H₅CHO"),
  rx("ak-r4", "Preparation", 1, "Gattermann–Koch reaction", "C₆H₆ → C₆H₅CHO",
    [st("Which reagents?", ["CO and HCl with anhydrous AlCl₃/CuCl", "CH₃COCl and AlCl₃", "Cl₂ and light", "CrO₂Cl₂"], 0, "CO and HCl form a formylating species, which substitutes onto the ring.", "A one-carbon group (CHO) is introduced.")],
    "C₆H₆ + CO + HCl (AlCl₃/CuCl) → C₆H₅CHO", undefined, ["C6H6 + CO + HCl -> C6H5CHO + HCl"]),
  rx("ak-r5", "Preparation", 1, "Friedel–Crafts acylation", "C₆H₆ → C₆H₅COCH₃",
    [st("Which reagents?", ["CH₃COCl with anhydrous AlCl₃", "CH₃Cl with AlCl₃", "CH₃CHO with NaOH", "CH₃COOH with NaHCO₃"], 0, "The acyl chloride with a Lewis acid acylates the ring, giving acetophenone.", "An acyl group, not an alkyl group, is introduced.")],
    "C₆H₆ + CH₃COCl (anhydrous AlCl₃) → C₆H₅COCH₃ + HCl", undefined, ["C6H6 + CH3COCl -> C6H5COCH3 + HCl"]),
  rx("ak-r6", "Condensation", 2, "Aldol condensation of ethanal", "2CH₃CHO → ?",
    [st("Which reagent?", ["Dilute NaOH", "Concentrated NaOH", "Dry HCl", "H₂/Pd"], 0, "Dilute base removes an α-hydrogen to form the enolate that adds to a second molecule.", "Concentrated NaOH is for Cannizzaro."),
     st("What is the aldol product?", ["3-hydroxybutanal", "but-2-enal", "ethanoic acid", "ethanol"], 0, "The enolate adds to C=O of a second ethanal giving CH₃CH(OH)CH₂CHO.", "β-hydroxy aldehyde."),
     st("What forms on heating?", ["but-2-enal", "3-hydroxybutanal", "butanal", "butan-1-ol"], 0, "Heating removes water to give the α,β-unsaturated aldehyde CH₃CH=CHCHO.", "Loss of H₂O gives a C=C.")],
    "2CH₃CHO →(dil. NaOH) CH₃CH(OH)CH₂CHO →(heat, −H₂O) CH₃CH=CHCHO", undefined, ["2CH3CHO -> CH3CH(OH)CH2CHO"]),
  rx("ak-r7", "Condensation", 2, "Cannizzaro reaction", "2C₆H₅CHO → ?",
    [st("Which reagent?", ["Concentrated NaOH", "Dilute NaOH", "NaBH₄", "Tollens' reagent"], 0, "Aldehydes with no α-hydrogen disproportionate in concentrated alkali.", "Concentrated, not dilute."),
     st("Why does benzaldehyde react this way?", ["It has no α-hydrogen", "It has an α-hydrogen", "It is a ketone", "It is a strong acid"], 0, "With no α-hydrogen it cannot form an enolate, so hydroxide attacks C=O and hydride transfers.", "Look at the carbon next to the carbonyl carbon.")],
    "2C₆H₅CHO + NaOH (conc.) → C₆H₅CH₂OH + C₆H₅COONa"),
  rx("ak-r8", "Reduction", 2, "Reducing C=O to CH₂", "CH₃COCH₃ → CH₃CH₂CH₃",
    [st("Which is the Clemmensen reduction?", ["Zn–Hg and conc. HCl", "NH₂NH₂ then KOH, glycol, heat", "NaBH₄", "H₂/Pd–BaSO₄"], 0, "Clemmensen uses zinc amalgam and concentrated HCl (acidic).", "It is the acid-based method."),
     st("Which is the Wolff–Kishner reduction?", ["NH₂NH₂ then KOH in ethylene glycol, heat", "Zn–Hg and conc. HCl", "LiAlH₄", "PCl₅"], 0, "Wolff–Kishner uses hydrazine and strong base (basic).", "It is the base-based method.")],
    "CH₃COCH₃ →(Zn–Hg/conc. HCl, or NH₂NH₂ then KOH/glycol, heat) CH₃CH₂CH₃", "Choose Clemmensen if the molecule tolerates acid, Wolff–Kishner if it tolerates base."),
  rx("ak-r9", "Haloform reaction", 2, "Iodoform reaction", "CH₃COCH₃ → CHI₃ + CH₃COONa",
    [st("Which reagent?", ["I₂ with NaOH", "I₂ alone", "NaI only", "HI"], 0, "I₂ and NaOH form NaOI, which iodinates the methyl group and cleaves the C–C bond.", "A hypohalite is generated in situ."),
     st("What do you observe?", ["Yellow precipitate of CHI₃", "Silver mirror", "Red-brown precipitate", "Effervescence"], 0, "Iodoform is a yellow solid.", "The product is CHI₃.")],
    "CH₃COCH₃ + 3I₂ + 4NaOH → CHI₃↓ + CH₃COONa + 3NaI + 3H₂O", undefined, ["CH3COCH3 + 3I2 + 4NaOH -> CHI3 + CH3COONa + 3NaI + 3H2O"]),
  rx("ak-r10", "Carboxylic acids", 2, "Hell–Volhard–Zelinsky reaction", "CH₃CH₂COOH → CH₃CHBrCOOH",
    [st("Which reagents?", ["Br₂ with a little red P", "HBr", "NaBr", "Br₂ in light with no catalyst"], 0, "Br₂ and red phosphorus brominate the α-position of the acid.", "The halogen goes to the carbon next to –COOH.")],
    "CH₃CH₂COOH + Br₂ (red P) → CH₃CHBrCOOH + HBr", undefined, ["CH3CH2COOH + Br2 -> CH3CHBrCOOH + HBr"]),
  rx("ak-r11", "Carboxylic acids", 3, "Two-step conversion: acid to amide", "CH₃COOH → CH₃COONH₄ → CH₃CONH₂",
    [st("Step 1: which reagent?", ["NH₃", "NaOH", "PCl₅", "LiAlH₄"], 0, "Ammonia neutralises the acid to give ammonium ethanoate.", "An acid–base reaction."),
     st("Step 2: what converts the salt to the amide?", ["Strong heating (loss of H₂O)", "Adding more NH₃ at room temperature", "NaBH₄", "Dilute HCl"], 0, "Heating the ammonium salt removes water to form the amide.", "Think dehydration.")],
    "CH₃COOH + NH₃ → CH₃COONH₄ →(heat) CH₃CONH₂ + H₂O"),
];

const questions: ChemQuestion[] = [
  q("ak-m1", "Nomenclature", 1, "The IUPAC name of CH₃CH₂CHO is:", ["propanal", "propanone", "propanoic acid", "propan-1-ol"], 0, "An aldehyde with three carbons ends in –al: propanal.", "Aldehydes end in –al."),
  q("ak-m2", "Nomenclature", 1, "The IUPAC name of acetone is:", ["propanone", "propanal", "ethanone", "propan-2-ol"], 0, "CH₃COCH₃ is a three-carbon ketone: propanone.", "Ketones end in –one."),
  q("ak-m3", "Nomenclature", 1, "The IUPAC name of acetic acid is:", ["ethanoic acid", "methanoic acid", "ethanal", "ethanol"], 0, "CH₃COOH has two carbons and the acid ending –oic acid.", "Two carbons, carboxylic acid."),
  q("ak-m4", "Structure", 1, "The carbonyl carbon in an aldehyde is:", ["sp² hybridised", "sp³ hybridised", "sp hybridised", "unhybridised"], 0, "It forms three sigma bonds in a plane, so it is sp² hybridised.", "Count the sigma bonds."),
  q("ak-m5", "Oxidation", 2, "Which reagent gives a silver mirror with an aldehyde?", ["Tollens' reagent", "2,4-DNP", "NaHSO₃", "Fehling's solution"], 0, "Tollens' reagent (ammoniacal AgNO₃) is reduced to silver metal.", "It contains silver."),
  q("ak-m6", "Reduction", 2, "An aldehyde is converted to a primary alcohol by:", ["NaBH₄", "Zn–Hg/conc. HCl", "Tollens' reagent", "dilute NaOH"], 0, "NaBH₄ reduces C=O to the alcohol. Clemmensen would give CH₂.", "A hydride reducing agent."),
  q("ak-m7", "Condensation", 2, "Which compound undergoes the Cannizzaro reaction?", ["C₆H₅CHO", "CH₃CHO", "CH₃CH₂CHO", "CH₃COCH₃"], 0, "Benzaldehyde has no α-hydrogen. The others have α-hydrogens.", "Which has no α-hydrogen?"),
  q("ak-m8", "Haloform reaction", 2, "Which of these gives a yellow precipitate with I₂/NaOH?", ["CH₃COCH₃", "CH₃CH₂CHO", "CH₃CH₂COCH₂CH₃", "C₆H₅CHO"], 0, "Propanone has a CH₃CO– group (methyl ketone), so it gives the iodoform test.", "You need a CH₃–C=O group."),
  q("ak-m9", "Carboxylic acids", 2, "The strongest acid among these is:", ["FCH₂COOH", "ClCH₂COOH", "BrCH₂COOH", "CH₃COOH"], 0, "Fluorine is the most electron-withdrawing, so it stabilises the carboxylate most.", "The most electronegative halogen wins."),
  q("ak-m10", "Carboxylic acids", 2, "Which test identifies a carboxylic acid?", ["Effervescence of CO₂ with NaHCO₃", "Silver mirror with Tollens' reagent", "Yellow precipitate with I₂/NaOH", "Orange precipitate with 2,4-DNP"], 0, "Carboxylic acids are stronger than carbonic acid, so they liberate CO₂ from bicarbonate.", "Think acid plus bicarbonate."),
  q("ak-m11", "Condensation", 2, "On heating, the aldol product of ethanal gives:", ["but-2-enal", "butanal", "butanoic acid", "ethyl ethanoate"], 0, "3-Hydroxybutanal loses water to give CH₃CH=CHCHO.", "Heat removes water."),
  q("ak-m12", "Preparation", 2, "Benzene + CO + HCl (anhydrous AlCl₃/CuCl) gives:", ["benzaldehyde", "benzoic acid", "acetophenone", "toluene"], 0, "This is the Gattermann–Koch reaction.", "A formyl group is introduced."),
  q("ak-m13", "Reduction", 3, "Which reduction is carried out in strongly basic medium?", ["Wolff–Kishner", "Clemmensen", "Rosenmund", "Stephen"], 0, "Wolff–Kishner uses NH₂NH₂ with KOH in ethylene glycol.", "Which one uses KOH?"),
  q("ak-m14", "Nucleophilic addition", 3, "Which is most reactive towards nucleophilic addition?", ["HCHO", "CH₃CHO", "CH₃COCH₃", "C₆H₅CHO"], 0, "Formaldehyde has no electron-donating alkyl groups and the least steric hindrance.", "Fewest substituents on the carbonyl carbon."),
  q("ak-m15", "Carboxylic acids", 2, "Heating CH₃COONa with soda lime gives:", ["methane", "ethane", "ethanol", "ethene"], 0, "Decarboxylation removes CO₂ as carbonate: CH₃COONa + NaOH → CH₄ + Na₂CO₃.", "One carbon is lost.", { balance: ["CH3COONa + NaOH -> CH4 + Na2CO3"] }),
];

const challenge: ChemQuestion[] = [
  ar("ak-a1", 2, "Aldehydes are more reactive than ketones towards nucleophilic addition.", "Ketones have two electron-donating alkyl groups and are more sterically hindered.", 0, "Both effects reduce the reactivity of ketones.", "Compare substituents on the carbonyl carbon."),
  ar("ak-a2", 2, "Carboxylic acids are stronger acids than phenols.", "The carboxylate ion is stabilised by resonance with the negative charge shared by two equivalent oxygen atoms.", 0, "The more stable conjugate base makes the acid stronger.", "Compare the conjugate bases."),
  ar("ak-a3", 2, "Benzaldehyde undergoes the Cannizzaro reaction.", "Benzaldehyde has no α-hydrogen.", 0, "Without α-hydrogen it cannot form an enolate, so disproportionation occurs.", "Which aldehydes give Cannizzaro?"),
  ar("ak-a4", 3, "Benzoic acid does not undergo the Friedel–Crafts reaction.", "The –COOH group is strongly deactivating and the catalyst AlCl₃ bonds to it.", 0, "Both effects stop the reaction.", "Think about ring deactivation and the catalyst."),
  ar("ak-a5", 3, "NaHCO₃ can distinguish a carboxylic acid from a phenol.", "Phenols are weaker acids than carbonic acid and do not liberate CO₂ from NaHCO₃.", 0, "Acids stronger than carbonic acid release CO₂; phenols do not.", "Compare acid strengths."),
  q("ak-a6", "Oxidation", 3, "A compound C₃H₆O gives a silver mirror with Tollens' reagent and does not give the iodoform test. It is:", ["propanal", "propanone", "prop-2-en-1-ol", "propan-1-ol"], 0, "Propanal is an aldehyde (Tollens positive) with no CH₃CO– group (iodoform negative). Propanone is Tollens negative.", "Which isomer is an aldehyde without a methyl ketone group?", { challenge: true }),
  q("ak-a7", "Carboxylic acids", 3, "Which acid is stronger?", ["4-nitrobenzoic acid", "benzoic acid", "4-methylbenzoic acid", "4-methoxybenzoic acid"], 0, "The nitro group withdraws electrons and stabilises the carboxylate; methyl and methoxy donate electrons.", "Electron-withdrawing groups increase acidity.", { challenge: true }),
];

const predict: ChemQuestion[] = [
  q("ak-p1", "Preparation", 1, "Identify the product: CH₃CH₂COCl + H₂ (Pd–BaSO₄) →", ["propanal", "propan-1-ol", "propanoic acid", "propanone"], 0, "Rosenmund reduction gives the aldehyde.", "The poisoned catalyst stops at the aldehyde.", { steps: ["The substrate is an acyl chloride.", "H₂ over Pd–BaSO₄ replaces Cl with H.", "Product: CH₃CH₂CHO, propanal."], balance: ["CH3CH2COCl + H2 -> CH3CH2CHO + HCl"] }),
  q("ak-p2", "Preparation", 1, "Identify the product: C₆H₆ + CH₃COCl (anhydrous AlCl₃) →", ["acetophenone", "benzaldehyde", "toluene", "benzoic acid"], 0, "Friedel–Crafts acylation gives the aryl ketone.", "Acyl group on the ring.", { steps: ["AlCl₃ activates the acyl chloride.", "The acylium ion substitutes a ring hydrogen.", "Product: C₆H₅COCH₃, acetophenone."], balance: ["C6H6 + CH3COCl -> C6H5COCH3 + HCl"] }),
  q("ak-p3", "Nucleophilic addition", 1, "Identify the product: CH₃CHO + HCN →", ["2-hydroxypropanenitrile", "propanenitrile", "propanal", "ethanol"], 0, "HCN adds across C=O to give a cyanohydrin.", "H goes to O, CN to C.", { steps: ["The nucleophile CN⁻ attacks the carbonyl carbon.", "The oxygen picks up H⁺.", "Product: CH₃CH(OH)CN."], balance: ["CH3CHO + HCN -> CH3CH(OH)CN"] }),
  q("ak-p4", "Nucleophilic addition", 2, "Identify the product: CH₃COCH₃ + NH₂OH →", ["propanone oxime", "propan-2-ol", "propanamide", "propanone cyanohydrin"], 0, "Hydroxylamine condenses with a ketone, giving an oxime and water.", "H₂N–Z reagents give C=N–Z compounds.", { steps: ["NH₂OH adds to C=O.", "Water is lost to form C=N.", "Product: (CH₃)₂C=NOH."], balance: ["CH3COCH3 + NH2OH -> (CH3)2CNOH + H2O"] }),
  q("ak-p5", "Condensation", 2, "Identify the product: CH₃CHO + dilute NaOH →", ["3-hydroxybutanal", "but-2-enal", "ethanol", "ethanoic acid"], 0, "Aldol addition at room temperature gives the β-hydroxy aldehyde.", "Dilute base and an α-hydrogen.", { steps: ["The base removes an α-hydrogen to give an enolate.", "The enolate attacks a second ethanal.", "Product: CH₃CH(OH)CH₂CHO."] }),
  q("ak-p6", "Condensation", 2, "Identify the products: 2C₆H₅CHO + conc. NaOH →", ["benzyl alcohol and sodium benzoate", "benzoic acid only", "benzyl alcohol only", "an aldol product"], 0, "Cannizzaro: one molecule is reduced, the other oxidised.", "No α-hydrogen.", { steps: ["Benzaldehyde has no α-hydrogen.", "In conc. NaOH one molecule is oxidised and one reduced.", "Products: C₆H₅CH₂OH and C₆H₅COONa."], balance: ["2C6H5CHO + NaOH -> C6H5CH2OH + C6H5COONa"] }),
  q("ak-p7", "Carboxylic acids", 1, "Identify the products: CH₃COOH + NaHCO₃ →", ["sodium ethanoate, CO₂ and H₂O", "ethanol and CO₂", "ethanal and H₂O", "no reaction"], 0, "The acid is stronger than carbonic acid, so CO₂ is released.", "Acid plus bicarbonate.", { steps: ["Acid–base reaction.", "H₂CO₃ forms and decomposes to CO₂ and H₂O.", "Products: CH₃COONa, CO₂, H₂O."], balance: ["CH3COOH + NaHCO3 -> CH3COONa + CO2 + H2O"] }),
  q("ak-p8", "Carboxylic acids", 2, "Identify the product: CH₃CH₂COOH + LiAlH₄, then H₃O⁺ →", ["propan-1-ol", "propanal", "propane", "propanoyl chloride"], 0, "LiAlH₄ reduces –COOH to a primary alcohol.", "A strong hydride reagent.", { steps: ["LiAlH₄ is a strong reducing agent.", "It reduces –COOH to –CH₂OH.", "Product: CH₃CH₂CH₂OH."] }),
  q("ak-p9", "Carboxylic acids", 1, "Identify the product: CH₃COOH + CH₃CH₂OH (conc. H₂SO₄) →", ["ethyl ethanoate", "ethanal", "diethyl ether", "ethanoic anhydride"], 0, "Esterification gives an ester and water.", "Acid plus alcohol.", { steps: ["Conc. H₂SO₄ catalyses the reaction.", "–OH of the acid and H of the alcohol leave as water.", "Product: CH₃COOCH₂CH₃."], balance: ["CH3COOH + CH3CH2OH -> CH3COOCH2CH3 + H2O"] }),
  q("ak-p10", "Reduction", 2, "Identify the product: CH₃COCH₃ + Zn–Hg/conc. HCl →", ["propane", "propan-2-ol", "propene", "propanal"], 0, "Clemmensen reduction converts C=O to CH₂.", "Acidic reduction of C=O to CH₂.", { steps: ["Zinc amalgam and conc. HCl is the Clemmensen reagent.", "The C=O becomes CH₂.", "Product: CH₃CH₂CH₃."] }),
];

export const content: ChemChapterContent = { sections, questions, cards, challenge, concept, equations, reactions, predict };
