package portfoliotracker.example.PortfolioTracker.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import portfoliotracker.example.PortfolioTracker.Models.Stock;
import portfoliotracker.example.PortfolioTracker.Models.User;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock, Long> {
    List<Stock> findByUser(User user);
}
