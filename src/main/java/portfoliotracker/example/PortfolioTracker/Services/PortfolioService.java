package portfoliotracker.example.PortfolioTracker.Services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import portfoliotracker.example.PortfolioTracker.DTO.PortfolioDTO;
import portfoliotracker.example.PortfolioTracker.Models.Stock;
import portfoliotracker.example.PortfolioTracker.Repository.StockRepository;

@Service
public class PortfolioService {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private StockPriceService stockPriceService;

    public PortfolioDTO getPortfolioMetrics(String email) {
        List<Stock> stocks = stockRepository.findByUserEmail(email);
        double totalValue = 0.0;
        Stock topStock = null;
        double topPerformance = Double.NEGATIVE_INFINITY;
        Map<String, Double> distribution = new HashMap<>();
        Map<String, Double> profitAndLoss = new HashMap<>();

        for (Stock stock : stocks) {
            double currentPrice = stockPriceService.getCurrentPrice(stock.getTicker());
            double stockValue = currentPrice * stock.getQuantity();
            totalValue += stockValue;

            double performance = currentPrice - stock.getBuyPrice();
            if (performance > topPerformance) {
                topPerformance = performance;
                topStock = stock;
            }

            distribution.put(stock.getTicker(), stockValue);

            double pAndL = (currentPrice - stock.getBuyPrice()) * stock.getQuantity();
            profitAndLoss.put(stock.getTicker(), pAndL);
        }

        double finalTotalValue = totalValue;

        distribution.replaceAll((ticker, value) -> (value / finalTotalValue) * 100);

        return new PortfolioDTO(totalValue, topStock, distribution,profitAndLoss);
    }
}
