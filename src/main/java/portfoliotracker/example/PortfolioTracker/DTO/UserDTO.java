package portfoliotracker.example.PortfolioTracker.DTO;
import lombok.Data;

@Data
public class UserDTO {
    private String email;
    private String password;
    private String name;
    private String confirmPassword;
}
