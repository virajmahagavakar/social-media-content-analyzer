import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Elegant chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        padding: 28,
        font: { size: 13, family: "'Inter', sans-serif", weight: 500 },
        color: "#475569",
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
    tooltip: {
      backgroundColor: "rgba(15, 23, 42, 0.96)",
      titleFont: { family: "'Inter', sans-serif", size: 14, weight: "600" },
      bodyFont: { family: "'Inter', sans-serif", size: 13 },
      padding: 16,
      cornerRadius: 14,
      borderColor: "rgba(148, 163, 184, 0.25)",
      borderWidth: 1,
      displayColors: true,
      boxPadding: 8,
    },
  },
  animation: {
    duration: 1600,
    easing: "easeOutCubic",
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: "#64748b", font: { size: 12 } } },
    y: { grid: { color: "rgba(241, 245, 249, 0.6)", borderDash: [6, 6] }, ticks: { color: "#64748b", font: { size: 12 } } },
  },
};

export default function AnalysisResult({ data }) {
  const analysis = data?.data || data || {};

  const {
    extractedText = "",
    keywords = [],
    sentimentCount = { positive: 0, negative: 0, neutral: 0 },
    wordFrequency = {},
    emojiCount = 0,
    hashtagCount = 0,
  } = analysis;

  const pieChartData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        label: "Sentiment",
        data: [sentimentCount.positive || 0, sentimentCount.negative || 0, sentimentCount.neutral || 0],
        backgroundColor: ["#86efac", "#fca5a5", "#fde68a"],
        borderColor: ["#22c55e", "#ef4444", "#f59e0b"],
        borderWidth: 3,
        hoverOffset: 20,
        borderRadius: 10,
      },
    ],
  };

  const topKeywords = Object.entries(wordFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const barData = {
    labels: topKeywords.map(([key]) => key),
    datasets: [
      {
        label: "Frequency",
        data: topKeywords.map(([, value]) => value),
        backgroundColor: "rgba(99, 102, 241, 0.18)",
        borderColor: "#6366f1",
        borderWidth: 2.5,
        borderRadius: 10,
        borderSkipped: false,
        barThickness: 18,
        maxBarThickness: 22,
        hoverBackgroundColor: "rgba(99, 102, 241, 0.28)",
      },
    ],
  };

  const hasSentiment = sentimentCount.positive + sentimentCount.negative + (sentimentCount.neutral || 0) > 0;
  const hasKeywords = topKeywords.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-indigo-50/20 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 bg-clip-text text-transparent tracking-tight">
            Text Analysis Insights
          </h1>
          <p className="text-slate-500 mt-4 text-base md:text-lg font-light tracking-wide">
            Precision sentiment, linguistic depth, and intelligent patterns
          </p>
        </div>

        {/* 1. Extracted Text – Soft Slate Box */}
        <div className="bg-gradient-to-br from-slate-100/90 to-slate-50/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-slate-800 mb-5 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-slate-500 to-slate-700 rounded-full mr-3"></span>
            Extracted Text
          </h3>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 font-mono text-sm text-slate-700 leading-relaxed h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300">
            {extractedText || <span className="text-slate-400 italic">No text available for analysis.</span>}
          </div>
        </div>

        {/* 2. Key Phrases – Emerald Box */}
        <div className="bg-gradient-to-br from-emerald-100/90 to-emerald-50/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-emerald-800 mb-5 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full mr-3"></span>
            Key Phrases
          </h3>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-emerald-700 font-medium text-base leading-relaxed">
              {keywords.length > 0 ? keywords.join("  •  ") : "No keywords detected."}
            </p>
          </div>
        </div>

        {/* 3. Charts Grid – Teal & Indigo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Sentiment Pie – Teal Box */}
          <div className="bg-gradient-to-br from-teal-100/90 to-teal-50/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-teal-800 mb-6 text-center tracking-wide">
              Sentiment Distribution
            </h3>
            <div className="h-96">
              {hasSentiment ? (
                <Pie data={pieChartData} options={chartOptions} />
              ) : (
                <div className="h-full flex items-center justify-center text-teal-500 text-sm">
                  No sentiment data available
                </div>
              )}
            </div>
          </div>

          {/* Keyword Bar – Indigo Box */}
          <div className="bg-gradient-to-br from-indigo-100/90 to-indigo-50/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-indigo-800 mb-6 text-center tracking-wide">
              Top 10 Keywords
            </h3>
            <div className="h-96">
              {hasKeywords ? (
                <Bar data={barData} options={chartOptions} />
              ) : (
                <div className="h-full flex items-center justify-center text-indigo-500 text-sm">
                  No keyword frequency data
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. Stats Summary – Four Colored Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {/* Keywords */}
          <div className="bg-gradient-to-br from-slate-100/95 to-slate-50/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <p className="text-4xl font-bold text-slate-800">{keywords.length}</p>
            <p className="text-xs text-slate-600 font-medium mt-2 tracking-widest">KEYWORDS</p>
          </div>

          {/* Unique Words */}
          <div className="bg-gradient-to-br from-indigo-100/95 to-indigo-50/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <p className="text-4xl font-bold text-indigo-700">{Object.keys(wordFrequency).length}</p>
            <p className="text-xs text-indigo-600 font-medium mt-2 tracking-widest">UNIQUE WORDS</p>
          </div>

          {/* Emojis */}
          <div className="bg-gradient-to-br from-amber-100/95 to-amber-50/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <p className="text-4xl font-bold text-amber-700">{emojiCount}</p>
            <p className="text-xs text-amber-600 font-medium mt-2 tracking-widest">EMOJIS</p>
          </div>

          {/* Hashtags */}
          <div className="bg-gradient-to-br from-purple-100/95 to-purple-50/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <p className="text-4xl font-bold text-purple-700">{hashtagCount}</p>
            <p className="text-xs text-purple-600 font-medium mt-2 tracking-widest">HASHTAGS</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 mt-12 border-t border-slate-200/40">
          <p className="text-xs text-slate-400 font-light tracking-widest">
            POWERED BY ADVANCED NLP • REAL-TIME LINGUISTIC INTELLIGENCE
          </p>
        </div>
      </div>
    </div>
  );
}