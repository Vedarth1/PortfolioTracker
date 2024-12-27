package portfoliotracker.example.PortfolioTracker.Services;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import portfoliotracker.example.PortfolioTracker.DTO.ResponseDTO;
import portfoliotracker.example.PortfolioTracker.DTO.UserDTO;
import portfoliotracker.example.PortfolioTracker.Models.User;
import portfoliotracker.example.PortfolioTracker.Repository.UserRepository;
import portfoliotracker.example.PortfolioTracker.Utils.JwtGenerator;

@Service
public class AuthService {

    private UserRepository userRepository;
    private JwtGenerator jwtGenerator;
    private AuthenticationManager authenticationManager;

    @Autowired
    public AuthService(UserRepository userRepository, JwtGenerator jwtGenerator, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.jwtGenerator = jwtGenerator;
        this.authenticationManager = authenticationManager;
    }

    public ResponseEntity<ResponseDTO> signup(UserDTO userDTO) {
        Optional<User> existingUser = userRepository.findByEmail(userDTO.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body(new ResponseDTO(null,"User already exists"));
        }

        if (!userDTO.getPassword().equals(userDTO.getConfirmPassword())) {
            return ResponseEntity.badRequest().body(new ResponseDTO(null,"Passwords do not match"));
        }

        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(encode(userDTO.getPassword()));

        userRepository.save(user);

        return ResponseEntity.ok(new ResponseDTO(null,"User registered successfully"));
    }

    public ResponseEntity<ResponseDTO> login(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResponseDTO(null, "No User Found!"));
        }
        
        User user = optionalUser.get();

        if(matches(password, user.getPassword()))
        {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtGenerator.generateToken(authentication);
            
            return ResponseEntity.status(200).body(new ResponseDTO(token,"Loged In SuccessFully"));
        }
        return ResponseEntity.badRequest().body(new ResponseDTO(null,"Unauthorize"));
    }

    public boolean matches(String rawPassword, String encodedPassword) {
        return new BCryptPasswordEncoder().matches(rawPassword, encodedPassword);
    }

    public String encode(String password) {
        return new BCryptPasswordEncoder().encode(password);
    }
}
