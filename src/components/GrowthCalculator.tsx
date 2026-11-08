import React, { useState, useId } from 'react';
import { motion } from 'motion/react';
import { Calculator, DollarSign, TrendingUp, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from './ui/Container';
import Section from './ui/Section';

interface CurrencyConfig {
  code: string;
  label: string;
  symbol: string;
  defaultSpend: number;
  minSpend: number;
  maxSpend: number;
  step: number;
}

const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: {
    code: 'USD',
    label: 'USD ($)',
    symbol: '$',
    defaultSpend: 25000,
    minSpend: 5000,
    maxSpend: 150000,
    step: 5000,
  },
  EUR: {
    code: 'EUR',
    label: 'EUR (€)',
    symbol: '€',
    defaultSpend: 22000,
    minSpend: 4500,
    maxSpend: 130000,
    step: 4500,
  },
  GBP: {
    code: 'GBP',
    label: 'GBP (£)',
    symbol: '£',
    defaultSpend: 20000,
    minSpend: 4000,
    maxSpend: 120000,
    step: 4000,
  },
  CAD: {
    code: 'CAD',
    label: 'CAD (C$)',
    symbol: 'C$',
    defaultSpend: 30000,
    minSpend: 6000,
    maxSpend: 180000,
    step: 6000,
  },
  AUD: {
    code: 'AUD',
    label: 'AUD (A$)',
    symbol: 'A$',
    defaultSpend: 35000,
    minSpend: 7000,
    maxSpend: 200000,
    step: 7000,
  },
};

type BusinessModel = 'b2b_saas' | 'services' | 'ecommerce';

interface ModelMultiplier {
  label: string;
  roasRange: string;
  multiplier: number;
  cacReduction: string;
}

const BUSINESS_MODELS: Record<BusinessModel, ModelMultiplier> = {
  b2b_saas: {
    label: 'B2B SaaS / Tech',
    roasRange: '4.2x – 5.8x',
    multiplier: 4.6,
    cacReduction: '34%',
  },
  services: {
    label: 'High-Ticket Services',
    roasRange: '3.8x – 4.9x',
    multiplier: 4.2,
    cacReduction: '28%',
  },
  ecommerce: {
    label: 'E-Commerce / D2C',
    roasRange: '3.5x – 4.5x',
    multiplier: 3.9,
    cacReduction: '25%',
  },
};

export const GrowthCalculator: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [model, setModel] = useState<BusinessModel>('b2b_saas');
  
  const curr = CURRENCIES[selectedCurrency];
  const [spend, setSpend] = useState<number>(curr.defaultSpend);
  const [currentConversionRate, setCurrentConversionRate] = useState<number>(1.8);
  const spendSliderId = useId();
  const crSliderId = useId();

  const handleCurrencyChange = (cKey: string) => {
    setSelectedCurrency(cKey);
    setSpend(CURRENCIES[cKey].defaultSpend);
  };

  const modelInfo = BUSINESS_MODELS[model];

  // Calculations
  const relativeLift = 0.52;
  const projectedConversionRate = Number((currentConversionRate * (1 + relativeLift)).toFixed(1));
  const projectedPipelineValue = Math.round(spend * modelInfo.multiplier);
  const incrementalRevenue = Math.round(projectedPipelineValue * 0.35);

  const formatCurrency = (val: number) => {
    return `${curr.symbol}${val.toLocaleString()}`;
  };

  return (
    <Section id="growth-calculator" padding="md" background="default">
      <Container>
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-brand-primary tracking-wider uppercase">
            <span>ROI Model</span>
            <span aria-hidden="true">·</span>
            <span>Quantitative Revenue Estimator</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-brand-text-heading font-display tracking-tight">
            Calculate Your <span className="brand-gradient-text">Revenue Expansion.</span>
          </h2>

          <p className="text-brand-text-secondary text-sm md:text-base font-medium font-sans">
            Forecast the pipeline impact of integrating multi-channel acquisition with high-yield conversion architecture.
          </p>
        </div>

        {/* Compact Cockpit Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch max-w-5xl mx-auto">
          {/* Inputs Column */}
          <div className="lg:col-span-7 core-card p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Currency Selector (No Country Words) */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/50 font-semibold mb-2">
                  Operating Currency
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(CURRENCIES).map((cKey) => {
                    const c = CURRENCIES[cKey];
                    const isActive = selectedCurrency === cKey;
                    return (
                      <button
                        key={cKey}
                        onClick={() => handleCurrencyChange(cKey)}
                        className={`py-1.5 px-3 rounded-lg text-xs font-mono transition-all border ${
                          isActive
                            ? 'bg-brand-primary/20 border-brand-primary text-white font-bold shadow-sm'
                            : 'bg-white/[0.02] border-white/10 text-white/70 hover:bg-white/[0.05]'
                        }`}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Model Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/50 font-semibold mb-2">
                  Business Model
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(BUSINESS_MODELS) as BusinessModel[]).map((mKey) => {
                    const m = BUSINESS_MODELS[mKey];
                    const isActive = model === mKey;
                    return (
                      <button
                        key={mKey}
                        onClick={() => setModel(mKey)}
                        className={`p-2.5 rounded-lg border text-xs font-medium text-left transition-all ${
                          isActive
                            ? 'bg-brand-primary/10 border-brand-primary text-white'
                            : 'bg-white/[0.02] border-white/5 text-white/60 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="font-bold truncate">{m.label}</div>
                        <div className="text-[10px] text-brand-primary font-mono">{m.roasRange}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Monthly Ad Spend Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor={spendSliderId} className="text-xs font-mono uppercase tracking-wider text-white/50 font-semibold">
                    Target Monthly Media Spend
                  </label>
                  <span className="text-base font-bold font-mono text-brand-primary tabular-nums">
                    {formatCurrency(spend)}/mo
                  </span>
                </div>
                <input
                  id={spendSliderId}
                  type="range"
                  min={curr.minSpend}
                  max={curr.maxSpend}
                  step={curr.step}
                  value={spend}
                  onChange={(e) => setSpend(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF5500]"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/40">
                  <span>{formatCurrency(curr.minSpend)}</span>
                  <span>{formatCurrency(curr.maxSpend / 2)}</span>
                  <span>{formatCurrency(curr.maxSpend)}+</span>
                </div>
              </div>

              {/* Funnel Conversion Rate Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor={crSliderId} className="text-xs font-mono uppercase tracking-wider text-white/50 font-semibold">
                    Current Visitor Conversion Rate
                  </label>
                  <span className="text-base font-bold font-mono text-white tabular-nums">
                    {currentConversionRate}%
                  </span>
                </div>
                <input
                  id={crSliderId}
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={currentConversionRate}
                  onChange={(e) => setCurrentConversionRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF5500]"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/40">
                  <span>0.5% (Baseline)</span>
                  <span>2.5% (Average)</span>
                  <span>5.0% (Optimized)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-white/40 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-primary shrink-0" />
              <span>Calibrated against data across 140+ active client engagements.</span>
            </div>
          </div>

          {/* Outputs Column */}
          <div className="lg:col-span-5 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-[#120F0D] via-[#0D0B0A] to-[#0A0705] border border-brand-primary/30 shadow-xl shadow-brand-primary/10 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="text-xs font-mono uppercase tracking-wider text-brand-primary font-bold pb-3 border-b border-white/10 flex justify-between items-center">
                <span>Estimated 90-Day Impact</span>
                <span className="text-white/40 font-normal">{curr.code}</span>
              </div>

              {/* Primary Output */}
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider">
                  Projected Qualified Pipeline
                </div>
                <div className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight font-mono tabular-nums">
                  {formatCurrency(projectedPipelineValue)}
                </div>
                <div className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{modelInfo.cacReduction} Efficiency Lift</span>
                </div>
              </div>

              {/* Sub-Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] font-mono uppercase text-white/40">Target ROAS</div>
                  <div className="text-base font-bold font-mono text-brand-primary mt-0.5 tabular-nums">
                    {modelInfo.roasRange}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] font-mono uppercase text-white/40">Optimized Rate</div>
                  <div className="text-base font-bold font-mono text-white mt-0.5 tabular-nums">
                    {projectedConversionRate}%
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 col-span-2">
                  <div className="text-[10px] font-mono uppercase text-white/40">Est. Incremental Revenue via CRO</div>
                  <div className="text-lg font-bold font-mono text-white mt-0.5 tabular-nums">
                    +{formatCurrency(incrementalRevenue)}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="w-full py-3 px-4 rounded-xl bg-brand-primary hover:bg-[#E63900] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-primary/20 group"
              >
                <span>Book Strategy Session</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default GrowthCalculator;
