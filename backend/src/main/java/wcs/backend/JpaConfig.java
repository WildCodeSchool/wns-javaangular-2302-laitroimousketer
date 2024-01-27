package wcs.backend;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "wcs.backend.repositories", entityManagerFactoryRef = "entityManagerFactory")
public class JpaConfig {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
    // Ajoutez d'autres beans ou configurations liées à JPA si nécessaire
}
