package portfoliotracker.example.PortfolioTracker.Controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import portfoliotracker.example.PortfolioTracker.DTO.PortfolioDTO;
import portfoliotracker.example.PortfolioTracker.Services.PortfolioService;
import portfoliotracker.example.PortfolioTracker.Services.StockService;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;
    
    @Autowired
    private StockService stockService;

    @GetMapping("/value")
    public ResponseEntity<Map<String, Double>> getPortfolioValue(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        double totalValue = stockService.calculatePortfolioValue(email);
        Map<String, Double> response = new HashMap<>();
        response.put("portfolioValue", totalValue);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<PortfolioDTO> getDashboard(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        PortfolioDTO metrics = portfolioService.getPortfolioMetrics(email);
        return ResponseEntity.ok(metrics);
    }

}
