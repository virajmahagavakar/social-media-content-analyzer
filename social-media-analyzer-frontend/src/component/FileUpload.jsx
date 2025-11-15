import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../services/api";
import { Circles } from "react-loader-spinner";
import AnalysisResult from "./AnalysisResult";

export default function FileUpload() {
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("");

  const onDrop = async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError("Invalid file type. Only PDF, JPG, PNG allowed.");
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setError(null);
    setAnalysisData(null);

    try {
      const data = await uploadFile(file);
      setAnalysisData(data);
    } catch (err) {
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-indigo-50/30 py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Hero Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-slate-700 via-teal-700 to-indigo-700 bg-clip-text text-transparent tracking-tight leading-tight">
            Social Media Content Analyzer
          </h1>
          <p className="text-xl md:text-3xl font-light text-slate-600 mt-6 tracking-wide max-w-4xl mx-auto">
            Upload an image or PDF to <span className="font-semibold text-teal-700">extract and analyze text with AI</span>
          </p>
        </div>

        {/* Centered Upload Card */}
        <div className="flex justify-center">
          <div
            {...getRootProps()}
            className={`
              relative group w-full max-w-3xl h-80 
              bg-white/80 backdrop-blur-2xl 
              rounded-3xl p-10 shadow-2xl 
              border-3 border-dashed border-slate-300
              cursor-pointer transition-all duration-400 ease-out
              ${isDragActive 
                ? "border-teal-500 bg-teal-50/70 shadow-3xl scale-105 ring-4 ring-teal-300/30" 
                : "hover:border-teal-400 hover:bg-teal-50/40 hover:shadow-3xl hover:scale-[1.02]"
              }
            `}
          >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">

              {/* Upload Icon with Glow */}
              <div className={`
                p-6 rounded-full 
                bg-gradient-to-br from-teal-100 to-emerald-100 
                shadow-lg 
                group-hover:shadow-2xl group-hover:scale-110 
                transition-all duration-300
                ${isDragActive ? "ring-8 ring-teal-300/40" : ""}
              `}>
                <svg className="w-14 h-14 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>

              {/* Upload Text */}
              <div>
                <p className="text-2xl font-bold text-slate-800">
                  {isDragActive ? "Drop your file here" : "Drag & drop your file"}
                </p>
                <p className="text-lg text-slate-600 mt-2">
                  or <span className="text-teal-600 font-semibold underline decoration-2 underline-offset-2">click to browse</span>
                </p>
                <p className="text-sm text-slate-500 mt-4 font-medium">
                  Supports: <span className="text-teal-700">PDF • JPG • PNG</span>
                </p>
              </div>
            </div>

            {/* Subtle Glow on Hover */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 via-emerald-400/20 to-indigo-400/30 blur-3xl"></div>
            </div>
          </div>
        </div>

        {/* File Name */}
        {fileName && !loading && !analysisData && (
          <div className="text-center mt-8">
            <p className="text-lg text-slate-700">
              Selected: <span className="font-semibold text-teal-700">{fileName}</span>
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center mt-16 py-12">
            <Circles height="100" width="100" color="#14b8a6" ariaLabel="analyzing" />
            <p className="text-2xl font-bold text-teal-700 mt-8">Analyzing content...</p>
            <p className="text-lg text-slate-600 mt-3">Extracting text and running AI analysis</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="max-w-3xl mx-auto mt-10 p-6 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-3xl shadow-lg">
            <p className="text-red-700 font-semibold text-center text-lg">{error}</p>
          </div>
        )}

        {/* Analysis Result */}
        {analysisData && (
          <div className="mt-20">
            <AnalysisResult data={analysisData} />
          </div>
        )}
      </div>
    </div>
  );
}