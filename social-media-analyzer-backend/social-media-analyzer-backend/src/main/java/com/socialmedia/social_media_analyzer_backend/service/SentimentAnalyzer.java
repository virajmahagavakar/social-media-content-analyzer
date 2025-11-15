package com.socialmedia.social_media_analyzer_backend.service;

import edu.stanford.nlp.pipeline.*;
import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.util.CoreMap;
import org.springframework.stereotype.Service;
import edu.stanford.nlp.sentiment.SentimentCoreAnnotations;


import java.util.*;

@Service
public class SentimentAnalyzer {

    private final StanfordCoreNLP pipeline;

    public SentimentAnalyzer() {
        Properties props = new Properties();
        props.setProperty("annotators", "tokenize,ssplit,pos,parse,sentiment");
        this.pipeline = new StanfordCoreNLP(props);
    }

    public Map<String, Integer> analyzeSentiment(String text) {
        int positive = 0, negative = 0, neutral = 0;

        CoreDocument document = new CoreDocument(text);
        pipeline.annotate(document);

        for (CoreMap sentence : document.annotation().get(CoreAnnotations.SentencesAnnotation.class)) {
            String sentiment = sentence.get(SentimentCoreAnnotations.SentimentClass.class);
            switch (sentiment) {
                case "Very positive", "Positive" -> positive++;
                case "Very negative", "Negative" -> negative++;
                default -> neutral++;
            }
        }

        return Map.of("positive", positive, "negative", negative, "neutral", neutral);
    }
}
