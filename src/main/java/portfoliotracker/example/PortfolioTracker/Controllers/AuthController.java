package portfoliotracker.example.PortfolioTracker.Controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import portfoliotracker.example.PortfolioTracker.DTO.RequestDTO;
import portfoliotracker.example.PortfolioTracker.DTO.ResponseDTO;
import portfoliotracker.example.PortfolioTracker.DTO.UserDTO;
import portfoliotracker.example.PortfolioTracker.Services.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    public AuthService authService;

    @GetMapping("/home")
    public ResponseEntity<Map<String, String>> auth() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello World");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody RequestDTO request) {
        return authService.login(request.getEmail(),request.getPassword());
    }

    @PostMapping("/signup")
    public ResponseEntity<ResponseDTO> signup(@RequestBody UserDTO user) {
        return authService.signup(user);
    }

}
