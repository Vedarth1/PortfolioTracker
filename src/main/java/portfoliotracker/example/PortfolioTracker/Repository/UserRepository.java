package portfoliotracker.example.PortfolioTracker.Repository;

import org.springframework.stereotype.Repository;

import portfoliotracker.example.PortfolioTracker.Models.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
