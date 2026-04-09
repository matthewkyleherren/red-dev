// Biomarker detail page data -- extracted from Webflow static export
// Contains structured content for 5 example biomarker detail pages.

export interface ContentItem {
  type: "h4" | "p" | "ul";
  text?: string;
  items?: string[];
}

export interface Section {
  heading: string;
  content: ContentItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SimilarBiomarker {
  name: string;
  category: string;
  slug: string;
}

export interface BiomarkerDetail {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  category: string;
  categorySlug: string;
  date: string;
  medicalTestDescription: string;
  medicalWebPageDescription: string;
  methodNote: string;
  sections: Section[];
  faqs?: FAQItem[];
  similarBiomarkers?: SimilarBiomarker[];
}

export const biomarkerDetails: BiomarkerDetail[] = [
  {
    "slug": "albumin-test",
    "title": "Albumin: Best Biomarkers to Monitor | Test With Superpower",
    "metaDescription": "Struggling with swelling, fatigue, or slow healing? Low albumin levels could be why. Learn which blood tests measure albumin, liver and kidney function to protect your health. Test with Superpower.",
    "h1": "Albumin Test",
    "category": "Liver Health",
    "categorySlug": "liver",
    "date": "March 25, 2026",
    "medicalTestDescription": "Albumin is the body’s key plasma protein, reflecting liver function, protein nutrition, hydration, and inflammation in one simple measure.",
    "medicalWebPageDescription": "The main protein in blood that maintains fluid balance; low levels may indicate liver disease, kidney disease, or malnutrition.",
    "methodNote": "Method: FDA-cleared clinical laboratory assay performed in CLIA-certified, CAP-accredited laboratories. Used to aid clinician-directed evaluation and monitoring. Not a stand-alone diagnosis.",
    "sections": [
      {
        "heading": "Do I need an Albumin test?",
        "content": [
          {
            "type": "p",
            "text": "Feeling unusually tired, noticing swelling in your legs or ankles, or concerned about unexplained weight changes? Could low albumin be affecting your body's ability to maintain fluid balance and transport vital nutrients?"
          },
          {
            "type": "p",
            "text": "Albumin is the most abundant protein in your blood, playing a crucial role in maintaining fluid balance, transporting hormones and nutrients, and supporting overall tissue health. Low levels can signal liver or kidney issues, malnutrition, or inflammation."
          },
          {
            "type": "p",
            "html": "<strong>Testing your albumin</strong> gives you a vital snapshot of your liver function, nutritional status, and protein balance. It's a key first step to understanding what's behind your fatigue or swelling and personalizing your nutrition and lifestyle to restore balance."
          }
        ]
      },
      {
        "heading": "Get tested with Superpower",
        "content": [
          {
            "type": "p",
            "html": "<strong>If you’ve been postponing blood testing for years or feel frustrated by doctor appointments and limited lab panels, you are not alone.</strong> Standard healthcare is often reactive, focusing on testing only after symptoms appear or leaving patients in the dark."
          },
          {
            "type": "p",
            "html": "Superpower flips that approach. We give you full insight into your body with over <strong>100 biomarkers</strong>, personalized action plans, long-term tracking, and answers to your questions, so you can stay ahead of any health issues."
          },
          {
            "type": "p",
            "html": "With on-demand access to a care team, CLIA-certified labs, and the option for at-home blood draws, Superpower is <a href=\"/reviews\">designed for people</a> who want clarity, convenience, and real accountability - all in one place."
          }
        ]
      },
      {
        "heading": "Key benefits of Albumin testing",
        "content": [
          {
            "type": "ul",
            "items": [
              "Measures your liver's ability to produce essential protein for health.",
              "Spots early liver stress before symptoms like fatigue or swelling appear.",
              "Flags malnutrition or protein loss that weakens immunity and healing.",
              "Explains unexplained swelling in legs, ankles, or abdomen.",
              "Guides treatment for chronic kidney disease by tracking protein loss.",
              "Tracks recovery after surgery, infection, or critical illness.",
              "Best interpreted with liver enzymes, total protein, and your symptoms."
            ]
          }
        ]
      },
      {
        "heading": "What is Albumin?",
        "content": [
          {
            "type": "p",
            "text": "Albumin is the most abundant protein in your blood, made continuously by your liver and released into circulation. It's a small, sturdy molecule that accounts for roughly half of all the protein floating in your plasma."
          },
          {
            "type": "h4",
            "text": "Your blood's multitasking workhorse"
          },
          {
            "type": "p",
            "text": "Albumin serves as the body's master transporter and fluid regulator. It ferries hormones, vitamins, drugs, and fatty acids to tissues that need them. At the same time, it acts like a sponge, holding water inside your blood vessels through osmotic pressure. Without enough albumin, fluid leaks into tissues, causing swelling."
          },
          {
            "type": "h4",
            "text": "A window into liver and kidney health"
          },
          {
            "type": "p",
            "text": "Because albumin is produced only by the liver and filtered carefully by the kidneys, its blood level reflects how well both organs are functioning. It also responds to inflammation, nutrition, and chronic illness. Measuring albumin gives clinicians a snapshot of your body's protein balance and overall physiological resilience."
          }
        ]
      },
      {
        "heading": "Why is Albumin important?",
        "content": [
          {
            "type": "p",
            "text": "Albumin is the most abundant protein in your blood, manufactured exclusively by your liver and released into circulation to hold fluid inside your vessels, ferry hormones and nutrients to tissues, and buffer acids throughout your body. When albumin levels fall outside the typical range of roughly 3.5 to 5.5, it signals that your liver, kidneys, nutritional state, or inflammatory burden may be compromised. Optimal values usually sit in the mid-to-upper portion of the range, reflecting robust liver synthesis and minimal protein loss."
          },
          {
            "type": "h4",
            "text": "When albumin drops, fluid escapes"
          },
          {
            "type": "p",
            "text": "Low albumin means your blood cannot hold water effectively, so fluid leaks into tissues and body cavities, causing swelling in the legs, abdomen, or lungs. This happens with chronic liver disease, kidney damage that spills protein into urine, severe malnutrition, or prolonged inflammation from infection or autoimmune conditions. Fatigue, poor wound healing, and susceptibility to infection often follow because albumin also transports immune molecules and micronutrients."
          },
          {
            "type": "h4",
            "text": "High albumin usually reflects dehydration"
          },
          {
            "type": "p",
            "text": "Elevated albumin is rarely a primary disease but instead points to concentrated blood from dehydration or severe fluid loss. It can also appear transiently during acute stress or hemoconcentration."
          },
          {
            "type": "h4",
            "text": "The big picture"
          },
          {
            "type": "p",
            "text": "Albumin integrates liver function, kidney integrity, nutritional reserves, and systemic inflammation into a single number. Persistent abnormalities predict higher risks for hospitalization, slower recovery from illness, and poorer long-term outcomes across cardiovascular, metabolic, and immune health."
          }
        ]
      },
      {
        "heading": "What do my Albumin results mean?",
        "content": [
          {
            "type": "h4",
            "text": "Low albumin usually reflects reduced production or increased loss"
          },
          {
            "type": "p",
            "text": "Low values usually reflect either inadequate synthesis by the liver or excessive loss through the kidneys or gut. Chronic liver disease, malnutrition, and inflammatory states all suppress albumin production. Protein-losing conditions such as nephrotic syndrome or protein-losing enteropathy drain albumin from circulation. Low albumin reduces oncotic pressure, which can lead to fluid shifts into tissues and contribute to edema or ascites. It also impairs nutrient transport and drug binding, affecting how medications behave in the body."
          },
          {
            "type": "h4",
            "text": "Optimal albumin suggests healthy liver function and protein balance"
          },
          {
            "type": "p",
            "text": "Being in range suggests that your liver is synthesizing protein efficiently and that you are not losing excessive albumin through kidneys or intestines. Optimal values typically sit in the mid to upper portion of the reference range and reflect stable hydration, adequate protein intake, and low systemic inflammation. This supports normal fluid distribution, nutrient transport, and overall metabolic resilience."
          },
          {
            "type": "h4",
            "text": "High albumin usually reflects dehydration"
          },
          {
            "type": "p",
            "text": "High values usually reflect dehydration or hemoconcentration rather than true overproduction. When plasma volume contracts, albumin concentration rises. This is common with inadequate fluid intake, vomiting, diarrhea, or diuretic use."
          },
          {
            "type": "h4",
            "text": "Context matters for accurate interpretation"
          },
          {
            "type": "p",
            "text": "Albumin declines naturally with age and during acute illness or surgery due to inflammation. Pregnancy lowers albumin through hemodilution. Results should always be interpreted alongside hydration status, liver function, kidney health, and inflammatory markers."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "What is albumin in a blood test and what does it do in the body?",
        "answer": "Albumin is the most abundant protein in your blood plasma, making up roughly half of circulating protein. It's made exclusively by the liver and released continuously. Albumin's key jobs are maintaining fluid balance (keeping water inside blood vessels to prevent leakage into tissues) and transporting \"cargo\" like hormones, fatty acids, vitamins, and many medications. It also helps buffer pH and supports overall tissue repair and resilience."
      },
      {
        "question": "Why would my doctor order an albumin test for liver, kidney, or nutrition concerns?",
        "answer": "Albumin testing helps assess your liver's ability to produce essential protein, detect early liver stress before symptoms, and flag malnutrition or protein loss that can weaken immunity and wound healing. It can also help explain swelling (legs, ankles, abdomen) and guide chronic kidney disease monitoring by tracking protein loss. Results are best interpreted alongside liver enzymes, total protein, and your symptoms for a clearer clinical picture."
      },
      {
        "question": "What is the normal albumin range and what do albumin levels outside 3.5\u20135.5 g/dL mean?",
        "answer": "Typical albumin reference ranges are roughly 3.5\u20135.5 g/dL. Levels below range often suggest reduced liver production, increased protein loss (kidneys or gut), inflammation, or dilution from fluid retention. Levels above range are uncommon and usually reflect dehydration (hemoconcentration), not true overproduction. Because lab methods and health status can affect results, trends over time and related tests (liver enzymes, total protein) are often more informative than one value."
      },
      {
        "question": "What are the most common causes of low albumin (hypoalbuminemia) in adults?",
        "answer": "Low albumin usually reflects one or more of: decreased liver synthesis (chronic liver disease), poor protein intake or severe malnutrition, inflammation or acute illness suppressing production, protein loss through damaged kidneys (proteinuria), or loss through the gut (protein-losing enteropathy). Fluid overload can also \"dilute\" albumin. Low albumin reduces oncotic pressure, making swelling more likely, and can impair transport of hormones, nutrients, and drugs throughout the body."
      },
      {
        "question": "How does low albumin cause swelling in legs, ankles, or the abdomen (edema/ascites)?",
        "answer": "Albumin acts like a sponge that helps hold water inside blood vessels by maintaining oncotic pressure. When albumin is low, fluid is more likely to leak from blood vessels into surrounding tissues or body cavities. This can show up as leg or ankle swelling (edema) or abdominal fluid buildup (ascites). Low albumin can also accompany conditions that cause fluid retention, making swelling more noticeable and sometimes appearing before other symptoms."
      },
      {
        "question": "Can dehydration cause high albumin results, and does high albumin mean disease?",
        "answer": "Yes - high albumin is most often due to dehydration or hemoconcentration, where reduced plasma volume makes albumin appear elevated. Vomiting, diarrhea, or inadequate fluid intake can cause mild increases. True overproduction of albumin does not occur. Rehydration typically normalizes the value. If albumin stays high, it's usually a cue to reassess hydration and overall fluid balance and consider related kidney function evaluation."
      },
      {
        "question": "How should albumin results be interpreted with liver enzymes and total protein?",
        "answer": "Albumin is most meaningful when interpreted with liver enzymes, total protein, and symptoms because it reflects multiple systems: liver production, kidney and gut protein loss, and inflammation or fluid status. Normal albumin alongside abnormal liver enzymes can still indicate liver stress, while low albumin with proteinuria points more toward kidney loss. Total protein helps contextualize whether low albumin is part of broader protein changes. Monitoring trends improves accuracy versus relying on a single lab value."
      },
      {
        "question": "How can pregnancy, aging, surgery, or infection affect albumin levels on lab tests?",
        "answer": "Albumin can decrease modestly with aging and commonly drops during pregnancy due to plasma volume expansion (a dilution effect). Acute illness, infection, surgery, and inflammation can temporarily suppress albumin synthesis, lowering results even without chronic liver disease or malnutrition. Because these are common, short-term influences, repeating the test and watching trends over time can provide a better signal of true nutritional status, organ reserve, and recovery progress than one isolated measurement."
      },
      {
        "question": "Does low albumin affect medications, calcium, or thyroid hormones in bloodwork?",
        "answer": "Yes. Albumin binds and carries many medications as well as hormones and nutrients. When albumin is low, the transport and \"bound vs. free\" balance of certain substances can shift, which may influence drug effectiveness and interpretation of labs that interact with albumin. Low albumin can indirectly affect energy, bone-related markers, and medication handling. Clinicians often interpret related tests with albumin in mind."
      },
      {
        "question": "How is albumin testing used to track recovery after surgery or critical illness and guide long-term risk?",
        "answer": "Albumin can help track recovery after surgery, infection, or critical illness because inflammation and stress can lower synthesis and increase losses. Persistently low albumin correlates with higher hospitalization risk, slower healing, and higher long-term mortality, reflecting reduced organ reserve, nutrition gaps, or ongoing inflammation. Tracking albumin over time helps reveal whether your body is rebuilding protein reserves and maintaining fluid balance - especially when reviewed with symptoms and complementary labs."
      }
    ],
    "similarBiomarkers": [
      { "name": "RBC, Urine", "category": "Kidney Health", "slug": "rbc-urine-test" },
      { "name": "Nitrite, Urine", "category": "Kidney Health", "slug": "nitrite-urine-test" },
      { "name": "Bacteria, Urine", "category": "Kidney Health", "slug": "bacteria-urine-test" },
      { "name": "Epithelial Cells, Urine", "category": "Kidney Health", "slug": "epithelial-cells-urine-test" },
      { "name": "WBC, Urine", "category": "Kidney Health", "slug": "wbc-urine-test" },
      { "name": "Leukocyte Esterase, Urine", "category": "Kidney Health", "slug": "leukocyte-esterase-urine-test" },
      { "name": "Protein, Urine", "category": "Kidney Health", "slug": "protein-urine-test" },
      { "name": "Occult Blood, Urine", "category": "Kidney Health", "slug": "occult-blood-urine-test" }
    ]
  },
  {
    "slug": "testosterone-total-test",
    "title": "Best Biomarkers: Testosterone Total | Test With Superpower",
    "metaDescription": "Struggling with low energy or mood? A total testosterone blood test reveals what&#x27;s really going on with your hormone levels. Test with Superpower today.",
    "h1": "Testosterone, Total Test",
    "category": "Sex Hormones",
    "categorySlug": "sex-hormones",
    "date": "March 25, 2026",
    "medicalTestDescription": "Know your Testosterone, Total numbers to optimize energy, muscle strength, and recovery.",
    "medicalWebPageDescription": "The primary male hormone; affects muscle mass, bone density, mood, and sexual function.",
    "methodNote": "Method: Laboratory-developed test (LDT) validated under CLIA; not cleared or approved by the FDA. Results are interpreted by clinicians in context and are not a stand-alone diagnosis.",
    "sections": [
      {
        "heading": "Do I need a Testosterone, Total test?",
        "content": [
          {
            "type": "p",
            "text": "Feeling constantly fatigued, losing muscle despite working out, or noticing a drop in your drive and motivation? Could low testosterone be affecting your energy, strength, and overall vitality?"
          },
          {
            "type": "p",
            "text": "Total testosterone measures the primary hormone that regulates your energy levels, muscle mass, bone density, and mood. When levels are off, you may struggle with fatigue, decreased strength, low libido, or mental fog."
          },
          {
            "type": "p",
            "html": "<strong>Testing</strong> your testosterone provides a vital snapshot of your hormonal health, helping you understand whether imbalances are behind your symptoms. This clarity empowers you to personalize your treatment plan and lifestyle choices, so you can reclaim your energy and feel strong again."
          }
        ]
      },
      {
        "heading": "Get tested with Superpower",
        "content": [
          {
            "type": "p",
            "html": "<strong>If you’ve been postponing blood testing for years or feel frustrated by doctor appointments and limited lab panels, you are not alone.</strong> Standard healthcare is often reactive, focusing on testing only after symptoms appear or leaving patients in the dark."
          },
          {
            "type": "p",
            "html": "Superpower flips that approach. We give you full insight into your body with over <strong>100 biomarkers</strong>, personalized action plans, long-term tracking, and answers to your questions, so you can stay ahead of any health issues."
          },
          {
            "type": "p",
            "html": "With on-demand access to a care team, CLIA-certified labs, and the option for at-home blood draws, Superpower is <a href=\"/reviews\">designed for people</a> who want clarity, convenience, and real accountability - all in one place."
          }
        ]
      },
      {
        "heading": "Key benefits of Testosterone, Total testing",
        "content": [
          {
            "type": "ul",
            "items": [
              "Measures the total amount of testosterone circulating in your blood.",
              "Spots hormonal imbalance that may explain fatigue, low libido, or mood changes.",
              "Flags conditions like hypogonadism, PCOS, or pituitary disorders early.",
              "Guides treatment decisions for testosterone replacement or fertility support.",
              "Tracks response to therapy and ensures hormone levels stay in healthy range.",
              "Clarifies unexplained symptoms like muscle loss, weight gain, or irregular periods.",
              "Best interpreted with free testosterone, SHBG, and your clinical symptoms."
            ]
          }
        ]
      },
      {
        "heading": "What is Testosterone, Total?",
        "content": [
          {
            "type": "p",
            "text": "Total testosterone measures the complete amount of testosterone circulating in your blood. This includes testosterone that is tightly bound to proteins, loosely bound, and freely floating. Testosterone is a steroid hormone produced mainly in the testes in men and in smaller amounts by the ovaries and adrenal glands in women."
          },
          {
            "type": "h4",
            "text": "The master hormone of male development"
          },
          {
            "type": "p",
            "text": "Testosterone drives the development of male physical characteristics during puberty and maintains them throughout life. It supports muscle mass, bone density, red blood cell production, and sperm formation. In both sexes, it influences energy, mood, and sexual function."
          },
          {
            "type": "h4",
            "text": "More than just a sex hormone"
          },
          {
            "type": "p",
            "text": "Beyond reproduction, testosterone plays a vital role in metabolic health. It helps regulate fat distribution, supports cardiovascular function, and influences cognitive performance. The \"total\" measurement captures all forms of the hormone in circulation, providing a broad snapshot of your body's testosterone status."
          },
          {
            "type": "p",
            "text": "This biomarker reflects how well your endocrine system is producing and managing one of its most influential chemical messengers."
          }
        ]
      },
      {
        "heading": "Why is Testosterone, Total important?",
        "content": [
          {
            "type": "p",
            "text": "Total testosterone measures the sum of free and protein-bound testosterone circulating in your blood, offering a window into reproductive health, muscle and bone integrity, energy regulation, and metabolic balance. It influences libido, mood, cognitive sharpness, and how your body builds lean tissue and burns fat. Reference ranges vary widely by sex and age, with men typically showing values many times higher than women, and optimal levels generally sitting in the mid-to-upper portion of the normal range for vitality and function."
          },
          {
            "type": "h4",
            "text": "When testosterone runs low"
          },
          {
            "type": "p",
            "text": "Declining testosterone can signal aging, chronic illness, pituitary or testicular dysfunction, or metabolic stress. Men may experience reduced libido, erectile difficulties, fatigue, loss of muscle mass, increased body fat, and mood changes including depression. Women with low levels may notice diminished sexual desire, low energy, and subtle shifts in bone density over time, though their baseline is naturally much lower."
          },
          {
            "type": "h4",
            "text": "When testosterone climbs too high"
          },
          {
            "type": "p",
            "text": "Elevated testosterone in men is uncommon without supplementation or tumors but can drive aggression, acne, and cardiovascular strain. In women, high levels often point to polycystic ovary syndrome, adrenal disorders, or ovarian tumors, manifesting as irregular periods, excess facial or body hair, acne, and metabolic disturbances like insulin resistance."
          },
          {
            "type": "h4",
            "text": "The bigger metabolic and longevity picture"
          },
          {
            "type": "p",
            "text": "Testosterone doesn't act alone - it interacts with insulin, cortisol, thyroid hormones, and estrogen to shape body composition, bone strength, cardiovascular risk, and mental resilience. Chronic imbalances contribute to osteoporosis, sarcopenia, metabolic syndrome, and diminished quality of life across decades."
          }
        ]
      },
      {
        "heading": "What do my Testosterone, Total results mean?",
        "content": [
          {
            "type": "h4",
            "text": "Low values and what they reveal"
          },
          {
            "type": "p",
            "text": "Low values usually reflect reduced production by the testes in men or the ovaries and adrenal glands in women. In men, this often signals primary testicular dysfunction or secondary issues involving the pituitary gland, which produces luteinizing hormone to stimulate testosterone synthesis. Common effects include reduced muscle mass, lower bone density, decreased libido, fatigue, and mood changes. In women, low testosterone may contribute to reduced energy, diminished sexual interest, and loss of muscle tone, though symptoms are often subtler than in men."
          },
          {
            "type": "h4",
            "text": "Optimal values and system stability"
          },
          {
            "type": "p",
            "text": "Being in range suggests healthy gonadal and adrenal function, appropriate pituitary signaling, and balanced metabolic activity. In men, optimal levels typically sit in the mid to upper portion of the reference range and support muscle maintenance, bone health, libido, and mood stability. In women, normal levels are much lower but still essential for energy, sexual function, and overall vitality."
          },
          {
            "type": "h4",
            "text": "High values and their significance"
          },
          {
            "type": "p",
            "text": "High values usually reflect exogenous testosterone use, androgen-secreting tumors, or polycystic ovary syndrome in women. In men, elevations are less common without supplementation. Women with high testosterone may experience irregular menstrual cycles, acne, excess body hair, and metabolic disturbances."
          },
          {
            "type": "h4",
            "text": "Factors that influence interpretation"
          },
          {
            "type": "p",
            "text": "Results vary by age, sex, time of day, and assay method. Testosterone peaks in the morning and declines with aging. Illness, obesity, and certain medications can suppress levels independent of gonadal health."
          }
        ]
      }
    ]
  },
  {
    "slug": "vitamin-d-25-hydroxy-test",
    "title": "Vitamin D: Best Biomarkers to Monitor | Test With Superpower",
    "metaDescription": "Feeling tired, achy, or getting sick often? Low vitamin D could be why. Learn which biomarkers to test for optimal health and bone strength. Test with Superpower today.",
    "h1": "Vitamin D, 25-Hydroxy Test",
    "category": "Nutrients",
    "categorySlug": "nutrients",
    "date": "March 25, 2026",
    "medicalTestDescription": "Measure your Vitamin D, 25-Hydroxy with Superpower.",
    "medicalWebPageDescription": "The storage form of vitamin D; low levels may cause bone problems, muscle weakness, and immune dysfunction.",
    "methodNote": "Method: Usually performed by FDA-cleared immunoassay in CLIA-certified, CAP-accredited laboratories. If an LC/MS method is used at the performing site, the assay is a laboratory-developed test (LDT) validated under CLIA and not cleared or approved by the FDA. Results support clinician interpretation and are not a stand-alone diagnosis.",
    "sections": [
      {
        "heading": "Do I need a Vitamin D, 25-Hydroxy test?",
        "content": [
          {
            "type": "p",
            "text": "Feeling fatigued, achy, or struggling with low mood? Could low vitamin D be contributing to your symptoms, and might testing help you understand why?"
          },
          {
            "type": "p",
            "text": "Vitamin D, 25-Hydroxy measures your body's vitamin D status, revealing whether you have enough of this essential nutrient for bone health, immune function, and mood regulation. Low levels often go undetected but can significantly impact how you feel daily."
          },
          {
            "type": "p",
            "html": "<strong>Testing</strong> your Vitamin D, 25-Hydroxy gives you a quick snapshot of your levels and is the crucial first step toward personalizing your supplement plan and lifestyle choices. Understanding your status empowers you to address fatigue, achiness, and mood concerns with targeted action."
          }
        ]
      },
      {
        "heading": "Get tested with Superpower",
        "content": [
          {
            "type": "p",
            "html": "<strong>If you’ve been postponing blood testing for years or feel frustrated by doctor appointments and limited lab panels, you are not alone.</strong> Standard healthcare is often reactive, focusing on testing only after symptoms appear or leaving patients in the dark."
          },
          {
            "type": "p",
            "html": "Superpower flips that approach. We give you full insight into your body with over <strong>100 biomarkers</strong>, personalized action plans, long-term tracking, and answers to your questions, so you can stay ahead of any health issues."
          },
          {
            "type": "p",
            "html": "With on-demand access to a care team, CLIA-certified labs, and the option for at-home blood draws, Superpower is <a href=\"/reviews\">designed for people</a> who want clarity, convenience, and real accountability - all in one place."
          }
        ]
      },
      {
        "heading": "Key benefits of Vitamin D, 25-Hydroxy testing",
        "content": [
          {
            "type": "ul",
            "items": [
              "Measures your vitamin D status to guide bone, immune, and metabolic health.",
              "Spots deficiency early, before bone pain, fractures, or muscle weakness appear.",
              "Explains fatigue, mood changes, or frequent infections linked to low vitamin D.",
              "Guides personalized supplementation to restore optimal levels safely and effectively.",
              "Tracks response to treatment, ensuring your dose achieves and maintains target range.",
              "Protects bone density and reduces fracture risk, especially in older adults.",
              "Supports fertility and healthy pregnancy by optimizing vitamin D for conception and fetal development.",
              "Best interpreted with calcium, PTH, and your symptoms for complete metabolic insight."
            ]
          }
        ]
      },
      {
        "heading": "What is Vitamin D, 25-Hydroxy?",
        "content": [
          {
            "type": "p",
            "text": "Vitamin D, 25-hydroxy (also called 25-hydroxyvitamin D or calcidiol) is the main storage form of vitamin D circulating in your bloodstream. It forms in your liver after your skin makes vitamin D from sunlight or after you consume it through food or supplements. This conversion is the first step in activating vitamin D for use in the body."
          },
          {
            "type": "h4",
            "text": "Your body's vitamin D reservoir"
          },
          {
            "type": "p",
            "text": "25-hydroxyvitamin D serves as a reservoir that your kidneys draw from to produce the active hormone form of vitamin D (calcitriol). Because it has a long half-life and reflects both dietary intake and sun exposure, it's the most reliable indicator of your overall vitamin D status."
          },
          {
            "type": "h4",
            "text": "The gatekeeper for calcium and immune health"
          },
          {
            "type": "p",
            "text": "This biomarker reveals how much raw material your body has available to regulate calcium absorption, support bone health, and modulate immune function. Adequate levels ensure your tissues can produce active vitamin D locally when and where it's needed."
          },
          {
            "type": "h4",
            "text": "More than just bone support"
          },
          {
            "type": "p",
            "text": "Beyond calcium metabolism, 25-hydroxyvitamin D influences muscle function, cardiovascular health, and cellular growth regulation throughout the body."
          }
        ]
      },
      {
        "heading": "Why is Vitamin D, 25-Hydroxy important?",
        "content": [
          {
            "type": "p",
            "text": "Vitamin D, 25-hydroxy is the storage form of vitamin D circulating in your blood and the most accurate measure of your body's vitamin D status. It reflects how well your skeleton, immune system, muscles, and metabolic organs are supported by this hormone-like nutrient. Levels typically range from deficient (below 20 ng/mL) to sufficient (30–50 ng/mL), with optimal health outcomes clustering in the middle to upper portion of the sufficient range."
          },
          {
            "type": "h4",
            "text": "When levels drop too low"
          },
          {
            "type": "p",
            "text": "Insufficient vitamin D impairs calcium absorption in the gut, weakening bones and raising the risk of fractures, osteomalacia in adults, and rickets in children. You may experience muscle weakness, fatigue, frequent infections, and mood changes as immune cells and brain tissue depend on adequate vitamin D signaling. Women who are pregnant or postmenopausal and older adults face heightened vulnerability to deficiency."
          },
          {
            "type": "h4",
            "text": "When levels climb too high"
          },
          {
            "type": "p",
            "text": "Excessive vitamin D, usually from over-supplementation, can lead to hypercalcemia, where too much calcium circulates in the blood. This stresses the kidneys, causes nausea, confusion, and heart rhythm disturbances, and may promote vascular calcification over time."
          },
          {
            "type": "h4",
            "text": "The long view on vitamin D"
          },
          {
            "type": "p",
            "text": "Beyond bone health, vitamin D modulates inflammation, supports cardiovascular function, and influences insulin sensitivity. Chronic deficiency is linked to autoimmune conditions, metabolic syndrome, and increased mortality risk, underscoring its role as a foundational regulator of long-term resilience."
          }
        ]
      },
      {
        "heading": "What do my Vitamin D, 25-Hydroxy results mean?",
        "content": [
          {
            "type": "h4",
            "text": "Low vitamin D levels"
          },
          {
            "type": "p",
            "text": "Low values usually reflect insufficient sun exposure, limited dietary intake, reduced skin synthesis with aging, or impaired absorption in the gut. Vitamin D is essential for calcium absorption and bone mineralization, so deficiency can lead to weakened bones, muscle weakness, and increased fracture risk. Low levels are also associated with immune dysregulation, mood changes, and chronic inflammation. Darker skin pigmentation, obesity, and certain medications can further reduce circulating levels."
          },
          {
            "type": "h4",
            "text": "Optimal vitamin D levels"
          },
          {
            "type": "p",
            "text": "Being in range suggests adequate support for bone health, immune function, and cellular signaling across multiple organ systems. Most experts agree that optimal levels sit in the mid to upper portion of the reference range, typically above 30 ng/mL or 75 nmol/L, where bone turnover is balanced and parathyroid hormone remains appropriately suppressed."
          },
          {
            "type": "h4",
            "text": "High vitamin D levels"
          },
          {
            "type": "p",
            "text": "High values usually reflect excessive supplementation, as toxicity from sun or food alone is rare. Elevated vitamin D can increase calcium absorption beyond normal limits, leading to hypercalcemia with symptoms like nausea, confusion, kidney stones, and vascular calcification. Very high levels may also suppress parathyroid hormone excessively."
          },
          {
            "type": "h4",
            "text": "Factors that influence vitamin D results"
          },
          {
            "type": "p",
            "text": "Seasonal variation, geographic latitude, and time spent outdoors significantly affect results. Pregnancy and lactation increase demand. Kidney and liver disease impair activation of the vitamin into its active form, calcitriol."
          }
        ]
      }
    ]
  },
  {
    "slug": "hemoglobin-a1c-hba1c-test",
    "title": "HbA1c: Best Biomarkers to Monitor | Test With Superpower",
    "metaDescription": "Worried about your blood sugar? Learn what your HbA1c test reveals about your average blood sugar over 3 months and how to lower A1c. Test with Superpower today.",
    "h1": "Hemoglobin A1c (HbA1c) Testing",
    "category": "Metabolic Health",
    "categorySlug": "metabolic-health",
    "date": "March 25, 2026",
    "medicalTestDescription": "Measure your Hemoglobin A1c with Superpower.",
    "medicalWebPageDescription": "Average blood sugar over 2-3 months; used to diagnose and monitor diabetes.",
    "methodNote": "Method: FDA-cleared clinical laboratory assay performed in CLIA-certified, CAP-accredited laboratories. Used to aid clinician-directed evaluation and monitoring. Not a stand-alone diagnosis.",
    "sections": [
      {
        "heading": "Do I need a Hemoglobin A1c (HbA1c) test?",
        "content": [
          {
            "type": "p",
            "text": "Feeling constantly drained, battling brain fog, or noticing increased thirst that won't quit? Could your blood sugar patterns over the past few months be affecting how you feel day to day?"
          },
          {
            "type": "p",
            "text": "HbA1c measures your average blood sugar levels over the past 2-3 months, giving you a broader picture than a single glucose reading. It reveals how well your body has been managing sugar over time, not just in one moment."
          },
          {
            "type": "p",
            "text": "Getting tested gives you a powerful snapshot of your long-term blood sugar control, which is the essential first step to personalizing your nutrition, exercise, and lifestyle choices. Understanding your HbA1c helps you address those frustrating symptoms like fatigue and brain fog with targeted action."
          }
        ]
      },
      {
        "heading": "Get tested with Superpower",
        "content": [
          {
            "type": "p",
            "html": "<strong>If you’ve been postponing blood testing for years or feel frustrated by doctor appointments and limited lab panels, you are not alone.</strong> Standard healthcare is often reactive, focusing on testing only after symptoms appear or leaving patients in the dark."
          },
          {
            "type": "p",
            "html": "Superpower flips that approach. We give you full insight into your body with over <strong>100 biomarkers</strong>, personalized action plans, long-term tracking, and answers to your questions, so you can stay ahead of any health issues."
          },
          {
            "type": "p",
            "html": "With on-demand access to a care team, CLIA-certified labs, and the option for at-home blood draws, Superpower is <a href=\"/reviews\">designed for people</a> who want clarity, convenience, and real accountability - all in one place."
          }
        ]
      },
      {
        "heading": "Key benefits of Hemoglobin A1c (HbA1c) testing",
        "content": [
          {
            "type": "ul",
            "items": [
              "Reveals your average blood sugar control over the past 2–3 months.",
              "Spots prediabetes early, before symptoms appear or damage begins.",
              "Diagnoses type 2 diabetes without requiring fasting or multiple blood draws.",
              "Guides medication adjustments to prevent complications like nerve or kidney damage.",
              "Tracks how well your diet, exercise, or treatment plan is working.",
              "Flags elevated diabetes risk that may affect fertility or pregnancy outcomes.",
              "Protects long-term health by catching glucose imbalance before heart or eye disease develops."
            ]
          }
        ]
      },
      {
        "heading": "What is Hemoglobin A1c (HbA1c)?",
        "content": [
          {
            "type": "h4",
            "text": "A sugar-coated protein that tells a three-month story"
          },
          {
            "type": "p",
            "text": "Hemoglobin A1c is a form of hemoglobin, the oxygen-carrying protein inside red blood cells, that has glucose (blood sugar) permanently attached to it. This attachment happens naturally and continuously throughout the roughly three-month lifespan of each red blood cell. The more glucose present in your bloodstream, the more hemoglobin becomes glycated (sugar-coated)."
          },
          {
            "type": "h4",
            "text": "Your body's built-in blood sugar historian"
          },
          {
            "type": "p",
            "text": "HbA1c serves as a biological record of your average blood glucose levels over the past two to three months. Unlike a single glucose measurement that captures just one moment in time, HbA1c reflects the cumulative exposure of your red blood cells to sugar during their entire circulation. This makes it an invaluable window into how well your body has been managing glucose over an extended period, revealing patterns that daily fluctuations might mask."
          }
        ]
      },
      {
        "heading": "Why is Hemoglobin A1c (HbA1c) important?",
        "content": [
          {
            "type": "p",
            "text": "Hemoglobin A1c measures the percentage of your red blood cells that have glucose permanently attached to them, offering a three-month window into how well your body has been managing blood sugar. Unlike a single glucose snapshot, HbA1c reveals whether your pancreas, liver, muscles, and fat tissue are working in harmony to keep fuel delivery stable. Normal values sit below 5.7%, prediabetes spans 5.7% to 6.4%, and diabetes is diagnosed at 6.5% or above, with optimal metabolic health clustering in the low-to-mid normal range."
          },
          {
            "type": "h4",
            "text": "When HbA1c runs unusually low"
          },
          {
            "type": "p",
            "text": "Values below 4% are rare and may signal conditions that shorten red blood cell lifespan, such as hemolytic anemia or recent blood loss, rather than true hypoglycemia. They can also appear in people with certain hemoglobin variants or after aggressive diabetes treatment. Symptoms like fatigue or pallor often reflect the underlying blood disorder rather than low sugar itself."
          },
          {
            "type": "h4",
            "text": "When HbA1c climbs above normal"
          },
          {
            "type": "p",
            "text": "Elevated HbA1c means glucose has been lingering too long in your bloodstream, bathing nerves, blood vessels, kidneys, and eyes in a damaging sugar coat. Over time, this drives microvascular injury - retinopathy, neuropathy, nephropathy - and accelerates atherosclerosis in larger arteries. Fatigue, thirst, frequent urination, and blurred vision emerge as the body struggles with chronic fuel overload."
          },
          {
            "type": "h4",
            "text": "The metabolic mirror"
          },
          {
            "type": "p",
            "text": "HbA1c connects insulin resistance, pancreatic beta-cell function, liver glucose output, and tissue fuel uptake into one number. It predicts cardiovascular events, kidney decline, and even cognitive aging, making it a cornerstone of long-term metabolic surveillance."
          }
        ]
      },
      {
        "heading": "What do my Hemoglobin A1c (HbA1c) results mean?",
        "content": [
          {
            "type": "h4",
            "text": "Low HbA1c values"
          },
          {
            "type": "p",
            "text": "Low values usually reflect consistently low average blood glucose over the past two to three months. This can occur with frequent hypoglycemia, certain anemias that shorten red blood cell lifespan, recent significant blood loss, or hemoglobin variants that interfere with measurement. Very low HbA1c may signal inadequate glucose availability to tissues or overly aggressive glucose lowering in treated individuals."
          },
          {
            "type": "h4",
            "text": "Optimal HbA1c values"
          },
          {
            "type": "p",
            "text": "Being in range suggests stable glucose metabolism with balanced insulin function and appropriate cellular glucose uptake. For most adults without diabetes, optimal values sit below 5.7 percent, reflecting consistent euglycemia. This range supports steady energy delivery, preserved vascular endothelial function, and minimal glycation of proteins throughout the body."
          },
          {
            "type": "h4",
            "text": "High HbA1c values"
          },
          {
            "type": "p",
            "text": "High values usually reflect sustained elevation of blood glucose, indicating impaired insulin secretion, insulin resistance, or both. Values between 5.7 and 6.4 percent suggest prediabetes with increased risk for progression. Values at or above 6.5 percent typically confirm diabetes. Chronic hyperglycemia drives nonenzymatic glycation of hemoglobin and other proteins, contributing to microvascular and macrovascular complications over time."
          },
          {
            "type": "h4",
            "text": "Factors that influence HbA1c interpretation"
          },
          {
            "type": "p",
            "text": "HbA1c reflects average glucose exposure over the lifespan of circulating red blood cells, typically 120 days. Conditions that alter red cell turnover, such as hemolytic anemia, chronic kidney disease, or recent transfusion, can yield misleading results. Hemoglobin variants and iron deficiency may also affect accuracy depending on assay methodology."
          }
        ]
      }
    ]
  },
  {
    "slug": "high-sensitivity-c-reactive-protein-hs-crp-test",
    "title": "hs-CRP: Best Biomarkers to Monitor | Test With Superpower",
    "metaDescription": "Worried about heart disease risk? Learn which biomarkers to test alongside your hs-CRP test to understand inflammation and protect your heart health. Test with Superpower today.",
    "h1": "High-Sensitivity C-Reactive Protein (hs-CRP) Testing",
    "category": "Inflammation",
    "categorySlug": "inflammation",
    "date": "March 25, 2026",
    "medicalTestDescription": "Measure your hs-CRP with Superpower.",
    "medicalWebPageDescription": "A marker of inflammation; elevated levels increase risk of heart disease and other inflammatory conditions.",
    "methodNote": "Method: FDA-cleared clinical laboratory assay performed in CLIA-certified, CAP-accredited laboratories. Used to aid clinician-directed evaluation and monitoring. Not a stand-alone diagnosis.",
    "sections": [
      {
        "heading": "Do I need a High-Sensitivity C-Reactive Protein (hs-CRP) test?",
        "content": [
          {
            "type": "p",
            "text": "Worried about unexplained fatigue, joint discomfort, or your heart health risk? Could hidden inflammation be affecting your body, and might an hs-CRP test reveal what's happening beneath the surface?"
          },
          {
            "type": "p",
            "text": "hs-CRP measures subtle levels of inflammation in your body, particularly around your blood vessels and heart. Elevated levels can signal increased cardiovascular risk even before symptoms appear."
          },
          {
            "type": "p",
            "text": "Testing your hs-CRP gives you a vital snapshot of your inflammatory status, empowering you to personalize your nutrition, exercise, and lifestyle strategies to address the root causes behind fatigue, discomfort, and long-term heart health concerns. Getting tested is your first step toward targeted action."
          }
        ]
      },
      {
        "heading": "Get tested with Superpower",
        "content": [
          {
            "type": "p",
            "html": "<strong>If you’ve been postponing blood testing for years or feel frustrated by doctor appointments and limited lab panels, you are not alone.</strong> Standard healthcare is often reactive, focusing on testing only after symptoms appear or leaving patients in the dark."
          },
          {
            "type": "p",
            "html": "Superpower flips that approach. We give you full insight into your body with over <strong>100 biomarkers</strong>, personalized action plans, long-term tracking, and answers to your questions, so you can stay ahead of any health issues."
          },
          {
            "type": "p",
            "html": "With on-demand access to a care team, CLIA-certified labs, and the option for at-home blood draws, Superpower is <a href=\"/reviews\">designed for people</a> who want clarity, convenience, and real accountability - all in one place."
          }
        ]
      },
      {
        "heading": "Key benefits of High-Sensitivity C-Reactive Protein (hs-CRP) testing",
        "content": [
          {
            "type": "ul",
            "items": [
              "Measures low-grade inflammation linked to heart disease and metabolic stress.",
              "Flags cardiovascular risk years before symptoms appear in healthy adults.",
              "Guides statin therapy decisions when cholesterol results fall in borderline zones.",
              "Tracks whether lifestyle changes or treatments are lowering chronic inflammation.",
              "Explains fatigue, joint pain, or brain fog tied to systemic inflammation.",
              "Spots hidden inflammation affecting fertility, ovulation, and hormone balance.",
              "Monitors autoimmune or inflammatory conditions to assess disease activity over time.",
              "Best interpreted with lipid panel, glucose markers, and your clinical history."
            ]
          }
        ]
      },
      {
        "heading": "What is High-Sensitivity C-Reactive Protein (hs-CRP)?",
        "content": [
          {
            "type": "h4",
            "text": "Your liver's smoke alarm for inflammation"
          },
          {
            "type": "p",
            "text": "High-sensitivity C-reactive protein (hs-CRP) is a protein produced by your liver in response to inflammation anywhere in your body. When tissues are injured, infected, or stressed, immune cells release chemical signals called cytokines that travel through your bloodstream to the liver. The liver responds by ramping up production of CRP and releasing it into circulation."
          },
          {
            "type": "h4",
            "text": "A window into chronic, low-grade inflammation"
          },
          {
            "type": "p",
            "text": "Unlike standard CRP tests that detect acute infections or major injuries, the hs-CRP test measures very small amounts of this protein. This makes it especially useful for detecting subtle, chronic inflammation that may be silently damaging blood vessels and contributing to heart disease. Even slightly elevated hs-CRP levels can signal ongoing inflammatory processes linked to atherosclerosis, metabolic dysfunction, and cardiovascular risk."
          },
          {
            "type": "h4",
            "text": "Why sensitivity matters"
          },
          {
            "type": "p",
            "text": "The \"high-sensitivity\" aspect allows doctors to spot inflammation at levels far below what older tests could detect. This precision helps identify people at increased risk for heart attacks and strokes before obvious symptoms appear."
          }
        ]
      },
      {
        "heading": "Why is High-Sensitivity C-Reactive Protein (hs-CRP) important?",
        "content": [
          {
            "type": "p",
            "text": "High-sensitivity C-reactive protein measures low-grade inflammation circulating throughout your body, offering a window into vascular health and metabolic stress that standard tests often miss. Your liver produces CRP in response to inflammatory signals from blood vessels, fat tissue, and immune cells. Values below 1 mg/L suggest minimal systemic inflammation, 1 to 3 mg/L indicates moderate risk, and above 3 mg/L reflects higher inflammatory burden."
          },
          {
            "type": "h4",
            "text": "What very low inflammation tells you"
          },
          {
            "type": "p",
            "text": "When hs-CRP sits well below 1 mg/L, your cardiovascular system typically operates with minimal inflammatory stress. Blood vessel linings remain stable, and metabolic pathways function smoothly. This range correlates with lower long-term risk for heart attack and stroke, independent of cholesterol levels."
          },
          {
            "type": "h4",
            "text": "When inflammation starts signaling trouble"
          },
          {
            "type": "p",
            "text": "Elevated hs-CRP above 3 mg/L points to active inflammation affecting artery walls, metabolic tissues, or both. This state accelerates plaque formation in coronary arteries and destabilizes existing deposits. You may feel entirely well, as chronic low-grade inflammation rarely causes immediate symptoms, yet it silently raises cardiovascular event risk over years."
          },
          {
            "type": "h4",
            "text": "The bigger inflammatory picture"
          },
          {
            "type": "p",
            "text": "hs-CRP connects cardiovascular risk to metabolic health, linking conditions like insulin resistance, obesity, and autoimmune activity. Women often show slightly higher baseline values, and levels can spike dramatically during pregnancy or acute illness. Tracking this biomarker helps identify hidden inflammatory processes before they manifest as clinical disease, making it a powerful tool for long-term risk assessment."
          }
        ]
      },
      {
        "heading": "What do my High-Sensitivity C-Reactive Protein (hs-CRP) results mean?",
        "content": [
          {
            "type": "h4",
            "text": "Low hs-CRP values"
          },
          {
            "type": "p",
            "text": "Low values usually reflect minimal systemic inflammation and a low burden of vascular stress. The liver produces CRP in response to inflammatory signals, so consistently low levels suggest that immune activation and tissue injury are minimal. This is generally favorable for cardiovascular and metabolic health, as chronic low-grade inflammation is linked to atherosclerosis and insulin resistance."
          },
          {
            "type": "h4",
            "text": "Optimal hs-CRP values"
          },
          {
            "type": "p",
            "text": "Being in range suggests a stable inflammatory baseline without significant ongoing tissue damage or immune activation. For cardiovascular risk stratification, optimal typically sits at the lower end of the reference range. Many labs define low risk as below 1 milligram per liter, moderate risk between 1 and 3, and high risk above 3, though these thresholds reflect population-based cardiovascular outcomes rather than disease presence."
          },
          {
            "type": "h4",
            "text": "High hs-CRP values"
          },
          {
            "type": "p",
            "text": "High values usually reflect active systemic inflammation, which may arise from infection, autoimmune activity, tissue injury, obesity, or chronic conditions like metabolic syndrome. Elevated hs-CRP indicates that the liver is responding to circulating inflammatory cytokines such as interleukin-6. Persistently high levels are associated with increased cardiovascular risk and may signal underlying processes that promote endothelial dysfunction and plaque instability."
          },
          {
            "type": "h4",
            "text": "Factors that influence hs-CRP"
          },
          {
            "type": "p",
            "text": "Results can be transiently elevated during acute illness, after surgery, or with recent injury. Pregnancy, smoking, and certain medications may also raise levels. A single elevated result warrants repeat testing to distinguish chronic inflammation from temporary spikes."
          }
        ]
      }
    ]
  }
];

export function getBiomarkerBySlug(slug: string): BiomarkerDetail | undefined {
  return biomarkerDetails.find((b) => b.slug === slug);
}

export function getAllBiomarkerSlugs(): string[] {
  return biomarkerDetails.map((b) => b.slug);
}
