package com.email.writer.app;

import java.util.Map;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;
    

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;
    
    public String generateEmailReply(EmailRequest emailRequest){
        // Build the pormt

        String promt = buildPromt(emailRequest);

        // Craft the promt

        Map<String,Object> requestBody = Map.of(
            "contents" ,  new Object[] {
                Map.of("parts", new Object[] {
                    Map.of("text", promt)
                })
            }
        );

        // Request and get response

        String response = webClient.post()
                .uri(geminiApiUrl +"?key=" + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // return the response

        return extractResonseContent(response);
    }

    private String extractResonseContent(String response) {
        try{
            
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response);

            return rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text").asText();


        }catch(Exception e){
            return "Error processing request: " + e.getMessage();
        }
    }

    private String buildPromt(EmailRequest emailRequest) {
        StringBuilder promt = new StringBuilder();

        promt.append("Generate a professional email reply for the following email content. Please don't add subject line. Only email reply noting else");
        
        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()){
            promt.append("Use a ").append(emailRequest.getTone()).append("tone");
        }
        promt.append("\nOriginal email: \n");
        promt.append(emailRequest.getEmailContent());
        return promt.toString();
    }
}
