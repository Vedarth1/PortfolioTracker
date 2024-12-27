package portfoliotracker.example.PortfolioTracker.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import portfoliotracker.example.PortfolioTracker.Models.Stock;
import portfoliotracker.example.PortfolioTracker.Services.StockService;

@RestController
@RequestMapping("/api/stocks")
public class StockController {
    @Autowired
    private StockService stockService;

    @PostMapping("/add")
    public ResponseEntity<Stock> addStock(@AuthenticationPrincipal UserDetails userDetails,
                                          @RequestBody Stock stock) {
        String email = userDetails.getUsername();
        Stock addedStock = stockService.addStock(email, stock);
        return ResponseEntity.ok(addedStock);
    }

    @GetMapping("/portfolio")
    public ResponseEntity<List<Stock>> getStocks(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        List<Stock> stocks = stockService.getStocksByUserEmail(email);
        return ResponseEntity.ok(stocks);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Stock> updateStock(@AuthenticationPrincipal UserDetails userDetails,
                                             @PathVariable Long id,
                                             @RequestBody Stock stock) {
        String email = userDetails.getUsername();
        Stock updatedStock = stockService.updateStock(id, email, stock);
        return ResponseEntity.ok(updatedStock);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStock(@AuthenticationPrincipal UserDetails userDetails,
                                            @PathVariable Long id) {
        String email = userDetails.getUsername();
        stockService.deleteStock(id, email);
        return ResponseEntity.ok("Deleted successfully");
    }
}
