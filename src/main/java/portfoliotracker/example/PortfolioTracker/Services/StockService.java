package portfoliotracker.example.PortfolioTracker.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import portfoliotracker.example.PortfolioTracker.Models.Stock;
import portfoliotracker.example.PortfolioTracker.Models.User;
import portfoliotracker.example.PortfolioTracker.Repository.StockRepository;
import portfoliotracker.example.PortfolioTracker.Repository.UserRepository;

@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private UserRepository userRepository;

    public Stock addStock(String email, Stock stock) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        stock.setUser(user);
        return stockRepository.save(stock);
    }

    public List<Stock> getStocksByUserEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return stockRepository.findByUser(user);
    }

    public Stock updateStock(Long id, String email, Stock stockDetails) {
        Stock existingStock = stockRepository.findById(id).orElseThrow(() -> new RuntimeException("Stock not found"));
        if (!existingStock.getUser().getEmail().equals(email)) {
            throw new RuntimeException("User is not authorized to update this stock");
        }
        existingStock.setName(stockDetails.getName());
        existingStock.setTicker(stockDetails.getTicker());
        existingStock.setQuantity(stockDetails.getQuantity());
        existingStock.setBuyPrice(stockDetails.getBuyPrice());
        return stockRepository.save(existingStock);
    }

    public void deleteStock(Long id, String email) {
        Stock existingStock = stockRepository.findById(id).orElseThrow(() -> new RuntimeException("Stock not found"));
        if (!existingStock.getUser().getEmail().equals(email)) {
            throw new RuntimeException("User is not authorized to delete this stock");
        }
        stockRepository.delete(existingStock);
    }
}