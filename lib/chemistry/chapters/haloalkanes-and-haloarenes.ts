import type { ChemCard, ChemChapterContent, ChemConceptQ, ChemLevel, ChemQuestion, ChemReactionQ, ChemReactionStage, ChemSection } from "../types";

/**
 * Chapter 6 · Haloalkanes and Haloarenes (CBSE 2026-27, 6 marks).
 * Syllabus scope: classification, nomenclature, nature of the C–X bond, preparation of haloalkanes and haloarenes,
 * physical properties, chemical reactions, polyhalogen compounds.
 * Deliberately NOT covered (not confirmed in the current text): stereochemical aspects (Walden inversion, racemisation, optical activity).
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
    title: "Classification and the C–X bond",
    items: [
      { label: "Classification", body: "Haloalkanes have the halogen on an sp³ carbon (primary, secondary or tertiary). Haloarenes have it on an sp² carbon of an aromatic ring. Allylic and benzylic halides have the halogen on an sp³ carbon next to C=C or a benzene ring. Vinylic and aryl halides have it on an sp² carbon." },
      { label: "Polarity", body: "Carbon carries a partial positive charge and halogen a partial negative charge, because halogens are more electronegative than carbon." },
      { label: "Trends in C–X", body: "Bond length increases F < Cl < Br < I (139, 178, 193, 214 pm in CH₃–X). Bond enthalpy decreases in the same order (452, 351, 293, 234 kJ mol⁻¹)." },
      { label: "Physical properties", body: "Boiling points: RI > RBr > RCl > RF, and for isomers the branched halide boils lower. Haloalkanes are only slightly soluble in water because they cannot hydrogen-bond with it." },
    ],
  },
  {
    kind: "reactions",
    title: "Preparation",
    items: [
      { label: "From alcohols", body: "R–OH + SOCl₂ → R–Cl + SO₂↑ + HCl↑ (best method, the by-products are gases). Also R–OH + HCl/anhydrous ZnCl₂, PCl₅, PCl₃. Bromides and iodides: HBr, or red P with Br₂ or I₂." },
      { label: "From alkenes", body: "Addition of HX follows Markovnikov's rule: CH₃CH=CH₂ + HBr → CH₃CHBrCH₃." },
      { label: "Halogen exchange", body: "Finkelstein: R–Cl/R–Br + NaI (dry acetone) → R–I. Swarts: R–Br + AgF (or Hg₂F₂, CoF₂, SbF₃) → R–F." },
      { label: "Haloarenes", body: "Electrophilic substitution: C₆H₆ + Cl₂ (Fe or FeCl₃) → C₆H₅Cl (o- and p- isomers with substituted rings). From diazonium salts: Sandmeyer (Cu₂Cl₂/HCl or Cu₂Br₂/HBr) and Gattermann (Cu powder/HX). Iodobenzene: diazonium salt + KI." },
    ],
  },
  {
    kind: "table",
    title: "Nucleophilic substitution at a glance",
    head: ["", "SN2", "SN1"],
    rows: [
      ["Steps", "One step, no intermediate", "Two steps via a carbocation"],
      ["Rate law", "rate = k[R–X][Nu⁻]", "rate = k[R–X]"],
      ["Reactivity of R–X", "methyl > 1° > 2° > 3°", "3° > 2° > 1° > methyl"],
      ["Reason", "Steric hindrance slows attack", "Stability of the carbocation"],
      ["Favoured by", "High [Nu⁻]", "Polar protic solvents"],
    ],
    note: "Allylic and benzylic halides are reactive by both routes. Tertiary halides prefer elimination with a strong base.",
  },
  {
    kind: "reactions",
    title: "Chemical reactions",
    items: [
      { label: "Substitution", body: "aq. KOH → alcohol. NaOR → ether. KCN → R–CN. AgCN → R–NC (isocyanide). KNO₂ → R–O–N=O. AgNO₂ → R–NO₂. NH₃ (excess, ethanolic) → amine." },
      { label: "Elimination", body: "Alcoholic KOH with heating removes HX. Saytzeff rule: the more substituted alkene is the major product. Example: 2-bromobutane gives but-2-ene (major) and but-1-ene (minor)." },
      { label: "With metals", body: "Mg in dry ether → Grignard reagent R–MgX. Na in dry ether → Wurtz reaction, R–R. Aryl halide + alkyl halide + Na → Wurtz–Fittig, Ar–R. Two aryl halides + Na → Fittig, Ar–Ar." },
      { label: "Haloarenes: nucleophilic substitution", body: "Much less reactive than haloalkanes (resonance, sp² carbon, unstable phenyl cation, repulsion). Chlorobenzene gives phenol only with NaOH at 623 K and 300 atm. Electron-withdrawing groups (–NO₂) at the ortho and para positions make it easier." },
      { label: "Haloarenes: electrophilic substitution", body: "The halogen deactivates the ring but directs to ortho and para positions. Halogenation, nitration, sulphonation and Friedel–Crafts all give o- and p- products, with the para isomer major." },
    ],
  },
  {
    kind: "concepts",
    title: "Polyhalogen compounds",
    items: [
      { label: "Dichloromethane", body: "Solvent and paint remover. Harmful to the central nervous system and skin." },
      { label: "Chloroform", body: "CHCl₃ was used as an anaesthetic. In air and light it oxidises to poisonous phosgene (COCl₂), so it is stored in dark, completely filled bottles with about 1% ethanol." },
      { label: "Iodoform", body: "CHI₃ was used as an antiseptic because of the iodine it liberates." },
      { label: "Tetrachloromethane", body: "CCl₄ is a solvent and was used in fire extinguishers. It harms the liver and contributes to ozone depletion." },
      { label: "Freons and DDT", body: "Freons (chlorofluorocarbons) deplete the ozone layer. DDT is a powerful insecticide but does not break down easily, builds up in fatty tissue and is toxic to fish." },
    ],
  },
  {
    kind: "mistakes",
    title: "Common mistakes",
    items: [
      { body: "Writing the haloalkane as the product of an elimination. Alcoholic KOH gives the alkene; aqueous KOH gives the alcohol." },
      { body: "Mixing up KCN and AgCN. KCN gives R–CN; AgCN gives R–NC." },
      { body: "Forgetting that haloarenes are o- and p-directing even though the halogen deactivates the ring." },
      { body: "Using aqueous conditions for a Grignard reagent or the Wurtz reaction. Both need dry ether." },
      { body: "Calling a Sandmeyer reaction one that uses copper powder. That is the Gattermann reaction." },
    ],
  },
];

const card = (id: string, tag: string, front: string, back: string): ChemCard => ({ id, tag, front, back });

const cards: ChemCard[] = [
  card("ha-c1", "Preparation", "Alcohol → chloroalkane using thionyl chloride", "Reagent: SOCl₂\n\nR–OH + SOCl₂ → R–Cl + SO₂↑ + HCl↑\n\nProduct: haloalkane.\nWhy it is the best method: both by-products are gases, so the product is pure."),
  card("ha-c2", "Preparation", "Markovnikov addition of HBr to propene", "Reagent: HBr\n\nCH₃CH=CH₂ + HBr → CH₃CHBrCH₃\n\nProduct: 2-bromopropane (major).\nThe hydrogen adds to the carbon with more hydrogens."),
  card("ha-c3", "Preparation", "Finkelstein reaction", "Reagent: NaI in dry acetone\n\nR–Cl/R–Br + NaI → R–I + NaCl/NaBr↓\n\nProduct: alkyl iodide.\nObservation: NaCl or NaBr is insoluble in acetone and precipitates, which drives the reaction forward."),
  card("ha-c4", "Preparation", "Swarts reaction", "Reagent: AgF (or Hg₂F₂, CoF₂, SbF₃)\n\nCH₃Br + AgF → CH₃F + AgBr\n\nProduct: alkyl fluoride."),
  card("ha-c5", "Preparation", "Sandmeyer reaction", "Reagent: Cu₂Cl₂/HCl (or Cu₂Br₂/HBr)\n\nC₆H₅N₂⁺Cl⁻ → C₆H₅Cl + N₂\n\nProduct: chlorobenzene (or bromobenzene).\nStarting material: benzene diazonium chloride."),
  card("ha-c6", "Preparation", "Gattermann reaction", "Reagent: Cu powder with HCl or HBr\n\nC₆H₅N₂⁺Cl⁻ → C₆H₅Cl + N₂\n\nSame products as the Sandmeyer reaction, but the catalyst is copper powder. The yield is lower."),
  card("ha-c7", "Preparation", "Iodobenzene from a diazonium salt", "Reagent: KI\n\nC₆H₅N₂⁺Cl⁻ + KI → C₆H₅I + KCl + N₂\n\nNo copper is needed for the iodide."),
  card("ha-c8", "Preparation", "Chlorination of benzene", "Reagent: Cl₂ with Fe or anhydrous FeCl₃, in the dark\n\nC₆H₆ + Cl₂ → C₆H₅Cl + HCl\n\nProduct: chlorobenzene (electrophilic substitution)."),
  card("ha-c9", "Nucleophilic substitution", "SN2 mechanism", "One step: the nucleophile attacks as the leaving group departs.\n\nRate = k[R–X][Nu⁻] (second order)\nReactivity: methyl > primary > secondary > tertiary\nReason: steric hindrance at the carbon."),
  card("ha-c10", "Nucleophilic substitution", "SN1 mechanism", "Two steps: slow ionisation to a carbocation, then fast attack by the nucleophile.\n\nRate = k[R–X] (first order)\nReactivity: tertiary > secondary > primary\nReason: stability of the carbocation. Polar protic solvents favour SN1."),
  card("ha-c11", "Nucleophilic substitution", "KCN versus AgCN with an alkyl halide", "R–X + KCN → R–CN (nitrile)\nR–X + AgCN → R–NC (isocyanide)\n\nCyanide is an ambident nucleophile. KCN is ionic and reacts through carbon. AgCN is largely covalent and reacts through nitrogen."),
  card("ha-c12", "Nucleophilic substitution", "Alkyl halide with sodium alkoxide", "Reagent: R′ONa\n\nR–X + R′ONa → R–O–R′ + NaX\n\nProduct: ether. Works best with a primary alkyl halide."),
  card("ha-c13", "Nucleophilic substitution", "Alkyl halide with AgNO₂ and KNO₂", "R–X + AgNO₂ → R–NO₂ (nitroalkane)\nR–X + KNO₂ → R–O–N=O (alkyl nitrite)\n\nSame idea as KCN/AgCN: the ionic salt reacts through oxygen, the covalent silver salt through nitrogen."),
  card("ha-c14", "Elimination", "Dehydrohalogenation and Saytzeff rule", "Reagent: alcoholic KOH, heat\n\nCH₃CHBrCH₂CH₃ → CH₃CH=CHCH₃ (major) + CH₂=CHCH₂CH₃ (minor)\n\nSaytzeff rule: the more substituted alkene is the major product."),
  card("ha-c15", "Reactions with metals", "Grignard reagent", "Reagent: Mg in dry ether\n\nR–X + Mg → R–MgX\n\nProduct: alkylmagnesium halide.\nIt reacts with water to give the alkane: R–MgX + H₂O → R–H + Mg(OH)X."),
  card("ha-c16", "Reactions with metals", "Wurtz reaction", "Reagent: Na in dry ether\n\n2R–X + 2Na → R–R + 2NaX\n\nProduct: alkane with twice the carbon atoms.\nExample: 2CH₃Br + 2Na → CH₃CH₃ + 2NaBr."),
  card("ha-c17", "Reactions with metals", "Wurtz–Fittig and Fittig reactions", "Wurtz–Fittig: C₆H₅Br + CH₃Br + 2Na (dry ether) → C₆H₅CH₃ + 2NaBr\nFittig: 2C₆H₅Br + 2Na (dry ether) → C₆H₅–C₆H₅ + 2NaBr"),
  card("ha-c18", "Haloarenes", "Chlorobenzene to phenol", "Reagent: NaOH, 623 K, 300 atm, then H⁺\n\nC₆H₅Cl → C₆H₅ONa → C₆H₅OH\n\nHarsh conditions are needed because haloarenes are unreactive towards nucleophilic substitution."),
  card("ha-c19", "Haloarenes", "Why haloarenes resist nucleophilic substitution", "1. The lone pair on halogen is in resonance with the ring, giving the C–X bond partial double-bond character.\n2. The carbon is sp² hybridised, so the C–X bond is shorter and stronger.\n3. The phenyl cation is unstable, so SN1 is ruled out.\n4. The electron-rich ring repels the nucleophile.\n\nA nitro group at the ortho or para position makes substitution easier."),
  card("ha-c20", "Haloarenes", "Nitration of chlorobenzene", "Reagent: conc. HNO₃ with conc. H₂SO₄\n\nProducts: o- and p-nitrochlorobenzene, with the para isomer major.\n\nChlorine is deactivating but ortho/para-directing."),
  card("ha-c21", "Physical properties", "Trends in C–X bond and boiling point", "C–X length: F < Cl < Br < I\nC–X bond enthalpy: F > Cl > Br > I\nBoiling point: RI > RBr > RCl > RF\n\nBranching lowers the boiling point of isomers."),
  card("ha-c22", "Polyhalogen compounds", "Chloroform storage", "In air and light: 2CHCl₃ + O₂ → 2COCl₂ + 2HCl\n\nPhosgene (COCl₂) is very poisonous. Chloroform is therefore kept in dark bottles, filled to the brim, with about 1% ethanol, which turns phosgene into harmless ethyl carbonate."),
  card("ha-c23", "Polyhalogen compounds", "CCl₄, Freons and DDT: effects", "CCl₄: damages the liver and contributes to ozone depletion.\nFreons (CFCs): deplete the ozone layer.\nDDT: persists, accumulates in fatty tissue and is toxic to fish."),
];

const concept: ChemConceptQ[] = [
  { id: "ha-s1", tag: "Haloarenes", level: 2, q: "Why are haloarenes much less reactive than haloalkanes towards nucleophilic substitution? Give one reason.", groups: [["resonance", "partial double bond", "double bond character", "sp2", "sp 2", "phenyl cation", "repels", "repulsion"]],
    model: "Any one of: the lone pair on halogen is in resonance with the ring, giving the C–X bond partial double-bond character; the carbon is sp² hybridised so C–X is shorter and stronger; the phenyl cation is unstable; the electron-rich ring repels the nucleophile.", hint: "Think about the hybridisation of the carbon and about the halogen lone pair." },
  { id: "ha-s2", tag: "Nucleophilic substitution", level: 2, q: "KCN reacts with ethyl bromide to give mainly ethyl cyanide, but AgCN gives mainly ethyl isocyanide. Explain.", groups: [["ionic", "covalent"], ["carbon", "nitrogen", "lone pair"]],
    model: "KCN is ionic and gives free cyanide ions, which attack through the carbon. AgCN is mainly covalent, so the carbon is tied up with silver and the nitrogen lone pair attacks, giving the isocyanide.", hint: "Compare the ionic and covalent character of the two salts." },
  { id: "ha-s3", tag: "Elimination", level: 1, q: "State Saytzeff's rule.", groups: [["more substituted", "most substituted", "highly substituted", "more alkylated", "most alkylated", "greater number of alkyl"], ["alkene"]],
    model: "In dehydrohalogenation, the preferred product is the alkene that has the greater number of alkyl groups on the double-bond carbons, that is, the more substituted alkene.", hint: "It tells you which alkene is the major product when more than one can form." },
  { id: "ha-s4", tag: "Physical properties", level: 2, q: "The para isomer of dichlorobenzene has a higher melting point than the ortho and meta isomers. Why?", groups: [["symmetr"], ["packing", "lattice", "crystal", "fit"]],
    model: "The para isomer is more symmetrical, so it packs better in the crystal lattice and needs more energy to melt.", hint: "Think about the shape of the molecule and how well it packs." },
  { id: "ha-s5", tag: "Polyhalogen compounds", level: 2, q: "Why is chloroform stored in dark, completely filled bottles?", groups: [["phosgene", "cocl2"], ["air", "oxygen", "light", "oxidi"]],
    model: "In the presence of air and light chloroform is slowly oxidised to carbonyl chloride (phosgene), which is very poisonous. Dark, full bottles keep out light and air.", hint: "What poisonous compound forms when chloroform is oxidised?" },
  { id: "ha-s6", tag: "Physical properties", level: 1, q: "Why are haloalkanes only slightly soluble in water?", groups: [["hydrogen bond", "h bond", "h-bond"]],
    model: "They cannot form hydrogen bonds with water. The energy needed to break the hydrogen bonds between water molecules is not repaid by the weaker haloalkane–water attractions.", hint: "Compare the new attractions with the hydrogen bonds in water." },
  { id: "ha-s7", tag: "Preparation", level: 2, q: "Why is thionyl chloride the preferred reagent for converting an alcohol to a chloroalkane?", groups: [["gas", "gaseous", "so2", "hcl", "escape"], ["pure", "no purification", "easily", "by product", "byproduct", "by-product"]],
    model: "The by-products, SO₂ and HCl, are gases that escape, so the haloalkane is obtained pure and no purification is needed.", hint: "Look at the by-products and what state they are in." },
  { id: "ha-s8", tag: "Physical properties", level: 2, q: "Why do haloalkanes have higher boiling points than alkanes of comparable molar mass?", groups: [["dipole"], ["van der waals", "london", "dispersion", "intermolecular", "attraction"]],
    model: "Haloalkane molecules are polar, so they have dipole–dipole attractions as well as van der Waals (dispersion) forces, which are stronger than the forces in alkanes.", hint: "Think about polarity of the C–X bond." },
  { id: "ha-s9", tag: "Nature of C–X bond", level: 2, q: "Why does the C–X bond enthalpy decrease from C–F to C–I?", groups: [["size", "larger", "bigger"], ["overlap", "bond length", "longer", "weaker"]],
    model: "As the halogen gets larger, the C–X bond becomes longer and the orbital overlap with carbon becomes poorer, so the bond is weaker.", hint: "Compare the size of the halogen atoms." },
];

const equations: ChemConceptQ[] = [
  { id: "ha-e1", tag: "Preparation", level: 1, q: "Complete the reaction and write the organic product:\nCH₃CH₂OH + SOCl₂ → ?", groups: [["ch3ch2cl", "c2h5cl", "chloroethane", "ethyl chloride"]], model: "CH₃CH₂Cl (chloroethane), with SO₂ and HCl.", hint: "The OH group is replaced by Cl.", balance: ["CH3CH2OH + SOCl2 -> CH3CH2Cl + SO2 + HCl"] },
  { id: "ha-e2", tag: "Preparation", level: 1, q: "Complete the reaction:\nCH₃CH₂Br + NaI (dry acetone) → ?", groups: [["ch3ch2i", "c2h5i", "iodoethane", "ethyl iodide"]], model: "CH₃CH₂I (iodoethane) + NaBr. This is the Finkelstein reaction.", hint: "Halogen exchange: bromine is replaced by iodine.", balance: ["CH3CH2Br + NaI -> CH3CH2I + NaBr"] },
  { id: "ha-e3", tag: "Elimination", level: 1, q: "Complete the reaction and name the organic product:\nCH₃CH₂Br + alcoholic KOH, heat → ?", groups: [["ch2=ch2", "h2c=ch2", "c2h4", "ethene", "ethylene"]], model: "CH₂=CH₂ (ethene) + KBr + H₂O.", hint: "Alcoholic KOH removes HBr.", balance: ["CH3CH2Br + KOH -> CH2CH2 + KBr + H2O"] },
  { id: "ha-e4", tag: "Preparation", level: 2, q: "Complete the reaction:\nC₆H₅N₂⁺Cl⁻ + KI → ?  (organic product)", groups: [["c6h5i", "iodobenzene"]], model: "C₆H₅I (iodobenzene) + KCl + N₂.", hint: "Nitrogen leaves as N₂ and iodide takes its place.", balance: ["C6H5N2Cl + KI -> C6H5I + KCl + N2"] },
  { id: "ha-e5", tag: "Reactions with metals", level: 2, q: "Complete the reaction:\n2CH₃Br + 2Na (dry ether) → ?  (organic product)", groups: [["ch3ch3", "c2h6", "ethane"]], model: "CH₃CH₃ (ethane) + 2NaBr. This is the Wurtz reaction.", hint: "Two alkyl groups join together.", balance: ["2CH3Br + 2Na -> CH3CH3 + 2NaBr"] },
  { id: "ha-e6", tag: "Reactions with metals", level: 1, q: "Complete the reaction:\nCH₃CH₂Br + Mg (dry ether) → ?", groups: [["ch3ch2mgbr", "c2h5mgbr", "ethylmagnesium bromide", "ethyl magnesium bromide", "grignard"]], model: "CH₃CH₂MgBr (ethylmagnesium bromide), a Grignard reagent.", hint: "Magnesium inserts between carbon and halogen.", balance: ["CH3CH2Br + Mg -> CH3CH2MgBr"] },
  { id: "ha-e7", tag: "Nucleophilic substitution", level: 2, q: "Complete the reaction:\nCH₃CH₂Br + AgCN → ?", groups: [["ch3ch2nc", "c2h5nc", "isocyanide", "isocyanoethane"]], model: "CH₃CH₂NC (ethyl isocyanide) + AgBr.", hint: "AgCN is covalent, so the nitrogen end attacks.", balance: ["CH3CH2Br + AgCN -> CH3CH2NC + AgBr"] },
  { id: "ha-e8", tag: "Preparation", level: 1, q: "Complete the reaction and give the major product:\nCH₃CH=CH₂ + HBr → ?", groups: [["ch3chbrch3", "2 bromopropane", "isopropyl bromide", "isopropylbromide", "2bromopropane"]], model: "CH₃CHBrCH₃ (2-bromopropane), by Markovnikov's rule.", hint: "Hydrogen adds to the carbon that already has more hydrogens.", balance: ["CH3CHCH2 + HBr -> CH3CHBrCH3"] },
  { id: "ha-e9", tag: "Nucleophilic substitution", level: 1, q: "Complete the reaction:\nCH₃CH₂Br + aqueous KOH → ?  (organic product)", groups: [["ch3ch2oh", "c2h5oh", "ethanol", "ethyl alcohol"]], model: "CH₃CH₂OH (ethanol) + KBr.", hint: "Aqueous KOH substitutes; alcoholic KOH eliminates.", balance: ["CH3CH2Br + KOH -> CH3CH2OH + KBr"] },
];

const st = (ask: string, options: string[], answer: number, why: string, hint: string): ChemReactionStage => ({ ask, options, answer, why, hint });
const rx = (id: string, tag: string, level: ChemLevel, title: string, prompt: string, stages: ChemReactionStage[], equation: string, note?: string, balance?: string[]): ChemReactionQ =>
  ({ id, tag, level, title, prompt, stages, equation, ...(note ? { note } : {}), ...(balance ? { balance } : {}) });

const reactions: ChemReactionQ[] = [
  rx("ha-r1", "Preparation", 1, "Alcohol to chloroalkane", "CH₃CH₂OH → CH₃CH₂Cl",
    [st("Which reagent gives the purest product?", ["SOCl₂", "NaCl", "Cl₂, light", "KCl"], 0, "SOCl₂ replaces –OH with –Cl and the by-products SO₂ and HCl escape as gases.", "Look for a reagent whose by-products leave as gases."),
     st("What are the by-products?", ["SO₂ and HCl", "H₂O and NaOH", "H₂ and S", "CO₂ and HCl"], 0, "R–OH + SOCl₂ → R–Cl + SO₂ + HCl.", "S and O from SOCl₂ end up in one gas, Cl and H in another.")],
    "CH₃CH₂OH + SOCl₂ → CH₃CH₂Cl + SO₂↑ + HCl↑", "Other reagents (HCl with ZnCl₂, PCl₅) also work but leave by-products to separate.", ["CH3CH2OH + SOCl2 -> CH3CH2Cl + SO2 + HCl"]),
  rx("ha-r2", "Preparation", 1, "Finkelstein reaction", "CH₃CH₂Br → CH₃CH₂I",
    [st("Which reagent?", ["NaI", "NaF", "NaCl", "KOH"], 0, "Sodium iodide supplies iodide to replace bromide.", "The product has iodine in place of bromine."),
     st("Which solvent?", ["Dry acetone", "Water", "Dry ether", "Ethanol with water"], 0, "NaI dissolves in dry acetone, but NaBr and NaCl do not.", "NaI must dissolve while the other sodium halide does not."),
     st("What drives the reaction forward?", ["NaBr precipitates from acetone", "Iodide is a stronger base than bromide", "A catalyst is present", "Heat is released"], 0, "Removal of insoluble NaBr shifts the equilibrium towards the iodide (Le Chatelier).", "Think about what leaves the solution.")],
    "CH₃CH₂Br + NaI (dry acetone) → CH₃CH₂I + NaBr↓", undefined, ["CH3CH2Br + NaI -> CH3CH2I + NaBr"]),
  rx("ha-r3", "Preparation", 2, "Swarts reaction", "CH₃Br → CH₃F",
    [st("Which reagent converts an alkyl bromide to an alkyl fluoride?", ["AgF", "NaI", "KCl", "AgCl"], 0, "Metallic fluorides such as AgF, Hg₂F₂, CoF₂ or SbF₃ are used in the Swarts reaction.", "You need a source of fluoride, and silver helps pull off the bromide.")],
    "CH₃Br + AgF → CH₃F + AgBr↓", undefined, ["CH3Br + AgF -> CH3F + AgBr"]),
  rx("ha-r4", "Preparation", 2, "Diazonium salt to chlorobenzene", "C₆H₅N₂⁺Cl⁻ → C₆H₅Cl",
    [st("Which reagent set is the Sandmeyer reaction?", ["Cu₂Cl₂ / HCl", "KI", "NaOH, 623 K, 300 atm", "H₃PO₂"], 0, "Cuprous chloride in HCl replaces the diazonium group with –Cl.", "It is a copper(I) salt with the matching halogen acid."),
     st("Which variant uses copper powder instead?", ["Gattermann reaction", "Fittig reaction", "Finkelstein reaction", "Swarts reaction"], 0, "Gattermann uses Cu powder with HCl or HBr and gives the same products.", "It is named after the chemist who replaced Cu₂X₂ with copper powder.")],
    "C₆H₅N₂⁺Cl⁻ + Cu₂Cl₂/HCl → C₆H₅Cl + N₂", "Iodobenzene needs only KI, with no copper."),
  rx("ha-r5", "Reactions with metals", 2, "Elimination with the Saytzeff rule", "2-bromobutane → but-2-ene (major)",
    [st("Which reagent and conditions?", ["Alcoholic KOH, heat", "Aqueous KOH, heat", "NaI, dry acetone", "Mg, dry ether"], 0, "Alcoholic KOH removes HBr to give an alkene. Aqueous KOH would substitute to give an alcohol.", "Elimination needs a strong base in alcohol."),
     st("Why is but-2-ene the major product?", ["Saytzeff rule: the more substituted alkene is more stable", "Markovnikov's rule", "Fittig's rule", "It has fewer carbon atoms"], 0, "But-2-ene has two alkyl groups on the double bond; but-1-ene has only one.", "Which alkene has more alkyl groups on the C=C?")],
    "CH₃CHBrCH₂CH₃ + KOH (alc.) → CH₃CH=CHCH₃ (major) + CH₂=CHCH₂CH₃ (minor) + KBr + H₂O"),
  rx("ha-r6", "Nucleophilic substitution", 2, "Ambident nucleophile", "CH₃CH₂Br → CH₃CH₂NC",
    [st("Which reagent gives the isocyanide?", ["AgCN", "KCN", "NaCN in water", "NH₃"], 0, "AgCN is mainly covalent, so nitrogen attacks. KCN gives the nitrile.", "The covalent salt reacts through nitrogen.")],
    "CH₃CH₂Br + AgCN → CH₃CH₂NC + AgBr", "With KCN the product is CH₃CH₂CN instead.", ["CH3CH2Br + AgCN -> CH3CH2NC + AgBr"]),
  rx("ha-r7", "Haloarenes", 2, "Haloarene to phenol", "C₆H₅Cl → C₆H₅OH",
    [st("Which conditions are needed?", ["NaOH, 623 K, 300 atm, then H⁺", "Aqueous KOH, 300 K", "Alcoholic KOH, heat", "NaI, dry acetone"], 0, "Chlorobenzene is unreactive towards nucleophiles, so very harsh conditions are needed.", "The conditions must be much harsher than for a haloalkane."),
     st("What first forms before acidification?", ["Sodium phenoxide, C₆H₅ONa", "Phenol directly", "Benzene", "Chlorohexane"], 0, "NaOH gives sodium phenoxide, and H⁺ then liberates phenol.", "The base reacts with the phenol formed.")],
    "C₆H₅Cl + NaOH (623 K, 300 atm) → C₆H₅ONa →(H⁺) C₆H₅OH"),
  rx("ha-r8", "Reactions with metals", 3, "Two-step conversion: benzene to toluene", "C₆H₆ → C₆H₅Br → C₆H₅CH₃",
    [st("Step 1: how is bromobenzene made?", ["Br₂ with Fe or FeBr₃", "HBr", "NaBr", "Br₂, light"], 0, "Electrophilic substitution needs a Lewis acid catalyst such as FeBr₃.", "It is an electrophilic substitution on the ring."),
     st("Step 2: which reagents convert C₆H₅Br to toluene?", ["CH₃Br and Na in dry ether", "CH₃OH and H⁺", "Mg then H₂O", "KCN"], 0, "This is the Wurtz–Fittig reaction: aryl halide + alkyl halide + sodium.", "An aryl halide and an alkyl halide are joined by sodium.")],
    "C₆H₆ + Br₂ (FeBr₃) → C₆H₅Br\nC₆H₅Br + CH₃Br + 2Na (dry ether) → C₆H₅CH₃ + 2NaBr"),
];

const questions: ChemQuestion[] = [
  q("ha-m1", "Nature of C–X bond", 1, "Which has the highest C–X bond enthalpy?", ["CH₃–F", "CH₃–Cl", "CH₃–Br", "CH₃–I"], 0, "C–F is the shortest and strongest C–X bond (452 kJ mol⁻¹).", "The smallest halogen forms the strongest bond."),
  q("ha-m2", "Physical properties", 1, "Which has the highest boiling point?", ["CH₃CH₂I", "CH₃CH₂Br", "CH₃CH₂Cl", "CH₃CH₂F"], 0, "For the same alkyl group the boiling point rises with the size and mass of the halogen.", "Larger halogen, stronger van der Waals forces."),
  q("ha-m3", "Classification", 1, "Chlorobenzene is an example of:", ["an aryl halide", "a benzylic halide", "an allylic halide", "an alkyl halide"], 0, "The chlorine is attached directly to an sp² carbon of the benzene ring.", "Is the halogen on the ring itself or on a carbon next to it?"),
  q("ha-m4", "Nucleophilic substitution", 2, "Which of these reacts fastest by the SN1 mechanism?", ["(CH₃)₃C–Br", "(CH₃)₂CH–Br", "CH₃CH₂Br", "CH₃Br"], 0, "SN1 rate depends on carbocation stability, and the tertiary carbocation is the most stable.", "SN1 goes through a carbocation."),
  q("ha-m5", "Nucleophilic substitution", 2, "Which of these reacts fastest by the SN2 mechanism?", ["CH₃Br", "CH₃CH₂Br", "(CH₃)₂CHBr", "(CH₃)₃CBr"], 0, "SN2 is hindered by bulky groups, so methyl > primary > secondary > tertiary.", "The nucleophile must reach the carbon."),
  q("ha-m6", "Elimination", 2, "CH₃CH₂Br heated with alcoholic KOH gives mainly:", ["ethene", "ethanol", "ethane", "ethyne"], 0, "Alcoholic KOH brings about dehydrohalogenation, giving CH₂=CH₂.", "Alcoholic, not aqueous, KOH."),
  q("ha-m7", "Preparation", 2, "The conversion of an alkyl chloride into an alkyl iodide using NaI in dry acetone is called:", ["the Finkelstein reaction", "the Swarts reaction", "the Sandmeyer reaction", "the Gattermann reaction"], 0, "Finkelstein: halogen exchange with NaI in dry acetone.", "Which named reaction uses NaI?", { balance: ["CH3CH2Cl + NaI -> CH3CH2I + NaCl"] }),
  q("ha-m8", "Preparation", 2, "Which reagent is used to prepare an alkyl fluoride from an alkyl bromide?", ["AgF", "NaI", "KCl", "AgCl"], 0, "AgF (or Hg₂F₂, CoF₂, SbF₃) is used in the Swarts reaction.", "You need fluoride."),
  q("ha-m9", "Haloarenes", 2, "Benzene reacts with Cl₂ in the presence of Fe (dark). The main product is:", ["chlorobenzene", "hexachlorocyclohexane", "1,2-dichlorobenzene only", "benzyl chloride"], 0, "Fe/FeCl₃ catalyses electrophilic substitution, giving chlorobenzene. Addition to hexachlorocyclohexane needs sunlight.", "Catalyst and dark mean substitution."),
  q("ha-m10", "Haloarenes", 2, "Nitration of chlorobenzene gives mainly:", ["ortho and para products, with para major", "the meta product", "only the ortho product", "2,4,6-trinitrochlorobenzene"], 0, "Chlorine deactivates the ring but is ortho/para-directing, and the para isomer is favoured sterically.", "What kind of director is a halogen?"),
  q("ha-m11", "Polyhalogen compounds", 1, "Chloroform exposed to air and light slowly forms:", ["phosgene (COCl₂)", "carbon tetrachloride", "methane", "formaldehyde"], 0, "2CHCl₃ + O₂ → 2COCl₂ + 2HCl, which is why it is kept in dark bottles.", "It is a very poisonous carbonyl compound."),
  q("ha-m12", "Haloarenes", 3, "Which is least reactive towards aqueous NaOH under mild conditions?", ["chlorobenzene", "benzyl chloride", "ethyl chloride", "tert-butyl chloride"], 0, "Chlorobenzene has an sp² C–Cl bond with partial double-bond character, so it resists nucleophilic substitution.", "Which one has the halogen on the ring?"),
  q("ha-m13", "Polyhalogen compounds", 1, "Freons are harmful because they:", ["deplete the ozone layer", "cause acid rain", "cause global cooling", "make water hard"], 0, "Chlorofluorocarbons release chlorine atoms in the stratosphere, which break down ozone.", "Think about the stratosphere."),
  q("ha-m14", "Nucleophilic substitution", 3, "CH₃CH₂Br reacts with AgCN to give mainly:", ["CH₃CH₂NC", "CH₃CH₂CN", "CH₃CH₂OH", "CH₃CH₂NH₂"], 0, "AgCN is covalent, so the nitrogen end of the cyanide attacks, giving the isocyanide.", "Covalent salt, attack through nitrogen."),
];

const challenge: ChemQuestion[] = [
  ar("ha-a1", 2, "Haloalkanes are only slightly soluble in water.", "Haloalkanes cannot form hydrogen bonds with water.", 0, "Dissolving needs energy to break hydrogen bonds in water, and the weaker haloalkane–water attractions cannot repay it.", "Think about water–water hydrogen bonds."),
  ar("ha-a2", 3, "KCN gives mainly alkyl cyanides with alkyl halides, whereas AgCN gives mainly isocyanides.", "KCN is largely ionic and attacks through carbon, whereas AgCN is largely covalent and attacks through nitrogen.", 0, "The reason correctly accounts for the different site of attack.", "Compare ionic and covalent character."),
  ar("ha-a3", 2, "Chlorobenzene is less reactive than ethyl chloride towards nucleophilic substitution.", "The C–Cl bond in chlorobenzene has partial double-bond character because of resonance, and its carbon is sp² hybridised.", 0, "Both effects shorten and strengthen the C–Cl bond.", "Think about resonance and hybridisation."),
  ar("ha-a4", 3, "Tertiary alkyl halides prefer the SN1 mechanism to SN2.", "Tertiary carbocations are stable and the tertiary carbon is crowded, which hinders attack by a nucleophile.", 0, "Both parts of the reason favour SN1 over SN2.", "SN1 goes through a carbocation; SN2 needs access to the carbon."),
  ar("ha-a5", 3, "Nitration of chlorobenzene gives mainly the meta isomer.", "Chlorine is a deactivating group.", 3, "Chlorine is deactivating, so R is true, but it is still ortho/para-directing, so A is false.", "Deactivating does not always mean meta-directing."),
  q("ha-a6", "Elimination", 3, "2-Bromo-2-methylbutane is heated with alcoholic KOH. The major product is:", ["2-methylbut-2-ene", "2-methylbut-1-ene", "3-methylbut-1-ene", "2-methylbutan-2-ol"], 0, "By Saytzeff's rule the more substituted alkene forms. 2-Methylbut-2-ene has three alkyl groups on the double bond.", "Count the alkyl groups on the C=C in each alkene.", { challenge: true }),
  q("ha-a7", "Reactions with metals", 3, "Which pair, heated with sodium in dry ether, gives ethylbenzene?", ["C₆H₅Br and CH₃CH₂Br", "C₆H₅Br and CH₃Br", "C₆H₅Br only", "CH₃CH₂Br only"], 0, "Wurtz–Fittig joins an aryl halide and an alkyl halide: C₆H₅Br + C₂H₅Br + 2Na → C₆H₅C₂H₅ + 2NaBr.", "You need a phenyl group and an ethyl group.", { challenge: true }),
];

const predict: ChemQuestion[] = [
  q("ha-p1", "Preparation", 1, "Identify the product: CH₃CH₂CH₂OH + SOCl₂ →", ["1-chloropropane", "2-chloropropane", "propene", "propanal"], 0, "SOCl₂ replaces the OH group by Cl without rearranging the chain.", "The OH is replaced by Cl at the same carbon.", { steps: ["The alcohol is primary and the OH is on carbon 1.", "SOCl₂ converts R–OH into R–Cl with SO₂ and HCl as gases.", "Product: CH₃CH₂CH₂Cl, 1-chloropropane."], balance: ["CH3CH2CH2OH + SOCl2 -> CH3CH2CH2Cl + SO2 + HCl"] }),
  q("ha-p2", "Nucleophilic substitution", 1, "Identify the product: CH₃CH₂CH₂Br + KCN →", ["CH₃CH₂CH₂CN", "CH₃CH₂CH₂NC", "CH₃CH₂CH₂OH", "CH₃CH=CH₂"], 0, "KCN is ionic and reacts through carbon, so the nitrile forms (butanenitrile).", "KCN versus AgCN.", { steps: ["KCN is ionic, so CN⁻ attacks through carbon.", "Br is replaced by CN.", "Product: CH₃CH₂CH₂CN, butanenitrile."], balance: ["CH3CH2CH2Br + KCN -> CH3CH2CH2CN + KBr"] }),
  q("ha-p3", "Elimination", 2, "Identify the product: (CH₃)₂CHBr + alcoholic KOH, heat →", ["propene", "propan-2-ol", "propane", "2-bromopropane"], 0, "Alcoholic KOH eliminates HBr, giving CH₃CH=CH₂.", "Alcoholic KOH gives an alkene.", { steps: ["Alcoholic KOH is a strong base in alcohol, which favours elimination.", "HBr is removed from adjacent carbons.", "Product: CH₃CH=CH₂, propene."], balance: ["CH3CHBrCH3 + KOH -> CH3CHCH2 + KBr + H2O"] }),
  q("ha-p4", "Reactions with metals", 2, "Identify the product: C₆H₅Br + CH₃Br + 2Na (dry ether) →", ["toluene (methylbenzene)", "biphenyl", "ethane", "benzyl bromide"], 0, "Wurtz–Fittig joins the aryl and alkyl groups.", "An aryl halide and an alkyl halide with sodium.", { steps: ["Sodium removes both halogens as NaBr.", "The phenyl and methyl groups join.", "Product: C₆H₅CH₃, toluene."], balance: ["C6H5Br + CH3Br + 2Na -> C6H5CH3 + 2NaBr"] }),
  q("ha-p5", "Nucleophilic substitution", 2, "Identify the product: CH₃CH₂Br + AgNO₂ →", ["nitroethane", "ethyl nitrite", "ethanol", "ethylamine"], 0, "AgNO₂ is covalent, so nitrogen attacks and the nitroalkane forms. KNO₂ would give the nitrite.", "Covalent silver salt, attack through nitrogen.", { steps: ["AgNO₂ is largely covalent.", "The lone pair on nitrogen attacks the carbon.", "Product: CH₃CH₂NO₂, nitroethane."], balance: ["CH3CH2Br + AgNO2 -> CH3CH2NO2 + AgBr"] }),
  q("ha-p6", "Preparation", 2, "Identify the product: C₆H₅N₂⁺Cl⁻ + Cu₂Br₂/HBr →", ["bromobenzene", "chlorobenzene", "phenol", "iodobenzene"], 0, "In the Sandmeyer reaction the diazonium group is replaced by the halogen of the copper salt.", "Match the halogen in the copper(I) salt.", { steps: ["Cu₂Br₂/HBr supplies bromide.", "N₂ leaves and Br takes its place.", "Product: C₆H₅Br."] }),
  q("ha-p7", "Nucleophilic substitution", 2, "Identify the product: CH₃CH₂Br + C₂H₅ONa →", ["ethoxyethane (diethyl ether)", "ethanol", "butane", "ethene"], 0, "The ethoxide ion substitutes the bromide, giving an ether.", "Alkoxide plus alkyl halide.", { steps: ["C₂H₅O⁻ is the nucleophile.", "It displaces Br⁻.", "Product: CH₃CH₂–O–CH₂CH₃."], balance: ["CH3CH2Br + C2H5ONa -> C2H5OC2H5 + NaBr"] }),
  q("ha-p8", "Reactions with metals", 1, "Identify the product: CH₃CHBrCH₃ + Mg (dry ether) →", ["(CH₃)₂CHMgBr", "CH₃CH₂CH₂MgBr", "CH₃CH=CH₂", "(CH₃)₂CHOH"], 0, "Magnesium inserts between C and Br to give the Grignard reagent.", "Mg inserts into the C–Br bond.", { steps: ["Dry ether is used so the Grignard reagent survives.", "Mg inserts into the C–Br bond of 2-bromopropane.", "Product: (CH₃)₂CH–MgBr."], balance: ["CH3CHBrCH3 + Mg -> CH3CH(MgBr)CH3"] }),
  q("ha-p9", "Preparation", 1, "Identify the major product: CH₃CH=CH₂ + HCl →", ["2-chloropropane", "1-chloropropane", "propane", "propan-1-ol"], 0, "Markovnikov's rule: hydrogen adds to the carbon with more hydrogens, so chlorine goes to the middle carbon.", "Hydrogen goes to the carbon that already has more hydrogens.", { steps: ["The alkene is unsymmetrical.", "H adds to CH₂ (more hydrogens); Cl adds to CH.", "Product: CH₃CHClCH₃."], balance: ["CH3CHCH2 + HCl -> CH3CHClCH3"] }),
  q("ha-p10", "Preparation", 1, "Identify the product: CH₃CH₂CH₂Cl + NaI (dry acetone) →", ["1-iodopropane", "2-iodopropane", "propene", "propan-1-ol"], 0, "Finkelstein: Cl is replaced by I at the same carbon.", "Halogen exchange.", { steps: ["NaI in dry acetone exchanges the halogen.", "NaCl precipitates.", "Product: CH₃CH₂CH₂I."], balance: ["CH3CH2CH2Cl + NaI -> CH3CH2CH2I + NaCl"] }),
];

export const content: ChemChapterContent = { sections, questions, cards, challenge, concept, equations, reactions, predict };
