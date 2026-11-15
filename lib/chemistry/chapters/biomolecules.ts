import type { ChemCard, ChemChapterContent, ChemConceptQ, ChemLevel, ChemQuestion, ChemReactionQ, ChemReactionStage, ChemSection } from "../types";

/**
 * Chapter 10 · Biomolecules (CBSE 2026-27, 7 marks).
 * Syllabus scope (official list): carbohydrates, proteins, enzymes, vitamins, nucleic acids, hormones.
 * Note on hormones: the syllabus lists them, but some textbook summaries say the 2026-27 NCERT trimmed the detail. Hormone content here
 * is therefore limited to basic ideas (definition, three classes, a few examples and functions).
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
    title: "Carbohydrates: classification and glucose",
    items: [
      { label: "Classification", body: "Monosaccharides cannot be hydrolysed further (glucose, fructose). Oligosaccharides give 2–10 monosaccharide units (disaccharides such as sucrose). Polysaccharides give many (starch, cellulose, glycogen). Reducing sugars have a free aldehyde or ketone group and reduce Tollens' and Fehling's reagents; non-reducing sugars do not." },
      { label: "Glucose", body: "C₆H₁₂O₆, an aldohexose, D-(+)-glucose. Open chain: CH₂OH–(CHOH)₄–CHO. Evidence: HI gives n-hexane (six carbons in a straight chain); NH₂OH and HCN react (carbonyl group); Br₂ water gives gluconic acid (the carbonyl is an aldehyde); HNO₃ gives saccharic acid (a primary –OH is present); acetic anhydride gives a pentaacetate (five –OH groups)." },
      { label: "Cyclic structure", body: "Glucose does not give Schiff's test or add NaHSO₃ because it exists mainly as a cyclic hemiacetal (pyranose) with the C-1 –OH. The two forms, α and β, differ at C-1 and are called anomers; they interconvert in solution (mutarotation)." },
      { label: "Fructose and D/L", body: "Fructose is a ketohexose, laevorotatory, with a five-membered (furanose) ring. D and L describe configuration (–OH on the right or left at the last stereocentre, compared with glyceraldehyde), while (+) and (−) describe the direction of optical rotation, and they are unrelated." },
    ],
  },
  {
    kind: "table",
    title: "Di- and polysaccharides",
    head: ["Carbohydrate", "Units and linkage", "Reducing?"],
    rows: [
      ["Sucrose", "α-D-glucose + β-D-fructose, C1–C2 glycosidic link", "No"],
      ["Maltose", "two α-D-glucose, C1–C4 link", "Yes"],
      ["Lactose", "β-D-galactose + β-D-glucose, C1–C4 link", "Yes"],
      ["Starch: amylose", "α-D-glucose, unbranched C1–C4 (15–20%)", "No"],
      ["Starch: amylopectin", "α-D-glucose, branched with C1–C6 links (80–85%)", "No"],
      ["Cellulose", "β-D-glucose, unbranched C1–C4", "No"],
      ["Glycogen", "α-D-glucose, highly branched (animal starch)", "No"],
    ],
    note: "Hydrolysing sucrose (dextrorotatory, +66.5°) gives glucose (+52.5°) and fructose (−92.4°). The mixture is laevorotatory and is called invert sugar.",
  },
  {
    kind: "concepts",
    title: "Proteins and enzymes",
    items: [
      { label: "Amino acids", body: "H₂N–CHR–COOH. There are 20 common α-amino acids. Essential amino acids cannot be made by the body and must come from the diet; non-essential ones can be made. In water an amino acid is a zwitterion, ⁺H₃N–CHR–COO⁻, and is amphoteric." },
      { label: "Peptide bond", body: "The –CO–NH– link formed by loss of water between the –COOH of one amino acid and the –NH₂ of another. A chain with many units is a polypeptide or protein." },
      { label: "Structure of proteins", body: "Primary: sequence of amino acids. Secondary: α-helix (intramolecular hydrogen bonds) or β-pleated sheet (intermolecular hydrogen bonds). Tertiary: overall folding into a 3D shape. Quaternary: arrangement of several polypeptide subunits. Fibrous proteins (keratin, myosin) are insoluble; globular proteins (insulin, albumin) are soluble." },
      { label: "Denaturation", body: "Loss of the secondary and tertiary structure (and so of biological activity) by heat, pH change or chemicals, with the primary structure intact. Example: egg white coagulates on boiling." },
      { label: "Enzymes", body: "Biological catalysts, mostly globular proteins, very specific, with names ending in –ase. The substrate binds to the active site: E + S → ES complex → E + P. They work best at an optimum temperature and pH. Examples: invertase (sucrose → glucose + fructose), zymase (glucose → ethanol + CO₂), urease (urea → NH₃ + CO₂)." },
    ],
  },
  {
    kind: "table",
    title: "Vitamins and deficiency diseases",
    head: ["Vitamin", "Type", "Deficiency disease"],
    rows: [
      ["A", "Fat-soluble", "Xerophthalmia, night blindness"],
      ["B₁ (thiamine)", "Water-soluble", "Beri-beri"],
      ["B₂ (riboflavin)", "Water-soluble", "Cheilosis, skin and digestive disorders"],
      ["B₆ (pyridoxine)", "Water-soluble", "Convulsions"],
      ["B₁₂", "Water-soluble", "Pernicious anaemia"],
      ["C (ascorbic acid)", "Water-soluble", "Scurvy"],
      ["D", "Fat-soluble", "Rickets (children), osteomalacia (adults)"],
      ["E", "Fat-soluble", "Fragile red blood cells, muscular weakness"],
      ["K", "Fat-soluble", "Increased blood-clotting time"],
    ],
    note: "Fat-soluble vitamins (A, D, E, K) are stored in the liver and fat, so they are not needed daily. Water-soluble vitamins (B complex and C) are excreted in urine and must be supplied regularly (B₁₂ is an exception: it is stored in the liver).",
  },
  {
    kind: "concepts",
    title: "Nucleic acids and hormones",
    items: [
      { label: "Composition", body: "A nucleotide is a phosphate group, a pentose sugar and a nitrogenous base. A nucleoside is the sugar plus the base. DNA has 2-deoxyribose and the bases A, G, C and T. RNA has ribose and the bases A, G, C and U (uracil replaces thymine)." },
      { label: "DNA structure", body: "Nucleotides are joined by phosphodiester links to form a polynucleotide chain. DNA is a double helix of two complementary strands held by hydrogen bonds: A pairs with T by two bonds and G pairs with C by three." },
      { label: "RNA", body: "Usually single-stranded. Three types: messenger RNA (mRNA), ribosomal RNA (rRNA) and transfer RNA (tRNA), all involved in protein synthesis." },
      { label: "Functions", body: "DNA stores and passes on hereditary information, and replicates. A triplet of bases (codon) codes for one amino acid. RNA carries out protein synthesis." },
      { label: "Hormones (basic ideas)", body: "Chemical messengers made by endocrine glands in small amounts and carried by the blood to target tissues. Three classes: steroid hormones (testosterone, oestradiol, cortisol), polypeptide hormones (insulin, glucagon) and amino-acid derivatives (thyroxine, adrenaline). Insulin lowers blood glucose, glucagon raises it, thyroxine regulates metabolism (iodine deficiency causes goitre) and adrenaline prepares the body for fight or flight." },
    ],
  },
  {
    kind: "mistakes",
    title: "Common mistakes",
    items: [
      { body: "Calling sucrose a reducing sugar. Both its anomeric carbons are tied up in the glycosidic bond." },
      { body: "Confusing D/L with (+)/(−). D-fructose is laevorotatory." },
      { body: "Saying denaturation breaks peptide bonds. It disrupts secondary and tertiary structure only." },
      { body: "Mixing up DNA and RNA: thymine and deoxyribose are in DNA; uracil and ribose are in RNA." },
      { body: "Putting vitamin C with the fat-soluble vitamins. Only A, D, E and K are fat-soluble." },
    ],
  },
];

const card = (id: string, tag: string, front: string, back: string): ChemCard => ({ id, tag, front, back });

const cards: ChemCard[] = [
  card("bm-c1", "Carbohydrates", "Classification of carbohydrates", "Monosaccharides: no hydrolysis (glucose, fructose)\nOligosaccharides: 2–10 units (sucrose, maltose, lactose)\nPolysaccharides: many units (starch, cellulose, glycogen)"),
  card("bm-c2", "Carbohydrates", "Reducing and non-reducing sugars", "Reducing: free aldehyde or ketone (hemiacetal) group; reduce Tollens' and Fehling's reagents. Glucose, fructose, maltose, lactose.\nNon-reducing: sucrose, starch, cellulose (anomeric carbons are in glycosidic bonds)."),
  card("bm-c3", "Glucose", "Evidence for the open-chain structure of glucose", "HI, heat → n-hexane: six carbons in a straight chain\nNH₂OH → oxime; HCN → cyanohydrin: a carbonyl group\nBr₂ water → gluconic acid: the carbonyl is an aldehyde\nHNO₃ → saccharic acid: a primary –OH is present\n(CH₃CO)₂O → pentaacetate: five –OH groups"),
  card("bm-c4", "Glucose", "Cyclic structure and anomers", "Glucose exists mainly as a six-membered cyclic hemiacetal (pyranose).\nα and β forms differ at C-1 and are called anomers.\nThey interconvert in solution: mutarotation.\nThe ring explains why glucose gives no Schiff's test and does not add NaHSO₃."),
  card("bm-c5", "Glucose", "Glucose with Br₂ water and with HNO₃", "Br₂ water: C₆H₁₂O₆ + Br₂ + H₂O → C₆H₁₂O₇ (gluconic acid) + 2HBr\nConc. HNO₃: oxidises both ends to the dicarboxylic saccharic acid, C₆H₁₀O₈."),
  card("bm-c6", "Glucose", "Glucose with HI and with acetic anhydride", "HI (heat): C₆H₁₂O₆ → CH₃(CH₂)₄CH₃ (n-hexane)\n(CH₃CO)₂O: glucose pentaacetate (five –OH groups acetylated)"),
  card("bm-c7", "Fructose and D/L", "Fructose and D/L notation", "Fructose: ketohexose, laevorotatory (−92.4°), five-membered furanose ring.\nD/L: configuration relative to glyceraldehyde.\n(+)/(−): direction of rotation. They are independent: D-fructose is (−)."),
  card("bm-c8", "Disaccharides", "Sucrose", "α-D-glucose (C1) joined to β-D-fructose (C2).\nNon-reducing, dextrorotatory (+66.5°).\nHydrolysis gives glucose (+52.5°) + fructose (−92.4°): invert sugar (laevorotatory)."),
  card("bm-c9", "Disaccharides", "Maltose and lactose", "Maltose: two α-D-glucose, C1–C4 link; reducing; from starch.\nLactose: β-D-galactose + β-D-glucose, C1–C4 link; reducing; milk sugar."),
  card("bm-c10", "Polysaccharides", "Starch", "Mixture of amylose (15–20%, unbranched, water-soluble, α-D-glucose C1–C4) and amylopectin (80–85%, branched with C1–C6 links, insoluble).\nStorage carbohydrate in plants."),
  card("bm-c11", "Polysaccharides", "Cellulose and glycogen", "Cellulose: β-D-glucose, unbranched C1–C4; structural material in plants.\nGlycogen: animal starch; highly branched α-D-glucose; stored in liver and muscle."),
  card("bm-c12", "Proteins", "Amino acids and zwitterions", "H₂N–CHR–COOH: 20 α-amino acids.\nIn water: zwitterion ⁺H₃N–CHR–COO⁻ (amphoteric).\nEssential amino acids cannot be made by the body and must come from the diet."),
  card("bm-c13", "Proteins", "Peptide bond", "–CO–NH– link between the –COOH of one amino acid and the –NH₂ of the next, with loss of H₂O.\n\n2H₂NCH₂COOH → H₂NCH₂CONHCH₂COOH + H₂O"),
  card("bm-c14", "Proteins", "Primary and secondary structure", "Primary: sequence of amino acids.\nSecondary: α-helix (intramolecular hydrogen bonds) or β-pleated sheet (intermolecular hydrogen bonds)."),
  card("bm-c15", "Proteins", "Tertiary and quaternary structure", "Tertiary: overall 3D folding (hydrogen bonds, disulphide bridges, van der Waals, electrostatic forces).\nQuaternary: arrangement of several subunits (haemoglobin has four)."),
  card("bm-c16", "Proteins", "Fibrous and globular proteins", "Fibrous: thread-like, insoluble in water (keratin, myosin).\nGlobular: roughly spherical, soluble in water (insulin, albumin)."),
  card("bm-c17", "Proteins", "Denaturation", "Loss of secondary and tertiary structure (and activity) by heat, pH change or chemicals; the primary structure is intact.\nExample: coagulation of egg white on boiling; curdling of milk."),
  card("bm-c18", "Enzymes", "Enzymes: properties", "Biological catalysts (mostly globular proteins), highly specific, names end in –ase.\nWork at optimum temperature (about 298–310 K) and pH.\nE + S → ES → E + P at the active site."),
  card("bm-c19", "Enzymes", "Examples of enzymes", "Invertase: sucrose → glucose + fructose\nZymase: glucose → ethanol + CO₂\nMaltase: maltose → glucose\nUrease: urea → NH₃ + CO₂\nPepsin: digests proteins in the stomach"),
  card("bm-c20", "Vitamins", "Fat-soluble and water-soluble vitamins", "Fat-soluble: A, D, E, K; stored in liver and fat, not needed daily.\nWater-soluble: B complex and C; excreted in urine, needed regularly (B₁₂ is stored in the liver)."),
  card("bm-c21", "Vitamins", "Deficiency diseases", "A: xerophthalmia, night blindness\nB₁: beri-beri; B₂: cheilosis; B₆: convulsions; B₁₂: pernicious anaemia\nC: scurvy\nD: rickets (children), osteomalacia (adults)\nE: fragile red cells, muscle weakness\nK: increased clotting time"),
  card("bm-c22", "Nucleic acids", "Nucleotide and nucleoside", "Nucleoside = sugar + nitrogenous base.\nNucleotide = nucleoside + phosphate.\nNucleotides are joined by phosphodiester links."),
  card("bm-c23", "Nucleic acids", "DNA versus RNA", "DNA: 2-deoxyribose, bases A, G, C, T, double helix.\nRNA: ribose, bases A, G, C, U, usually single strand.\nRNA types: mRNA, rRNA, tRNA."),
  card("bm-c24", "Nucleic acids", "Base pairing in DNA", "A pairs with T (two hydrogen bonds).\nG pairs with C (three hydrogen bonds).\nThe two strands are complementary: A–T–G–C pairs with T–A–C–G."),
  card("bm-c25", "Nucleic acids", "Functions of DNA and RNA", "DNA: stores hereditary information; replication.\nRNA: protein synthesis. A codon (three bases) codes for one amino acid."),
  card("bm-c26", "Hormones", "Hormones: basic ideas", "Chemical messengers made by endocrine glands, carried by blood to target tissues in small amounts.\nClasses: steroid (testosterone, oestradiol), polypeptide (insulin, glucagon), amino-acid derivatives (thyroxine, adrenaline).\nInsulin lowers blood glucose; iodine deficiency causes goitre."),
];

const concept: ChemConceptQ[] = [
  { id: "bm-s1", tag: "Carbohydrates", level: 2, q: "What are reducing sugars? Name one reducing and one non-reducing sugar.", groups: [["free aldehyde", "free ketone", "aldehyde", "ketone", "hemiacetal", "carbonyl"], ["tollens", "fehling", "reduce", "reducing"]],
    model: "Reducing sugars have a free aldehyde or ketone (hemiacetal) group and reduce Tollens' reagent and Fehling's solution. Glucose is reducing; sucrose is non-reducing.", hint: "Which functional group lets a sugar act as a reducing agent?" },
  { id: "bm-s2", tag: "Carbohydrates", level: 2, q: "Why is sucrose a non-reducing sugar?", groups: [["glycosidic", "linkage", "bond"], ["free", "aldehyde", "ketone", "anomeric", "carbonyl", "reducing group"]],
    model: "In sucrose the C-1 of glucose and C-2 of fructose, which carry the potential aldehyde and ketone groups, are joined in the glycosidic bond, so there is no free aldehyde or ketone group.", hint: "Which groups are used up in the glycosidic link?" },
  { id: "bm-s3", tag: "Carbohydrates", level: 2, q: "What is invert sugar?", groups: [["sucrose"], ["laevorotatory", "levorotatory", "laevo", "levo", "negative", "left"]],
    model: "Invert sugar is the equimolar mixture of glucose and fructose obtained by hydrolysing sucrose. It is laevorotatory because fructose (−92.4°) outweighs glucose (+52.5°), whereas sucrose itself is dextrorotatory.", hint: "The sign of rotation changes on hydrolysis." },
  { id: "bm-s4", tag: "Glucose", level: 3, q: "Glucose has an aldehyde group but does not give Schiff's test. Why?", groups: [["cyclic", "ring", "hemiacetal", "pyranose"]],
    model: "Glucose exists mainly in the cyclic hemiacetal form, so the free –CHO group is present in only a very small amount in equilibrium and does not respond to Schiff's test.", hint: "Think about the ring form of glucose." },
  { id: "bm-s5", tag: "Polysaccharides", level: 2, q: "Distinguish amylose from amylopectin.", groups: [["linear", "unbranched", "straight", "no branch"], ["branched", "branching"]],
    model: "Amylose is an unbranched (linear) chain of α-D-glucose joined by C1–C4 links and is water-soluble. Amylopectin is a branched chain with C1–C6 links at the branch points and is insoluble in water.", hint: "One is a straight chain and the other has branches." },
  { id: "bm-s6", tag: "Proteins", level: 2, q: "What is a zwitterion?", groups: [["positive"], ["negative"], ["amino acid", "same molecule", "dipolar", "both"]],
    model: "In aqueous solution an amino acid exists as a dipolar ion, ⁺H₃N–CHR–COO⁻, with both a positive and a negative charge in the same molecule.", hint: "The –COOH gives up H⁺ and the –NH₂ accepts it." },
  { id: "bm-s7", tag: "Proteins", level: 2, q: "What is denaturation of a protein? Give an example.", groups: [["secondary", "tertiary", "three dimensional", "3d", "3 d", "native", "structure"], ["heat", "ph", "temperature", "boil", "egg", "curd", "coagul"]],
    model: "Denaturation is the loss of the secondary and tertiary structure (and hence biological activity) of a protein, caused by heat, a change in pH or chemicals, while the primary structure stays intact. Example: coagulation of egg white on boiling.", hint: "Which levels of protein structure are disrupted?" },
  { id: "bm-s8", tag: "Enzymes", level: 2, q: "Why are enzymes highly specific?", groups: [["active site", "lock", "shape", "complementary", "fit"]],
    model: "The active site of an enzyme has a shape and chemical character that fits only a particular substrate, like a lock and key.", hint: "Think about the active site." },
  { id: "bm-s9", tag: "Nucleic acids", level: 2, q: "State two differences between DNA and RNA in their composition.", groups: [["deoxyribose", "2 deoxyribose"], ["uracil", "thymine"]],
    model: "DNA contains 2-deoxyribose and the base thymine; RNA contains ribose and the base uracil in place of thymine.", hint: "One difference is in the sugar and one in a base." },
  { id: "bm-s10", tag: "Nucleic acids", level: 2, q: "In DNA, which bases pair with each other and how many hydrogen bonds does each pair have?", groups: [["a t", "t a", "a with t", "a pairs with t", "a pair with t", "a and t", "a binds t", "t with a", "adenine thymine", "adenine with thymine", "adenine and thymine", "adenine pairs with thymine", "adenine pair with thymine", "thymine with adenine"], ["g c", "c g", "g with c", "g pairs with c", "g pair with c", "g and c", "g binds c", "c with g", "guanine cytosine", "guanine with cytosine", "guanine and cytosine", "guanine pairs with cytosine", "guanine pair with cytosine", "cytosine with guanine"], ["two", "2"], ["three", "3"]],
    model: "Adenine pairs with thymine by two hydrogen bonds, and guanine pairs with cytosine by three hydrogen bonds.", hint: "A with one, G with another; one pair has more bonds." },
  { id: "bm-s11", tag: "Vitamins", level: 1, q: "Why are fat-soluble vitamins not needed in the diet every day?", groups: [["stored", "store"], ["liver", "adipose", "fat", "tissue"]],
    model: "Fat-soluble vitamins (A, D, E, K) are stored in the liver and fatty tissues, whereas water-soluble vitamins are excreted in urine and must be supplied regularly.", hint: "What does the body do with them?" },
  { id: "bm-s12", tag: "Proteins", level: 1, q: "What are essential amino acids?", groups: [["not synthesised", "cannot be synthesised", "cannot be made", "not synthesized", "cannot synthesise", "cannot synthesize", "body cannot", "not made"], ["diet", "food"]],
    model: "Essential amino acids cannot be synthesised by the body and must be obtained from the diet.", hint: "Where must they come from?" },
  { id: "bm-s13", tag: "Hormones", level: 1, q: "What are hormones?", groups: [["messenger"], ["endocrine", "gland", "ductless", "blood"]],
    model: "Hormones are chemical messengers produced in small amounts by endocrine (ductless) glands and carried by the blood to target tissues.", hint: "Think of how a gland communicates with distant organs." },
];

const equations: ChemConceptQ[] = [
  { id: "bm-e1", tag: "Glucose", level: 2, q: "Complete the reaction and name the product:\nC₆H₁₂O₆ + Br₂ water →", groups: [["gluconic acid", "c6h12o7"]], model: "Gluconic acid (C₆H₁₂O₇) + 2HBr.", hint: "The –CHO group is oxidised to –COOH.", balance: ["C6H12O6 + Br2 + H2O -> C6H12O7 + 2HBr"] },
  { id: "bm-e2", tag: "Glucose", level: 2, q: "Complete the reaction and name the product:\nGlucose + conc. HNO₃ →", groups: [["saccharic acid", "c6h10o8", "glucaric acid"]], model: "Saccharic acid (a dicarboxylic acid, C₆H₁₀O₈).", hint: "Both the aldehyde and the terminal –CH₂OH are oxidised." },
  { id: "bm-e3", tag: "Glucose", level: 2, q: "Complete the reaction and name the organic product:\nC₆H₁₂O₆ + HI (heat) →", groups: [["n hexane", "n-hexane", "hexane", "c6h14", "ch3(ch2)4ch3"]], model: "n-Hexane, CH₃(CH₂)₄CH₃, showing six carbons in a straight chain.", hint: "HI reduces the molecule completely.", balance: ["C6H12O6 + 14HI -> C6H14 + 6H2O + 7I2"] },
  { id: "bm-e4", tag: "Glucose", level: 2, q: "Complete the reaction and name the product:\nC₆H₁₂O₆ + NH₂OH →", groups: [["oxime", "glucose oxime", "c6h13no6"]], model: "Glucose oxime + H₂O, showing a carbonyl group.", hint: "Hydroxylamine condenses with C=O.", balance: ["C6H12O6 + NH2OH -> C6H13NO6 + H2O"] },
  { id: "bm-e5", tag: "Glucose", level: 2, q: "Complete the reaction and name the product:\nC₆H₁₂O₆ + HCN →", groups: [["cyanohydrin", "glucose cyanohydrin", "c7h13no6"]], model: "Glucose cyanohydrin, showing a carbonyl group.", hint: "HCN adds across C=O.", balance: ["C6H12O6 + HCN -> C7H13NO6"] },
  { id: "bm-e6", tag: "Glucose", level: 2, q: "Complete the reaction and name the product:\nC₆H₁₂O₆ + 5(CH₃CO)₂O →", groups: [["pentaacetate", "penta acetate", "glucose pentaacetate", "c16h22o11"]], model: "Glucose pentaacetate (five –OH groups acetylated) + 5CH₃COOH.", hint: "Count the –OH groups acetylated.", balance: ["C6H12O6 + 5(CH3CO)2O -> C16H22O11 + 5CH3COOH"] },
  { id: "bm-e7", tag: "Disaccharides", level: 2, q: "Complete the reaction and name both products:\nSucrose + H₂O (H⁺ or invertase) →", groups: [["glucose"], ["fructose"]], model: "Glucose and fructose (an equimolar mixture called invert sugar).", hint: "Sucrose is made of two monosaccharides.", balance: ["C12H22O11 + H2O -> C6H12O6 + C6H12O6"] },
  { id: "bm-e8", tag: "Disaccharides", level: 1, q: "Complete the reaction and name the product:\nMaltose + H₂O (maltase) →", groups: [["glucose"]], model: "Two molecules of glucose.", hint: "Maltose is two glucose units.", balance: ["C12H22O11 + H2O -> 2C6H12O6"] },
  { id: "bm-e9", tag: "Disaccharides", level: 2, q: "Complete the reaction and name both products:\nLactose + H₂O →", groups: [["galactose"], ["glucose"]], model: "Galactose and glucose.", hint: "Lactose is milk sugar.", balance: ["C12H22O11 + H2O -> C6H12O6 + C6H12O6"] },
  { id: "bm-e10", tag: "Polysaccharides", level: 1, q: "Complete the reaction and name the final product:\nStarch + H₂O (H⁺, heat) →", groups: [["glucose"]], model: "Glucose (through maltose).", hint: "Starch is a polymer of one monosaccharide." },
  { id: "bm-e11", tag: "Proteins", level: 2, q: "Two glycine molecules react: 2H₂N–CH₂–COOH → ? + H₂O. Name the new bond formed.", groups: [["peptide", "amide"]], model: "A dipeptide (glycylglycine), H₂NCH₂CONHCH₂COOH, containing a peptide (amide) bond –CO–NH–.", hint: "The –COOH and –NH₂ join.", balance: ["2H2NCH2COOH -> H2NCH2CONHCH2COOH + H2O"] },
  { id: "bm-e12", tag: "Nucleic acids", level: 2, q: "Write the complementary DNA strand to 5′-A–T–G–C-3′ (bases only, in pairing order, e.g. XXXX).", groups: [["tacg", "t a c g", "t-a-c-g", "t–a–c–g"]], model: "T–A–C–G, since A pairs with T and G pairs with C.", hint: "A–T and G–C." },
];

const st = (ask: string, options: string[], answer: number, why: string, hint: string): ChemReactionStage => ({ ask, options, answer, why, hint });
const rx = (id: string, tag: string, level: ChemLevel, title: string, prompt: string, stages: ChemReactionStage[], equation: string, note?: string, balance?: string[]): ChemReactionQ =>
  ({ id, tag, level, title, prompt, stages, equation, ...(note ? { note } : {}), ...(balance ? { balance } : {}) });

const reactions: ChemReactionQ[] = [
  rx("bm-r1", "Glucose", 2, "Structure of glucose from its reactions", "What each reaction of glucose proves",
    [st("Glucose + HI (heat) → n-hexane. What does this show?", ["Six carbons in a straight chain", "A ketone group", "A ring of five atoms", "A double bond"], 0, "Complete reduction gives an unbranched six-carbon alkane.", "Think about the skeleton of n-hexane."),
     st("Glucose + NH₂OH and HCN both react. What does this show?", ["A carbonyl group (C=O)", "A carboxylic acid", "A primary amine", "An ether linkage"], 0, "Oxime and cyanohydrin formation are typical of carbonyl compounds.", "These are carbonyl reagents."),
     st("Glucose + Br₂ water → gluconic acid. What does this show?", ["The carbonyl is an aldehyde", "The carbonyl is a ketone", "There is a carboxylic acid already", "There are two carbonyl groups"], 0, "A mild oxidant converts –CHO to –COOH, giving a six-carbon acid.", "Ketones would not be oxidised this way."),
     st("Glucose + HNO₃ → saccharic acid. What does this show?", ["A primary –OH group is present at the other end", "The molecule has an –NH₂ group", "The ring has opened twice", "It is a disaccharide"], 0, "The terminal –CH₂OH is also oxidised to –COOH, giving a dicarboxylic acid.", "Both ends have been oxidised."),
     st("Glucose + (CH₃CO)₂O → pentaacetate. What does this show?", ["Five –OH groups", "Five carbonyl groups", "Five ring oxygens", "Five double bonds"], 0, "Each –OH is acetylated, so five acetyl groups mean five –OH groups.", "Count the acetyl groups.")],
    "C₆H₁₂O₆ → CH₃(CH₂)₄CH₃ (HI); oxime (NH₂OH); cyanohydrin (HCN); C₆H₁₂O₇ (Br₂ water); C₆H₁₀O₈ (HNO₃); pentaacetate (5 (CH₃CO)₂O)",
    "Together these give CH₂OH–(CHOH)₄–CHO.", ["C6H12O6 + Br2 + H2O -> C6H12O7 + 2HBr"]),
  rx("bm-r2", "Glucose", 3, "Why glucose does not give Schiff's test", "Glucose has –CHO but gives no Schiff's test",
    [st("What is the reason?", ["It exists mainly in a cyclic hemiacetal form", "It has no carbon atoms", "It has a ketone group", "The –CHO is destroyed by water"], 0, "In the ring form there is almost no free –CHO group.", "Think about the pyranose ring."),
     st("What do the α and β forms differ in?", ["Configuration at C-1", "Number of carbons", "The sugar's formula", "Position of the ring oxygen"], 0, "The hemiacetal C-1 becomes a new stereocentre; α and β are anomers.", "The new stereocentre is at the carbon that was –CHO.")],
    "Open chain ⇌ α-D-glucopyranose ⇌ β-D-glucopyranose (mutarotation)"),
  rx("bm-r3", "Disaccharides", 2, "Inversion of sucrose", "Sucrose → glucose + fructose",
    [st("Which reagents bring about hydrolysis?", ["Dilute acid or the enzyme invertase", "NaOH only", "H₂/Pd", "Br₂ water"], 0, "Acid or invertase breaks the glycosidic bond.", "Hydrolysis needs water with acid or an enzyme."),
     st("What are the products?", ["Glucose and fructose (equimolar)", "Two molecules of glucose", "Galactose and glucose", "Maltose and fructose"], 0, "Sucrose is α-D-glucose joined to β-D-fructose.", "Recall what sucrose is made of."),
     st("What happens to the optical rotation?", ["It changes from dextro to laevo", "It stays dextro", "It becomes zero", "It doubles"], 0, "Fructose (−92.4°) outweighs glucose (+52.5°), so the mixture is laevorotatory: invert sugar.", "Compare the sizes of the two rotations.")],
    "C₁₂H₂₂O₁₁ + H₂O →(H⁺ or invertase) C₆H₁₂O₆ (glucose) + C₆H₁₂O₆ (fructose)", undefined, ["C12H22O11 + H2O -> C6H12O6 + C6H12O6"]),
  rx("bm-r4", "Carbohydrates", 2, "Reducing or not?", "Which sugar does not reduce Tollens' reagent?",
    [st("Which one is non-reducing?", ["Sucrose", "Glucose", "Maltose", "Lactose"], 0, "In sucrose both anomeric carbons are in the glycosidic bond.", "Which sugar has no free hemiacetal group?"),
     st("What is the visible result with Tollens' reagent for a reducing sugar?", ["Silver mirror", "Yellow precipitate", "Blue colour", "Effervescence"], 0, "The sugar is oxidised and Ag⁺ is reduced to silver.", "A familiar test for aldehydes.")],
    "Reducing sugar + Tollens' reagent → silver mirror; sucrose gives none"),
  rx("bm-r5", "Proteins", 2, "Forming a peptide", "2 H₂N–CH₂–COOH → dipeptide",
    [st("Which groups react?", ["–COOH of one and –NH₂ of the other", "–COOH with –COOH", "–NH₂ with –NH₂", "–CH₂– with –COOH"], 0, "The carboxyl group of one amino acid joins the amino group of the next.", "An acid and an amine give an amide."),
     st("What small molecule is lost?", ["Water", "Ammonia", "CO₂", "HCl"], 0, "A condensation reaction eliminates H₂O.", "The link is an amide formed by condensation.")],
    "2H₂NCH₂COOH → H₂NCH₂CONHCH₂COOH + H₂O", "The –CO–NH– group is the peptide bond.", ["2H2NCH2COOH -> H2NCH2CONHCH2COOH + H2O"]),
  rx("bm-r6", "Proteins", 2, "Denaturation of egg white", "Boiling an egg",
    [st("What happens to the protein structure?", ["Secondary and tertiary structure are lost", "Peptide bonds are hydrolysed", "The primary structure is rearranged", "Nothing changes"], 0, "Heat disrupts hydrogen bonds and other weak forces.", "Which levels depend on weak interactions?"),
     st("What stays intact?", ["The primary structure", "The tertiary structure", "The helix", "The quaternary structure"], 0, "The sequence of amino acids is unchanged.", "The covalent backbone is not broken.")],
    "Native protein →(heat, pH change) denatured (coagulated) protein", "The change is usually irreversible."),
  rx("bm-r7", "Enzymes", 1, "Enzyme and reaction", "Match the enzyme to its reaction",
    [st("Which enzyme hydrolyses sucrose?", ["Invertase", "Zymase", "Urease", "Pepsin"], 0, "Invertase converts sucrose to glucose and fructose.", "Its name is linked to invert sugar."),
     st("Which enzyme converts glucose to ethanol and CO₂?", ["Zymase", "Invertase", "Maltase", "Urease"], 0, "Zymase, in yeast, brings about fermentation.", "It acts in fermentation."),
     st("Which enzyme hydrolyses urea?", ["Urease", "Pepsin", "Maltase", "Zymase"], 0, "Urease converts urea to NH₃ and CO₂.", "The name starts with the substrate.")],
    "Sucrose →(invertase) glucose + fructose; glucose →(zymase) C₂H₅OH + CO₂; urea →(urease) 2NH₃ + CO₂"),
  rx("bm-r8", "Nucleic acids", 2, "Base pairing", "Pair the bases in a DNA double helix",
    [st("What does adenine pair with, and with how many H-bonds?", ["Thymine, two", "Cytosine, three", "Guanine, two", "Uracil, three"], 0, "A–T has two hydrogen bonds.", "A pairs with the base that is in DNA but not RNA."),
     st("What does guanine pair with, and with how many H-bonds?", ["Cytosine, three", "Thymine, two", "Adenine, three", "Uracil, two"], 0, "G–C has three hydrogen bonds.", "The stronger pair."),
     st("What replaces thymine in RNA?", ["Uracil", "Cytosine", "Guanine", "Adenine"], 0, "RNA uses uracil in place of thymine.", "It is a pyrimidine without the methyl group.")],
    "A–T (2 H-bonds), G–C (3 H-bonds); in RNA, A pairs with U"),
  rx("bm-r9", "Vitamins", 1, "Match deficiency with vitamin", "Identify the vitamin from the disease",
    [st("Scurvy is caused by deficiency of:", ["Vitamin C", "Vitamin A", "Vitamin D", "Vitamin K"], 0, "Ascorbic acid is needed for collagen formation.", "It is found in citrus fruits."),
     st("Rickets in children is caused by deficiency of:", ["Vitamin D", "Vitamin C", "Vitamin B₁", "Vitamin E"], 0, "Vitamin D is needed for calcium absorption and bone formation.", "Sunlight helps make it."),
     st("Night blindness is caused by deficiency of:", ["Vitamin A", "Vitamin B₁₂", "Vitamin K", "Vitamin C"], 0, "Vitamin A is needed for vision.", "Carrots are a rich source.")],
    "C → scurvy; D → rickets; A → night blindness; B₁ → beri-beri; B₁₂ → pernicious anaemia; K → delayed clotting"),
];

const questions: ChemQuestion[] = [
  q("bm-m1", "Carbohydrates", 1, "Which of the following is a monosaccharide?", ["fructose", "sucrose", "maltose", "starch"], 0, "Fructose cannot be hydrolysed to a simpler sugar.", "Which one is not a disaccharide or polymer?"),
  q("bm-m2", "Carbohydrates", 1, "Which of the following is a non-reducing sugar?", ["sucrose", "glucose", "maltose", "lactose"], 0, "In sucrose the anomeric carbons of both units form the glycosidic bond.", "No free aldehyde or ketone group."),
  q("bm-m3", "Glucose", 1, "Glucose on heating with HI gives n-hexane. This shows:", ["six carbons in a straight chain", "a ketone group", "a ring of five atoms", "a –COOH group"], 0, "Complete reduction to n-hexane means an unbranched six-carbon skeleton.", "Look at the skeleton of n-hexane."),
  q("bm-m4", "Proteins", 1, "The linkage joining amino acids in a protein is:", ["a peptide bond", "a glycosidic bond", "a phosphodiester bond", "an ester bond"], 0, "–CO–NH– is a peptide (amide) bond.", "Think amide."),
  q("bm-m5", "Vitamins", 1, "Scurvy is caused by deficiency of vitamin:", ["C", "A", "D", "K"], 0, "Lack of ascorbic acid causes scurvy.", "Citrus fruits prevent it."),
  q("bm-m6", "Carbohydrates", 2, "Hydrolysis of sucrose gives:", ["glucose and fructose", "two glucose", "glucose and galactose", "fructose only"], 0, "Sucrose = α-D-glucose + β-D-fructose.", "Invert sugar."),
  q("bm-m7", "Proteins", 2, "The α-helix of a protein is stabilised by:", ["intramolecular hydrogen bonds", "ionic bonds between chains", "glycosidic bonds", "disulphide bonds only"], 0, "C=O and N–H groups within the same chain hydrogen-bond.", "Within one chain."),
  q("bm-m8", "Nucleic acids", 2, "Which base is present in RNA but not in DNA?", ["uracil", "thymine", "adenine", "guanine"], 0, "RNA contains uracil in place of thymine.", "Thymine is replaced."),
  q("bm-m9", "Polysaccharides", 2, "Which component of starch is branched?", ["amylopectin", "amylose", "cellulose", "maltose"], 0, "Amylopectin has C1–C6 branch points.", "Starch = amylose + amylopectin."),
  q("bm-m10", "Polysaccharides", 2, "Cellulose is a polymer of:", ["β-D-glucose", "α-D-glucose", "fructose", "galactose"], 0, "Cellulose has β-D-glucose units joined by C1–C4 links.", "Starch uses the alpha form."),
  q("bm-m11", "Proteins", 2, "Denaturation of a protein destroys:", ["secondary and tertiary structure", "primary structure", "peptide bonds", "all amino acids"], 0, "Weak forces are disrupted; the amino-acid sequence remains.", "Which levels rely on hydrogen bonds?"),
  q("bm-m12", "Vitamins", 2, "Rickets in children is due to deficiency of vitamin:", ["D", "C", "B₁", "K"], 0, "Vitamin D helps absorb calcium for bones.", "Sunlight."),
  q("bm-m13", "Enzymes", 2, "Enzymes are:", ["specific biological catalysts, mostly proteins", "non-specific catalysts", "carbohydrates that store energy", "nucleic acids only"], 0, "They are highly specific globular proteins that catalyse reactions in living cells.", "Their names end in –ase."),
  q("bm-m14", "Glucose", 3, "The α and β anomers of glucose differ in configuration at:", ["C-1", "C-2", "C-5", "C-6"], 0, "The hemiacetal carbon C-1 becomes a new stereocentre on ring closure.", "The carbon that was –CHO."),
  q("bm-m15", "Disaccharides", 3, "Maltose consists of:", ["two α-D-glucose units joined by a C1–C4 link", "glucose and fructose joined C1–C2", "galactose and glucose", "two fructose units"], 0, "Maltose is the repeat unit disaccharide from starch.", "Both units are glucose."),
  q("bm-m16", "Nucleic acids", 2, "How many hydrogen bonds join guanine and cytosine in DNA?", ["three", "two", "one", "four"], 0, "G–C has three; A–T has two.", "The stronger pair."),
  q("bm-m17", "Vitamins", 2, "Which of these is a fat-soluble vitamin?", ["A", "B₁", "B₆", "C"], 0, "Fat-soluble vitamins are A, D, E and K.", "Pick from A, D, E, K."),
];

const challenge: ChemQuestion[] = [
  ar("bm-a1", 2, "Sucrose is a non-reducing sugar.", "The glycosidic linkage in sucrose involves the reducing groups of both glucose and fructose.", 0, "No free aldehyde or ketone group remains.", "Which groups are tied up?"),
  ar("bm-a2", 3, "Glucose does not give Schiff's test although it contains an aldehyde group.", "Glucose exists mainly in the cyclic hemiacetal form.", 0, "Very little free –CHO is present in the ring form.", "Think about the ring."),
  ar("bm-a3", 2, "Vitamin C must be supplied regularly in the diet.", "Vitamin C is water-soluble and is excreted in urine, so it is not stored in the body.", 0, "Water-soluble vitamins are not stored.", "Compare the two classes of vitamins."),
  ar("bm-a4", 3, "Denaturation destroys the biological activity of a protein.", "Denaturation breaks the primary structure by hydrolysing peptide bonds.", 2, "Denaturation does destroy activity (A true), but it disrupts the secondary and tertiary structure only; peptide bonds stay, so R is false.", "Which structure levels are lost?"),
  ar("bm-a5", 2, "In DNA the amount of adenine equals the amount of thymine.", "Adenine pairs with thymine through two hydrogen bonds in the double helix.", 0, "Complementary base pairing makes the amounts equal.", "Think about base pairing."),
  q("bm-a6", "Glucose", 3, "Glucose is oxidised by Br₂ water to gluconic acid and by HNO₃ to saccharic acid. The difference arises because:", ["HNO₃ oxidises both the –CHO and the terminal –CH₂OH, but Br₂ water oxidises only –CHO", "Br₂ water is a stronger oxidant than HNO₃", "HNO₃ reduces glucose", "Br₂ water opens the ring"], 0, "Br₂ water is a mild oxidant; conc. HNO₃ also oxidises the primary alcohol end.", "Compare the strength of the two oxidants.", { challenge: true }),
  q("bm-a7", "Proteins", 3, "A polypeptide chain contains 20 amino acid units. The number of peptide bonds is:", ["19", "20", "21", "40"], 0, "A linear chain of n units has n − 1 peptide bonds.", "Count the links between units.", { challenge: true }),
];

const predict: ChemQuestion[] = [
  q("bm-p1", "Disaccharides", 1, "Predict the products: sucrose + H₂O (dilute H⁺) →", ["glucose and fructose", "two glucose", "maltose and water", "ethanol and CO₂"], 0, "Sucrose hydrolyses into its two monosaccharide units.", "What is sucrose made of?", { steps: ["Acid breaks the glycosidic bond.", "The units are α-D-glucose and β-D-fructose.", "Products: glucose and fructose (invert sugar)."], balance: ["C12H22O11 + H2O -> C6H12O6 + C6H12O6"] }),
  q("bm-p2", "Glucose", 2, "Predict the product: glucose + Br₂ water →", ["gluconic acid", "saccharic acid", "n-hexane", "glucose oxime"], 0, "A mild oxidant converts –CHO to –COOH.", "Only the aldehyde is oxidised.", { steps: ["Br₂ water is a mild oxidising agent.", "–CHO is oxidised to –COOH.", "Product: gluconic acid, C₆H₁₂O₇."], balance: ["C6H12O6 + Br2 + H2O -> C6H12O7 + 2HBr"] }),
  q("bm-p3", "Glucose", 2, "Predict the product: glucose + conc. HNO₃ →", ["saccharic acid", "gluconic acid", "n-hexane", "glucose pentaacetate"], 0, "Both ends are oxidised, giving a dicarboxylic acid.", "A stronger oxidant than Br₂ water.", { steps: ["Conc. HNO₃ is a strong oxidant.", "Both –CHO and –CH₂OH become –COOH.", "Product: saccharic acid."] }),
  q("bm-p4", "Proteins", 1, "Predict the product: two glycine molecules react to give a dipeptide and:", ["water", "ammonia", "carbon dioxide", "hydrogen"], 0, "A peptide bond forms by condensation, losing H₂O.", "Condensation reaction.", { steps: ["The –COOH of one glycine reacts with the –NH₂ of the other.", "H₂O is eliminated.", "Dipeptide: H₂NCH₂CONHCH₂COOH."], balance: ["2H2NCH2COOH -> H2NCH2CONHCH2COOH + H2O"] }),
  q("bm-p5", "Proteins", 1, "Predict the outcome: egg white is boiled. The protein:", ["coagulates (denatures)", "is hydrolysed to amino acids", "turns into starch", "changes its primary structure"], 0, "Heat disrupts weak interactions, so the protein loses its native shape and coagulates.", "Which structure levels are lost?", { steps: ["Heat breaks hydrogen bonds and other weak forces.", "Secondary and tertiary structure are lost.", "The protein coagulates; the primary structure is unchanged."] }),
  q("bm-p6", "Carbohydrates", 2, "Predict the outcome: sucrose is warmed with Fehling's solution. You observe:", ["no red precipitate", "a red-brown precipitate", "a silver mirror", "a yellow precipitate"], 0, "Sucrose is non-reducing, so it does not reduce Fehling's solution.", "Is sucrose reducing?", { steps: ["Sucrose has no free aldehyde or ketone group.", "It cannot reduce Cu²⁺.", "No red precipitate forms."] }),
  q("bm-p7", "Disaccharides", 1, "Predict the product: maltose + H₂O (maltase) →", ["two molecules of glucose", "glucose and fructose", "glucose and galactose", "two molecules of fructose"], 0, "Maltose is made of two glucose units.", "Maltose from starch.", { steps: ["Maltase hydrolyses the C1–C4 glycosidic bond.", "Both units are glucose.", "Product: 2 glucose."], balance: ["C12H22O11 + H2O -> 2C6H12O6"] }),
  q("bm-p8", "Disaccharides", 1, "Predict the products: lactose + H₂O →", ["galactose and glucose", "glucose and fructose", "two glucose", "maltose"], 0, "Lactose is β-D-galactose joined to β-D-glucose.", "Milk sugar.", { steps: ["The C1–C4 β-glycosidic bond is hydrolysed.", "The units are galactose and glucose.", "Products: galactose + glucose."], balance: ["C12H22O11 + H2O -> C6H12O6 + C6H12O6"] }),
  q("bm-p9", "Vitamins", 1, "Predict the outcome: a child gets too little vitamin D. The likely disease is:", ["rickets", "scurvy", "beri-beri", "night blindness"], 0, "Lack of vitamin D weakens bone formation, causing rickets.", "Think bones.", { steps: ["Vitamin D helps absorb calcium.", "Without it bones do not harden properly.", "Disease: rickets (osteomalacia in adults)."] }),
  q("bm-p10", "Nucleic acids", 2, "Predict the complementary DNA strand for A–T–G–C:", ["T–A–C–G", "U–A–C–G", "A–T–G–C", "T–A–G–C"], 0, "A pairs with T and G pairs with C, so the complement is T–A–C–G.", "Pair each base.", { steps: ["A pairs with T.", "T pairs with A, G pairs with C, C pairs with G.", "The complement is T–A–C–G."] }),
];

export const content: ChemChapterContent = { sections, questions, cards, challenge, concept, equations, reactions, predict };
