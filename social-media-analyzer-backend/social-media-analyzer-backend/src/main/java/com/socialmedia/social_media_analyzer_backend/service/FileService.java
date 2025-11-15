package com.socialmedia.social_media_analyzer_backend.service;

import com.socialmedia.social_media_analyzer_backend.model.AnalysisResult;
import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class FileService {

    @Autowired
    private SentimentAnalyzer sentimentAnalyzer; // <-- Inject the ML-based analyzer

    public AnalysisResult analyzeFile(MultipartFile file) throws IOException, TesseractException {
        String fileName = file.getOriginalFilename();
        if (fileName == null || fileName.isBlank()) throw new IOException("Invalid file name.");

        String extractedText = "";

        ITesseract tesseract = new Tesseract();
        tesseract.setDatapath("tessdata"); // tessdata folder path
        tesseract.setLanguage("eng");

        if (fileName.toLowerCase().endsWith(".pdf")) {
            try (PDDocument document = PDDocument.load(file.getInputStream())) {
                PDFTextStripper stripper = new PDFTextStripper();
                extractedText = stripper.getText(document).trim();

                // If PDF has no text (scanned PDF)
                if (extractedText.isEmpty()) {
                    PDFRenderer renderer = new PDFRenderer(document);
                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < document.getNumberOfPages(); i++) {
                        BufferedImage pageImage = renderer.renderImageWithDPI(i, 300);
                        sb.append(tesseract.doOCR(pageImage)).append("\n");
                    }
                    extractedText = sb.toString().trim();
                }
            }
        } else {
            // Image file
            BufferedImage image = ImageIO.read(file.getInputStream());
            if (image == null) throw new IOException("Invalid image format.");
            extractedText = tesseract.doOCR(image).trim();
        }

        // Word frequency & keywords
        Map<String, Integer> wordFrequency = new HashMap<>();
        List<String> keywords = new ArrayList<>();
        String[] words = extractedText.toLowerCase().split("\\W+");
        for (String w : words) {
            if (w.isBlank()) continue;
            wordFrequency.put(w, wordFrequency.getOrDefault(w, 0) + 1);
            if (!keywords.contains(w)) keywords.add(w);
        }

        // Emojis
        Pattern emojiPattern = Pattern.compile("[\\p{So}\\p{Cn}]", Pattern.UNICODE_CHARACTER_CLASS);
        Matcher emojiMatcher = emojiPattern.matcher(extractedText);
        int emojiCount = 0;
        while (emojiMatcher.find()) emojiCount++;

        // Hashtags
        Pattern hashtagPattern = Pattern.compile("#\\w+");
        Matcher hashtagMatcher = hashtagPattern.matcher(extractedText);
        int hashtagCount = 0;
        while (hashtagMatcher.find()) hashtagCount++;

        // ✅ Use the ML-based SentimentAnalyzer
        Map<String, Integer> sentimentCount = sentimentAnalyzer.analyzeSentiment(extractedText);

        return new AnalysisResult(
                "success",
                "Text extraction and sentiment analysis completed",
                keywords,
                sentimentCount,
                wordFrequency,
                emojiCount,
                hashtagCount,
                extractedText
        );
    }
}
