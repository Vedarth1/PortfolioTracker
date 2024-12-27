package portfoliotracker.example.PortfolioTracker.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class RequestDTO {
    private String email;
    private String password;
}
