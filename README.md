# PolicyBazaar AI Insurance Advisor

A product teardown prototype — an AI-powered insurance advisor that replaces PolicyBazaar's comparison-first experience with a conversation-first one.

**Live Demo:** [pb-insurance-advisor.vercel.app](https://pb-insurance-advisor.vercel.app/)

---

## Core Product Insight

PolicyBazaar has solved **distribution** (50+ insurers, thousands of plans) but not **decision-making**. Users see 80 plans sorted by price and freeze. The current experience assumes users know what coverage they need — most don't.

This prototype flips the model: instead of "compare plans", it asks "tell me about your life" and recommends the right coverage amount and specific policies with reasoning.

## What It Does

1. User picks Health Insurance or Term Life Insurance
2. AI advisor asks 7 questions conversationally (in Hinglish)
3. Calculates coverage using real heuristics — income multipliers, city tier, family size, existing cover, pre-existing conditions
4. Recommends 3 real policies with premiums, features, and personalised fit reasons
5. User can schedule a callback or download the recommendation

## Why Hinglish

PolicyBazaar's core users are middle-income Indians who think about money in Hindi but search in English. Hinglish mirrors how they actually discuss insurance — reduces cognitive load and builds trust. This is a deliberate product decision backed by user behavior patterns in Tier 1-3 India.

## Recommendation Logic

**Health Insurance**
- Base = annual income × 4
- City adjustment: Tier 1 metro × 1.3, Tier 2 × 1.0, Tier 3 × 0.8
- Family: +20% per additional member
- Age: +25% for 40+, +50% for 50+
- Pre-existing conditions: +20%, prioritise low waiting period policies
- Minimum ₹5L individual, ₹10L metro family

**Term Life Insurance**
- Base = annual income × 12
- Dependents: spouse only × 10, spouse + kids × 15, parents too × 18
- Add outstanding loan amounts
- Subtract existing life cover
- Minimum ₹50L

**Policy selection priority:** Claim settlement ratio → no room rent cap → restoration benefit → no co-pay → network hospitals → PED waiting period → premium value

## Tech Stack

React 18 + Vite · Tailwind CSS 4 · Groq API (Llama 3.3 70B) · Vercel · Lucide React

No backend — single-page app with direct LLM API calls.

## Built By

**Manav** — AI Product Manager
[Portfolio](https://manav-portfolio-jade.vercel.app)