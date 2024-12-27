package portfoliotracker.example.PortfolioTracker.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import portfoliotracker.example.PortfolioTracker.Models.Stock;
import portfoliotracker.example.PortfolioTracker.Models.User;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock, Long> {
    List<Stock> findByUser(User user);

    @Query("SELECT s FROM Stock s WHERE s.user.email = :email")
    List<Stock> findByUserEmail(@Param("email") String email);
}
