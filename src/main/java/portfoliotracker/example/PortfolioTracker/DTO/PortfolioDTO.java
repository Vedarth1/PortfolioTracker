package portfoliotracker.example.PortfolioTracker.DTO;

import java.util.Map;

import lombok.Data;
import portfoliotracker.example.PortfolioTracker.Models.Stock;

@Data
public class PortfolioDTO {
    private double totalValue;
    private Stock topStock;
    private Map<String, Double> distribution;

    public PortfolioDTO(double totalValue, Stock topStock, Map<String, Double> distribution) {
        this.totalValue = totalValue;
        this.topStock = topStock;
        this.distribution = distribution;
    }
}
