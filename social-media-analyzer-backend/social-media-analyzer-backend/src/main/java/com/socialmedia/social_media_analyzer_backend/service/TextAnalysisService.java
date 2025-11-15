package com.socialmedia.social_media_analyzer_backend.service;

import com.socialmedia.social_media_analyzer_backend.model.AnalysisResult;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class TextAnalysisService {

    public AnalysisResult analyzeText(String text) {
        if (text == null || text.isBlank()) {
            return new AnalysisResult("error", "Empty text", new ArrayList<>(), new HashMap<>(), new HashMap<>(), 0, 0, "");
        }

        // Split words and count frequency
        String[] rawWords = text.split("\\W+");
        Map<String, Integer> wordFrequency = new HashMap<>();
        List<String> keywords = new ArrayList<>();
        for (String w : rawWords) {
            String word = w.toLowerCase();
            if (!word.isBlank()) {
                wordFrequency.put(word, wordFrequency.getOrDefault(word, 0) + 1);
                if (!keywords.contains(word)) keywords.add(word);
            }
        }

        // Emojis
        Pattern emojiPattern = Pattern.compile("[\\p{So}\\p{Cn}]", Pattern.UNICODE_CHARACTER_CLASS);
        Matcher emojiMatcher = emojiPattern.matcher(text);
        int emojiCount = 0;
        while (emojiMatcher.find()) emojiCount++;

        // Hashtags
        Pattern hashtagPattern = Pattern.compile("#\\w+");
        Matcher hashtagMatcher = hashtagPattern.matcher(text);
        int hashtagCount = 0;
        while (hashtagMatcher.find()) hashtagCount++;

        // Simple sentiment
        int positive = 0, negative = 0;
        String[] positiveWords = {"good", "happy", "great", "excellent", "love"};
        String[] negativeWords = {"bad", "sad", "hate", "poor", "worst"};
        for (String w : rawWords) {
            String word = w.toLowerCase();
            if (Arrays.asList(positiveWords).contains(word)) positive++;
            if (Arrays.asList(negativeWords).contains(word)) negative++;
        }
        Map<String, Integer> sentimentCount = Map.of("positive", positive, "negative", negative);

        return new AnalysisResult("success", "Analysis completed", keywords, sentimentCount, wordFrequency, emojiCount, hashtagCount, text);
    }
}
