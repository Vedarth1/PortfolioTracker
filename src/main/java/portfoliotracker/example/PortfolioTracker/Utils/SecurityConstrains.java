package portfoliotracker.example.PortfolioTracker.Utils;
import java.util.Base64;

public class SecurityConstrains {
    public static final long JWT_EXPIRATION = 7200000;
    public  static final String JWT_SECRET = "33e4e06e-87c7-11ed-a1eb-0242ac120002";
    public static final String KEY = Base64.getEncoder().encodeToString(JWT_SECRET.getBytes());
}
