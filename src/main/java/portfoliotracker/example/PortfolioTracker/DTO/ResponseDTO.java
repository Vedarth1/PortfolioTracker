package portfoliotracker.example.PortfolioTracker.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ResponseDTO {
    private String token;
    private String message;
}
