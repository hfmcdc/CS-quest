import type { ChemCard, ChemChapterContent, ChemConceptQ, ChemLevel, ChemQuestion, ChemReactionQ, ChemReactionStage, ChemSection } from "../types";

/**
 * Chapter 7 · Alcohols, Phenols and Ethers (CBSE 2026-27, 6 marks).
 * Syllabus scope: classification, nomenclature, structure, preparation, physical properties and reactions of alcohols, phenols
 * and ethers, plus commercially important alcohols. Reaction mechanisms are not tested here (conditions and products only).
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
    title: "Classification, structure and physical properties",
    items: [
      { label: "Classification", body: "Alcohols are monohydric, dihydric or trihydric by the number of –OH groups, and primary, secondary or tertiary by the carbon bearing –OH. Ethers are symmetrical (R–O–R) or unsymmetrical (R–O–R′)." },
      { label: "Structure", body: "In methanol the C–O–H angle (108.9°) is slightly less than tetrahedral because of lone-pair repulsion. In ethers the C–O–C angle (111.7° in methoxymethane) is slightly larger because of repulsion between the alkyl groups. The C–O bond in phenol (136 pm) is shorter than in methanol (142 pm) because of resonance and the sp² carbon." },
      { label: "Boiling point", body: "Alcohols boil much higher than ethers, haloalkanes and alkanes of comparable mass because of intermolecular hydrogen bonding. Boiling point rises with chain length and falls with branching." },
      { label: "Solubility", body: "Lower alcohols dissolve in water by hydrogen bonding, but solubility falls as the alkyl group grows. Lower ethers are slightly soluble because the oxygen can hydrogen-bond with water." },
    ],
  },
  {
    kind: "reactions",
    title: "Preparation",
    items: [
      { label: "Alcohols from alkenes", body: "Acid-catalysed hydration (dil. H₂SO₄/H₂O) follows Markovnikov's rule: CH₃CH=CH₂ → CH₃CH(OH)CH₃. Hydroboration–oxidation (B₂H₆ then H₂O₂/OH⁻) gives the anti-Markovnikov alcohol: CH₃CH=CH₂ → CH₃CH₂CH₂OH." },
      { label: "Alcohols from carbonyl compounds", body: "Reduction of aldehydes and ketones (H₂/Pd, NaBH₄ or LiAlH₄) gives primary and secondary alcohols. LiAlH₄ also reduces carboxylic acids and esters to primary alcohols; NaBH₄ does not. Grignard reagents with HCHO give primary, with other aldehydes secondary and with ketones tertiary alcohols." },
      { label: "Phenols", body: "From chlorobenzene (NaOH, 623 K, 300 atm, then H⁺); from benzenesulphonic acid (fused with NaOH, then H⁺); from benzenediazonium chloride (warm water); from cumene (air oxidation to cumene hydroperoxide, then dilute acid, giving phenol and acetone)." },
      { label: "Ethers", body: "Dehydration of alcohols: conc. H₂SO₄ at 413 K with excess alcohol gives the ether, while 443 K gives the alkene. Williamson synthesis: R–ONa + R′–X → R–O–R′ + NaX, best with a primary alkyl halide, because a tertiary one gives an alkene." },
    ],
  },
  {
    kind: "reactions",
    title: "Reactions of alcohols",
    items: [
      { label: "Acidity", body: "Alcohols are weaker acids than water. Acidity falls primary > secondary > tertiary. With Na they give alkoxide and H₂: 2R–OH + 2Na → 2R–ONa + H₂." },
      { label: "Esterification", body: "Alcohol + carboxylic acid (acid catalyst), acid chloride or anhydride gives an ester." },
      { label: "C–O cleavage", body: "With HX (Lucas reagent: conc. HCl + anhydrous ZnCl₂): tertiary alcohols turn cloudy at once, secondary after about five minutes, primary only on heating. PCl₃, PCl₅ and SOCl₂ also give haloalkanes." },
      { label: "Dehydration", body: "Conc. H₂SO₄ at 443 K gives the alkene (ease: tertiary > secondary > primary). At 413 K with excess alcohol the ether forms." },
      { label: "Oxidation", body: "PCC oxidises primary alcohols only to aldehydes. KMnO₄, K₂Cr₂O₇ or CrO₃ take primary alcohols to carboxylic acids and secondary alcohols to ketones. Tertiary alcohols resist oxidation. Cu at 573 K dehydrogenates primary alcohols to aldehydes and secondary alcohols to ketones; tertiary alcohols dehydrate to alkenes." },
    ],
  },
  {
    kind: "table",
    title: "Reactions of phenols",
    head: ["Reaction", "Reagent and conditions", "Product"],
    rows: [
      ["Acidity", "NaOH", "Sodium phenoxide"],
      ["Nitration (dilute)", "Dil. HNO₃, low temperature", "o- and p-nitrophenol"],
      ["Nitration (conc.)", "Conc. HNO₃/H₂SO₄", "2,4,6-trinitrophenol (picric acid)"],
      ["Bromination (non-polar solvent)", "Br₂ in CS₂, low temperature", "o- and p-bromophenol"],
      ["Bromination (water)", "Bromine water", "2,4,6-tribromophenol (white precipitate)"],
      ["Kolbe's reaction", "NaOH, then CO₂ (400 K, 4–7 atm), then H⁺", "Salicylic acid"],
      ["Reimer–Tiemann", "CHCl₃, aq. NaOH (340 K), then H⁺", "Salicylaldehyde"],
      ["Reduction", "Zn dust, heat", "Benzene"],
      ["Oxidation", "Chromic acid", "Benzoquinone"],
    ],
    note: "Phenol gives a violet colour with neutral FeCl₃. Salicylic acid with acetic anhydride gives aspirin.",
  },
  {
    kind: "concepts",
    title: "Acidity of phenols, ethers and commercial alcohols",
    items: [
      { label: "Why phenol is acidic", body: "The phenoxide ion is stabilised by resonance, so phenol is more acidic than alcohols and water. Electron-withdrawing groups (–NO₂) increase acidity, especially at the ortho and para positions. Electron-releasing groups (–CH₃) decrease it." },
      { label: "Acidity order", body: "Phenol > water > primary alcohol > secondary alcohol > tertiary alcohol. 2,4,6-Trinitrophenol is a strong acid." },
      { label: "Ether cleavage", body: "Ethers are cleaved by HI or HBr: R–O–R′ + HX → R–X + R′–OH, and excess HX converts the alcohol to a second halide. Anisole with HI gives phenol and CH₃I, not iodobenzene, because the C(sp²)–O bond is stronger." },
      { label: "Anisole", body: "The –OR group is activating and ortho/para-directing: anisole undergoes bromination (in ethanoic acid), Friedel–Crafts alkylation and acylation, and nitration." },
      { label: "Methanol and ethanol", body: "Methanol: CO + 2H₂ over ZnO–Cr₂O₃ at 573–673 K and 200–300 atm; it is poisonous. Ethanol: fermentation of sugars with invertase and then zymase giving ethanol and CO₂. Denatured alcohol is ethanol made unfit to drink." },
    ],
  },
  {
    kind: "mistakes",
    title: "Common mistakes",
    items: [
      { body: "Mixing up the temperatures: 443 K with conc. H₂SO₄ gives ethene, 413 K gives the ether." },
      { body: "Using a tertiary alkyl halide in the Williamson synthesis. It gives an alkene; put the tertiary group on the alkoxide instead." },
      { body: "Forgetting that bromine water gives 2,4,6-tribromophenol while Br₂ in CS₂ gives o- and p-bromophenol." },
      { body: "Mixing Kolbe (CO₂, gives –COOH) with Reimer–Tiemann (CHCl₃, gives –CHO). Both substitute at the ortho position." },
      { body: "Expecting anisole + HI to give iodobenzene. The products are phenol and methyl iodide." },
    ],
  },
];

const card = (id: string, tag: string, front: string, back: string): ChemCard => ({ id, tag, front, back });

const cards: ChemCard[] = [
  card("ap-c1", "Preparation", "Acid-catalysed hydration of an alkene", "Reagent: dilute H₂SO₄ (or H₃PO₄), water\n\nCH₃CH=CH₂ + H₂O → CH₃CH(OH)CH₃\n\nProduct: propan-2-ol (Markovnikov)."),
  card("ap-c2", "Preparation", "Hydroboration–oxidation", "Reagent: (i) B₂H₆ (BH₃·THF); (ii) H₂O₂, OH⁻\n\nCH₃CH=CH₂ → CH₃CH₂CH₂OH\n\nProduct: propan-1-ol (anti-Markovnikov)."),
  card("ap-c3", "Preparation", "Reduction of aldehydes and ketones", "Reagent: H₂/Pd, NaBH₄ or LiAlH₄\n\nRCHO → RCH₂OH (primary alcohol)\nRCOR′ → RCH(OH)R′ (secondary alcohol)"),
  card("ap-c4", "Preparation", "Reduction of carboxylic acids and esters", "Reagent: LiAlH₄ (strong reducing agent)\n\nRCOOH → RCH₂OH\nRCOOR′ → RCH₂OH + R′OH\n\nNaBH₄ does not reduce acids or esters."),
  card("ap-c5", "Preparation", "Grignard reagent with carbonyl compounds", "RMgX + HCHO → primary alcohol\nRMgX + RCHO → secondary alcohol\nRMgX + R₂C=O → tertiary alcohol\n\nExample: CH₃MgBr + CH₃CHO, then H₃O⁺ → CH₃CH(OH)CH₃."),
  card("ap-c6", "Preparation", "Phenol from chlorobenzene", "Reagent: NaOH, 623 K, 300 atm, then H⁺\n\nC₆H₅Cl → C₆H₅ONa → C₆H₅OH"),
  card("ap-c7", "Preparation", "Phenol from benzenesulphonic acid", "Reagent: fuse with NaOH, then H⁺\n\nC₆H₅SO₃H → C₆H₅ONa → C₆H₅OH"),
  card("ap-c8", "Preparation", "Phenol from a diazonium salt", "Reagent: warm water (or dilute acid)\n\nC₆H₅N₂⁺Cl⁻ + H₂O → C₆H₅OH + N₂ + HCl"),
  card("ap-c9", "Preparation", "Phenol from cumene", "Steps: cumene + O₂ → cumene hydroperoxide; then dilute acid\n\nProducts: phenol and acetone (both useful)."),
  card("ap-c10", "Preparation", "Williamson synthesis", "Reagent: sodium alkoxide + alkyl halide\n\nR–ONa + R′–X → R–O–R′ + NaX\n\nUse a primary alkyl halide. A tertiary one gives an alkene by elimination."),
  card("ap-c11", "Alcohol reactions", "Dehydration of ethanol", "Reagent: conc. H₂SO₄\n\n443 K: CH₃CH₂OH → CH₂=CH₂ + H₂O (ethene)\n413 K (excess alcohol): 2CH₃CH₂OH → CH₃CH₂OCH₂CH₃ + H₂O (ethoxyethane)"),
  card("ap-c12", "Alcohol reactions", "Alcohol with sodium", "2R–OH + 2Na → 2R–ONa + H₂↑\n\nObservation: effervescence of hydrogen. Alcohols are weaker acids than water."),
  card("ap-c13", "Alcohol reactions", "Esterification", "Reagent: carboxylic acid with acid catalyst, or acid chloride, or anhydride\n\nCH₃CH₂OH + CH₃COCl → CH₃COOCH₂CH₃ + HCl"),
  card("ap-c14", "Alcohol reactions", "Lucas test", "Reagent: conc. HCl + anhydrous ZnCl₂\n\nTertiary: turbidity immediately\nSecondary: turbidity in about 5 minutes\nPrimary: no turbidity at room temperature (only on heating)"),
  card("ap-c15", "Alcohol reactions", "Alcohol → haloalkane", "Reagents: HX, PCl₃, PCl₅ or SOCl₂\n\nR–OH + SOCl₂ → R–Cl + SO₂ + HCl\n\nSOCl₂ is preferred because the by-products are gases."),
  card("ap-c16", "Alcohol reactions", "Oxidation of alcohols", "PCC: primary alcohol → aldehyde (stops)\nKMnO₄, K₂Cr₂O₇, CrO₃: primary → carboxylic acid; secondary → ketone\nTertiary alcohols resist oxidation."),
  card("ap-c17", "Alcohol reactions", "Copper at 573 K (dehydrogenation)", "Primary alcohol → aldehyde + H₂\nSecondary alcohol → ketone + H₂\nTertiary alcohol → alkene (dehydration)"),
  card("ap-c18", "Acidity", "Why phenol is more acidic than alcohol", "Phenoxide ion is stabilised by resonance, spreading the negative charge into the ring.\nAlkoxide has no such stabilisation, and alkyl groups push electrons onto oxygen.\n\nOrder: phenol > water > primary > secondary > tertiary alcohol."),
  card("ap-c19", "Acidity", "Substituent effects on the acidity of phenol", "Electron-withdrawing group (–NO₂), especially o- or p-: increases acidity.\nElectron-releasing group (–CH₃): decreases acidity.\n\n2,4,6-Trinitrophenol (picric acid) is a strong acid."),
  card("ap-c20", "Phenol reactions", "Nitration of phenol", "Dilute HNO₃, low temperature: o- and p-nitrophenol\nConc. HNO₃ with conc. H₂SO₄: 2,4,6-trinitrophenol (picric acid)\n\nThe o-isomer is steam volatile (intramolecular hydrogen bond); the p-isomer is not."),
  card("ap-c21", "Phenol reactions", "Bromination of phenol", "Br₂ in CS₂ (non-polar), low temperature: o- and p-bromophenol\nBromine water: 2,4,6-tribromophenol (white precipitate)\n\nIn water phenol ionises to the very reactive phenoxide ion."),
  card("ap-c22", "Phenol reactions", "Kolbe's reaction", "Reagent: NaOH to give sodium phenoxide, then CO₂ (400 K, 4–7 atm), then H⁺\n\nC₆H₅OH → 2-HOC₆H₄COOH\n\nProduct: salicylic acid (ortho –COOH)."),
  card("ap-c23", "Phenol reactions", "Reimer–Tiemann reaction", "Reagent: CHCl₃ and aqueous NaOH (340 K), then H⁺\n\nC₆H₅OH → 2-HOC₆H₄CHO\n\nProduct: salicylaldehyde (ortho –CHO)."),
  card("ap-c24", "Phenol reactions", "Phenol with zinc dust and with chromic acid", "Zn dust, heat: C₆H₅OH + Zn → C₆H₆ + ZnO\nChromic acid: oxidation to benzoquinone"),
  card("ap-c25", "Phenol reactions", "Test for phenol", "Neutral FeCl₃: violet colour.\nBromine water: white precipitate of 2,4,6-tribromophenol.\n\nSalicylic acid + (CH₃CO)₂O → aspirin (acetylsalicylic acid)."),
  card("ap-c26", "Ethers", "Cleavage of ethers by HI", "Reagent: HI (HI > HBr > HCl)\n\nR–O–R′ + HI → R–I + R′–OH; excess HI converts the alcohol to R′–I\nC₆H₅OCH₃ + HI → C₆H₅OH + CH₃I\n\nPhenol, not iodobenzene: the C(sp²)–O bond is stronger."),
  card("ap-c27", "Ethers", "Electrophilic substitution of anisole", "The –OCH₃ group activates the ring and directs ortho and para.\n\nBromination (in ethanoic acid), Friedel–Crafts alkylation/acylation (anhydrous AlCl₃) and nitration (HNO₃/H₂SO₄) all give o- and p-products, with the para isomer major."),
  card("ap-c28", "Commercial alcohols", "Manufacture of methanol and ethanol", "Methanol: CO + 2H₂ → CH₃OH (ZnO–Cr₂O₃, 573–673 K, 200–300 atm)\nEthanol: sugar → (invertase) glucose + fructose → (zymase) C₂H₅OH + CO₂\n\nMethanol is poisonous; denatured alcohol is ethanol made unfit to drink."),
  card("ap-c29", "Physical properties", "Hydrogen bonding and boiling point", "Alcohols: strong intermolecular hydrogen bonds, so high boiling point and good water solubility for lower members.\nEthers: no O–H, so boiling points like alkanes of similar mass.\n\nBranching lowers the boiling point."),
];

const concept: ChemConceptQ[] = [
  { id: "ap-s1", tag: "Acidity", level: 2, q: "Why is phenol more acidic than ethanol?", groups: [["resonance", "delocal"], ["phenoxide", "conjugate base", "anion"]],
    model: "The phenoxide ion is stabilised by resonance, with the negative charge delocalised into the benzene ring, while the ethoxide ion has no such stabilisation and the alkyl group destabilises it.", hint: "Compare the stability of the two conjugate bases." },
  { id: "ap-s2", tag: "Physical properties", level: 1, q: "Why do alcohols have higher boiling points than ethers of comparable molar mass?", groups: [["hydrogen bond", "h bond", "h-bond"]],
    model: "Alcohols form intermolecular hydrogen bonds because of the O–H group. Ethers have no hydrogen on oxygen, so they cannot.", hint: "Which strong intermolecular force can alcohols form?" },
  { id: "ap-s3", tag: "Phenol reactions", level: 2, q: "Why is o-nitrophenol steam volatile but p-nitrophenol is not?", groups: [["intramolecular", "intra molecular", "within the molecule", "chelat"], ["intermolecular", "inter molecular", "associat", "between molecules"]],
    model: "o-Nitrophenol has intramolecular hydrogen bonding, so it does not associate with other molecules and is volatile. p-Nitrophenol has intermolecular hydrogen bonding, so it is associated and much less volatile.", hint: "Compare hydrogen bonding within and between molecules." },
  { id: "ap-s4", tag: "Alcohol reactions", level: 2, q: "Why do tertiary alcohols react fastest with Lucas reagent?", groups: [["carbocation", "carbonium"], ["stable", "stability", "stabil"]],
    model: "Tertiary alcohols form the most stable carbocation, so the substitution with HCl/ZnCl₂ is fastest and the turbidity appears immediately.", hint: "Think about the stability of the carbocation intermediate." },
  { id: "ap-s5", tag: "Ethers", level: 2, q: "Why can't a tertiary alkyl halide be used with sodium alkoxide in the Williamson synthesis?", groups: [["elimination", "alkene", "eliminat"]],
    model: "The alkoxide is a strong base and the tertiary halide is hindered, so elimination to an alkene occurs instead of substitution.", hint: "What does a strong base do to a tertiary halide?" },
  { id: "ap-s6", tag: "Preparation", level: 2, q: "Write the product of propene with (i) dilute H₂SO₄/H₂O and (ii) B₂H₆ then H₂O₂/NaOH. Name both.", groups: [["propan-2-ol", "propan 2 ol", "2 propanol", "isopropyl alcohol", "isopropanol", "propan2ol", "2propanol"], ["propan-1-ol", "propan 1 ol", "1 propanol", "n propanol", "propan1ol", "1propanol"]],
    model: "(i) Propan-2-ol (Markovnikov hydration). (ii) Propan-1-ol (anti-Markovnikov, hydroboration–oxidation).", hint: "One route follows Markovnikov's rule and the other does not." },
  { id: "ap-s7", tag: "Structure", level: 2, q: "Why is the C–O bond in phenol shorter than in methanol?", groups: [["resonance", "double bond character", "partial double", "sp2", "sp 2"]],
    model: "The lone pair on oxygen is in resonance with the ring, giving the C–O bond partial double-bond character, and the carbon is sp² hybridised. Both shorten the bond.", hint: "Think about resonance and the hybridisation of the carbon." },
  { id: "ap-s8", tag: "Phenol reactions", level: 3, q: "Why does phenol give 2,4,6-tribromophenol with bromine water but only o- and p-bromophenol with Br₂ in CS₂?", groups: [["polar", "water", "ioni", "phenoxide"]],
    model: "In water (polar) phenol ionises to the phenoxide ion, which is strongly activated, so all three ortho and para positions are brominated. In CS₂ (non-polar) ionisation is suppressed and only mono-bromination occurs.", hint: "What does the solvent do to phenol?" },
  { id: "ap-s9", tag: "Ethers", level: 3, q: "Anisole reacts with HI to give phenol and methyl iodide, not iodobenzene. Why?", groups: [["sp2", "sp 2", "double bond", "resonance", "partial double", "stronger", "strong"]],
    model: "The C(sp²)–O bond in anisole is stronger because of partial double-bond character (resonance), so it does not break. The CH₃–O bond breaks instead.", hint: "Compare the strength of the two C–O bonds." },
];

const equations: ChemConceptQ[] = [
  { id: "ap-e1", tag: "Alcohol reactions", level: 1, q: "Complete the reaction and name the organic product:\nCH₃CH₂OH + Na →", groups: [["ch3ch2ona", "c2h5ona", "sodium ethoxide", "sodium ethanolate"]], model: "CH₃CH₂ONa (sodium ethoxide) + H₂.", hint: "The O–H hydrogen is replaced by sodium.", balance: ["2CH3CH2OH + 2Na -> 2CH3CH2ONa + H2"] },
  { id: "ap-e2", tag: "Alcohol reactions", level: 1, q: "Complete the reaction:\nCH₃CH₂OH + conc. H₂SO₄ (443 K) → ?  (organic product)", groups: [["ch2=ch2", "h2c=ch2", "c2h4", "ethene", "ethylene"]], model: "CH₂=CH₂ (ethene) + H₂O.", hint: "443 K favours elimination.", balance: ["CH3CH2OH -> CH2CH2 + H2O"] },
  { id: "ap-e3", tag: "Alcohol reactions", level: 2, q: "Complete the reaction:\n2CH₃CH₂OH + conc. H₂SO₄ (413 K) → ?  (organic product)", groups: [["ch3ch2och2ch3", "c2h5oc2h5", "ethoxyethane", "diethyl ether", "ethyl ether"]], model: "CH₃CH₂OCH₂CH₃ (ethoxyethane) + H₂O.", hint: "Two alcohol molecules lose one water.", balance: ["2CH3CH2OH -> CH3CH2OCH2CH3 + H2O"] },
  { id: "ap-e4", tag: "Phenol reactions", level: 1, q: "Complete the reaction and name the organic product:\nC₆H₅OH + NaOH →", groups: [["c6h5ona", "sodium phenoxide", "sodium phenolate"]], model: "C₆H₅ONa (sodium phenoxide) + H₂O.", hint: "Phenol is acidic enough to react with NaOH.", balance: ["C6H5OH + NaOH -> C6H5ONa + H2O"] },
  { id: "ap-e5", tag: "Ethers", level: 2, q: "Complete the reaction:\nCH₃CH₂ONa + CH₃CH₂Br → ?  (organic product)", groups: [["ch3ch2och2ch3", "c2h5oc2h5", "ethoxyethane", "diethyl ether", "ethyl ether"]], model: "CH₃CH₂OCH₂CH₃ (ethoxyethane) + NaBr, by Williamson synthesis.", hint: "Alkoxide displaces bromide.", balance: ["CH3CH2ONa + CH3CH2Br -> CH3CH2OCH2CH3 + NaBr"] },
  { id: "ap-e6", tag: "Phenol reactions", level: 2, q: "Complete the reaction:\nC₆H₅OH + 3Br₂ (aqueous) → ?  (organic product)", groups: [["2,4,6 tribromophenol", "2,4,6-tribromophenol", "246tribromophenol", "tribromophenol", "c6h2br3oh"]], model: "2,4,6-Tribromophenol (white precipitate) + 3HBr.", hint: "All the activated ortho and para positions are brominated.", balance: ["C6H5OH + 3Br2 -> C6H2Br3OH + 3HBr"] },
  { id: "ap-e7", tag: "Ethers", level: 2, q: "Complete the reaction and write both products:\nC₆H₅OCH₃ + HI →", groups: [["c6h5oh", "phenol"], ["ch3i", "methyl iodide", "iodomethane"]], model: "C₆H₅OH (phenol) and CH₃I (methyl iodide).", hint: "The CH₃–O bond breaks, not the C(aryl)–O bond.", balance: ["C6H5OCH3 + HI -> C6H5OH + CH3I"] },
  { id: "ap-e8", tag: "Preparation", level: 2, q: "Complete the reaction and name the product:\nCH₃CHO + CH₃MgBr, then H₃O⁺ → ?", groups: [["ch3ch(oh)ch3", "propan 2 ol", "propan-2-ol", "2 propanol", "isopropyl alcohol", "isopropanol", "propan2ol", "2propanol"]], model: "CH₃CH(OH)CH₃ (propan-2-ol), a secondary alcohol.", hint: "An aldehyde with a Grignard reagent gives a secondary alcohol." },
  { id: "ap-e9", tag: "Phenol reactions", level: 2, q: "Complete the reaction and name the product:\nC₆H₅OH + CHCl₃ + aq. NaOH (340 K), then H⁺ → ?", groups: [["salicylaldehyde", "2 hydroxybenzaldehyde", "2-hydroxybenzaldehyde", "o hydroxybenzaldehyde", "hoc6h4cho", "salicyl aldehyde"]], model: "Salicylaldehyde (2-hydroxybenzaldehyde), by Reimer–Tiemann reaction.", hint: "A –CHO group enters ortho to –OH." },
  { id: "ap-e10", tag: "Phenol reactions", level: 2, q: "Complete the reaction and name the product:\nC₆H₅ONa + CO₂ (400 K, 4–7 atm), then H⁺ → ?", groups: [["salicylic acid", "2 hydroxybenzoic acid", "2-hydroxybenzoic acid", "o hydroxybenzoic acid", "hoc6h4cooh"]], model: "Salicylic acid (2-hydroxybenzoic acid), by Kolbe's reaction.", hint: "A –COOH group enters ortho to –OH." },
  { id: "ap-e11", tag: "Phenol reactions", level: 2, q: "Complete the reaction:\nC₆H₅OH + Zn dust (heat) → ?  (organic product)", groups: [["c6h6", "benzene"]], model: "C₆H₆ (benzene) + ZnO.", hint: "Zinc removes the oxygen.", balance: ["C6H5OH + Zn -> C6H6 + ZnO"] },
  { id: "ap-e12", tag: "Phenol reactions", level: 2, q: "Complete the reaction and name the product:\nC₆H₅OH + 3HNO₃ (conc., with H₂SO₄) → ?", groups: [["2,4,6 trinitrophenol", "2,4,6-trinitrophenol", "246trinitrophenol", "picric acid", "trinitrophenol"]], model: "2,4,6-Trinitrophenol (picric acid) + 3H₂O.", hint: "Concentrated acid nitrates all three activated positions.", balance: ["C6H5OH + 3HNO3 -> C6H2(NO2)3OH + 3H2O"] },
  { id: "ap-e13", tag: "Preparation", level: 2, q: "Complete the reaction and name the product:\nCH₃CH=CH₂ + B₂H₆, then H₂O₂/OH⁻ → ?", groups: [["ch3ch2ch2oh", "propan 1 ol", "propan-1-ol", "1 propanol", "n propanol", "propan1ol", "1propanol"]], model: "CH₃CH₂CH₂OH (propan-1-ol), the anti-Markovnikov alcohol.", hint: "Hydroboration–oxidation gives the less substituted alcohol." },
];

const st = (ask: string, options: string[], answer: number, why: string, hint: string): ChemReactionStage => ({ ask, options, answer, why, hint });
const rx = (id: string, tag: string, level: ChemLevel, title: string, prompt: string, stages: ChemReactionStage[], equation: string, note?: string, balance?: string[]): ChemReactionQ =>
  ({ id, tag, level, title, prompt, stages, equation, ...(note ? { note } : {}), ...(balance ? { balance } : {}) });

const reactions: ChemReactionQ[] = [
  rx("ap-r1", "Preparation", 1, "Hydration of propene", "CH₃CH=CH₂ → CH₃CH(OH)CH₃",
    [st("Which reagent?", ["Dilute H₂SO₄ and water", "B₂H₆ then H₂O₂/OH⁻", "NaBH₄", "PCC"], 0, "Acid-catalysed hydration adds H⁺ and OH⁻ across the double bond.", "Which method gives the Markovnikov alcohol?"),
     st("Which rule decides the product?", ["Markovnikov's rule", "Saytzeff's rule", "Hund's rule", "Kolbe's rule"], 0, "OH goes to the carbon with fewer hydrogens, giving the secondary alcohol.", "H adds to the carbon that already has more hydrogens.")],
    "CH₃CH=CH₂ + H₂O (H⁺) → CH₃CH(OH)CH₃"),
  rx("ap-r2", "Preparation", 2, "Hydroboration–oxidation", "CH₃CH=CH₂ → CH₃CH₂CH₂OH",
    [st("Which reagents?", ["(i) B₂H₆ (ii) H₂O₂/OH⁻", "Dil. H₂SO₄/H₂O", "(i) Hg(OAc)₂ only", "Conc. H₂SO₄, 443 K"], 0, "Hydroboration then oxidation adds water in an anti-Markovnikov way.", "Boron adds first, then it is replaced by OH."),
     st("What is the regiochemistry?", ["Anti-Markovnikov", "Markovnikov", "Random", "Saytzeff"], 0, "Boron adds to the less substituted carbon, so OH ends up there.", "Compare with the acid-catalysed route.")],
    "CH₃CH=CH₂ →(i) B₂H₆ (ii) H₂O₂/OH⁻ CH₃CH₂CH₂OH"),
  rx("ap-r3", "Preparation", 2, "Cumene process", "Cumene → phenol",
    [st("Step 1: what is done to cumene?", ["Oxidised with air to cumene hydroperoxide", "Reduced with H₂", "Chlorinated", "Treated with NaOH"], 0, "Air oxidation gives cumene hydroperoxide.", "The first step adds oxygen."),
     st("Step 2: how is phenol released?", ["Treat with dilute acid", "Treat with NaBH₄", "Heat with Zn dust", "Treat with PCl₅"], 0, "Dilute acid rearranges and cleaves the hydroperoxide.", "An acid hydrolysis step."),
     st("What is the useful by-product?", ["Acetone", "Ethanol", "Benzaldehyde", "Methanol"], 0, "The cumene process gives phenol and acetone.", "A common ketone solvent.")],
    "C₆H₅CH(CH₃)₂ →(O₂) C₆H₅C(CH₃)₂OOH →(dil. H⁺) C₆H₅OH + CH₃COCH₃"),
  rx("ap-r4", "Ethers", 3, "Williamson synthesis of a tertiary ether", "Make (CH₃)₃C–O–CH₃",
    [st("Which reagents give the best yield?", ["(CH₃)₃C–ONa + CH₃Br", "CH₃ONa + (CH₃)₃C–Br", "(CH₃)₃C–OH + CH₃OH with acid", "CH₃ONa + CH₃Br"], 0, "The alkyl halide must be primary (here methyl), so the tertiary group is on the alkoxide.", "Which halide can undergo substitution?"),
     st("Why not CH₃ONa + (CH₃)₃CBr?", ["Elimination gives an alkene", "It gives a Grignard reagent", "It gives an alcohol", "Nothing happens"], 0, "Alkoxide is a strong base, and a tertiary halide eliminates to give 2-methylpropene.", "Think about base strength and substitution at a tertiary carbon.")],
    "(CH₃)₃C–ONa + CH₃Br → (CH₃)₃C–O–CH₃ + NaBr", undefined, ["(CH3)3CONa + CH3Br -> (CH3)3COCH3 + NaBr"]),
  rx("ap-r5", "Alcohol reactions", 2, "Dehydration conditions", "CH₃CH₂OH → ethene or ethoxyethane",
    [st("Which conditions give ethene?", ["Conc. H₂SO₄, 443 K", "Conc. H₂SO₄, 413 K, excess alcohol", "Cu, 573 K", "Dilute H₂SO₄, 300 K"], 0, "Higher temperature favours elimination to the alkene.", "The higher temperature wins."),
     st("Which conditions give ethoxyethane?", ["Conc. H₂SO₄, 413 K, excess alcohol", "Conc. H₂SO₄, 443 K", "Na", "PCl₅"], 0, "Lower temperature with excess alcohol favours substitution to the ether.", "Excess alcohol and lower temperature.")],
    "CH₃CH₂OH →(conc. H₂SO₄, 443 K) CH₂=CH₂ + H₂O\n2CH₃CH₂OH →(conc. H₂SO₄, 413 K) CH₃CH₂OCH₂CH₃ + H₂O"),
  rx("ap-r6", "Alcohol reactions", 2, "Lucas test", "Distinguish butan-1-ol, butan-2-ol and 2-methylpropan-2-ol",
    [st("Which reagent?", ["Conc. HCl + anhydrous ZnCl₂", "Br₂ water", "Neutral FeCl₃", "Tollens' reagent"], 0, "Lucas reagent converts alcohols to chlorides, which are insoluble and make the solution cloudy.", "The reagent contains HCl and a Lewis acid."),
     st("Which alcohol turns cloudy immediately?", ["2-Methylpropan-2-ol", "Butan-2-ol", "Butan-1-ol", "None of them"], 0, "The tertiary alcohol forms the most stable carbocation and reacts fastest.", "Tertiary reacts fastest.")],
    "R₃C–OH + HCl (ZnCl₂) → R₃C–Cl + H₂O (cloudy at once for tertiary)"),
  rx("ap-r7", "Phenol reactions", 2, "Kolbe's reaction", "C₆H₅OH → salicylic acid",
    [st("Step 1: which reagent first?", ["NaOH", "CHCl₃", "Br₂", "Zn dust"], 0, "NaOH converts phenol to sodium phenoxide, which is far more reactive.", "Make the phenoxide first."),
     st("Step 2: which reagent and conditions?", ["CO₂, 400 K, 4–7 atm", "CHCl₃, 340 K", "CO, HCl, AlCl₃", "H₂, Pd"], 0, "Sodium phenoxide reacts with CO₂ under pressure at the ortho position.", "A pressure reaction with carbon dioxide."),
     st("Step 3: what finally releases the acid?", ["Acidification with H⁺", "Heating with Zn", "NaBH₄", "Cu at 573 K"], 0, "Acid converts the sodium salicylate to salicylic acid.", "The product is formed as a salt first.")],
    "C₆H₅OH →(NaOH) C₆H₅ONa →(CO₂, 400 K, 4–7 atm) sodium salicylate →(H⁺) 2-HOC₆H₄COOH"),
  rx("ap-r8", "Phenol reactions", 2, "Reimer–Tiemann reaction", "C₆H₅OH → salicylaldehyde",
    [st("Which reagents?", ["CHCl₃ and aqueous NaOH (340 K), then H⁺", "CO and HCl with AlCl₃", "CO₂ at 4–7 atm", "H₂/Pd"], 0, "Chloroform in alkali introduces a –CHO group ortho to –OH.", "Chloroform and alkali."),
     st("Where does the –CHO group enter?", ["Ortho to –OH", "Meta to –OH", "Para only", "On the –OH oxygen"], 0, "The product is salicylaldehyde, 2-hydroxybenzaldehyde.", "The name 'salicyl' tells you.")],
    "C₆H₅OH →(CHCl₃, aq. NaOH, 340 K; then H⁺) 2-HOC₆H₄CHO"),
  rx("ap-r9", "Preparation", 2, "Benzene to phenol", "C₆H₆ → C₆H₅SO₃H → C₆H₅OH",
    [st("Step 1: how is benzenesulphonic acid made?", ["Conc. H₂SO₄ (sulphonation)", "Cl₂/FeCl₃", "HNO₃/H₂SO₄", "CH₃Cl/AlCl₃"], 0, "Sulphonation gives C₆H₅SO₃H.", "Which reagent adds –SO₃H?"),
     st("Step 2: how is it converted to phenol?", ["Fuse with NaOH, then H⁺", "Reduce with Zn", "Treat with PCl₅", "Heat with CO₂"], 0, "Fusion with NaOH gives sodium phenoxide, and acid liberates phenol.", "Alkali fusion then acid.")],
    "C₆H₆ →(conc. H₂SO₄) C₆H₅SO₃H →(NaOH fusion; then H⁺) C₆H₅OH"),
  rx("ap-r10", "Alcohol reactions", 2, "Controlled oxidation", "CH₃CH₂OH → CH₃CHO",
    [st("Which reagent stops at the aldehyde?", ["PCC", "KMnO₄", "K₂Cr₂O₇/H₂SO₄", "CrO₃ in aqueous acid, excess"], 0, "PCC is a mild oxidant that does not oxidise the aldehyde further.", "The mild one."),
     st("What would KMnO₄ give instead?", ["Ethanoic acid", "Ethene", "Ethane", "Ethyl chloride"], 0, "Strong oxidants take a primary alcohol all the way to the acid.", "Over-oxidation.")],
    "CH₃CH₂OH →(PCC) CH₃CHO;  CH₃CH₂OH →(KMnO₄) CH₃COOH"),
  rx("ap-r11", "Ethers", 2, "Cleavage of anisole", "C₆H₅OCH₃ + HI → ?",
    [st("What are the products?", ["Phenol and methyl iodide", "Iodobenzene and methanol", "Benzene and methanol", "No reaction"], 0, "The CH₃–O bond is cleaved.", "Which C–O bond is weaker?"),
     st("Why not iodobenzene?", ["The C(sp²)–O bond is stronger (partial double bond)", "HI is too weak", "Iodine is too small", "Phenol is a gas"], 0, "Resonance gives the aryl C–O bond partial double-bond character, so it does not break.", "Think about resonance in the ring.")],
    "C₆H₅OCH₃ + HI → C₆H₅OH + CH₃I", undefined, ["C6H5OCH3 + HI -> C6H5OH + CH3I"]),
];

const questions: ChemQuestion[] = [
  q("ap-m1", "Nomenclature", 1, "The IUPAC name of CH₃CH(OH)CH₃ is:", ["propan-2-ol", "propan-1-ol", "isopropanol", "2-propanal"], 0, "A three-carbon alcohol with –OH on carbon 2 is propan-2-ol.", "Number from the end that gives –OH the lowest number."),
  q("ap-m2", "Physical properties", 1, "Which has the highest boiling point?", ["CH₃CH₂OH", "CH₃OCH₃", "CH₃CH₂CH₃", "CH₃CH₂Cl"], 0, "Ethanol forms intermolecular hydrogen bonds; the others do not.", "Which can hydrogen-bond?"),
  q("ap-m3", "Preparation", 2, "Propene is converted to propan-1-ol using:", ["B₂H₆ then H₂O₂/NaOH", "dilute H₂SO₄ and water", "NaBH₄", "PCC"], 0, "Hydroboration–oxidation gives the anti-Markovnikov alcohol.", "Which route avoids Markovnikov addition?"),
  q("ap-m4", "Alcohol reactions", 2, "Which alcohol reacts immediately with Lucas reagent?", ["2-methylpropan-2-ol", "propan-2-ol", "propan-1-ol", "methanol"], 0, "Tertiary alcohols form the most stable carbocation and react fastest.", "Look for the tertiary alcohol."),
  q("ap-m5", "Phenol reactions", 2, "Phenol with bromine water gives:", ["2,4,6-tribromophenol", "o-bromophenol only", "p-bromophenol only", "bromobenzene"], 0, "In water phenol ionises, becoming highly activated, so all three positions are brominated.", "A white precipitate forms."),
  q("ap-m6", "Phenol reactions", 2, "Kolbe's reaction of sodium phenoxide gives:", ["salicylic acid", "salicylaldehyde", "benzoic acid", "picric acid"], 0, "Sodium phenoxide + CO₂ (then H⁺) gives 2-hydroxybenzoic acid.", "CO₂ gives –COOH."),
  q("ap-m7", "Ethers", 2, "For the Williamson synthesis the best alkyl halide is:", ["primary", "secondary", "tertiary", "any of these equally"], 0, "Primary halides give substitution; tertiary halides give elimination.", "Which halide avoids elimination?"),
  q("ap-m8", "Acidity", 2, "The most acidic compound among these is:", ["p-nitrophenol", "phenol", "p-cresol", "ethanol"], 0, "The nitro group withdraws electrons and stabilises the phenoxide.", "Electron-withdrawing groups increase acidity."),
  q("ap-m9", "Alcohol reactions", 2, "Oxidation of a secondary alcohol gives:", ["a ketone", "an aldehyde", "a carboxylic acid", "an alkene"], 0, "Secondary alcohols are oxidised to ketones, which resist further oxidation.", "Compare primary and secondary alcohols."),
  q("ap-m10", "Alcohol reactions", 1, "Ethanol heated with conc. H₂SO₄ at 443 K gives mainly:", ["ethene", "ethoxyethane", "ethanal", "ethane"], 0, "At 443 K the alcohol is dehydrated to ethene.", "443 K is the higher temperature."),
  q("ap-m11", "Preparation", 2, "The cumene process gives phenol along with:", ["acetone", "ethanol", "benzaldehyde", "benzoic acid"], 0, "Cumene hydroperoxide is cleaved by acid to phenol and acetone.", "A ketone by-product."),
  q("ap-m12", "Alcohol reactions", 3, "Heating ethanol with excess conc. H₂SO₄ at 413 K gives mainly:", ["ethoxyethane", "ethene", "ethanal", "ethyl hydrogen sulphate only"], 0, "At 413 K with excess alcohol, ether formation is favoured.", "Lower temperature, excess alcohol."),
  q("ap-m13", "Acidity", 3, "The correct order of acidity is:", ["phenol > water > ethanol > propan-2-ol > 2-methylpropan-2-ol", "ethanol > water > phenol", "phenol > ethanol > water", "water > phenol > ethanol"], 0, "Phenol is stabilised by resonance, and alkyl groups reduce acidity: primary > secondary > tertiary.", "Phenol is the strongest acid here."),
  q("ap-m14", "Commercial alcohols", 2, "Methanol is manufactured industrially from:", ["CO and H₂ over ZnO–Cr₂O₃", "fermentation of glucose", "hydration of ethene", "oxidation of methane with KMnO₄"], 0, "Water gas (CO + H₂) at high pressure over ZnO–Cr₂O₃ gives methanol.", "It is not by fermentation."),
  q("ap-m15", "Phenol reactions", 1, "Phenol gives a violet colour with:", ["neutral FeCl₃", "Tollens' reagent", "Fehling's solution", "2,4-DNP"], 0, "The ferric-phenoxide complex is violet.", "A test for phenols."),
];

const challenge: ChemQuestion[] = [
  ar("ap-a1", 2, "Phenol is more acidic than ethanol.", "The phenoxide ion is stabilised by resonance, but the ethoxide ion is not.", 0, "The more stable conjugate base makes phenol the stronger acid.", "Compare the conjugate bases."),
  ar("ap-a2", 2, "o-Nitrophenol is more volatile than p-nitrophenol.", "o-Nitrophenol has intramolecular hydrogen bonding, while p-nitrophenol has intermolecular hydrogen bonding.", 0, "Intramolecular bonding prevents association, so the o-isomer is steam volatile.", "Compare hydrogen bonding within and between molecules."),
  ar("ap-a3", 3, "Ethers cannot be made by Williamson synthesis from a tertiary alkyl halide and an alkoxide.", "Tertiary alkyl halides undergo elimination with a strong base such as an alkoxide.", 0, "The alkene forms instead of the ether.", "Which reaction dominates for a tertiary halide?"),
  ar("ap-a4", 3, "Anisole with HI gives phenol and methyl iodide, not iodobenzene.", "The C(sp²)–O bond in anisole is stronger than the CH₃–O bond because of partial double-bond character.", 0, "Only the weaker CH₃–O bond is broken.", "Think about resonance in anisole."),
  ar("ap-a5", 3, "Phenol reacts with bromine water to give o- and p-bromophenol.", "The –OH group is ortho/para-directing.", 3, "The –OH group is ortho/para-directing (R is true), but bromine water gives 2,4,6-tribromophenol, so A is false.", "How many bromine atoms enter in water?"),
  q("ap-a6", "Preparation", 3, "Acid-catalysed hydration of 2-methylpropene gives:", ["2-methylpropan-2-ol", "2-methylpropan-1-ol", "butan-1-ol", "butan-2-ol"], 0, "Markovnikov addition puts OH on the more substituted carbon, giving the tertiary alcohol.", "OH goes to the carbon with fewer hydrogens.", { challenge: true }),
  q("ap-a7", "Phenol reactions", 3, "Phenol is heated with zinc dust. The organic product is:", ["benzene", "cyclohexanol", "benzaldehyde", "phenyl zinc oxide"], 0, "Zinc removes the oxygen as ZnO, leaving benzene.", "Zinc takes the oxygen.", { challenge: true }),
];

const predict: ChemQuestion[] = [
  q("ap-p1", "Alcohol reactions", 1, "Identify the products: CH₃CH₂OH + Na →", ["sodium ethoxide and hydrogen", "ethene and sodium hydroxide", "ethanal and hydrogen", "ethane and NaOH"], 0, "The O–H hydrogen is replaced by sodium, releasing H₂.", "Alcohols behave as weak acids.", { steps: ["Sodium reacts with the acidic O–H.", "H₂ is evolved.", "Products: CH₃CH₂ONa and H₂."], balance: ["2CH3CH2OH + 2Na -> 2CH3CH2ONa + H2"] }),
  q("ap-p2", "Alcohol reactions", 2, "Identify the product: CH₃CH(OH)CH₃ + KMnO₄ (oxidation) →", ["propanone", "propanal", "propanoic acid", "propene"], 0, "A secondary alcohol gives a ketone.", "Secondary alcohol oxidation stops at the ketone.", { steps: ["The alcohol is secondary.", "Oxidation removes the H on carbon and the O–H hydrogen.", "Product: CH₃COCH₃."] }),
  q("ap-p3", "Preparation", 1, "Identify the major product: CH₃CH=CH₂ + H₂O (H⁺) →", ["propan-2-ol", "propan-1-ol", "propanal", "propane"], 0, "Markovnikov hydration gives the secondary alcohol.", "OH goes to the more substituted carbon.", { steps: ["The alkene is unsymmetrical.", "H adds to the CH₂ carbon; OH adds to CH.", "Product: CH₃CH(OH)CH₃."] }),
  q("ap-p4", "Phenol reactions", 2, "Identify the products: C₆H₅OH + dilute HNO₃ (low temperature) →", ["o- and p-nitrophenol", "2,4,6-trinitrophenol", "m-nitrophenol", "nitrobenzene"], 0, "Dilute acid at low temperature gives mono-nitration at the ortho and para positions.", "Dilute acid, mono-substitution.", { steps: ["–OH is ortho/para-directing and activating.", "Dilute HNO₃ introduces one nitro group.", "Products: o-nitrophenol and p-nitrophenol."] }),
  q("ap-p5", "Ethers", 2, "Identify the product: C₆H₅ONa + CH₃I →", ["anisole (methoxybenzene)", "toluene", "phenol", "benzene"], 0, "Williamson synthesis: the phenoxide displaces iodide to give the aryl alkyl ether.", "Phenoxide plus alkyl halide.", { steps: ["C₆H₅O⁻ is the nucleophile.", "It displaces I⁻ from CH₃I.", "Product: C₆H₅OCH₃."], balance: ["C6H5ONa + CH3I -> C6H5OCH3 + NaI"] }),
  q("ap-p6", "Ethers", 3, "Identify the product: CH₃CH₂OCH₂CH₃ + excess HI (heat) →", ["ethyl iodide", "ethanol only", "ethene", "ethane"], 0, "HI cleaves the ether to ethanol and ethyl iodide; excess HI turns the ethanol into a second ethyl iodide.", "Excess HI converts the alcohol as well.", { steps: ["First cleavage gives C₂H₅I and C₂H₅OH.", "Excess HI converts C₂H₅OH to C₂H₅I.", "Overall: two moles of CH₃CH₂I."], balance: ["CH3CH2OCH2CH3 + 2HI -> 2CH3CH2I + H2O"] }),
  q("ap-p7", "Phenol reactions", 1, "Identify the product: C₆H₅OH + Zn dust (heat) →", ["benzene", "cyclohexane", "benzaldehyde", "toluene"], 0, "Zinc removes the oxygen from phenol.", "Zinc takes the oxygen.", { steps: ["Zinc is oxidised to ZnO.", "The –OH is removed from the ring.", "Product: C₆H₆."], balance: ["C6H5OH + Zn -> C6H6 + ZnO"] }),
  q("ap-p8", "Preparation", 2, "Identify the product: CH₃CH₂MgBr + HCHO, then H₃O⁺ →", ["propan-1-ol", "propan-2-ol", "butan-1-ol", "propanal"], 0, "A Grignard reagent with formaldehyde gives a primary alcohol with one more carbon.", "HCHO gives primary alcohols.", { steps: ["The ethyl group attacks the carbonyl carbon.", "The adduct is hydrolysed.", "Product: CH₃CH₂CH₂OH."] }),
  q("ap-p9", "Preparation", 2, "Identify the product: CH₃COCH₃ + CH₃MgBr, then H₃O⁺ →", ["2-methylpropan-2-ol", "propan-2-ol", "butan-2-ol", "2-methylpropan-1-ol"], 0, "A ketone with a Grignard reagent gives a tertiary alcohol.", "Ketones give tertiary alcohols.", { steps: ["The methyl group adds to C=O of acetone.", "Hydrolysis gives the alcohol.", "Product: (CH₃)₃C–OH."] }),
  q("ap-p10", "Phenol reactions", 2, "Identify the product: salicylic acid + (CH₃CO)₂O →", ["aspirin (acetylsalicylic acid)", "salicylaldehyde", "phenol", "methyl salicylate"], 0, "The phenolic –OH is acetylated, giving aspirin and acetic acid.", "Acetylation of the –OH.", { steps: ["Acetic anhydride is an acetylating agent.", "The –OH of salicylic acid becomes –OCOCH₃.", "Products: aspirin and CH₃COOH."], balance: ["C6H4(OH)COOH + (CH3CO)2O -> C6H4(OCOCH3)COOH + CH3COOH"] }),
];

export const content: ChemChapterContent = { sections, questions, cards, challenge, concept, equations, reactions, predict };
