package com.socialmedia.social_media_analyzer_backend.controller;

import com.socialmedia.social_media_analyzer_backend.model.AnalysisResult;
import com.socialmedia.social_media_analyzer_backend.service.FileService;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    private final FileService fileService;

    @Autowired
    public FileUploadController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "status", "error",
                        "message", "No file uploaded."
                ));
            }

            AnalysisResult analysisResult = fileService.analyzeFile(file);

            return ResponseEntity.ok(Map.of(
                    "status", analysisResult.getStatus(),
                    "message", analysisResult.getMessage(),
                    "data", analysisResult
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        }
    }
}
