package com.socialmedia.social_media_analyzer_backend.model;

import java.util.List;
import java.util.Map;

public class AnalysisResult {
    private String status;
    private String message;
    private List<String> keywords;
    private Map<String, Integer> sentimentCount;
    private Map<String, Integer> wordFrequency;
    private int emojiCount;
    private int hashtagCount;
    private String extractedText;

    public AnalysisResult() {}

    public AnalysisResult(String status, String message, List<String> keywords,
                          Map<String, Integer> sentimentCount, Map<String, Integer> wordFrequency,
                          int emojiCount, int hashtagCount, String extractedText) {
        this.status = status;
        this.message = message;
        this.keywords = keywords;
        this.sentimentCount = sentimentCount;
        this.wordFrequency = wordFrequency;
        this.emojiCount = emojiCount;
        this.hashtagCount = hashtagCount;
        this.extractedText = extractedText;
    }

    // Getters & setters for all fields
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public List<String> getKeywords() { return keywords; }
    public void setKeywords(List<String> keywords) { this.keywords = keywords; }

    public Map<String, Integer> getSentimentCount() { return sentimentCount; }
    public void setSentimentCount(Map<String, Integer> sentimentCount) { this.sentimentCount = sentimentCount; }

    public Map<String, Integer> getWordFrequency() { return wordFrequency; }
    public void setWordFrequency(Map<String, Integer> wordFrequency) { this.wordFrequency = wordFrequency; }

    public int getEmojiCount() { return emojiCount; }
    public void setEmojiCount(int emojiCount) { this.emojiCount = emojiCount; }

    public int getHashtagCount() { return hashtagCount; }
    public void setHashtagCount(int hashtagCount) { this.hashtagCount = hashtagCount; }

    public String getExtractedText() { return extractedText; }
    public void setExtractedText(String extractedText) { this.extractedText = extractedText; }
}
