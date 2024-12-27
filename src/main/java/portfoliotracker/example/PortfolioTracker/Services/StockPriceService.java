package portfoliotracker.example.PortfolioTracker.Services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import portfoliotracker.example.PortfolioTracker.Utils.SecurityConstrains;

@Service
public class StockPriceService {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public StockPriceService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public Double getCurrentPrice(String ticker) {
        String url = String.format("%s?function=GLOBAL_QUOTE&symbol=%s&apikey=%s", SecurityConstrains.BASE_URL, ticker, SecurityConstrains.API_KEY);
        try {
            String response = restTemplate.getForObject(url, String.class);

            JsonNode root = objectMapper.readTree(response);
            JsonNode globalQuoteNode = root.path("Global Quote");

            String price = globalQuoteNode.path("05. price").asText();

            return Double.parseDouble(price);
        } catch (Exception e) {
            throw new RuntimeException("Error fetching stock price for " + ticker, e);
        }
    }
}
